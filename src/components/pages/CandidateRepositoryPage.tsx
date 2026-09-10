import React, { useState, useMemo } from 'react'
import {
  ArrowLeft,
  Search,
  Eye,
  EyeOff,
  Edit2,
  X,
  Download,
  FileText,
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Filter,
  Check,
  Building,
  GraduationCap,
  DollarSign,
  Clock,
  MapPin,
  HelpCircle,
  Award,
  Send,
  ExternalLink,
  UserPlus,
  ShieldAlert,
} from 'lucide-react'
import { Candidate, Requirement, Role } from '../../types'
import { PaginationFooter } from '../ui/PaginationFooter'
import { SubmitToLeadPage } from './SubmitToLeadPage'
import { INITIAL_REQUIREMENTS } from '../../data/mockData'
import { checkDuplicateSubmission, getSubmissionsStore } from '../../data/submissionsStore'

/**
 * Masks email address:
 * e.g., "priyanka.sharma@gmail.com" -> "p***************a@gmail.com"
 * e.g., "vishwateja.t@gmail.com" -> "v***********t@gmail.com"
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email || ''
  const parts = email.split('@')
  const user = parts[0]
  const domain = parts[1]
  if (user.length <= 2) {
    return user[0] + '*'.repeat(user.length - 1) + '@' + domain
  }
  const firstChar = user[0]
  const lastChar = user[user.length - 1]
  const maskedMiddle = '*'.repeat(user.length - 2)
  return `${firstChar}${maskedMiddle}${lastChar}@${domain}`
}

/**
 * Masks phone number:
 * e.g., "+91 98210 44905" -> "+91**********"
 */
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

/**
 * Helper to retrieve candidate submission history (count and companies submitted to)
 */
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
    requirementTitle: m.requirement || 'Requirement Title',
    reqId: m.reqId || 'REQ-001',
    submittedBy: m.recruiter || 'Recruiter',
    submittedDate: m.date || 'Aug 04, 2026',
    status: m.stage || 'Submitted to Client',
  }))

  // Fallback defaults for repository seed candidates so they show clear submission history
  if (records.length === 0) {
    if (item.candidateId === '18016') {
      records = [
        { id: 'SUB-901', client: 'Accenture', requirementTitle: 'Senior React Developer', reqId: 'REQ-001', submittedBy: 'Marcus Chen', submittedDate: 'Aug 02, 2026, 02:30 PM', status: 'Submitted to Client' },
        { id: 'SUB-902', client: 'Capgemini', requirementTitle: 'SAP Transportation Management', reqId: 'REQ-2026-08-06-001', submittedBy: 'Adirala sathvika', submittedDate: 'Aug 06, 2026, 11:15 AM', status: 'L1 Interview Scheduled' }
      ]
    } else if (item.candidateId === '18015') {
      records = [
        { id: 'SUB-903', client: 'Infosys', requirementTitle: 'Java Architect', reqId: 'REQ-002', submittedBy: 'Priya Sharma', submittedDate: 'Aug 03, 2026, 04:10 PM', status: 'Submitted to Lead' },
        { id: 'SUB-904', client: 'Goldman Sachs', requirementTitle: 'SAP TM+ S4 Hana', reqId: 'REQ-2026-08-06-002', submittedBy: 'Arvind GR', submittedDate: 'Aug 06, 2026, 01:45 PM', status: 'Submitted to Client' }
      ]
    } else if (item.candidateId === '18014') {
      records = [
        { id: 'SUB-905', client: 'Wipro', requirementTitle: 'DevOps Lead Engineer', reqId: 'REQ-003', submittedBy: 'James O\'Brien', submittedDate: 'Aug 01, 2026, 10:20 AM', status: 'Submitted to Client' },
        { id: 'SUB-906', client: 'Metaforge Client', requirementTitle: 'System Administrator Lead', reqId: 'REQ-2026-08-06-004', submittedBy: 'Harish Gadipally', submittedDate: 'Aug 06, 2026, 03:00 PM', status: 'Interview Completed' }
      ]
    } else if (item.candidateId === '18013') {
      records = [
        { id: 'SUB-907', client: 'LTIMindtree', requirementTitle: 'Senior Data Scientist', reqId: 'REQ-004', submittedBy: 'Elena Rostova', submittedDate: 'Aug 04, 2026, 11:50 AM', status: 'Submitted to Client' }
      ]
    } else if (item.candidateId === '18012') {
      records = [
        { id: 'SUB-908', client: 'Tata Technologies', requirementTitle: 'Python ML Engineer', reqId: 'REQ-006', submittedBy: 'Puttapaka Saiteja', submittedDate: 'Aug 05, 2026, 09:30 AM', status: 'Submitted to Lead' },
        { id: 'SUB-909', client: 'Tesla', requirementTitle: 'Salesforce Admin', reqId: 'REQ-005', submittedBy: 'Alex Rivera', submittedDate: 'Jul 29, 2026, 03:15 PM', status: 'Offer Extended' }
      ]
    } else if (item.candidateId === '18011') {
      records = [
        { id: 'SUB-910', client: 'Tech Mahindra', requirementTitle: 'Full Stack Java Engineer', reqId: 'REQ-007', submittedBy: 'Tejasree Chakravarthy', submittedDate: 'Aug 04, 2026, 02:00 PM', status: 'Submitted to Client' },
        { id: 'SUB-911', client: 'Accenture', requirementTitle: 'Senior React Developer', reqId: 'REQ-001', submittedBy: 'Marcus Chen', submittedDate: 'Aug 03, 2026, 05:40 PM', status: 'Screening Completed' }
      ]
    } else if (item.candidateId === '18010') {
      records = [
        { id: 'SUB-912', client: 'Bosch', requirementTitle: 'Embedded Systems Engineer', reqId: 'REQ-008', submittedBy: 'Rahul Verma', submittedDate: 'Aug 02, 2026, 01:10 PM', status: 'Submitted to Client' }
      ]
    }
  }

  const companies: string[] = Array.from(new Set(records.map(r => r.client)))
  const count = records.length

  return {
    count,
    companies,
    records,
    matches,
  }
}



