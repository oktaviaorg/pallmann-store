import { Resend } from 'resend';
import { jsPDF } from 'jspdf';

const resend = new Resend(process.env.RESEND_API_KEY);

// Génération du PDF BC
function generateBCPdf(order: any): string {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = margin;

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('BON DE COMMANDE', pageWidth / 2, y, { align: 'center' });
  y += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('PALLMANN STORE - Revendeur agréé France', pageWidth / 2, y, { align: 'center' });
  y += 10;
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Commande : ${order.orderNumber}`, margin, y);
  doc.text(`Date : ${order.date}`, pageWidth - margin, y, { align: 'right' });
  y += 12;

  doc.setFillColor(245, 245, 245);
  doc.rect(margin, y - 4, pageWidth - margin * 2, 38, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('LIVRER À :', margin + 5, y + 2);
  y += 10;
  doc.setFontSize(12);
  doc.text(order.customerName.toUpperCase(), margin + 5, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.text(order.shippingAddress, margin + 5, y);
  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.text(`${order.shippingPostalCode} ${order.shippingCity.toUpperCase()}`, margin + 5, y);
  y += 6;
  doc.text('FRANCE', margin + 5, y);
  if (order.customerPhone) {
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.text(`Tél: ${order.customerPhone}`, margin + 5, y);
  }
  y += 18;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('ARTICLES', margin, y);
  y += 6;

  doc.setFillColor(40, 40, 40);
  doc.rect(margin, y - 3, pageWidth - margin * 2, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text('RÉF.', margin + 3, y + 2);
  doc.text('DÉSIGNATION', margin + 30, y + 2);
  doc.text('QTÉ', pageWidth - margin - 12, y + 2);
  y += 8;
  doc.setTextColor(0, 0, 0);

  order.items.forEach((item: any, i: number) => {
    if (i % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, y - 3, pageWidth - margin * 2, 8, 'F');
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(item.ref || '-', margin + 3, y + 2);
    doc.setFont('helvetica', 'normal');
    doc.text(item.name.substring(0, 45), margin + 30, y + 2);
    doc.setFont('helvetica', 'bold');
    doc.text(item.quantity.toString(), pageWidth - margin - 10, y + 2);
    y += 8;
  });

  y += 10;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Merci de livrer à l\'adresse indiquée ci-dessus.', margin, y);
  y += 4;
  doc.text('Pallmann Store - contact@ponceur-parquet.fr - 07 57 82 13 06', margin, y);

  // PAGE 2 : ÉTIQUETTE
  doc.addPage();
  y = 25;
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.text('Étiquette à découper et coller sur le colis', pageWidth / 2, y, { align: 'center' });
  y += 12;

  doc.setLineDashPattern([2, 2], 0);
  doc.line(35, y, pageWidth - 35, y);
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text('✂', 30, y + 1);
  y += 5;

  doc.setLineDashPattern([], 0);
  doc.setLineWidth(0.8);
  doc.rect(35, y, pageWidth - 70, 65, 'S');

  let ly = y + 12;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('DESTINATAIRE', 42, ly);
  ly += 10;
  doc.setFontSize(16);
  doc.text(order.customerName.toUpperCase(), 42, ly);
  ly += 9;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(order.shippingAddress, 42, ly);
  ly += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`${order.shippingPostalCode} ${order.shippingCity.toUpperCase()}`, 42, ly);
  ly += 7;
  doc.text('FRANCE', 42, ly);
  if (order.customerPhone) {
    ly += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Tel: ${order.customerPhone}`, 42, ly);
  }
  doc.setFontSize(8);
  doc.text(`#${order.orderNumber}`, pageWidth - 42, y + 60, { align: 'right' });

  y += 70;
  doc.setLineDashPattern([2, 2], 0);
  doc.line(35, y, pageWidth - 35, y);
  doc.text('✂', 30, y + 1);

  return doc.output('datauristring').split(',')[1];
}

