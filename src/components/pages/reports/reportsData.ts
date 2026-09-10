import { Role } from '../../../types'

export interface ClientPerformanceData {
  id: string
  clientName: string
  reqSent: number
  reqAssigned: number
  submissions: number
  subRatio: number
  openReqs: number
  closedReqs: number
  activeRecruiters: number
  requirementsList: {
    id: string
    title: string
    assignedRecruiter: string
    submissions: number
    status: 'Open' | 'Closed' | 'In Progress'
    createdDate: string
  }[]
}

export interface RecruiterReqDashboardItem {
  id: string
  recruiterName: string
  recruiterRole?: string
  assignedReqsCount: number
  submissionsCount: number
  subRatio: number
  submittedClients: string[]
  clientBreakdown: { client: string; submissions: number }[]
  totalInterviews: number
  selectedCount: number
  rejectedCount: number
  avgTurnaroundDays: number
  conversionRate: number
  activeRequirements: {
    reqId: string
    title: string
    client: string
    submissions: number
    status: 'Open' | 'Closed' | 'In Progress'
  }[]
}

export const MOCK_RECRUITERS_REPORT_DATA: RecruiterReqDashboardItem[] = [
  {
    id: 'REC-101',
    recruiterName: 'Marcus Chen',
    recruiterRole: 'Recruiter',
    assignedReqsCount: 8,
    submissionsCount: 28,
    subRatio: 3.5,
    submittedClients: ['Accenture', 'LTTS / L&T', 'Bosch Global'],
    clientBreakdown: [
      { client: 'Accenture', submissions: 14 },
      { client: 'LTTS / L&T', submissions: 9 },
      { client: 'Bosch Global', submissions: 5 },
    ],
    totalInterviews: 12,
    selectedCount: 4,
    rejectedCount: 3,
    avgTurnaroundDays: 2.4,
    conversionRate: 14.2,
    activeRequirements: [
      { reqId: 'REQ-2026-08-12-001', title: 'Senior React Developer', client: 'Accenture', submissions: 14, status: 'Open' },
      { reqId: 'REQ-2026-08-12-002', title: 'AUTOSAR Integration Architect', client: 'LTTS / L&T', submissions: 9, status: 'In Progress' },
    ],
  },
  {
    id: 'REC-102',
    recruiterName: 'Priya Sharma',
    recruiterRole: 'Recruiter',
    assignedReqsCount: 6,
    submissionsCount: 19,
    subRatio: 3.1,
    submittedClients: ['Continental Automotive', 'ITC Infotech'],
    clientBreakdown: [
      { client: 'Continental Automotive', submissions: 12 },
      { client: 'ITC Infotech', submissions: 7 },
    ],
    totalInterviews: 8,
    selectedCount: 2,
    rejectedCount: 2,
    avgTurnaroundDays: 3.1,
    conversionRate: 10.5,
    activeRequirements: [
      { reqId: 'REQ-2026-08-12-003', title: 'Dot Net Angular Architect', client: 'ITC Infotech', submissions: 7, status: 'Open' },
    ],
  },
  {
    id: 'REC-103',
    recruiterName: 'Suresh Kulkarni',
    recruiterRole: 'Recruiter',
    assignedReqsCount: 7,
    submissionsCount: 22,
    subRatio: 3.14,
    submittedClients: ['Bosch Global', 'LTTS / L&T'],
    clientBreakdown: [
      { client: 'Bosch Global', submissions: 14 },
      { client: 'LTTS / L&T', submissions: 8 },
    ],
    totalInterviews: 10,
    selectedCount: 3,
    rejectedCount: 4,
    avgTurnaroundDays: 2.8,
    conversionRate: 13.6,
    activeRequirements: [
      { reqId: 'REQ-2026-08-12-004', title: 'Embedded Firmware Lead', client: 'Bosch Global', submissions: 14, status: 'Open' },
    ],
  },
]

export const MOCK_CLIENT_PERFORMANCE_DATA: ClientPerformanceData[] = [
  {
    id: 'CLI-001',
    clientName: 'Accenture Enterprise',
    reqSent: 18,
    reqAssigned: 16,
    submissions: 54,
    subRatio: 3.0,
    openReqs: 12,
    closedReqs: 6,
    activeRecruiters: 4,
    requirementsList: [
      { id: 'REQ-001', title: 'Java Cloud Architect', assignedRecruiter: 'Marcus Chen', submissions: 14, status: 'Open', createdDate: '2026-08-10' },
      { id: 'REQ-002', title: 'DevOps Lead Engineer', assignedRecruiter: 'Priya Sharma', submissions: 12, status: 'In Progress', createdDate: '2026-08-12' },
    ],
  },
  {
    id: 'CLI-002',
    clientName: 'LTTS / L&T',
    reqSent: 15,
    reqAssigned: 14,
    submissions: 42,
    subRatio: 3.0,
    openReqs: 9,
    closedReqs: 6,
    activeRecruiters: 3,
    requirementsList: [
      { id: 'REQ-003', title: 'Teamcenter PLM Admin', assignedRecruiter: 'Harish Gadipally', submissions: 18, status: 'Open', createdDate: '2026-08-08' },
    ],
  },
  {
    id: 'CLI-003',
    clientName: 'Continental Automotive',
    reqSent: 12,
    reqAssigned: 10,
    submissions: 31,
    subRatio: 3.1,
    openReqs: 7,
    closedReqs: 5,
    activeRecruiters: 3,
    requirementsList: [],
  },
  {
    id: 'CLI-004',
    clientName: 'Bosch Global',
    reqSent: 14,
    reqAssigned: 12,
    submissions: 38,
    subRatio: 3.16,
    openReqs: 8,
    closedReqs: 6,
    activeRecruiters: 3,
    requirementsList: [],
  },
]
