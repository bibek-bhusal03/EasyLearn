import mongoose from 'mongoose'

const uploadedPDFSchema = new mongoose.Schema({
  cloudinaryUrl: { type: String, required: true },
  publicId: { type: String, required: true, unique: true },
  pageCount: { type: Number, required: true },
  fileName: { type: String },
}, { timestamps: true })

export const UploadedPDF = mongoose.model('UploadedPDF', uploadedPDFSchema)