export default async function handler(req: any, res: any) {
  const secret = req.query.secret || req.body?.secret;
  if (secret !== 'pallmann2026') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'RESEND_API_KEY not configured' });
  }

  const orderNumber = `PS-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const testOrder = {
    orderNumber,
    date: new Date().toLocaleDateString('fr-FR'),
    customerName: 'Martin Schneider',
    customerEmail: 'client.test@example.com',
    customerPhone: '06 78 90 12 34',
    shippingAddress: '45 avenue des Vosges',
    shippingPostalCode: '67000',
    shippingCity: 'Strasbourg',
    items: [
      { ref: '014289', name: 'PALL-X 320 (5L)', quantity: 2, priceHt: 46.00 },
      { ref: '182485', name: 'FINISH CARE STOP 5L', quantity: 1, priceHt: 26.54 },
      { ref: '069379', name: 'PALL-X EXTRÊME MAT K.A. 1L', quantity: 3, priceHt: 36.55 },
    ],
    totalTtc: '214.51'
  };

  try {
    // Generate PDF
    const pdfBase64 = generateBCPdf(testOrder);

    // Admin email
    const adminHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
      body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#374151;background:#f9fafb;margin:0;padding:0}
      .w{max-width:600px;margin:0 auto;padding:32px 16px}
      .c{background:#fff;border-radius:8px;border:1px solid #e5e7eb;overflow:hidden}
      .h{padding:24px;text-align:center;border-bottom:1px solid #e5e7eb}
      .h h1{margin:0;font-size:20px;color:#111827}
      .h p{margin:8px 0 0;color:#6b7280;font-size:14px}
      .b{padding:24px}
      .t{text-align:center;padding:20px;background:#f9fafb;border-radius:8px;margin-bottom:20px}
      .t .a{font-size:28px;font-weight:600;color:#111827}
      .s{margin-bottom:16px}
      .s-t{font-size:11px;text-transform:uppercase;color:#6b7280;margin-bottom:4px}
      .s-v{font-size:14px;color:#111827}
      table{width:100%;border-collapse:collapse;font-size:13px;margin:16px 0}
      th{text-align:left;padding:10px;background:#f3f4f6;font-size:11px;text-transform:uppercase;color:#6b7280}
      td{padding:10px;border-bottom:1px solid #f3f4f6}
      .f{padding:20px;background:#f9fafb;text-align:center;font-size:12px;color:#6b7280;border-top:1px solid #e5e7eb}
      .test{background:#fef2f2;color:#991b1b;padding:10px;text-align:center;font-size:12px}
    </style></head><body><div class="w"><div class="c">
      <div class="test">⚠️ COMMANDE TEST</div>
      <div class="h"><h1>Nouvelle commande</h1><p>${orderNumber}</p></div>
      <div class="b">
        <div class="t"><div class="a">${testOrder.totalTtc} €</div><div style="font-size:12px;color:#6b7280">TTC</div></div>
        <div class="s"><div class="s-t">Client</div><div class="s-v">${testOrder.customerName}</div></div>
        <div class="s"><div class="s-t">Téléphone</div><div class="s-v">${testOrder.customerPhone}</div></div>
        <div class="s"><div class="s-t">Livraison</div><div class="s-v">${testOrder.shippingAddress}<br>${testOrder.shippingPostalCode} ${testOrder.shippingCity}</div></div>
        <table><tr><th>Réf.</th><th>Produit</th><th>Qté</th><th style="text-align:right">HT</th></tr>
        ${testOrder.items.map(i => `<tr><td>${i.ref}</td><td>${i.name}</td><td>${i.quantity}</td><td style="text-align:right">${i.priceHt.toFixed(2)}€</td></tr>`).join('')}
        </table>
        <p style="font-size:13px;color:#059669;margin-top:20px"><strong>📎 PDF Bon de Commande joint</strong> - À transférer à Pallmann.</p>
      </div>
      <div class="f">Pallmann Store · contact@ponceur-parquet.fr</div>
    </div></div></body></html>`;

    await resend.emails.send({
      from: 'Pallmann Store <noreply@ponceur-parquet.fr>',
      to: ['j.dietemann@renoline.fr'],
      subject: `[TEST] Nouvelle commande ${orderNumber} - ${testOrder.totalTtc}€`,
      html: adminHtml,
      attachments: [{
        filename: `BC-${orderNumber}.pdf`,
        content: pdfBase64,
      }],
    });

    // Client email
    const clientHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
      body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#374151;background:#f9fafb;margin:0;padding:0}
      .w{max-width:600px;margin:0 auto;padding:32px 16px}
      .c{background:#fff;border-radius:8px;border:1px solid #e5e7eb;overflow:hidden}
      .h{padding:24px;text-align:center;border-bottom:1px solid #e5e7eb}
      .h h1{margin:0;font-size:20px;color:#111827}
      .b{padding:24px}
      .t{text-align:center;padding:20px;background:#f9fafb;border-radius:8px;margin-bottom:20px}
      .t .a{font-size:28px;font-weight:600;color:#111827}
      table{width:100%;border-collapse:collapse;font-size:13px;margin:16px 0}
      th{text-align:left;padding:10px;background:#f3f4f6;font-size:11px;text-transform:uppercase;color:#6b7280}
      td{padding:10px;border-bottom:1px solid #f3f4f6}
      .n{background:#f3f4f6;padding:16px;border-radius:6px;margin:16px 0;font-size:13px}
      .f{padding:20px;background:#f9fafb;text-align:center;font-size:12px;color:#6b7280;border-top:1px solid #e5e7eb}
      .test{background:#fef2f2;color:#991b1b;padding:10px;text-align:center;font-size:12px}
    </style></head><body><div class="w"><div class="c">
      <div class="test">⚠️ EMAIL TEST</div>
      <div class="h"><h1>Commande confirmée</h1></div>
      <div class="b">
        <p>Bonjour ${testOrder.customerName},</p>
        <p>Votre commande <strong>${orderNumber}</strong> est confirmée.</p>
        <div class="t"><div class="a">${testOrder.totalTtc} €</div></div>
        <table><tr><th>Produit</th><th>Qté</th><th style="text-align:right">HT</th></tr>
        ${testOrder.items.map(i => `<tr><td>${i.name}</td><td>${i.quantity}</td><td style="text-align:right">${i.priceHt.toFixed(2)}€</td></tr>`).join('')}
        </table>
        <div class="n"><strong>Livraison</strong><br>${testOrder.shippingAddress}, ${testOrder.shippingPostalCode} ${testOrder.shippingCity}<br><br>Expédition sous 24-48h.</div>
        <p>Cordialement,<br><strong>L'équipe Pallmann Store</strong></p>
      </div>
      <div class="f">Pallmann Store · www.pallmann-store.com</div>
    </div></div></body></html>`;

    await resend.emails.send({
      from: 'Pallmann Store <noreply@ponceur-parquet.fr>',
      to: ['j.dietemann@renoline.fr'], // Pour le test, on t'envoie aussi l'email client
      subject: `[TEST CLIENT] Commande ${orderNumber} confirmée`,
      html: clientHtml,
    });

    return res.status(200).json({ 
      success: true, 
      orderNumber,
      emailsSent: ['admin (avec PDF BC)', 'client'],
      message: 'Check ta boîte mail !'
    });

  } catch (error: any) {
    console.error('Test order error:', error);
    return res.status(500).json({ error: error.message });
  }
}
