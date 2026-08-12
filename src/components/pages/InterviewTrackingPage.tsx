import React, { useState, useMemo } from 'react'
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
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
  Kanban,
  List as ListIcon,
  Clock3,
  MessageSquare,
  Building2,
  ExternalLink,
  ChevronRight,
  User,
  Star,
  FileText,
  PhoneCall,
  Briefcase,
  Share2,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Building,
  Users,
  UserPlus,
  ArrowRight,
  Activity,
  Layers,
  Lock,
  CalendarCheck,
  Laptop,
  Mail,
  Phone,
  ThumbsUp,
  ThumbsDown,
  CalendarRange,
} from 'lucide-react'
import { Interview, Role } from '../../types'
import { ScheduleInterviewModal } from '../modals/ScheduleInterviewModal'

export type InterviewStage =
  | 'Screening'
  | 'Shortlisted'
  | 'Interview Scheduled'
  | 'Completed'

export type DailyOutcome = 'Selected' | 'Not Selected' | 'Pending'

export interface CandidateCardItem {
  id: string
  name: string
  role: string
  experience: string
  currentCompany: string
  stage: InterviewStage

  // Client Info & POC
  clientName: string
  clientPOC: string
  pocContact: string

  // Requirement Info & Requirement Date
  reqId: string
  reqTitle: string
  reqDate: string

  // Scheduled Date & Time of Interview
  scheduledDate: string
  scheduledTime: string
  dateTime: string
  isToday?: boolean
  isOverdue?: boolean

  // Interviewer / Panel
  interviewerName: string

  // Interview Mode
  meetingMode: 'MS Teams (Online)' | 'Google Meet (Online)' | 'Zoom (Online)' | 'In-Person (Office)' | 'Telephonic'
  meetingUrl?: string

  // Daily Outcome for In-Progress Evaluation
  dailyOutcome: DailyOutcome
  dailyDecisionReason?: string

  stageProgress: number // 1 to 4
  lastActivity: string
  assignedRecruiter: string
  team: string
  department: string
  statusBadge: string
  statusColor: 'blue' | 'purple' | 'emerald' | 'amber' | 'rose' | 'slate'
  notes: string[]
  feedback?: string
  rating?: number
}

