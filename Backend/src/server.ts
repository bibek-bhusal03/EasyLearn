import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import uploadRoutes from "./routes/upload.routes";
import quizRoutes from "./routes/quiz.routes";
import { connectDB } from './lib/db';

dotenv.config();

const app = express();
connectDB()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/upload', uploadRoutes);
app.use('/quizzes', quizRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'EasyLearn Backend Running!',
    status: 'success',
    time: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}`);
});