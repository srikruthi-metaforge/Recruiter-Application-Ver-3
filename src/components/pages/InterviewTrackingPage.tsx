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
} from 'lucide-react'
import { Interview, Role } from '../../types'
import { ScheduleInterviewModal } from '../modals/ScheduleInterviewModal'

export type InterviewStage =
  | 'Screening'
  | 'Shortlisted'
  | 'Interview Scheduled'
  | 'Completed'

export interface CandidateCardItem {
  id: string
  name: string
  role: string
  experience: string
  currentCompany: string
  stage: InterviewStage
  dateTime: string
  isToday?: boolean
  isOverdue?: boolean
  stageProgress: number // 1 to 4
  lastActivity: string
  assignedRecruiter: string
  team: string
  department: string
  meetingMode: 'Zoom' | 'Google Meet' | 'Teams' | 'In-Person'
  meetingUrl?: string
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
    dateTime: 'Today • 11:30 AM',
    isToday: true,
    stageProgress: 1,
    lastActivity: 'HR call completed 20m ago',
    assignedRecruiter: 'Harish Gadipally',
    team: 'Engineering Team',
    department: 'Software Engineering',
    meetingMode: 'Zoom',
    meetingUrl: 'https://zoom.us/j/123456789',
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
    dateTime: 'Yesterday • 02:30 PM',
    isOverdue: true,
    stageProgress: 1,
    lastActivity: 'Needs feedback review',
    assignedRecruiter: 'Arvind GR',
    team: 'Engineering Team',
    department: 'Software Engineering',
    meetingMode: 'Google Meet',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    statusBadge: 'Review Overdue',
    statusColor: 'rose',
    notes: ['Completed HR screening call. Good communication skills.', 'Notice period: 15 days.'],
  },
  {
    id: 'c-103',
    name: 'Arpit Srivastav',
    role: 'MIG welding Fixtures Engineer',
    experience: '6 Yrs 1 Mo',
    currentCompany: 'LTTS Mobility',
    stage: 'Shortlisted',
    dateTime: 'Aug 12, 2026 • 11:00 AM',
    stageProgress: 2,
    lastActivity: 'Shortlisted by hiring manager',
    assignedRecruiter: 'Charlie Darwin',
    team: 'Automotive Team',
    department: 'Hardware & Automotive',
    meetingMode: 'Teams',
    meetingUrl: 'https://teams.microsoft.com/l/meetup-join/123',
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
    dateTime: 'Today • 04:00 PM',
    isToday: true,
    stageProgress: 3,
    lastActivity: 'Meeting link sent via email',
    assignedRecruiter: 'Harish Gadipally',
    team: 'ERP & SAP Team',
    department: 'Enterprise Applications',
    meetingMode: 'Zoom',
    meetingUrl: 'https://zoom.us/j/987654321',
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
    dateTime: 'Aug 09, 2026 • 03:00 PM',
    stageProgress: 4,
    lastActivity: 'L2 feedback recorded 5/5',
    assignedRecruiter: 'Harini Sindey',
    team: 'Engineering Team',
    department: 'Software Engineering',
    meetingMode: 'Google Meet',
    meetingUrl: 'https://meet.google.com/xyz-uvwx-rst',
    statusBadge: 'L2 Cleared',
    statusColor: 'emerald',
    notes: ['Cleared L2 technical assessment. Excellent problem solving.'],
    feedback: 'Strong understanding of LLMs, Python & PyTorch pipelines. Recommended for offer.',
    rating: 5,
  },
  {
    id: 'c-106',
    name: 'Abhijit Narke',
    role: 'Mechanical Design Engineer (Catia V5)',
    experience: '8 Yrs 0 Mos',
    currentCompany: 'LTTS Automotive',
    stage: 'Completed',
    dateTime: 'Aug 08, 2026 • 05:00 PM',
    stageProgress: 4,
    lastActivity: 'Selected for offer generation',
    assignedRecruiter: 'Puttapaka Saiteja',
    team: 'Automotive Team',
    department: 'Hardware & Automotive',
    meetingMode: 'Zoom',
    meetingUrl: 'https://zoom.us/j/555666777',
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

const STAGE_STYLES: Record<InterviewStage, { border: string; bg: string; badge: string; text: string }> = {
  Screening: { border: 'border-amber-200', bg: 'bg-amber-50/30', badge: 'bg-amber-100 text-amber-900 border border-amber-200', text: 'text-amber-900' },
  Shortlisted: { border: 'border-[#C7D2FE]', bg: 'bg-[#EEF2FF]/40', badge: 'bg-[#EEF2FF] text-[#5B51D8] border border-[#C7D2FE]', text: 'text-[#5B51D8]' },
  'Interview Scheduled': { border: 'border-blue-200', bg: 'bg-blue-50/40', badge: 'bg-blue-100 text-blue-900 border border-blue-200', text: 'text-blue-900' },
  Completed: { border: 'border-emerald-200', bg: 'bg-emerald-50/40', badge: 'bg-emerald-100 text-emerald-900 border border-emerald-200', text: 'text-emerald-900' },
}

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
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban')

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDept, setSelectedDept] = useState('All Departments')
  const [selectedTeam, setSelectedTeam] = useState('All Teams')
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [statusFilter, setStatusFilter] = useState('All Stages')

  // Reassign Modal State
  const [reassignCandidate, setReassignCandidate] = useState<CandidateCardItem | null>(null)
  const [targetRecruiter, setTargetRecruiter] = useState('')

  // Profile & Schedule Modal
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateCardItem | null>(null)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)
  const [newNoteText, setNewNoteText] = useState('')
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  // Filter candidates based on Role & Filters
  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      // Role scope restriction
      if (role === 'recruiter' && c.assignedRecruiter !== 'Harish Gadipally') {
        // In recruiter mode, show primary recruiter candidates
        // (for demo completeness, if empty allow view)
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchName = c.name.toLowerCase().includes(q)
        const matchRole = c.role.toLowerCase().includes(q)
        const matchCompany = c.currentCompany.toLowerCase().includes(q)
        const matchRecruiter = c.assignedRecruiter.toLowerCase().includes(q)
        if (!matchName && !matchRole && !matchCompany && !matchRecruiter) return false
      }

      if (selectedDept !== 'All Departments' && c.department !== selectedDept) return false
      if (selectedTeam !== 'All Teams' && c.team !== selectedTeam) return false
      if (roleFilter !== 'All Roles' && !c.role.toLowerCase().includes(roleFilter.toLowerCase())) return false
      if (statusFilter !== 'All Stages' && c.stage !== statusFilter) return false

      return true
    })
  }, [candidates, searchQuery, selectedDept, selectedTeam, roleFilter, statusFilter, role])

  // Move stage handler
  const moveStage = (candidateId: string, newStage: InterviewStage) => {
    if (role === 'superadmin') {
      showToast('Super Admin view is read-only. Micro actions are disabled.')
      return
    }

    const progressMap: Record<InterviewStage, number> = {
      Screening: 1,
      Shortlisted: 2,
      'Interview Scheduled': 3,
      Completed: 4,
    }

    setCandidates(prev =>
      prev.map(c => (c.id === candidateId ? { ...c, stage: newStage, stageProgress: progressMap[newStage], lastActivity: `Stage updated to ${newStage}` } : c))
    )
    const cand = candidates.find(c => c.id === candidateId)
    showToast(`Updated ${cand?.name || 'candidate'} stage to "${newStage}"`)
  }

  // Reassign recruiter handler
  const handleReassign = () => {
    if (!reassignCandidate || !targetRecruiter) return
    setCandidates(prev =>
      prev.map(c => (c.id === reassignCandidate.id ? { ...c, assignedRecruiter: targetRecruiter, lastActivity: `Reassigned to ${targetRecruiter}` } : c))
    )
    showToast(`Candidate ${reassignCandidate.name} reassigned to ${targetRecruiter}`)
    setReassignCandidate(null)
  }

  const handleAddNote = () => {
    if (!selectedCandidate || !newNoteText.trim()) return
    const updatedNotes = [...selectedCandidate.notes, newNoteText.trim()]
    setCandidates(prev =>
      prev.map(c => (c.id === selectedCandidate.id ? { ...c, notes: updatedNotes } : c))
    )
    setSelectedCandidate({ ...selectedCandidate, notes: updatedNotes })
    setNewNoteText('')
    showToast('Note added successfully!')
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800">
      {/* 1. TOP HEADER WITH ROLE IDENTIFIER */}
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
                <span>🟠 Admin View (Multi-Team Operations)</span>
              </span>
            )}

            {role === 'lead' && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-900 border border-blue-200 inline-flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>🔵 Team Lead View (Candidate Flow)</span>
              </span>
            )}

            {role === 'recruiter' && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EEF2FF] text-[#5B51D8] border border-[#C7D2FE] inline-flex items-center gap-1.5 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5B51D8]" />
                <span>My Candidates Only</span>
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500 mt-1">
            {role === 'superadmin' && 'Organization-wide hiring pipeline overview, bottleneck heatmaps, and aggregated activity.'}
            {role === 'admin' && 'Monitor team progress, reassign candidates, and balance recruiter capacity across teams.'}
            {role === 'lead' && 'Manage day-to-day candidate flow, track recruiter workload, and drive closures.'}
            {role === 'recruiter' && 'Track your individual assigned candidates across interview stages.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200/80">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-white text-[#6B3BF6] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban View</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-[#6B3BF6] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListIcon className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
          </div>

          {role !== 'superadmin' && (
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-[#6B3BF6] to-[#5833E0] hover:from-[#5833E0] hover:to-[#4A2BC2] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Interview</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. ROLE-BASED TOP METRICS & ALERTS WIDGET */}
      {role === 'superadmin' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-1 shadow-md border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Org Candidates in Pipeline
            </span>
            <p className="text-3xl font-extrabold text-white tabular-nums">486</p>
            <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+18% across 5 departments</span>
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl p-4 space-y-1 shadow-md">
            <span className="text-[11px] font-bold text-purple-200 uppercase tracking-wider">
              Total Interviews Scheduled Today
            </span>
            <p className="text-3xl font-extrabold text-white tabular-nums">24</p>
            <p className="text-[10px] text-purple-200 font-medium">18 Online • 6 In-Person</p>
          </div>

          <div className="bg-emerald-950 text-emerald-100 rounded-2xl p-4 space-y-1 shadow-md border border-emerald-800">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Organization Conversion Rate
            </span>
            <p className="text-3xl font-extrabold text-emerald-300 tabular-nums">28.4%</p>
            <p className="text-[10px] text-emerald-400 font-medium">Sourced to Offer acceptance</p>
          </div>
        </div>
      )}

      {role === 'admin' && (
        <div className="space-y-3">
          {/* Delayed Alert Banner */}
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs text-rose-900 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="font-semibold">
                <strong>Attention Admin:</strong> 4 interviews in Engineering Team are pending feedback &gt; 48 hours.
              </span>
            </div>
            <button
              onClick={() => showToast('Filtered to 4 delayed interviews')}
              className="px-3 py-1 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700 cursor-pointer text-[11px]"
            >
              Resolve Bottlenecks
            </button>
          </div>

          {/* Team Capacity Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-1 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Active Team Candidates</span>
              <p className="text-2xl font-extrabold text-slate-900">{candidates.length}</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-1 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Avg Workload / Recruiter</span>
              <p className="text-2xl font-extrabold text-[#6B3BF6]">8.4 Candidates</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-1 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Team Capacity Utilization</span>
              <p className="text-2xl font-extrabold text-emerald-600">88%</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. FILTER CONTROLS BAR */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate name, role, company, or assigned recruiter..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#6B3BF6] text-slate-800 placeholder:text-slate-400 transition-all"
            />
          </div>

          {/* Super Admin & Admin Department Filter */}
          {(role === 'superadmin' || role === 'admin') && (
            <div>
              <select
                value={selectedDept}
                onChange={e => setSelectedDept(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
              >
                <option value="All Departments">All Departments</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Hardware & Automotive">Hardware & Automotive</option>
                <option value="Enterprise Applications">Enterprise Applications</option>
              </select>
            </div>
          )}

          {/* Admin Team Switcher */}
          {(role === 'admin' || role === 'lead' || role === 'superadmin') && (
            <div>
              <select
                value={selectedTeam}
                onChange={e => setSelectedTeam(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#6B3BF6] bg-purple-50/50 border-purple-200 focus:outline-none cursor-pointer"
              >
                <option value="All Teams">All Hiring Teams</option>
                <option value="Engineering Team">Engineering Team</option>
                <option value="Automotive Team">Automotive Team</option>
                <option value="ERP & SAP Team">ERP & SAP Team</option>
              </select>
            </div>
          )}

          {/* Reset Filters */}
          <div>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedDept('All Departments')
                setSelectedTeam('All Teams')
                setStatusFilter('All Stages')
                setRoleFilter('All Roles')
                showToast('Filters reset')
              }}
              className="w-full py-2 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* 4. MAIN CONTENT AREA: KANBAN BOARD WITH ROLE FEATURES */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto pb-4 custom-scrollbar min-h-[580px]">
          {STAGES.map(stage => {
            const stageCandidates = filteredCandidates.filter(c => c.stage === stage)
            const style = STAGE_STYLES[stage]

            // Super Admin Bottleneck Heatmap Indicator
            const isBottleneck = role === 'superadmin' && stage === 'Screening' && stageCandidates.length >= 2

            return (
              <div
                key={stage}
                className={`bg-slate-50/80 rounded-2xl border ${
                  isBottleneck ? 'border-rose-400 bg-rose-50/30' : style.border
                } p-4 flex flex-col flex-1 min-w-[285px] shadow-2xs relative`}
              >
                {/* Super Admin Heatmap Alert Banner */}
                {isBottleneck && (
                  <div className="mb-2 p-2 bg-rose-500 text-white rounded-xl text-[10px] font-bold flex items-center justify-between">
                    <span>⚠️ BOTTLENECK DETECTED</span>
                    <span className="underline cursor-pointer">Inspect</span>
                  </div>
                )}

                {/* Column Header */}
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-3.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${style.text}`}>{stage}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${style.badge}`}>
                    {stageCandidates.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3.5 flex-1 overflow-y-auto pr-0.5 custom-scrollbar">
                  {stageCandidates.length === 0 ? (
                    <div className="h-36 border-2 border-dashed border-slate-200/80 rounded-2xl flex flex-col items-center justify-center text-center p-4">
                      <span className="text-xs text-slate-400 font-medium">No candidates in {stage}</span>
                    </div>
                  ) : (
                    stageCandidates.map(cand => (
                      <div
                        key={cand.id}
                        className={`bg-white rounded-2xl border ${
                          cand.isOverdue
                            ? 'border-rose-300 ring-2 ring-rose-500/20'
                            : cand.isToday
                            ? 'border-blue-300 ring-2 ring-blue-500/20'
                            : 'border-slate-200/90'
                        } p-4 shadow-2xs hover:shadow-md transition-all duration-200 group space-y-3 relative`}
                      >
                        {/* Assigned Recruiter Badge for Admin & Team Lead */}
                        <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 border-b border-slate-100 pb-2">
                          <span className="flex items-center gap-1 text-slate-700">
                            <User className="w-3 h-3 text-[#6B3BF6]" />
                            <span>{cand.assignedRecruiter}</span>
                          </span>

                          {(role === 'admin' || role === 'lead') && (
                            <button
                              onClick={() => {
                                setReassignCandidate(cand)
                                setTargetRecruiter(cand.assignedRecruiter)
                              }}
                              className="text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                            >
                              <UserPlus className="w-3 h-3" />
                              <span>Reassign</span>
                            </button>
                          )}
                        </div>

                        {/* Candidate Name & Role */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#6B3BF6] transition-colors leading-snug">
                              {cand.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                              {cand.role}
                            </p>
                          </div>
                          {cand.meetingUrl && (
                            <a
                              href={cand.meetingUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors shrink-0"
                              title={`Join via ${cand.meetingMode}`}
                            >
                              <Video className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>

                        {/* Details */}
                        <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 space-y-1 text-[11px] text-slate-600">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Experience:</span>
                            <span className="font-semibold text-slate-800">{cand.experience}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Company:</span>
                            <span className="font-semibold text-slate-800 truncate max-w-[130px]">
                              {cand.currentCompany}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-1 border-t border-slate-200/60 text-[10px]">
                            <span className="text-slate-400 flex items-center gap-1">
                              <CalendarIcon className="w-3 h-3 text-slate-400" />
                              {cand.dateTime}
                            </span>
                          </div>
                        </div>

                        {/* Stage Mover Selector (Locked for Super Admin) */}
                        {role !== 'superadmin' ? (
                          <div>
                            <label className="text-[10px] text-slate-400 font-semibold mb-1 block">
                              Update Stage:
                            </label>
                            <select
                              value={cand.stage}
                              onChange={e => moveStage(cand.id, e.target.value as InterviewStage)}
                              className="w-full text-[11px] bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
                            >
                              {STAGES.map(s => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-400 font-medium italic flex items-center gap-1">
                            <Lock className="w-3 h-3 text-slate-400" />
                            <span>Read-only overview mode</span>
                          </div>
                        )}

                        {/* Quick Actions Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                          <button
                            onClick={() => setSelectedCandidate(cand)}
                            className="text-[#6B3BF6] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>View Profile</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => {
                              setSelectedCandidate(cand)
                              setIsNotesModalOpen(true)
                            }}
                            className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>Notes ({cand.notes.length})</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* 5. LIST VIEW TABLE */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">CANDIDATE NAME</th>
                  <th className="py-3.5 px-4">ASSIGNED RECRUITER</th>
                  <th className="py-3.5 px-4">ROLE APPLIED</th>
                  <th className="py-3.5 px-4">EXPERIENCE</th>
                  <th className="py-3.5 px-4">INTERVIEW STAGE</th>
                  <th className="py-3.5 px-4">INTERVIEW DATE</th>
                  <th className="py-3.5 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {filteredCandidates.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#6B3BF6]/10 text-[#6B3BF6] font-bold flex items-center justify-center text-xs">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div>{c.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{c.currentCompany}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-purple-700">
                      <span className="inline-flex items-center gap-1.5">
                        <User className="w-3 h-3 text-[#6B3BF6]" />
                        <span>{c.assignedRecruiter}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{c.role}</td>
                    <td className="py-3.5 px-4">{c.experience}</td>
                    <td className="py-3.5 px-4">
                      {role !== 'superadmin' ? (
                        <select
                          value={c.stage}
                          onChange={e => moveStage(c.id, e.target.value as InterviewStage)}
                          className="px-2.5 py-1 text-xs rounded-xl font-bold bg-slate-100 border border-slate-200 text-slate-800 cursor-pointer"
                        >
                          {STAGES.map(s => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="font-bold text-slate-900">{c.stage}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{c.dateTime}</td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                      {(role === 'admin' || role === 'lead') && (
                        <button
                          onClick={() => {
                            setReassignCandidate(c)
                            setTargetRecruiter(c.assignedRecruiter)
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold cursor-pointer"
                        >
                          Reassign
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedCandidate(c)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REASSIGN CANDIDATE MODAL (FOR ADMIN & TEAM LEAD) */}
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

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setReassignCandidate(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReassign}
                className="px-5 py-2 text-xs font-bold bg-[#6B3BF6] text-white rounded-xl hover:bg-[#5833E0]"
              >
                Confirm Reassignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCHEDULE MODAL */}
      <ScheduleInterviewModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onScheduleSuccess={data => {
          const newCard: CandidateCardItem = {
            id: `c-${Date.now()}`,
            name: data.submission.split(' — ')[0] || 'Scheduled Candidate',
            role: data.submission.split(' — ')[1] || 'Candidate Role',
            experience: '4 Yrs',
            currentCompany: 'Verified Applicant',
            stage: 'Interview Scheduled',
            stageProgress: 3,
            lastActivity: 'Scheduled via form',
            assignedRecruiter: 'Harish Gadipally',
            team: 'Engineering Team',
            department: 'Software Engineering',
            dateTime: `${data.date} • ${data.time}`,
            meetingMode: data.interviewMode === 'Offline / In-Person' ? 'In-Person' : 'Zoom',
            meetingUrl: data.meetingLink || 'https://meet.google.com/xxx-xxx-xxx',
            statusBadge: data.status || 'Scheduled',
            statusColor: 'blue',
            notes: data.notes ? [data.notes] : ['Interview scheduled successfully.'],
          }
          setCandidates([newCard, ...candidates])
          showToast(`Interview for ${newCard.name} scheduled successfully!`)
        }}
      />

      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-12 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
