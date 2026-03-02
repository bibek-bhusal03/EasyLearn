import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [{ type: Object, required: true }], 
  pdf: { type: mongoose.Schema.Types.ObjectId, ref: 'UploadedPDF' },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  questionCount: { type: Number },
}, { timestamps: true })

export const Quiz = mongoose.model('Quiz', quizSchema)