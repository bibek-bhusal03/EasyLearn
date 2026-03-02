import { Request, Response } from 'express'
import { UploadedPDF } from '../model/UploadPdfs'

export const getAllPDFs = async (req: Request, res: Response) => {
  try {
    const pdfs = await UploadedPDF.find()
      .select('fileName cloudinaryUrl pageCount createdAt') // only needed fields
      .sort({ createdAt: -1 }) // newest first
      .lean() // faster, plain objects

    return res.status(200).json({
      success: true,
      count: pdfs.length,
      data: pdfs.map(pdf => ({
        pdfId: pdf._id.toString(),
        fileName: pdf.fileName || 'Untitled PDF',
        url: pdf.cloudinaryUrl,
        pageCount: pdf.pageCount,
        uploadedAt: pdf.createdAt,
      })),
    })
  } catch (error: any) {
    console.error('Get PDFs error:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch PDFs',
    })
  }
}