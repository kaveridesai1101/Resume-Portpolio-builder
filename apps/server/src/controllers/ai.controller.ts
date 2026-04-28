import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { RESUME_SYSTEM_PROMPT } from '@resumeforge/ai-prompts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const generateAIContent = async (req: Request, res: Response) => {
  try {
    const { formData } = req.body;

    // Set headers for SSE (Server-Sent Events)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const prompt = `
      ${RESUME_SYSTEM_PROMPT}
      
      User Data: ${JSON.stringify(formData)}
      
      Please provide:
      1. An optimized Career Objective.
      2. Enhanced bullet points for each experience.
      3. Enhanced bullet points for each project.
      4. A list of 8 recommended skills.

      Return the response in valid JSON format.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean JSON from potential markdown blocks
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    res.write(`data: ${JSON.stringify({ type: 'complete', content: JSON.parse(jsonStr) })}\n\n`);
    res.end();
  } catch (error) {
    console.error('Gemini Error:', error);
    res.write(`data: ${JSON.stringify({ type: 'error', message: 'AI Generation failed' })}\n\n`);
    res.end();
  }
};
