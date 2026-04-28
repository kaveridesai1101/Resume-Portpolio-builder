import { Router } from 'express';
import { saveResume, getResume, getPublicPortfolio, downloadResume } from '../controllers/resume.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authMiddleware, saveResume);
router.get('/', authMiddleware, getResume);
router.post('/download', downloadResume);
router.get('/public/:id', getPublicPortfolio);

export default router;
