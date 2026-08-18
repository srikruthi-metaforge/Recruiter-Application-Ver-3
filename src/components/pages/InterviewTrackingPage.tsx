import React, { useState, useMemo } from 'react'
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bell,
  Search,
  Filter,
  Video,
  Edit2,
  Trash2,
  Plus,
  RefreshCw,
  X,
  UserCheck,
  UserX,
  MessageSquare,
  Building2,
  ExternalLink,
  ChevronRight,
  User,
  Star,
  FileText,
  Briefcase,
  AlertTriangle,
  Building,
  Users,
  ChevronLeft,
  Activity,
  CalendarRange,
  Laptop,
  Play,
  Send,
} from 'lucide-react'
import { Interview, Role, Requirement } from '../../types'
import { ScheduleInterviewModal } from '../modals/ScheduleInterviewModal'
import { RequirementDetailOverview } from './RequirementDetailOverview'
import { PaginationFooter } from '../ui/PaginationFooter'

export interface ScheduleRowItem {
  id: string
  candidateName: string
  position: string
  company: string
  round: string // 'L1' | 'Final'
  dateTime: string
  mode: string // 'Online' | 'In-Person'
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

const DEFAULT_SCHEDULE_ROWS: ScheduleRowItem[] = [
  {
    id: '0',
    candidateName: 'Harish Gadipally (Team Lead Candidate)',
    position: 'Senior React / Fullstack Architect',
    company: 'Accenture',
    teamLead: 'Harish Gadipally',
    submittedBy: 'Harish Gadipally',
    round: 'L1 Technical',
    dateTime: 'Today, 12:00 PM',
    mode: 'Online',
    status: 'Upcoming',
    requirementId: 'REQ-2026-08-12-001',
  },
  {
    id: '1',
    candidateName: 'Arpit Srivastav',
    position: 'Senior React Native Mobile Dev',
    company: 'Accenture',
    teamLead: 'Harish Gadipally',
    submittedBy: 'Marcus Chen',
    round: 'L2 Technical',
    dateTime: '2026-08-18 18:00',
    mode: 'Online',
    status: 'Completed',
    requirementId: 'REQ-2026-08-12-002',
  },
  {
    id: '2',
    candidateName: 'Vidyasagar Gade',
    position: 'Cloud Solutions Architect',
    company: 'Accenture',
    teamLead: 'Harish Gadipally',
    submittedBy: 'Priya Sharma',
    round: 'Final HR Round',
    dateTime: '2026-08-19 14:00',
    mode: 'Online',
    status: 'Completed',
    requirementId: 'REQ-2026-08-12-003',
  },
  {
    id: '3',
    candidateName: 'Suresh Kulkarni (Team Member Candidate)',
    position: 'PLM / PDM Lead Engineer',
    company: 'Accenture',
    teamLead: 'Harish Gadipally',
    submittedBy: 'Suresh kulkarni',
    round: 'L1 Technical',
    dateTime: '2026-08-19 10:00',
    mode: 'Online',
    status: 'In Progress',
    requirementId: 'REQ-2026-08-12-004',
  },
  {
    id: '4',
    candidateName: 'Alex Turner',
    position: 'Lead Java Engineer',
    company: 'Accenture',
    teamLead: 'Harish Gadipally',
    submittedBy: 'Marcus Chen',
    round: 'Technical Round 1',
    dateTime: '2026-08-20 13:06',
    mode: 'Online',
    status: 'Upcoming',
    requirementId: 'REQ-2026-08-12-005',
  },
  {
    id: '5',
    candidateName: 'Kanchan Meshram',
    position: 'AI Solutions Specialist',
    company: 'Accenture',
    teamLead: 'Harish Gadipally',
    submittedBy: 'Priya Sharma',
    round: 'Technical Round 2',
    dateTime: '2026-08-20 11:45',
    mode: 'Online',
    status: 'Completed',
    requirementId: 'REQ-2026-08-12-006',
  },
  {
    id: '6',
    candidateName: 'Rania Khalil',
    position: 'Java Architect',
    company: 'Goldman Sachs',
    teamLead: 'Tom Walsh',
    submittedBy: 'lakshmi.v Recruiter',
    round: 'Manager Round',
    dateTime: 'Aug 06, 02:00 PM',
    mode: 'Online',
    status: 'In Progress',
    requirementId: 'REQ-2026-08-06-005',
  },
  {
    id: '7',
    candidateName: 'Ben Wallace',
    position: 'Python ML Engineer',
    company: 'Tesla',
    teamLead: 'Nina Brooks',
    submittedBy: 'Recruiter',
    round: 'Screening',
    dateTime: 'Aug 07, 11:00 AM',
    mode: 'Online',
    status: 'Completed',
    requirementId: 'REQ-2026-08-07-006',
  },
]

const DEFAULT_FINAL_DECISIONS: FinalDecisionRowItem[] = [
  {
    id: 'fd-1',
    candidateName: 'Abhijit Narke',
    requirementId: 'REQ-2026-08-12-001',
    requirement: 'Senior React / Fullstack Architect for Accenture',
    decision: 'Selected for Interview',
    rejectionReason: '—',
    offerLetter: '—',
    client: 'Accenture',
    teamLead: 'Harish Gadipally',
    submittedBy: 'Marcus Chen',
  },
  {
    id: 'fd-2',
    candidateName: 'Kiran Shantaram More',
    requirementId: 'REQ-2026-08-12-002',
    requirement: 'Senior React Native Mobile Dev for Accenture',
    decision: 'Selected for Interview',
    rejectionReason: '—',
    offerLetter: '—',
    client: 'Accenture',
    teamLead: 'Harish Gadipally',
    submittedBy: 'Priya Sharma',
  },
  {
    id: 'fd-3',
    candidateName: 'Vidyasagar Gade',
    requirementId: 'REQ-2026-08-12-003',
    requirement: 'Cloud Solutions Architect for Accenture',
    decision: 'Selected for Interview',
    rejectionReason: '—',
    offerLetter: '—',
    client: 'Accenture',
    teamLead: 'Harish Gadipally',
    submittedBy: 'Harish Gadipally',
  },
]

interface InterviewTrackingPageProps {
  role?: Role
  interviews?: Interview[]
  onOpenFeedbackModal?: (iv: Interview) => void
}

export function InterviewTrackingPage({
  role = 'recruiter',
  interviews,
  onOpenFeedbackModal,
}: InterviewTrackingPageProps) {
  // Toggle Switcher (Default: 'upcoming')
  const [statusToggle, setStatusToggle] = useState<'upcoming' | 'in_progress' | 'completed' | 'all'>('upcoming')

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFilter, setDateFilter] = useState<'today' | 'this_week' | 'this_month' | 'custom_range'>('this_month')

