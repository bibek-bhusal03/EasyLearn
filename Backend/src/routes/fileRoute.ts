import express from 'express';
import { uploadFile, getFile } from '../controllers/fileController';
import { upload } from '../middlewares/upload';

const router = express.Router();

router.post('/', upload.array('files'), uploadFile);
router.get('/:id', getFile);

export default router;
