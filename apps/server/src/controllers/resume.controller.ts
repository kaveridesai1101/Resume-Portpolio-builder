import { Request, Response } from 'express';
import Resume from '../models/Resume';
import { PDFService } from '../services/PDFService';

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

export const downloadResume = async (req: Request, res: Response) => {
  try {
    const { formData, aiContent, template } = req.body;
    
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
            h1 { color: #333; margin-bottom: 5px; font-size: 28px; }
            .role { color: #007bff; font-size: 18px; font-weight: bold; margin-bottom: 30px; border-bottom: 2px solid #007bff; padding-bottom: 5px; }
            .section { margin-bottom: 25px; }
            .section-title { font-weight: bold; text-transform: uppercase; color: #333; margin-bottom: 10px; font-size: 14px; background: #f8f9fa; padding: 5px 10px; }
            .exp-item { margin-bottom: 15px; }
            .exp-header { display: flex; justify-content: space-between; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>${formData.fullName || 'User'}</h1>
          <div class="role">${formData.jobRole || 'Professional'}</div>
          
          <div class="section">
            <div class="section-title">Professional Summary</div>
            <p>${aiContent.careerObjective || ''}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Experience</div>
            ${(formData.experience || []).map((exp: any) => `
              <div class="exp-item">
                <div class="exp-header">
                  <span>${exp.role} @ ${exp.company}</span>
                  <span style="color: #666; font-weight: normal;">${exp.duration}</span>
                </div>
                <p style="margin-top: 5px;">${exp.responsibilities}</p>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">Skills</div>
            <p>${(formData.skills || []).join(', ')}</p>
          </div>
        </body>
      </html>
    `;

    const pdfBuffer = await PDFService.generateResumePDF(html);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF Export Error:', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
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
