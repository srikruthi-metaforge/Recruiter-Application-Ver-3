import React, { useState, useMemo } from 'react'
import { Submission, Requirement, Role } from '../../types'
import { RequirementDetailOverview } from './RequirementDetailOverview'
import { CreateJobDemandForm } from './CreateJobDemandForm'
import { PaginationFooter } from '../ui/PaginationFooter'
import { PageHeader } from '../layout/PageHeader'
import { SubmissionCandidateDetailModal } from '../modals/SubmissionCandidateDetailModal'
import {
  Search,
  ChevronDown,
  FileText,
  UserCheck,
  Send,
  Calendar,
  Building,
  CheckCircle,
  Clock,
  Filter,
  Plus,
  UserPlus,
  Edit2,
  Check,
  X,
  ExternalLink,
} from 'lucide-react'

interface SubmissionsPageProps {
  role?: Role
  submissions?: Submission[]
  requirements?: Requirement[]
  onOpenSubmitCandidate?: (reqId?: string) => void
  onUpdateRequirements?: (updated: Requirement[]) => void
}

interface ScreenshotSubmission {
  id: string
  candidateName: string
  requirement: string
  reqId?: string
  clientName?: string
  experience: string
  currentCompany: string
  submittedBy: string
  submittedOn: string
  status: string
  rejectionReason?: string
}

const DEFAULT_SCREENSHOT_SUBMISSIONS: ScreenshotSubmission[] = [
  {
    id: 'SUB-201',
    candidateName: 'Alex Turner',
    requirement: 'Senior React Developer',
    reqId: 'REQ-2026-08-12-001',
    clientName: 'Accenture',
    experience: '7 Years 6 Months',
    currentCompany: 'Cognizant Technology Solutions',
    submittedBy: 'Marcus Chen',
    submittedOn: 'Aug 17, 2026',
    status: 'Submitted to Client',
  },
  {
    id: 'SUB-202',
    candidateName: 'Vidyasagar Gade',
    requirement: 'Cloud Solutions Architect',
    reqId: 'REQ-2026-08-12-003',
    clientName: 'Accenture',
    experience: '10 Years',
    currentCompany: 'Infosys Ltd',
    submittedBy: 'Priya Sharma',
    submittedOn: 'Aug 16, 2026',
    status: 'Interview Scheduled',
  },
  {
    id: 'SUB-203',
    candidateName: 'Suresh Kulkarni (Candidate)',
    requirement: 'PLM / PDM Lead Engineer',
    reqId: 'REQ-2026-08-12-004',
    clientName: 'Accenture',
    experience: '8 Years 2 Months',
    currentCompany: 'Wipro Limited',
    submittedBy: 'Suresh kulkarni',
    submittedOn: 'Aug 16, 2026',
    status: 'Rejected',
    rejectionReason: 'Technical evaluation score below threshold (C++ & PLM architecture round)',
  },
  {
    id: 'SUB-204',
    candidateName: 'Harish Gadipally (Lead Candidate)',
    requirement: 'Senior React / Fullstack Architect',
    reqId: 'REQ-2026-08-12-001',
    clientName: 'Accenture',
    experience: '12 Years',
    currentCompany: 'Metaforge IT Solutions',
    submittedBy: 'Harish Gadipally',
    submittedOn: 'Aug 15, 2026',
    status: 'Submitted to Client',
  },
  {
    id: 'SUB-205',
    candidateName: 'Rania Khalil',
    requirement: 'Java Cloud Architect',
    reqId: 'REQ-2026-08-06-005',
    clientName: 'Goldman Sachs',
    experience: '11 Years',
    currentCompany: 'Morgan Stanley',
    submittedBy: 'lakshmi.v Recruiter',
    submittedOn: 'Aug 14, 2026',
    status: 'Interview Scheduled',
  },
  {
    id: 'SUB-206',
    candidateName: 'Abhijit Narke',
    requirement: 'Java Lead Engineer',
    reqId: 'REQ-2026-08-06-005',
    clientName: 'Goldman Sachs',
    experience: '9 Years',
    currentCompany: 'Barclays India',
    submittedBy: 'Lingoji Pavani',
    submittedOn: 'Aug 14, 2026',
    status: 'Rejected',
    rejectionReason: 'Notice period exceeds 60 days budget limit',
  },
  {
    id: 'SUB-207',
    candidateName: 'Kanchan Meshram',
    requirement: 'Automotive Embedded Systems Engineer',
    reqId: 'REQ-2026-08-07-006',
    clientName: 'Tesla',
    experience: '6 Years 8 Months',
    currentCompany: 'Bosch Engineering',
    submittedBy: 'rahimoon Shaik',
    submittedOn: 'Aug 13, 2026',
    status: 'Submitted to Client',
  },
  {
    id: 'SUB-208',
    candidateName: 'Ben Wallace',
    requirement: 'Python ML Specialist',
    reqId: 'REQ-2026-08-07-007',
    clientName: 'Tesla',
    experience: '5 Years 4 Months',
    currentCompany: 'Nvidia India',
    submittedBy: 'Adirala sathvika',
    submittedOn: 'Aug 13, 2026',
    status: 'Rejected',
    rejectionReason: 'Salary expectation exceeds approved budget for Senior Machine Learning band',
  },
  {
    id: 'SUB-209',
    candidateName: 'Arpit Srivastav',
    requirement: 'SAP MM + Ariba Functional Lead',
    reqId: 'REQ-2026-07-20-009',
    clientName: 'ITC Infotech',
    experience: '8 Years',
    currentCompany: 'ITC Limited',
    submittedBy: 'Harini Sindey',
    submittedOn: 'Aug 12, 2026',
    status: 'Selected in Interview',
  },
  {
    id: 'SUB-210',
    candidateName: 'TEJENDRA RAMAN',
    requirement: '.NET Core Backend Architect',
    reqId: 'REQ-2026-06-08-001',
    clientName: 'LTTS Mobility',
    experience: '9 Years',
    currentCompany: 'HCL Technologies Ltd',
    submittedBy: 'Viswanath Reddy',
    submittedOn: 'Aug 11, 2026',
    status: 'Submitted to Client',
  },
]

