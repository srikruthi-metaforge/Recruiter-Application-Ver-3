import React, { useState, useMemo } from 'react'
import {
  History,
  Users,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  Search,
  Filter,
  Download,
  Eye,
  RefreshCw,
  Briefcase,
  ShieldCheck,
  Layers,
  ChevronRight,
  PauseCircle,
  PlayCircle,
  BarChart3,
  UserCheck,
  ChevronDown,
  XCircle,
} from 'lucide-react'
import { Role } from '../../types'
import { PaginationFooter } from '../ui/PaginationFooter'

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
  sourcedProfilesCount: number // Candidate Repository history
  submittedProfilesCount: number // Total Submissions page count
  workingProfilesCount: number // Active in progress / working candidates
  onHoldProfilesCount: number // On hold candidates
  placedCount: number // Offers accepted / joined
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

const RECRUITERS_HISTORY_DATA: RecruiterHistoryItem[] = [
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
    submittedProfilesCount: 12,
    workingProfilesCount: 6,
    onHoldProfilesCount: 2,
    placedCount: 1,
    topSkillsSourced: ['DevOps', 'Kubernetes', 'Terraform', 'CI/CD'],
    recentSourcedCandidates: [
      { id: 'CAND-014', candidateName: 'Siddharth Sen', requirementName: 'Kubernetes Cloud Engineer', clientName: 'Goldman Sachs', sourcedDate: 'Jul 29, 2026', status: 'Submitted', experience: '6 yrs' },
    ],
    assignedRequirementsList: [
      { id: 'REQ-009', reqName: 'Cloud SRE Engineer', clientName: 'Goldman Sachs', status: 'Open', assignedDate: 'Jul 25, 2026', submissionsCount: 12 },
    ],
  },
  {
    id: 'HIST-107',
    recruiterName: 'Harish Gadipally',
    recruiterEmail: 'harish.g@metaforgeit.com',
    recruiterAvatar: 'H',
    roleTitle: 'Senior Recruiting Lead / Team Lead',
    userRole: 'lead',
    teamLead: 'Harish Gadipally (Self)',
    clientAccounts: ['Accenture', 'LTTS'],
    assignedRequirementsCount: 45,
    sourcedProfilesCount: 142,
    submittedProfilesCount: 98,
    workingProfilesCount: 32,
    onHoldProfilesCount: 8,
    placedCount: 6,
    topSkillsSourced: ['Full Stack', 'Cloud Architecture', 'Tech Lead', 'Spring'],
    recentSourcedCandidates: [
      { id: 'CAND-015', candidateName: 'Rajesh K', requirementName: 'Principal Architect', clientName: 'LTTS', sourcedDate: 'Aug 08, 2026', status: 'Submitted', experience: '14 yrs' },
    ],
    assignedRequirementsList: [
      { id: 'REQ-010', reqName: 'Principal Solutions Architect', clientName: 'LTTS', status: 'In Progress', assignedDate: 'Jun 15, 2026', submissionsCount: 45 },
    ],
  },
]

interface HistoryPageProps {
  role: Role
}

