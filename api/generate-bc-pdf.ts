// Génération PDF Bon de Commande pour Pallmann
// Utilisé pour chaque commande - envoyé à l'admin pour forward à Pallmann

import { jsPDF } from 'jspdf';

interface OrderItem {
  ref: string;
  name: string;
  quantity: number;
}

interface OrderData {
  orderNumber: string;
  date: string;
  customerName: string;
  customerPhone?: string;
  shippingAddress: string;
  shippingPostalCode: string;
  shippingCity: string;
  shippingCountry?: string;
  items: OrderItem[];
  notes?: string;
}

export function generateBonDeCommande(order: OrderData): Buffer {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let y = margin;

  // ========== EN-TÊTE ==========
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('BON DE COMMANDE', pageWidth / 2, y, { align: 'center' });
  
  y += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('PALLMANN STORE - Revendeur agréé France', pageWidth / 2, y, { align: 'center' });
  
  y += 12;
  
  // Ligne de séparation
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  
  y += 10;

  // ========== INFOS COMMANDE ==========
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`N° Commande : ${order.orderNumber}`, margin, y);
  doc.text(`Date : ${order.date}`, pageWidth - margin, y, { align: 'right' });
  
  y += 15;

  // ========== ADRESSE DE LIVRAISON ==========
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, y - 5, contentWidth, 45, 'F');
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('ADRESSE DE LIVRAISON', margin + 5, y + 3);
  
  y += 12;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(order.customerName.toUpperCase(), margin + 5, y);
  
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.text(order.shippingAddress, margin + 5, y);
  
  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.text(`${order.shippingPostalCode} ${order.shippingCity.toUpperCase()}`, margin + 5, y);
  
  y += 6;
  doc.text(order.shippingCountry || 'FRANCE', margin + 5, y);
  
  if (order.customerPhone) {
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.text(`Tél : ${order.customerPhone}`, margin + 5, y);
  }
  
  y += 20;

  // ========== TABLEAU ARTICLES ==========
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('ARTICLES COMMANDÉS', margin, y);
  
  y += 8;
  
  // En-tête tableau
  doc.setFillColor(30, 30, 30);
  doc.rect(margin, y - 4, contentWidth, 10, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text('RÉF. PALLMANN', margin + 5, y + 2);
  doc.text('DÉSIGNATION', margin + 45, y + 2);
  doc.text('QTÉ', pageWidth - margin - 15, y + 2, { align: 'center' });
  
  y += 10;
  doc.setTextColor(0, 0, 0);
  
  // Lignes articles
  doc.setFont('helvetica', 'normal');
  order.items.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, y - 4, contentWidth, 10, 'F');
    }
    
    doc.setFont('helvetica', 'bold');
    doc.text(item.ref || '-', margin + 5, y + 2);
    doc.setFont('helvetica', 'normal');
    doc.text(item.name.substring(0, 40), margin + 45, y + 2);
    doc.setFont('helvetica', 'bold');
    doc.text(item.quantity.toString(), pageWidth - margin - 15, y + 2, { align: 'center' });
    
    y += 10;
  });
  
  // Bordure tableau
  doc.setDrawColor(200, 200, 200);
  doc.rect(margin, y - 4 - (order.items.length * 10) - 10, contentWidth, (order.items.length * 10) + 14, 'S');
  
  y += 15;

  // ========== NOTES ==========
  if (order.notes) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(`Note : ${order.notes}`, margin, y);
    y += 10;
  }

  // ========== FOOTER BON DE COMMANDE ==========
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Merci de livrer les articles ci-dessus à l\'adresse indiquée.', margin, y);
  y += 5;
  doc.text('Pallmann Store - 6 rue du Commerce, 68420 Herrlisheim près Colmar - contact@ponceur-parquet.fr', margin, y);

  // ========== PAGE 2 : ÉTIQUETTE À DÉCOUPER ==========
  doc.addPage();
  y = 30;

  // Instructions
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.text('Étiquette à découper et coller sur le colis', pageWidth / 2, y, { align: 'center' });
  
  y += 15;

  // Ligne pointillée du haut
  doc.setDrawColor(0);
  doc.setLineDashPattern([3, 3], 0);
  doc.line(30, y, pageWidth - 30, y);
  
  // Ciseaux gauche
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('✂', 25, y + 1);
  doc.text('✂', pageWidth - 28, y + 1);
  
  y += 5;

  // Cadre étiquette
  const labelHeight = 80;
  const labelWidth = pageWidth - 60;
  const labelX = 30;
  
  doc.setLineDashPattern([], 0);
  doc.setDrawColor(0);
  doc.setLineWidth(1);
  doc.rect(labelX, y, labelWidth, labelHeight, 'S');
  
  // Contenu étiquette
  let labelY = y + 15;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('DESTINATAIRE', labelX + 10, labelY);
  
  labelY += 10;
  doc.setFontSize(16);
  doc.text(order.customerName.toUpperCase(), labelX + 10, labelY);
  
  labelY += 10;
  doc.setFontSize(13);
  doc.setFont('helvetica', 'normal');
  doc.text(order.shippingAddress, labelX + 10, labelY);
  
  labelY += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(`${order.shippingPostalCode} ${order.shippingCity.toUpperCase()}`, labelX + 10, labelY);
  
  labelY += 8;
  doc.setFontSize(14);
  doc.text(order.shippingCountry || 'FRANCE', labelX + 10, labelY);
  
  if (order.customerPhone) {
    labelY += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`☎ ${order.customerPhone}`, labelX + 10, labelY);
  }
  
  // Numéro de commande en bas à droite de l'étiquette
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Cmd: ${order.orderNumber}`, labelX + labelWidth - 10, y + labelHeight - 8, { align: 'right' });

  y += labelHeight + 5;
  
  // Ligne pointillée du bas
  doc.setLineDashPattern([3, 3], 0);
  doc.line(30, y, pageWidth - 30, y);
  doc.text('✂', 25, y + 1);
  doc.text('✂', pageWidth - 28, y + 1);

  // Retourne le buffer PDF
  return Buffer.from(doc.output('arraybuffer'));
}

// API endpoint pour tester
export default async function handler(req: any, res: any) {
  const testOrder: OrderData = {
    orderNumber: 'PS-2026-0042',
    date: new Date().toLocaleDateString('fr-FR'),
    customerName: 'Jean Dupont',
    customerPhone: '06 12 34 56 78',
    shippingAddress: '123 rue de la République',
    shippingPostalCode: '68000',
    shippingCity: 'Colmar',
    shippingCountry: 'FRANCE',
    items: [
      { ref: '014289', name: 'PALL-X 320 (5L)', quantity: 2 },
      { ref: '182485', name: 'FINISH CARE STOP 5L', quantity: 1 },
      { ref: '069379', name: 'PALL-X EXTRÊME MAT K.A.', quantity: 3 },
      { ref: '158420', name: 'MAGIC OIL 2K CHANGE', quantity: 1 },
    ],
    notes: 'Client fidèle - livraison urgente si possible'
  };

  try {
    const pdfBuffer = generateBonDeCommande(testOrder);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="BC-${testOrder.orderNumber}.pdf"`);
    res.send(pdfBuffer);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
