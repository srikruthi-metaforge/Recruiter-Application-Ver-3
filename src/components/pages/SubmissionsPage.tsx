import React, { useState, useMemo } from 'react'
import { Submission, Requirement, Role } from '../../types'
import { RequirementDetailOverview } from './RequirementDetailOverview'
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
  Edit2,
  Check,
  X,
  ExternalLink,
} from 'lucide-react'

interface SubmissionsPageProps {
  role?: Role
  submissions?: Submission[]
  onOpenSubmitCandidate?: () => void
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
    id: 'SUB-001',
    candidateName: 'TEJENDRA RAMAN',
    requirement: 'DPS NET backend BLR HYD',
    reqId: 'REQ-2026-06-08-001',
    clientName: 'Metaforge IT',
    experience: '9 Years',
    currentCompany: 'HCL Technologies Ltd',
    submittedBy: 'Suresh kulkarni',
    submittedOn: 'Aug 06, 26',
    status: 'Submitted to Client',
  },
  {
    id: 'SUB-002',
    candidateName: 'Trupti Akash More',
    requirement: 'DPS NET backend BLR HYD',
    reqId: 'REQ-2026-06-08-002',
    clientName: 'Wipro Digital',
    experience: '10 Years',
    currentCompany: 'LTI Mindtree',
    submittedBy: 'Suresh kulkarni',
    submittedOn: 'Aug 06, 26',
    status: 'Submitted to Lead',
  },
  {
    id: 'SUB-003',
    candidateName: 'Anjali',
    requirement: 'Autosar Development Engineer',
    reqId: 'REQ-2026-06-08-003',
    clientName: 'Continental Automotive',
    experience: '8 Years 9 Months',
    currentCompany:
      'AUMOVIO SE (India) Pvt. Ltd (Formerly Continental Automotive Pvt Ltd)',
    submittedBy: 'Harini Sindey',
    submittedOn: 'Aug 06, 26',
    status: 'Interview',
  },
  {
    id: 'SUB-004',
    candidateName: 'SATEESH KUMAR',
    requirement: 'DPS NET backend BLR HYD',
    reqId: 'REQ-2026-06-08-001',
    clientName: 'Metaforge IT',
    experience: '10 Years',
    currentCompany: 'Virtual Employee Pvt. Ltd.',
    submittedBy: 'Suresh kulkarni',
    submittedOn: 'Aug 06, 26',
    status: 'Submitted to Client',
  },
  {
    id: 'SUB-005',
    candidateName: 'Jinal Vora',
    requirement: 'DPS NET backend BLR HYD',
    reqId: 'REQ-2026-06-08-001',
    clientName: 'ITC Limited',
    experience: '7 Years 2 Months',
    currentCompany: 'Tech Systems India',
    submittedBy: 'rahimoon Shaik',
    submittedOn: 'Aug 06, 26',
    status: 'Submitted',
  },
  {
    id: 'SUB-006',
    candidateName: 'ABHIJEET BALWANT MALI',
    requirement: 'DPS NET backend BLR HYD',
    reqId: 'REQ-2026-06-08-004',
    clientName: 'Infosys Tech',
    experience: '9 Years 10 Months',
    currentCompany: 'Infosys Pvt Ltd',
    submittedBy: 'lakshmi.v Recruiter',
    submittedOn: 'Aug 06, 26',
    status: 'Selected',
  },
  {
    id: 'SUB-007',
    candidateName: 'RIHAN KHAN',
    requirement: 'SP3D Modeler',
    reqId: 'REQ-2026-06-08-005',
    clientName: 'L&T Engineering',
    experience: '5 Years 5 Months',
    currentCompany: 'Engineering Tech Services',
    submittedBy: 'lakshmi.v Recruiter',
    submittedOn: 'Aug 06, 26',
    status: 'Submitted to Client',
  },
]

