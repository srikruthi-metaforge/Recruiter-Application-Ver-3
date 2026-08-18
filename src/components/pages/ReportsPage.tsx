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

interface ReportsPageProps {
  role?: Role
}

export function ReportsPage({ role = 'recruiter' }: ReportsPageProps) {
  // Active View Mode: 'self' (Self Performance) | 'charts' (Open Interactive Charts Page) | 'team' (Team Performance Tables)
  const [activeReportView, setActiveReportView] = useState<'self' | 'charts' | 'team'>(
    role === 'recruiter' ? 'self' : 'team'
  )

  const [activeSubTab, setActiveSubTab] = useState<'recruiter' | 'client'>('recruiter')
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

  // Active Logged-In Recruiter Personal Profile Data
  const [myPersonalProfile, setMyPersonalProfile] = useState<RecruiterDetailData>({
    id: 'rec-7',
    name: 'Harish Gadipally',
    role: 'Lead Recruiter',
    team: 'Engineering Team',
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
      { id: 'REQ-701', title: 'Lead Java Full Stack Developer', client: 'LTTS Automotive', status: 'Worked', submissions: 42, interviews: 12 },
      { id: 'REQ-702', title: 'Senior React Native Mobile Dev', client: 'TCS Cyber', status: 'Worked', submissions: 36, interviews: 10 },
      { id: 'REQ-703', title: 'Cloud Solutions Architect', client: 'Infosys', status: 'Worked', submissions: 28, interviews: 8 },
      { id: 'REQ-704', title: 'Cyber Security Analyst', client: 'HCL Technologies', status: 'Non-Worked', submissions: 0, interviews: 0, reasonNote: 'Client JD requirements pending clarification' },
      { id: 'REQ-705', title: 'AUTOSAR Embedded Engineer', client: 'Continental', status: 'Non-Worked', submissions: 0, interviews: 0, reasonNote: 'Location constraint / No local candidates available' },
    ],
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
          <div className="flex items-center gap-3">
            {activeReportView !== 'team' && (
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
              {activeReportView === 'charts'
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

            {activeReportView === 'self' && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EEF2FF] text-[#5B51D8] border border-[#C7D2FE] inline-flex items-center gap-1.5 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5B51D8]" />
                <span>My Individual Performance View</span>
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500 mt-1">
            {activeReportView === 'charts'
              ? 'Executive visual charts, monthly timelines, coverage ratios, and client POC analytics.'
              : activeReportView === 'self'
              ? 'Your personal sourcing metrics, conversion funnel, assigned requirements, and turnaround time.'
              : 'Company-wide hiring performance, recruiter performance table, and client performance records.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Main View Mode Toggle (Self Performance vs Team Performance) — Hidden for Super Admin & Dev Team */}
          {role !== 'recruiter' && role !== 'superadmin' && role !== 'devteam' && (
            <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-2xl text-xs font-bold shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveReportView(activeReportView === 'self' ? 'team' : 'self')}
                className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeReportView === 'self'
                    ? 'bg-[#6B3BF6] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Self Performance</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveReportView(activeReportView === 'charts' ? 'team' : 'charts')}
                className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeReportView === 'charts'
                    ? 'bg-[#6B3BF6] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Team Performance</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================================== */}
      {/* VIEW MODE 1: DEDICATED VISUAL ANALYTICS & CHARTS PAGE                    */}
      {/* ======================================================================== */}
      {activeReportView === 'charts' ? (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between bg-purple-50 border border-purple-200 p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#6B3BF6]" />
              <div>
                <h3 className="text-sm font-extrabold text-purple-950">Executive Visual Charts & Analytics Dashboard</h3>
                <p className="text-xs text-purple-700">Displaying all 5 analytics charts (Recruiter Sourcing, Monthly Timeline, Coverage Ratio, Client POC, Domain Analysis)</p>
              </div>
            </div>
            <button
              onClick={() => setActiveReportView('team')}
              className="px-3 py-1.5 bg-white text-[#6B3BF6] font-bold text-xs rounded-xl border border-purple-200 shadow-2xs hover:bg-purple-100 transition-all cursor-pointer"
            >
              Back to Recruiter & Client Tables
            </button>
          </div>

          {/* Chart 1: Recruiter Performance Sourcing & TAT Trend Combo Chart */}
          <RecruiterPerformanceChart role={role} />

          {/* Chart 2: Monthly Timeline Requirements vs Total Submissions */}
          <MonthlyTimelinePerformanceChart />

          {/* Chart 2.5: Stage Pipeline Performance Chart */}
          <StagePipelinePerformanceChart />

          {/* Chart 3: Requirement Coverage Pie Chart */}
          <RequirementCoverageChart />

          {/* Chart 4: Client POC Submissions vs Total Requirements */}
          <ClientPOCSubmissionChart role={role} />

          {/* Chart 5: Domain / Department Submission Analysis */}
          {role !== 'lead' && <DomainWiseSubmissionChart />}

          {/* Chart 6: Overall Particular Client-wise Performance & Team Breakdown Chart */}
          <ClientWiseTeamPerformanceChart />
        </div>
      ) : activeReportView === 'self' || role === 'recruiter' ? (
        /* ======================================================================== */
        /* VIEW MODE 2: SELF PERFORMANCE (INDIVIDUAL PERFORMANCE OVERVIEW)          */
        /* ======================================================================== */
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* 4 Individual Performance KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Submissions */}
            <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-5 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#5B51D8] uppercase tracking-wider">Total Submissions</span>
                <Send className="w-4 h-4 text-[#5B51D8]" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{myPersonalProfile.submissionsCount}</p>
              <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1 pt-1 border-t border-[#C7D2FE]/60">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>Shortlisted: {myPersonalProfile.shortlistedCount}</span>
              </div>
            </div>

            {/* Card 2: Total Requirements */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">Total Requirements</span>
                <Briefcase className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{myPersonalProfile.requirementsCount}</p>
              <div className="text-xs font-semibold text-blue-700 flex items-center justify-between pt-1 border-t border-blue-200/60">
                <span>Worked: {myPersonalProfile.workedReqs}</span>
                <span className="text-amber-700">Non-Worked: {myPersonalProfile.nonWorkedReqs}</span>
              </div>
            </div>

            {/* Card 3: First Submissions / Won Requirements */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">First Submissions / Won</span>
                <Trophy className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{myPersonalProfile.workedReqs}</p>
              <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1 pt-1 border-t border-emerald-200/60">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{Math.round((myPersonalProfile.workedReqs / myPersonalProfile.requirementsCount) * 100)}% Win Rate</span>
              </div>
            </div>

            {/* Card 4: Average First-Submission TAT */}
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider">Average First-Sub TAT</span>
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 tabular-nums">2.4 Days</p>
              <div className="text-xs font-semibold text-purple-700 flex items-center gap-1 pt-1 border-t border-purple-200/60">
                <Zap className="w-3.5 h-3.5" />
                <span>Fastest Turnaround</span>
              </div>
            </div>
          </div>

          {/* 1) My Assigned Requirements Breakdown Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-4.5 h-4.5 text-[#6B3BF6]" />
                  <span>My Assigned Requirements Breakdown ({myPersonalProfile.requirementsList.length})</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Detailed status of requirements assigned to {myPersonalProfile.name}
                </p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setPersonalTab('worked')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    personalTab === 'worked' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600'
                  }`}
                >
                  Worked ({myPersonalProfile.workedReqs})
                </button>
                <button
                  onClick={() => setPersonalTab('non_worked')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    personalTab === 'non_worked' ? 'bg-white text-amber-700 shadow-2xs font-bold' : 'text-slate-600'
                  }`}
                >
                  Non-Worked ({myPersonalProfile.nonWorkedReqs})
                </button>
              </div>
            </div>

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
                      strokeDasharray="50, 100"
                      strokeWidth="4"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-extrabold text-slate-900 leading-none">6</span>
                    <span className="text-[10px] font-semibold text-slate-500">Assigned</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#2563EB] shrink-0" />
                    <span className="font-bold text-slate-800">Worked REQs:</span>
                    <span className="font-extrabold text-[#2563EB]">3 REQs (50%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                    <span className="font-bold text-slate-800">Non-Worked REQs:</span>
                    <span className="font-extrabold text-amber-700">3 REQs (50%)</span>
                  </div>
                </div>
              </div>

              {/* Non-Worked Reasons Summary Diagram Panel */}
              <div className="w-full md:w-1/2 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2 text-xs">
                <div className="font-extrabold text-slate-900 border-b border-slate-100 pb-1.5 flex items-center justify-between">
                  <span>Non-Worked Reasons Summary Diagram</span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">3 Unworked REQs</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-slate-700 bg-amber-50/50 px-2.5 py-1 rounded-lg border border-amber-100">
                    <span className="font-medium truncate">• Low CTC budget approval from client</span>
                    <span className="font-bold text-amber-900 shrink-0 ml-2">1 REQ (33%)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700 bg-amber-50/50 px-2.5 py-1 rounded-lg border border-amber-100">
                    <span className="font-medium truncate">• Priority shifted to urgent LTTS REQ</span>
                    <span className="font-bold text-amber-900 shrink-0 ml-2">1 REQ (33%)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700 bg-amber-50/50 px-2.5 py-1 rounded-lg border border-amber-100">
                    <span className="font-medium truncate">• Awaiting updated JD & location clarification</span>
                    <span className="font-bold text-amber-900 shrink-0 ml-2">1 REQ (33%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-4">REQUIREMENT TITLE & ID</th>
                    <th className="py-3.5 px-4">CLIENT NAME</th>
                    <th className="py-3.5 px-4 text-center">SUBMISSIONS</th>
                    <th className="py-3.5 px-4">WORKED STATUS</th>
                    <th className="py-3.5 px-4">NON-SUBMISSION REASON NOTE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {myPersonalProfile.requirementsList
                    .filter(req => (personalTab === 'worked' ? req.status === 'Worked' : req.status === 'Non-Worked'))
                    .map(req => (
                      <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          <div>{req.title}</div>
                          <span className="text-[10px] text-slate-400 font-normal">{req.id}</span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-purple-700">{req.client}</td>
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
                                className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                              >
                                <MessageCircle className="w-3.5 h-3.5 text-amber-700" />
                                <span>+ Add Reason Note</span>
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

          {/* 2) Monthly: Requirements vs Total Submissions with TAT Trend (Apr-Jul 2026) */}
          <MonthlyTimelinePerformanceChart />

          {/* 3) Requirements and Candidate Submissions by Interview Stage */}
          <StagePipelinePerformanceChart />
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

          {/* Quick Banner to Switch to Visual Charts */}
          <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/80 p-4 rounded-2xl shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6B3BF6] text-white flex items-center justify-center font-extrabold shadow-2xs">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Executive Analytics Charts & Visual Trends</h3>
                <p className="text-xs text-slate-600">View Recruiter Sourcing Graphs, Monthly Timelines, Coverage Pie Charts & Client POC Analytics</p>
              </div>
            </div>
          </div>

          {/* All Recruiters / Client Performance Tables */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5 font-sans">
            {/* Top Sub-tabs */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
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
                                <td colSpan={8} className="py-2 px-4 bg-[#6B3BF6]/5 border-l-4 border-l-[#6B3BF6]">
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

                {/* OVERALL PERFORMANCE CHART FOR PARTICULAR CLIENT */}
                <ClientWiseTeamPerformanceChart />

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

            {/* Client-wise Team Performance Graphs Tab */}
            {activeSubTab === 'client_graphs' && (
              <div className="animate-in fade-in duration-150">
                <ClientWiseTeamPerformanceChart />
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
