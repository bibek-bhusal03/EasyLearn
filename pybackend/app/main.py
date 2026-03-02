import os
import json
import uuid
import shutil
import tempfile
import requests
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, String, text,Integer, DateTime, JSON, func, MetaData, Table, delete
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaEmbeddings
from langchain_ollama import OllamaLLM
from langchain_postgres import PGEngine, PGVectorStore
from langchain_postgres.v2.indexes import DistanceStrategy

load_dotenv()

app = FastAPI(title="EasyLearn Backend")

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL not set in environment variables")

CONNECTION_STRING = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://")
pg_engine = PGEngine.from_connection_string(CONNECTION_STRING)

# For mxbai-embed-large, embedding dimension is 1024
VECTOR_DIMENSION = 1024

engine = create_engine(CONNECTION_STRING)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

# ── Database Models ───────────────────────────────────────────────────────────
class UploadedPDF(Base):
    __tablename__ = "uploaded_pdfs"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    cloudinary_url = Column(String, nullable=False)
    public_id = Column(String, unique=True, nullable=False)
    page_count = Column(Integer, nullable=False)
    file_name = Column(String)
    uploaded_at = Column(DateTime, server_default=func.now())

class Quiz(Base):
    __tablename__ = "quizzes"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    questions = Column(JSON, nullable=False)
    pdf_id = Column(String)
    status = Column(String, default="draft")
    question_count = Column(Integer)
    created_at = Column(DateTime, server_default=func.now())

Base.metadata.create_all(bind=engine)

# ── Dependency ────────────────────────────────────────────────────────────────
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ── Cloudinary Config ─────────────────────────────────────────────────────────
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)

# ── Ollama Configuration ─────────────────────────────────────────────────────
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")

# Embeddings - using mxbai-embed-large:latest
embeddings = OllamaEmbeddings(
    model="mxbai-embed-large:latest",
    base_url=OLLAMA_BASE_URL,
)

# LLM - using llama3.1:8b
llm = OllamaLLM(
    model="llama3.1:8b",
    base_url=OLLAMA_BASE_URL,
    temperature=0.3,
    num_predict=3000,  # Max tokens to generate
)

# ── RAG Configuration ─────────────────────────────────────────────────────────
UPLOAD_DIR = "./uploads/pdfs"
os.makedirs(UPLOAD_DIR, exist_ok=True)
COLLECTION_NAME = "pdf_chunks"

# Optional: Initialize vector store table if needed
try:
    pg_engine.init_vectorstore_table(
        table_name=COLLECTION_NAME,
        vector_size=VECTOR_DIMENSION,
        overwrite_existing=False,
    )
except Exception as e:
    print(f"Table init skipped (likely already exists): {e}")

# Helper function to test Ollama connection
@app.on_event("startup")
async def startup_event():
    """Test Ollama connection on startup"""
    try:
        # Test embedding model
        test_embed = embeddings.embed_query("test")
        print(f"✓ Ollama embedding connected. Vector dimension: {len(test_embed)}")
        
        # Test LLM model
        test_response = llm.invoke("Hello")
        print(f"✓ Ollama LLM connected. Response: {test_response[:50]}...")
        
        if len(test_embed) != VECTOR_DIMENSION:
            print(f"⚠ Warning: Expected vector dimension {VECTOR_DIMENSION}, got {len(test_embed)}")
            print("Consider updating VECTOR_DIMENSION in code")
            
    except Exception as e:
        print(f"✗ Ollama connection failed: {e}")
        print(f"Make sure Ollama is running at {OLLAMA_BASE_URL}")
        print("Models should be pulled: ollama pull mxbai-embed-large")
        print("Models should be pulled: ollama pull llama3.1:8b")

