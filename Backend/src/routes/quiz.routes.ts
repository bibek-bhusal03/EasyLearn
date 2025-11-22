import { Router } from 'express'
import { generateQuiz } from '../controllers/quiz.controller'
import multer from 'multer'

const router = Router()
const upload = multer() 

router.post('/generate', upload.none(), generateQuiz) 

export default router