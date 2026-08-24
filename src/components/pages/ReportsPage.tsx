import React, { useState, useMemo } from 'react'
import {
  FileText,
  Search,
  ChevronDown,
  Target,
  Users,
  BarChart3,
  Briefcase,
  UserCheck,
  Building2,
  Trophy,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  X,
  XCircle,
  TrendingUp,
  Clock,
  Send,
  MessageSquare,
  Award,
  Calendar,
  Filter,
  Activity,
  ArrowUpRight,
  PieChart,
  User,
  ShieldCheck,
  Zap,
  Sparkles,
  AlertCircle,
  ArrowRight,
  MessageCircle,
  ArrowLeft,
  PieChart as PieIcon,
  Layers,
  Crown,
  Plus,
} from 'lucide-react'
import { Role } from '../../types'
import { PaginationFooter } from '../ui/PaginationFooter'
import { RecruiterPerformanceChart } from '../ui/RecruiterPerformanceChart'
import { RequirementCoverageChart } from '../ui/RequirementCoverageChart'
import { MonthlyTimelinePerformanceChart } from '../ui/MonthlyTimelinePerformanceChart'
import { StagePipelinePerformanceChart } from '../ui/StagePipelinePerformanceChart'
import { ClientPOCSubmissionChart } from '../ui/ClientPOCSubmissionChart'
import { DomainWiseSubmissionChart } from '../ui/DomainWiseSubmissionChart'
import {
  RecruiterDetailAnalyticsPage,
  RecruiterDetailData,
} from './RecruiterDetailAnalyticsPage'
import {
  ClientDetailAnalyticsPage,
  ClientPerformanceData,
} from './ClientDetailAnalyticsPage'
import { ClientWiseTeamPerformanceChart } from '../ui/ClientWiseTeamPerformanceChart'

interface ClientSubmissionInfo {
  client: string
  submissions: number
}

interface SubmittedClientsPillCellProps {
  clients: string[]
}

