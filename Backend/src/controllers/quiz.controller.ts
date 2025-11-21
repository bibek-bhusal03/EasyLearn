import { Request, Response } from 'express'
import axios from 'axios'
import { UploadedPDF } from '../model/UploadPdfs'
import { Quiz } from '../models/Quiz'

import { generateQuizFromPDF } from '../utils/quizGenerator' // ← your working function

export const generateQuiz = async (req: Request, res: Response) => {
  try {
    const { pdfId, numQuestions = 10, difficulty = 'medium' } = req.body

    if (!pdfId) {
      return res.status(400).json({ error: 'pdfId is required' })
    }

    // 1. Find the uploaded PDF
    const pdfDoc = await UploadedPDF.findById(pdfId)
    if (!pdfDoc) {
      return res.status(404).json({ error: 'PDF not found' })
    }

    // 2. Download PDF from Cloudinary
    const response = await axios.get(pdfDoc.cloudinaryUrl, {
      responseType: 'arraybuffer',
    })
    const pdfBuffer = Buffer.from(response.data)

    // 3. Call YOUR existing working function
    const rawQuestions = await generateQuizFromPDF(pdfBuffer, {
      numQuestions: Number(numQuestions),
      difficulty: difficulty as 'easy' | 'medium' | 'hard',
    })

    // 4. Filter only MCQs (as agreed)
    const mcqQuestions = rawQuestions.filter((q: any) => q.type === 'mcq')

    if (mcqQuestions.length === 0) {
      return res.status(500).json({ error: 'No MCQs generated. Try again.' })
    }

    // 5. Save as draft quiz
    const quiz = await Quiz.create({
      title: `Quiz from ${pdfDoc.fileName || 'Untitled PDF'}`,
      questions: mcqQuestions,
      pdf: pdfDoc._id,
      status: 'draft',
      questionCount: mcqQuestions.length,
    })

    return res.status(200).json({
      message: 'Quiz generated successfully',
      quizId: quiz._id.toString(),
      title: quiz.title,
      questionCount: quiz.questionCount,
      preview: mcqQuestions.slice(0, 3), // show first 3
      questions: mcqQuestions, // full list (teacher sees answers)
    })
  } catch (error: any) {
    console.error('Quiz generation error:', error)
    return res.status(500).json({
      error: 'Failed to generate quiz',
      details: error.message,
    })
  }
}