# ── RAG API 1: Upload PDF + Embed ─────────────────────────────────────────────
@app.post("/api/pdfs/embed")
async def upload_and_embed_pdf(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(400, "Only PDF files are allowed")
    
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    
    loader = PyPDFLoader(file_path)
    documents = loader.load()
    
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
    )
    chunks = splitter.split_documents(documents)
    
    texts = [doc.page_content for doc in chunks]
    metadatas = [
        {
            "pdf_filename": file.filename,
            "page_number": doc.metadata.get("page", 0) + 1,
        }
        for doc in chunks
    ]
    
    vectorstore = PGVectorStore.create_sync(
        engine=pg_engine,
        table_name=COLLECTION_NAME,
        embedding_service=embeddings,
        distance_strategy=DistanceStrategy.COSINE_DISTANCE,
    )
    
    # Add texts in batches to avoid timeouts
    batch_size = 10
    for i in range(0, len(texts), batch_size):
        batch_texts = texts[i:i + batch_size]
        batch_metadatas = metadatas[i:i + batch_size] if metadatas else None
        vectorstore.add_texts(texts=batch_texts, metadatas=batch_metadatas)
    
    return {
        "message": "PDF embedded successfully",
        "filename": file.filename,
        "chunks_count": len(chunks),
        "embedding_model": "mxbai-embed-large:latest"
    }

# ── RAG API: Delete PDF Chunks by Filename ────────────────────────────────────
@app.delete("/api/pdfs/delete/{pdf_filename}")
async def delete_pdf_chunks_by_filename(
    pdf_filename: str,
    db: Session = Depends(get_db)
):
    """
    Delete all vector store chunks for a specific PDF filename.
    """
    try:
        # Get the vector store table
        metadata = MetaData()
        vector_table = Table(
            COLLECTION_NAME,
            metadata,
            autoload_with=engine
        )
        
        # Build delete query filtering by pdf_filename in metadata
        delete_query = delete(vector_table).where(
            vector_table.c.langchain_metadata["pdf_filename"].astext == pdf_filename
        )
        
        # Execute deletion
        with engine.connect() as conn:
            result = conn.execute(delete_query)
            conn.commit()
            deleted_count = result.rowcount
        
        return {
            "message": f"Successfully deleted {deleted_count} chunks for PDF: {pdf_filename}",
            "pdf_filename": pdf_filename,
            "deleted_count": deleted_count
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error deleting chunks for PDF '{pdf_filename}': {str(e)}"
        )

# ── RAG API 2: Semantic Search → Generate Quiz ────────────────────────────────
class QuizQueryRequest(BaseModel):
    query: str
    num_questions: int = 10

@app.post("/api/quizzes/from-search")
async def generate_quiz_from_search(request: QuizQueryRequest):
    vectorstore = PGVectorStore.create_sync(
        engine=pg_engine,
        table_name=COLLECTION_NAME,
        embedding_service=embeddings,
        distance_strategy=DistanceStrategy.COSINE_DISTANCE,
    )
    retriever = vectorstore.as_retriever(search_kwargs={"k": 6})
    query = f"query: {request.query}"
    docs = retriever.invoke(query)
    
    if not docs:
        raise HTTPException(404, "No relevant content found for this query")

   
    
    prompt = f"""Generate exactly {request.num_questions} high-quality multiple choice questions (MCQs) based on the following content.

IMPORTANT: Return ONLY a valid JSON array. Do not include any explanation, markdown, or additional text outside the JSON.

Rules for each MCQ:
1. Exactly 4 options (A, B, C, D)
2. Only ONE correct answer
3. Make questions clear and test understanding
4. Options should be plausible and related to the content

[
  {{
    "type": "mcq",
    "question": "Question text here",
    "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
    "correct_answer": "B) ..."
  }}
]
Return exactly this number of questions: {request.num_questions}

Content to base questions on:
{docs}

JSON array:"""
    
    print(f"Debug prompt length: {len(prompt)} chars")
    
    try:
        # Using invoke instead of ainvoke since Ollama sync works fine
        raw_response = llm.invoke(prompt)
        raw = raw_response.strip()
        
        # Clean common LLM artifacts
        clean = raw.replace("```json", "").replace("```", "").strip()
        print(f"Debug clean output (first 500 chars): {clean}...")
        
        
        questions = json.loads(clean)
        
        
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        print(f"Raw response that failed to parse: {raw[:1000]}")
        raise HTTPException(500, "LLM returned invalid JSON format")
    except Exception as e:
        print(f"LLM invocation error: {e}")
        raise HTTPException(500, f"Error generating quiz: {str(e)}")
    
    # Basic validation
    mcqs = [
        q for q in questions
        if (
            isinstance(q, dict)
            and q.get("type") == "mcq"
            and isinstance(q.get("options"), list)
            and len(q["options"]) == 4
            and q.get("correct_answer") in q["options"]
        )
    ]
    
    if not mcqs:
        raise HTTPException(500, "Could not generate any valid MCQs")
    
    return {
        "query": request.query,
        "questions": mcqs[:request.num_questions],
        "sources": [
            {
                "filename": d.metadata.get("pdf_filename"),
                "page": d.metadata.get("page_number"),
            }
            for d in docs
        ],
        "model_used": "llama3.1:8b"
    }

