export interface RecruiterHistoryItem {
  id: string
  recruiterName: string
  recruiterEmail: string
  recruiterAvatar: string
  roleTitle: string
  userRole: 'recruiter' | 'lead'
  teamLead: string
  clientAccounts: string[]
  assignedRequirementsCount: number
  sourcedProfilesCount: number
  submittedProfilesCount: number
  workingProfilesCount: number
  onHoldProfilesCount: number
  placedCount: number
  topSkillsSourced: string[]
  recentSourcedCandidates: {
    id: string
    candidateName: string
    requirementName: string
    clientName: string
    sourcedDate: string
    status: 'Submitted' | 'Working' | 'On Hold' | 'Sourced'
    experience: string
  }[]
  assignedRequirementsList: {
    id: string
    reqName: string
    clientName: string
    status: 'Open' | 'In Progress' | 'Closed'
    assignedDate: string
    submissionsCount: number
  }[]
}

export const RECRUITERS_HISTORY_DATA: RecruiterHistoryItem[] = [
  {
    id: 'HIST-101',
    recruiterName: 'Marcus Chen',
    recruiterEmail: 'm.chen@talentflow.io',
    recruiterAvatar: 'M',
    roleTitle: 'Senior Technical Recruiter',
    userRole: 'recruiter',
    teamLead: 'Harish Gadipally',
    clientAccounts: ['Accenture'],
    assignedRequirementsCount: 14,
    sourcedProfilesCount: 48,
    submittedProfilesCount: 32,
    workingProfilesCount: 11,
    onHoldProfilesCount: 3,
    placedCount: 2,
    topSkillsSourced: ['React', 'Java Fullstack', 'Node.js', 'AWS'],
    recentSourcedCandidates: [
      { id: 'CAND-001', candidateName: 'Priya Nair', requirementName: 'Lead Java Full Stack Developer', clientName: 'Accenture', sourcedDate: 'Aug 07, 2026', status: 'Submitted', experience: '8 yrs' },
      { id: 'CAND-002', candidateName: 'Alex Turner', requirementName: 'Senior React Developer', clientName: 'Accenture', sourcedDate: 'Aug 05, 2026', status: 'Working', experience: '6 yrs' },
      { id: 'CAND-003', candidateName: 'Rania Khalil', requirementName: 'Node.js Backend Specialist', clientName: 'Accenture', sourcedDate: 'Aug 03, 2026', status: 'Working', experience: '7 yrs' },
      { id: 'CAND-004', candidateName: 'Vikram Mehta', requirementName: 'AWS DevOps Architect', clientName: 'Accenture', sourcedDate: 'Jul 28, 2026', status: 'On Hold', experience: '10 yrs' },
      { id: 'CAND-005', candidateName: 'Ananya Sharma', requirementName: 'Lead Java Full Stack Developer', clientName: 'Accenture', sourcedDate: 'Jul 25, 2026', status: 'Sourced', experience: '5 yrs' },
    ],
    assignedRequirementsList: [
      { id: 'REQ-001', reqName: 'Lead Java Full Stack Developer', clientName: 'Accenture', status: 'In Progress', assignedDate: 'Aug 01, 2026', submissionsCount: 14 },
      { id: 'REQ-002', reqName: 'Senior React Developer', clientName: 'Accenture', status: 'In Progress', assignedDate: 'Jul 20, 2026', submissionsCount: 10 },
      { id: 'REQ-003', reqName: 'Node.js Backend Engineer', clientName: 'Accenture', status: 'Open', assignedDate: 'Jul 15, 2026', submissionsCount: 8 },
    ],
  },
  {
    id: 'HIST-102',
    recruiterName: 'Priya Sharma',
    recruiterEmail: 'p.sharma@talentflow.io',
    recruiterAvatar: 'P',
    roleTitle: 'IT Recruiter',
    userRole: 'recruiter',
    teamLead: 'Harish Gadipally',
    clientAccounts: ['Accenture'],
    assignedRequirementsCount: 12,
    sourcedProfilesCount: 38,
    submittedProfilesCount: 24,
    workingProfilesCount: 9,
    onHoldProfilesCount: 3,
    placedCount: 2,
    topSkillsSourced: ['Java', 'Spring Boot', 'Microservices', 'Angular'],
    recentSourcedCandidates: [
      { id: 'CAND-006', candidateName: 'Suresh Kumar', requirementName: 'Spring Boot Developer', clientName: 'Accenture', sourcedDate: 'Aug 06, 2026', status: 'Submitted', experience: '6 yrs' },
      { id: 'CAND-007', candidateName: 'Meera Rao', requirementName: 'Microservices Engineer', clientName: 'Accenture', sourcedDate: 'Aug 04, 2026', status: 'Working', experience: '5 yrs' },
      { id: 'CAND-008', candidateName: 'Karan Patel', requirementName: 'Angular Frontend Lead', clientName: 'Accenture', sourcedDate: 'Jul 30, 2026', status: 'On Hold', experience: '7 yrs' },
    ],
    assignedRequirementsList: [
      { id: 'REQ-004', reqName: 'Spring Boot Specialist', clientName: 'Accenture', status: 'In Progress', assignedDate: 'Aug 02, 2026', submissionsCount: 12 },
      { id: 'REQ-005', reqName: 'Angular UI Developer', clientName: 'Accenture', status: 'Open', assignedDate: 'Jul 22, 2026', submissionsCount: 12 },
    ],
  },
  {
    id: 'HIST-103',
    recruiterName: 'Suresh kulkarni',
    recruiterEmail: 'suresh.k@talentflow.io',
    recruiterAvatar: 'S',
    roleTitle: 'Technical Recruiter',
    userRole: 'recruiter',
    teamLead: 'Harish Gadipally',
    clientAccounts: ['Accenture'],
    assignedRequirementsCount: 8,
    sourcedProfilesCount: 26,
    submittedProfilesCount: 16,
    workingProfilesCount: 6,
    onHoldProfilesCount: 2,
    placedCount: 1,
    topSkillsSourced: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    recentSourcedCandidates: [
      { id: 'CAND-009', candidateName: 'Amit Verma', requirementName: 'Python Backend Lead', clientName: 'Accenture', sourcedDate: 'Aug 05, 2026', status: 'Submitted', experience: '7 yrs' },
      { id: 'CAND-010', candidateName: 'Neha Gupta', requirementName: 'Django Engineer', clientName: 'Accenture', sourcedDate: 'Aug 01, 2026', status: 'Working', experience: '4 yrs' },
    ],
    assignedRequirementsList: [
      { id: 'REQ-006', reqName: 'Python Backend Engineer', clientName: 'Accenture', status: 'In Progress', assignedDate: 'Jul 28, 2026', submissionsCount: 16 },
    ],
  },
  {
    id: 'HIST-104',
    recruiterName: 'lakshmi.v Recruiter',
    recruiterEmail: 'lakshmi.v@talentflow.io',
    recruiterAvatar: 'L',
    roleTitle: 'Lead Recruiter',
    userRole: 'lead',
    teamLead: 'Tom Walsh',
    clientAccounts: ['Goldman Sachs'],
    assignedRequirementsCount: 18,
    sourcedProfilesCount: 58,
    submittedProfilesCount: 42,
    workingProfilesCount: 12,
    onHoldProfilesCount: 4,
    placedCount: 3,
    topSkillsSourced: ['Core Java', 'FinTech', 'Low Latency C++', 'Kafka'],
    recentSourcedCandidates: [
      { id: 'CAND-011', candidateName: 'Rohan Joshi', requirementName: 'FinTech Java Lead', clientName: 'Goldman Sachs', sourcedDate: 'Aug 07, 2026', status: 'Submitted', experience: '11 yrs' },
      { id: 'CAND-012', candidateName: 'Deepa Roy', requirementName: 'Low Latency C++ Developer', clientName: 'Goldman Sachs', sourcedDate: 'Aug 04, 2026', status: 'Working', experience: '9 yrs' },
    ],
    assignedRequirementsList: [
      { id: 'REQ-007', reqName: 'Java Quantitative Architect', clientName: 'Goldman Sachs', status: 'In Progress', assignedDate: 'Jul 10, 2026', submissionsCount: 22 },
    ],
  },
  {
    id: 'HIST-105',
    recruiterName: 'Lingoji Pavani',
    recruiterEmail: 'lingoji.p@talentflow.io',
    recruiterAvatar: 'L',
    roleTitle: 'Senior Technical Recruiter',
    userRole: 'recruiter',
    teamLead: 'Tom Walsh',
    clientAccounts: ['Goldman Sachs'],
    assignedRequirementsCount: 10,
    sourcedProfilesCount: 32,
    submittedProfilesCount: 20,
    workingProfilesCount: 8,
    onHoldProfilesCount: 2,
    placedCount: 2,
    topSkillsSourced: ['PySpark', 'Snowflake', 'Big Data', 'ETL'],
    recentSourcedCandidates: [
      { id: 'CAND-013', candidateName: 'Tarun Deshmukh', requirementName: 'Snowflake Data Engineer', clientName: 'Goldman Sachs', sourcedDate: 'Aug 03, 2026', status: 'Working', experience: '8 yrs' },
    ],
    assignedRequirementsList: [
      { id: 'REQ-008', reqName: 'Big Data Pipeline Lead', clientName: 'Goldman Sachs', status: 'In Progress', assignedDate: 'Jul 18, 2026', submissionsCount: 14 },
    ],
  },
  {
    id: 'HIST-106',
    recruiterName: 'Arvind GR',
    recruiterEmail: 'arvind.g@talentflow.io',
    recruiterAvatar: 'A',
    roleTitle: 'Technical Sourcing Recruiter',
    userRole: 'recruiter',
    teamLead: 'Tom Walsh',
    clientAccounts: ['Goldman Sachs'],
    assignedRequirementsCount: 6,
    sourcedProfilesCount: 22,
    submittedProfilesCount: 14,
    workingProfilesCount: 5,
    onHoldProfilesCount: 1,
    placedCount: 1,
    topSkillsSourced: ['React', 'TypeScript', 'Tailwind', 'GraphQL'],
    recentSourcedCandidates: [
      { id: 'CAND-014', candidateName: 'Nikhil Saxena', requirementName: 'Frontend React Architect', clientName: 'Goldman Sachs', sourcedDate: 'Aug 02, 2026', status: 'Submitted', experience: '8 yrs' },
    ],
    assignedRequirementsList: [
      { id: 'REQ-009', reqName: 'Frontend React Architect', clientName: 'Goldman Sachs', status: 'In Progress', assignedDate: 'Jul 25, 2026', submissionsCount: 8 },
    ],
  },
]