const INITIAL_CANDIDATES: CandidateCardItem[] = [
  {
    id: 'c-101',
    name: 'Siddharth Sunil',
    role: 'Java Full Stack Developer',
    experience: '4 Yrs 2 Mos',
    currentCompany: 'Infosys Ltd',
    stage: 'Screening',

    clientName: 'Infosys Ltd',
    clientPOC: 'Kallol Chakraborty',
    pocContact: 'kallol.c@infosys.com',

    reqId: 'REQ-2026-05-08-003',
    reqTitle: 'TPC OSI PI Engineer / Lead Developer',
    reqDate: '08 May 2026',

    scheduledDate: '11 Aug 2026',
    scheduledTime: '11:30 AM',
    dateTime: 'Today • 11:30 AM',
    isToday: true,

    interviewerName: 'Kallol Chakraborty (Eng Manager)',
    meetingMode: 'MS Teams (Online)',
    meetingUrl: 'https://teams.microsoft.com/l/meetup-join/101',

    dailyOutcome: 'Selected',
    dailyDecisionReason: 'Cleared L1 coding round. Excellent Java & Spring Boot skills.',

    stageProgress: 1,
    lastActivity: 'HR call completed 20m ago',
    assignedRecruiter: 'Harish Gadipally',
    team: 'Engineering Team',
    department: 'Software Engineering',
    statusBadge: 'Screening Call',
    statusColor: 'amber',
    notes: ['Profile matched automated AI screener with 92% score.', 'Resume verified.'],
  },
  {
    id: 'c-102',
    name: 'Priyanka Sharma',
    role: 'Senior React Developer',
    experience: '5 Yrs 8 Mos',
    currentCompany: 'TCS Cyber',
    stage: 'Screening',

    clientName: 'TCS Cyber',
    clientPOC: 'Trayeetanu Ganguly',
    pocContact: 'trayeetanu.g@tcs.com',

    reqId: 'REQ-2026-05-12-014',
    reqTitle: 'TPC Data Analyst for Vadodara',
    reqDate: '12 May 2026',

    scheduledDate: '10 Aug 2026',
    scheduledTime: '02:30 PM',
    dateTime: 'Yesterday • 02:30 PM',
    isOverdue: true,

    interviewerName: 'Trayeetanu Ganguly (Tech Lead)',
    meetingMode: 'Google Meet (Online)',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',

    dailyOutcome: 'Not Selected',
    dailyDecisionReason: 'Notice period exceeds 60 days budget limit.',

    stageProgress: 1,
    lastActivity: 'Needs feedback review',
    assignedRecruiter: 'Arvind GR',
    team: 'Engineering Team',
    department: 'Software Engineering',
    statusBadge: 'Review Overdue',
    statusColor: 'rose',
    notes: ['Completed HR screening call. Good communication skills.', 'Notice period: 60 days.'],
  },
  {
    id: 'c-103',
    name: 'Arpit Srivastav',
    role: 'MIG welding Fixtures Engineer',
    experience: '6 Yrs 1 Mo',
    currentCompany: 'LTTS Mobility',
    stage: 'Shortlisted',

    clientName: 'LTTS Mobility',
    clientPOC: 'Trayeetanu Ganguly',
    pocContact: 'trayeetanu.g@ltts.com',

    reqId: 'REQ-2026-05-19-003',
    reqTitle: 'TPC- MIG exhaust welding fixture',
    reqDate: '19 May 2026',

    scheduledDate: '12 Aug 2026',
    scheduledTime: '11:00 AM',
    dateTime: 'Aug 12, 2026 • 11:00 AM',

    interviewerName: 'Charlie Darwin (Lead Architect)',
    meetingMode: 'MS Teams (Online)',
    meetingUrl: 'https://teams.microsoft.com/l/meetup-join/103',

    dailyOutcome: 'Selected',
    dailyDecisionReason: 'Shortlisted by hiring manager for L1 panel round.',

    stageProgress: 2,
    lastActivity: 'Shortlisted by hiring manager',
    assignedRecruiter: 'Charlie Darwin',
    team: 'Automotive Team',
    department: 'Hardware & Automotive',
    statusBadge: 'Shortlisted',
    statusColor: 'purple',
    notes: ['Shortlisted by Lead Recruiter for L1 Technical Round.'],
  },
  {
    id: 'c-104',
    name: 'Vidyasagar Gade',
    role: 'SAP MM + Ariba Specialist',
    experience: '7 Yrs 5 Mos',
    currentCompany: 'ITC Infotech',
    stage: 'Interview Scheduled',

    clientName: 'ITC Infotech',
    clientPOC: 'Pranati Paul',
    pocContact: 'pranati.paul@itc.in',

    reqId: 'REQ-2026-05-21-004',
    reqTitle: 'MIG welding Fixtures / Modular Fixtures',
    reqDate: '21 May 2026',

    scheduledDate: '11 Aug 2026',
    scheduledTime: '04:00 PM',
    dateTime: 'Today • 04:00 PM',
    isToday: true,

    interviewerName: 'Pranati Paul (Enterprise Delivery Mgr)',
    meetingMode: 'Zoom (Online)',
    meetingUrl: 'https://zoom.us/j/987654321',

    dailyOutcome: 'Pending',
    dailyDecisionReason: 'Session in progress today at 04:00 PM.',

    stageProgress: 3,
    lastActivity: 'Meeting link sent via email',
    assignedRecruiter: 'Harish Gadipally',
    team: 'ERP & SAP Team',
    department: 'Enterprise Applications',
    statusBadge: 'L1 Scheduled',
    statusColor: 'blue',
    notes: ['L1 Technical round scheduled with Senior Architect.'],
  },
  {
    id: 'c-105',
    name: 'Kanchan Meshram',
    role: 'AI Developer / Data Engineer',
    experience: '3 Yrs 10 Mos',
    currentCompany: 'Deloitte Digital',
    stage: 'Completed',

    clientName: 'Deloitte Digital',
    clientPOC: 'Kiran N',
    pocContact: 'kiran.n@deloitte.com',

    reqId: 'REQ-2026-05-21-002',
    reqTitle: 'DPS- TPC Golang, Kubernetes, NATS',
    reqDate: '21 May 2026',

    scheduledDate: '09 Aug 2026',
    scheduledTime: '03:00 PM',
    dateTime: 'Aug 09, 2026 • 03:00 PM',

    interviewerName: 'Kiran N (AI Practice Lead)',
    meetingMode: 'Google Meet (Online)',
    meetingUrl: 'https://meet.google.com/xyz-uvwx-rst',

    dailyOutcome: 'Selected',
    dailyDecisionReason: 'Cleared L2 technical assessment. Recommended for offer.',

    stageProgress: 4,
    lastActivity: 'L2 feedback recorded 5/5',
    assignedRecruiter: 'Harini Sindey',
    team: 'Engineering Team',
    department: 'Software Engineering',
    statusBadge: 'L2 Cleared',
    statusColor: 'emerald',
    notes: ['Cleared L2 technical assessment. Excellent problem solving.'],
    feedback: 'Strong understanding of LLMs, Python & PyTorch pipelines. Recommended for offer.',
    rating: 5,
  },
  {
    id: 'c-106',
    name: 'Abhijit Narke',
    role: 'Mechanical Design Engineer',
    experience: '8 Yrs 0 Mos',
    currentCompany: 'LTTS Automotive',
    stage: 'Completed',

    clientName: 'LTTS Automotive',
    clientPOC: 'Vinaya Kumar Patil',
    pocContact: 'vinaya.patil@ltts.com',

    reqId: 'REQ-2026-05-25-001',
    reqTitle: 'Senior Catia V5 Automotive Chassis Engineer',
    reqDate: '25 May 2026',

    scheduledDate: '08 Aug 2026',
    scheduledTime: '05:00 PM',
    dateTime: 'Aug 08, 2026 • 05:00 PM',

    interviewerName: 'Vinaya Kumar Patil (Eng VP)',
    meetingMode: 'In-Person (Office)',

    dailyOutcome: 'Selected',
    dailyDecisionReason: 'Partner round cleared with flying colors.',

    stageProgress: 4,
    lastActivity: 'Selected for offer generation',
    assignedRecruiter: 'Puttapaka Saiteja',
    team: 'Automotive Team',
    department: 'Hardware & Automotive',
    statusBadge: 'Offer Selected',
    statusColor: 'emerald',
    notes: ['Final Partner Round Cleared. Offer letter generation in progress.'],
    feedback: 'Top tier candidate. Strong leadership and CAD expertise.',
    rating: 5,
  },
]

