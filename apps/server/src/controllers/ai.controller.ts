import { Request, Response } from 'express';
import { AIService } from '../services/ai.service';

export const generateResumeContent = async (req: Request, res: Response) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const { formData } = req.body;

  try {
    const aiService = new AIService();
    
    // Run 4 tasks in parallel via Promise.allSettled as requested
    const results = await Promise.allSettled([
      aiService.generateObjective(formData),
      aiService.enhanceProjects(formData.projects, formData.jobRole),
      aiService.enhanceExperience(formData.experience, formData.jobRole, formData.experienceLevel),
      aiService.recommendSkills(formData.jobRole, formData.experienceLevel, formData.skills)
    ]);

    // Send results back via SSE chunks
    results.forEach((result, index) => {
      const types = ['objective', 'projects', 'experience', 'skills'];
      if (result.status === 'fulfilled') {
        res.write(`data: ${JSON.stringify({ type: types[index], content: result.value })}\n\n`);
      } else {
        res.write(`data: ${JSON.stringify({ type: types[index], error: 'Generation failed' })}\n\n`);
      }
    });

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('AI GENERATION ERROR:', error);
    res.write(`data: ${JSON.stringify({ error: 'Critical failure' })}\n\n`);
    res.end();
  }
};

export const scoreResumeController = async (req: Request, res: Response) => {
  const { resumeData } = req.body;
  try {
    const aiService = new AIService();
    const analysis = await aiService.analyzeATS(resumeData);
    return res.status(200).json(analysis);
  } catch (error) {
    return res.status(500).json({ message: 'Scoring failed' });
  }
};
