import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { env } from "../env";

export async function generateQuestionsFromPDF(pdfPath: string): Promise<any[]> {
  console.log("Loading PDF:", pdfPath);

  const loader = new PDFLoader(pdfPath);
  const docs = await loader.load();
  const text = docs.map(d => d.pageContent).join("\n\n");

  console.log("PDF loaded, sending to Gemini...");

  const llm = new ChatGoogleGenerativeAI({
    // model: "gemini-1.5-flash",
    model: "gemini-2.5-flash",
    temperature: 0.3,
    apiKey: env.GEMINI_API_KEY,
  });

  const prompt = `Generate exactly 10 quiz questions from the following chapter.

Rules:
- 3 MCQ (4 options, single correct)
- 3 True/False
- 2 Fill in the blanks
- 2 Short answer

Return ONLY a valid JSON array. No markdown, no extra text.

Chapter content:
${text}

Return only the JSON array now:`;

  const response = await llm.invoke(prompt);

  const raw = (response as any).content || response.toString();
  console.log('debug raw ............', raw)

  const clean = raw.replace(/```json/gi, "").replace(/```/gi, "").trim();

  try {
    const questions = JSON.parse(clean);
    console.log(`Success! Generated ${questions.length} questions`);
    return questions;
  } catch (e) {
    console.log("\nGemini returned junk:\n", raw);
    throw new Error("Invalid JSON from Gemini");
  }
}