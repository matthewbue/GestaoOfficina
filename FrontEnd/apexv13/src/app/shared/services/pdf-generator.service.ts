import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

export interface PDFCompanyInfo {
  name: string;
  cnpj: string;
  address: string;
  phone?: string;
  logoPath?: string;
}

export interface PDFServiceOrder {
  id: number;
  date: string;
  type: 'OrdemServico' | 'Orcamento';
  customer: {
    name: string;
    cpf: string;
    address: string;
    phone?: string;
    email?: string;
  };
  vehicle: {
    plate: string;
    brand: string;
    model: string;
    year: string;
    color: string;
    currentKm?: string;
  };
  services: Array<{
    name: string;
    value: number;
    description?: string;
  }>;
  totalValue: number;
  observations?: string;
  status?: string;
  photos?: Array<{
    imagemBase64: string;
    descricao?: string;
    nomeArquivo?: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  private doc: jsPDF;
  private currentY: number = 0;
  private pageHeight: number = 297; // A4 height in mm
  private pageWidth: number = 210; // A4 width in mm
  private margins = { top: 20, bottom: 30, left: 20, right: 20 };
  private lineHeight = 5;

  constructor() {}

  generateServiceOrderPDF(orderData: PDFServiceOrder, companyInfo: PDFCompanyInfo): void {
    this.doc = new jsPDF();
    this.currentY = this.margins.top;
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.pageWidth = this.doc.internal.pageSize.getWidth();

    // Add watermark logo if provided
    if (companyInfo.logoPath) {
      this.addWatermark(companyInfo.logoPath);
    }

    // Generate PDF content
    this.addHeader(companyInfo, orderData.type);
    this.addOrderInfo(orderData);
    this.addCustomerInfo(orderData.customer);
    this.addVehicleInfo(orderData.vehicle);
    this.addServicesSection(orderData.services);
    this.addTotalValue(orderData.totalValue);

    if (orderData.observations) {
      this.addObservations(orderData.observations);
    }

    this.addSignatureSection();
    this.addFooter();

    // Add vehicle photos in separate page at the end if available
    if (orderData.photos && orderData.photos.length > 0) {
      this.addVehiclePhotos(orderData.photos);
    }

    // Save the PDF
    const fileName = `${orderData.type} - Nº ${orderData.id}.pdf`;
    this.doc.save(fileName);
  }

    private addWatermark(logoPath: string): void {
    try {
      const imgWidth = 150;
      const imgHeight = imgWidth * 1.41;
      const xPos = (this.pageWidth - imgWidth) / 2;
      const yPos = (this.pageHeight - imgHeight) / 2;

      this.doc.addImage(logoPath, 'PNG', xPos, yPos, imgWidth, imgHeight, '', 'FAST', 0.1);
    } catch (error) {
      console.warn('Could not add watermark image:', error);
    }
  }

    private addHeader(companyInfo: PDFCompanyInfo, documentType: string): void {
    this.doc.setFont('courier', 'bold');
    this.doc.setFontSize(18);
    this.doc.setTextColor(0, 0, 0);
    
    this.doc.text(companyInfo.name, this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 8;

    this.doc.setFont('courier', 'normal');
    this.doc.setFontSize(12);
    
    this.doc.text(`CNPJ: ${companyInfo.cnpj}`, this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 5;
    
    this.doc.text(companyInfo.address, this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 5;

    if (companyInfo.phone) {
      this.doc.text(companyInfo.phone, this.pageWidth / 2, this.currentY, { align: 'center' });
      this.currentY += 5;
    }

    this.currentY += 5;
    
    // Document type title
    this.doc.setFont('courier', 'bold');
    this.doc.setFontSize(14);
    const title = documentType === 'OrdemServico' ? 'ORDEM DE SERVIÇO' : 'ORÇAMENTO';
    this.doc.text(title, this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 10;
  }

    private addOrderInfo(orderData: PDFServiceOrder): void {
    this.doc.setFont('courier', 'normal');
    this.doc.setFontSize(12);
    
    const documentLabel = orderData.type === 'OrdemServico' ? 'Ordem de Serviço' : 'Orçamento';
    
    this.doc.text(`${documentLabel} Nº: ${orderData.id}`, this.margins.left, this.currentY);
    this.doc.text(`Data: ${orderData.date}`, this.pageWidth - 80, this.currentY);
    this.currentY += this.lineHeight;
    
    if (orderData.status) {
      this.doc.text(`Status: ${orderData.status}`, this.margins.left, this.currentY);
      this.currentY += this.lineHeight;
    }
    
    this.currentY += 5;
  }

    private addCustomerInfo(customer: any): void {
    // Customer section title
    this.doc.setFont('courier', 'bold');
    this.doc.setFontSize(14);
    this.doc.text('DADOS DO CLIENTE', this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 8;

    this.doc.setFont('courier', 'normal');
    this.doc.setFontSize(12);
    
    this.doc.text(`Cliente: ${customer.name}`, this.margins.left, this.currentY);
    this.doc.text(`CPF/CNPJ: ${customer.cpf}`, this.pageWidth - 80, this.currentY);
    this.currentY += this.lineHeight;
    
    this.doc.text(`Endereço: ${customer.address}`, this.margins.left, this.currentY);
    this.currentY += this.lineHeight;
    
    if (customer.phone || customer.email) {
      let contactInfo = '';
      if (customer.phone) contactInfo += `Tel: ${customer.phone}`;
      if (customer.email) contactInfo += customer.phone ? ` | Email: ${customer.email}` : `Email: ${customer.email}`;
      
      this.doc.text(contactInfo, this.margins.left, this.currentY);
      this.currentY += this.lineHeight;
    }
    
    this.currentY += 5;
  }

    private addVehicleInfo(vehicle: any): void {
    // Vehicle section title
    this.doc.setFont('courier', 'bold');
    this.doc.setFontSize(14);
    this.doc.text('INFORMAÇÕES DO VEÍCULO', this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 8;

    this.doc.setFont('courier', 'normal');
    this.doc.setFontSize(12);
    
    // First row
    this.doc.text(`Placa: ${vehicle.plate}`, this.margins.left, this.currentY);
    this.doc.text(`Marca: ${vehicle.brand}`, this.margins.left + 60, this.currentY);
    this.doc.text(`Modelo: ${vehicle.model}`, this.margins.left + 120, this.currentY);
    this.currentY += this.lineHeight;
    
    // Second row
    this.doc.text(`Ano: ${vehicle.year}`, this.margins.left, this.currentY);
    this.doc.text(`Cor: ${vehicle.color}`, this.margins.left + 60, this.currentY);
    if (vehicle.currentKm) {
      this.doc.text(`Km Atual: ${vehicle.currentKm}`, this.margins.left + 120, this.currentY);
    }
    this.currentY += this.lineHeight;
    
    this.currentY += 5;
  }

  private addVehiclePhotos(photos: Array<{imagemBase64: string, descricao?: string, nomeArquivo?: string}>): void {
    if (!photos || photos.length === 0) {
      return;
    }

    // Always start photos in a new page
    this.doc.addPage();
    this.currentY = this.margins.top;

    // Add section title
    this.doc.setFont('courier', 'bold');
    this.doc.setFontSize(14);
    this.doc.text('FOTOS DO VEÍCULO', this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 8;

    const photoWidth = 60;
    const photoHeight = 45;
    const photosPerRow = 2;
    const spacingX = 10;
    const spacingY = 8;
    const descriptionHeight = 5;

    let photoIndex = 0;
    
    while (photoIndex < photos.length) {
      // Check if we need a new page
      const spaceNeeded = photoHeight + descriptionHeight + spacingY + 20;
      if (this.currentY + spaceNeeded > this.pageHeight - this.margins.bottom) {
        this.doc.addPage();
        this.currentY = this.margins.top;
        
        // Add continuation header
        this.doc.setFont('courier', 'bold');
        this.doc.setFontSize(12);
        this.doc.text('FERREIRA\'S AUTOMOTIVO - Continuação', this.pageWidth / 2, this.currentY, { align: 'center' });
        this.currentY += 10;
        
        this.doc.setFont('courier', 'bold');
        this.doc.setFontSize(14);
        this.doc.text('FOTOS DO VEÍCULO (continuação)', this.pageWidth / 2, this.currentY, { align: 'center' });
        this.currentY += 8;
      }

      const rowStartY = this.currentY;
      
      // Add photos in row
      for (let col = 0; col < photosPerRow && photoIndex < photos.length; col++) {
        const photo = photos[photoIndex];
        
        // Calculate X position
        const totalRowWidth = (photoWidth * photosPerRow) + (spacingX * (photosPerRow - 1));
        const startX = (this.pageWidth - totalRowWidth) / 2;
        const xPos = startX + (col * (photoWidth + spacingX));
        
        try {
          // Add image
          const imageData = photo.imagemBase64.startsWith('data:') 
            ? photo.imagemBase64 
            : `data:image/jpeg;base64,${photo.imagemBase64}`;
          
          this.doc.addImage(imageData, 'JPEG', xPos, rowStartY, photoWidth, photoHeight);
          
          // Add description if available
          if (photo.descricao) {
            this.doc.setFont('courier', 'normal');
            this.doc.setFontSize(9);
            const descText = photo.descricao.length > 35 
              ? photo.descricao.substring(0, 32) + '...' 
              : photo.descricao;
            this.doc.text(descText, xPos + (photoWidth / 2), rowStartY + photoHeight + 4, { align: 'center' });
          }
        } catch (error) {
          console.warn('Error adding photo to PDF:', error);
          // Add placeholder if image fails
          this.doc.setFont('courier', 'normal');
          this.doc.setFontSize(10);
          this.doc.rect(xPos, rowStartY, photoWidth, photoHeight);
          this.doc.text('Imagem não disponível', xPos + (photoWidth / 2), rowStartY + (photoHeight / 2), { align: 'center' });
        }
        
        photoIndex++;
      }
      
      // Move Y position after row
      this.currentY = rowStartY + photoHeight + descriptionHeight + spacingY;
    }
    
    this.currentY += 5;
  }

    private addServicesSection(services: Array<any>): void {
    // Services section title
    this.doc.setFont('courier', 'bold');
    this.doc.setFontSize(14);
    this.doc.text('SERVIÇOS REALIZADOS', this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 8;

    this.doc.setFont('courier', 'normal');
    this.doc.setFontSize(12);
    
    // Services table header
    this.doc.setFont('courier', 'bold');
    this.doc.text('Descrição', this.margins.left, this.currentY);
    this.doc.text('Valor', this.pageWidth - 50, this.currentY);
    this.currentY += this.lineHeight;
    
    // Draw header line
    this.doc.line(this.margins.left, this.currentY, this.pageWidth - this.margins.right, this.currentY);
    this.currentY += 3;

    this.doc.setFont('courier', 'normal');
    
    // Add each service - using simpler approach to avoid page breaks in middle of services
    services.forEach((service, index) => {
      const serviceText = `${index + 1}. ${service.name}`;
      const valueText = `R$ ${service.value.toFixed(2).replace('.', ',')}`;
      
      this.doc.text(serviceText, this.margins.left, this.currentY);
      this.doc.text(valueText, this.pageWidth - 50, this.currentY);
      this.currentY += this.lineHeight;
      
      if (service.description) {
        this.doc.setFontSize(10);
        this.doc.text(`   ${service.description}`, this.margins.left + 5, this.currentY);
        this.currentY += this.lineHeight;
        this.doc.setFontSize(12);
      }
    });
    
    this.currentY += 5;
  }

    private addTotalValue(totalValue: number): void {
    // Draw total line
    this.doc.line(this.margins.left, this.currentY, this.pageWidth - this.margins.right, this.currentY);
    this.currentY += 5;
    
    this.doc.setFont('courier', 'bold');
    this.doc.setFontSize(14);
    const totalText = `VALOR TOTAL: R$ ${totalValue.toFixed(2).replace('.', ',')}`;
    this.doc.text(totalText, this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 10;
  }

    private addObservations(observations: string): void {
    // Only break page for extremely long observations
    if (this.needsNewPageForObservations(observations)) {
      this.doc.addPage();
      this.currentY = this.margins.top;
      
      // Add simplified header on new page
      this.doc.setFont('courier', 'bold');
      this.doc.setFontSize(12);
      this.doc.text('FERREIRA\'S AUTOMOTIVO - Continuação', this.pageWidth / 2, this.currentY, { align: 'center' });
      this.currentY += 15;
    }
    
    this.doc.setFont('courier', 'bold');
    this.doc.setFontSize(12);
    this.doc.text('OBSERVAÇÕES:', this.margins.left, this.currentY);
    this.currentY += this.lineHeight;
    
    this.doc.setFont('courier', 'normal');
    const maxWidth = this.pageWidth - (this.margins.left + this.margins.right);
    const lines = (this.doc as any).splitTextToSize(observations, maxWidth);
    
    if (Array.isArray(lines)) {
      lines.forEach((line: string) => {
        this.doc.text(line, this.margins.left, this.currentY);
        this.currentY += this.lineHeight;
      });
    } else {
      this.doc.text(observations, this.margins.left, this.currentY);
      this.currentY += this.lineHeight;
    }
    
    this.currentY += 5;
  }

  private addSignatureSection(): void {
    // Always position signatures at the bottom of the page
    const signaturesY = this.pageHeight - 50; // Fixed position from bottom
    
    // If content would overlap with signatures, add new page
    if (this.currentY > signaturesY - 10) {
      this.doc.addPage();
      this.currentY = this.margins.top;
      
      // Add simplified header on new page
      this.doc.setFont('courier', 'bold');
      this.doc.setFontSize(12);
      this.doc.text('FERREIRA\'S AUTOMOTIVO - Continuação', this.pageWidth / 2, this.currentY, { align: 'center' });
      this.currentY += 15;
    }

    // Set signature position at bottom
    this.currentY = signaturesY;

    this.doc.setFont('courier', 'normal');
    this.doc.setFontSize(12);

    // Customer signature
    const customerSigX = this.margins.left;
    this.doc.text('Assinatura do Cliente:', customerSigX, this.currentY);
    this.doc.line(customerSigX, this.currentY + 10, customerSigX + 80, this.currentY + 10);

    // Responsible signature
    const responsibleSigX = this.pageWidth / 2 + 10;
    this.doc.text('Assinatura do Responsável:', responsibleSigX, this.currentY);
    this.doc.line(responsibleSigX, this.currentY + 10, responsibleSigX + 80, this.currentY + 10);
  }

  private addFooter(): void {
    const footerY = this.pageHeight - 25;

    this.doc.setFont('courier', 'normal');
    this.doc.setFontSize(10);

    this.doc.text('Agradecemos pela preferência!', this.pageWidth / 2, footerY, { align: 'center' });
    this.doc.text('Nunca foi sorte, sempre foi Deus!', this.pageWidth / 2, footerY + 5, { align: 'center' });
  }

  

  private needsNewPageForObservations(observations: string): boolean {
    // Only break page if observations are extremely long (more than 500 characters)
    // AND we don't have enough space for at least 3 lines of text + signatures
    const minSpaceNeeded = 60; // Space for observations title + 2-3 lines + signatures
    const availableSpace = this.pageHeight - this.currentY - this.margins.bottom;
    
    return observations.length > 500 && availableSpace < minSpaceNeeded;
  }
}