export function HistoryPage({ role }: HistoryPageProps) {
  // Search State
  const [searchQuery, setSearchQuery] = useState('')

  // Selected Recruiter Drawer / Modal State
  const [selectedRecruiterDetail, setSelectedRecruiterDetail] = useState<RecruiterHistoryItem | null>(null)
  const [modalTab, setModalTab] = useState<'sourced' | 'requirements'>('sourced')

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8

  // Permission Guard: Only visible to Super Admin, Admin, and Dev Team
  const isAuthorized = role === 'superadmin' || role === 'admin' || role === 'devteam'

  // Filtered List
  const filteredRecruiters = useMemo(() => {
    return RECRUITERS_HISTORY_DATA.filter(rec => {
      // Text Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchName = rec.recruiterName.toLowerCase().includes(q)
        const matchEmail = rec.recruiterEmail.toLowerCase().includes(q)
        const matchLead = rec.teamLead.toLowerCase().includes(q)
        const matchClients = rec.clientAccounts.some(c => c.toLowerCase().includes(q))
        const matchSkills = rec.topSkillsSourced.some(s => s.toLowerCase().includes(q))
        if (!matchName && !matchEmail && !matchLead && !matchClients && !matchSkills) return false
      }
      return true
    })
  }, [searchQuery])

  // Paginated List
  const paginatedRecruiters = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredRecruiters.slice(start, start + pageSize)
  }, [filteredRecruiters, currentPage])

  const totalPages = Math.ceil(filteredRecruiters.length / pageSize) || 1

  // Summary Totals
  const totals = useMemo(() => {
    return RECRUITERS_HISTORY_DATA.reduce(
      (acc, r) => {
        acc.requirements += r.assignedRequirementsCount
        acc.sourced += r.sourcedProfilesCount
        acc.submitted += r.submittedProfilesCount
        acc.working += r.workingProfilesCount
        acc.onHold += r.onHoldProfilesCount
        acc.placed += r.placedCount
        return acc
      },
      { requirements: 0, sourced: 0, submitted: 0, working: 0, onHold: 0, placed: 0 }
    )
  }, [])

  // Export CSV Handler
  const handleExportCSV = () => {
    const headers = [
      'Recruiter Name',
      'Email',
      'Role Title',
      'Team Lead',
      'Assigned Requirements',
      'Sourced Profiles (Repo History)',
      'Profiles Submitted',
      'Working Profiles (In Progress)',
      'On Hold Profiles',
      'Placed Candidates'
    ]

    const rows = filteredRecruiters.map(r => {
      return [
        `"${r.recruiterName}"`,
        `"${r.recruiterEmail}"`,
        `"${r.roleTitle}"`,
        `"${r.teamLead}"`,
        r.assignedRequirementsCount,
        r.sourcedProfilesCount,
        r.submittedProfilesCount,
        r.workingProfilesCount,
        r.onHoldProfilesCount,
        r.placedCount
      ]
    })

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `Recruiter_Sourcing_Performance_History_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isAuthorized) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12 space-y-4 shadow-xl font-sans">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Restricted Access Module</h2>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">
          The <strong>History</strong> module is accessible exclusively to Administrators and Super Admins.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 w-full pb-20 font-sans text-slate-800 animate-in fade-in duration-200">
      {/* 1. HEADER & EXPORT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Recruiter Performance & Sourcing History
            </h1>
            <span className="px-3 py-1 bg-purple-50 text-[#6B3BF6] text-xs font-extrabold rounded-full border border-purple-200 flex items-center gap-1.5 shadow-2xs">
              <History className="w-3.5 h-3.5 text-[#6B3BF6]" />
              <span>Admin & Super Admin Module</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Centralized history tracking assigned requirements, repository sourced profiles, submitted candidates, active working pipeline, and on-hold candidate records per recruiter
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white rounded-xl text-xs font-extrabold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export History Report (CSV)</span>
          </button>
        </div>
      </div>

      {/* 2. SUMMARY KPI CARDS BANNER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* ASSIGNED REQUIREMENTS */}
        <div className="bg-gradient-to-br from-blue-50/90 to-indigo-50/50 border border-blue-200/80 rounded-2xl p-4.5 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-blue-700">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Assigned Reqs</span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight font-mono">
            {totals.requirements} Reqs
          </div>
          <div className="text-[11px] text-blue-700 font-medium">
            Active requirement allocations
          </div>
        </div>

        {/* SOURCED PROFILES (CANDIDATE REPO HISTORY) */}
        <div className="bg-gradient-to-br from-purple-50/90 to-indigo-50/50 border border-purple-200/80 rounded-2xl p-4.5 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-purple-700">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Sourced Profiles</span>
            <Users className="w-4 h-4 text-[#6B3BF6]" />
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight font-mono">
            {totals.sourced} Sourced
          </div>
          <div className="text-[11px] text-purple-700 font-medium">
            Added to candidate repository
          </div>
        </div>

        {/* PROFILES SUBMITTED */}
        <div className="bg-gradient-to-br from-emerald-50/90 to-teal-50/50 border border-emerald-200/80 rounded-2xl p-4.5 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-800">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Submitted Profiles</span>
            <FileText className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight font-mono">
            {totals.submitted} Submitted
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">
            Pushed to client submissions
          </div>
        </div>

        {/* WORKING PROFILES */}
        <div className="bg-gradient-to-br from-amber-50/90 to-orange-50/50 border border-amber-200/80 rounded-2xl p-4.5 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-amber-900">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Working Profiles</span>
            <PlayCircle className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight font-mono">
            {totals.working} Working
          </div>
          <div className="text-[11px] text-amber-800 font-medium">
            Active in interview pipeline
          </div>
        </div>

        {/* ON HOLD PROFILES */}
        <div className="bg-slate-900 text-white rounded-2xl p-4.5 space-y-1.5 shadow-2xs border border-slate-800">
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">On-Hold Profiles</span>
            <PauseCircle className="w-4 h-4 text-slate-300" />
          </div>
          <div className="text-2xl font-black text-white tracking-tight font-mono">
            {totals.onHold} On Hold
          </div>
          <div className="text-[11px] text-slate-300 font-medium">
            Temporarily paused candidates
          </div>
        </div>
      </div>

      {/* 3. SEARCH CONTROL */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search recruiter, email, client, skills..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 font-medium"
          />
        </div>
      </div>

      {/* 4. RECRUITER HISTORY MASTER TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">RECRUITER NAME & ROLE</th>
                <th className="py-3.5 px-4">ASSIGNED TEAM LEAD</th>
                <th className="py-3.5 px-4 text-center">ASSIGNED REQS</th>
                <th className="py-3.5 px-4 text-center">SOURCED PROFILES (REPO)</th>
                <th className="py-3.5 px-4 text-center">PROFILES SUBMITTED</th>
                <th className="py-3.5 px-4 text-center">WORKING PROFILES</th>
                <th className="py-3.5 px-4 text-center">ON HOLD</th>
                <th className="py-3.5 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {paginatedRecruiters.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 font-bold text-sm">
                    No recruiter history records match the filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedRecruiters.map(item => {
                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedRecruiterDetail(item)}
                      className="hover:bg-purple-50/40 transition-colors cursor-pointer group"
                    >
                      {/* RECRUITER NAME & ROLE */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B3BF6] to-[#5833E0] text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-2xs">
                            {item.recruiterAvatar}
                          </div>
                          <div>
                            <div className="font-extrabold text-slate-900 text-xs group-hover:text-[#6B3BF6] transition-colors">
                              {item.recruiterName}
                            </div>
                            <div className="text-[10px] text-slate-400 font-normal">{item.roleTitle}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{item.recruiterEmail}</div>
                          </div>
                        </div>
                      </td>

                      {/* ASSIGNED TEAM LEAD */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-purple-50 text-[#6B3BF6] border border-purple-200 inline-flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-[#6B3BF6]" />
                          <span>{item.teamLead}</span>
                        </span>
                      </td>

                      {/* ASSIGNED REQS */}
                      <td className="py-4 px-4 whitespace-nowrap text-center">
                        <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-200 tabular-nums">
                          {item.assignedRequirementsCount} Reqs
                        </span>
                      </td>

                      {/* SOURCED PROFILES (REPO HISTORY) */}
                      <td className="py-4 px-4 whitespace-nowrap text-center">
                        <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-purple-50 text-[#6B3BF6] border border-purple-200 tabular-nums">
                          {item.sourcedProfilesCount} Sourced
                        </span>
                      </td>

                      {/* PROFILES SUBMITTED */}
                      <td className="py-4 px-4 whitespace-nowrap text-center">
                        <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-900 border border-emerald-200 tabular-nums">
                          {item.submittedProfilesCount} Submitted
                        </span>
                      </td>

                      {/* WORKING PROFILES */}
                      <td className="py-4 px-4 whitespace-nowrap text-center">
                        <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-900 border border-amber-200 tabular-nums">
                          {item.workingProfilesCount} Working
                        </span>
                      </td>

                      {/* ON HOLD PROFILES */}
                      <td className="py-4 px-4 whitespace-nowrap text-center">
                        <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700 border border-slate-200 tabular-nums">
                          {item.onHoldProfilesCount} On Hold
                        </span>
                      </td>

                      {/* ACTION: INSPECT FULL HISTORY */}
                      <td className="py-4 px-4 whitespace-nowrap text-right" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedRecruiterDetail(item)}
                          className="px-3 py-1.5 bg-white hover:bg-purple-50 text-[#6B3BF6] border border-purple-200 rounded-xl text-xs font-extrabold shadow-2xs transition-all cursor-pointer flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#6B3BF6]" />
                          <span>View History</span>
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <PaginationFooter
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredRecruiters.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* 5. RECRUITER FULL HISTORY INSPECTION MODAL */}
      {selectedRecruiterDetail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 font-sans max-h-[90vh] overflow-y-auto">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6B3BF6] to-[#5833E0] text-white font-black text-base flex items-center justify-center shrink-0 border border-purple-300 shadow-md">
                  {selectedRecruiterDetail.recruiterAvatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">{selectedRecruiterDetail.recruiterName}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-50 text-[#6B3BF6] border border-purple-200">
                      {selectedRecruiterDetail.roleTitle}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Lead: <strong>{selectedRecruiterDetail.teamLead}</strong> • Clients: <strong>{selectedRecruiterDetail.clientAccounts.join(', ')}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedRecruiterDetail(null)}
                className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* STATS OVERVIEW CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100 text-center">
                <span className="text-[10px] font-bold text-blue-800 uppercase block">Assigned Reqs</span>
                <span className="text-xl font-black text-blue-950 font-mono">{selectedRecruiterDetail.assignedRequirementsCount}</span>
              </div>
              <div className="p-3 bg-purple-50/80 rounded-2xl border border-purple-100 text-center">
                <span className="text-[10px] font-bold text-purple-800 uppercase block">Sourced Profiles</span>
                <span className="text-xl font-black text-purple-950 font-mono">{selectedRecruiterDetail.sourcedProfilesCount}</span>
              </div>
              <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-100 text-center">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Submissions</span>
                <span className="text-xl font-black text-emerald-950 font-mono">{selectedRecruiterDetail.submittedProfilesCount}</span>
              </div>
              <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-100 text-center">
                <span className="text-[10px] font-bold text-amber-900 uppercase block">Working Pipeline</span>
                <span className="text-xl font-black text-amber-950 font-mono">{selectedRecruiterDetail.workingProfilesCount}</span>
              </div>
            </div>

            {/* MODAL TABS */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <button
                onClick={() => setModalTab('sourced')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  modalTab === 'sourced'
                    ? 'bg-[#6B3BF6] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Sourced Profiles History ({selectedRecruiterDetail.recentSourcedCandidates.length})</span>
              </button>

              <button
                onClick={() => setModalTab('requirements')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  modalTab === 'requirements'
                    ? 'bg-[#6B3BF6] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Assigned Requirements ({selectedRecruiterDetail.assignedRequirementsList.length})</span>
              </button>
            </div>

            {/* TAB CONTENT A: SOURCED PROFILES HISTORY */}
            {modalTab === 'sourced' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Candidate Repository Sourcing History for {selectedRecruiterDetail.recruiterName}
                </h4>
                <div className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-100/70 text-[10px] font-bold text-slate-600 uppercase">
                        <th className="py-2.5 px-3">CANDIDATE NAME</th>
                        <th className="py-2.5 px-3">REQUIREMENT & CLIENT</th>
                        <th className="py-2.5 px-3">SOURCED DATE</th>
                        <th className="py-2.5 px-3 text-center">CURRENT STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/70 text-slate-800 font-medium">
                      {selectedRecruiterDetail.recentSourcedCandidates.map(cand => (
                        <tr key={cand.id} className="hover:bg-white transition-colors">
                          <td className="py-2.5 px-3 font-bold text-slate-900">
                            {cand.candidateName}
                            <span className="text-[10px] text-slate-400 font-normal block">{cand.experience}</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="font-semibold text-slate-900">{cand.requirementName}</div>
                            <div className="text-[10px] text-purple-600 font-bold">{cand.clientName}</div>
                          </td>
                          <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">
                            {cand.sourcedDate}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            {cand.status === 'Submitted' && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
                                Submitted
                              </span>
                            )}
                            {cand.status === 'Working' && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                                Working (Interviewing)
                              </span>
                            )}
                            {cand.status === 'On Hold' && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-200 text-slate-700">
                                On Hold
                              </span>
                            )}
                            {cand.status === 'Sourced' && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-900 border border-purple-200">
                                Sourced (Repo)
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT B: ASSIGNED REQUIREMENTS LIST */}
            {modalTab === 'requirements' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Assigned Requirements for {selectedRecruiterDetail.recruiterName}
                </h4>
                <div className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-100/70 text-[10px] font-bold text-slate-600 uppercase">
                        <th className="py-2.5 px-3">REQUIREMENT NAME</th>
                        <th className="py-2.5 px-3">CLIENT ACCOUNT</th>
                        <th className="py-2.5 px-3">ASSIGNED DATE</th>
                        <th className="py-2.5 px-3 text-center">SUBMISSIONS</th>
                        <th className="py-2.5 px-3 text-center">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/70 text-slate-800 font-medium">
                      {selectedRecruiterDetail.assignedRequirementsList.map(req => (
                        <tr key={req.id} className="hover:bg-white transition-colors">
                          <td className="py-2.5 px-3 font-bold text-slate-900">{req.reqName}</td>
                          <td className="py-2.5 px-3 font-semibold text-purple-700">{req.clientName}</td>
                          <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">{req.assignedDate}</td>
                          <td className="py-2.5 px-3 text-center font-bold text-slate-900">{req.submissionsCount}</td>
                          <td className="py-2.5 px-3 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-900 border border-blue-200">
                              {req.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MODAL FOOTER */}
            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedRecruiterDetail(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-2xs"
              >
                Close History Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
