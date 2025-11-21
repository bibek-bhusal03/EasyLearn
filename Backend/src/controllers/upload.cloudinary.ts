import { Request, Response } from 'express'
import { UploadedPDF } from '../model/UploadPdfs'
import { uploadBufferToCloudinary } from '../utils/cloudinary'
import pdfParse from 'pdf-parse'   // ← correct import

export const uploadPDF = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded" })
    }

    const buffer = req.file.buffer

    // Extract page count
    const pdfData = await pdfParse(buffer)
    if (pdfData.numpages > 3) {
      return res.status(400).json({
        error: "PDF too long",
        details: "Maximum 3 pages allowed",
      })
    }

    // Upload to Cloudinary
    const cloudinaryResult = await uploadBufferToCloudinary(buffer)

    // Save to MongoDB
    const doc = await UploadedPDF.create({
      cloudinaryUrl: cloudinaryResult.secure_url,
      publicId: cloudinaryResult.public_id,
      pageCount: pdfData.numpages,
      fileName: req.file.originalname,
    })

    return res.status(200).json({
      message: "PDF uploaded successfully",
      pdfId: doc._id.toString(),
      url: doc.cloudinaryUrl,
      pageCount: doc.pageCount,
      fileName: doc.fileName,
    })
  } catch (error: any) {
    console.error("Upload error:", error)
    return res.status(500).json({
      error: "Upload failed",
      details: error.message,
    })
  }
}