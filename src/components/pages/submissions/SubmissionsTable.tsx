import React from 'react'
import { ExternalLink } from 'lucide-react'
import { ScreenshotSubmission } from './submissionsData'
import { PaginationFooter } from '../../ui/PaginationFooter'

interface Props {
  paginatedSubmissions: ScreenshotSubmission[]
  filteredDataLength: number
  currentPage: number
  totalPages: number
  pageSize: number
  setCurrentPage: (p: number) => void
  setSelectedSub: (sub: ScreenshotSubmission) => void
  handleOpenReqOverview: (reqId: string, reqName?: string, reqClient?: string) => void
  reasons: Record<string, string>
}

function getStatusBadgeStyle(status: string) {
  switch (status) {
    case 'Submitted to Client':
    case 'Submitted to Lead':
      return 'bg-blue-50 text-blue-700 border-blue-200'
    case 'Interview Scheduled':
      return 'bg-amber-50 text-amber-800 border-amber-200 font-bold'
    case 'Selected in Interview':
      return 'bg-[#EEF2FF] text-[#5B51D8] border-[#C7D2FE]'
    case 'Placed':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'Rejected':
      return 'bg-rose-50 text-rose-700 border-rose-200'
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200'
  }
}

export function SubmissionsTable({
  paginatedSubmissions,
  filteredDataLength,
  currentPage,
  totalPages,
  pageSize,
  setCurrentPage,
  setSelectedSub,
  handleOpenReqOverview,
  reasons,
}: Props) {
  return (
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
                  <p className="text-xs mt-1">Try adjusting your search query, client filter, or date range filter above</p>
                </td>
              </tr>
            ) : (
              paginatedSubmissions.map(sub => (
                <tr key={sub.id} className="hover:bg-purple-50/30 transition-colors">
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
                        <div className="text-[11px] text-slate-600 font-semibold mt-0.5">{sub.requirement}</div>
                      </div>
                    </div>
                  </td>

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

                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="font-bold text-slate-800 text-xs">{sub.currentCompany}</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">Experience: {sub.experience}</div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-slate-900 text-xs">{sub.submittedBy}</span>
                      {sub.submittedBy.toLowerCase().includes('harish') && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-extrabold border border-emerald-200">
                          Team Lead
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">{sub.submittedOn}</div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="font-extrabold text-slate-900 text-xs">{sub.clientName || 'ITC Limited'}</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">Direct Client</div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold border inline-block ${getStatusBadgeStyle(sub.status)}`}>
                      {sub.status}
                    </span>
                  </td>

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
        totalItems={filteredDataLength}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
