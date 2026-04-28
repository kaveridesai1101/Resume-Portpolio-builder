import puppeteer from 'puppeteer';

export class PDFService {
  static async generateResumePDF(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport to A4
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });

    await browser.close();
    return Buffer.from(pdf);
  }
}
