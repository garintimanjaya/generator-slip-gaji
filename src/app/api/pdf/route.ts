import { NextResponse } from 'next/server';

import puppeteer from 'puppeteer';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID').format(num);
    const totalPay = Number(data.baseSalary) + Number(data.allowance) - Number(data.deduction);

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Inter', sans-serif; background-color: #ffffff; margin: 0; padding: 20px; }
          .font-mono { font-family: 'Space Mono', monospace; }
        </style>
      </head>
      <body>
        <div style="max-width: 680px; margin: 0 auto; padding: 32px; border: 1px solid #e2e8f0; border-radius: 20px;">
          <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #0f172a; padding-bottom: 16px;">
            <div>
              <h1 style="font-size: 20px; font-weight: 900; margin: 0; text-transform: uppercase; color: #0f172a;">${data.company}</h1>
              <p style="font-size: 12px; margin: 2px 0 0; color: #475569;">${data.subCompany}</p>
              <p style="font-size: 11px; margin: 2px 0 0; color: #64748b;">${data.address}</p>
            </div>
            <div style="text-align: right;">
              <span style="background-color: #e6f7f0; color: #046c4e; border: 1px solid #a3ebd2; font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 6px;">${data.badge}</span>
              <p style="font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; margin-top: 8px; color: #334155;">REF: ${data.refNumber}</p>
            </div>
          </div>
          <!-- Komponen Detail Slip Gaji Lainnya -->
        </div>
      </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
    });

    const pdfBody = new Uint8Array(pdfBuffer.byteLength);
    pdfBody.set(pdfBuffer);

    await browser.close();

    return new NextResponse(pdfBody.buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Slip_Gaji_${data.empName}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal membuat berkas PDF' },
      { status: 500 }
    );
  }
}