import React from 'react'
import { Building2, Clock, CheckCircle2, AlertCircle, Award } from 'lucide-react'
import { RecruiterOverviewItem } from './recruitersData'
import { PaginationFooter } from '../../ui/PaginationFooter'
import { getRecruiterScreenTime, formatDurationShort, canViewScreenTime } from '../../../utils/screenTimeTracker'
import { Role } from '../../../types'

interface Props {
  paginatedRecruiters: RecruiterOverviewItem[]
  filteredRecruitersLength: number
  currentPage: number
  totalPages: number
  pageSize: number
  setCurrentPage: (page: number) => void
  setAdjustClientRecruiter: (recruiter: RecruiterOverviewItem) => void
  userRole: Role
}

function getStatusBadge(status: RecruiterOverviewItem['performanceStatus']) {
  switch (status) {
    case 'Top Performer':
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-purple-50 text-[#6B3BF6] border border-purple-200 inline-flex items-center gap-1">
          <Award className="w-3 h-3 text-[#6B3BF6]" /> Top Performer
        </span>
      )
    case 'On Track':
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> On Track
        </span>
      )
    case 'Needs Attention':
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-50 text-rose-800 border border-rose-200 inline-flex items-center gap-1">
          <AlertCircle className="w-3 h-3 text-rose-600" /> Needs Attention
        </span>
      )
  }
}

export function RecruitersTable({
  paginatedRecruiters,
  filteredRecruitersLength,
  currentPage,
  totalPages,
  pageSize,
  setCurrentPage,
  setAdjustClientRecruiter,
  userRole,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-4 px-5">RECRUITER & ROLE</th>
              <th className="py-4 px-4">ASSIGNED TEAM LEAD</th>
              {canViewScreenTime(userRole) && <th className="py-4 px-4 text-center">ACTIVE SCREEN TIME</th>}
              <th className="py-4 px-4">ASSIGNED CLIENT(S)</th>
              <th className="py-4 px-4 text-center">TOTAL REQS</th>
              <th className="py-4 px-4 text-center">SUBMISSIONS</th>
              <th className="py-4 px-4 text-center">AVG TAT</th>
              <th className="py-4 px-4 text-center">INTERVIEWS</th>
              <th className="py-4 px-4">PERFORMANCE</th>
              <th className="py-4 px-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
            {paginatedRecruiters.length === 0 ? (
              <tr>
                <td colSpan={canViewScreenTime(userRole) ? 10 : 9} className="py-12 text-center text-slate-400 font-semibold">
                  No recruiters match your search filter criteria.
                </td>
              </tr>
            ) : (
              paginatedRecruiters.map(recruiter => (
                <tr key={recruiter.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="py-4 px-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#6B3BF6] font-bold text-sm flex items-center justify-center shrink-0 border border-purple-200 group-hover:scale-105 transition-transform">
                        {recruiter.avatar}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 group-hover:text-[#6B3BF6] transition-colors">{recruiter.name}</div>
                        <div className="text-[11px] text-slate-400 font-medium">{recruiter.role}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="font-bold text-slate-800">{recruiter.teamLead}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{recruiter.email}</div>
                  </td>

                  {canViewScreenTime(userRole) && (
                    <td className="py-4 px-4 whitespace-nowrap text-center">
                      <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-200 tabular-nums">
                        {formatDurationShort(getRecruiterScreenTime(recruiter.email).activeSeconds)}
                      </span>
                    </td>
                  )}

                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {recruiter.clientNames.map(client => (
                        <span key={client} className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-purple-50 text-[#6B3BF6] border border-purple-200 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-purple-600" />
                          <span>{client}</span>
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-200 tabular-nums">
                      {recruiter.totalRequirements} Reqs
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-purple-50 text-purple-900 border border-purple-200 tabular-nums">
                      {recruiter.totalSubmissions} Submissions
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 tabular-nums">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      <span>{recruiter.tatDays} Days TAT</span>
                    </div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-center font-extrabold text-slate-800 tabular-nums text-xs">
                    {recruiter.totalInterviews} Interviews
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">{getStatusBadge(recruiter.performanceStatus)}</td>

                  <td className="py-4 px-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => setAdjustClientRecruiter(recruiter)}
                      className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6B3BF6] font-extrabold text-xs border border-purple-200 shadow-2xs transition-all cursor-pointer inline-flex items-center gap-1 active:scale-98"
                      title="Adjust Assigned Client for Recruiter"
                    >
                      <Building2 className="w-3.5 h-3.5 text-[#6B3BF6]" />
                      <span>Adjust Client</span>
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
