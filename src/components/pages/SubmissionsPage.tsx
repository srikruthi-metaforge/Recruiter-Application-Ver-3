import React, { useState, useMemo } from 'react'
import { Submission } from '../../types'
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
    candidateName: 'TEJENDRA RAMAN,',
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
    status: 'Submitted to Client',
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
    status: 'Submitted to Client',
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
    status: 'Submitted to Client',
  },
  {
    id: 'SUB-006',
    candidateName: 'ABHIJEET BALWANT MALI',
    requirement: 'DPS NET backend BLR HYD',
    experience: '9 Years 10 Months',
    currentCompany: 'Infosys Pvt Ltd',
    submittedBy: 'lakshmi.v Recruiter',
    submittedOn: 'Aug 06, 26',
    status: 'Submitted to Client',
  },
  {
    id: 'SUB-007',
    candidateName: 'RIHAN KHAN',
    requirement: 'SP3D Modeler',
    experience: '4 Years 8 Months',
    currentCompany: 'Wood India Engineering Project Pvt Ltd',
    submittedBy: 'Harini Sindey',
    submittedOn: 'Aug 06, 26',
    status: 'Submitted to Client',
  },
  {
    id: 'SUB-008',
    candidateName: 'Mohd Janishar',
    requirement: 'SP3D Modeler',
    experience: '5 Years 7 Months',
    currentCompany: 'Wood India Engineering Project Pvt Ltd',
    submittedBy: 'Harini Sindey',
    submittedOn: 'Aug 06, 26',
    status: 'Submitted to Client',
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
  const [dateFilter, setDateFilter] = useState('All dates')
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

      // Status filter
      if (statusFilter !== 'All') {
        if (
          statusFilter === 'Submitted to Client' &&
          !item.status.includes('Submitted')
        )
          return false
        if (statusFilter === 'Interview Scheduled' && !item.status.includes('Interview'))
          return false
        if (statusFilter === 'Placed' && !item.status.includes('Placed'))
          return false
      }

      return true
    })
  }, [combinedSubmissions, searchQuery, statusFilter])

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-16">
      {/* PAGE TITLE & SUBTITLE (MATCHING SCREENSHOT) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            All Submissions
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            View and manage all candidate submissions
          </p>
        </div>

        {onOpenSubmitCandidate && (
          <button
            onClick={onOpenSubmitCandidate}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all shrink-0"
          >
            + Submit Candidate
          </button>
        )}
      </div>

      {/* SEARCH AND FILTERS BAR (MATCHING SCREENSHOT) */}
      <div className="bg-white rounded-xl border border-gray-200 p-3.5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
          {/* Search Bar */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by candidate name or company..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 placeholder-gray-400 bg-gray-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center bg-gray-200"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Filter Dropdowns */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Date filter dropdown */}
            <div className="relative w-full sm:w-36">
              <select
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 bg-white font-medium cursor-pointer"
              >
                <option value="All dates">All dates</option>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="Aug 06, 26">Aug 06, 26</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Status filter dropdown */}
            <div className="relative w-full sm:w-36">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 bg-white font-medium cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Submitted to Client">Submitted to Client</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Placed">Placed</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* SUBMISSIONS DATA TABLE (MATCHING SCREENSHOT) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
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
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <p className="text-sm font-medium">
                      No submissions match your query.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredData.map(item => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedSub(item)}
                    className="hover:bg-blue-50/30 transition-colors cursor-pointer"
                  >
                    {/* Candidate Name */}
                    <td className="py-3.5 px-4 font-bold text-gray-900 whitespace-nowrap">
                      {item.candidateName}
                    </td>

                    {/* Requirement */}
                    <td className="py-3.5 px-4 text-gray-800 font-medium whitespace-nowrap">
                      {item.requirement}
                    </td>

                    {/* Experience */}
                    <td className="py-3.5 px-4 text-gray-700 whitespace-nowrap">
                      {item.experience}
                    </td>

                    {/* Current Company */}
                    <td className="py-3.5 px-4 text-gray-700 max-w-xs truncate">
                      {item.currentCompany || '—'}
                    </td>

                    {/* Submitted By */}
                    <td className="py-3.5 px-4 text-gray-700 whitespace-nowrap">
                      {item.submittedBy}
                    </td>

                    {/* Submitted On */}
                    <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                      {item.submittedOn}
                    </td>

                    {/* Status Pill (Blue Light Rounded Badge) */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  {selectedSub.candidateName}
                </h3>
                <p className="text-xs text-gray-500">
                  Submission ID: {selectedSub.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-gray-700">
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-400 font-medium">Requirement:</span>
                <span className="font-bold text-gray-900">
                  {selectedSub.requirement}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-400 font-medium">Experience:</span>
                <span className="font-semibold text-gray-900">
                  {selectedSub.experience}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-400 font-medium">Current Company:</span>
                <span className="font-semibold text-gray-900 truncate max-w-[200px]">
                  {selectedSub.currentCompany || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-400 font-medium">Submitted By:</span>
                <span className="font-semibold text-gray-900">
                  {selectedSub.submittedBy}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-400 font-medium">Submitted On:</span>
                <span className="font-semibold text-gray-900">
                  {selectedSub.submittedOn}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-400 font-medium">Status:</span>
                <span className="font-bold text-blue-600">
                  {selectedSub.status}
                </span>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                onClick={() => setSelectedSub(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
