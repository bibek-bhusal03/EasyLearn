import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { env } from "../env";
import fs from "fs";
import os from "os";
import path from "path";

export async function generateQuizFromPDF(
  pdfBuffer: Buffer,                     
  options: { numQuestions?: number } = {}
): Promise<any[]> {
  const numQuestions = options.numQuestions || 10;

  const tempPath = path.join(os.tmpdir(), `quiz-${Date.now()}.pdf`);
  fs.writeFileSync(tempPath, pdfBuffer);

  try {
    console.log("Loading PDF from temp file...");
    const loader = new PDFLoader(tempPath);
    const docs = await loader.load();
    const text = docs.map(d => d.pageContent).join("\n\n");

    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",       
      temperature: 0.3,
      apiKey: env.GEMINI_API_KEY,
    });

    const prompt = `Generate EXACTLY ${numQuestions} multiple-choice questions (MCQ only) from the text below.

Rules:
- Only MCQ
- Exactly 4 options
- Exactly one correct answer
- Return ONLY a valid JSON array — no markdown, no explanations, no extra text

Format of each question:
{
  "type": "mcq",
  "question": "Your question here?",
  ",还options": ["A) ...", "B) ...", "C) ...", "D) ..."],
  "correct_answer": "B) ..."
}

Text:
${text}

Return only the JSON array now:`;

    const response = await llm.invoke(prompt);
    const raw = (response as any).content || response.toString();

    console.log('Raw Gemini output:', raw);

    const clean = raw.replace(/```json/gi, "").replace(/```/gi, "").trim();

    let questions;
    try {
      questions = JSON.parse(clean);
    } catch (e) {
      console.log("Gemini gave invalid JSON:", raw);
      throw new Error("Invalid JSON from Gemini");
    }

    // Filter only real MCQs (safety)
    const mcqs = questions
      .filter((q: any) => q.type === "mcq" && Array.isArray(q.options) && q.options.length === 4)
      .slice(0, numQuestions);

    console.log(`Success! Generated ${mcqs.length} clean MCQs`);
    return mcqs;

  } finally {
    try { fs.unlinkSync(tempPath); } catch {}
  }
}