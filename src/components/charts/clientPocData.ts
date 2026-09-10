export interface ClientPOCMetric {
  pocName: string
  clientName: string
  requirementsReceived: number
  totalPositions: number
  firstSubmissions: number
  totalSubmissions: number
  conversionRate: number
}

export const CLIENT_POC_DATA: ClientPOCMetric[] = [
  { pocName: 'Trayeetanu Ganguly', clientName: 'TPC / Tata Group', requirementsReceived: 42, totalPositions: 110, firstSubmissions: 28, totalSubmissions: 89, conversionRate: 80.9 },
  { pocName: 'Rahul Deshmukh', clientName: 'Accenture', requirementsReceived: 35, totalPositions: 85, firstSubmissions: 22, totalSubmissions: 74, conversionRate: 87.1 },
  { pocName: 'Sanjay Varma', clientName: 'Goldman Sachs', requirementsReceived: 28, totalPositions: 62, firstSubmissions: 19, totalSubmissions: 58, conversionRate: 93.5 },
  { pocName: 'Neha Kulkarni', clientName: 'Tesla / AI Division', requirementsReceived: 24, totalPositions: 55, firstSubmissions: 15, totalSubmissions: 46, conversionRate: 83.6 },
  { pocName: 'Anand Joshi', clientName: 'LTIMindtree', requirementsReceived: 19, totalPositions: 42, firstSubmissions: 12, totalSubmissions: 35, conversionRate: 83.3 },
  { pocName: 'Vikramaditya Sen', clientName: 'Wipro Technologies', requirementsReceived: 16, totalPositions: 38, firstSubmissions: 10, totalSubmissions: 29, conversionRate: 76.3 },
  { pocName: 'Priya Nair', clientName: 'Capgemini', requirementsReceived: 14, totalPositions: 30, firstSubmissions: 9, totalSubmissions: 25, conversionRate: 83.3 },
  { pocName: 'Amitabh Sen', clientName: 'Bosch Automotive', requirementsReceived: 12, totalPositions: 26, firstSubmissions: 8, totalSubmissions: 21, conversionRate: 80.8 },
]
