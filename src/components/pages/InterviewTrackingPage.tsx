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
}

export interface FinalDecisionRowItem {
  id: string
  candidateName: string
  requirementId: string
  requirement: string
  decision: 'Selected for Interview' | 'Rejected in Interview' | 'Pending'
  rejectionReason: string
  offerLetter: string
}

const DEFAULT_SCHEDULE_ROWS: ScheduleRowItem[] = [
  {
    id: '0',
    candidateName: 'Harish Gadipally',
    position: 'Senior React / Fullstack Engineer',
    company: 'LTTS Enterprise',
    round: 'L1',
    dateTime: 'Today, 12:00 PM',
    mode: 'Online',
    status: 'Upcoming',
    requirementId: 'REQ-2026-08-12-001',
  },
  {
    id: '1',
    candidateName: 'Arpit Srivastav',
    position: 'MIG welding Fixtures / Modular Fixtures',
    company: 'ltts',
    round: 'L1',
    dateTime: '2026-05-21 18:00',
    mode: 'Online',
    status: 'Completed',
    requirementId: 'REQ-2026-05-21-001',
  },
  {
    id: '2',
    candidateName: 'Vidyasagar Gade',
    position: 'SAP MM+Ariba',
    company: 'itc',
    round: 'Final',
    dateTime: '2026-06-08 14:00',
    mode: 'Online',
    status: 'Completed',
    requirementId: 'REQ-2026-06-08-001',
  },
  {
    id: '3',
    candidateName: 'Vidyasagar Gade',
    position: 'SAP MM+Ariba',
    company: 'itc',
    round: 'L1',
    dateTime: '2026-06-08 10:00',
    mode: 'Online',
    status: 'In Progress',
    requirementId: 'REQ-2026-06-08-001',
  },
  {
    id: '4',
    candidateName: 'Candidate (draft)',
    position: 'service Now mapping& Discovery',
    company: 'Eximietas Design',
    round: 'L1',
    dateTime: '2026-06-09 13:06',
    mode: 'Online',
    status: 'Upcoming',
    requirementId: 'REQ-2026-06-09-002',
  },
  {
    id: '5',
    candidateName: 'Kanchan Meshram',
    position: 'AI Developer',
    company: 'Deloitte',
    round: 'L1',
    dateTime: '2026-06-10 11:45',
    mode: 'Online',
    status: 'Completed',
    requirementId: 'REQ-2026-06-10-003',
  },
]

const DEFAULT_FINAL_DECISIONS: FinalDecisionRowItem[] = [
  {
    id: 'fd-1',
    candidateName: 'Abhijit Narke',
    requirementId: 'REQ-2026-07-08-014',
    requirement: 'Mechanical Design Engineer(Catia V5) for LTTS',
    decision: 'Selected for Interview',
    rejectionReason: '—',
    offerLetter: '—',
  },
  {
    id: 'fd-2',
    candidateName: 'Kiran Shantaram More',
    requirementId: 'REQ-2026-07-08-014',
    requirement: 'Mechanical Design Engineer(Catia V5) for LTTS',
    decision: 'Selected for Interview',
    rejectionReason: '—',
    offerLetter: '—',
  },
  {
    id: 'fd-3',
    candidateName: 'Vidyasagar Gade',
    requirementId: 'REQ-2026-06-08-001',
    requirement: 'SAP MM+Ariba itc',
    decision: 'Selected for Interview',
    rejectionReason: '—',
    offerLetter: '—',
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

  // Filter Schedule Rows
  const filteredScheduleList = useMemo(() => {
    return scheduleList.filter(row => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchName = row.candidateName.toLowerCase().includes(q)
        const matchPos = row.position.toLowerCase().includes(q)
        const matchComp = row.company.toLowerCase().includes(q)
        if (!matchName && !matchPos && !matchComp) return false
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
      return true
    })
  }, [scheduleList, searchQuery, statusToggle])

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
              {scheduleList.filter(s => s.status === 'Upcoming' || s.status === 'Scheduled').length}
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
              {scheduleList.filter(s => s.status === 'In Progress').length}
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
              {scheduleList.filter(s => s.status === 'Completed').length}
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
            <span>All ({scheduleList.length})</span>
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
              : 'Interview Schedule'}
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            Showing {filteredScheduleList.length} of {scheduleList.length} interviews
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {statusToggle === 'upcoming' ? (
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
                    <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                      EVALUATION ACTIONS
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {filteredScheduleList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    No interviews in this section.
                  </td>
                </tr>
              ) : (
                filteredScheduleList.map(row => (
                  <tr key={row.id} className="hover:bg-purple-50/30 transition-colors">
                    {statusToggle === 'upcoming' ? (
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
                        <td className="px-4 py-4 whitespace-nowrap font-bold text-slate-800">
                          {row.company}
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

                        {/* 5. SCHEDULE ACTIONS: EDIT & REMIND */}
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
                        <td className="px-4 py-4 whitespace-nowrap font-bold text-slate-800">
                          {row.company}
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

                        {/* 6. EVALUATION ACTIONS / RESULT */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          {statusToggle === 'completed' ? (
                            <span
                              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold border inline-flex items-center gap-1.5 ${
                                (finalDecisions.find(f => f.candidateName.toLowerCase() === row.candidateName.toLowerCase())?.decision || 'Selected for Interview').includes('Selected')
                                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                  : 'bg-rose-100 text-rose-900 border-rose-300'
                              }`}
                            >
                              {(finalDecisions.find(f => f.candidateName.toLowerCase() === row.candidateName.toLowerCase())?.decision || 'Selected for Interview').includes('Selected') ? (
                                <>
                                  <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                                  <span>Selected in Interview</span>
                                </>
                              ) : (
                                <>
                                  <UserX className="w-3.5 h-3.5 text-rose-700" />
                                  <span>Rejected in Interview</span>
                                </>
                              )}
                            </span>
                          ) : (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleSelectInInterview(row)}
                                className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded-xl cursor-pointer shadow-2xs flex items-center gap-1"
                              >
                                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Selected in Interview</span>
                              </button>

                              <button
                                onClick={() => handleRejectInInterview(row)}
                                className="px-3.5 py-1.5 bg-white hover:bg-rose-50 border border-rose-300 text-rose-700 text-xs font-bold rounded-xl cursor-pointer shadow-2xs flex items-center gap-1"
                              >
                                <UserX className="w-3.5 h-3.5 text-rose-600" />
                                <span>Rejected in Interview</span>
                              </button>
                            </div>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Schedule Pagination Controls */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
          <span>Showing 1-{filteredScheduleList.length} of {filteredScheduleList.length}</span>
          <div className="flex items-center gap-2 font-bold">
            <button className="p-1 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>Page 1 of 1</span>
            <button className="p-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
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

      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-12 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
