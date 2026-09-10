import React from 'react'
import { Eye } from 'lucide-react'
import { RecruiterHistoryItem } from './historyData'
import { PaginationFooter } from '../../ui/PaginationFooter'

interface Props {
  paginatedRecruiters: RecruiterHistoryItem[]
  filteredRecruitersLength: number
  currentPage: number
  totalPages: number
  pageSize: number
  setCurrentPage: (page: number) => void
  setSelectedRecruiterDetail: (item: RecruiterHistoryItem) => void
}

export function HistoryTable({
  paginatedRecruiters,
  filteredRecruitersLength,
  currentPage,
  totalPages,
  pageSize,
  setCurrentPage,
  setSelectedRecruiterDetail,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-4 px-5">RECRUITER & ROLE</th>
              <th className="py-4 px-4">TEAM LEAD & CLIENTS</th>
              <th className="py-4 px-4 text-center">ASSIGNED REQS</th>
              <th className="py-4 px-4 text-center">SOURCED PROFILES</th>
              <th className="py-4 px-4 text-center">SUBMISSIONS</th>
              <th className="py-4 px-4 text-center">WORKING PIPELINE</th>
              <th className="py-4 px-4 text-center">ON HOLD</th>
              <th className="py-4 px-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
            {paginatedRecruiters.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400 font-semibold">
                  No recruiter history records match the selected filters.
                </td>
              </tr>
            ) : (
              paginatedRecruiters.map(item => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedRecruiterDetail(item)}
                  className="hover:bg-purple-50/30 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#6B3BF6]/10 text-[#6B3BF6] font-bold text-sm flex items-center justify-center shrink-0 border border-[#6B3BF6]/20 group-hover:scale-105 transition-transform">
                        {item.recruiterAvatar}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 group-hover:text-[#6B3BF6] transition-colors">
                          {item.recruiterName}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">{item.roleTitle}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="font-bold text-slate-800">{item.teamLead}</div>
                    <div className="text-[10px] font-bold text-purple-600 truncate max-w-[140px]">
                      {item.clientAccounts.join(', ')}
                    </div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-900 border border-blue-200 tabular-nums">
                      {item.assignedRequirementsCount} Reqs
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-purple-50 text-purple-900 border border-purple-200 tabular-nums">
                      {item.sourcedProfilesCount} Sourced
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-900 border border-emerald-200 tabular-nums">
                      {item.submittedProfilesCount} Submitted
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-900 border border-amber-200 tabular-nums">
                      {item.workingProfilesCount} Working
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700 border border-slate-200 tabular-nums">
                      {item.onHoldProfilesCount} On Hold
                    </span>
                  </td>

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
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaginationFooter
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredRecruitersLength}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