const DEFAULT_REPO_CANDIDATES: CandidateRepoItem[] = [
  {
    id: '1',
    candidateId: '18016',
    name: 'Priyanka Sharma',
    email: 'priyanka.sharma@gmail.com',
    phone: '+91 98210 44905',
    technology: 'Test Manager / QA Lead',
    totalExperience: '11 Years 3 Months',
    relevantExperience: '9 Years',
    createdDate: '12 Aug 2026',
    createdBy: 'Nithya Maripelly',
    status: 'In Review',
    qualification: 'M.Tech Software Engineering, IIT Hyderabad',
    skills: 'Test Management, Automation Frameworks, Selenium, Appium, CI/CD, JIRA, Agile Lead',
    currentCompany: 'Cognizant Technology Solutions',
    currentCtc: '24 LPA',
    expectedCtc: '30 LPA',
    noticePeriod: '15 Days (Serving)',
    currentLocation: 'Hyderabad',
    preferredLocation: 'Hyderabad / Remote',
    interviewAvailability: 'Available weekdays after 4 PM',
    reasonForChange: 'Career Advancement & Technical Leadership',
    offerInHand: 'Yes (28 LPA from Capgemini)',
    resumeReference: 'Priyanka_Sharma_TestManager_Resume.pdf',
    notes: 'Exceptional communication skills, managed team of 14 QA engineers across US & India shifts.',
  },
  {
    id: '2',
    candidateId: '18015',
    name: 'VISHWATEJA THOPARAM',
    email: 'vishwateja.t@gmail.com',
    phone: '+91 98765 49457',
    technology: 'QA Automation Engineer, SDET, Full-Stack Tester',
    totalExperience: '5 Years 3 Months',
    relevantExperience: '5 Years',
    createdDate: '12 Aug 2026',
    createdBy: 'lakshmi.v Recruiter',
    status: 'New Profile',
    qualification: 'B.E. Computer Science, Osmania University',
    skills: 'Java, Selenium WebDriver, TestNG, Cucumber, REST Assured, Cypress, Playwright, Jenkins',
    currentCompany: 'Infosys Limited',
    currentCtc: '11.5 LPA',
    expectedCtc: '16 LPA',
    noticePeriod: '30 Days',
    currentLocation: 'Bangalore',
    preferredLocation: 'Bangalore / Hyderabad / Hybrid',
    interviewAvailability: 'Anytime with 1 day prior notice',
    reasonForChange: 'Looking for product-based company environment',
    offerInHand: 'No',
    resumeReference: 'Vishwateja_SDET_Resume.pdf',
    notes: 'Hands-on framework setup from scratch. Solid coding in Java & TypeScript.',
  },
  {
    id: '3',
    candidateId: '18014',
    name: 'SHILPA R',
    email: 'shilpa.r@gmail.com',
    phone: '+91 99887 76998',
    technology: 'Storage, Virtualization, Ha-Ft Systems',
    totalExperience: '5 Years 1 Month',
    relevantExperience: '4.8 Years',
    createdDate: '12 Aug 2026',
    createdBy: 'lakshmi.v Recruiter',
    status: 'Submitted to Client',
    qualification: 'B.Tech Information Technology, VTU Belgaum',
    skills: 'VMware ESXi, SAN/NAS Storage, NetApp, RedHat Linux, High Availability, Shell Scripting',
    currentCompany: 'Wipro Technologies',
    currentCtc: '13 LPA',
    expectedCtc: '18 LPA',
    noticePeriod: 'Immediate',
    currentLocation: 'Bangalore',
    preferredLocation: 'Bangalore',
    interviewAvailability: 'Immediate (Immediate joiner)',
    reasonForChange: 'Project buyout completed, looking for immediate placement',
    offerInHand: 'In Pipeline',
    resumeReference: 'Shilpa_R_StorageVirt_Resume.pdf',
    notes: 'Verified L3 storage support background. Clear background check record.',
  },
  {
    id: '4',
    candidateId: '18013',
    name: 'Varun kumar B H',
    email: 'varunkumar.bh@gmail.com',
    phone: '+91 97654 36912',
    technology: 'Qa Manual, Automation Software Test Engineer',
    totalExperience: '4 Years 7 Months',
    relevantExperience: '4.5 Years',
    createdDate: '12 Aug 2026',
    createdBy: 'lakshmi.v Recruiter',
    status: 'Submitted to Client',
    qualification: 'B.E. Electronics & Communication, RVCE Bangalore',
    skills: 'Python, PyTest, API Testing, Postman, SQL, Git, Charles Proxy, Mobile App Testing',
    currentCompany: 'Mindtree / LTIMindtree',
    currentCtc: '9.8 LPA',
    expectedCtc: '14 LPA',
    noticePeriod: '30 Days',
    currentLocation: 'Mysore',
    preferredLocation: 'Bangalore / Mysore',
    interviewAvailability: 'Weekdays after 6 PM',
    reasonForChange: 'Relocation to Bangalore preferred',
    offerInHand: 'No',
    resumeReference: 'VarunKumar_QA_Resume.pdf',
    notes: 'Experience with healthcare & fintech web & mobile apps.',
  },
  {
    id: '5',
    candidateId: '18012',
    name: 'AKASH MAHADEV TALBAR',
    email: 'akash.talbar@gmail.com',
    phone: '+91 98112 26236',
    technology: 'Biw, Sheet Metal Product Design',
    totalExperience: '5 Years 4 Months',
    relevantExperience: '5 Years',
    createdDate: '12 Aug 2026',
    createdBy: 'rahimoon Shaik',
    status: 'Interview Scheduled',
    qualification: 'B.E. Mechanical Engineering, Pune University',
    skills: 'CATIA V6, NX CAD, BIW Closures, Sheet Metal Forming, GD&T, Surfacing, Master Section Creation',
    currentCompany: 'Tata Technologies Ltd',
    currentCtc: '10.5 LPA',
    expectedCtc: '15 LPA',
    noticePeriod: '60 Days (Negotiable to 30 days)',
    currentLocation: 'Pune',
    preferredLocation: 'Pune / Chennai / Remote',
    interviewAvailability: 'Saturdays or weekdays 2 PM - 4 PM',
    reasonForChange: 'Better compensation & global automotive project exposure',
    offerInHand: 'No',
    resumeReference: 'Akash_Talbar_BIW_Design.pdf',
    notes: 'Worked on 2 complete vehicle OEM life cycle projects for European clients.',
  },
  {
    id: '6',
    candidateId: '18011',
    name: 'KUNDETI PRATHYUSHA',
    email: 'prathyusha.k@gmail.com',
    phone: '+91 94401 28955',
    technology: 'Manual Testing, Automation Testing',
    totalExperience: '5 Years',
    relevantExperience: '4 Years',
    createdDate: '12 Aug 2026',
    createdBy: 'lakshmi.v Recruiter',
    status: 'Submitted to Client',
    qualification: 'B.Tech Computer Science, JNTU Hyderabad',
    skills: 'Manual Testing, Functional & Regression Testing, Selenium Java, SQL Queries, JIRA Xray',
    currentCompany: 'Tech Mahindra',
    currentCtc: '8.5 LPA',
    expectedCtc: '13 LPA',
    noticePeriod: 'Immediate (Buyout available)',
    currentLocation: 'Hyderabad',
    preferredLocation: 'Hyderabad',
    interviewAvailability: 'Immediate availability',
    reasonForChange: 'Immediate joiner opportunity sought',
    offerInHand: 'Yes (11.5 LPA)',
    resumeReference: 'Kundeti_Prathyusha_QA.pdf',
    notes: 'Excellent team player, certified ISTQB Foundation level.',
  },
  {
    id: '7',
    candidateId: '18010',
    name: 'AMIT KULKARNI',
    email: 'amit.kulkarni@gmail.com',
    phone: '+91 98450 17712',
    technology: 'Software Engineering / C# Automation',
    totalExperience: '6 Years',
    relevantExperience: '5.5 Years',
    createdDate: '12 Aug 2026',
    createdBy: 'rahimoon Shaik',
    status: 'Shortlisted',
    qualification: 'B.E. Computer Science, BMS College of Engineering',
    skills: 'C#, .NET Core, SpecFlow, NUnit, Embedded Systems Testing, WPF Automation, CI/CD Azure DevOps',
    currentCompany: 'Bosch Global Software Technologies',
    currentCtc: '14.5 LPA',
    expectedCtc: '20 LPA',
    noticePeriod: '30 Days',
    currentLocation: 'Bangalore',
    preferredLocation: 'Bangalore / Mysore',
    interviewAvailability: 'Weekdays anytime with 2 hrs prior notice',
    reasonForChange: 'Project conclusion & seeking C# automation specialist role',
    offerInHand: 'No',
    resumeReference: 'Amit_Kulkarni_CSharp_Automation.pdf',
    notes: 'Deep domain expertise in C# automation & embedded hardware-in-loop testing.',
  },
]

interface CandidateRepositoryPageProps {
  candidates?: Candidate[]
  requirements?: Requirement[]
  selectedReqId?: string | null
  role?: Role
  onOpenAddForm: () => void
  onSelectCandidate?: (candidate: Candidate) => void
  onSelectRequirement?: (reqId: string | null) => void
  onBackToDashboard?: () => void
}

