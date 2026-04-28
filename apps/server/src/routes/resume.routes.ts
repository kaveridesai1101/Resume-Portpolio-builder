import { Router } from 'express';
import { saveResume, getResume, getPublicPortfolio } from '../controllers/resume.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authMiddleware, saveResume);
router.get('/', authMiddleware, getResume);
router.get('/public/:id', getPublicPortfolio);

export default router;
