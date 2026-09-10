import { Interview, Role, Requirement } from '../../../types'

export interface ScheduleRowItem {
  id: string
  candidateName: string
  position: string
  company: string
  round: string
  dateTime: string
  mode: string
  status: 'Upcoming' | 'In Progress' | 'Completed' | 'Scheduled'
  requirementId?: string
  teamLead?: string
  submittedBy?: string
}

export interface FinalDecisionRowItem {
  id: string
  candidateName: string
  requirementId: string
  requirement: string
  decision: 'Selected for Interview' | 'Rejected in Interview' | 'Pending'
  rejectionReason: string
  offerLetter: string
  client?: string
  teamLead?: string
  submittedBy?: string
}

export type RejectionStageType = 'Screening' | 'L1 Technical' | 'L2 Technical' | 'L3 / Manager' | 'Final HR Round'

export interface RejectedCandidateRowItem {
  id: string
  candidateName: string
  position: string
  company: string
  rejectedStage: RejectionStageType
  rejectionReason: string
  evaluatorNotes: string
  evaluatedBy: string
  submittedBy?: string
  teamLead?: string
  rejectionDate: string
  requirementId: string
  candidateId?: string
}

export const DEFAULT_SCHEDULE_ITEMS: ScheduleRowItem[] = [
  {
    id: '1',
    candidateName: 'Priyanka Sharma',
    position: 'QA Lead, Selenium',
    company: 'LTTS / L&T',
    round: 'L1 Technical',
    dateTime: 'Today, 04:30 PM',
    mode: 'Online (MS Teams)',
    status: 'Upcoming',
    requirementId: 'REQ-2026-08-12-001',
    teamLead: 'Harish Gadipally',
    submittedBy: 'Marcus Chen',
  },
  {
    id: '2',
    candidateName: 'Manjeet Kumar',
    position: 'Dot Net Angular Architect',
    company: 'ITC Infotech',
    round: 'Final HR Round',
    dateTime: 'Tomorrow, 11:00 AM',
    mode: 'Online (Google Meet)',
    status: 'Scheduled',
    requirementId: 'REQ-2026-08-12-003',
    teamLead: 'Harish Gadipally',
    submittedBy: 'Priya Sharma',
  },
]

export const DEFAULT_FINAL_DECISIONS: FinalDecisionRowItem[] = [
  {
    id: '1',
    candidateName: 'Pritish Malik',
    requirementId: 'REQ-2026-08-12-001',
    requirement: 'QA Lead, Selenium',
    decision: 'Selected for Interview',
    rejectionReason: '—',
    offerLetter: 'Released (₹25 LPA)',
    client: 'METAFORGE (INTERNAL)',
    teamLead: 'Harish Gadipally',
    submittedBy: 'Marcus Chen',
  },
  {
    id: '2',
    candidateName: 'Suresh Kulkarni',
    requirementId: 'REQ-2026-08-12-004',
    requirement: 'PLM / PDM Lead Engineer',
    decision: 'Rejected in Interview',
    rejectionReason: 'Technical evaluation score below threshold in L1',
    offerLetter: '—',
    client: 'Accenture',
    teamLead: 'Harish Gadipally',
    submittedBy: 'Suresh Kulkarni',
  },
]

export const DEFAULT_REJECTED_CANDIDATES: RejectedCandidateRowItem[] = [
  {
    id: 'rej-1',
    candidateName: 'Suresh Kulkarni',
    candidateId: 'CAND-18012',
    position: 'PLM / PDM Lead Engineer',
    company: 'Accenture',
    rejectedStage: 'L1 Technical',
    rejectionReason: 'Technical evaluation score below threshold (C++ & PLM architecture round)',
    evaluatorNotes: 'Failed coding assessment on C++ memory management and CAD API integrations.',
    evaluatedBy: 'Rajesh V. (Tech Panel L1)',
    submittedBy: 'Suresh kulkarni',
    teamLead: 'Harish Gadipally',
    rejectionDate: 'Aug 16, 2026',
    requirementId: 'REQ-2026-08-12-004',
  },
  {
    id: 'rej-2',
    candidateName: 'Abhijit Narke',
    candidateId: 'CAND-18009',
    position: 'Java Lead Engineer',
    company: 'Goldman Sachs',
    rejectedStage: 'Screening',
    rejectionReason: 'Notice period exceeds 60 days budget limit',
    evaluatorNotes: 'Candidate serving 90 days notice period; client requires immediate joiner within 30 days.',
    evaluatedBy: 'Harish Gadipally (Lead)',
    submittedBy: 'Lingoji Pavani',
    teamLead: 'Tom Walsh',
    rejectionDate: 'Aug 14, 2026',
    requirementId: 'REQ-2026-08-06-005',
  },
]
