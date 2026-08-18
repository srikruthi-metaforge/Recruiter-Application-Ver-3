import React, { useState } from 'react'
import { Interview, Requirement, Submission } from '../../types'
import { RequirementDetailOverview } from '../pages/RequirementDetailOverview'
import {
  Send,
  MessageSquare,
  CheckCircle2,
  ClipboardList,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import { PaginationFooter } from '../ui/PaginationFooter'
import { PageHeader } from '../layout/PageHeader'

interface Props {
  submissions: Submission[]
  interviews: Interview[]
  requirements: Requirement[]
  onOpenSubmitCandidate?: (reqId?: string) => void
  onOpenFeedbackModal?: (interview: Interview) => void
  onOpenCandidateDetail?: (sub: Submission) => void
}

interface ActiveReqRow {
  type: string
  id: string
  name: string
  client: string
  status: string
  timestamp: string
}

const DEFAULT_ACTIVE_REQS: ActiveReqRow[] = [
  {
    type: 'Requirement',
    id: 'REQ-2026-06-19-001',
    name: 'AI Data Engineer',
    client: 'harish',
    status: 'Assigned',
    timestamp: 'Jun 19, 2026, 07:29 PM',
  },
  {
    type: 'Requirement',
    id: 'REQ-2026-06-19-002',
    name: 'Fullstack React Developer',
    client: 'Metaforge IT',
    status: 'Submitted',
    timestamp: 'Jun 20, 2026, 10:15 AM',
  },
  {
    type: 'Requirement',
    id: 'REQ-2026-06-19-003',
    name: 'DevOps Cloud Specialist',
    client: 'Continental Automotive',
    status: 'Selected for interview',
    timestamp: 'Jun 21, 2026, 02:45 PM',
  },
]

export function RecruiterDashboard({
  submissions,
  interviews,
  requirements,
  onOpenSubmitCandidate,
  onOpenFeedbackModal,
  onOpenCandidateDetail,
}: Props) {
  const [selectedReqForDetail, setSelectedReqForDetail] = useState<Requirement | null>(null)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [isAssignMyselfChecked, setIsAssignMyselfChecked] = useState(true)
  const [selectedRecruiterNames, setSelectedRecruiterNames] = useState<Set<string>>(new Set())
  const [recruiterSearchQuery, setRecruiterSearchQuery] = useState('')

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('Assigned')
  const [recentSubmissionsFilter, setRecentSubmissionsFilter] = useState('All Status')

  // Pagination state for active requirements table
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const recruiterList = [
    { id: '1', name: 'Adirala sathvika', email: 'No email' },
    { id: '2', name: 'Arvind GR', email: 'arvind.gr@metaforgeit.com' },
    { id: '3', name: 'Charlie Darwin', email: 'charlie@metaforgeit.com' },
    { id: '4', name: 'Harini Sindey', email: 'harini.s@metaforgeit.com' },
    { id: '5', name: 'Harish Gadipally', email: 'harish.g@metaforgeit.com' },
    { id: '6', name: 'Puttapaka Saiteja', email: 'saiteja.p@metaforgeit.com' },
    { id: '7', name: 'Kallol Chakraborty', email: 'kallol.c@ltts.com' },
  ]

  const filteredRecruiterList = recruiterList.filter(
    r =>
      !recruiterSearchQuery.trim() ||
      r.name.toLowerCase().includes(recruiterSearchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(recruiterSearchQuery.toLowerCase())
  )

  const totalSelectedRecruitersCount = (isAssignMyselfChecked ? 1 : 0) + selectedRecruiterNames.size

  const toggleRecruiterSelection = (name: string) => {
    const next = new Set(selectedRecruiterNames)
    if (next.has(name)) next.delete(name)
    else next.add(name)
    setSelectedRecruiterNames(next)
  }

  const handleConfirmReassign = () => {
    const assignees: string[] = []
    if (isAssignMyselfChecked) assignees.push('Harish Gadipally')
    selectedRecruiterNames.forEach(n => assignees.push(n))

    if (assignees.length === 0) return

    const assigneesText = assignees.join(', ')

    if (selectedReqForDetail) {
      setSelectedReqForDetail({
        ...selectedReqForDetail,
        owner: assigneesText,
        assignmentStatus: 'Assigned',
        submissions: selectedReqForDetail.submissions || 7,
      })
    }

    setIsAssignModalOpen(false)
    setSelectedRecruiterNames(new Set())
    setIsAssignMyselfChecked(true)
    setRecruiterSearchQuery('')
  }

  if (selectedReqForDetail) {
    return (
      <>
        <RequirementDetailOverview
          requirement={selectedReqForDetail}
          onBack={() => setSelectedReqForDetail(null)}
          onAddCandidate={() => onOpenSubmitCandidate?.(selectedReqForDetail.id)}
          onOpenAssignModal={() => setIsAssignModalOpen(true)}
        />

        {/* REASSIGN MODAL OVERLAY */}
        {isAssignModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[480px] overflow-hidden border border-slate-100 font-sans">
              {/* Header */}
              <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    Reassign
                  </h3>
                  <p className="text-xs text-slate-500 font-normal mt-1">
                    Select yourself and/or other recruiters for this requirement in one step.
                  </p>
                </div>
                <button
                  onClick={() => setIsAssignModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Assign myself card */}
                <label className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 flex items-start gap-3.5 cursor-pointer hover:bg-blue-50 transition-colors block">
                  <input
                    type="checkbox"
                    checked={isAssignMyselfChecked}
                    onChange={e => setIsAssignMyselfChecked(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                  />
                  <div>
                    <div className="text-sm font-bold text-blue-900 leading-snug">
                      Assign myself (Harish Gadipally)
                    </div>
                    <div className="text-xs text-blue-600/90 leading-normal mt-0.5 font-normal">
                      Include yourself along with any recruiters selected below.
                    </div>
                  </div>
                </label>

                {/* Search recruiter input */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    ASSIGN TO RECRUITER
                  </div>
                  <input
                    type="text"
                    placeholder="Search recruiter by name or email"
                    value={recruiterSearchQuery}
                    onChange={e => setRecruiterSearchQuery(e.target.value)}
                    className="w-full h-11 px-4 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-800 placeholder:text-slate-400 shadow-2xs transition-all"
                  />
                </div>

                {/* Showing counter */}
                <div className="text-xs text-slate-500 font-medium px-0.5">
                  Showing {filteredRecruiterList.length} of {recruiterList.length} recruiters
                </div>

                {/* Recruiter cards scrollable list */}
                <div className="max-h-56 overflow-y-auto space-y-2.5 pr-1.5 custom-scrollbar">
                  {filteredRecruiterList.map(rec => {
                    const isChecked = selectedRecruiterNames.has(rec.name)
                    return (
                      <label
                        key={rec.id}
                        className={`border rounded-2xl p-3.5 flex items-center gap-3.5 cursor-pointer transition-all ${
                          isChecked
                            ? 'border-blue-300 bg-blue-50/50'
                            : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleRecruiterSelection(rec.name)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                        />
                        <div>
                          <div className="text-sm font-bold text-slate-900 leading-snug">
                            {rec.name}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 font-normal">
                            {rec.email}
                          </div>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Footer actions */}
              <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-5 h-11 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReassign}
                  disabled={totalSelectedRecruitersCount === 0}
                  className="px-6 h-11 bg-[#6B3BF6] hover:bg-[#5833E0] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all shadow-xs cursor-pointer active:scale-98"
                >
                  Assign {totalSelectedRecruitersCount} recruiter(s)
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  // Map requirements prop to table rows or fallback to demo data matching screenshot
  const activeReqRows: ActiveReqRow[] = requirements.length > 0
    ? requirements.map(r => ({
        type: 'Requirement',
        id: r.id,
        name: r.title,
        client: r.client,
        status: r.assignmentStatus || 'Assigned',
        timestamp: r.dueDate ? `${r.dueDate}, 07:29 PM` : 'Jun 19, 2026, 07:29 PM',
      }))
    : DEFAULT_ACTIVE_REQS

  // Filter requirements by merged searchQuery and statusFilter
  const filteredReqs = activeReqRows.filter(req => {
    const q = searchQuery.trim().toLowerCase()
    const matchesQuery = !q || req.client.toLowerCase().includes(q) || req.id.toLowerCase().includes(q) || req.name.toLowerCase().includes(q)
    
    const filterLower = statusFilter.toLowerCase().trim()
    let matchesStatus = true
    if (filterLower === 'assigned') {
      matchesStatus = req.status.toLowerCase().includes('assign') || req.status.toLowerCase() === 'active' || req.status.toLowerCase() === 'open'
    } else if (filterLower === 'submitted') {
      matchesStatus = req.status.toLowerCase().includes('submit')
    } else if (filterLower === 'selected for interview') {
      matchesStatus = req.status.toLowerCase().includes('interview') || req.status.toLowerCase().includes('select')
    }

    return matchesQuery && matchesStatus
  })

  const paginatedReqs = filteredReqs.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Submissions filtered by recentSubmissionsFilter
  const filteredSubmissions = submissions.filter(sub => {
    if (recentSubmissionsFilter === 'All Status' || recentSubmissionsFilter === 'All') return true
    return sub.stage.toLowerCase() === recentSubmissionsFilter.toLowerCase()
  })

  return (
    <div className="space-y-8 w-full pb-12 font-sans">
      {/* Header */}
      <PageHeader
        title="My Work"
        subtitle="Your personal assignments, submissions, and daily activity"
      />

      {/* Performance Summary Section */}
      <section>
        <h2 className="text-base font-semibold text-slate-800 mb-3">Performance Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Submissions */}
          <div className="bg-[#E6F8F0] border border-[#A7F3D0] rounded-2xl p-5 flex items-center justify-between shadow-sm transition-all duration-200 hover:shadow-md">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">Total Submissions</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-2 tabular-nums">
                {submissions.length > 0 ? submissions.length : 6}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#00BA7C] text-white flex items-center justify-center shadow-sm shrink-0">
              <Send className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2: Interviews Handled */}
          <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-5 flex items-center justify-between shadow-sm transition-all duration-200 hover:shadow-md">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">Interviews Handled</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-2 tabular-nums">
                {interviews.length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#5B51D8] text-white flex items-center justify-center shadow-sm shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>

          {/* Card 3: Selections Achieved */}
          <div className="bg-[#F4EFFE] border border-[#E9D8FD] rounded-2xl p-5 flex items-center justify-between shadow-sm transition-all duration-200 hover:shadow-md">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">Selections Achieved</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-2 tabular-nums">0</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shadow-sm shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          {/* Card 4: Assigned Requirements */}
          <div className="bg-[#EBF3FF] border border-[#BFDBFE] rounded-2xl p-5 flex items-center justify-between shadow-sm transition-all duration-200 hover:shadow-md">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">Assigned Requirements</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-2 tabular-nums">
                {filteredReqs.length > 0 ? filteredReqs.length : 8}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#2F80ED] text-white flex items-center justify-center shadow-sm shrink-0">
              <ClipboardList className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Active Requirements + Submitted Candidates Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Active Requirements + Submitted Candidates
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Your open workload across currently active job demands.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client or requirement ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full md:w-auto px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer font-bold text-slate-800"
            >
              <option value="Assigned">Assigned</option>
              <option value="Submitted">Submitted</option>
              <option value="Selected for interview">Selected for interview</option>
            </select>
          </div>
        </div>

        {/* Requirements Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/50">
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    REQUIREMENT ID
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    REQUIREMENT NAME
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    CLIENT
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    TIMESTAMP (ASSIGNED ON)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {paginatedReqs.length > 0 ? (
                  paginatedReqs.map((req, idx) => (
                    <tr key={req.id || idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3.5 font-mono text-slate-900 font-semibold">
                        <button
                          onClick={() => {
                            const found = requirements.find(r => r.id === req.id) || {
                              id: req.id,
                              client: req.client,
                              title: req.name,
                              priority: 'Medium' as const,
                              status: 'Active' as const,
                              assignmentStatus: 'Assigned' as const,
                              owner: 'Harish Gadipally',
                              submissions: 7,
                              interviews: 0,
                              placed: 0,
                              rejections: 0,
                              clientEmail: 'harish',
                              clientPhone: '+91 98765 43210',
                              location: 'Remote, Hybrid, Onsite',
                              openings: 1,
                              dueDate: '2026-06-19',
                              emailArrivedTime: 'Jun 19, 2026, 05:30 AM',
                              budget: '₹5,000,000',
                            }
                            setSelectedReqForDetail(found)
                          }}
                          className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                        >
                          {req.id}
                        </button>
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-slate-900">{req.name}</td>
                      <td className="px-4 py-3.5 text-slate-800">{req.client}</td>
                      <td className="px-4 py-3.5">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {req.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500">{req.timestamp}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400 text-xs font-medium">
                      No active requirements found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <PaginationFooter
            currentPage={currentPage}
            totalPages={Math.ceil(filteredReqs.length / pageSize)}
            totalItems={filteredReqs.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            itemLabel="requirements"
          />
        </div>
      </section>

      {/* My Recent Submissions Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">My Recent Submissions</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Your latest candidate activity across requirements.
          </p>
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/50">
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    CANDIDATE NAME
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    RECRUITER
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    ROLE
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    CLIENT
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    SUBMITTED ON
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map(sub => (
                    <tr
                      key={sub.id}
                      onClick={() => onOpenCandidateDetail?.(sub)}
                      className="hover:bg-slate-50/60 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3.5 font-semibold text-slate-900">{sub.candidate}</td>
                      <td className="px-4 py-3.5 text-slate-600">{sub.recruiter}</td>
                      <td className="px-4 py-3.5 text-slate-600">{sub.req}</td>
                      <td className="px-4 py-3.5 text-slate-600">{sub.client}</td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${
                            sub.stage.toLowerCase().includes('reject')
                              ? 'bg-red-50 text-red-600 border-red-200/80'
                              : 'bg-blue-50 text-blue-700 border-blue-200/60'
                          }`}
                        >
                          {sub.stage}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500">{sub.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 text-xs font-medium">
                      No submissions found for your user.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            A quick view of your latest actions.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm py-12 px-6 text-center">
          <p className="text-xs text-slate-400 font-medium">No recent activity yet.</p>
        </div>
      </section>
    </div>
  )
}