function SubmittedClientsPillCell({ clients }: SubmittedClientsPillCellProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!clients || clients.length === 0) {
    return <span className="text-slate-400 font-medium">—</span>
  }

  const primaryClient = clients[0]
  const remainingCount = clients.length - 1

  return (
    <div className="relative inline-flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
      {/* Primary Client Pill Badge */}
      <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-extrabold bg-[#EEF2FF] text-[#5B51D8] border border-[#C7D2FE] shadow-2xs">
        {primaryClient}
      </span>

      {/* Counter Pill (+N more) */}
      {remainingCount > 0 && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-extrabold bg-purple-100/90 hover:bg-purple-200 text-[#6B3BF6] border border-purple-200 transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <span>+{remainingCount} more</span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Popover Dropdown Card */}
          {isOpen && (
            <div className="absolute left-0 top-full mt-1.5 z-40 w-52 bg-white border border-slate-200 rounded-2xl p-3 shadow-xl animate-in fade-in zoom-in-95 duration-100">
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1.5 flex items-center justify-between">
                <span>Submitted Clients ({clients.length})</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-0.5">
                {clients.map((client, idx) => (
                  <div
                    key={idx}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-50 hover:bg-purple-50 hover:text-[#6B3BF6] transition-colors flex items-center gap-2 border border-slate-100"
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#6B3BF6] shrink-0" />
                    <span className="truncate">{client}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export interface RecruiterReqDashboardItem {
  id: string
  recruiterName: string
  recruiterRole?: string
  teamLead?: string // Team Lead under whom this recruiter works
  reqId: string
  jobTitle: string
  positions: number
  clientName: string
  submissionsCount: number
  timestamp: string // Latest Activity / Submission Timestamp (Date and Time)
  receivedTime: string // Time & Date requirement was received (displayed under Job Title)
  firstSubmissionTime: string // First Submission Date and Time for this req ID
  tat: string // TAT (Turnaround Time) calculated between receivedTime and firstSubmissionTime
  status: 'In Progress' | 'Target Achieved' | 'Active Sourcing' | 'Submissions Completed'
}

export function calculateTAT(receivedTime?: string, firstSubmissionTime?: string): string {
  if (!receivedTime || !firstSubmissionTime) return '3h 30m'
  try {
    const d1 = new Date(receivedTime)
    const d2 = new Date(firstSubmissionTime)
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return '3h 30m'
    const diffMs = Math.max(0, d2.getTime() - d1.getTime())
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    if (diffHrs >= 24) {
      const days = Math.floor(diffHrs / 24)
      const remHrs = diffHrs % 24
      return `${days}d ${remHrs}h`
    }
    return `${diffHrs}h ${diffMins}m`
  } catch {
    return '3h 30m'
  }
}

const RECRUITER_REQ_SUBMISSION_DASHBOARD_DATA: RecruiterReqDashboardItem[] = [
  {
    id: 'dash-01',
    recruiterName: 'Harish Gadipally',
    recruiterRole: 'Team Lead / Senior Recruiter',
    teamLead: 'Harish Gadipally',
    reqId: 'REQ-2026-08-12-001',
    jobTitle: 'TPC - Requirement - C# Automation - Embedded',
    positions: 5,
    clientName: 'LTTS / L&T',
    submissionsCount: 14,
    timestamp: '21 Aug 2026, 10:15 AM',
    receivedTime: '12 Aug 2026, 05:30 AM',
    firstSubmissionTime: '12 Aug 2026, 09:30 AM',
    tat: '4h 00m',
    status: 'In Progress',
  },
  {
    id: 'dash-02',
    recruiterName: 'Harish Gadipally',
    recruiterRole: 'Team Lead / Senior Recruiter',
    teamLead: 'Harish Gadipally',
    reqId: 'REQ-2026-08-12-003',
    jobTitle: 'Senior React / Fullstack Architect',
    positions: 3,
    clientName: 'Accenture Enterprise',
    submissionsCount: 18,
    timestamp: '20 Aug 2026, 04:45 PM',
    receivedTime: '13 Aug 2026, 08:00 AM',
    firstSubmissionTime: '13 Aug 2026, 11:15 AM',
    tat: '3h 15m',
    status: 'Target Achieved',
  },
  {
    id: 'dash-03',
    recruiterName: 'Marcus Chen',
    recruiterRole: 'Senior Technical Recruiter',
    teamLead: 'Harish Gadipally',
    reqId: 'REQ-701',
    jobTitle: 'Lead Java Full Stack Developer',
    positions: 8,
    clientName: 'Accenture Enterprise',
    submissionsCount: 24,
    timestamp: '21 Aug 2026, 09:50 AM',
    receivedTime: '10 Aug 2026, 07:00 AM',
    firstSubmissionTime: '10 Aug 2026, 10:00 AM',
    tat: '3h 00m',
    status: 'In Progress',
  },
  {
    id: 'dash-04',
    recruiterName: 'Marcus Chen',
    recruiterRole: 'Senior Technical Recruiter',
    teamLead: 'Harish Gadipally',
    reqId: 'REQ-702',
    jobTitle: 'Senior React Native Mobile Dev',
    positions: 4,
    clientName: 'Accenture Enterprise',
    submissionsCount: 24,
    timestamp: '19 Aug 2026, 03:20 PM',
    receivedTime: '11 Aug 2026, 09:15 AM',
    firstSubmissionTime: '11 Aug 2026, 02:45 PM',
    tat: '5h 30m',
    status: 'Target Achieved',
  },
  {
    id: 'dash-05',
    recruiterName: 'Priya Sharma',
    recruiterRole: 'IT Recruiter',
    teamLead: 'Harish Gadipally',
    reqId: 'REQ-2026-08-06-005',
    jobTitle: 'Java Cloud Architect',
    positions: 6,
    clientName: 'Goldman Sachs',
    submissionsCount: 18,
    timestamp: '20 Aug 2026, 06:10 PM',
    receivedTime: '07 Aug 2026, 09:00 AM',
    firstSubmissionTime: '07 Aug 2026, 01:20 PM',
    tat: '4h 20m',
    status: 'In Progress',
  },
  {
    id: 'dash-06',
    recruiterName: 'Lakshmi V',
    recruiterRole: 'Lead Technical Recruiter',
    teamLead: 'Tom Walsh',
    reqId: 'REQ-2026-08-07-006',
    jobTitle: 'Automotive Embedded Systems Engineer',
    positions: 10,
    clientName: 'Tesla Mobility',
    submissionsCount: 22,
    timestamp: '21 Aug 2026, 08:30 AM',
    receivedTime: '08 Aug 2026, 08:30 AM',
    firstSubmissionTime: '08 Aug 2026, 10:45 AM',
    tat: '2h 15m',
    status: 'In Progress',
  },
  {
    id: 'dash-07',
    recruiterName: 'Suresh Kulkarni',
    recruiterRole: 'ERP Technical Recruiter',
    teamLead: 'Harish Gadipally',
    reqId: 'REQ-2026-08-12-004',
    jobTitle: 'PLM / PDM Lead Engineer',
    positions: 4,
    clientName: 'Accenture',
    submissionsCount: 18,
    timestamp: '19 Aug 2026, 05:00 PM',
    receivedTime: '14 Aug 2026, 06:45 AM',
    firstSubmissionTime: '14 Aug 2026, 12:00 PM',
    tat: '5h 15m',
    status: 'In Progress',
  },
  {
    id: 'dash-08',
    recruiterName: 'Lingoji Pavani',
    recruiterRole: 'Technical Sourcing Lead',
    teamLead: 'Tom Walsh',
    reqId: 'REQ-2026-06-08-001',
    jobTitle: '.NET Core Backend Architect',
    positions: 2,
    clientName: 'LTTS Mobility',
    submissionsCount: 12,
    timestamp: '18 Aug 2026, 02:15 PM',
    receivedTime: '09 Aug 2026, 08:00 AM',
    firstSubmissionTime: '09 Aug 2026, 11:30 AM',
    tat: '3h 30m',
    status: 'Submissions Completed',
  },
  {
    id: 'dash-09',
    recruiterName: 'rahimoon Shaik',
    recruiterRole: 'Automotive Sourcing Specialist',
    teamLead: 'Tom Walsh',
    reqId: 'REQ-2026-08-07-007',
    jobTitle: 'BIW Sheet Metal Product Design Lead',
    positions: 5,
    clientName: 'Continental Automotive',
    submissionsCount: 15,
    timestamp: '20 Aug 2026, 01:40 PM',
    receivedTime: '10 Aug 2026, 11:00 AM',
    firstSubmissionTime: '10 Aug 2026, 04:10 PM',
    tat: '5h 10m',
    status: 'In Progress',
  },
  {
    id: 'dash-10',
    recruiterName: 'Harini Sindey',
    recruiterRole: 'Enterprise Systems Specialist',
    teamLead: 'Tom Walsh',
    reqId: 'REQ-2026-07-20-009',
    jobTitle: 'SAP MM + Ariba Functional Lead',
    positions: 3,
    clientName: 'ITC Infotech',
    submissionsCount: 18,
    timestamp: '21 Aug 2026, 09:15 AM',
    receivedTime: '21 Jul 2026, 07:30 AM',
    firstSubmissionTime: '21 Jul 2026, 10:00 AM',
    tat: '2h 30m',
    status: 'Target Achieved',
  },
  {
    id: 'dash-11',
    recruiterName: 'Marcus Chen',
    recruiterRole: 'Senior Technical Recruiter',
    teamLead: 'Harish Gadipally',
    reqId: 'REQ-2026-08-04-002',
    jobTitle: 'DevOps / Kubernetes Cloud Engineer',
    positions: 5,
    clientName: 'Goldman Sachs',
    submissionsCount: 16,
    timestamp: '21 Aug 2026, 11:30 AM',
    receivedTime: '05 Aug 2026, 10:00 AM',
    firstSubmissionTime: '05 Aug 2026, 02:15 PM',
    tat: '4h 15m',
    status: 'In Progress',
  },
  {
    id: 'dash-12',
    recruiterName: 'Marcus Chen',
    recruiterRole: 'Senior Technical Recruiter',
    teamLead: 'Harish Gadipally',
    reqId: 'REQ-2026-08-01-010',
    jobTitle: 'Cybersecurity Threat Analyst',
    positions: 2,
    clientName: 'Tesla Mobility',
    submissionsCount: 9,
    timestamp: '18 Aug 2026, 05:10 PM',
    receivedTime: '02 Aug 2026, 07:00 AM',
    firstSubmissionTime: '02 Aug 2026, 09:00 AM',
    tat: '2h 00m',
    status: 'Submissions Completed',
  },
  {
    id: 'dash-13',
    recruiterName: 'Marcus Chen',
    recruiterRole: 'Senior Technical Recruiter',
    teamLead: 'Harish Gadipally',
    reqId: 'REQ-703',
    jobTitle: 'Senior Staff AI / ML Engineer',
    positions: 4,
    clientName: 'Accenture Enterprise',
    submissionsCount: 15,
    timestamp: '20 Aug 2026, 03:45 PM',
    receivedTime: '15 Aug 2026, 08:30 AM',
    firstSubmissionTime: '15 Aug 2026, 10:30 AM',
    tat: '2h 00m',
    status: 'In Progress',
  },
  {
    id: 'dash-14',
    recruiterName: 'Marcus Chen',
    recruiterRole: 'Senior Technical Recruiter',
    teamLead: 'Harish Gadipally',
    reqId: 'REQ-704',
    jobTitle: 'Principal Distributed Systems Engineer',
    positions: 3,
    clientName: 'Goldman Sachs',
    submissionsCount: 12,
    timestamp: '15 Aug 2026, 11:20 AM',
    receivedTime: '10 Aug 2026, 06:00 AM',
    firstSubmissionTime: '10 Aug 2026, 09:15 AM',
    tat: '3h 15m',
    status: 'Target Achieved',
  },
  {
    id: 'dash-15',
    recruiterName: 'Marcus Chen',
    recruiterRole: 'Senior Technical Recruiter',
    teamLead: 'Harish Gadipally',
    reqId: 'REQ-705',
    jobTitle: 'Lead Data Platform Architect',
    positions: 6,
    clientName: 'Tesla Mobility',
    submissionsCount: 20,
    timestamp: '25 Jul 2026, 04:00 PM',
    receivedTime: '20 Jul 2026, 08:00 AM',
    firstSubmissionTime: '20 Jul 2026, 11:00 AM',
    tat: '3h 00m',
    status: 'Submissions Completed',
  },
]

interface ReportsPageProps {
  role?: Role
}

export function ReportsPage({ role = 'recruiter' }: ReportsPageProps) {
  const [activeReportView, setActiveReportView] = useState<'self' | 'charts' | 'team'>(() => {
    return role === 'recruiter' ? 'self' : 'team'
  })

  const [activeSubTab, setActiveSubTab] = useState<'recruiter' | 'client' | 'dashboard' | 'client_graphs'>('recruiter')
  const [dashSearchQuery, setDashSearchQuery] = useState('')
  const [dashRecruiterFilter, setDashRecruiterFilter] = useState('All Recruiters')
  const [dashClientFilter, setDashClientFilter] = useState('All Clients')
  const [dashDateFilter, setDashDateFilter] = useState<'today' | 'yesterday' | '7_days' | '1_month' | 'all'>('today')

  // Dashboard 1: Team Lead Individual Dashboard State
  const [dash1SearchQuery, setDash1SearchQuery] = useState('')
  const [dash1ClientFilter, setDash1ClientFilter] = useState('All Clients')
  const [dash1DateFilter, setDash1DateFilter] = useState<'today' | 'yesterday' | '7_days' | '1_month' | 'all'>('today')
  const [dash1Page, setDash1Page] = useState(1)

  // Dashboard 2: Overall Team Recruiters Dashboard State (Excludes Lead Individual Data)
  const [dash2SearchQuery, setDash2SearchQuery] = useState('')
  const [dash2RecruiterFilter, setDash2RecruiterFilter] = useState('All Recruiters')
  const [dash2ClientFilter, setDash2ClientFilter] = useState('All Clients')
  const [dash2DateFilter, setDash2DateFilter] = useState<'today' | 'yesterday' | '7_days' | '1_month' | 'all'>('today')
  const [dash2Page, setDash2Page] = useState(1)

  // Team Lead Module Dashboard Toggle: 'team_members' (Team Members Submissions - Mates) | 'individual' (Team Lead Individual Submissions)
  const [leadDashboardTab, setLeadDashboardTab] = useState<'individual' | 'team_members'>('team_members')

  // Active Graph sub-tab toggle for Analysis view: 'assigned_breakdown' | 'monthly_timeline' | 'stage_pipeline'
  const [activeGraphFilter, setActiveGraphFilter] = useState<
    'assigned_breakdown' | 'monthly_timeline' | 'stage_pipeline'
  >('assigned_breakdown')

  // Toggle mode for Assigned REQs Breakdown: 'individual' (Lead Individual Performance) vs 'team' (Team Members Comparison)
  const [assignedBreakdownToggle, setAssignedBreakdownToggle] = useState<'individual' | 'team'>('individual')

  // Dashboard Table 10-item Pagination State
  const [dashPage, setDashPage] = useState(1)
  const dashPageSize = 10
  const [dateRange, setDateRange] = useState('30_days')
  const [selectedDept, setSelectedDept] = useState('All Departments')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [clientFilter, setClientFilter] = useState('All Clients')

  // Recruiter personal tab filter
  const [personalTab, setPersonalTab] = useState<'worked' | 'non_worked'>('worked')

  // Pagination for recruiters performance table
  const [recruiterPage, setRecruiterPage] = useState(1)
  const [recruiterPageSize, setRecruiterPageSize] = useState(10)

  // Selected recruiter & client for detailed drill-down pages (Admin only)
  const [selectedRecruiter, setSelectedRecruiter] = useState<RecruiterDetailData | null>(null)
  const [selectedClient, setSelectedClient] = useState<ClientPerformanceData | null>(null)

  // Reason note modal state for recruiter
  const [reasonModalReq, setReasonModalReq] = useState<{ id: string; title: string; note?: string } | null>(null)
  const [reasonNoteText, setReasonNoteText] = useState('')

  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  // Active Logged-In Recruiter Personal Profile Data (or Team Lead Individual Profile Data)
  const [myPersonalProfile, setMyPersonalProfile] = useState<RecruiterDetailData>(() => {
    if (role === 'lead') {
      return {
        id: 'rec-lead-0',
        name: 'Harish Gadipally',
        role: 'Team Lead',
        team: 'Engineering Pod',
        avatar: 'H',
        requirementsCount: 45,
        workedReqs: 38,
        nonWorkedReqs: 7,
        submissionsCount: 142,
        shortlistedCount: 48,
        noSubmissionsCount: 12,
        interviewsCount: 36,
        hiresCount: 11,
        conversionRate: '22.9%',
        dailyTaskStatus: 'Done (5/5)',
        weeklyProgress: '22 / 25',
        weeklyProgressPct: 88,
        status: 'On Track',
        requirementsList: [
          { id: 'REQ-2026-08-12-001', title: 'TPC - Requirement - C# Automation - Embedded', client: 'LTTS / L&T', status: 'Worked', submissions: 14, interviews: 4, positions: 5 },
          { id: 'REQ-2026-08-12-003', title: 'Senior React / Fullstack Architect', client: 'Accenture Enterprise', status: 'Worked', submissions: 18, interviews: 5, positions: 4 },
          { id: 'REQ-701', title: 'Lead Java Full Stack Developer', client: 'Accenture', status: 'Worked', submissions: 42, interviews: 12, positions: 10 },
          { id: 'REQ-702', title: 'Senior React Native Mobile Dev', client: 'LTTS Automotive', status: 'Worked', submissions: 36, interviews: 10, positions: 8 },
          { id: 'REQ-703', title: 'Cloud Solutions Architect', client: 'Infosys', status: 'Worked', submissions: 28, interviews: 8, positions: 6 },
          { id: 'REQ-704', title: 'Cyber Security Analyst', client: 'HCL Technologies', status: 'Non-Worked', submissions: 0, interviews: 0, positions: 3, reasonNote: 'Low CTC budget approval from client' },
          { id: 'REQ-705', title: 'Lead Data Platform Architect', client: 'Tesla Mobility', status: 'Non-Worked', submissions: 0, interviews: 0, positions: 4, reasonNote: 'Priority shifted to urgent LTTS REQ' },
        ],
      }
    }
    return {
      id: 'rec-m1',
      name: 'Marcus Chen',
      role: 'Senior Technical Recruiter',
      team: 'Engineering Pod',
      avatar: 'M',
      requirementsCount: 14,
      workedReqs: 12,
      nonWorkedReqs: 2,
      submissionsCount: 48,
      shortlistedCount: 18,
      noSubmissionsCount: 3,
      interviewsCount: 12,
      hiresCount: 4,
      conversionRate: '25.0%',
      dailyTaskStatus: 'Done (5/5)',
      weeklyProgress: '20 / 25',
      weeklyProgressPct: 80,
      status: 'On Track',
      requirementsList: [
        { id: 'REQ-701', title: 'Lead Java Full Stack Developer', client: 'Accenture', status: 'Worked', submissions: 24, interviews: 8, positions: 8 },
        { id: 'REQ-702', title: 'Senior React Native Mobile Dev', client: 'Accenture', status: 'Worked', submissions: 24, interviews: 4, positions: 6 },
        { id: 'REQ-704', title: 'AI Data Engineer', client: 'Metaforge IT', status: 'Non-Worked', submissions: 0, interviews: 0, positions: 4, reasonNote: 'Awaiting client technical specification updates' },
      ],
    }
  })

  // Super Admin KPI Data
  const superAdminKPIs = {
    totalHires: 124,
    totalSourced: 1480,
    offerAcceptanceRate: '89.2%',
    avgTimeToHire: '16 Days',
    overallConversion: '26.4%',
  }

  // Client Performance Data Matching Reference Screenshot
  const clientPerformanceList: ClientPerformanceData[] = [
    {
      id: 'cli-1',
      clientName: 'METAFORGE (INTERNAL)',
      reqSent: 49,
      reqAssigned: 3,
      submissions: 6,
      subRatio: 0.12,
      openReqs: 49,
      closedReqs: 0,
      activeRecruiters: 2,
      requirementsList: [
        { id: 'REQ-M01', title: 'Internal Operations Associate', assignedRecruiter: 'lakshmi.v Recruiter', submissions: 4, status: 'In Progress', createdDate: '01 Aug 2026' },
        { id: 'REQ-M02', title: 'Talent Acquisition Coordinator', assignedRecruiter: 'Suresh kulkarni', submissions: 2, status: 'Open', createdDate: '05 Aug 2026' },
      ],
    },
    {
      id: 'cli-2',
      clientName: 'OTHER',
      reqSent: 104,
      reqAssigned: 6,
      submissions: 7,
      subRatio: 0.07,
      openReqs: 104,
      closedReqs: 0,
      activeRecruiters: 3,
      requirementsList: [
        { id: 'REQ-O01', title: 'Generic Sourcing Request', assignedRecruiter: 'Harini Sindey', submissions: 4, status: 'Open', createdDate: '28 Jul 2026' },
        { id: 'REQ-O02', title: 'Technical Consultant', assignedRecruiter: 'rahimoon Shaik', submissions: 3, status: 'In Progress', createdDate: '02 Aug 2026' },
      ],
    },
    {
      id: 'cli-3',
      clientName: 'OTHER COMPANY / SOURCE',
      reqSent: 31,
      reqAssigned: 1,
      submissions: 1,
      subRatio: 0.03,
      openReqs: 31,
      closedReqs: 0,
      activeRecruiters: 1,
      requirementsList: [
        { id: 'REQ-OCS01', title: 'External Partner Developer', assignedRecruiter: 'Charlie Darwin', submissions: 1, status: 'Open', createdDate: '04 Aug 2026' },
      ],
    },
    {
      id: 'cli-4',
      clientName: 'LTTS',
      reqSent: 204,
      reqAssigned: 105,
      submissions: 291,
      subRatio: 1.43,
      openReqs: 203,
      closedReqs: 1,
      activeRecruiters: 6,
      requirementsList: [
        { id: 'REQ-L01', title: 'Senior Java Full Stack Lead', assignedRecruiter: 'Harish Gadipally', submissions: 42, status: 'Closed', createdDate: '12 Jul 2026' },
        { id: 'REQ-L02', title: 'AUTOSAR Software Architect', assignedRecruiter: 'rahimoon Shaik', submissions: 22, status: 'In Progress', createdDate: '20 Jul 2026' },
        { id: 'REQ-L03', title: 'Catia V5 Mechanical Engineer', assignedRecruiter: 'Lingoji Pavani', submissions: 14, status: 'In Progress', createdDate: '01 Aug 2026' },
      ],
    },
    {
      id: 'cli-5',
      clientName: 'ITC',
      reqSent: 69,
      reqAssigned: 21,
      submissions: 28,
      subRatio: 0.41,
      openReqs: 69,
      closedReqs: 0,
      activeRecruiters: 3,
      requirementsList: [
        { id: 'REQ-I01', title: 'SAP MM Functional Lead', assignedRecruiter: 'Suresh kulkarni', submissions: 18, status: 'In Progress', createdDate: '25 Jul 2026' },
        { id: 'REQ-I02', title: 'FICO Module Consultant', assignedRecruiter: 'Lingoji Pavani', submissions: 10, status: 'Open', createdDate: '03 Aug 2026' },
      ],
    },
    {
      id: 'cli-6',
      clientName: 'KPMG',
      reqSent: 41,
      reqAssigned: 9,
      submissions: 10,
      subRatio: 0.24,
      openReqs: 41,
      closedReqs: 0,
      activeRecruiters: 2,
      requirementsList: [
        { id: 'REQ-K01', title: 'Cyber Risk Advisory Lead', assignedRecruiter: 'Arvind GR', submissions: 6, status: 'In Progress', createdDate: '30 Jul 2026' },
        { id: 'REQ-K02', title: 'Financial Audit Analyst', assignedRecruiter: 'Harini Sindey', submissions: 4, status: 'Open', createdDate: '06 Aug 2026' },
      ],
    },
    {
      id: 'cli-7',
      clientName: 'DELOITTE',
      reqSent: 1,
      reqAssigned: 1,
      submissions: 3,
      subRatio: 3.00,
      openReqs: 1,
      closedReqs: 0,
      activeRecruiters: 1,
      requirementsList: [
        { id: 'REQ-D01', title: 'Cloud Transformation Manager', assignedRecruiter: 'lakshmi.v Recruiter', submissions: 3, status: 'In Progress', createdDate: '02 Aug 2026' },
      ],
    },
    {
      id: 'cli-8',
      clientName: 'METAFORGE',
      reqSent: 1,
      reqAssigned: 1,
      submissions: 4,
      subRatio: 4.00,
      openReqs: 1,
      closedReqs: 0,
      activeRecruiters: 1,
      requirementsList: [
        { id: 'REQ-MF01', title: 'Core Engine Platform Architect', assignedRecruiter: 'Harish Gadipally', submissions: 4, status: 'In Progress', createdDate: '07 Aug 2026' },
      ],
    },
  ]

  // All Recruiters & Team Lead Performance List — Ordered by Team Lead first, followed by Team Members under each Lead
  const recruitersPerformanceList: RecruiterDetailData[] = [
    // =========================================================================
    // 👑 TEAM 1: HARISH GADIPALLY (TEAM LEAD) & HIS TEAM MEMBERS
    // =========================================================================
    {
      id: 'rec-lead-0',
      name: 'Harish Gadipally (Team Lead)',
      role: 'Team Lead',
      teamLead: 'Harish Gadipally',
      primaryClient: 'Accenture',
      team: 'Engineering Pod',
      avatar: 'H',
      requirementsCount: 45,
      workedReqs: 38,
      nonWorkedReqs: 7,
      submissionsCount: 142,
      shortlistedCount: 48,
      noSubmissionsCount: 12,
      interviewsCount: 36,
      hiresCount: 11,
      conversionRate: '22.9%',
      dailyTaskStatus: 'Done (5/5)',
      weeklyProgress: '22 / 25',
      weeklyProgressPct: 88,
      status: 'On Track',
      requirementsList: [
        { id: 'REQ-701', title: 'Lead Java Full Stack Developer', client: 'Accenture', status: 'Worked', submissions: 42, interviews: 12 },
        { id: 'REQ-702', title: 'Senior React Native Mobile Dev', client: 'LTTS Automotive', status: 'Worked', submissions: 36, interviews: 10 },
        { id: 'REQ-703', title: 'Cloud Solutions Architect', client: 'Infosys', status: 'Worked', submissions: 28, interviews: 8 },
        { id: 'REQ-704', title: 'Cyber Security Analyst', client: 'HCL Technologies', status: 'Non-Worked', submissions: 0, interviews: 0 },
      ],
    },
    {
      id: 'rec-m1',
      name: 'Marcus Chen',
      role: 'Senior Technical Recruiter',
      teamLead: 'Harish Gadipally',
      primaryClient: 'Accenture',
      team: 'Engineering Pod',
      avatar: 'M',
      requirementsCount: 14,
      workedReqs: 12,
      nonWorkedReqs: 2,
      submissionsCount: 48,
      shortlistedCount: 18,
      noSubmissionsCount: 3,
      interviewsCount: 12,
      hiresCount: 4,
      conversionRate: '25.0%',
      dailyTaskStatus: 'Done (5/5)',
      weeklyProgress: '20 / 25',
      weeklyProgressPct: 80,
      status: 'On Track',
      requirementsList: [
        { id: 'REQ-701', title: 'Lead Java Full Stack Developer', client: 'Accenture', status: 'Worked', submissions: 24, interviews: 8 },
        { id: 'REQ-702', title: 'Senior React Native Mobile Dev', client: 'Accenture', status: 'Worked', submissions: 24, interviews: 4 },
      ],
    },
    {
      id: 'rec-p1',
      name: 'Priya Sharma',
      role: 'IT Recruiter',
      teamLead: 'Harish Gadipally',
      primaryClient: 'Accenture',
      team: 'Engineering Pod',
      avatar: 'P',
      requirementsCount: 12,
      workedReqs: 10,
      nonWorkedReqs: 2,
      submissionsCount: 36,
      shortlistedCount: 14,
      noSubmissionsCount: 2,
      interviewsCount: 9,
      hiresCount: 3,
      conversionRate: '21.4%',
      dailyTaskStatus: 'Done (4/5)',
      weeklyProgress: '18 / 25',
      weeklyProgressPct: 72,
      status: 'On Track',
      requirementsList: [
        { id: 'REQ-701', title: 'Lead Java Full Stack Developer', client: 'Accenture', status: 'Worked', submissions: 18, interviews: 5 },
        { id: 'REQ-703', title: 'Cloud Solutions Architect', client: 'Accenture', status: 'Worked', submissions: 18, interviews: 4 },
      ],
    },
    {
      id: 'rec-4',
      name: 'Suresh Kulkarni',
      role: 'ERP Technical Recruiter',
      teamLead: 'Harish Gadipally',
      primaryClient: 'Accenture',
      team: 'Engineering Pod',
      avatar: 'S',
      requirementsCount: 27,
      workedReqs: 19,
      nonWorkedReqs: 8,
      submissionsCount: 46,
      shortlistedCount: 16,
      noSubmissionsCount: 9,
      interviewsCount: 5,
      hiresCount: 4,
      conversionRate: '18.5%',
      dailyTaskStatus: 'In progress (2/5) - 3 to go',
      weeklyProgress: '12 / 25',
      weeklyProgressPct: 48,
      status: 'On Track',
      requirementsList: [
        { id: 'REQ-401', title: 'PLM / PDM Engineer', client: 'Accenture', status: 'Worked', submissions: 18, interviews: 3 },
        { id: 'REQ-402', title: 'Change Management Specialist', client: 'Accenture', status: 'Worked', submissions: 14, interviews: 2 },
      ],
    },
    {
      id: 'rec-5',
      name: 'Adirala Sathvika',
      role: 'Junior Recruiter',
      teamLead: 'Harish Gadipally',
      primaryClient: 'Wipro',
      team: 'Engineering Pod',
      avatar: 'A',
      requirementsCount: 1,
      workedReqs: 0,
      nonWorkedReqs: 1,
      submissionsCount: 0,
      shortlistedCount: 0,
      noSubmissionsCount: 1,
      interviewsCount: 0,
      hiresCount: 0,
      conversionRate: '0%',
      dailyTaskStatus: 'In progress (0/5) - 5 to go',
      weeklyProgress: '0 / 25',
      weeklyProgressPct: 0,
      status: 'Critical',
      requirementsList: [
        { id: 'REQ-501', title: 'Junior QA Automation Tester', client: 'Wipro', status: 'Non-Worked', submissions: 0, interviews: 0, reasonNote: 'Location constraint / No local candidates available' },
      ],
    },
    {
      id: 'rec-6',
      name: 'Arvind GR',
      role: 'Sourcing Specialist',
      teamLead: 'Harish Gadipally',
      primaryClient: 'Infosys',
      team: 'Engineering Pod',
      avatar: 'A',
      requirementsCount: 4,
      workedReqs: 3,
      nonWorkedReqs: 1,
      submissionsCount: 12,
      shortlistedCount: 4,
      noSubmissionsCount: 1,
      interviewsCount: 3,
      hiresCount: 1,
      conversionRate: '15.0%',
      dailyTaskStatus: 'Done (3/5)',
      weeklyProgress: '12 / 25',
      weeklyProgressPct: 48,
      status: 'On Track',
      requirementsList: [
        { id: 'REQ-601', title: 'Frontend Developer', client: 'Infosys', status: 'Worked', submissions: 12, interviews: 3 },
      ],
    },

    // =========================================================================
    // 👑 TEAM 2: TOM WALSH (TEAM LEAD) & HIS TEAM MEMBERS
    // =========================================================================
    {
      id: 'rec-lead-2',
      name: 'Tom Walsh (Team Lead)',
      role: 'Team Lead',
      teamLead: 'Tom Walsh',
      primaryClient: 'Goldman Sachs',
      team: 'Enterprise Accounts Pod',
      avatar: 'T',
      requirementsCount: 52,
      workedReqs: 44,
      nonWorkedReqs: 8,
      submissionsCount: 168,
      shortlistedCount: 62,
      noSubmissionsCount: 10,
      interviewsCount: 24,
      hiresCount: 9,
      conversionRate: '28.4%',
      dailyTaskStatus: 'Done (5/5)',
      weeklyProgress: '24 / 25',
      weeklyProgressPct: 96,
      status: 'On Track',
      requirementsList: [
        { id: 'REQ-TW01', title: 'Principal Financial Architect', client: 'Goldman Sachs', status: 'Worked', submissions: 32, interviews: 8 },
        { id: 'REQ-TW02', title: 'Lead Quantitative Developer', client: 'JPMorgan Chase', status: 'Worked', submissions: 28, interviews: 6 },
      ],
    },
    {
      id: 'rec-1',
      name: 'Lakshmi V',
      role: 'Lead Technical Recruiter',
      teamLead: 'Tom Walsh',
      primaryClient: 'Goldman Sachs',
      team: 'Enterprise Accounts Pod',
      avatar: 'L',
      requirementsCount: 72,
      workedReqs: 58,
      nonWorkedReqs: 14,
      submissionsCount: 194,
      shortlistedCount: 84,
      noSubmissionsCount: 32,
      interviewsCount: 22,
      hiresCount: 12,
      conversionRate: '26.2%',
      dailyTaskStatus: 'Done (5/5)',
      weeklyProgress: '21 / 25',
      weeklyProgressPct: 84,
      status: 'On Track',
      requirementsList: [
        { id: 'REQ-101', title: 'Senior Java Full Stack Engineer', client: 'Goldman Sachs', status: 'Worked', submissions: 24, interviews: 8 },
        { id: 'REQ-102', title: 'React.js Frontend Architect', client: 'Goldman Sachs', status: 'Worked', submissions: 18, interviews: 5 },
      ],
    },
    {
      id: 'rec-t1',
      name: 'Sarah Kim',
      role: 'FinTech Technical Recruiter',
      teamLead: 'Tom Walsh',
      primaryClient: 'JPMorgan Chase',
      team: 'Enterprise Accounts Pod',
      avatar: 'S',
      requirementsCount: 18,
      workedReqs: 15,
      nonWorkedReqs: 3,
      submissionsCount: 54,
      shortlistedCount: 22,
      noSubmissionsCount: 4,
      interviewsCount: 14,
      hiresCount: 5,
      conversionRate: '27.7%',
      dailyTaskStatus: 'Done (5/5)',
      weeklyProgress: '22 / 25',
      weeklyProgressPct: 88,
      status: 'On Track',
      requirementsList: [
        { id: 'REQ-SK01', title: 'Risk Systems Developer', client: 'JPMorgan Chase', status: 'Worked', submissions: 30, interviews: 8 },
      ],
    },

    // =========================================================================
    // 👑 TEAM 3: RAHUL VERMA (TEAM LEAD) & HIS TEAM MEMBERS
    // =========================================================================
    {
      id: 'rec-lead-3',
      name: 'Rahul Verma (Team Lead)',
      role: 'Team Lead',
      teamLead: 'Rahul Verma',
      primaryClient: 'Morgan Stanley',
      team: 'Cloud & ERP Pod',
      avatar: 'R',
      requirementsCount: 38,
      workedReqs: 32,
      nonWorkedReqs: 6,
      submissionsCount: 110,
      shortlistedCount: 42,
      noSubmissionsCount: 8,
      interviewsCount: 18,
      hiresCount: 7,
      conversionRate: '24.1%',
      dailyTaskStatus: 'Done (5/5)',
      weeklyProgress: '20 / 25',
      weeklyProgressPct: 80,
      status: 'On Track',
      requirementsList: [
        { id: 'REQ-RV01', title: 'Cloud Infrastructure Director', client: 'Morgan Stanley', status: 'Worked', submissions: 28, interviews: 6 },
      ],
    },
    {
      id: 'rec-r1',
      name: 'Neha Gupta',
      role: 'SAP & Cloud Specialist',
      teamLead: 'Rahul Verma',
      primaryClient: 'Morgan Stanley',
      team: 'Cloud & ERP Pod',
      avatar: 'N',
      requirementsCount: 16,
      workedReqs: 14,
      nonWorkedReqs: 2,
      submissionsCount: 42,
      shortlistedCount: 18,
      noSubmissionsCount: 3,
      interviewsCount: 10,
      hiresCount: 4,
      conversionRate: '23.8%',
      dailyTaskStatus: 'Done (4/5)',
      weeklyProgress: '19 / 25',
      weeklyProgressPct: 76,
      status: 'On Track',
      requirementsList: [
        { id: 'REQ-NG01', title: 'SAP HANA Lead Consultant', client: 'Morgan Stanley', status: 'Worked', submissions: 22, interviews: 5 },
      ],
    },
  ]

  const getRecruiterClientBreakdown = (r: RecruiterDetailData): ClientSubmissionInfo[] => {
    const map = new Map<string, number>()
    r.requirementsList.forEach(req => {
      if (req.client && req.client !== '—') {
        map.set(req.client, (map.get(req.client) || 0) + req.submissions)
      }
    })
    const result: ClientSubmissionInfo[] = Array.from(map.entries()).map(([client, submissions]) => ({
      client,
      submissions,
    }))
    result.sort((a, b) => b.submissions - a.submissions)
    return result
  }

  const getRecruiterSubmittedClients = (r: RecruiterDetailData): string => {
    const breakdown = getRecruiterClientBreakdown(r)
    if (breakdown.length === 0) return '—'
    return breakdown.map(b => b.client).join(', ')
  }

  const allUniqueClientsList = useMemo(() => {
    const clientsSet = new Set<string>()
    recruitersPerformanceList.forEach(r => {
      r.requirementsList.forEach(req => {
        if (req.client && req.client !== '—') {
          clientsSet.add(req.client)
        }
      })
    })
    return Array.from(clientsSet).sort()
  }, [recruitersPerformanceList])

  const filteredRecruiters = useMemo(() => {
    return recruitersPerformanceList.filter(r => {
      // Team Lead role should exclusively see their own performance and their team members' performance
      if (role === 'lead') {
        const lead = (r.teamLead || '').toLowerCase()
        const name = r.name.toLowerCase()
        const isMyTeam = lead.includes('harish') || name.includes('harish')
        if (!isMyTeam) return false
      }

      if (searchQuery.trim() && !r.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
      if (statusFilter !== 'All Statuses' && r.status !== statusFilter) return false
      if (clientFilter !== 'All Clients') {
        const submittedClients = getRecruiterSubmittedClients(r)
        if (!submittedClients.toLowerCase().includes(clientFilter.toLowerCase())) return false
      }
      return true
    })
  }, [recruitersPerformanceList, searchQuery, statusFilter, clientFilter, role])

  const paginatedRecruiters = useMemo(() => {
    const start = (recruiterPage - 1) * recruiterPageSize
    return filteredRecruiters.slice(start, start + recruiterPageSize)
  }, [filteredRecruiters, recruiterPage, recruiterPageSize])

  const handleSaveReason = () => {
    if (!reasonModalReq) return
    const updatedReqs = myPersonalProfile.requirementsList.map(item =>
      item.id === reasonModalReq.id ? { ...item, reasonNote: reasonNoteText.trim() } : item
    )
    setMyPersonalProfile({ ...myPersonalProfile, requirementsList: updatedReqs })
    showToast(`Saved non-submission reason for ${reasonModalReq.id}!`)
    setReasonModalReq(null)
    setReasonNoteText('')
  }

  const isDateInFilterRange = (dateStr: string, filter: string): boolean => {
    if (filter === 'all') return true
    try {
      const parts = dateStr.split(',')
      const datePart = parts[0].trim()
      const itemDate = new Date(datePart)
      if (isNaN(itemDate.getTime())) return true

      const today = new Date('2026-08-21T00:00:00')
      const diffTime = today.getTime() - itemDate.getTime()
      const diffDays = Math.floor(diffTime / (1000 * 3600 * 24))

      if (filter === 'today') {
        return diffDays === 0
      }
      if (filter === 'yesterday') {
        return diffDays === 1
      }
      if (filter === '7_days') {
        return diffDays >= 0 && diffDays <= 7
      }
      if (filter === '1_month') {
        return diffDays >= 0 && diffDays <= 30
      }
    } catch {
      return true
    }
    return true
  }

  interface SubmissionsDashboardConfig {
    type?: 'recruiter_self' | 'lead_self' | 'team_members_only' | 'overall_company'
    title?: string
    subtitle?: string
    leadName?: string
  }

  const renderSubmissionsDashboardCard = (config?: SubmissionsDashboardConfig) => {
    const cardType = config?.type || (role === 'recruiter' ? 'recruiter_self' : 'overall_company')
    const leadName = config?.leadName || 'Harish Gadipally'

    let searchQ = dashSearchQuery
    let setSearchQ = setDashSearchQuery
    let recFilter = dashRecruiterFilter
    let setRecFilter = setDashRecruiterFilter
    let cliFilter = dashClientFilter
    let setCliFilter = setDashClientFilter
    let dateF = dashDateFilter
    let setDateF = setDashDateFilter
    let currentPage = dashPage
    let setCurrentPage = setDashPage

    if (cardType === 'lead_self') {
      searchQ = dash1SearchQuery
      setSearchQ = setDash1SearchQuery
      cliFilter = dash1ClientFilter
      setCliFilter = setDash1ClientFilter
      dateF = dash1DateFilter
      setDateF = setDash1DateFilter
      currentPage = dash1Page
      setCurrentPage = setDash1Page
    } else if (cardType === 'team_members_only') {
      searchQ = dash2SearchQuery
      setSearchQ = setDash2SearchQuery
      recFilter = dash2RecruiterFilter
      setRecFilter = setDash2RecruiterFilter
      cliFilter = dash2ClientFilter
      setCliFilter = setDash2ClientFilter
      dateF = dash2DateFilter
      setDateF = setDash2DateFilter
      currentPage = dash2Page
      setCurrentPage = setDash2Page
    }

    const filteredItems = RECRUITER_REQ_SUBMISSION_DASHBOARD_DATA.filter(item => {
      if (cardType === 'recruiter_self') {
        const myName = (myPersonalProfile.name || 'Marcus Chen').toLowerCase().trim()
        const recName = item.recruiterName.toLowerCase().trim()
        if (!recName.includes(myName) && !myName.includes(recName)) return false
      } else if (cardType === 'lead_self') {
        const lead = leadName.toLowerCase().trim()
        const recName = item.recruiterName.toLowerCase().trim()
        if (!recName.includes(lead) && !lead.includes(recName)) return false
      } else if (cardType === 'team_members_only') {
        const lead = leadName.toLowerCase().trim()
        const recName = item.recruiterName.toLowerCase().trim()
        const itemLead = (item.teamLead || '').toLowerCase().trim()

        // 1. MUST NOT be the Team Lead himself
        if (recName.includes(lead) || lead.includes(recName)) return false

        // 2. MUST belong to this particular Team Lead's team (not recruiters under other leads!)
        if (item.teamLead) {
          if (!itemLead.includes(lead) && !lead.includes(itemLead)) return false
        } else {
          const harishTeamRecruiters = ['marcus chen', 'priya sharma', 'suresh kulkarni', 'adirala sathvika', 'arvind gr']
          if (!harishTeamRecruiters.some(r => recName.includes(r))) return false
        }
      }

      if (dateF !== 'all') {
        const matchLatest = isDateInFilterRange(item.timestamp, dateF)
        const matchFirst = isDateInFilterRange(item.firstSubmissionTime, dateF)
        if (!matchLatest && !matchFirst) return false
      }

      if (searchQ.trim()) {
        const q = searchQ.toLowerCase().trim()
        const m1 = item.recruiterName.toLowerCase().includes(q)
        const m2 = item.reqId.toLowerCase().includes(q)
        const m3 = item.jobTitle.toLowerCase().includes(q)
        const m4 = item.clientName.toLowerCase().includes(q)
        if (!m1 && !m2 && !m3 && !m4) return false
      }

      if (cardType !== 'recruiter_self' && cardType !== 'lead_self' && recFilter !== 'All Recruiters' && item.recruiterName !== recFilter) {
        return false
      }
      if (cliFilter !== 'All Clients' && item.clientName !== cliFilter) return false

      return true
    })

    const totalPages = Math.ceil(filteredItems.length / dashPageSize) || 1
    const startIdx = (currentPage - 1) * dashPageSize
    const paginatedItems = filteredItems.slice(startIdx, startIdx + dashPageSize)

    const handleExportCSV = () => {
      const headers = [
        'Recruiter Name',
        'Requirement ID',
        'Job Title',
        'Requirement Received Date & Time',
        'Number of Positions',
        'Client Name',
        'Submissions Done',
        'First Submission Date & Time',
        'TAT (Turnaround Time)',
        'Last Activity Timestamp',
        'Status',
      ]

      const rows = filteredItems.map(item => [
        `"${item.recruiterName}"`,
        `"${item.reqId}"`,
        `"${item.jobTitle}"`,
        `"${item.receivedTime || '12 Aug 2026, 05:30 AM'}"`,
        item.positions,
        `"${item.clientName}"`,
        item.submissionsCount,
        `"${item.firstSubmissionTime}"`,
        `"${item.tat || calculateTAT(item.receivedTime, item.firstSubmissionTime)}"`,
        `"${item.timestamp}"`,
        `"${item.status}"`,
      ])

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement('a')
      const exportName =
        cardType === 'lead_self'
          ? `Team_Lead_${leadName.replace(/\s+/g, '_')}_Individual_Submissions`
          : cardType === 'team_members_only'
          ? 'Team_Recruiters_Submissions_Excluding_Lead'
          : cardType === 'recruiter_self'
          ? 'Recruiter_Individual_Submissions'
          : 'Requirement_Submissions_Dashboard'

      link.setAttribute('href', encodedUri)
      link.setAttribute('download', `${exportName}_${new Date().toISOString().slice(0, 10)}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      showToast(`Exported ${config?.title || 'Dashboard'} to CSV!`)
    }

    const defaultTitle =
      cardType === 'lead_self'
        ? 'Team Lead Individual Submissions Dashboard'
        : cardType === 'team_members_only'
        ? 'Team Recruiters Overall Submissions Dashboard'
        : cardType === 'recruiter_self'
        ? 'Requirement Submissions Dashboard'
        : 'Requirement Submissions Dashboard'

    const defaultSubtitle =
      cardType === 'lead_self'
        ? `Showing requirement submissions, received date/time, first submission date/time, and TAT turnaround SLA for ${leadName} only.`
        : cardType === 'team_members_only'
        ? `Requirement-wise breakdown of recruiter submissions, requirement received timestamp, first submission date/time, and calculated TAT for team members under ${leadName} (Excludes Lead Individual Data & Other Teams).`
        : cardType === 'recruiter_self'
        ? `Requirement submissions, received date/time, first submission date/time, and TAT turnaround SLA for ${myPersonalProfile.name}.`
        : 'Requirement-wise breakdown of recruiter submissions, requirement received timestamp, first submission date/time, and calculated TAT.'

    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5 font-sans animate-in fade-in duration-200">
        {/* HEADER & ACTION BUTTONS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-purple-100 text-[#6B3BF6] rounded-xl font-bold">
                <PieIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2 flex-wrap">
                  <span>{config?.title || defaultTitle}</span>
                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Avg TAT: 3h 25m</span>
                  </span>

                  {cardType === 'lead_self' ? (
                    <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-[#6B3BF6] text-white shadow-2xs flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-white" />
                      <span>Team Lead Individual: {leadName}</span>
                    </span>
                  ) : cardType === 'team_members_only' ? (
                    <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-blue-100 text-blue-900 border border-blue-200 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-blue-700" />
                      <span>Team Members under {leadName} (Excludes Lead & Other Teams)</span>
                    </span>
                  ) : cardType === 'recruiter_self' ? (
                    <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-[#6B3BF6] text-white shadow-2xs flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-white" />
                      <span>Recruiter: {myPersonalProfile.name}</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-[#6B3BF6] border border-purple-200">
                      Company Overview
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {config?.subtitle || defaultSubtitle}
                </p>
              </div>
            </div>
          </div>

          {role !== 'recruiter' && role !== 'lead' && role !== 'admin' && (
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          )}
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={cardType === 'recruiter_self' || cardType === 'lead_self' ? "Search req ID, job title, client..." : "Search recruiter, req ID, job title, client..."}
              value={searchQ}
              onChange={e => {
                setSearchQ(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6]"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
            {/* DATE RANGE FILTER DROPDOWN */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1">
              <Calendar className="w-3.5 h-3.5 text-[#6B3BF6]" />
              <select
                value={dateF}
                onChange={e => {
                  setDateF(e.target.value as any)
                  setCurrentPage(1)
                }}
                className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="7_days">Last 7 Days</option>
                <option value="1_month">One Month</option>
              </select>
            </div>

            {/* Recruiter filter: Only shown when multiple recruiters are in the table */}
            {(cardType === 'team_members_only' || cardType === 'overall_company') && (
              <select
                value={recFilter}
                onChange={e => {
                  setRecFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
              >
                <option value="All Recruiters">All Recruiters</option>
                {Array.from(
                  new Set(
                    RECRUITER_REQ_SUBMISSION_DASHBOARD_DATA
                      .filter(i => {
                        if (cardType === 'team_members_only') {
                          const lead = leadName.toLowerCase().trim()
                          const recName = i.recruiterName.toLowerCase().trim()
                          const itemLead = (i.teamLead || '').toLowerCase().trim()
                          if (recName.includes(lead) || lead.includes(recName)) return false
                          if (i.teamLead) {
                            return itemLead.includes(lead) || lead.includes(itemLead)
                          }
                          const harishTeamRecruiters = ['marcus chen', 'priya sharma', 'suresh kulkarni', 'adirala sathvika', 'arvind gr']
                          return harishTeamRecruiters.some(r => recName.includes(r))
                        }
                        return true
                      })
                      .map(i => i.recruiterName)
                  )
                ).map(r => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            )}

            <select
              value={cliFilter}
              onChange={e => {
                setCliFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
            >
              <option value="All Clients">All Clients</option>
              {Array.from(
                new Set(
                  RECRUITER_REQ_SUBMISSION_DASHBOARD_DATA
                    .filter(i => {
                      if (cardType === 'lead_self') {
                        const lead = leadName.toLowerCase().trim()
                        const recName = i.recruiterName.toLowerCase().trim()
                        return recName.includes(lead) || lead.includes(recName)
                      }
                      if (cardType === 'team_members_only') {
                        const lead = leadName.toLowerCase().trim()
                        const recName = i.recruiterName.toLowerCase().trim()
                        const itemLead = (i.teamLead || '').toLowerCase().trim()
                        if (recName.includes(lead) || lead.includes(recName)) return false
                        if (i.teamLead) {
                          return itemLead.includes(lead) || lead.includes(itemLead)
                        }
                        const harishTeamRecruiters = ['marcus chen', 'priya sharma', 'suresh kulkarni', 'adirala sathvika', 'arvind gr']
                        return harishTeamRecruiters.some(r => recName.includes(r))
                      }
                      if (cardType === 'recruiter_self') {
                        const myName = (myPersonalProfile.name || 'Marcus Chen').toLowerCase().trim()
                        const recName = i.recruiterName.toLowerCase().trim()
                        return recName.includes(myName) || myName.includes(recName)
                      }
                      return true
                    })
                    .map(i => i.clientName)
                )
              ).map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* DASHBOARD TABLE */}
        <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {cardType !== 'recruiter_self' && cardType !== 'lead_self' && <th className="py-3.5 px-4">RECRUITER NAME</th>}
                <th className="py-3.5 px-4">REQUIREMENT ID</th>
                <th className="py-3.5 px-4">JOB TITLE & RECEIVED DATE/TIME</th>
                <th className="py-3.5 px-4 text-center">POSITIONS</th>
                <th className="py-3.5 px-4">CLIENT NAME</th>
                <th className="py-3.5 px-4 text-center">SUBMISSIONS DONE</th>
                <th className="py-3.5 px-4">FIRST SUBMISSION DATE & TIME</th>
                <th className="py-3.5 px-4 text-center">TAT (TURNAROUND TIME)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={cardType === 'recruiter_self' || cardType === 'lead_self' ? 7 : 8} className="py-8 text-center text-slate-400 text-xs italic">
                    No requirement submissions found matching search filter.
                  </td>
                </tr>
              ) : (
                paginatedItems.map(item => (
                  <tr key={item.id} className="hover:bg-purple-50/40 transition-colors">
                    {/* Recruiter Name (Only when multiple recruiters exist) */}
                    {cardType !== 'recruiter_self' && cardType !== 'lead_self' && (
                      <td className="py-3.5 px-4 font-extrabold text-slate-900 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-purple-100 text-[#6B3BF6] font-bold text-[10px] flex items-center justify-center shrink-0 border border-purple-200">
                            {item.recruiterName.charAt(0)}
                          </div>
                          <span>{item.recruiterName}</span>
                        </div>
                      </td>
                    )}

                    {/* Requirement ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700 whitespace-nowrap">
                      {item.reqId}
                    </td>

                    {/* Job Title & Requirement Received Date/Time */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-bold text-slate-900 leading-snug">{item.jobTitle}</div>
                      <div className="text-[11px] text-slate-500 font-mono font-normal mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>Received: <strong className="text-slate-700 font-semibold">{item.receivedTime}</strong></span>
                      </div>
                    </td>

                    {/* Positions */}
                    <td className="py-3.5 px-4 text-center font-extrabold text-slate-800">
                      <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded-md text-xs font-mono">
                        {item.positions}
                      </span>
                    </td>

                    {/* Client Name */}
                    <td className="py-3.5 px-4 font-bold text-purple-700 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-purple-50 text-purple-800 border border-purple-200 rounded-xl text-xs">
                        {item.clientName}
                      </span>
                    </td>

                    {/* Submissions Done */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl font-extrabold text-xs font-mono">
                        {item.submissionsCount}
                      </span>
                    </td>

                    {/* First Submission Date & Time */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-emerald-800 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-bold">{item.firstSubmissionTime}</span>
                      </div>
                    </td>

                    {/* TAT */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-extrabold bg-[#EEF2FF] text-[#5B51D8] border border-[#C7D2FE] shadow-2xs">
                        ⚡ {item.tat || calculateTAT(item.receivedTime, item.firstSubmissionTime)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <PaginationFooter
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredItems.length}
          pageSize={dashPageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    )
  }

  // Drill-down views (Admin only)
  if (role !== 'recruiter' && selectedRecruiter) {
    return (
      <RecruiterDetailAnalyticsPage
        recruiter={selectedRecruiter}
        onBack={() => {
          setSelectedRecruiter(null)
          setActiveReportView('team')
        }}
      />
    )
  }

  if (role !== 'recruiter' && selectedClient) {
    return (
      <ClientDetailAnalyticsPage
        client={selectedClient}
        onBack={() => {
          setSelectedClient(null)
          setActiveReportView('team')
        }}
      />
    )
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800">
      {/* 1. TOP HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            {activeReportView === 'charts' && (
              <button
                type="button"
                onClick={() => setActiveReportView(role === 'recruiter' ? 'self' : 'team')}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold rounded-xl transition-all cursor-pointer border border-slate-200/90 shadow-2xs flex items-center gap-2 shrink-0 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-[#6B3BF6]" />
                <span>Back to Dashboard</span>
              </button>
            )}

            {role !== 'recruiter' && activeReportView !== 'team' && activeReportView !== 'charts' && (
              <button
                type="button"
                onClick={() => setActiveReportView('team')}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer border border-slate-200/90 flex items-center justify-center shadow-2xs shrink-0"
                title="Back to Default Daily Reports Page"
              >
                <ArrowLeft className="w-4 h-4 text-slate-700" />
              </button>
            )}

            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {role === 'recruiter'
                ? 'Reports & Performance'
                : activeReportView === 'charts'
                ? 'Visual Analytics & Charts'
                : activeReportView === 'self'
                ? 'Reports & Performance'
                : 'Team Performance & Reports'}
            </h1>

            {(role === 'superadmin' || role === 'devteam') && activeReportView !== 'self' && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-200 inline-flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                <span>🔴 {role === 'devteam' ? 'Dev Team Access (Super Admin Privileges)' : 'Super Admin View (Executive Analytics)'}</span>
              </span>
            )}

            {role === 'admin' && activeReportView !== 'self' && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-200 inline-flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <span>🟠 Admin View (Operational Performance)</span>
              </span>
            )}

            {role === 'lead' && activeReportView !== 'self' && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-900 border border-blue-200 inline-flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>🔵 Team Lead View (Team Execution)</span>
              </span>
            )}

            {(role === 'recruiter' || activeReportView === 'self') && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EEF2FF] text-[#5B51D8] border border-[#C7D2FE] inline-flex items-center gap-1.5 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5B51D8]" />
                <span>My Individual Performance View</span>
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500 mt-1">
            {role === 'recruiter'
              ? 'Your personal sourcing metrics, conversion funnel, assigned requirements, and turnaround time.'
              : activeReportView === 'charts'
              ? 'Executive visual charts, monthly timelines, coverage ratios, and client POC analytics.'
              : activeReportView === 'self'
              ? 'Your personal sourcing metrics, conversion funnel, assigned requirements, and turnaround time.'
              : 'Company-wide hiring performance, recruiter performance table, and client performance records.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Analysis View Toggle Button */}
          <button
            type="button"
            onClick={() => setActiveReportView(activeReportView === 'charts' ? 'team' : 'charts')}
            className={`px-4 py-2 rounded-2xl transition-all flex items-center gap-2 cursor-pointer text-xs font-bold shadow-2xs border ${
              activeReportView === 'charts'
                ? 'bg-[#6B3BF6] text-white border-[#6B3BF6]'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70 border-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analysis</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          </button>
        </div>
      </div>

      {/* ======================================================================== */}
      {/* VIEW MODE 1: DEDICATED ANALYSIS & VISUAL CHARTS PAGE                    */}
      {/* ======================================================================== */}
      {activeReportView === 'charts' ? (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between bg-purple-50 border border-purple-200 p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#6B3BF6]" />
              <div>
                <h3 className="text-sm font-extrabold text-purple-950">
                  {role === 'lead'
                    ? 'Team Lead Individual Performance Analysis & Visual Trends'
                    : 'Recruiter Sourcing Analysis & Visual Trends'}
                </h3>
                <p className="text-xs text-purple-700">
                  {role === 'lead'
                    ? 'Detailed individual performance graphs, monthly timelines, worked vs non-worked REQ diagrams & turnaround SLA for Harish Gadipally (Team Lead)'
                    : 'Detailed performance graphs, monthly timelines, worked vs non-worked REQ diagrams & coverage metrics'}
                </p>
              </div>
            </div>
          </div>

          {/* GRAPH FILTER SUB-TAB TOGGLES */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 border border-slate-200/90 rounded-2xl text-xs font-bold shadow-2xs flex-wrap">
            <button
              onClick={() => setActiveGraphFilter('assigned_breakdown')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeGraphFilter === 'assigned_breakdown' ? 'bg-[#6B3BF6] text-white shadow-2xs font-extrabold' : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              My Assigned REQs Breakdown
            </button>

            <button
              onClick={() => setActiveGraphFilter('monthly_timeline')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeGraphFilter === 'monthly_timeline' ? 'bg-[#6B3BF6] text-white shadow-2xs font-extrabold' : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              Monthly Timeline
            </button>

            <button
              onClick={() => setActiveGraphFilter('stage_pipeline')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeGraphFilter === 'stage_pipeline' ? 'bg-[#6B3BF6] text-white shadow-2xs font-extrabold' : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              Stage Pipeline
            </button>
          </div>

          {/* 1) Worked vs Non-Worked REQs Breakdown & Non-Worked Reason Note Diagram */}
          {activeGraphFilter === 'assigned_breakdown' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5 animate-in fade-in duration-150 font-sans">
              {/* Header & Toggle Controls */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Briefcase className="w-4.5 h-4.5 text-[#6B3BF6]" />
                      <span>
                        {assignedBreakdownToggle === 'individual'
                          ? `Lead Individual Requirements Breakdown (${myPersonalProfile.requirementsList.length} REQs)`
                          : `Whole Team Assigned Requirements Breakdown (24 REQs)`}
                      </span>
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {assignedBreakdownToggle === 'individual'
                      ? `Detailed status of requirements assigned to Harish Gadipally (Team Lead)`
                      : `Detailed status of requirements assigned across all team members under Harish Gadipally (Engineering Pod)`}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {/* Lead Individual Performance vs Team Members Comparison Toggle */}
                  {role !== 'recruiter' && (
                    <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setAssignedBreakdownToggle('individual')}
                        className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                          assignedBreakdownToggle === 'individual'
                            ? 'bg-[#6B3BF6] text-white shadow-2xs font-extrabold'
                            : 'text-slate-600 hover:bg-slate-200/60'
                        }`}
                      >
                        Lead Individual Performance
                      </button>
                      <button
                        type="button"
                        onClick={() => setAssignedBreakdownToggle('team')}
                        className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                          assignedBreakdownToggle === 'team'
                            ? 'bg-blue-600 text-white shadow-2xs font-extrabold'
                            : 'text-slate-600 hover:bg-slate-200/60'
                        }`}
                      >
                        Team Members Comparison
                      </button>
                    </div>
                  )}

                  {/* Worked / Non-Worked Tabs */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold shrink-0">
                    <button
                      type="button"
                      onClick={() => setPersonalTab('worked')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        personalTab === 'worked' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600'
                      }`}
                    >
                      Worked ({assignedBreakdownToggle === 'individual' ? myPersonalProfile.workedReqs : 18})
                    </button>
                    <button
                      type="button"
                      onClick={() => setPersonalTab('non_worked')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        personalTab === 'non_worked' ? 'bg-white text-amber-700 shadow-2xs font-bold' : 'text-slate-600'
                      }`}
                    >
                      Non-Worked ({assignedBreakdownToggle === 'individual' ? myPersonalProfile.nonWorkedReqs : 6})
                    </button>
                  </div>
                </div>
              </div>

              {/* TEAM MEMBER COMPARISON WORKLOAD PILLS (Displayed in Team mode) */}
              {assignedBreakdownToggle === 'team' && (
                <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-purple-50/80 border border-blue-200/80 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      Team Members Workload Distribution (Engineering Pod)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-900 border border-blue-300 rounded-full">
                      4 Team Members
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-2xs">
                      <div className="font-extrabold text-slate-900">Harish Gadipally (Lead)</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-between">
                        <span>6 REQs assigned</span>
                        <span className="font-bold text-blue-700">3 Worked (50%)</span>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-2xs">
                      <div className="font-extrabold text-slate-900">Marcus Chen</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-between">
                        <span>14 REQs assigned</span>
                        <span className="font-bold text-emerald-700">12 Worked (86%)</span>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-2xs">
                      <div className="font-extrabold text-slate-900">Priya Sharma</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-between">
                        <span>12 REQs assigned</span>
                        <span className="font-bold text-blue-700">10 Worked (83%)</span>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-2xs">
                      <div className="font-extrabold text-slate-900">Arvind GR</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-between">
                        <span>4 REQs assigned</span>
                        <span className="font-bold text-blue-700">3 Worked (75%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VISUAL DIAGRAM: WORKED VS NON-WORKED REQS BREAKDOWN */}
              <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="w-full md:w-1/2 flex items-center justify-center gap-6">
                  {/* Donut Progress Diagram */}
                  <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-amber-200"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#2563EB]"
                        strokeDasharray={assignedBreakdownToggle === 'individual' ? "50, 100" : "75, 100"}
                        strokeWidth="4"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-xl font-extrabold text-slate-900 leading-none">
                        {assignedBreakdownToggle === 'individual' ? '6' : '24'}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">
                        {assignedBreakdownToggle === 'individual' ? 'Assigned' : 'Team REQs'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#2563EB] shrink-0" />
                      <span className="font-bold text-slate-800">Worked REQs:</span>
                      <span className="font-extrabold text-[#2563EB]">
                        {assignedBreakdownToggle === 'individual' ? '3 REQs (50%)' : '18 REQs (75%)'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                      <span className="font-bold text-slate-800">Non-Worked REQs:</span>
                      <span className="font-extrabold text-amber-700">
                        {assignedBreakdownToggle === 'individual' ? '3 REQs (50%)' : '6 REQs (25%)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Non-Worked Reasons Summary Diagram Panel */}
                <div className="w-full md:w-1/2 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2 text-xs">
                  <div className="font-extrabold text-slate-900 border-b border-slate-100 pb-1.5 flex items-center justify-between">
                    <span>Non-Worked Reasons Summary Diagram</span>
                    <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                      {assignedBreakdownToggle === 'individual' ? '3 Unworked REQs' : '6 Unworked Team REQs'}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between text-slate-700 bg-amber-50/50 px-2.5 py-1 rounded-lg border border-amber-100">
                      <span className="font-medium truncate">• Low CTC budget approval from client</span>
                      <span className="font-bold text-amber-900 shrink-0 ml-2">
                        {assignedBreakdownToggle === 'individual' ? '1 REQ (33%)' : '2 REQs (33%)'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700 bg-amber-50/50 px-2.5 py-1 rounded-lg border border-amber-100">
                      <span className="font-medium truncate">• Priority shifted to urgent LTTS REQ</span>
                      <span className="font-bold text-amber-900 shrink-0 ml-2">
                        {assignedBreakdownToggle === 'individual' ? '1 REQ (33%)' : '2 REQs (33%)'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700 bg-amber-50/50 px-2.5 py-1 rounded-lg border border-amber-100">
                      <span className="font-medium truncate">• Awaiting updated JD & location clarification</span>
                      <span className="font-bold text-amber-900 shrink-0 ml-2">
                        {assignedBreakdownToggle === 'individual' ? '1 REQ (33%)' : '2 REQs (33%)'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {assignedBreakdownToggle === 'team' && (
                        <th className="py-3.5 px-4 bg-purple-50/80 text-purple-900 font-extrabold">RECRUITER / LEAD</th>
                      )}
                      <th className="py-3.5 px-4">REQUIREMENT TITLE & ID</th>
                      <th className="py-3.5 px-4">CLIENT NAME</th>
                      <th className="py-3.5 px-4 text-center bg-indigo-50/60 text-indigo-900 font-extrabold">POSITIONS (OPENINGS)</th>
                      <th className="py-3.5 px-4 text-center">SUBMISSIONS</th>
                      <th className="py-3.5 px-4">WORKED STATUS</th>
                      <th className="py-3.5 px-4">NON-SUBMISSION REASON NOTE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {(assignedBreakdownToggle === 'individual'
                      ? myPersonalProfile.requirementsList
                      : [
                          { id: 'REQ-701', title: 'Lead Java Full Stack Developer', recruiterName: 'Harish Gadipally (Team Lead)', client: 'Accenture', status: 'Worked', submissions: 42, interviews: 12, positions: 10 },
                          { id: 'REQ-702', title: 'Senior React Native Mobile Dev', recruiterName: 'Harish Gadipally (Team Lead)', client: 'LTTS Automotive', status: 'Worked', submissions: 36, interviews: 10, positions: 8 },
                          { id: 'REQ-703', title: 'Cloud Solutions Architect', recruiterName: 'Harish Gadipally (Team Lead)', client: 'Infosys', status: 'Worked', submissions: 28, interviews: 8, positions: 6 },
                          { id: 'REQ-704', title: 'Cyber Security Analyst', recruiterName: 'Harish Gadipally (Team Lead)', client: 'HCL Technologies', status: 'Non-Worked', submissions: 0, interviews: 0, positions: 3, reasonNote: 'Low CTC budget approval from client' },
                          { id: 'REQ-705', title: 'Lead Data Platform Architect', recruiterName: 'Harish Gadipally (Team Lead)', client: 'Tesla Mobility', status: 'Non-Worked', submissions: 0, interviews: 0, positions: 4, reasonNote: 'Priority shifted to urgent LTTS REQ' },
                          { id: 'REQ-501', title: 'Junior QA Automation Tester', recruiterName: 'Harish Gadipally (Team Lead)', client: 'Wipro', status: 'Non-Worked', submissions: 0, interviews: 0, positions: 2, reasonNote: 'Location constraint / No local candidates available' },
                          { id: 'REQ-MC01', title: 'Senior Java Fullstack Engineer', recruiterName: 'Marcus Chen', client: 'Accenture', status: 'Worked', submissions: 24, interviews: 8, positions: 8 },
                          { id: 'REQ-MC02', title: 'React.js Frontend Architect', recruiterName: 'Marcus Chen', client: 'Accenture', status: 'Worked', submissions: 24, interviews: 4, positions: 6 },
                          { id: 'REQ-MC03', title: 'AI Data Engineer', recruiterName: 'Marcus Chen', client: 'Metaforge IT', status: 'Non-Worked', submissions: 0, interviews: 0, positions: 4, reasonNote: 'Awaiting client technical specification updates' },
                          { id: 'REQ-PS01', title: 'Backend Node.js Microservices Dev', recruiterName: 'Priya Sharma', client: 'Accenture', status: 'Worked', submissions: 18, interviews: 5, positions: 5 },
                          { id: 'REQ-PS02', title: 'DevOps & Kubernetes Engineer', recruiterName: 'Priya Sharma', client: 'Accenture', status: 'Worked', submissions: 18, interviews: 4, positions: 4 },
                          { id: 'REQ-PS03', title: 'Database Administrator', recruiterName: 'Priya Sharma', client: 'Cognizant', status: 'Non-Worked', submissions: 0, interviews: 0, positions: 3, reasonNote: 'Client paused requirement temporarily' },
                          { id: 'REQ-AG01', title: 'Frontend Developer (React/Vue)', recruiterName: 'Arvind GR', client: 'Infosys', status: 'Worked', submissions: 12, interviews: 3, positions: 4 },
                          { id: 'REQ-AG02', title: 'QA Automation SDET', recruiterName: 'Arvind GR', client: 'Wipro', status: 'Non-Worked', submissions: 0, interviews: 0, positions: 2, reasonNote: 'Shifted focus to priority Accenture roles' },
                        ]
                    )
                      .filter(req => (personalTab === 'worked' ? req.status === 'Worked' : req.status === 'Non-Worked'))
                      .map(req => (
                        <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                          {assignedBreakdownToggle === 'team' && (
                            <td className="py-3.5 px-4 font-extrabold text-purple-900 bg-purple-50/30 whitespace-nowrap">
                              {(req as any).recruiterName || 'Harish Gadipally'}
                            </td>
                          )}
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            <div>{req.title}</div>
                            <span className="text-[10px] text-slate-400 font-normal">{req.id}</span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-purple-700">{req.client}</td>
                          <td className="py-3.5 px-4 text-center font-black text-indigo-900 bg-indigo-50/30">
                            <span className="px-2.5 py-0.5 rounded-lg bg-indigo-100/90 text-indigo-900 border border-indigo-200 inline-block font-extrabold">
                              {(req as any).positions || 3} Positions
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center font-extrabold text-[#2563EB]">{req.submissions}</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                req.status === 'Worked'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : 'bg-amber-100 text-amber-800 border border-amber-200'
                              }`}
                            >
                              {req.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            {req.status === 'Non-Worked' ? (
                              req.reasonNote ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-slate-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 italic font-normal">
                                    "{req.reasonNote}"
                                  </span>
                                  <button
                                    onClick={() => {
                                      setReasonModalReq({ id: req.id, title: req.title, note: req.reasonNote })
                                      setReasonNoteText(req.reasonNote || '')
                                    }}
                                    className="text-[11px] font-bold text-[#6B3BF6] hover:underline cursor-pointer"
                                  >
                                    Edit
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setReasonModalReq({ id: req.id, title: req.title })
                                    setReasonNoteText('')
                                  }}
                                  className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-bold rounded-lg border border-amber-300 transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>Add Reason Note</span>
                                </button>
                              )
                            ) : (
                              <span className="text-slate-400 font-normal">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 2) Chart: Monthly Timeline Requirements vs Total Submissions */}
          {activeGraphFilter === 'monthly_timeline' && (
            <MonthlyTimelinePerformanceChart role={role} />
          )}

          {/* 3) Chart: Stage Pipeline Performance Chart */}
          {activeGraphFilter === 'stage_pipeline' && (
            <StagePipelinePerformanceChart role={role} />
          )}


        </div>
      ) : activeReportView === 'self' || role === 'recruiter' ? (
        /* ======================================================================== */
        /* VIEW MODE 2: MAIN REPORTS PAGE (4 TOP KPI CARDS + DASHBOARD TABLE ONLY)  */
        /* ======================================================================== */
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* 4 Individual Performance KPI Cards (MATCHING REFERENCE IMAGE EXACTLY WITH ATTRACTIVE UI) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Total Submissions */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-indigo-50/90 via-indigo-50/40 to-purple-50/70 border border-indigo-200/80 hover:border-indigo-400 rounded-3xl p-5 shadow-2xs hover:shadow-md transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all" />
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[11px] font-black text-indigo-900 uppercase tracking-wider">TOTAL SUBMISSIONS</span>
                <div className="w-9 h-9 rounded-2xl bg-indigo-600/10 border border-indigo-200 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <Send className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3.5xl font-black text-slate-900 tabular-nums my-1.5 tracking-tight relative z-10">48</p>
              <div className="flex items-center gap-1.5 pt-2 border-t border-indigo-100/90 relative z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <ArrowUpRight className="w-3 h-3 text-emerald-700" />
                  Shortlisted: 18
                </span>
              </div>
            </div>

            {/* Card 2: Total Requirements */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50/90 via-sky-50/40 to-indigo-50/70 border border-blue-200/80 hover:border-blue-400 rounded-3xl p-5 shadow-2xs hover:shadow-md transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[11px] font-black text-blue-900 uppercase tracking-wider">TOTAL REQUIREMENTS</span>
                <div className="w-9 h-9 rounded-2xl bg-blue-600/10 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3.5xl font-black text-slate-900 tabular-nums my-1.5 tracking-tight relative z-10">14</p>
              <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-blue-100/90 text-[11px] font-extrabold relative z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">Worked: 12</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">Non-Worked: 2</span>
              </div>
            </div>

            {/* Card 3: First Submissions / Won Requirements */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-emerald-50/70 border border-emerald-200/80 hover:border-emerald-400 rounded-3xl p-5 shadow-2xs hover:shadow-md transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[11px] font-black text-emerald-900 uppercase tracking-wider">FIRST SUBMISSIONS / WON</span>
                <div className="w-9 h-9 rounded-2xl bg-emerald-600/10 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <Trophy className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3.5xl font-black text-slate-900 tabular-nums my-1.5 tracking-tight relative z-10">12</p>
              <div className="flex items-center gap-1.5 pt-2 border-t border-emerald-100/90 relative z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  86% Win Rate
                </span>
              </div>
            </div>

            {/* Card 4: Average First-Submission TAT */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50/90 via-fuchsia-50/40 to-purple-50/70 border border-purple-200/80 hover:border-purple-400 rounded-3xl p-5 shadow-2xs hover:shadow-md transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all" />
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[11px] font-black text-purple-900 uppercase tracking-wider">AVERAGE FIRST-SUB TAT</span>
                <div className="w-9 h-9 rounded-2xl bg-purple-600/10 border border-purple-200 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <p className="text-3.5xl font-black text-slate-900 tabular-nums my-1.5 tracking-tight relative z-10">2.4 Days</p>
              <div className="flex items-center gap-1.5 pt-2 border-t border-purple-100/90 relative z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-purple-100 text-purple-900 border border-purple-200">
                  <Zap className="w-3 h-3 text-purple-700" />
                  Fastest Turnaround
                </span>
              </div>
            </div>
          </div>

          {/* REQUIREMENT SUBMISSIONS DASHBOARD TABLE */}
          {renderSubmissionsDashboardCard()}
        </div>
      ) : (
        /* ======================================================================== */
        /* VIEW MODE 2: SUPER ADMIN / ADMIN STARTING PAGE WITH TABLES               */
        /* ======================================================================== */
        <div className="space-y-6">
          {/* Super Admin / Dev Team Executive KPIs */}
          {(role === 'superadmin' || role === 'devteam') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-4 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#5B51D8] uppercase tracking-wider">Total Hires Joined</span>
                  <Award className="w-4 h-4 text-[#5B51D8]" />
                </div>
                <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{superAdminKPIs.totalHires}</p>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+24% YoY Company Growth</span>
                </span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">Total Sourced</span>
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{superAdminKPIs.totalSourced}</p>
                <span className="text-[10px] text-blue-600 font-medium">Across all teams</span>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Offer Acceptance</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{superAdminKPIs.offerAcceptanceRate}</p>
                <span className="text-[10px] text-emerald-600 font-bold">High offer retention</span>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider">Avg Time to Hire</span>
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{superAdminKPIs.avgTimeToHire}</p>
                <span className="text-[10px] text-purple-600 font-medium">Industry Benchmark: 21 Days</span>
              </div>

              <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2 shadow-2xs border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">Org Conversion %</span>
                  <TrendingUp className="w-4 h-4 text-purple-300" />
                </div>
                <p className="text-2xl font-extrabold text-white tabular-nums">{superAdminKPIs.overallConversion}</p>
                <span className="text-[10px] text-purple-200 font-medium">Sourced to Hired</span>
              </div>
            </div>
          )}

          {/* RECRUITER REQUIREMENT SUBMISSIONS DASHBOARD(S) */}
          {role === 'lead' ? (
            <div className="space-y-5">
              {/* TOGGLE BAR FOR TEAM LEAD MODULE: INDIVIDUAL SUBMISSIONS VS TEAM MEMBERS SUBMISSIONS */}
              <div className="bg-[#F8FAFC] p-2 rounded-2xl border border-slate-200/90 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setLeadDashboardTab('individual')}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                      leadDashboardTab === 'individual'
                        ? 'bg-[#6B3BF6] text-white shadow-md'
                        : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Team Lead Individual Submissions</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLeadDashboardTab('team_members')}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                      leadDashboardTab === 'team_members'
                        ? 'bg-[#6B3BF6] text-white shadow-md'
                        : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Team Members Submissions</span>
                  </button>
                </div>

                <div className="text-xs text-slate-600 font-extrabold px-3.5 py-1.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                  {leadDashboardTab === 'individual'
                    ? 'Showing Harish Gadipally (Team Lead Individual)'
                    : 'Showing Overall Recruiters (Excludes Lead Performance)'}
                </div>
              </div>

              {leadDashboardTab === 'individual' ? (
                /* DASHBOARD 1: TEAM LEAD INDIVIDUAL PERFORMANCE */
                renderSubmissionsDashboardCard({
                  type: 'lead_self',
                  title: 'Team Lead Individual Submissions Dashboard',
                  subtitle: 'Showing requirement submissions, received date/time, first submission date/time, and TAT turnaround SLA for Harish Gadipally (Team Lead Individual).',
                  leadName: 'Harish Gadipally',
                })
              ) : (
                /* DASHBOARD 2: OVERALL TEAM RECRUITERS PERFORMANCE (EXCLUDES LEAD INDIVIDUAL DATA) */
                renderSubmissionsDashboardCard({
                  type: 'team_members_only',
                  title: 'Team Recruiters Overall Submissions Dashboard',
                  subtitle: 'Requirement-wise breakdown of recruiter submissions, requirement received timestamp, first submission date/time, and calculated TAT for team members (Excludes Lead Individual Data).',
                  leadName: 'Harish Gadipally',
                })
              )}
            </div>
          ) : (
            renderSubmissionsDashboardCard({
              type: (role as string) === 'recruiter' ? 'recruiter_self' : 'overall_company',
              title: (role as string) === 'recruiter' ? 'Requirement Submissions Dashboard' : 'Overall Requirement Submissions Dashboard',
              subtitle: (role as string) === 'recruiter'
                ? `Showing requirement submissions, received date/time, first submission date/time, and TAT turnaround SLA for ${myPersonalProfile.name}.`
                : 'Requirement-wise breakdown of recruiter submissions, number of positions, client name, timestamp, and first submission date & time.',
            })
          )}




          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5 font-sans">
            {/* Top Sub-tabs */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setActiveSubTab('recruiter')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeSubTab === 'recruiter'
                      ? 'bg-purple-50 text-[#6B3BF6] border border-purple-200 shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Users className="w-4 h-4 text-[#6B3BF6]" />
                  <span>Recruiter Performance</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#6B3BF6]/10 text-[#6B3BF6]">
                    {recruitersPerformanceList.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveSubTab('dashboard')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    activeSubTab === 'dashboard'
                      ? 'bg-purple-50 text-[#6B3BF6] border border-purple-200 shadow-2xs font-bold'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <PieIcon className="w-4 h-4 text-[#6B3BF6]" />
                  <span>Req Submissions Dashboard</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#6B3BF6]/10 text-[#6B3BF6]">
                    {RECRUITER_REQ_SUBMISSION_DASHBOARD_DATA.length}
                  </span>
                </button>

                {role !== 'lead' && (
                  <button
                    onClick={() => setActiveSubTab('client')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                      activeSubTab === 'client'
                        ? 'bg-purple-50 text-[#6B3BF6] border border-purple-200 shadow-2xs font-bold'
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-[#6B3BF6]" />
                    <span>Client Performance</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#6B3BF6]/10 text-[#6B3BF6]">
                      {clientPerformanceList.length}
                    </span>
                  </button>
                )}
              </div>

              {role !== 'lead' && (
                <button
                  onClick={() => setActiveReportView('charts')}
                  className="text-xs font-bold text-[#6B3BF6] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#6B3BF6]" />
                  <span>Open Interactive Charts Page →</span>
                </button>
              )}
            </div>

            {/* Recruiter Performance Tab */}
            {activeSubTab === 'recruiter' && (
              <div className="space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Recruiter Performance</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Individual metrics, daily targets, and weekly progress ({recruitersPerformanceList.length} total members including Team Lead).
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative w-full sm:w-56">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search recruiter..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6]"
                      />
                    </div>

                    <select
                      value={clientFilter}
                      onChange={e => setClientFilter(e.target.value)}
                      className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
                    >
                      <option value="All Clients">All Clients</option>
                      {allUniqueClientsList.map(c => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>

                    <select
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value)}
                      className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
                    >
                      <option value="All Statuses">Sort by Status</option>
                      <option value="On Track">On Track</option>
                      <option value="Warning">Warning</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3.5 px-4 w-10 text-center">#</th>
                        <th className="py-3.5 px-4">RECRUITER / MEMBER</th>
                        <th className="py-3.5 px-4">TEAM LEAD & ASSIGNED CLIENT</th>
                        <th className="py-3.5 px-4">REQUIREMENTS COUNT</th>
                        <th className="py-3.5 px-4">TOTAL POSITIONS</th>
                        <th className="py-3.5 px-4">TOTAL SUBMISSIONS</th>
                        <th className="py-3.5 px-4">SUBMITTED TO (CLIENT)</th>
                        <th className="py-3.5 px-4">TOTAL INTERVIEWS</th>
                        <th className="py-3.5 px-4">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {paginatedRecruiters.map((r, index) => {
                        const rankNumber = (recruiterPage - 1) * recruiterPageSize + index + 1
                        const leadName = r.teamLead || 'Harish Gadipally'
                        const primaryClientName = r.primaryClient || 'Accenture'
                        const clientBreakdownList = getRecruiterClientBreakdown(r).map(b => b.client)
                        const displayClients = clientBreakdownList.length > 0 ? clientBreakdownList : [primaryClientName]
                        const isTeamLead = r.role.toLowerCase().includes('lead') || r.name.includes('(Team Lead)')
                        const showTeamGroupHeader = index === 0 || paginatedRecruiters[index - 1].teamLead !== r.teamLead

                        return (
                          <React.Fragment key={r.id}>
                            {/* Team Pod Header Banner */}
                            {showTeamGroupHeader && (
                              <tr className="bg-slate-100/90 text-xs font-bold text-slate-800 border-y border-slate-200">
                                <td colSpan={9} className="py-2 px-4 bg-[#6B3BF6]/5 border-l-4 border-l-[#6B3BF6]">
                                  <div className="flex items-center gap-2">
                                    <Crown className="w-4 h-4 text-[#6B3BF6]" />
                                    <span className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">
                                      {r.team || 'RECRUITMENT POD'} — TEAM LEAD: {r.teamLead}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            )}

                            <tr
                              onClick={() => setSelectedRecruiter(r)}
                              className="hover:bg-purple-50/40 transition-colors cursor-pointer group"
                            >
                              <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                                {isTeamLead ? '👑' : rankNumber}
                              </td>

                              {/* RECRUITER / MEMBER */}
                              <td className="py-3.5 px-4">
                                <div className={`flex items-center gap-2.5 ${!isTeamLead ? 'pl-3' : ''}`}>
                                  <div className="w-8 h-8 rounded-full bg-purple-100 text-[#6B3BF6] font-bold flex items-center justify-center text-xs shrink-0 border border-purple-200">
                                    {r.avatar}
                                  </div>
                                  <div>
                                    <div className="font-bold text-slate-900 group-hover:text-[#6B3BF6] transition-colors flex items-center gap-1.5">
                                      {!isTeamLead && <span className="text-slate-400 font-normal">↳</span>}
                                      <span>{r.name}</span>
                                      {isTeamLead ? (
                                        <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                                          <Crown className="w-2.5 h-2.5" />
                                          <span>Team Lead</span>
                                        </span>
                                      ) : (
                                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                          Team Member
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[10px] text-slate-500 font-medium">{r.role} • {r.team}</div>
                                  </div>
                                </div>
                              </td>

                              {/* TEAM LEAD & ASSIGNED CLIENT */}
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1">
                                  {isTeamLead ? (
                                    <span>👑 Team Lead (Self)</span>
                                  ) : (
                                    <span>Reports to: {leadName}</span>
                                  )}
                                </div>
                                <div className="text-[10px] text-purple-700 font-extrabold flex items-center gap-1 mt-0.5">
                                  <Building2 className="w-3 h-3 text-purple-600 inline" />
                                  <span>{primaryClientName}</span>
                                </div>
                              </td>

                              {/* REQUIREMENTS COUNT */}
                              <td className="py-3.5 px-4">
                                <span className="font-extrabold text-blue-600 underline hover:text-blue-800 tabular-nums">
                                  {r.requirementsCount} Reqs
                                </span>
                              </td>

                              {/* TOTAL POSITIONS */}
                              <td className="py-3.5 px-4">
                                <span className="font-extrabold text-indigo-700 tabular-nums">
                                  {r.requirementsCount ? r.requirementsCount * 3 : 12} Positions
                                </span>
                              </td>

                              {/* TOTAL SUBMISSIONS */}
                              <td className="py-3.5 px-4">
                                <span className="font-extrabold text-purple-700 underline hover:text-purple-900 tabular-nums">
                                  {r.submissionsCount} Submissions
                                </span>
                              </td>

                              {/* SUBMITTED TO (CLIENT) */}
                              <td className="py-3.5 px-4" onClick={e => e.stopPropagation()}>
                                <SubmittedClientsPillCell clients={displayClients} />
                              </td>

                              {/* TOTAL INTERVIEWS */}
                              <td className="py-3.5 px-4 font-extrabold text-slate-800 tabular-nums">
                                {r.interviewsCount || 0} Interviews
                              </td>

                              {/* STATUS */}
                              <td className="py-3.5 px-4">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                  ● {r.status}
                                </span>
                              </td>
                            </tr>
                          </React.Fragment>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <PaginationFooter
                  currentPage={recruiterPage}
                  totalPages={Math.ceil(filteredRecruiters.length / recruiterPageSize)}
                  totalItems={filteredRecruiters.length}
                  pageSize={recruiterPageSize}
                  onPageChange={setRecruiterPage}
                  onPageSizeChange={setRecruiterPageSize}
                  itemLabel="recruiters"
                />
              </div>
            )}

            {/* Client Performance Tab */}
            {activeSubTab === 'client' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Client Performance</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Metrics by client — click any client account row to open deep analytics, or select a particular client in the chart below to inspect performance.
                  </p>
                </div>



                <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3.5 px-4">CLIENT</th>
                        <th className="py-3.5 px-4">REQ SENT</th>
                        <th className="py-3.5 px-4">REQ ASSIGNED</th>
                        <th className="py-3.5 px-4">SUBMISSIONS</th>
                        <th className="py-3.5 px-4">SUB. RATIO</th>
                        <th className="py-3.5 px-4">OPEN</th>
                        <th className="py-3.5 px-4">CLOSED</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {clientPerformanceList.map(cli => (
                        <tr
                          key={cli.id}
                          onClick={() => setSelectedClient(cli)}
                          className="hover:bg-purple-50/40 transition-colors cursor-pointer group"
                        >
                          <td className="py-3.5 px-4 font-extrabold text-slate-900 group-hover:text-[#6B3BF6] transition-colors">
                            {cli.clientName}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-extrabold text-[#2563EB] underline hover:text-blue-800 tabular-nums">
                              {cli.reqSent}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-extrabold text-[#2563EB] underline hover:text-blue-800 tabular-nums">
                              {cli.reqAssigned}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-extrabold text-[#2563EB] underline hover:text-blue-800 tabular-nums">
                              {cli.submissions}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-extrabold text-slate-800 tabular-nums">
                            {cli.subRatio.toFixed(2)}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-extrabold text-[#2563EB] underline hover:text-blue-800 tabular-nums">
                              {cli.openReqs}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            {cli.closedReqs > 0 ? (
                              <span className="font-extrabold text-[#2563EB] underline hover:text-blue-800 tabular-nums">
                                {cli.closedReqs}
                              </span>
                            ) : (
                              <span className="font-extrabold text-slate-400 tabular-nums">0</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Requirement-Wise Submissions Dashboard Tab */}
            {activeSubTab === 'dashboard' && (
              <div className="animate-in fade-in duration-150 space-y-8">
                {role === 'lead' ? (
                  <>
                    {renderSubmissionsDashboardCard({
                      type: 'lead_self',
                      title: 'Team Lead Individual Submissions Dashboard',
                      subtitle: 'Showing requirement submissions, received date/time, first submission date/time, and TAT turnaround SLA for Harish Gadipally (Team Lead Individual).',
                      leadName: 'Harish Gadipally',
                    })}
                    {renderSubmissionsDashboardCard({
                      type: 'team_members_only',
                      title: 'Team Recruiters Overall Submissions Dashboard',
                      subtitle: 'Requirement-wise breakdown of recruiter submissions, requirement received timestamp, first submission date/time, and calculated TAT for team members (Excludes Lead Individual Data).',
                      leadName: 'Harish Gadipally',
                    })}
                  </>
                ) : (
                  renderSubmissionsDashboardCard({
                    type: (role as string) === 'recruiter' ? 'recruiter_self' : 'overall_company',
                    title: (role as string) === 'recruiter' ? 'Requirement Submissions Dashboard' : 'Overall Requirement Submissions Dashboard',
                    subtitle: (role as string) === 'recruiter'
                      ? `Showing requirement submissions, received date/time, first submission date/time, and TAT turnaround SLA for ${myPersonalProfile.name}.`
                      : 'Requirement-wise breakdown of recruiter submissions, number of positions, client name, timestamp, and first submission date & time.',
                  })
                )}
              </div>
            )}


          </div>
        </div>
      )}

      {/* REASON MODAL FOR RECRUITER */}
      {reasonModalReq && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#6B3BF6]" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Non-Submission Reason Note ({reasonModalReq.id})
                </h3>
              </div>
              <button
                onClick={() => setReasonModalReq(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Provide or select the reason why no submissions have been made yet for requirement <strong className="text-slate-800">{reasonModalReq.title}</strong>:
            </p>

            {/* Quick Preset Chips */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Quick Select Common Reasons:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Client JD requirements unclear / pending clarification',
                  'Candidate salary expectation exceeds client budget',
                  'Location constraint / No local candidates available',
                  'Requirement put on hold by hiring manager',
                  'Niche skill set requiring extended sourcing timeline',
                ].map(preset => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setReasonNoteText(preset)}
                    className="text-[10px] font-semibold bg-slate-100 hover:bg-purple-50 hover:text-[#6B3BF6] hover:border-purple-200 border border-slate-200 px-2.5 py-1 rounded-xl text-slate-700 transition-all cursor-pointer text-left"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Custom Reason Note:
              </label>
              <textarea
                rows={3}
                value={reasonNoteText}
                onChange={e => setReasonNoteText(e.target.value)}
                placeholder="Type your custom non-submission reason or details here..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setReasonModalReq(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveReason}
                className="px-4 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                Save Reason Note
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
