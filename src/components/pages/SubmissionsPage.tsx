import React, { useState, useMemo } from 'react'
import { Submission } from '../../types'
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
} from 'lucide-react'

interface SubmissionsPageProps {
  submissions?: Submission[]
  onOpenSubmitCandidate?: () => void
}

interface ScreenshotSubmission {
  id: string
  candidateName: string
  requirement: string
  experience: string
  currentCompany: string
  submittedBy: string
  submittedOn: string
  status: string
}

const DEFAULT_SCREENSHOT_SUBMISSIONS: ScreenshotSubmission[] = [
  {
    id: 'SUB-001',
    candidateName: 'TEJENDRA RAMAN',
    requirement: 'DPS NET backend BLR HYD',
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
    experience: '4 Years 8 Months',
    currentCompany: 'Wood India Engineering Project Pvt Ltd',
    submittedBy: 'Harini Sindey',
    submittedOn: 'Aug 06, 26',
    status: 'Rejected',
  },
  {
    id: 'SUB-008',
    candidateName: 'Mohd Janishar',
    requirement: 'SP3D Modeler',
    experience: '5 Years 7 Months',
    currentCompany: 'Wood India Engineering Project Pvt Ltd',
    submittedBy: 'Harini Sindey',
    submittedOn: 'Aug 06, 26',
    status: 'Submitted to Lead',
  },
  {
    id: 'SUB-009',
    candidateName: 'ASFAQ',
    requirement: 'SP3D Modeler',
    experience: '5 Years 5 Months',
    currentCompany: 'Engineering Tech Services',
    submittedBy: 'lakshmi.v Recruiter',
    submittedOn: 'Aug 06, 26',
    status: 'Submitted to Client',
  },
]

export function SubmissionsPage({
  submissions = [],
  onOpenSubmitCandidate,
}: SubmissionsPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFilter, setDateFilter] = useState('All Dates')
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedSub, setSelectedSub] = useState<ScreenshotSubmission | null>(
    null
  )

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

  // Dynamic filter
  const filteredData = useMemo(() => {
    return combinedSubmissions.filter(item => {
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
      if (dateFilter !== 'All Dates' && dateFilter !== 'All dates') {
        const d = item.submittedOn || ''
        if (dateFilter === 'Today') {
          if (!d.includes('Aug 06') && !d.includes('Today')) return false
        } else if (dateFilter === 'Yesterday') {
          if (!d.includes('Aug 05') && !d.includes('Yesterday')) return false
        } else if (dateFilter === 'Last 7 days' || dateFilter === 'This week') {
          if (!d.includes('Aug 0') && !d.includes('Aug 06') && !d.includes('Aug 05')) return false
        } else if (dateFilter === 'Last week') {
          if (!d.includes('Jul 3') && !d.includes('Aug 01')) return false
        } else if (dateFilter === 'This month') {
          if (!d.includes('Aug')) return false
        } else if (dateFilter === 'Last month') {
          if (!d.includes('Jul')) return false
        } else if (dateFilter === 'This year') {
          if (!d.includes('26') && !d.includes('2026')) return false
        } else if (dateFilter === 'Custom range') {
          if (customStartDate && d < customStartDate) return false
          if (customEndDate && d > customEndDate) return false
        }
      }

      // Status filter
      if (statusFilter !== 'All') {
        const itemStatus = item.status.toLowerCase().trim()
        const filterVal = statusFilter.toLowerCase().trim()

        if (filterVal === 'submitted to lead') {
          if (!itemStatus.includes('lead')) return false
        } else if (filterVal === 'submitted to client') {
          if (!itemStatus.includes('client')) return false
        } else if (filterVal === 'submitted') {
          if (itemStatus !== 'submitted' && !itemStatus.includes('submit')) return false
        } else if (filterVal === 'interview') {
          if (!itemStatus.includes('interview')) return false
        } else if (filterVal === 'selected') {
          if (!itemStatus.includes('select') && !itemStatus.includes('place')) return false
        } else if (filterVal === 'rejected') {
          if (!itemStatus.includes('reject')) return false
        }
      }

      return true
    })
  }, [combinedSubmissions, searchQuery, dateFilter, customStartDate, customEndDate, statusFilter])

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const paginatedSubmissions = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, currentPage, pageSize])

  return (
    <div className="space-y-6 w-full pb-16 font-sans">
      <PageHeader
        title="All Submissions"
        subtitle="View and manage all candidate submissions"
      />

      {/* SEARCH AND FILTERS BAR */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
          {/* Search Bar */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by candidate name or company..."
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
            <div className="relative w-full sm:w-40">
              <select
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B3BF6]/20 focus:border-[#6B3BF6] text-slate-700 bg-white font-medium cursor-pointer"
              >
                <option value="All Dates">All Dates</option>
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="Last 7 days">Last 7 days</option>
                <option value="This week">This week</option>
                <option value="Last week">Last week</option>
                <option value="This month">This month</option>
                <option value="Last month">Last month</option>
                <option value="This year">This year</option>
                <option value="Custom range">Custom range</option>
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

            {/* Status filter dropdown */}
            <div className="relative w-full sm:w-44">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B3BF6]/20 focus:border-[#6B3BF6] text-slate-700 bg-white font-medium cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Submitted to lead">Submitted to lead</option>
                <option value="Submitted to client">Submitted to client</option>
                <option value="Submitted">Submitted</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* SUBMISSIONS DATA TABLE (MATCHING SCREENSHOT) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4 font-bold">CANDIDATE NAME</th>
                <th className="py-3 px-4 font-bold">REQUIREMENT</th>
                <th className="py-3 px-4 font-bold">EXPERIENCE</th>
                <th className="py-3 px-4 font-bold">CURRENT COMPANY</th>
                <th className="py-3 px-4 font-bold">SUBMITTED BY</th>
                <th className="py-3 px-4 font-bold whitespace-nowrap">
                  SUBMITTED ON
                </th>
                <th className="py-3 px-4 font-bold">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-medium">
                      No submissions match your query.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedSubmissions.map(item => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedSub(item)}
                    className="hover:bg-blue-50/30 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-bold text-[#6B3BF6] hover:underline">
                      {item.candidateName}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-slate-900 leading-snug line-clamp-2">
                        {item.requirement}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                      {item.experience}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium whitespace-nowrap">
                      {item.currentCompany}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium whitespace-nowrap">
                      {item.submittedBy}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {item.submittedOn}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded text-[11px] font-bold border ${
                          item.status.toLowerCase().includes('select')
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : item.status.toLowerCase().includes('reject')
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : item.status.toLowerCase().includes('interview')
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : item.status.toLowerCase().includes('lead')
                                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                  : item.status.toLowerCase().includes('client')
                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                    : 'bg-sky-50 text-sky-700 border-sky-200'
                        }`}
                      >
                        {item.status}
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
          totalPages={Math.ceil(filteredData.length / pageSize)}
          totalItems={filteredData.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          itemLabel="submissions"
        />
      </div>

      {/* DETAIL OVERVIEW MODAL (MATCHING SCREENSHOT) */}
      <SubmissionCandidateDetailModal
        submission={selectedSub}
        onClose={() => setSelectedSub(null)}
        onViewFullProfile={sub => {
          setSelectedSub(null)
        }}
      />
    </div>
  )
}
