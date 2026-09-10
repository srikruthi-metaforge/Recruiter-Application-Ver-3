import React from 'react'
import { Calendar, Search, ChevronRight } from 'lucide-react'
import { CandidateSubmissionRow } from './requirementDetailData'

interface ReqDetailSubmissionsTabProps {
  filteredHistoryRows: CandidateSubmissionRow[]
  historyTabFilter: string
  setHistoryTabFilter: (val: any) => void
  historySearchQuery: string
  setHistorySearchQuery: (val: string) => void
  onScheduleInterview: (candidate: CandidateSubmissionRow) => void
}

export const ReqDetailSubmissionsTab: React.FC<ReqDetailSubmissionsTabProps> = ({
  filteredHistoryRows,
  historyTabFilter,
  setHistoryTabFilter,
  historySearchQuery,
  setHistorySearchQuery,
  onScheduleInterview,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-gray-900 tracking-tight">Candidate Submissions & Pipeline</h3>
          <p className="text-xs text-gray-500 font-normal mt-0.5">
            History of candidate profiles submitted for this requirement.
          </p>
        </div>
        <span className="px-3 py-1 bg-purple-50 text-[#6B3BF6] text-xs font-extrabold rounded-full border border-purple-200">
          {filteredHistoryRows.length} Submissions
        </span>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 text-xs font-semibold overflow-x-auto">
          {['all', 'submitted_lead', 'submitted_client', 'interview', 'selected', 'rejected'].map(f => (
            <button
              key={f}
              onClick={() => setHistoryTabFilter(f)}
              className={`px-3 py-1.5 rounded-full capitalize transition-all cursor-pointer ${
                historyTabFilter === f
                  ? 'bg-purple-100 text-[#6B3BF6] border border-purple-300 font-bold'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidate name or ID..."
            value={historySearchQuery}
            onChange={e => setHistorySearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800"
          />
        </div>
      </div>

      {/* Submissions Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <th className="py-3 px-4">Submission ID</th>
              <th className="py-3 px-4">Candidate Name & Email</th>
              <th className="py-3 px-4">Submitted By</th>
              <th className="py-3 px-4">Submitted Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {filteredHistoryRows.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  No submission records match the selected filter.
                </td>
              </tr>
            ) : (
              filteredHistoryRows.map(row => (
                <tr key={row.subId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-700">{row.subId}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{row.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{row.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">{row.submittedBy}</div>
                    <div className="text-[10px] text-slate-400">{row.submitterEmail}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{row.submittedOn}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {row.canSchedule ? (
                      <button
                        onClick={() => onScheduleInterview(row)}
                        className="px-3 py-1.5 bg-[#6B3BF6] hover:bg-[#5b2fe0] text-white font-bold rounded-xl text-xs flex items-center gap-1 ml-auto shadow-xs cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Schedule Interview</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">Scheduled</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
