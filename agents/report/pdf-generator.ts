import PDFDocument from 'pdfkit'

export interface ReportData {
  tenantNome: string
  semanaInicio: Date
  semanaFim: Date
  totalEntradas: number
  totalSaidas: number
  saldoSemana: number
  totalImpostos: number
  totalNfs: number
  alertas: string[]
  analiseTexto: string
}

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR')
}

export function generateReportPdf(data: ReportData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 })
    const chunks: Buffer[] = []

    doc.on('data', (chunk: Buffer) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    // Header
    doc.fontSize(20).font('Helvetica-Bold').text('Assistly', 50, 50)
    doc.fontSize(14).font('Helvetica').fillColor('#666666')
      .text(`Relatório Semanal — ${data.tenantNome}`, 50, 78)
    doc.fontSize(11).text(
      `${formatDate(data.semanaInicio)} a ${formatDate(data.semanaFim)}`,
      50, 98
    )

    doc.moveTo(50, 120).lineTo(545, 120).strokeColor('#e5e7eb').stroke()

    // Resumo financeiro
    doc.moveDown(2)
    doc.fontSize(13).font('Helvetica-Bold').fillColor('#111827').text('Resumo Financeiro', 50)
    doc.moveDown(0.5)

    const col1 = 50, col2 = 200
    doc.fontSize(10).font('Helvetica').fillColor('#374151')
    doc.text('Total de Entradas:', col1).moveUp()
    doc.font('Helvetica-Bold').fillColor('#059669').text(formatBRL(data.totalEntradas), col2)

    doc.font('Helvetica').fillColor('#374151').text('Total de Saídas:', col1).moveUp()
    doc.font('Helvetica-Bold').fillColor('#dc2626').text(formatBRL(data.totalSaidas), col2)

    doc.font('Helvetica').fillColor('#374151').text('Saldo da Semana:', col1).moveUp()
    const saldoColor = data.saldoSemana >= 0 ? '#059669' : '#dc2626'
    doc.font('Helvetica-Bold').fillColor(saldoColor).text(formatBRL(data.saldoSemana), col2)

    doc.font('Helvetica').fillColor('#374151').text('Total de Impostos:', col1).moveUp()
    doc.font('Helvetica-Bold').fillColor('#d97706').text(formatBRL(data.totalImpostos), col2)

    doc.font('Helvetica').fillColor('#374151').text('Notas Fiscais Processadas:', col1).moveUp()
    doc.font('Helvetica-Bold').fillColor('#111827').text(String(data.totalNfs), col2)

    // Análise IA
    doc.moveDown(2)
    doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#e5e7eb').stroke()
    doc.moveDown(1)
    doc.fontSize(13).font('Helvetica-Bold').fillColor('#111827').text('Análise da Semana')
    doc.moveDown(0.5)
    doc.fontSize(10).font('Helvetica').fillColor('#374151').text(data.analiseTexto, { width: 495, align: 'justify' })

    // Alertas
    if (data.alertas.length > 0) {
      doc.moveDown(1.5)
      doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#e5e7eb').stroke()
      doc.moveDown(1)
      doc.fontSize(13).font('Helvetica-Bold').fillColor('#dc2626').text('Alertas')
      doc.moveDown(0.5)
      data.alertas.forEach(alerta => {
        doc.fontSize(10).font('Helvetica').fillColor('#374151').text(`• ${alerta}`, { width: 495 })
        doc.moveDown(0.3)
      })
    }

    // Footer
    const pageHeight = doc.page.height
    doc.fontSize(8).fillColor('#9ca3af')
      .text('Gerado automaticamente pelo Assistly', 50, pageHeight - 50, { align: 'center', width: 495 })

    doc.end()
  })
}
