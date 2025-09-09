import { Body, Controller, HttpCode, Post } from '@nestjs/common';

@Controller('documents')
export class DocumentsController {
  @Post('export-pdf')
  @HttpCode(200)
  async exportPdf(@Body() body: { title: string; contentHtml: string; patientName: string }) {
    // TODO: brancher Puppeteer ou service PDF ici
    // Stub: renvoie une URL simulée
    const url = `https://example.com/files/${encodeURIComponent(body.title)}.pdf`;
    return { url };
  }
}


