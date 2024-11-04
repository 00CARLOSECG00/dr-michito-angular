import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  async generarPDF(elementId: string, nombreArchivo: string) {
    // Obtener el elemento
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
      // Capturar el elemento como imagen
      const canvas = await html2canvas(element, {
        scale: 2, // Mayor calidad
        useCORS: true, // Para imágenes externas
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Crear PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Calcular dimensiones
      const imgWidth = 210; // A4 width en mm
      const pageHeight = 297; // A4 height en mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Primera página
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Páginas adicionales si el contenido es largo
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Descargar PDF
      pdf.save(nombreArchivo);
    } catch (error) {
      console.error('Error al generar PDF:', error);
    }
  }
}
