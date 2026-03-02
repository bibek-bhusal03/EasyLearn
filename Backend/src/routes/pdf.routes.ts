import { Router } from 'express'
import { getAllPDFs } from '../controllers/pdf.controller'

const router = Router()

router.get('/', getAllPDFs)   

export default router