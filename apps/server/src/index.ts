import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { rateLimit } from 'express-rate-limit';

import authRoutes from './routes/auth.routes';
import aiRoutes from './routes/ai.routes';
import resumeRoutes from './routes/resume.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({ 
  origin: [process.env.CLIENT_URL || 'http://localhost:5173', 'http://localhost:5174'], 
  credentials: true 
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/resumes', resumeRoutes);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start Server
const startServer = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/resumeforge';
    await mongoose.connect(mongoUri);
    console.log('CONNECTED TO MONGODB');

    app.listen(PORT, () => {
      console.log(`SERVER RUNNING ON PORT ${PORT}`);
    });
  } catch (error) {
    console.error('SERVER INITIALIZATION ERROR:', error);
    process.exit(1);
  }
};

startServer();