export function SubmissionsPage({
  role,
  submissions = [],
  onOpenSubmitCandidate,
}: SubmissionsPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  // Default to Today, removed All Dates, Last 7 days, Last week, Last month, This year
  const [dateFilter, setDateFilter] = useState('Today')
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')
  const [statusFilter, setStatusFilter] = useState('Submitted to Lead')
  const [selectedSub, setSelectedSub] = useState<ScreenshotSubmission | null>(
    null
  )

  const [selectedReqDetail, setSelectedReqDetail] = useState<Requirement | null>(null)

  const handleOpenReqOverview = (reqId: string, position: string, company: string) => {
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

  // Scope submissions data for recruiter role (only see their own work, zero exposure to other recruiters)
  const scopeSubmissions = useMemo(() => {
    if (role === 'recruiter') {
      return combinedSubmissions
        .filter(item => {
          const by = item.submittedBy.toLowerCase()
          return (
            by.includes('suresh') ||
            by.includes('harish') ||
            by.includes('lakshmi') ||
            by.includes('recruiter')
          )
        })
        .map(item => ({
          ...item,
          submittedBy: 'Harish Gadipally (You)',
        }))
    }
    return combinedSubmissions
  }, [combinedSubmissions, role])

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

      // Date filter (Today is default)
      const d = item.submittedOn || ''
      if (dateFilter === 'Today') {
        if (!d.includes('Aug 06') && !d.includes('Aug 11') && !d.includes('Today')) return false
      } else if (dateFilter === 'Yesterday') {
        if (!d.includes('Aug 05') && !d.includes('Aug 10') && !d.includes('Yesterday')) return false
      } else if (dateFilter === 'This week') {
        if (!d.includes('Aug')) return false
      } else if (dateFilter === 'This month') {
        if (!d.includes('Aug')) return false
      } else if (dateFilter === 'Custom range') {
        if (customStartDate && d < customStartDate) return false
        if (customEndDate && d > customEndDate) return false
      }

      // Status filter
      const itemStatus = item.status.toLowerCase().trim()
      const filterVal = statusFilter.toLowerCase().trim()

      if (filterVal === 'submitted to lead') {
        if (!itemStatus.includes('lead') && !itemStatus.includes('submit')) return false
      } else if (filterVal === 'interview scheduled') {
        if (!itemStatus.includes('interview')) return false
      } else if (filterVal === 'selected') {
        if (!itemStatus.includes('select')) return false
      } else if (filterVal === 'placed') {
        if (!itemStatus.includes('place')) return false
      } else if (filterVal === 'rejected') {
        if (!itemStatus.includes('reject')) return false
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

  if (selectedReqDetail) {
    return (
      <RequirementDetailOverview
        requirement={selectedReqDetail}
        onBack={() => setSelectedReqDetail(null)}
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
            {/* Date filter dropdown (TODAY DEFAULT, REMOVED ALL DATES, LAST 7 DAYS, LAST WEEK, LAST MONTH, THIS YEAR) */}
            <div className="relative w-full sm:w-40">
              <select
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B3BF6]/20 focus:border-[#6B3BF6] text-slate-700 bg-white font-bold cursor-pointer"
              >
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
            <div className="relative w-full sm:w-44">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B3BF6]/20 focus:border-[#6B3BF6] text-slate-700 bg-white font-medium cursor-pointer"
              >
                <option value="Submitted to Lead">Submitted to Lead</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Selected">Selected</option>
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
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="font-bold text-sm">No candidate submissions found</p>
                    <p className="text-xs mt-1">Try adjusting your search query or date range filter above</p>
                  </td>
                </tr>
              ) : (
                filteredData.map(sub => (
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
                      <div className="font-bold text-purple-900 text-xs">
                        {sub.submittedBy}
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
          currentPage={1}
          totalPages={1}
          totalItems={filteredData.length}
          pageSize={10}
          onPageChange={() => {}}
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
    </div>
  )
}