const STAGES: InterviewStage[] = [
  'Screening',
  'Shortlisted',
  'Interview Scheduled',
  'Completed',
]

const RECRUITERS = [
  'Harish Gadipally',
  'Arvind GR',
  'Charlie Darwin',
  'Harini Sindey',
  'Puttapaka Saiteja',
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
  const [candidates, setCandidates] = useState<CandidateCardItem[]>(INITIAL_CANDIDATES)

  // Search, Status Toggle & Customizable Date Filter State
  const [searchQuery, setSearchQuery] = useState('')
  const [statusToggle, setStatusToggle] = useState<'upcoming' | 'in_progress' | 'completed' | 'all'>('in_progress')
  const [dateFilter, setDateFilter] = useState<'today' | 'this_week' | 'this_month' | 'custom_range'>('this_month')

  // Customizable Date Range Picker State
  const [customStartDate, setCustomStartDate] = useState('2026-08-01')
  const [customEndDate, setCustomEndDate] = useState('2026-08-31')
  const [showCustomRangePicker, setShowCustomRangePicker] = useState(false)

  // Modals & Action State
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateCardItem | null>(null)
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)
  const [newNoteText, setNewNoteText] = useState('')
  const [reassignCandidate, setReassignCandidate] = useState<CandidateCardItem | null>(null)
  const [targetRecruiter, setTargetRecruiter] = useState('')

  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  // Handle Date Filter Change
  const handleDateFilterChange = (val: 'today' | 'this_week' | 'this_month' | 'custom_range') => {
    setDateFilter(val)
    if (val === 'custom_range') {
      setShowCustomRangePicker(true)
    } else {
      setShowCustomRangePicker(false)
    }
  }

  // Update Daily Selection Outcome
  const updateDailyOutcome = (candidateId: string, outcome: DailyOutcome, reason?: string) => {
    setCandidates(prev =>
      prev.map(c => {
        if (c.id === candidateId) {
          return {
            ...c,
            dailyOutcome: outcome,
            dailyDecisionReason: reason || c.dailyDecisionReason || `Marked ${outcome} today`,
          }
        }
        return c
      })
    )
    showToast(`Updated candidate daily progress to ${outcome}`)
  }

  // Move Candidate Stage
  const moveStage = (candidateId: string, newStage: InterviewStage) => {
    setCandidates(prev =>
      prev.map(c => {
        if (c.id === candidateId) {
          const progressMap: Record<InterviewStage, number> = {
            Screening: 1,
            Shortlisted: 2,
            'Interview Scheduled': 3,
            Completed: 4,
          }
          return {
            ...c,
            stage: newStage,
            stageProgress: progressMap[newStage],
            lastActivity: `Moved to ${newStage} just now`,
          }
        }
        return c
      })
    )
    showToast(`Candidate stage updated to ${newStage}`)
  }

  // Save Notes
  const handleAddNote = () => {
    if (!selectedCandidate || !newNoteText.trim()) return
    setCandidates(prev =>
      prev.map(c => {
        if (c.id === selectedCandidate.id) {
          return {
            ...c,
            notes: [newNoteText.trim(), ...c.notes],
          }
        }
        return c
      })
    )
    setSelectedCandidate(prev => (prev ? { ...prev, notes: [newNoteText.trim(), ...prev.notes] } : null))
    setNewNoteText('')
    showToast('Note added successfully')
  }

  // Handle Reassign Recruiter
  const handleReassignRecruiter = () => {
    if (!reassignCandidate || !targetRecruiter) return
    setCandidates(prev =>
      prev.map(c => {
        if (c.id === reassignCandidate.id) {
          return { ...c, assignedRecruiter: targetRecruiter }
        }
        return c
      })
    )
    showToast(`Reassigned ${reassignCandidate.name} to ${targetRecruiter}`)
    setReassignCandidate(null)
  }

  // Compute Category Tab Counts
  const scopeCandidates = useMemo(() => {
    return candidates.filter(c => (role === 'recruiter' ? c.assignedRecruiter === 'Harish Gadipally' : true))
  }, [candidates, role])

  const upcomingCount = useMemo(() => {
    return scopeCandidates.filter(c => c.stage === 'Interview Scheduled' || c.stage === 'Shortlisted' || c.isToday).length
  }, [scopeCandidates])

  const inProgressCount = useMemo(() => {
    return scopeCandidates.filter(c => c.stage === 'Screening').length
  }, [scopeCandidates])

  const completedCount = useMemo(() => {
    return scopeCandidates.filter(c => c.stage === 'Completed').length
  }, [scopeCandidates])

  const allCount = scopeCandidates.length

  // Filtered Candidates according to Search, Status Toggle & Customizable Date Filter
  const filteredCandidates = useMemo(() => {
    return scopeCandidates.filter(c => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matches =
          c.name.toLowerCase().includes(q) ||
          c.role.toLowerCase().includes(q) ||
          c.currentCompany.toLowerCase().includes(q) ||
          c.assignedRecruiter.toLowerCase().includes(q) ||
          c.clientName.toLowerCase().includes(q) ||
          c.clientPOC.toLowerCase().includes(q) ||
          c.reqId.toLowerCase().includes(q)
        if (!matches) return false
      }

      // Status Toggle Filter
      if (statusToggle === 'upcoming') {
        if (c.stage !== 'Interview Scheduled' && c.stage !== 'Shortlisted' && !c.isToday) {
          return false
        }
      } else if (statusToggle === 'in_progress') {
        if (c.stage !== 'Screening') {
          return false
        }
      } else if (statusToggle === 'completed') {
        if (c.stage !== 'Completed') {
          return false
        }
      }

      // Customizable Date Range Filter Logic
      if (dateFilter === 'today') {
        if (!c.isToday && !c.scheduledDate.includes('11 Aug') && !c.dateTime.includes('Today')) {
          return false
        }
      } else if (dateFilter === 'this_week') {
        if (!c.scheduledDate.includes('Aug 2026') && !c.dateTime.includes('Today') && !c.dateTime.includes('Yesterday')) {
          return false
        }
      } else if (dateFilter === 'custom_range' && customStartDate && customEndDate) {
        const start = new Date(customStartDate).getTime()
        const end = new Date(customEndDate).getTime() + 86400000
        // Extract day number from "11 Aug 2026"
        const matchDay = c.scheduledDate.match(/(\d+)\s+Aug/)
        if (matchDay) {
          const dayNum = parseInt(matchDay[1], 10)
          const candTime = new Date(`2026-08-${dayNum.toString().padStart(2, '0')}`).getTime()
          if (candTime < start || candTime > end) {
            return false
          }
        }
      }

      return true
    })
  }, [scopeCandidates, searchQuery, statusToggle, dateFilter, customStartDate, customEndDate])

  // In-Progress Specific Daily Outcome Metrics
  const inProgressSelectedCount = useMemo(() => {
    return scopeCandidates.filter(c => c.stage === 'Screening' && c.dailyOutcome === 'Selected').length
  }, [scopeCandidates])

  const inProgressNotSelectedCount = useMemo(() => {
    return scopeCandidates.filter(c => c.stage === 'Screening' && c.dailyOutcome === 'Not Selected').length
  }, [scopeCandidates])

  const inProgressPendingCount = useMemo(() => {
    return scopeCandidates.filter(c => c.stage === 'Screening' && c.dailyOutcome === 'Pending').length
  }, [scopeCandidates])

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800">
      {/* 1. TOP HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Interview Tracking</h1>

            {role === 'superadmin' && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-200 inline-flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                <span>🔴 Super Admin View (Org-Wide)</span>
              </span>
            )}

            {role === 'admin' && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-200 inline-flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <span>🟠 Admin View (Team Management)</span>
              </span>
            )}

            {role === 'lead' && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-900 border border-blue-200 inline-flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>🔵 Team Lead View (Team Supervision)</span>
              </span>
            )}

            {role === 'recruiter' && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EEF2FF] text-[#5B51D8] border border-[#C7D2FE] inline-flex items-center gap-1.5 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5B51D8]" />
                <span>My Assigned Interviews</span>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track Upcoming Interviews, In Progress daily evaluation (Selected / Not Selected), and Completed sessions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {role !== 'superadmin' && (
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="px-4 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>+ Schedule Interview</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. REORDERED STATUS BAR: TOGGLES ON LEFT & CUSTOMIZABLE DATE FILTER + SEARCH BAR ON RIGHT CORNER */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Status Toggle Switcher (POSITIONED ON LEFT) */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold w-full lg:w-auto">
            <button
              onClick={() => setStatusToggle('upcoming')}
              className={`flex-1 lg:flex-initial px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                statusToggle === 'upcoming'
                  ? 'bg-purple-600 text-white shadow-md font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Upcoming Interviews</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${statusToggle === 'upcoming' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-900'}`}>
                {upcomingCount}
              </span>
            </button>

            <button
              onClick={() => setStatusToggle('in_progress')}
              className={`flex-1 lg:flex-initial px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                statusToggle === 'in_progress'
                  ? 'bg-amber-600 text-white shadow-md font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>In Progress</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${statusToggle === 'in_progress' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'}`}>
                {inProgressCount}
              </span>
            </button>

            <button
              onClick={() => setStatusToggle('completed')}
              className={`flex-1 lg:flex-initial px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                statusToggle === 'completed'
                  ? 'bg-emerald-600 text-white shadow-md font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Completed</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${statusToggle === 'completed' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-900'}`}>
                {completedCount}
              </span>
            </button>

            <button
              onClick={() => setStatusToggle('all')}
              className={`flex-1 lg:flex-initial px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                statusToggle === 'all'
                  ? 'bg-slate-900 text-white shadow-md font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>All ({allCount})</span>
            </button>
          </div>

          {/* Right Corner Controls: Date Filter Dropdown & Search Box */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Date Range Filter Dropdown */}
            <div className="w-full sm:w-44">
              <select
                value={dateFilter}
                onChange={e => handleDateFilterChange(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
              >
                <option value="today">Today</option>
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
                <option value="custom_range">Custom Range...</option>
              </select>
            </div>

            {/* Search Box on Right Corner */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidate, client, REQ..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6]"
              />
            </div>
          </div>
        </div>

        {/* CUSTOMIZABLE DATE RANGE PICKER POP-DOWN */}
        {(dateFilter === 'custom_range' || showCustomRangePicker) && (
          <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-950">
              <CalendarRange className="w-4 h-4 text-[#6B3BF6]" />
              <span>Custom Date Range Picker:</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-purple-200 shadow-2xs">
                <span className="text-slate-400 font-semibold">From:</span>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={e => setCustomStartDate(e.target.value)}
                  className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-purple-200 shadow-2xs">
                <span className="text-slate-400 font-semibold">To:</span>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={e => setCustomEndDate(e.target.value)}
                  className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer"
                />
              </div>

              <button
                onClick={() => {
                  showToast(`Applied Custom Date Range: ${customStartDate} to ${customEndDate}`)
                }}
                className="px-3.5 py-1.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white rounded-xl shadow-2xs transition-all cursor-pointer font-bold"
              >
                Apply Range
              </button>
            </div>
          </div>
        )}

        {/* DAILY EVALUATION SUMMARY BANNER WHEN IN-PROGRESS IS ACTIVE */}
        {statusToggle === 'in_progress' && (
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50/50 p-3 rounded-xl border border-amber-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <Activity className="w-4 h-4 text-amber-700 animate-pulse" />
              <span>Today's Evaluation Progress Summary:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold">
              <div className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1.5 shadow-2xs">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-700" />
                <span>Selected Today: {inProgressSelectedCount}</span>
              </div>

              <div className="px-3 py-1 rounded-lg bg-rose-100 text-rose-900 border border-rose-300 flex items-center gap-1.5 shadow-2xs">
                <ThumbsDown className="w-3.5 h-3.5 text-rose-700" />
                <span>Not Selected Today: {inProgressNotSelectedCount}</span>
              </div>

              <div className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Pending Outcome: {inProgressPendingCount}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. CLEAN TABLE VIEW */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">CANDIDATE & ROLE</th>
                <th className="py-3.5 px-4">REQUIREMENT & CLIENT POC</th>
                <th className="py-3.5 px-4">SCHEDULED INTERVIEW</th>
                <th className="py-3.5 px-4">DAILY OUTCOME & STAGE</th>
                <th className="py-3.5 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <p className="font-bold text-sm">No interviews found in this view category</p>
                    <p className="text-xs mt-1">Try switching tabs or adjusting your custom date range filter above</p>
                  </td>
                </tr>
              ) : (
                filteredCandidates.map(c => (
                  <tr
                    key={c.id}
                    className="hover:bg-purple-50/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedCandidate(c)}
                  >
                    {/* Column 1: Candidate & Role */}
                    <td className="py-4 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#5B51D8] font-extrabold flex items-center justify-center text-xs shrink-0 border border-[#C7D2FE]">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-slate-900 font-extrabold text-xs">{c.name}</div>
                          <div className="text-[11px] text-[#6B3BF6] font-bold mt-0.5">{c.role}</div>
                          <div className="text-[10px] text-slate-500 font-normal flex items-center gap-2 mt-0.5">
                            <span>Exp: {c.experience}</span>
                            <span>•</span>
                            <span className="text-purple-700 font-semibold">Recruiter: {c.assignedRecruiter}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Requirement & Client POC */}
                    <td className="py-4 px-4" onClick={e => e.stopPropagation()}>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
                            {c.reqId}
                          </span>
                          <span className="font-bold text-slate-900 text-xs truncate max-w-[180px]" title={c.reqTitle}>
                            {c.reqTitle}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 font-semibold flex items-center gap-2">
                          <span className="text-slate-900 font-bold flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-blue-600" />
                            <span>{c.clientName}</span>
                          </span>
                          <span>•</span>
                          <span className="text-slate-500">POC: <strong className="text-slate-800">{c.clientPOC}</strong></span>
                        </div>
                      </div>
                    </td>

                    {/* Column 3: Scheduled Interview */}
                    <td className="py-4 px-4" onClick={e => e.stopPropagation()}>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 flex items-center gap-1 text-xs">
                            <Clock className="w-3.5 h-3.5 text-[#6B3BF6]" />
                            <span>{c.scheduledDate} • {c.scheduledTime}</span>
                          </span>
                          {c.isToday && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[9px] font-extrabold border border-blue-200">
                              Today
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-600 font-medium flex items-center gap-2">
                          <span className="text-emerald-700 font-bold">Panel: {c.interviewerName}</span>
                          <span>•</span>
                          <span className="text-[#6B3BF6] font-bold">{c.meetingMode}</span>
                        </div>
                      </div>
                    </td>

                    {/* Column 4: Daily Outcome (Selected / Not Selected) & Stage */}
                    <td className="py-4 px-4" onClick={e => e.stopPropagation()}>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1">
                          <select
                            value={c.dailyOutcome}
                            onChange={e => updateDailyOutcome(c.id, e.target.value as DailyOutcome)}
                            className={`px-2.5 py-1 text-xs rounded-xl font-extrabold border cursor-pointer ${
                              c.dailyOutcome === 'Selected'
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                : c.dailyOutcome === 'Not Selected'
                                ? 'bg-rose-100 text-rose-900 border-rose-300'
                                : 'bg-amber-100 text-amber-900 border-amber-300'
                            }`}
                          >
                            <option value="Selected">🟢 Selected / Cleared</option>
                            <option value="Not Selected">🔴 Not Selected / Rejected</option>
                            <option value="Pending">🟡 Pending Outcome</option>
                          </select>
                        </div>

                        {c.dailyDecisionReason && (
                          <p className="text-[10px] text-slate-500 italic max-w-[190px] truncate" title={c.dailyDecisionReason}>
                            "{c.dailyDecisionReason}"
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Column 5: Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap space-x-2" onClick={e => e.stopPropagation()}>
                      {(role === 'admin' || role === 'lead') && (
                        <button
                          onClick={() => {
                            setReassignCandidate(c)
                            setTargetRecruiter(c.assignedRecruiter)
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold cursor-pointer text-xs"
                        >
                          Reassign
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedCandidate(c)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold cursor-pointer text-xs"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCandidate(c)
                          setIsNotesModalOpen(true)
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-[#6B3BF6] font-bold cursor-pointer inline-flex items-center gap-1 text-xs"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Notes ({c.notes.length})</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

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

      {/* CANDIDATE PROFILE & INTERVIEW DETAILS MODAL */}
      {selectedCandidate && !isNotesModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-5 border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#5B51D8] font-extrabold flex items-center justify-center text-lg border border-[#C7D2FE]">
                  {selectedCandidate.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">{selectedCandidate.name}</h3>
                  <p className="text-xs text-[#6B3BF6] font-bold">{selectedCandidate.role} • {selectedCandidate.experience}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCandidate(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xl cursor-pointer">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-extrabold text-xs border-b border-blue-200/60 pb-1.5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Client Information & POC</span>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Client Organization:</span>
                    <span className="font-extrabold text-slate-900">{selectedCandidate.clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Client POC:</span>
                    <span className="font-bold text-slate-900">{selectedCandidate.clientPOC}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">POC Contact:</span>
                    <span className="font-semibold text-blue-700">{selectedCandidate.pocContact}</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50/60 border border-purple-200/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs border-b border-purple-200/60 pb-1.5">
                  <Briefcase className="w-4 h-4 text-[#6B3BF6]" />
                  <span>Requirement Details</span>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Requirement ID:</span>
                    <span className="font-extrabold text-[#6B3BF6]">{selectedCandidate.reqId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Subject Title:</span>
                    <span className="font-bold text-slate-900 truncate max-w-[160px]" title={selectedCandidate.reqTitle}>
                      {selectedCandidate.reqTitle}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Date Received:</span>
                    <span className="font-semibold text-slate-800">{selectedCandidate.reqDate}</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs border-b border-emerald-200/60 pb-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Scheduled Session & Outcome</span>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Daily Outcome:</span>
                    <span className="font-extrabold text-emerald-800">{selectedCandidate.dailyOutcome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Scheduled Time:</span>
                    <span className="font-extrabold text-slate-900">{selectedCandidate.scheduledDate} • {selectedCandidate.scheduledTime}</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs border-b border-amber-200/60 pb-1.5">
                  <UserCheck className="w-4 h-4 text-amber-700" />
                  <span>Interviewer Panel & Mode</span>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Interviewer Panel:</span>
                    <span className="font-extrabold text-slate-900">{selectedCandidate.interviewerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Session Mode:</span>
                    <span className="font-extrabold text-[#6B3BF6]">{selectedCandidate.meetingMode}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
              <span className="font-bold text-slate-700 block">Evaluation Reason / Note:</span>
              <p className="text-slate-700 font-medium">"{selectedCandidate.dailyDecisionReason}"</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-slate-800 transition-all"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTES MODAL */}
      {selectedCandidate && isNotesModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#6B3BF6]" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Interview Notes — {selectedCandidate.name}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsNotesModalOpen(false)
                  setSelectedCandidate(null)
                }}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
              {selectedCandidate.notes.map((n, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                  "{n}"
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <textarea
                rows={3}
                value={newNoteText}
                onChange={e => setNewNoteText(e.target.value)}
                placeholder="Type new interview feedback or note..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsNotesModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 bg-[#6B3BF6] text-white text-xs font-bold rounded-xl cursor-pointer shadow-2xs"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REASSIGN CANDIDATE MODAL */}
      {reassignCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Reassign Candidate Recruiter</h3>
              <button onClick={() => setReassignCandidate(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Candidate Name</span>
                <p className="text-sm font-bold text-slate-900">{reassignCandidate.name}</p>
                <p className="text-xs text-slate-500">{reassignCandidate.role}</p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Select Target Recruiter</label>
                <select
                  value={targetRecruiter}
                  onChange={e => setTargetRecruiter(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
                >
                  {RECRUITERS.map(r => (
                    <option key={r} value={r}>
                      {r} {r === reassignCandidate.assignedRecruiter ? '(Current)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setReassignCandidate(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReassignRecruiter}
                className="px-4 py-2 bg-[#6B3BF6] text-white text-xs font-bold rounded-xl cursor-pointer shadow-2xs"
              >
                Save Reassignment
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