# ── NON-RAG Workflow (still using cloudinary PDFs) ────────────────────────────
class GenerateQuizRequest(BaseModel):
    pdfId: str
    numQuestions: int = 10

@app.post("/api/quizzes/generate")
async def generate_quiz(request: GenerateQuizRequest, db: Session = Depends(get_db)):
    pdf = db.query(UploadedPDF).filter(UploadedPDF.id == request.pdfId).first()
    if not pdf:
        raise HTTPException(404, "PDF not found")
    
    response = requests.get(pdf.cloudinary_url)
    response.raise_for_status()
    
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(response.content)
        tmp_path = tmp.name
    
    try:
        loader = PyPDFLoader(tmp_path)
        docs = loader.load()
        text = "\n\n".join(d.page_content for d in docs)
    finally:
        os.unlink(tmp_path)
    
    prompt = f"""Generate exactly {request.numQuestions} high-quality multiple choice questions from the text below.

IMPORTANT: Return ONLY a valid JSON array. Do not include any explanation, markdown, or additional text.

Rules for each MCQ:
1. Exactly 4 options (A, B, C, D)
2. Only ONE correct answer
3. Make questions clear and test understanding
4. Options should be plausible and related to the content

Format each question as:
{{
  "question": "Question text here?",
  "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
  "correct_answer": "Option C text"
}}

Text to analyze:
{text[:10000]}  # Limit text to avoid token limits

Return exactly {request.numQuestions} questions in a JSON array:"""
    
    try:
        raw_response = llm.invoke(prompt)
        raw = raw_response.strip()
        clean = raw.replace("```json", "").replace("```", "").strip()
        
        # Extract JSON array if wrapped
        if "[" in clean and "]" in clean:
            start_idx = clean.find("[")
            end_idx = clean.rfind("]") + 1
            if start_idx >= 0 and end_idx > start_idx:
                clean = clean[start_idx:end_idx]
        
        questions = json.loads(clean)
        
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        print(f"Raw response: {raw[:1000]}")
        raise HTTPException(500, "LLM response was not valid JSON")
    except Exception as e:
        print(f"LLM error: {e}")
        raise HTTPException(500, f"Error generating questions: {str(e)}")
    
    quiz = Quiz(
        title=f"Quiz from {pdf.file_name}",
        questions=questions,
        pdf_id=pdf.id,
        question_count=len(questions),
    )
    db.add(quiz)
    db.commit()
    db.refresh(quiz)
    
    return {
        "quizId": quiz.id,
        "questions": quiz.questions,
        "model_used": "llama3.1:8b"
    }

# ── Health Check Endpoint ────────────────────────────────────────────────────
@app.get("/health")
async def health_check():
    """Check if Ollama and database are accessible"""
    try:
        # Check Ollama
        ollama_response = requests.get(f"{OLLAMA_BASE_URL}/api/tags")
        ollama_ok = ollama_response.status_code == 200
        
        # Check database
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
            db_ok = True
            
        return {
            "status": "healthy",
            "ollama": ollama_ok,
            "database": db_ok,
            "embedding_model": "mxbai-embed-large:latest",
            "llm_model": "llama3.1:8b",
            "ollama_url": OLLAMA_BASE_URL
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        }
