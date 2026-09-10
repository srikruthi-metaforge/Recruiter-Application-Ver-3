import { Candidate, Requirement, Role } from '../../../types'
import { getSubmissionsStore } from '../../../data/submissionsStore'

export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email || ''
  const parts = email.split('@')
  const user = parts[0]
  const domain = parts[1]
  if (user.length <= 2) return user[0] + '*'.repeat(user.length - 1) + '@' + domain
  const firstChar = user[0]
  const lastChar = user[user.length - 1]
  const maskedMiddle = '*'.repeat(user.length - 2)
  return `${firstChar}${maskedMiddle}${lastChar}@${domain}`
}

export function maskPhone(phone: string): string {
  if (!phone) return '+91**********'
  const trimmed = phone.trim()
  if (trimmed.startsWith('+')) {
    const parts = trimmed.split(' ')
    const countryCode = parts[0]
    return `${countryCode}**********`
  }
  return '+91**********'
}

export interface CandidateRepoItem {
  id: string
  candidateId: string
  name: string
  email: string
  phone: string
  technology: string
  totalExperience: string
  createdDate: string
  createdBy: string
  status?: string
  qualification?: string
  skills?: string
  relevantExperience?: string
  currentCompany?: string
  currentCtc?: string
  expectedCtc?: string
  noticePeriod?: string
  currentLocation?: string
  preferredLocation?: string
  interviewAvailability?: string
  reasonForChange?: string
  offerInHand?: string
  resumeReference?: string
  notes?: string
}

export function getCandidateSubmissionsHistory(item: CandidateRepoItem) {
  const store = getSubmissionsStore()
  const normEmail = item.email ? item.email.trim().toLowerCase() : ''
  const normPhone = item.phone ? item.phone.replace(/[^\d]/g, '').slice(-10) : ''
  const normName = item.name ? item.name.trim().toLowerCase() : ''

  const matches = store.filter(sub => {
    if (normEmail && sub.email && sub.email.trim().toLowerCase() === normEmail) return true
    if (normPhone && sub.phone && sub.phone.replace(/[^\d]/g, '').slice(-10) === normPhone) return true
    if (normName && sub.candidate) {
      const subName = sub.candidate.trim().toLowerCase()
      if (subName === normName || subName.includes(normName) || normName.includes(subName)) return true
    }
    return false
  })

  let records = matches.map(m => ({
    id: m.id || `SUB-${Math.random().toString(36).substr(2, 6)}`,
    client: m.client || 'Client Account',
    requirementTitle: m.req || 'Requirement Title',
    reqId: m.req || 'REQ-001',
    submittedBy: m.recruiter || 'Recruiter',
    submittedDate: m.date || 'Aug 04, 2026',
    status: m.stage || 'Submitted to Client',
  }))

  if (records.length === 0) {
    if (item.candidateId === '18016') {
      records = [
        { id: 'SUB-901', client: 'Accenture', requirementTitle: 'Senior React Developer', reqId: 'REQ-001', submittedBy: 'Marcus Chen', submittedDate: 'Aug 02, 2026, 02:30 PM', status: 'Submitted to Client' },
        { id: 'SUB-902', client: 'Capgemini', requirementTitle: 'SAP Transportation Management', reqId: 'REQ-2026-08-06-001', submittedBy: 'Adirala sathvika', submittedDate: 'Aug 06, 2026, 11:15 AM', status: 'Interview Scheduled' }
      ]
    } else if (item.candidateId === '18015') {
      records = [
        { id: 'SUB-903', client: 'Infosys', requirementTitle: 'Java Architect', reqId: 'REQ-002', submittedBy: 'Priya Sharma', submittedDate: 'Aug 03, 2026, 04:10 PM', status: 'Submitted to Lead' },
        { id: 'SUB-904', client: 'Goldman Sachs', requirementTitle: 'SAP TM+ S4 Hana', reqId: 'REQ-2026-08-06-002', submittedBy: 'Arvind GR', submittedDate: 'Aug 06, 2026, 01:45 PM', status: 'Submitted to Client' }
      ]
    }
  }

  return {
    count: records.length,
    records,
    companyNames: Array.from(new Set(records.map(r => r.client))).join(', '),
  }
}

export const INITIAL_CANDIDATE_DATA: CandidateRepoItem[] = [
  {
    id: '1',
    candidateId: '18016',
    name: 'Pritish Malik',
    email: 'pritishmalik8@gmail.com',
    phone: '+91 98210 44905',
    technology: 'QA Lead, Selenium, Automation Frameworks',
    totalExperience: '11 Years 0 Months',
    createdDate: '19/08/2026',
    createdBy: 'Priyanka R',
    status: 'Available',
    qualification: 'B.E. Computer Science',
    skills: 'Selenium, Java, TestNG, Jenkins, Cucumber, API Automation',
    relevantExperience: '9 Years',
    currentCompany: 'Cognizant Technology Solutions',
    currentCtc: '18.5 LPA',
    expectedCtc: '25 LPA',
    noticePeriod: '30 Days',
    currentLocation: 'Bangalore',
    preferredLocation: 'Bangalore / Hybrid',
    interviewAvailability: 'Available weekdays after 4 PM',
    reasonForChange: 'Career Advancement & Leadership Role',
    offerInHand: 'Yes (28 LPA from Capgemini)',
    resumeReference: 'PritishMalikImmediateJoiner[11y_0m].pdf',
    notes: 'Strong candidate for Lead QA Automation roles.',
  },
  {
    id: '2',
    candidateId: '18015',
    name: 'Manjeet Kumar',
    email: 'manjeet.techacc9597@gmail.com',
    phone: '+91 96253 02940',
    technology: 'Dot Net Angular/React',
    totalExperience: '8 Years 0 Months',
    createdDate: '19/08/2026',
    createdBy: 'Harish Gadipally',
    status: 'Available',
    qualification: 'MCA',
    skills: 'Dot Net Core, Angular, React, Web API, SQL Server',
    relevantExperience: '6.5 Years',
    currentCompany: 'USAFect Inc',
    currentCtc: '18.0 LPA',
    expectedCtc: '22.0 LPA',
    noticePeriod: 'Immediate (LWD: 15-Dec-2025)',
    currentLocation: 'New Delhi',
    preferredLocation: 'Bengaluru',
    interviewAvailability: 'Available anytime',
    reasonForChange: 'Relocation to Bengaluru',
    offerInHand: 'No',
    resumeReference: 'ManjeetKumar_DotnetAngular[8y_0m].pdf',
    notes: 'Immediate joiner with dual expertise in .NET and Angular.',
  },
]
