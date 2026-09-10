import React from 'react'
import { Eye, Search } from 'lucide-react'
import { RecruiterReqDashboardItem } from './reportsData'

interface RecruiterBreakdownTableProps {
  recruiters: RecruiterReqDashboardItem[]
  searchQuery: string
  setSearchQuery: (val: string) => void
  onDrilldown: (rec: RecruiterReqDashboardItem) => void
}

export const RecruiterBreakdownTable: React.FC<RecruiterBreakdownTableProps> = ({
  recruiters,
  searchQuery,
  setSearchQuery,
  onDrilldown,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Recruiter Productivity & REQ Breakdown</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Detailed breakdown of assigned REQs, submissions ratio, and client allocations.
          </p>
        </div>
        <span className="px-3 py-1 bg-purple-50 text-[#6B3BF6] text-xs font-extrabold rounded-full border border-purple-200">
          {recruiters.length} Recruiters Analyzed
        </span>
      </div>

      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search recruiter name..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-xs"
        />
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <th className="py-3.5 px-4">Recruiter</th>
              <th className="py-3.5 px-4 text-center">Assigned REQs</th>
              <th className="py-3.5 px-4 text-center">Submissions Delivered</th>
              <th className="py-3.5 px-4 text-center">Submission Ratio</th>
              <th className="py-3.5 px-4">Submitted Clients</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {recruiters.map(rec => (
              <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">{rec.recruiterName}</div>
                  <div className="text-[11px] text-slate-400 font-medium">{rec.recruiterRole || 'Recruiter'}</div>
                </td>
                <td className="py-3.5 px-4 text-center font-black text-slate-900">{rec.assignedReqsCount}</td>
                <td className="py-3.5 px-4 text-center font-black text-emerald-700">{rec.submissionsCount}</td>
                <td className="py-3.5 px-4 text-center font-bold text-purple-700">{rec.subRatio} sub/req</td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-[#EEF2FF] text-[#5B51D8] border border-[#C7D2FE]">
                    {rec.submittedClients.join(', ')}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => onDrilldown(rec)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center gap-1 ml-auto cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Analytics</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