export function CandidateRepositoryPage({
  candidates = [],
  requirements = INITIAL_REQUIREMENTS,
  selectedReqId = null,
  role = 'recruiter',
  onOpenAddForm,
  onSelectCandidate,
  onSelectRequirement,
  onBackToDashboard,
}: CandidateRepositoryPageProps) {
  const [repoList, setRepoList] = useState<CandidateRepoItem[]>(DEFAULT_REPO_CANDIDATES)
  const [viewMode, setViewMode] = useState<string>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [submittedPeriod, setSubmittedPeriod] = useState('All time')
  const [totalExpFilter, setTotalExpFilter] = useState('All experience')
  const [submissionCountFilter, setSubmissionCountFilter] = useState('All Submissions')
  const [submittedClientFilter, setSubmittedClientFilter] = useState('All Clients')

  const uniqueSubmittedClients = useMemo(() => {
    const set = new Set<string>()
    repoList.forEach(item => {
      const history = getCandidateSubmissionsHistory(item)
      history.companies.forEach(c => set.add(c))
    })
    return Array.from(set).sort()
  }, [repoList])

  const scrollToNextPageSection = () => {
    setTimeout(() => {
      const el = document.getElementById('candidate-repo-next-page-section')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  // Requirement Selection Context (carried over from My Work / Requirements page or selected directly)
  const [activeReqId, setActiveReqId] = useState<string | null>(selectedReqId || null)
  const [isChangeReqModalOpen, setIsChangeReqModalOpen] = useState(false)
  const [pendingCandidateForSubmit, setPendingCandidateForSubmit] = useState<CandidateRepoItem | null>(null)
  const [tempModalReqId, setTempModalReqId] = useState<string>('')

  React.useEffect(() => {
    if (selectedReqId !== undefined) {
      setActiveReqId(selectedReqId)
    }
  }, [selectedReqId])

  const activeRequirement = useMemo(() => {
    if (!activeReqId) return null
    return (
      requirements.find(r => r.id === activeReqId) ||
      ({
        id: activeReqId,
        title: 'Requirement ' + activeReqId,
        client: 'Metaforge Client',
        priority: 'High',
        status: 'Active',
      } as Requirement)
    )
  }, [requirements, activeReqId])

  // Candidate Checkbox Selection state (active when requirement is selected)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const toggleSelectCandidate = (id: string, e?: React.SyntheticEvent) => {
    e?.stopPropagation()
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredList.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredList.map(item => item.id)))
    }
  }

  const [selectedCandidatesForSubmit, setSelectedCandidatesForSubmit] = useState<CandidateRepoItem[]>([])

  // Mask toggling for phone/email in table view with 20-second session timeout
  const [unmaskedIds, setUnmaskedIds] = useState<Set<string>>(new Set())
  const [unmaskedTimers, setUnmaskedTimers] = useState<{ [id: string]: number }>({})

  const timerRefs = React.useRef<{ [id: string]: NodeJS.Timeout }>({})
  const intervalRefs = React.useRef<{ [id: string]: NodeJS.Timeout }>({})

  // Clean up timers on unmount
  React.useEffect(() => {
    return () => {
      Object.values(timerRefs.current).forEach(clearTimeout)
      Object.values(intervalRefs.current).forEach(clearInterval)
    }
  }, [])

  const clearCandidateTimers = (id: string) => {
    if (timerRefs.current[id]) {
      clearTimeout(timerRefs.current[id])
      delete timerRefs.current[id]
    }
    if (intervalRefs.current[id]) {
      clearInterval(intervalRefs.current[id])
      delete intervalRefs.current[id]
    }
  }

  const toggleMask = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()

    if (unmaskedIds.has(id)) {
      // Re-mask immediately
      clearCandidateTimers(id)
      setUnmaskedIds(prev => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
      setUnmaskedTimers(prev => {
        const next = { ...prev }
        delete next[id]
        return next
      })
    } else {
      // Unmask with 20-second session timeout
      clearCandidateTimers(id)

      setUnmaskedIds(prev => new Set(prev).add(id))
      setUnmaskedTimers(prev => ({ ...prev, [id]: 20 }))

      // Countdown timer interval (updates badge seconds: 20, 19, 18...)
      intervalRefs.current[id] = setInterval(() => {
        setUnmaskedTimers(prev => {
          const currentVal = prev[id] ?? 0
          if (currentVal <= 1) {
            const next = { ...prev }
            delete next[id]
            return next
          }
          return { ...prev, [id]: currentVal - 1 }
        })
      }, 1000)

      // Auto re-mask after 20 seconds
      timerRefs.current[id] = setTimeout(() => {
        clearCandidateTimers(id)
        setUnmaskedIds(prev => {
          const next = new Set(prev)
          next.delete(id)
          return next
        })
        setUnmaskedTimers(prev => {
          const next = { ...prev }
          delete next[id]
          return next
        })
      }, 20000)
    }
  }

  // Detail Modal view state (displays WHOLE information about candidate)
  const [viewingCandidateDetail, setViewingCandidateDetail] = useState<CandidateRepoItem | null>(null)

  // Dedicated Submission History Inspection Modal State
  const [selectedSubmissionHistoryCandidate, setSelectedSubmissionHistoryCandidate] = useState<CandidateRepoItem | null>(null)
  const [submissionModalSearchQuery, setSubmissionModalSearchQuery] = useState('')

  // Full-page edit state
  const [editingCandidate, setEditingCandidate] = useState<CandidateRepoItem | null>(null)

  // Edit Form Fields
  const [editFullName, setEditFullName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editLinkedIn, setEditLinkedIn] = useState('')
  const [editCurrentCompany, setEditCurrentCompany] = useState('')
  const [editQualification, setEditQualification] = useState('')
  const [editSkills, setEditSkills] = useState('')
  const [editTechnology, setEditTechnology] = useState('')
  const [editTotalExp, setEditTotalExp] = useState('')
  const [editRelevantExp, setEditRelevantExp] = useState('')
  const [editCurrentCtc, setEditCurrentCtc] = useState('')
  const [editExpectedCtc, setEditExpectedCtc] = useState('')
  const [editNoticePeriod, setEditNoticePeriod] = useState('')
  const [editCurrentLoc, setEditCurrentLoc] = useState('')
  const [editPreferredLoc, setEditPreferredLoc] = useState('')
  const [editAvailability, setEditAvailability] = useState('')
  const [editReasonForChange, setEditReasonForChange] = useState('')
  const [editOfferInHand, setEditOfferInHand] = useState('—')
  const [editResumeReference, setEditResumeReference] = useState('')
  const [editNotes, setEditNotes] = useState('')

  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  // Filter repo list dynamically
  const filteredList = useMemo(() => {
    return repoList.filter(item => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchName = item.name.toLowerCase().includes(q)
        const matchId = item.candidateId.toLowerCase().includes(q)
        const matchTech = item.technology.toLowerCase().includes(q)
        const matchCreator = item.createdBy.toLowerCase().includes(q)
        const matchSkills = (item.skills || '').toLowerCase().includes(q)
        const matchCompany = (item.currentCompany || '').toLowerCase().includes(q)
        if (!matchName && !matchId && !matchTech && !matchCreator && !matchSkills && !matchCompany) return false
      }

      const subHistory = getCandidateSubmissionsHistory(item)

      // 2. Submission Count Filter
      if (submissionCountFilter !== 'All Submissions') {
        if (submissionCountFilter === 'Not Submitted Yet' && subHistory.count !== 0) return false
        if (submissionCountFilter === 'Submitted 1+ times' && subHistory.count < 1) return false
        if (submissionCountFilter === 'Submitted 2+ times' && subHistory.count < 2) return false
        if (submissionCountFilter === 'Submitted 3+ times' && subHistory.count < 3) return false
      }

      // 3. Submitted Client Filter
      if (submittedClientFilter !== 'All Clients') {
        const clientTarget = submittedClientFilter.toLowerCase()
        const matchesClient = subHistory.companies.some(c => c.toLowerCase().includes(clientTarget))
        if (!matchesClient) return false
      }

      // 4. Total Experience Filter
      if (totalExpFilter !== 'All experience') {
        const expMatch = item.totalExperience.match(/\d+/)
        const years = expMatch ? parseInt(expMatch[0], 10) : 0
        if (totalExpFilter === '0–2 years' && (years < 0 || years > 2)) return false
        if (totalExpFilter === '2–5 years' && (years < 2 || years > 5)) return false
        if (totalExpFilter === '5–8 years' && (years < 5 || years > 8)) return false
        if (totalExpFilter === '8–10 years' && (years < 8 || years > 10)) return false
        if (totalExpFilter === '10+ years' && years < 10) return false
      }

      return true
    })
  }, [repoList, searchQuery, submissionCountFilter, submittedClientFilter, totalExpFilter])

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const paginatedRepoList = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredList.slice(start, start + pageSize)
  }, [filteredList, currentPage, pageSize])

  // Open Full-Page Edit Form
  const handleOpenEdit = (item: CandidateRepoItem, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setViewingCandidateDetail(null)
    setEditingCandidate(item)
    setEditFullName(item.name)
    setEditEmail(item.email.includes('*') ? `${item.name.toLowerCase().replace(/\s+/g, '')}@gmail.com` : item.email)
    setEditPhone(item.phone.includes('*') ? '+91 98765 43210' : item.phone)
    setEditLinkedIn('https://www.linkedin.com/in/' + item.name.toLowerCase().replace(/\s+/g, ''))
    setEditCurrentCompany(item.currentCompany || 'Software Solutions Ltd')
    setEditQualification(item.qualification || 'B.E. - Bachelor of Engineering')
    setEditSkills(item.skills || 'Testing, Automation, Manual Testing, Java, Python')
    setEditTechnology(item.technology)
    setEditTotalExp(item.totalExperience)
    setEditRelevantExp(item.relevantExperience || item.totalExperience)
    setEditCurrentCtc(item.currentCtc || '12 LPA')
    setEditExpectedCtc(item.expectedCtc || '16 LPA')
    setEditNoticePeriod(item.noticePeriod || '30 Days')
    setEditCurrentLoc(item.currentLocation || 'Bangalore')
    setEditPreferredLoc(item.preferredLocation || 'Bangalore / Remote')
    setEditAvailability(item.interviewAvailability || 'Immediate')
    setEditReasonForChange(item.reasonForChange || 'Career Growth')
    setEditOfferInHand(item.offerInHand || 'No')
    setEditResumeReference(item.resumeReference || `${item.name.replace(/\s+/g, '_')}_Resume.pdf`)
    setEditNotes(item.notes || 'Candidate profile in repository')
  }

  // Handle Submit to Lead for single candidate
  const handleSubmitSingleToLead = (item: CandidateRepoItem, e?: React.MouseEvent) => {
    e?.stopPropagation()

    // Perform Duplicate Check if active requirement exists
    if (activeReqId) {
      const dupCheck = checkDuplicateSubmission(activeReqId, {
        email: item.email,
        phone: item.phone,
        candidateId: item.candidateId,
        name: item.name,
      })

      if (dupCheck.isDuplicate) {
        showToast(
          `⚠️ Duplicate Submission: Candidate "${item.name}" has already been submitted for requirement "${activeRequirement?.title || activeReqId}" by ${dupCheck.existingSubmission?.recruiter || 'another recruiter'}. Cannot submit!`
        )
        return
      }
    }

    setViewingCandidateDetail(null)
    if (!activeReqId) {
      setPendingCandidateForSubmit(item)
      setTempModalReqId(requirements[0]?.id || '')
      setIsChangeReqModalOpen(true)
    } else {
      setSelectedCandidatesForSubmit([item])
      setViewMode('submit_to_lead')
    }
  }

  const handleConfirmReqSelection = (reqIdToSet: string) => {
    setActiveReqId(reqIdToSet)
    onSelectRequirement?.(reqIdToSet)
    setIsChangeReqModalOpen(false)
    if (pendingCandidateForSubmit) {
      setSelectedCandidatesForSubmit([pendingCandidateForSubmit])
      setPendingCandidateForSubmit(null)
      setViewMode('submit_to_lead')
    } else {
      showToast('Requirement selected successfully!')
    }
  }

  // Handle Edit Submit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCandidate) return

    const updated = repoList.map(item =>
      item.id === editingCandidate.id
        ? {
            ...item,
            name: editFullName,
            email: editEmail,
            phone: editPhone,
            technology: editTechnology,
            totalExperience: editTotalExp,
            relevantExperience: editRelevantExp,
            qualification: editQualification,
            skills: editSkills,
            currentCompany: editCurrentCompany,
            currentCtc: editCurrentCtc,
            expectedCtc: editExpectedCtc,
            noticePeriod: editNoticePeriod,
            currentLocation: editCurrentLoc,
            preferredLocation: editPreferredLoc,
            interviewAvailability: editAvailability,
            reasonForChange: editReasonForChange,
            offerInHand: editOfferInHand,
            notes: editNotes,
          }
        : item
    )

    setRepoList(updated)
    setEditingCandidate(null)
    showToast('Candidate profile updated successfully!')
  }



  // -------------------------------------------------------------
  // DEDICATED FULL-PAGE EDIT VIEW
  // -------------------------------------------------------------
  if (editingCandidate) {
    return (
      <div className="space-y-6 w-full pb-20 font-sans text-slate-800 animate-in fade-in duration-200">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditingCandidate(null)}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-slate-200"
              title="Back to Repository"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Candidate Profile</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                ID: {editingCandidate.candidateId} • Created by {editingCandidate.createdBy} on {editingCandidate.createdDate}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleEditSubmit} className="space-y-6 max-w-5xl">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editFullName}
                  onChange={e => setEditFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={e => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Company</label>
                <input
                  type="text"
                  value={editCurrentCompany}
                  onChange={e => setEditCurrentCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Professional & Experience Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Technology / Role</label>
                <input
                  type="text"
                  value={editTechnology}
                  onChange={e => setEditTechnology(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Qualification & Education</label>
                <input
                  type="text"
                  value={editQualification}
                  onChange={e => setEditQualification(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Total Experience</label>
                <input
                  type="text"
                  value={editTotalExp}
                  onChange={e => setEditTotalExp(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Relevant Experience</label>
                <input
                  type="text"
                  value={editRelevantExp}
                  onChange={e => setEditRelevantExp(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Skills & Key Competencies</label>
                <input
                  type="text"
                  value={editSkills}
                  onChange={e => setEditSkills(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Compensation & Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current CTC</label>
                <input
                  type="text"
                  value={editCurrentCtc}
                  onChange={e => setEditCurrentCtc(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Expected CTC</label>
                <input
                  type="text"
                  value={editExpectedCtc}
                  onChange={e => setEditExpectedCtc(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Period</label>
                <input
                  type="text"
                  value={editNoticePeriod}
                  onChange={e => setEditNoticePeriod(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Location</label>
                <input
                  type="text"
                  value={editCurrentLoc}
                  onChange={e => setEditCurrentLoc(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Location</label>
                <input
                  type="text"
                  value={editPreferredLoc}
                  onChange={e => setEditPreferredLoc(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Offer In Hand</label>
                <input
                  type="text"
                  value={editOfferInHand}
                  onChange={e => setEditOfferInHand(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingCandidate(null)}
              className="px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer active:scale-98"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    )
  }

  // -------------------------------------------------------------
  // DEDICATED FULL-PAGE SUBMISSION TO CLIENT VIEW
  // -------------------------------------------------------------
  if (viewMode === 'submit_to_lead') {
    return (
      <div id="candidate-repo-next-page-section" className="space-y-6 w-full pb-24 font-sans text-slate-800 animate-in fade-in duration-200">
        {/* SubmitToLeadPage Component */}
        <div className="bg-slate-50/60 rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs">
          <SubmitToLeadPage
            selectedCandidates={selectedCandidatesForSubmit}
            requirement={activeRequirement}
            role={role}
            onBack={() => {
              setViewMode('list')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onSubmitSuccess={() => {
              setViewMode('list')
              setSelectedCandidatesForSubmit([])
              showToast('Successfully submitted candidate to lead & client loop!')
              if (onBackToDashboard) {
                onBackToDashboard()
              } else {
                setActiveReqId(null)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          />
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------
  // RENDER CANDIDATE REPOSITORY TABLE VIEW (WITH NO CHECKBOXES & WHOLE CANDIDATE INFO)
  // -------------------------------------------------------------
  return (
    <div id="candidate-repo-top" className="space-y-6 w-full pb-24 font-sans text-slate-800">
      {/* 1. BACK BUTTON & HEADER BAR WITH + ADD ACTIVE CANDIDATE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <button
            onClick={() => {
              if (onBackToDashboard) {
                onBackToDashboard()
              } else {
                onOpenAddForm()
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-all shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>Go Back</span>
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Candidate Repository</h1>
            <p className="text-xs text-slate-500 mt-1">
              Comprehensive database of candidate profiles. Click any row to view complete details, edit, or submit to requirement.
            </p>
          </div>
        </div>

        {!(role === 'recruiter' || role === 'lead') && (
          <div>
            <button
              type="button"
              onClick={onOpenAddForm}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer active:scale-98"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Add Active Candidate</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. REQUIREMENT INFO BANNER (shown only when a requirement is selected) */}
      {activeRequirement && (
        <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-3.5 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="text-emerald-950 font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            <span>
              Selecting for:{' '}
              <strong className="font-extrabold text-emerald-950">
                {activeRequirement.id} — {activeRequirement.title} ({activeRequirement.client})
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setTempModalReqId(activeRequirement.id)
                setIsChangeReqModalOpen(true)
              }}
              className="text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer text-xs"
            >
              Change requirement
            </button>
            <button
              onClick={() => {
                setActiveReqId(null)
                onSelectRequirement?.(null)
                showToast('Cleared selected requirement')
              }}
              className="text-slate-400 hover:text-slate-600 font-bold text-xs cursor-pointer hover:underline"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* 3. FILTER & SEARCH CONTROL CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col md:flex-row md:items-end justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, phone, skills, technology, company..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 placeholder:text-slate-400 shadow-2xs transition-all"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 self-end md:self-auto">
          {/* Submissions count filter */}
          <div className="space-y-1 w-full sm:w-40">
            <div className="text-[10px] font-bold text-slate-400 tracking-wider flex items-center gap-1">
              <Send className="w-3 h-3 text-[#6B3BF6]" />
              <span>Submissions count</span>
            </div>
            <select
              value={submissionCountFilter}
              onChange={e => setSubmissionCountFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
            >
              <option value="All Submissions">All Submissions</option>
              <option value="Submitted 1+ times">Submitted 1+ times</option>
              <option value="Submitted 2+ times">Submitted 2+ times</option>
              <option value="Submitted 3+ times">Submitted 3+ times</option>
              <option value="Not Submitted Yet">Not Submitted Yet</option>
            </select>
          </div>

          {/* Submitted Client filter */}
          <div className="space-y-1 w-full sm:w-44">
            <div className="text-[10px] font-bold text-slate-400 tracking-wider flex items-center gap-1">
              <Building className="w-3 h-3 text-[#6B3BF6]" />
              <span>Submitted Client</span>
            </div>
            <select
              value={submittedClientFilter}
              onChange={e => setSubmittedClientFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
            >
              <option value="All Clients">All Clients</option>
              {uniqueSubmittedClients.map(client => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </select>
          </div>

          {/* Submitted period */}
          <div className="space-y-1 w-full sm:w-36">
            <div className="text-[10px] font-bold text-slate-400 tracking-wider">
              Submitted period
            </div>
            <select
              value={submittedPeriod}
              onChange={e => setSubmittedPeriod(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
            >
              <option value="All time">All time</option>
              <option value="Week">Week</option>
              <option value="1 month">1 month</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
              <option value="Year">Year</option>
            </select>
          </div>

          {/* Total experience */}
          <div className="space-y-1 w-full sm:w-36">
            <div className="text-[10px] font-bold text-slate-400 tracking-wider">
              Total experience
            </div>
            <select
              value={totalExpFilter}
              onChange={e => setTotalExpFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
            >
              <option value="All experience">All experience</option>
              <option value="0–2 years">0–2 years</option>
              <option value="2–5 years">2–5 years</option>
              <option value="5–8 years">5–8 years</option>
              <option value="8–10 years">8–10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>

          {/* Clear Filters Button if any filter active */}
          {(submissionCountFilter !== 'All Submissions' || submittedClientFilter !== 'All Clients' || totalExpFilter !== 'All experience' || searchQuery) && (
            <button
              onClick={() => {
                setSubmissionCountFilter('All Submissions')
                setSubmittedClientFilter('All Clients')
                setTotalExpFilter('All experience')
                setSubmittedPeriod('All time')
                setSearchQuery('')
              }}
              className="px-3 py-2 text-xs text-purple-700 hover:text-purple-900 font-bold underline cursor-pointer self-end mb-0.5"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* ACTIVE SUBMISSION FILTER INDICATOR BANNER */}
      {(submittedClientFilter !== 'All Clients' || submissionCountFilter !== 'All Submissions') && (
        <div className="bg-purple-50/90 border border-purple-200/90 rounded-2xl p-3 px-4 flex items-center justify-between gap-3 text-xs shadow-2xs animate-in fade-in duration-150 font-sans">
          <div className="flex items-center gap-2 font-bold text-purple-950">
            <Filter className="w-4 h-4 text-[#6B3BF6]" />
            <span>
              Active Filter:{' '}
              {submittedClientFilter !== 'All Clients' && (
                <span className="bg-[#6B3BF6] text-white px-2.5 py-0.5 rounded-full text-xs font-extrabold mr-1.5 inline-flex items-center gap-1 shadow-2xs">
                  <span>Client: {submittedClientFilter}</span>
                </span>
              )}
              {submissionCountFilter !== 'All Submissions' && (
                <span className="bg-purple-700 text-white px-2.5 py-0.5 rounded-full text-xs font-extrabold inline-flex items-center gap-1 shadow-2xs">
                  <span>Count: {submissionCountFilter}</span>
                </span>
              )}
            </span>
          </div>

          <button
            onClick={() => {
              setSubmittedClientFilter('All Clients')
              setSubmissionCountFilter('All Submissions')
            }}
            className="text-xs text-purple-700 hover:text-purple-950 font-extrabold underline cursor-pointer flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        </div>
      )}

      {/* 4. CANDIDATE REPOSITORY TABLE CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {activeRequirement && (
                  <th className="w-10 px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === filteredList.length && filteredList.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 text-[#6B3BF6] rounded-md focus:ring-[#6B3BF6] cursor-pointer"
                    />
                  </th>
                )}
                <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  CANDIDATE NAME & ROLE
                </th>
                <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  CURRENT COMPANY
                </th>
                <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  CONTACT (EMAIL & PHONE)
                </th>
                <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <span>SUBMITTED & CLIENTS</span>
                    <Filter className="w-3 h-3 text-[#6B3BF6]" />
                  </div>
                </th>
                <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  EXPERIENCE
                </th>
                <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  CREATED BY
                </th>
                <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider text-right">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {paginatedRepoList.map(item => {
                const isUnmasked = unmaskedIds.has(item.id)
                const isSelected = selectedIds.has(item.id)
                const dupCheck = activeReqId
                  ? checkDuplicateSubmission(activeReqId, {
                      email: item.email,
                      phone: item.phone,
                      candidateId: item.candidateId,
                      name: item.name,
                    })
                  : { isDuplicate: false }
                return (
                  <tr
                    key={item.id}
                    onClick={() => setViewingCandidateDetail(item)}
                    className={`hover:bg-purple-50/40 cursor-pointer transition-colors group ${
                      isSelected ? 'bg-purple-50/30' : ''
                    } ${dupCheck.isDuplicate ? 'bg-rose-50/20' : ''}`}
                  >
                    {/* Checkbox (shown only when requirement is selected) */}
                    {activeRequirement && (
                      <td className="px-4 py-4" onClick={e => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={e => toggleSelectCandidate(item.id, e)}
                          className="w-4 h-4 text-[#6B3BF6] rounded-md focus:ring-[#6B3BF6] cursor-pointer"
                        />
                      </td>
                    )}

                    {/* Candidate Name, Role & ID & Status / Duplicate Badge */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-slate-900 text-xs group-hover:text-[#6B3BF6] transition-colors">
                          {item.name}
                        </span>
                        {dupCheck.isDuplicate ? (
                          <span
                            className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-rose-100 text-rose-800 border border-rose-300 shrink-0 inline-flex items-center gap-1"
                            title={`Already submitted by ${dupCheck.existingSubmission?.recruiter || 'another recruiter'} on ${dupCheck.existingSubmission?.date}`}
                          >
                            <ShieldAlert className="w-3 h-3 text-rose-600" />
                            <span>Duplicate Submission</span>
                          </span>
                        ) : (
                          item.status && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200 shrink-0">
                              {item.status}
                            </span>
                          )
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#6B3BF6] font-bold mt-1">
                        <Briefcase className="w-3 h-3 shrink-0" />
                        <span className="truncate max-w-[210px]" title={item.technology}>{item.technology}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        ID: {item.candidateId}
                      </div>
                    </td>

                    {/* Current Company */}
                    <td className="px-4 py-4 text-slate-800 font-semibold">
                      {item.currentCompany || '—'}
                    </td>

                    {/* Contact (Email & Phone with Eye toggle & 5s session timeout) */}
                    <td className="px-4 py-4" onClick={e => e.stopPropagation()}>
                      <div className="space-y-1">
                        <div className="font-mono text-slate-700 text-xs truncate max-w-[190px]" title={isUnmasked ? item.email : maskEmail(item.email)}>
                          {isUnmasked ? item.email : maskEmail(item.email)}
                        </div>
                        <div className="flex items-center justify-between gap-1.5 font-mono text-slate-500 text-[11px]">
                          <span>{isUnmasked ? item.phone : maskPhone(item.phone)}</span>
                          <button
                            type="button"
                            onClick={e => toggleMask(item.id, e)}
                            className={`px-1.5 py-0.5 rounded-md border transition-all cursor-pointer flex items-center gap-1 text-[10px] font-bold ${
                              isUnmasked
                                ? 'bg-amber-50 border-amber-300 text-amber-700 shadow-2xs'
                                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                            }`}
                            title={isUnmasked ? 'Click to re-mask contact info immediately' : 'Click to view unmasked contact info for 20 seconds'}
                          >
                            {isUnmasked ? (
                              <>
                                <EyeOff className="w-3 h-3 text-amber-600" />
                                <span className="text-[9px] font-black text-amber-700 tabular-nums">{unmaskedTimers[item.id] ?? 20}s</span>
                              </>
                            ) : (
                              <Eye className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Submitted (Companies & Count - Interactive Filters & History) */}
                    <td className="px-4 py-4 max-w-xs" onClick={e => e.stopPropagation()}>
                      {(() => {
                        const subHistory = getCandidateSubmissionsHistory(item)
                        if (subHistory.count === 0) {
                          return (
                            <span className="text-[11px] text-slate-400 italic font-medium">
                              Not Submitted Yet
                            </span>
                          )
                        }

                        return (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5">
                              {/* Sleek Count Badge */}
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-50 text-[#6B3BF6] border border-purple-200 shrink-0">
                                {subHistory.count} Submission{subHistory.count > 1 ? 's' : ''}
                              </span>

                              {/* Inspect Full History Icon */}
                              <button
                                type="button"
                                onClick={e => {
                                  e.stopPropagation()
                                  setSelectedSubmissionHistoryCandidate(item)
                                  setSubmissionModalSearchQuery('')
                                }}
                                className="p-1 text-slate-400 hover:text-[#6B3BF6] hover:bg-purple-50 rounded-md transition-all cursor-pointer"
                                title="Inspect complete submission history details"
                              >
                                <Eye className="w-3.5 h-3.5 text-[#6B3BF6]" />
                              </button>
                            </div>

                            {/* Clickable Client Filter Chips */}
                            <div className="flex items-center gap-1 flex-wrap">
                              {subHistory.companies.map((comp, idx) => {
                                const isActiveFilter = submittedClientFilter === comp
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={e => {
                                      e.stopPropagation()
                                      if (isActiveFilter) {
                                        setSubmittedClientFilter('All Clients')
                                      } else {
                                        setSubmittedClientFilter(comp)
                                      }
                                    }}
                                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                                      isActiveFilter
                                        ? 'bg-[#6B3BF6] text-white border-[#6B3BF6] shadow-2xs'
                                        : 'bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-[#6B3BF6] border-slate-200 hover:border-purple-200'
                                    }`}
                                    title={isActiveFilter ? `Active Filter: ${comp} (click to clear)` : `Click to filter candidates by ${comp}`}
                                  >
                                    <Building className={`w-2.5 h-2.5 ${isActiveFilter ? 'text-white' : 'text-slate-500'}`} />
                                    <span>{comp}</span>
                                    {isActiveFilter && <X className="w-2.5 h-2.5 ml-0.5" />}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })()}
                    </td>

                    {/* Total Experience */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-extrabold text-slate-900">{item.totalExperience}</div>
                      {item.relevantExperience && (
                        <div className="text-[10px] text-slate-400">Rel: {item.relevantExperience}</div>
                      )}
                    </td>

                    {/* Created By */}
                    <td className="px-4 py-4 text-slate-600 font-medium whitespace-nowrap">
                      <div>{item.createdBy}</div>
                      <div className="text-[10px] text-slate-400">{item.createdDate}</div>
                    </td>

                    {/* Action Buttons: Submit / Duplicate, Call & Edit */}
                    <td className="px-4 py-4 text-right whitespace-nowrap" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {activeRequirement && (
                          dupCheck.isDuplicate ? (
                            <button
                              type="button"
                              onClick={e => {
                                e.stopPropagation()
                                showToast(
                                  `⚠️ Duplicate Submission: Candidate "${item.name}" has already been submitted for ${activeRequirement.title} (${activeRequirement.id}) by ${dupCheck.existingSubmission?.recruiter || 'another recruiter'}.`
                                )
                              }}
                              className="px-2.5 py-1.5 border border-rose-300 bg-rose-50 text-rose-800 text-xs font-bold rounded-lg cursor-not-allowed flex items-center gap-1 shrink-0"
                              title={`Already submitted by ${dupCheck.existingSubmission?.recruiter || 'another recruiter'}`}
                            >
                              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                              <span>Duplicate Submission</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={e => handleSubmitSingleToLead(item, e)}
                              className="px-3 py-1.5 border border-purple-300 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-lg transition-all cursor-pointer shadow-2xs active:scale-98 flex items-center gap-1 shrink-0"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Submit</span>
                            </button>
                          )
                        )}
                        <a
                          href={`tel:${item.phone.replace(/[^0-9+]/g, '')}`}
                          onClick={e => {
                            e.stopPropagation()
                            if (!unmaskedIds.has(item.id)) {
                              toggleMask(item.id, e)
                            }
                            showToast(`Initiating call to ${item.name} (${item.phone})...`)
                          }}
                          className="px-2.5 py-1.5 border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-98"
                          title={`Call candidate ${item.name}`}
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Call</span>
                        </a>
                        <button
                          type="button"
                          onClick={e => handleOpenEdit(item, e)}
                          className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-2xs"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <PaginationFooter
          currentPage={currentPage}
          totalPages={Math.ceil(filteredList.length / pageSize)}
          totalItems={filteredList.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          itemLabel="candidates"
        />
      </div>

      {/* FLOATING SELECTION DOCK (shown when requirement is selected, candidates are checked, and submission form is not open) */}
      {activeRequirement && selectedIds.size > 0 && viewMode !== 'submit_to_lead' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#EFF6FF] border border-[#C7D2FE] shadow-2xl rounded-2xl p-2.5 px-6 flex items-center gap-6 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-200">
          <span className="text-xs font-extrabold text-[#1E3A8A]">
            {selectedIds.size} candidate(s) selected for {activeRequirement.id}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedIds(new Set())}
              className="px-4 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-all shadow-2xs"
            >
              Clear Selection
            </button>
            <button
              onClick={() => {
                const items = repoList.filter(i => selectedIds.has(i.id))
                const dupItems = items.filter(i =>
                  checkDuplicateSubmission(activeRequirement.id, {
                    email: i.email,
                    phone: i.phone,
                    candidateId: i.candidateId,
                    name: i.name,
                  }).isDuplicate
                )

                if (dupItems.length > 0) {
                  showToast(
                    `⚠️ Duplicate Submission: ${dupItems.map(d => d.name).join(', ')} ${dupItems.length === 1 ? 'has' : 'have'} already been submitted for ${activeRequirement.title}. Cannot submit duplicate candidates.`
                  )
                  return
                }

                setSelectedCandidatesForSubmit(items)
                setViewMode('submit_to_lead')
                scrollToNextPageSection()
              }}
              className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-extrabold rounded-xl shadow-md transition-all cursor-pointer active:scale-98 flex items-center gap-1.5"
            >
              <span>Submit Selected ({selectedIds.size})</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. CANDIDATE WHOLE INFORMATION DETAIL MODAL (MODAL SHOWING ALL CANDIDATE DETAILS) */}
      {viewingCandidateDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden border border-slate-100 font-sans flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#6B3BF6]/10 text-[#6B3BF6] flex items-center justify-center font-extrabold text-lg border border-[#6B3BF6]/20">
                  {viewingCandidateDetail.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                      {viewingCandidateDetail.name}
                    </h2>
                    {viewingCandidateDetail.status && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200">
                        {viewingCandidateDetail.status}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Candidate ID: <strong className="font-mono text-slate-700">{viewingCandidateDetail.candidateId}</strong> • Created by {viewingCandidateDetail.createdBy} on {viewingCandidateDetail.createdDate}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setViewingCandidateDetail(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 max-h-[calc(90vh-140px)]">
              {/* Duplicate Submission Warning Alert Box */}
              {activeReqId && viewingCandidateDetail && (() => {
                const modalDupCheck = checkDuplicateSubmission(activeReqId, {
                  email: viewingCandidateDetail.email,
                  phone: viewingCandidateDetail.phone,
                  candidateId: viewingCandidateDetail.candidateId,
                  name: viewingCandidateDetail.name,
                })
                if (!modalDupCheck.isDuplicate) return null
                return (
                  <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 space-y-2 animate-in fade-in">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-rose-900 text-xs uppercase tracking-wide bg-rose-600 text-white px-2 py-0.5 rounded-md">
                          Duplicate Submission
                        </span>
                        <span className="text-xs font-bold text-rose-800">Submission Blocked</span>
                      </div>
                    </div>
                    <p className="text-xs text-rose-950 font-medium leading-relaxed">
                      Candidate <strong>{viewingCandidateDetail.name}</strong> has already been submitted for target requirement <strong>{activeRequirement?.title || activeReqId} ({activeReqId})</strong> by another recruiter/vendor.
                    </p>
                    <div className="text-[11px] text-rose-900 bg-rose-100/80 p-2.5 rounded-xl border border-rose-200/80 flex flex-wrap gap-x-4 gap-y-1 font-semibold">
                      <span>Submitted By: <strong>{modalDupCheck.existingSubmission?.recruiter || 'External Recruiter'}</strong></span>
                      <span>Date: <strong>{modalDupCheck.existingSubmission?.date}</strong></span>
                      <span>Status: <strong>{modalDupCheck.existingSubmission?.stage}</strong></span>
                      <span>Match Reason: <em>{modalDupCheck.matchReason}</em></span>
                    </div>
                  </div>
                )
              })()}
              {/* Submission History Section */}
              {(() => {
                const subHistory = getCandidateSubmissionsHistory(viewingCandidateDetail)
                return (
                  <div className="bg-purple-50/60 border border-purple-200/80 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Send className="w-3.5 h-3.5 text-[#6B3BF6]" />
                        Submission History & Client Submissions
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#6B3BF6] text-white">
                          {subHistory.count > 0 ? `Submitted ${subHistory.count} time${subHistory.count > 1 ? 's' : ''}` : 'No Submissions Yet'}
                        </span>
                        {subHistory.count > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedSubmissionHistoryCandidate(viewingCandidateDetail)
                              setSubmissionModalSearchQuery('')
                            }}
                            className="px-2.5 py-1 bg-white hover:bg-purple-100 text-[#6B3BF6] border border-purple-300 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#6B3BF6]" />
                            <span>Inspect Full Details</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-500 block text-[11px] font-medium mb-1">Companies Submitted To:</span>
                        {subHistory.companies.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {subHistory.companies.map((comp, idx) => (
                              <span key={idx} className="px-3 py-1 bg-white border border-purple-200 text-purple-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-2xs">
                                <Building className="w-3 h-3 text-[#6B3BF6]" />
                                {comp}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-500 italic text-xs">Candidate has not been submitted for any client requirement yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* Section 1: Basic & Contact Details */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#6B3BF6]" />
                    Contact & Identification
                  </h3>
                  <button
                    type="button"
                    onClick={e => toggleMask(viewingCandidateDetail.id, e)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      unmaskedIds.has(viewingCandidateDetail.id)
                        ? 'bg-amber-50 border-amber-300 text-amber-700 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                    title={unmaskedIds.has(viewingCandidateDetail.id) ? 'Click to re-mask contact info immediately' : 'Click to reveal contact info for 20 seconds'}
                  >
                    {unmaskedIds.has(viewingCandidateDetail.id) ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-amber-600" />
                        <span>Re-mask ({unmaskedTimers[viewingCandidateDetail.id] ?? 20}s)</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Reveal Contact (20s)</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Full Name</span>
                    <span className="font-bold text-slate-900">{viewingCandidateDetail.name}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Email Address</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {unmaskedIds.has(viewingCandidateDetail.id)
                        ? viewingCandidateDetail.email
                        : maskEmail(viewingCandidateDetail.email)}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Phone Number</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono font-semibold text-slate-800">
                        {unmaskedIds.has(viewingCandidateDetail.id)
                          ? viewingCandidateDetail.phone
                          : maskPhone(viewingCandidateDetail.phone)}
                      </span>
                      <a
                        href={`tel:${viewingCandidateDetail.phone.replace(/[^0-9+]/g, '')}`}
                        onClick={e => {
                          if (!unmaskedIds.has(viewingCandidateDetail.id)) {
                            toggleMask(viewingCandidateDetail.id, e)
                          }
                          showToast(`Initiating direct call to ${viewingCandidateDetail.name} (${viewingCandidateDetail.phone})...`)
                        }}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-2xs active:scale-98"
                        title={`Call ${viewingCandidateDetail.name}`}
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call Candidate</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Professional Profile & Education */}
              <div className="border border-slate-200/80 rounded-2xl p-4 space-y-3 bg-white">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#6B3BF6]" />
                  Professional Profile & Education
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Primary Technology / Role</span>
                    <span className="font-extrabold text-slate-900 text-sm">{viewingCandidateDetail.technology}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Current Company</span>
                    <span className="font-bold text-slate-800">{viewingCandidateDetail.currentCompany || 'Not specified'}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Total Experience</span>
                    <span className="font-bold text-slate-900">{viewingCandidateDetail.totalExperience}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Relevant Experience</span>
                    <span className="font-bold text-slate-900">{viewingCandidateDetail.relevantExperience || viewingCandidateDetail.totalExperience}</span>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block text-[11px] font-medium">Qualification & Education</span>
                    <span className="font-semibold text-slate-800">{viewingCandidateDetail.qualification || 'B.E. Computer Science'}</span>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block text-[11px] font-medium mb-1">Key Skills & Competencies</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(viewingCandidateDetail.skills || 'Testing, Automation, Java, Python, SQL').split(',').map((skill, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-purple-50 text-[#6B3BF6] border border-purple-200/60 rounded-lg text-[11px] font-bold">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Compensation & Notice Period */}
              <div className="border border-slate-200/80 rounded-2xl p-4 space-y-3 bg-white">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#6B3BF6]" />
                  Compensation & Notice Period
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Current CTC</span>
                    <span className="font-extrabold text-slate-900">{viewingCandidateDetail.currentCtc || '12 LPA'}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Expected CTC</span>
                    <span className="font-extrabold text-emerald-700">{viewingCandidateDetail.expectedCtc || '16 LPA'}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Notice Period</span>
                    <span className="font-extrabold text-amber-700">{viewingCandidateDetail.noticePeriod || '30 Days'}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Offer In Hand</span>
                    <span className="font-bold text-slate-800">{viewingCandidateDetail.offerInHand || 'No'}</span>
                  </div>
                </div>
              </div>

              {/* Section 4: Location & Availability */}
              <div className="border border-slate-200/80 rounded-2xl p-4 space-y-3 bg-white">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#6B3BF6]" />
                  Location & Availability
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Current Location</span>
                    <span className="font-bold text-slate-900">{viewingCandidateDetail.currentLocation || 'Bangalore'}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Preferred Work Location</span>
                    <span className="font-bold text-slate-900">{viewingCandidateDetail.preferredLocation || 'Bangalore / Remote'}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Interview Availability</span>
                    <span className="font-semibold text-slate-800">{viewingCandidateDetail.interviewAvailability || 'Immediate'}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Reason for Job Change</span>
                    <span className="font-semibold text-slate-800">{viewingCandidateDetail.reasonForChange || 'Career Growth & Better Opportunity'}</span>
                  </div>
                </div>
              </div>

              {/* Section 5: Documents & Recruiter Notes */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#6B3BF6]" />
                  Resume & Recruiter Notes
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium mb-1">Attached Resume</span>
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-2.5 w-fit">
                      <FileText className="w-4 h-4 text-red-500" />
                      <span className="font-bold text-slate-800 text-xs">
                        {viewingCandidateDetail.resumeReference || `${viewingCandidateDetail.name.replace(/\s+/g, '_')}_Resume.pdf`}
                      </span>
                      <button
                        onClick={() => showToast('Downloading resume PDF...')}
                        className="ml-2 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Download
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Recruiter Internal Notes</span>
                    <p className="text-slate-700 bg-white border border-slate-200 rounded-xl p-3 mt-1 leading-relaxed text-xs">
                      {viewingCandidateDetail.notes || 'Verified profile in candidate repository. Profile matches active client demands.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setViewingCandidateDetail(null)}
                className="px-5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(viewingCandidateDetail)}
                  className="px-5 py-2.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Edit Profile
                </button>
                {activeRequirement && (() => {
                  const modalDup = checkDuplicateSubmission(activeRequirement.id, {
                    email: viewingCandidateDetail.email,
                    phone: viewingCandidateDetail.phone,
                    candidateId: viewingCandidateDetail.candidateId,
                    name: viewingCandidateDetail.name,
                  })
                  if (modalDup.isDuplicate) {
                    return (
                      <button
                        type="button"
                        disabled
                        className="px-6 py-2.5 bg-rose-200 text-rose-800 text-xs font-extrabold rounded-xl border border-rose-300 cursor-not-allowed flex items-center gap-2"
                        title={`Already submitted by ${modalDup.existingSubmission?.recruiter || 'another recruiter'}`}
                      >
                        <ShieldAlert className="w-4 h-4 text-rose-700" />
                        <span>Duplicate Submission - Cannot Submit</span>
                      </button>
                    )
                  }
                  return (
                    <button
                      type="button"
                      onClick={() => handleSubmitSingleToLead(viewingCandidateDetail)}
                      className="px-6 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-extrabold rounded-xl transition-all shadow-sm cursor-pointer active:scale-98 flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit to Lead</span>
                    </button>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REQUIREMENT SELECTION MODAL */}
      {isChangeReqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[520px] overflow-hidden border border-slate-100 font-sans">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Select Requirement</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {pendingCandidateForSubmit
                    ? `Please select a requirement to submit candidate "${pendingCandidateForSubmit.name}"`
                    : 'Choose an active requirement to link with candidate repository'}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsChangeReqModalOpen(false)
                  setPendingCandidateForSubmit(null)
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                  ACTIVE REQUIREMENTS ({requirements.length})
                </label>
                <select
                  value={tempModalReqId}
                  onChange={e => setTempModalReqId(e.target.value)}
                  className="w-full h-11 px-3.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 shadow-2xs cursor-pointer"
                >
                  <option value="" disabled>-- Select a requirement --</option>
                  {requirements.map(req => (
                    <option key={req.id} value={req.id}>
                      {req.id} — {req.title} ({req.client})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsChangeReqModalOpen(false)
                  setPendingCandidateForSubmit(null)
                }}
                className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!tempModalReqId}
                onClick={() => handleConfirmReqSelection(tempModalReqId)}
                className="px-5 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-extrabold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Confirm Requirement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANDIDATE SUBMISSION HISTORY INSPECTION MODAL */}
      {selectedSubmissionHistoryCandidate && (() => {
        const subHistory = getCandidateSubmissionsHistory(selectedSubmissionHistoryCandidate)
        const filteredRecords = subHistory.records.filter(r => {
          if (!submissionModalSearchQuery.trim()) return true
          const q = submissionModalSearchQuery.toLowerCase()
          return (
            r.client.toLowerCase().includes(q) ||
            r.requirementTitle.toLowerCase().includes(q) ||
            r.reqId.toLowerCase().includes(q) ||
            r.submittedBy.toLowerCase().includes(q) ||
            r.status.toLowerCase().includes(q)
          )
        })

        return (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 font-sans max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-purple-100 text-[#6B3BF6] font-black text-sm flex items-center justify-center border border-purple-200 shadow-2xs">
                    <Send className="w-5 h-5 text-[#6B3BF6]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span>Submission History for {selectedSubmissionHistoryCandidate.name}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-[#6B3BF6] border border-purple-200">
                        {subHistory.count} Total Submission{subHistory.count > 1 ? 's' : ''}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      ID: {selectedSubmissionHistoryCandidate.candidateId} • {selectedSubmissionHistoryCandidate.technology}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedSubmissionHistoryCandidate(null)
                    setSubmissionModalSearchQuery('')
                  }}
                  className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Submissions KPI Summary Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-3 text-center">
                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">Total Submissions</span>
                  <span className="text-xl font-black text-purple-950 font-mono">{subHistory.count}</span>
                </div>
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3 text-center">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Submitted Clients</span>
                  <span className="text-xs font-bold text-emerald-950 block mt-1 truncate">
                    {subHistory.companies.length > 0 ? subHistory.companies.join(', ') : 'None'}
                  </span>
                </div>
              </div>

              {/* Search Control within Modal */}
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter submissions by client, requirement, recruiter, or status..."
                  value={submissionModalSearchQuery}
                  onChange={e => setSubmissionModalSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 font-medium"
                />
              </div>

              {/* Submissions List Table */}
              <div className="bg-slate-50/60 rounded-2xl border border-slate-200/80 overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/70 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-3.5">CLIENT ACCOUNT</th>
                      <th className="py-3 px-3.5">REQUIREMENT</th>
                      <th className="py-3 px-3.5">SUBMITTED BY</th>
                      <th className="py-3 px-3.5">SUBMITTED DATE</th>
                      <th className="py-3 px-3.5 text-center">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70 text-slate-800 font-medium">
                    {filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400 font-bold text-xs">
                          No submission records match the filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredRecords.map(rec => (
                        <tr key={rec.id} className="hover:bg-white transition-colors">
                          <td className="py-3 px-3.5 whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white border border-purple-200 text-purple-900 inline-flex items-center gap-1.5 shadow-2xs">
                              <Building className="w-3 h-3 text-[#6B3BF6]" />
                              <span>{rec.client}</span>
                            </span>
                          </td>
                          <td className="py-3 px-3.5">
                            <div className="font-bold text-slate-900 leading-snug">{rec.requirementTitle}</div>
                            <div className="text-[10px] text-[#6B3BF6] font-mono">{rec.reqId}</div>
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap text-slate-700 font-semibold">
                            {rec.submittedBy}
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                            {rec.submittedDate}
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap text-center">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {rec.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Modal Footer */}
              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedSubmissionHistoryCandidate(null)
                    setSubmissionModalSearchQuery('')
                  }}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-2xs"
                >
                  Close History Details
                </button>
              </div>
            </div>
          </div>
        )
      })()}

      {/* TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="fixed bottom-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
