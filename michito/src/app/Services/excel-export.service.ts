import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {
  constructor() {}

  exportToExcel<T extends object>(
    data: T[], 
    fileName: string, 
    headers: { [key: string]: string },
    title: string = 'Reporte'
  ) {
    // Crear el libro y la hoja
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);

    // Preparar los datos
    const worksheetData = this.prepareData(data, headers);

    // Configurar anchos de columna
    const columnWidths = Object.keys(headers).map(() => ({ wch: 20 }));
    worksheet['!cols'] = columnWidths;

    // Añadir título y datos
    XLSX.utils.sheet_add_aoa(worksheet, [
      [title], // Título
      [], // Espacio en blanco
      Object.values(headers), // Encabezados
    ]);

    // Añadir los datos desde la fila 4
    XLSX.utils.sheet_add_json(worksheet, worksheetData, {
      origin: 'A4',
      skipHeader: true
    });

    // Obtener el rango de datos
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');

    // Aplicar estilos
    this.applyStyles(worksheet, range, Object.keys(headers).length);

    // Añadir la hoja al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');

    // Guardar archivo
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }

  private prepareData<T extends object>(data: T[], headers: { [key: string]: string }): any[] {
    if (!data || data.length === 0) return [];

    return data.map(item => {
      const newItem: any = {};
      Object.keys(headers).forEach(key => {
        if (key in item) {
          if (key === 'estado') {
            newItem[headers[key]] = (item as any)[key] ? 'Activo' : 'Inactivo';
          } else {
            newItem[headers[key]] = (item as any)[key];
          }
        }
      });
      return newItem;
    });
  }

  private applyStyles(worksheet: XLSX.WorkSheet, range: XLSX.Range, numColumns: number) {
    // Estilo para el título
    this.applyCellStyle(worksheet, 0, 0, {
      font: { 
        bold: true, 
        sz: 14,
        color: { rgb: "FFFFFF" }
      },
      fill: { 
        patternType: 'solid',
        fgColor: { rgb: "44344F" } // Color morado oscuro
      },
      alignment: { 
        horizontal: 'center',
        vertical: 'center'
      }
    });

    // Combinar celdas para el título
    worksheet['!merges'] = [{
      s: { r: 0, c: 0 },
      e: { r: 0, c: numColumns - 1 }
    }];

    // Estilos para los encabezados
    for (let c = 0; c < numColumns; c++) {
      this.applyCellStyle(worksheet, 2, c, {
        font: { 
          bold: true,
          color: { rgb: "FFFFFF" }
        },
        fill: { 
          patternType: 'solid',
          fgColor: { rgb: "5A4076" } // Color morado más claro
        },
        alignment: { 
          horizontal: 'center',
          vertical: 'center'
        },
        border: {
          top: { style: 'thin', color: { rgb: "000000" } },
          bottom: { style: 'thin', color: { rgb: "000000" } },
          left: { style: 'thin', color: { rgb: "000000" } },
          right: { style: 'thin', color: { rgb: "000000" } }
        }
      });
    }

    // Estilos para los datos
    for (let r = 3; r <= range.e.r; r++) {
      for (let c = 0; c <= range.e.c; c++) {
        this.applyCellStyle(worksheet, r, c, {
          font: { sz: 11 },
          alignment: { 
            horizontal: 'center',
            vertical: 'center'
          },
          border: {
            top: { style: 'thin', color: { rgb: "D3D3D3" } },
            bottom: { style: 'thin', color: { rgb: "D3D3D3" } },
            left: { style: 'thin', color: { rgb: "D3D3D3" } },
            right: { style: 'thin', color: { rgb: "D3D3D3" } }
          },
          fill: {
            patternType: 'solid',
            fgColor: { rgb: r % 2 ? "F8F9FA" : "FFFFFF" }
          }
        });
      }
    }
  }

  private applyCellStyle(worksheet: XLSX.WorkSheet, row: number, col: number, style: any) {
    const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
    if (!worksheet[cellRef]) {
      worksheet[cellRef] = { v: '', s: style };
    } else {
      worksheet[cellRef].s = style;
    }
  }
}