export function SubmissionsPage({
  role,
  submissions = [],
  requirements = [],
  onOpenSubmitCandidate,
  onUpdateRequirements,
}: SubmissionsPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFilter, setDateFilter] = useState('All')
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedSub, setSelectedSub] = useState<ScreenshotSubmission | null>(
    null
  )

  const [selectedReqDetail, setSelectedReqDetail] = useState<Requirement | null>(null)
  const [isEditingReq, setIsEditingReq] = useState(false)
  const [editingReq, setEditingReq] = useState<Requirement | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  const handleOpenReqOverview = (reqId: string, position: string, company: string) => {
    const existing = requirements.find(r => r.id === reqId || r.title === position)
    if (existing) {
      setSelectedReqDetail(existing)
    } else {
      setSelectedReqDetail({
        id: reqId,
        title: position,
        client: company,
        company: company,
        status: 'Open',
        createdDate: '12 Aug 2026',
        submissionsCount: 7,
        interviewsCount: 2,
        owner: 'Harish Gadipally',
        assignedRecruiter: 'Harish Gadipally',
        experienceRequired: '5 - 10 Years',
        location: 'Hyderabad / Remote',
        salaryRange: '₹18 - ₹28 LPA',
        skills: ['.NET Core', 'C#', 'SQL Server', 'Microservices', 'Azure'],
        description: `Requirement details for ${position} at ${company}. Full job overview, candidate pipeline, and submission history.`,
      } as any)
    }
  }

  // Rejection reasons map (read-only in table column, set via candidate profile modal)
  const [reasons, setReasons] = useState<Record<string, string>>({
    'SUB-005': 'Notice period > 60 days',
    'SUB-007': 'Expected CTC exceeds approved budget limit',
  })

  // Map initial submissions array or screenshot default data
  const combinedSubmissions: ScreenshotSubmission[] = useMemo(() => {
    if (submissions && submissions.length > 0) {
      const mapped = submissions.map(s => ({
        id: s.id,
        candidateName: s.candidate,
        requirement: s.req || 'Senior Developer',
        experience: s.experience || '6 Years',
        currentCompany: s.client || 'Tech Enterprise',
        submittedBy: s.recruiter || 'Marcus Chen',
        submittedOn: s.date || 'Aug 06, 26',
        status: s.stage === 'Submitted' ? 'Submitted to Client' : s.stage,
      }))
      return [...DEFAULT_SCREENSHOT_SUBMISSIONS, ...mapped]
    }
    return DEFAULT_SCREENSHOT_SUBMISSIONS
  }, [submissions])

  // Scope filter: 'all' (members + lead), 'my_submissions' (lead only), 'team_members' (members only)
  const [scopeTab, setScopeTab] = useState<'all' | 'my_submissions' | 'team_members'>('all')

  // Scope submissions data for team lead and recruiter roles
  const scopeSubmissions = useMemo(() => {
    if (role === 'lead') {
      // Team Lead sees both team members' submissions and their own individual submissions
      return combinedSubmissions.filter(item => {
        const by = item.submittedBy.toLowerCase()
        if (scopeTab === 'my_submissions') {
          return by.includes('harish') || by.includes('lead')
        }
        if (scopeTab === 'team_members') {
          return !by.includes('harish') && !by.includes('lead')
        }
        // 'all' tab shows both team members and Team Lead individual submissions
        return true
      })
    }
    if (role === 'recruiter') {
      return combinedSubmissions.filter(item => {
        const by = item.submittedBy.toLowerCase()
        return by.includes('marcus') || by.includes('recruiter')
      })
    }
    return combinedSubmissions
  }, [combinedSubmissions, role, scopeTab])

  // Dynamic filter
  const filteredData = useMemo(() => {
    return scopeSubmissions.filter(item => {
      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase()
        const matchCandidate = item.candidateName.toLowerCase().includes(q)
        const matchCompany = item.currentCompany.toLowerCase().includes(q)
        const matchReq = item.requirement.toLowerCase().includes(q)
        const matchRecruiter = item.submittedBy.toLowerCase().includes(q)

        if (!matchCandidate && !matchCompany && !matchReq && !matchRecruiter) {
          return false
        }
      }

      // Date filter
      const d = item.submittedOn || ''
      if (dateFilter !== 'All') {
        if (dateFilter === 'Today') {
          if (!d.includes('Aug 17') && !d.includes('Today')) return false
        } else if (dateFilter === 'Yesterday') {
          if (!d.includes('Aug 16') && !d.includes('Yesterday')) return false
        } else if (dateFilter === 'This week' || dateFilter === 'This month') {
          if (!d.includes('Aug')) return false
        } else if (dateFilter === 'Custom range') {
          if (customStartDate && d < customStartDate) return false
          if (customEndDate && d > customEndDate) return false
        }
      }

      // Status filter
      const itemStatus = item.status.toLowerCase().trim()
      const filterVal = statusFilter.toLowerCase().trim()

      if (filterVal !== 'all') {
        if (filterVal === 'submitted to lead') {
          if (!itemStatus.includes('lead') && !itemStatus.includes('submit')) return false
        } else if (filterVal === 'interview scheduled') {
          if (!itemStatus.includes('interview')) return false
        } else if (filterVal === 'selected') {
          if (!itemStatus.includes('select')) return false
        }
      }

      return true
    })
  }, [
    scopeSubmissions,
    searchQuery,
    dateFilter,
    customStartDate,
    customEndDate,
    statusFilter,
  ])

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1

  const paginatedSubmissions = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, currentPage, pageSize])

  // Get status pill style
  const getStatusBadgeStyle = (status: string) => {
    const s = status.toLowerCase()
    if (s.includes('lead')) {
      return 'bg-purple-100 text-purple-800 border-purple-200'
    }
    if (s.includes('client')) {
      return 'bg-blue-100 text-blue-800 border-blue-200'
    }
    if (s.includes('interview')) {
      return 'bg-amber-100 text-amber-800 border-amber-200'
    }
    if (s.includes('select')) {
      return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    }
    if (s.includes('reject')) {
      return 'bg-rose-100 text-rose-800 border-rose-200'
    }
    return 'bg-slate-100 text-slate-700 border-slate-200'
  }

  if (isEditingReq && editingReq) {
    return (
      <CreateJobDemandForm
        userRole={role === 'superadmin' ? 'Super Admin View' : role === 'admin' ? 'Admin View' : 'Recruiter View'}
        mode="edit"
        initialData={editingReq}
        onCancel={() => {
          setIsEditingReq(false)
          setEditingReq(null)
        }}
        onSubmit={updatedReq => {
          setSelectedReqDetail(updatedReq)
          if (onUpdateRequirements && requirements.length > 0) {
            const updatedList = requirements.map(r => (r.id === updatedReq.id ? updatedReq : r))
            onUpdateRequirements(updatedList)
          }
          setIsEditingReq(false)
          setEditingReq(null)
          showToast('Requirement details updated successfully!')
        }}
      />
    )
  }

  if (selectedReqDetail) {
    return (
      <RequirementDetailOverview
        requirement={selectedReqDetail}
        onBack={() => setSelectedReqDetail(null)}
        onAddCandidate={() => onOpenSubmitCandidate?.(selectedReqDetail.id)}
        onEditRequirement={() => {
          setEditingReq(selectedReqDetail)
          setIsEditingReq(true)
        }}
      />
    )
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Submissions</h1>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-100 text-[#6B3BF6] border border-purple-200 inline-flex items-center gap-1.5 shadow-2xs">
              <FileText className="w-3.5 h-3.5 text-[#6B3BF6]" />
              <span>{filteredData.length} Candidates Submitted Today</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track candidate submissions sent to internal leads and client partners.
          </p>
        </div>
      </div>

      {/* 2. Unified Minimal KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Submissions Today
            </span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
              {filteredData.length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#6B3BF6]">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Submitted to Client
            </span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
              {filteredData.filter(d => d.status.toLowerCase().includes('client')).length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#6B3BF6]">
            <Send className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Interviews Scheduled
            </span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
              {filteredData.filter(d => d.status.toLowerCase().includes('interview')).length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#6B3BF6]">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Filter Controls Bar */}
      {role === 'lead' && (
        <div className="bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setScopeTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              scopeTab === 'all'
                ? 'bg-white text-purple-700 shadow-xs border border-purple-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Team Submissions (Team Members + My Submissions)
          </button>
          <button
            onClick={() => setScopeTab('my_submissions')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              scopeTab === 'my_submissions'
                ? 'bg-white text-purple-700 shadow-xs border border-purple-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Individual Submissions (Team Lead)
          </button>
          <button
            onClick={() => setScopeTab('team_members')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              scopeTab === 'team_members'
                ? 'bg-white text-purple-700 shadow-xs border border-purple-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Team Members Submissions Only
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
          {/* Search Bar */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate name or company..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B3BF6]/20 focus:border-[#6B3BF6] text-slate-800 placeholder-slate-400 bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center bg-slate-200"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Date filter dropdown */}
            <div className="relative w-full sm:w-44">
              <select
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B3BF6]/20 focus:border-[#6B3BF6] text-slate-700 bg-white font-bold cursor-pointer"
              >
                <option value="All">All Submissions</option>
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="This week">This week</option>
                <option value="This month">This month</option>
                <option value="Custom range">Custom range...</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Custom Range Date Pickers */}
            {dateFilter === 'Custom range' && (
              <div className="flex items-center gap-2 animate-in fade-in duration-150">
                <input
                  type="date"
                  value={customStartDate}
                  onChange={e => setCustomStartDate(e.target.value)}
                  className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-[#6B3BF6]"
                />
                <span className="text-xs text-slate-400">to</span>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={e => setCustomEndDate(e.target.value)}
                  className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>
            )}

            {/* Status Filter Dropdown */}
            <div className="relative w-full sm:w-48">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B3BF6]/20 focus:border-[#6B3BF6] text-slate-700 bg-white font-bold cursor-pointer"
              >
                <option value="All">All Candidate Statuses</option>
                <option value="Submitted to Lead">Submitted to Lead / Client</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Selected">Selected in Interview</option>
                <option value="Placed">Placed</option>
                <option value="Rejected">Rejected</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Submissions Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">CANDIDATE & ROLE</th>
                <th className="py-3.5 px-4">REQUIREMENT ID</th>
                <th className="py-3.5 px-4">CURRENT COMPANY & EXP</th>
                <th className="py-3.5 px-4">SUBMITTED BY & DATE</th>
                <th className="py-3.5 px-4">SUBMITTED TO (CLIENT)</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-4">REASON FOR REJECTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {paginatedSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="font-bold text-sm">No candidate submissions found</p>
                    <p className="text-xs mt-1">Try adjusting your search query or date range filter above</p>
                  </td>
                </tr>
              ) : (
                paginatedSubmissions.map(sub => (
                  <tr
                    key={sub.id}
                    className="hover:bg-purple-50/30 transition-colors"
                  >
                    {/* 1. CANDIDATE & ROLE */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#5B51D8] font-extrabold flex items-center justify-center text-xs shrink-0 border border-[#C7D2FE]">
                          {sub.candidateName.charAt(0)}
                        </div>
                        <div>
                          <button
                            onClick={() => setSelectedSub(sub)}
                            className="font-extrabold text-slate-900 text-xs hover:text-[#6B3BF6] hover:underline text-left cursor-pointer transition-colors block"
                            title="Click to view candidate profile"
                          >
                            {sub.candidateName}
                          </button>
                          <div className="text-[11px] text-slate-600 font-semibold mt-0.5">
                            {sub.requirement}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. REQUIREMENT ID */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenReqOverview(sub.reqId || 'REQ-2026-08-12-001', sub.requirement, sub.clientName || 'ITC Limited')}
                        className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-mono flex items-center gap-1 cursor-pointer transition-all hover:underline shadow-2xs"
                        title="Click to view Requirement Overview"
                      >
                        <span>{sub.reqId || 'REQ-2026-08-12-001'}</span>
                        <ExternalLink className="w-3 h-3 text-blue-600" />
                      </button>
                    </td>

                    {/* 3. CURRENT COMPANY & EXP */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-bold text-slate-800 text-xs">
                        {sub.currentCompany}
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                        Experience: {sub.experience}
                      </div>
                    </td>

                    {/* 4. SUBMITTED BY & DATE */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-slate-900 text-xs">{sub.submittedBy}</span>
                        {sub.submittedBy.toLowerCase().includes('harish') && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-extrabold border border-emerald-200">
                            Team Lead
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                        {sub.submittedOn}
                      </div>
                    </td>

                    {/* 5. SUBMITTED TO (CLIENT NAME) */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-extrabold text-slate-900 text-xs">
                        {sub.clientName || 'ITC Limited'}
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                        Direct Client
                      </div>
                    </td>

                    {/* 6. STATUS */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-extrabold border inline-block ${getStatusBadgeStyle(
                          sub.status
                        )}`}
                      >
                        {sub.status}
                      </span>
                    </td>

                    {/* 7. REASON FOR REJECTION */}
                    <td className="py-4 px-4">
                      {reasons[sub.id] || sub.rejectionReason ? (
                        <span className="text-slate-700 font-medium text-xs block leading-relaxed max-w-xs">
                          {reasons[sub.id] || sub.rejectionReason}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <PaginationFooter
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredData.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Candidate Detail Modal */}
      {selectedSub && (
        <SubmissionCandidateDetailModal
          submission={{
            id: selectedSub.id,
            candidate: selectedSub.candidateName,
            reqId: 'REQ-2026-05',
            req: selectedSub.requirement,
            client: selectedSub.currentCompany,
            experience: selectedSub.experience,
            recruiter: selectedSub.submittedBy,
            date: selectedSub.submittedOn,
            stage: selectedSub.status,
            email: 'candidate@email.com',
            phone: '+91 98765 43210',
            location: 'Bangalore, India',
            noticePeriod: '30 Days',
            currentCtc: '14 LPA',
            expectedCtc: '18 LPA',
            skills: ['Java', 'Spring Boot', 'Microservices', 'SQL'],
          }}
          rejectionReason={reasons[selectedSub.id] || selectedSub.rejectionReason}
          onSaveRejectionReason={(id, newReason) => {
            setReasons(prev => ({ ...prev, [id]: newReason }))
          }}
          onClose={() => setSelectedSub(null)}
        />
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-medium animate-in fade-in duration-200 border border-slate-800">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  )
}
