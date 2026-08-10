import React, { useState } from 'react'
import { Interview, Requirement, Submission } from '../../types'
import {
  Send,
  MessageSquare,
  CheckCircle2,
  ClipboardList,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

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
]

export function RecruiterDashboard({
  submissions,
  interviews,
  requirements,
  onOpenSubmitCandidate,
  onOpenFeedbackModal,
  onOpenCandidateDetail,
}: Props) {
  const [searchClient, setSearchClient] = useState('')
  const [searchReqId, setSearchReqId] = useState('')
  const [statusFilter, setStatusFilter] = useState('Assigned')
  const [recentSubmissionsFilter, setRecentSubmissionsFilter] = useState('All Status')

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

  // Filter requirements by searchClient, searchReqId, and statusFilter
  const filteredReqs = activeReqRows.filter(req => {
    const matchesClient = searchClient === '' || req.client.toLowerCase().includes(searchClient.toLowerCase())
    const matchesId = searchReqId === '' || req.id.toLowerCase().includes(searchReqId.toLowerCase())
    const matchesStatus = statusFilter === 'All' || statusFilter === 'All Status' || req.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesClient && matchesId && matchesStatus
  })

  // Submissions filtered by recentSubmissionsFilter
  const filteredSubmissions = submissions.filter(sub => {
    if (recentSubmissionsFilter === 'All Status' || recentSubmissionsFilter === 'All') return true
    return sub.stage.toLowerCase() === recentSubmissionsFilter.toLowerCase()
  })

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Work</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Your personal assignments, submissions, and daily activity
        </p>
      </div>

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
                {filteredReqs.length > 0 ? filteredReqs.length : 1}
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
          <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
            <div className="relative flex-1 w-full max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by client"
                value={searchClient}
                onChange={e => setSearchClient(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="relative flex-1 w-full max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by requirement ID"
                value={searchReqId}
                onChange={e => setSearchReqId(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full md:w-auto px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="Assigned">Assigned</option>
              <option value="Unassigned">Unassigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
              <option value="All Status">All Status</option>
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
                    TYPE
                  </th>
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
                {filteredReqs.length > 0 ? (
                  filteredReqs.map((req, idx) => (
                    <tr key={req.id || idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3.5 text-slate-600">{req.type}</td>
                      <td className="px-4 py-3.5 font-mono text-slate-900 font-semibold">{req.id}</td>
                      <td className="px-4 py-3.5 text-slate-900 font-medium">{req.name}</td>
                      <td className="px-4 py-3.5 text-slate-600">{req.client}</td>
                      <td className="px-4 py-3.5 text-slate-700">{req.status}</td>
                      <td className="px-4 py-3.5 text-slate-500">{req.timestamp}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-400 text-xs">
                      No active requirements match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filteredReqs.length > 0 ? `1-${filteredReqs.length}` : '0-0'} of {filteredReqs.length}</span>
            <div className="flex items-center gap-2">
              <button
                disabled
                className="p-1 rounded-lg border border-slate-200 text-slate-300 cursor-not-allowed"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="font-medium text-slate-700 px-2">Page 1 of 1</span>
              <button
                disabled
                className="p-1 rounded-lg border border-slate-200 text-slate-300 cursor-not-allowed"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* My Recent Submissions Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">My Recent Submissions</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Your latest candidate activity across requirements.
            </p>
          </div>

          <select
            value={recentSubmissionsFilter}
            onChange={e => setRecentSubmissionsFilter(e.target.value)}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 self-end sm:self-auto"
          >
            <option value="All Status">All Status</option>
            <option value="Submitted">Submitted</option>
            <option value="Client Review">Client Review</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Offered">Offered</option>
            <option value="Placed">Placed</option>
            <option value="Rejected">Rejected</option>
          </select>
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
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
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
