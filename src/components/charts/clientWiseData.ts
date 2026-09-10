export interface ClientTeamMetric {
  clientName: string
  leadAssignedReqs: number
  harishSubmissions: number
  sathvikaSubmissions: number
  shaikSubmissions: number
  saitejaSubmissions: number
  kulkarniSubmissions: number
  totalClientSubmissions: number
}

export const CLIENT_WISE_DATA: ClientTeamMetric[] = [
  { clientName: 'METAFORGE (INTERNAL DATA ENTRY)', leadAssignedReqs: 4, harishSubmissions: 3, sathvikaSubmissions: 2, shaikSubmissions: 1, saitejaSubmissions: 0, kulkarniSubmissions: 0, totalClientSubmissions: 6 },
  { clientName: 'TPC Tata / Any LTTS', leadAssignedReqs: 14, harishSubmissions: 4, sathvikaSubmissions: 6, shaikSubmissions: 2, saitejaSubmissions: 3, kulkarniSubmissions: 3, totalClientSubmissions: 18 },
  { clientName: 'ACCENTURE', leadAssignedReqs: 12, harishSubmissions: 6, sathvikaSubmissions: 4, shaikSubmissions: 2, saitejaSubmissions: 1, kulkarniSubmissions: 1, totalClientSubmissions: 14 },
  { clientName: 'GOLDMAN SACHS', leadAssignedReqs: 8, harishSubmissions: 2, sathvikaSubmissions: 1, shaikSubmissions: 3, saitejaSubmissions: 2, kulkarniSubmissions: 1, totalClientSubmissions: 9 },
  { clientName: 'TESLA AI', leadAssignedReqs: 10, harishSubmissions: 3, sathvikaSubmissions: 2, shaikSubmissions: 2, saitejaSubmissions: 2, kulkarniSubmissions: 2, totalClientSubmissions: 11 },
  { clientName: 'WIPRO', leadAssignedReqs: 6, harishSubmissions: 2, sathvikaSubmissions: 1, shaikSubmissions: 1, saitejaSubmissions: 2, kulkarniSubmissions: 1, totalClientSubmissions: 7 },
  { clientName: 'MICROSOFT', leadAssignedReqs: 5, harishSubmissions: 1, sathvikaSubmissions: 2, shaikSubmissions: 1, saitejaSubmissions: 0, kulkarniSubmissions: 1, totalClientSubmissions: 5 },
]
