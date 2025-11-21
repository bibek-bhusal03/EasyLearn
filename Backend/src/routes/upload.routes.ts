import { Router } from "express";
import { uploadPDF } from "../controllers/upload.cloudinary";
import multer from "multer";

const router = Router();

// Configure multer (in-memory storage because we stream to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

// POST /api/upload/pdf
router.post("/pdf", upload.single("pdf"), uploadPDF);

export default router;