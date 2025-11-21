import { Router } from 'express'
import { generateQuiz } from '../controllers/quiz.controller'
import multer from 'multer'

const router = Router()
const upload = multer() // no file needed, we just accept pdfId

router.post('/generate', upload.none(), generateQuiz) // form-data body

export default router