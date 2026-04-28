import { Request, Response } from 'express';
import Resume from '../models/Resume';

export const saveResume = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { formData, aiContent, selectedTemplate, selectedPortfolioTheme } = req.body;

    let resume = await Resume.findOne({ user: userId });
    
    if (resume) {
      resume.formData = formData;
      resume.aiContent = aiContent;
      resume.selectedTemplate = selectedTemplate;
      resume.selectedPortfolioTheme = selectedPortfolioTheme;
      await resume.save();
    } else {
      resume = new Resume({
        user: userId,
        formData,
        aiContent,
        selectedTemplate,
        selectedPortfolioTheme
      });
      await resume.save();
    }

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save resume' });
  }
};

export const getResume = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const resume = await Resume.findOne({ user: userId });
    res.json(resume || {});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resume' });
  }
};

export const getPublicPortfolio = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const resume = await Resume.findById(id).populate('user', 'name email');
      if (!resume) return res.status(404).json({ message: 'Portfolio not found' });
      res.json(resume);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching portfolio' });
    }
};
