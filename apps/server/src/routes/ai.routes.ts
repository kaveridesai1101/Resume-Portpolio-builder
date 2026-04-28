import { Router } from 'express';
import { generateResumeContent, scoreResumeController } from '../controllers/ai.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// @route   POST /api/v1/ai/generate-resume-content
// @desc    Generate AI-enhanced content via SSE
router.post('/generate-resume-content', authMiddleware, generateResumeContent);

// @route   POST /api/v1/ai/score-resume
// @desc    Analyze resume for ATS compatibility
router.post('/score-resume', authMiddleware, scoreResumeController);

export default router;
