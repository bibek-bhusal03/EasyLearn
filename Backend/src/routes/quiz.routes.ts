import { Router } from 'express'
import { generateQuiz, getAllQuizzes, startQuiz, togglePublishQuiz } from '../controllers/quiz.controller'
import multer from 'multer'

const router = Router()
const upload = multer() 

router.get('/', getAllQuizzes)
router.post('/generate', upload.none(), generateQuiz) 
router.get('/:id/start', startQuiz)
router.post('/:id/publish', togglePublishQuiz)

export default router