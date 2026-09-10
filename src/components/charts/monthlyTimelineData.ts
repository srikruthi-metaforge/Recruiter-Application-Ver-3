export interface MonthlyMetric {
  month: string
  requirementsReceived: number
  totalPositions: number
  firstSubmissions: number
  totalSubmissions: number
  avgTATDays: number | null
}

export interface DetailLogItem {
  id: string
  subject: string
  recruiter: string
  clientPOC: string
  receivedDate: string
  receivedTime: string
  submittedDate: string
  submittedTime: string
  positions: number
}

export const MONTHLY_TIMELINE_DATA: MonthlyMetric[] = [
  { month: 'Apr 2026', requirementsReceived: 40, totalPositions: 95, firstSubmissions: 0, totalSubmissions: 0, avgTATDays: null },
  { month: 'May 2026', requirementsReceived: 92, totalPositions: 215, firstSubmissions: 19, totalSubmissions: 23, avgTATDays: 4.84 },
  { month: 'Jun 2026', requirementsReceived: 86, totalPositions: 198, firstSubmissions: 41, totalSubmissions: 86, avgTATDays: 1.1 },
  { month: 'Jul 2026', requirementsReceived: 68, totalPositions: 154, firstSubmissions: 52, totalSubmissions: 187, avgTATDays: 0.73 },
]

export const FIRST_SUBMISSION_LOGS: DetailLogItem[] = [
  { id: 'REQ-2026-05-08-003', subject: 'TPC OSI PI Engineer / Lead Engineer - TPC Any LTTS', recruiter: 'Charlie Darwin', clientPOC: 'Trayeetanu Ganguly', receivedDate: '08 May 2026', receivedTime: '01:58 pm', submittedDate: '26 Jun 2026', submittedTime: '01:19 pm', positions: 6 },
  { id: 'REQ-2026-05-12-014', subject: 'TPC Data Analyst for Vadodara-TPC', recruiter: 'Charlie Darwin', clientPOC: 'Trayeetanu Ganguly', receivedDate: '12 May 2026', receivedTime: '04:05 pm', submittedDate: '01 Jun 2026', submittedTime: '03:22 pm', positions: 4 },
  { id: 'REQ-2026-05-19-010', subject: 'C# with Mobile Automation', recruiter: 'lakshmi.v Recruiter', clientPOC: 'Trayeetanu Ganguly', receivedDate: '19 May 2026', receivedTime: '05:30 am', submittedDate: '19 May 2026', submittedTime: '06:47 pm', positions: 8 },
  { id: 'REQ-2026-05-19-003', subject: 'TPC- MIG exhaust welding fixture / BIW welding fixture', recruiter: 'Suresh kulkarni', clientPOC: 'Trayeetanu Ganguly', receivedDate: '19 May 2026', receivedTime: '11:57 am', submittedDate: '29 May 2026', submittedTime: '08:27 pm', positions: 5 },
  { id: 'REQ-2026-05-21-004', subject: 'MIG welding Fixtures / Modular Fixtures', recruiter: 'Viswanath Reddy', clientPOC: 'Internal (data entry)', receivedDate: '21 May 2026', receivedTime: '05:30 am', submittedDate: '25 May 2026', submittedTime: '04:04 pm', positions: 3 },
  { id: 'REQ-2026-05-27-001', subject: 'TPC-Electrical Harness / Harness fixture design', recruiter: 'Suresh kulkarni', clientPOC: 'Trayeetanu Ganguly', receivedDate: '27 May 2026', receivedTime: '10:04 am', submittedDate: '29 May 2026', submittedTime: '04:36 pm', positions: 4 },
  { id: 'REQ-2026-05-27-002', subject: 'Automative BIW Fixture Design Engineer', recruiter: 'Suresh kulkarni', clientPOC: 'Trayeetanu Ganguly', receivedDate: '27 May 2026', receivedTime: '10:04 am', submittedDate: '29 May 2026', submittedTime: '08:04 pm', positions: 3 },
  { id: 'REQ-2026-05-28-005', subject: 'PLC Programmer / Controls Engineer - TPC Any LTTS', recruiter: 'rahimoon Shaik', clientPOC: 'Trayeetanu Ganguly', receivedDate: '28 May 2026', receivedTime: '03:15 pm', submittedDate: '29 May 2026', submittedTime: '11:20 am', positions: 5 },
  { id: 'REQ-2026-05-29-002', subject: 'Embedded C/C++ Developer with CAN/UDS', recruiter: 'Puttapaka Saiteja', clientPOC: 'Trayeetanu Ganguly', receivedDate: '29 May 2026', receivedTime: '09:40 am', submittedDate: '29 May 2026', submittedTime: '05:12 pm', positions: 4 },
]
