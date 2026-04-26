export interface LeadMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface LeadQualification {
  nome?: string
  servicoInteresse?: string
  porteEmpresa?: string
  faturamentoEstimado?: string
  urgencia?: 'ALTA' | 'MEDIA' | 'BAIXA'
  resumo?: string
}