  // Tables State
  const [scheduleList, setScheduleList] = useState<ScheduleRowItem[]>(DEFAULT_SCHEDULE_ROWS)
  const [finalDecisions, setFinalDecisions] = useState<FinalDecisionRowItem[]>(DEFAULT_FINAL_DECISIONS)

  // Modals & Requirement Overview State
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)
  const [calendarStateFilter, setCalendarStateFilter] = useState<'all' | 'Upcoming' | 'In Progress' | 'Completed'>('all')
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleRowItem | null>(null)
  const [remindModalCandidate, setRemindModalCandidate] = useState<ScheduleRowItem | null>(null)
  const [rejectModalCandidate, setRejectModalCandidate] = useState<ScheduleRowItem | null>(null)
  const [selectedRejectionReason, setSelectedRejectionReason] = useState<string>('Technical evaluation score below threshold')
  const [customRejectionNote, setCustomRejectionNote] = useState<string>('')
  const [selectedReqDetail, setSelectedReqDetail] = useState<Requirement | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  const handleOpenReqOverview = (reqId: string, position: string, company: string) => {
    setSelectedReqDetail({
      id: reqId,
      title: position,
      client: company,
      company: company,
      status: 'Open',
      createdDate: '12 Aug 2026',
      submissionsCount: 4,
      interviewsCount: 2,
      owner: 'Harish Gadipally',
      assignedRecruiter: 'Harish Gadipally',
      experienceRequired: '5 - 8 Years',
      location: 'Hyderabad / Remote',
      salaryRange: '₹18 - ₹24 LPA',
      skills: ['React.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
      description: `Requirement details for ${position} at ${company}. Full job overview, candidate pipeline, and interview history.`,
    } as any)
  }

  // Map passed interviews prop into ScheduleRowItems
  const mappedPropInterviews: ScheduleRowItem[] = useMemo(() => {
    if (interviews && interviews.length > 0) {
      return interviews.map((iv, idx) => {
        const sStr = (iv.status as string) || ''
        const isUpcoming = sStr === 'Confirmed' || sStr === 'Scheduled'
        const isCompleted = sStr === 'Passed' || sStr === 'Completed' || sStr === 'Rejected'
        const isInProgress = sStr === 'In Progress' || sStr === 'Pending'

        const mappedStatus: 'Upcoming' | 'In Progress' | 'Completed' = isUpcoming
          ? 'Upcoming'
          : isCompleted
          ? 'Completed'
          : isInProgress
          ? 'In Progress'
          : 'Upcoming'

        return {
          id: iv.id || `prop-iv-${idx}`,
          candidateName: iv.candidate,
          position: iv.position,
          company: iv.client,
          round: iv.stage || 'L1',
          dateTime: iv.date || 'Aug 06, 10:00 AM',
          mode: 'Online',
          status: mappedStatus,
          requirementId: `REQ-2026-0${idx + 1}`,
        }
      })
    }
    return []
  }, [interviews])

  // Combine state scheduleList with mappedPropInterviews
  const combinedScheduleList = useMemo(() => {
    const existingIds = new Set(scheduleList.map(s => s.id))
    const extras = mappedPropInterviews.filter(m => !existingIds.has(m.id))
    return [...scheduleList, ...extras]
  }, [scheduleList, mappedPropInterviews])

  // Filter Schedule Rows
  const filteredScheduleList = useMemo(() => {
    return combinedScheduleList.filter(row => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchName = row.candidateName.toLowerCase().includes(q)
        const matchPos = row.position.toLowerCase().includes(q)
        const matchComp = row.company.toLowerCase().includes(q)
        const matchRound = row.round.toLowerCase().includes(q)
        if (!matchName && !matchPos && !matchComp && !matchRound) return false
      }

      if (statusToggle === 'upcoming') {
        return row.status === 'Upcoming' || row.status === 'Scheduled'
      }
      if (statusToggle === 'in_progress') {
        return row.status === 'In Progress'
      }
      if (statusToggle === 'completed') {
        return row.status === 'Completed'
      }
      // 'all' shows ALL interviews across all rounds (L1, L2, Technical, HR, Final, etc.) and statuses!
      return true
    })
  }, [combinedScheduleList, searchQuery, statusToggle])

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const totalPages = Math.ceil(filteredScheduleList.length / pageSize) || 1

  const paginatedScheduleList = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredScheduleList.slice(start, start + pageSize)
  }, [filteredScheduleList, currentPage, pageSize])

  const getRoundBadgeStyle = (round: string) => {
    const r = round.toLowerCase()
    if (r.includes('l1') || r.includes('screening')) {
      return 'bg-purple-100 text-purple-800 border-purple-200'
    }
    if (r.includes('l2') || r.includes('technical')) {
      return 'bg-blue-100 text-blue-800 border-blue-200'
    }
    if (r.includes('manager') || r.includes('hr')) {
      return 'bg-amber-100 text-amber-800 border-amber-200'
    }
    if (r.includes('final')) {
      return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    }
    return 'bg-slate-100 text-slate-800 border-slate-200'
  }

  // Move Upcoming Interview to In Progress
  const handleShiftToInProgress = (id: string, candidateName: string) => {
    setScheduleList(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'In Progress' } : item))
    )
    showToast(`Interview for ${candidateName} shifted to In Progress`)
  }

  // Action in In Progress: Select in Interview
  const handleSelectInInterview = (row: ScheduleRowItem) => {
    setScheduleList(prev =>
      prev.map(item => (item.id === row.id ? { ...item, status: 'Completed' } : item))
    )
    setFinalDecisions(prev => [
      {
        id: `fd-${Date.now()}`,
        candidateName: row.candidateName,
        requirementId: row.requirementId || 'REQ-2026-08-12-001',
        requirement: `${row.position} for ${row.company}`,
        decision: 'Selected for Interview',
        rejectionReason: '—',
        offerLetter: '—',
      },
      ...prev,
    ])
    showToast(`${row.candidateName} marked as Selected in Interview! Added to Final Decision.`)
  }

  // Action in In Progress: Open Rejection Reason Modal
  const handleRejectInInterview = (row: ScheduleRowItem) => {
    setSelectedRejectionReason('Technical evaluation score below threshold')
    setCustomRejectionNote('')
    setRejectModalCandidate(row)
  }

  // Confirm and save rejection with reason
  const handleConfirmRejectCandidate = () => {
    if (!rejectModalCandidate) return
    const finalReason = selectedRejectionReason === 'Other' && customRejectionNote.trim()
      ? customRejectionNote.trim()
      : selectedRejectionReason

    setScheduleList(prev =>
      prev.map(item => (item.id === rejectModalCandidate.id ? { ...item, status: 'Completed' } : item))
    )
    setFinalDecisions(prev => [
      {
        id: `fd-${Date.now()}`,
        candidateName: rejectModalCandidate.candidateName,
        requirementId: rejectModalCandidate.requirementId || 'REQ-2026-08-12-001',
        requirement: `${rejectModalCandidate.position} for ${rejectModalCandidate.company}`,
        decision: 'Rejected in Interview',
        rejectionReason: finalReason,
        offerLetter: '—',
      },
      ...prev,
    ])
    showToast(`Rejection recorded for ${rejectModalCandidate.candidateName} with reason: "${finalReason}"!`)
    setRejectModalCandidate(null)
    setCustomRejectionNote('')
  }

  const handleDeleteSchedule = (id: string) => {
    setScheduleList(prev => prev.filter(item => item.id !== id))
    showToast('Interview schedule record deleted')
  }

  const handleUpdateDecision = (id: string, decision: 'Selected for Interview' | 'Rejected in Interview') => {
    setFinalDecisions(prev =>
      prev.map(item => (item.id === id ? { ...item, decision } : item))
    )
    showToast(`Final decision updated to ${decision}`)
  }

  if (selectedReqDetail) {
    return (
      <RequirementDetailOverview
        requirement={selectedReqDetail}
        onBack={() => setSelectedReqDetail(null)}
      />
    )
  }

  return (
    <div className="space-y-6 w-full pb-20 font-sans text-slate-800 animate-in fade-in duration-200">
      {/* 1. TOP PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Interview Schedule</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track upcoming interviews, in-progress sessions, final decisions, and offer letters
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsCalendarModalOpen(true)}
            className="px-4 py-2.5 bg-[#6B3BF6] hover:bg-[#5B2DF0] text-white rounded-2xl text-xs font-extrabold shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-98"
          >
            <CalendarIcon className="w-4 h-4 text-white" />
            <span>Open Interview Calendar View</span>
          </button>
        </div>
      </div>

      {/* 2. TOGGLE SWITCHER & SEARCH BAR (DEFAULT: UPCOMING INTERVIEWS) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Toggles (UPCOMING IS DEFAULT) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setStatusToggle('upcoming')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              statusToggle === 'upcoming'
                ? 'bg-[#6B3BF6] text-white shadow-md font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Upcoming Interviews</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                statusToggle === 'upcoming' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-900'
              }`}
            >
              {combinedScheduleList.filter(s => s.status === 'Upcoming' || s.status === 'Scheduled').length}
            </span>
          </button>

          <button
            onClick={() => setStatusToggle('in_progress')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              statusToggle === 'in_progress'
                ? 'bg-amber-600 text-white shadow-md font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>In Progress</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                statusToggle === 'in_progress' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
              }`}
            >
              {combinedScheduleList.filter(s => s.status === 'In Progress').length}
            </span>
          </button>

          <button
            onClick={() => setStatusToggle('completed')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              statusToggle === 'completed'
                ? 'bg-emerald-600 text-white shadow-md font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Completed</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                statusToggle === 'completed' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-900'
              }`}
            >
              {combinedScheduleList.filter(s => s.status === 'Completed').length}
            </span>
          </button>

          <button
            onClick={() => setStatusToggle('all')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              statusToggle === 'all'
                ? 'bg-slate-900 text-white shadow-md font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>All ({combinedScheduleList.length})</span>
          </button>
        </div>

        {/* Right Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidate or position..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800"
          />
        </div>
      </div>

      {/* HELPER BANNERS FOR CURRENT STAGE */}
      {statusToggle === 'upcoming' && (
        <div className="p-3.5 bg-purple-50/70 border border-purple-200/80 rounded-xl flex items-center justify-between text-xs text-purple-950 font-medium">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#6B3BF6]" />
            <span>
              <strong>Upcoming Interviews:</strong> All scheduled interviews reflect here. When the interview date/time completes, it shifts to <strong>In Progress</strong> waiting for the evaluation result.
            </span>
          </div>
        </div>
      )}

      {statusToggle === 'in_progress' && (
        <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center justify-between text-xs text-amber-950 font-medium">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-700" />
            <span>
              <strong>In Progress (Awaiting Result):</strong> Interview sessions completed waiting for result. Perform actions here to record <strong>Selected in Interview</strong> or <strong>Rejected in Interview</strong>.
            </span>
          </div>
        </div>
      )}

      {statusToggle === 'completed' && (
        <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs text-emerald-950 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>
              <strong>Completed Interviews:</strong> Displays final evaluation results of interviews, candidate decision outcomes, rejection reasons, and offer letter tracking.
            </span>
          </div>
        </div>
      )}

      {/* 3. CARD 1: INTERVIEW SCHEDULE TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden space-y-3 p-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
            {statusToggle === 'upcoming'
              ? 'Upcoming Interviews'
              : statusToggle === 'in_progress'
              ? 'In Progress Interviews'
              : statusToggle === 'completed'
              ? 'Completed Interviews'
              : 'All Scheduled & Conducted Interviews'}
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            Showing {filteredScheduleList.length} of {combinedScheduleList.length} interviews
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {statusToggle === 'all' ? (
                  <>
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      CANDIDATE NAME
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      REQUIREMENT ID & ROLE
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      CLIENT
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      INTERVIEW ROUND
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      MODE & SCHEDULE
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      STATUS
                    </th>
                  </>
                ) : statusToggle === 'upcoming' ? (
                  <>
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      NAME
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      REQUIREMENT ID + ROLE
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      CLIENT
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      ROUND
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      MODE
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      SCHEDULE ACTIONS
                    </th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      NAME
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      REQUIREMENT ID + ROLE
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      CLIENT
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      ROUND
                    </th>
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      MODE
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {paginatedScheduleList.length === 0 ? (
                <tr>
                  <td colSpan={statusToggle === 'in_progress' || statusToggle === 'completed' ? 5 : 6} className="py-10 text-center text-slate-400">
                    No interviews in this section.
                  </td>
                </tr>
              ) : (
                paginatedScheduleList.map(row => (
                  <tr key={row.id} className="hover:bg-purple-50/30 transition-colors">
                    {statusToggle === 'all' ? (
                      <>
                        {/* 1. CANDIDATE NAME */}
                        <td className="px-4 py-4 font-extrabold text-slate-900 flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span>{row.candidateName}</span>
                        </td>

                        {/* 2. REQUIREMENT ID + ROLE */}
                        <td className="px-4 py-4 max-w-xs">
                          <div className="flex items-center gap-1.5 mb-1">
                            <button
                              onClick={() => handleOpenReqOverview(row.requirementId || 'REQ-2026-08-12-001', row.position, row.company)}
                              className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-mono hover:underline cursor-pointer transition-all flex items-center gap-1"
                              title="Click to view Requirement Overview"
                            >
                              <span>{row.requirementId || 'REQ-2026-08-12-001'}</span>
                              <ExternalLink className="w-2.5 h-2.5 text-blue-600" />
                            </button>
                          </div>
                          <div className="font-extrabold text-slate-900 text-xs">{row.position}</div>
                        </td>

                        {/* 3. CLIENT */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-purple-600 inline shrink-0" />
                            <span>{row.company || 'Accenture'}</span>
                            <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              Active Client
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                            Lead: {row.teamLead || 'Harish Gadipally'} | By: {row.submittedBy || 'Marcus Chen'}
                          </div>
                        </td>

                        {/* 4. ROUND */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${getRoundBadgeStyle(row.round)}`}>
                            {row.round}
                          </span>
                        </td>

                        {/* 5. MODE & SCHEDULE */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold">
                            <Laptop className="w-3.5 h-3.5 text-blue-500" />
                            <span>{row.mode} ({row.dateTime})</span>
                          </div>
                        </td>

                        {/* 6. STATUS */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                              row.status === 'Upcoming' || row.status === 'Scheduled'
                                ? 'bg-purple-100 text-purple-800 border-purple-200'
                                : row.status === 'In Progress'
                                ? 'bg-amber-100 text-amber-800 border-amber-200'
                                : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </>
                    ) : statusToggle === 'upcoming' ? (
                      <>
                        {/* 1. NAME */}
                        <td className="px-4 py-4 font-extrabold text-slate-900 flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span>{row.candidateName}</span>
                        </td>

                        {/* 2. REQUIREMENT ID + ROLE */}
                        <td className="px-4 py-4 max-w-xs">
                          <div className="flex items-center gap-1.5 mb-1">
                            <button
                              onClick={() => handleOpenReqOverview(row.requirementId || 'REQ-2026-08-12-001', row.position, row.company)}
                              className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-mono hover:underline cursor-pointer transition-all flex items-center gap-1"
                              title="Click to view Requirement Overview"
                            >
                              <span>{row.requirementId || 'REQ-2026-08-12-001'}</span>
                              <ExternalLink className="w-2.5 h-2.5 text-blue-600" />
                            </button>
                          </div>
                          <div className="font-extrabold text-slate-900 text-xs">{row.position}</div>
                        </td>

                        {/* 3. CLIENT */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-purple-600 inline shrink-0" />
                            <span>{row.company || 'Accenture'}</span>
                            <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              Active Client
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                            Lead: {row.teamLead || 'Harish Gadipally'} | By: {row.submittedBy || 'Marcus Chen'}
                          </div>
                        </td>

                        {/* 4. ROUND */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                              row.round === 'Final'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-purple-100 text-purple-800 border border-purple-200'
                            }`}
                          >
                            {row.round}
                          </span>
                        </td>

                        {/* 5. MODE */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold">
                            <Laptop className="w-3.5 h-3.5 text-blue-500" />
                            <span>{row.mode} ({row.dateTime})</span>
                          </div>
                        </td>

                        {/* 6. SCHEDULE ACTIONS: EDIT & REMIND */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setRemindModalCandidate(row)}
                              className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer shadow-2xs flex items-center gap-1.5"
                            >
                              <Bell className="w-3.5 h-3.5 text-[#6B3BF6]" />
                              <span>Remind Candidate</span>
                            </button>

                            <button
                              onClick={() => setSelectedSchedule(row)}
                              className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer shadow-2xs flex items-center gap-1.5"
                              title="Edit schedule"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                              <span>Edit</span>
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        {/* 1. NAME */}
                        <td className="px-4 py-4 font-extrabold text-slate-900 flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span>{row.candidateName}</span>
                        </td>

                        {/* 2. REQUIREMENT ID + ROLE */}
                        <td className="px-4 py-4 max-w-xs">
                          <div className="flex items-center gap-1.5 mb-1">
                            <button
                              onClick={() => handleOpenReqOverview(row.requirementId || 'REQ-2026-08-12-001', row.position, row.company)}
                              className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-mono hover:underline cursor-pointer transition-all flex items-center gap-1"
                              title="Click to view Requirement Overview"
                            >
                              <span>{row.requirementId || 'REQ-2026-08-12-001'}</span>
                              <ExternalLink className="w-2.5 h-2.5 text-blue-600" />
                            </button>
                          </div>
                          <div className="font-extrabold text-slate-900 text-xs">{row.position}</div>
                        </td>

                        {/* 3. CLIENT */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-purple-600 inline shrink-0" />
                            <span>{row.company || 'Accenture'}</span>
                            <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              Active Client
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                            Lead: {row.teamLead || 'Harish Gadipally'} | By: {row.submittedBy || 'Marcus Chen'}
                          </div>
                        </td>

                        {/* 4. ROUND */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${getRoundBadgeStyle(row.round)}`}
                          >
                            {row.round}
                          </span>
                        </td>

                        {/* 5. MODE */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold">
                            <Laptop className="w-3.5 h-3.5 text-blue-500" />
                            <span>{row.mode} ({row.dateTime})</span>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 10-ITEM PAGINATION FOOTER */}
        <PaginationFooter
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredScheduleList.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>



      {/* 5. CARD 3: RELEASED OFFER LETTER (ONLY DISPLAYED IN COMPLETED & ALL TABS) */}
      {(statusToggle === 'completed' || statusToggle === 'all') && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Released offer letter</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                For offers already <strong className="text-slate-800">released</strong> from the submission page, record if the candidate <strong className="text-slate-800">accepted</strong> (with agreed <strong className="text-slate-800">joining date</strong> for internal records) or <strong className="text-slate-800">declined</strong> (with a reason).
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium">0 candidate(s)</span>
          </div>

          <div className="py-10 text-center text-slate-400 space-y-1">
            <p className="text-xs font-semibold text-slate-500">
              No released offer letters yet. When you release an offer on a submission, it will appear here for response tracking.
            </p>
          </div>
        </div>
      )}

      {/* SCHEDULE INTERVIEW MODAL */}
      {isScheduleModalOpen && (
        <ScheduleInterviewModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          onScheduleSuccess={() => {
            showToast('Interview scheduled successfully!')
            setIsScheduleModalOpen(false)
          }}
        />
      )}

      {/* REMIND CANDIDATE MODAL */}
      {remindModalCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-[#6B3BF6]">
                <Bell className="w-5 h-5" />
                <h3 className="text-base font-extrabold text-slate-900">Send Candidate Interview Reminder</h3>
              </div>
              <button
                onClick={() => setRemindModalCandidate(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p className="font-semibold">
                Would you like to send an automated interview reminder notification to candidate <strong className="text-slate-900">{remindModalCandidate.candidateName}</strong>?
              </p>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1.5 font-medium">
                <div className="flex justify-between">
                  <span className="text-slate-500">Candidate:</span>
                  <span className="font-bold text-slate-900">{remindModalCandidate.candidateName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Requirement / Role:</span>
                  <span className="font-bold text-slate-900">{remindModalCandidate.position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Client:</span>
                  <span className="font-bold text-purple-700">{remindModalCandidate.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled Time:</span>
                  <span className="font-bold text-blue-600">{remindModalCandidate.dateTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Channels:</span>
                  <span className="font-bold text-emerald-700">Email & SMS Notification</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setRemindModalCandidate(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast(`Interview reminder sent to ${remindModalCandidate.candidateName} via Email & SMS!`)
                  setRemindModalCandidate(null)
                }}
                className="px-4 py-2 bg-[#6B3BF6] hover:bg-[#5b30d9] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Reminder to Candidate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECTION REASON MODAL UI */}
      {rejectModalCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-rose-600">
                <UserX className="w-5 h-5" />
                <h3 className="text-base font-extrabold text-slate-900">Record Interview Rejection Reason</h3>
              </div>
              <button
                onClick={() => setRejectModalCandidate(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1 font-medium">
                <div className="flex justify-between">
                  <span className="text-slate-500">Candidate:</span>
                  <span className="font-bold text-slate-900">{rejectModalCandidate.candidateName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Requirement / Role:</span>
                  <span className="font-bold text-slate-900">{rejectModalCandidate.position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Round:</span>
                  <span className="font-bold text-purple-700">{rejectModalCandidate.round}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Select Reason for Rejection <span className="text-rose-500">*</span>
                </label>
                <div className="space-y-1.5">
                  {[
                    'Technical evaluation score below threshold',
                    'Domain experience mismatch for client requirement',
                    'Salary expectation exceeds approved budget',
                    'Communication / soft skills mismatch',
                    'Candidate withdrew / unavailable for next round',
                    'Other',
                  ].map(reason => (
                    <label
                      key={reason}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer ${
                        selectedRejectionReason === reason
                          ? 'border-purple-600 bg-purple-50/60 font-bold text-slate-900 shadow-2xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="rejectionReasonRadio"
                        value={reason}
                        checked={selectedRejectionReason === reason}
                        onChange={() => setSelectedRejectionReason(reason)}
                        className="text-[#6B3BF6] focus:ring-[#6B3BF6]"
                      />
                      <span>{reason}</span>
                    </label>
                  ))}
                </div>

                {selectedRejectionReason === 'Other' && (
                  <div className="pt-2 space-y-1">
                    <label className="block text-[11px] font-bold text-slate-700">Specify Custom Rejection Reason</label>
                    <textarea
                      rows={2}
                      value={customRejectionNote}
                      onChange={e => setCustomRejectionNote(e.target.value)}
                      placeholder="Type custom reason for rejection..."
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setRejectModalCandidate(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRejectCandidate}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <UserX className="w-3.5 h-3.5" />
                <span>Submit Rejection & Move to Final Decision</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. INTERACTIVE INTERVIEW CALENDAR MODAL */}
      {isCalendarModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-4xl w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 font-sans max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-[#6B3BF6]" />
                  <h3 className="text-lg font-extrabold text-slate-900">August 2026 — Interview Schedule Calendar</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-[#6B3BF6] border border-purple-200">
                    Live Calendar View
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Interviews mapped by scheduled date, status state (Upcoming, In Progress, Completed), and client company
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* State Filter Buttons */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-extrabold">
                  <button
                    onClick={() => setCalendarStateFilter('all')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      calendarStateFilter === 'all'
                        ? 'bg-white text-purple-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All States
                  </button>
                  <button
                    onClick={() => setCalendarStateFilter('Upcoming')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      calendarStateFilter === 'Upcoming'
                        ? 'bg-[#6B3BF6] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => setCalendarStateFilter('In Progress')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      calendarStateFilter === 'In Progress'
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => setCalendarStateFilter('Completed')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      calendarStateFilter === 'Completed'
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Completed
                  </button>
                </div>

                <button
                  onClick={() => setIsCalendarModalOpen(false)}
                  className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Days of Week Bar */}
            <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Monthly Calendar Grid (Aug 2026) */}
            <div className="grid grid-cols-7 gap-2">
              {/* Previous month filler days */}
              {[26, 27, 28, 29, 30, 31].map(d => (
                <div key={`prev-${d}`} className="min-h-24 p-2 bg-slate-50/40 rounded-2xl border border-slate-100/60 opacity-40">
                  <span className="text-[10px] font-bold text-slate-400">{d}</span>
                </div>
              ))}

              {/* August Days 1 - 31 */}
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                const dayStr = day < 10 ? `0${day}` : `${day}`
                const dayInterviews = combinedScheduleList.filter(s => {
                  if (calendarStateFilter !== 'all' && s.status !== calendarStateFilter) return false
                  return s.dateTime.includes(`Aug ${dayStr}`) || s.dateTime.includes(`2026-08-${dayStr}`) || (day === 17 && s.dateTime.includes('Today'))
                })

                return (
                  <div
                    key={`aug-${day}`}
                    className={`min-h-28 p-2.5 rounded-2xl border transition-all flex flex-col justify-between ${
                      day === 17
                        ? 'bg-purple-50/40 border-purple-300 ring-2 ring-[#6B3BF6]/20'
                        : 'bg-white border-slate-200/80 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-extrabold ${day === 17 ? 'text-[#6B3BF6] bg-purple-100 px-2 py-0.5 rounded-full' : 'text-slate-700'}`}>
                        Aug {day}
                      </span>
                      {dayInterviews.length > 0 && (
                        <span className="w-2 h-2 rounded-full bg-[#6B3BF6] animate-pulse" />
                      )}
                    </div>

                    <div className="space-y-1.5 overflow-y-auto max-h-20">
                      {dayInterviews.length === 0 ? (
                        <span className="text-[10px] text-slate-300 font-medium italic block pt-2">No interviews</span>
                      ) : (
                        dayInterviews.map(item => (
                          <div
                            key={item.id}
                            onClick={() => {
                              setIsCalendarModalOpen(false)
                              setSelectedSchedule(item)
                            }}
                            className={`p-1.5 rounded-xl border text-[10px] font-extrabold cursor-pointer transition-all hover:scale-102 shadow-2xs space-y-0.5 ${
                              item.status === 'Upcoming' || item.status === 'Scheduled'
                                ? 'bg-purple-100/90 text-purple-900 border-purple-200 hover:bg-purple-200'
                                : item.status === 'In Progress'
                                ? 'bg-amber-100/90 text-amber-900 border-amber-200 hover:bg-amber-200'
                                : 'bg-emerald-100/90 text-emerald-900 border-emerald-200 hover:bg-emerald-200'
                            }`}
                            title={`Click to view/edit ${item.candidateName}'s interview`}
                          >
                            <div className="truncate text-slate-900">{item.candidateName}</div>
                            <div className="text-[9px] font-semibold text-purple-700 flex items-center justify-between">
                              <span>{item.company}</span>
                              <span className="opacity-80">{item.round}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Modal Footer Legend */}
            <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-4">
                <span className="text-slate-500 font-bold">Interview Status States:</span>
                <span className="flex items-center gap-1 text-[#6B3BF6] font-extrabold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6B3BF6]" /> Upcoming / Scheduled
                </span>
                <span className="flex items-center gap-1 text-amber-700 font-extrabold">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> In Progress (Result Pending)
                </span>
                <span className="flex items-center gap-1 text-emerald-700 font-extrabold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Completed
                </span>
              </div>

              <button
                onClick={() => setIsCalendarModalOpen(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer"
              >
                Close Calendar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-12 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
