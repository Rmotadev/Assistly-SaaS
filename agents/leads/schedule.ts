export function isDuranteExpediente(
  horarioInicio: string,
  horarioFim: string,
  now: Date = new Date()
): boolean {
  // Converte para fuso horário de Brasília
  const brasiliaTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }))
  
  // Verifica se é fim de semana (0 = Domingo, 6 = Sábado)
  const day = brasiliaTime.getDay()
  if (day === 0 || day === 6) return false

  const currentMinutes = brasiliaTime.getHours() * 60 + brasiliaTime.getMinutes()

  const [inicioH, inicioM] = horarioInicio.split(':').map(Number)
  const [fimH, fimM] = horarioFim.split(':').map(Number)

  const inicioMinutes = inicioH * 60 + inicioM
  const fimMinutes = fimH * 60 + fimM

  return currentMinutes >= inicioMinutes && currentMinutes < fimMinutes
}
