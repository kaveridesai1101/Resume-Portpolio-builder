import puppeteer from 'puppeteer';
import Handlebars from 'handlebars';
import fs from 'fs-extra';
import path from 'path';

export class PDFService {
  async generatePDF(resumeData: any, templateId: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: 'new'
    });
    
    try {
      const page = await browser.newPage();
      
      // Load Handlebars template
      const templatePath = path.join(__dirname, `../templates/resume/${templateId}.hbs`);
      const templateHtml = await fs.readFile(templatePath, 'utf-8');
      
      const compiledTemplate = Handlebars.compile(templateHtml);
      const html = compiledTemplate(resumeData);

      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
      });

      return Buffer.from(pdfBuffer);
    } finally {
      await browser.close();
    }
  }
}
