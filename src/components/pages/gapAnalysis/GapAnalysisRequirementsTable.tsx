import React from 'react'
import { AlertTriangle, ChevronRight, Eye } from 'lucide-react'
import { ClientRequirementItem } from './gapAnalysisData'
import { PaginationFooter } from '../../ui/PaginationFooter'

interface GapAnalysisRequirementsTableProps {
  paginatedRequirements: ClientRequirementItem[]
  filteredRequirements: ClientRequirementItem[]
  gapCurrentPage: number
  setGapCurrentPage: (val: number) => void
  gapPageSize: number
  setGapPageSize: (val: number) => void
  gapTotalPages: number
  setSelectedDetailReq: (req: ClientRequirementItem | null) => void
  onSelectRequirement?: (reqId: string) => void
  openSections: Record<string, boolean>
}

export const GapAnalysisRequirementsTable: React.FC<GapAnalysisRequirementsTableProps> = ({
  paginatedRequirements,
  filteredRequirements,
  gapCurrentPage,
  setGapCurrentPage,
  gapPageSize,
  setGapPageSize,
  gapTotalPages,
  setSelectedDetailReq,
  onSelectRequirement,
  openSections,
}) => {
  if (!openSections.reqGaps) return null

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-4 overflow-hidden animate-in fade-in duration-200">
      <div className="p-6 pb-2 flex items-center justify-between border-b border-slate-100">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Requirement-Level Delivery Matrix</h3>
          <p className="text-xs text-slate-500 font-medium">Click any requirement row to view candidate breakdown & delivery status</p>
        </div>
        <span className="text-xs font-bold text-slate-500">
          Showing {paginatedRequirements.length} of {filteredRequirements.length} requirements
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-sans text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <th className="py-3 px-4">Req ID & Title</th>
              <th className="py-3 px-4">Standardized Domain</th>
              <th className="py-3 px-4 text-center">Positions</th>
              <th className="py-3 px-4 text-center">Submissions</th>
              <th className="py-3 px-4">SPOC</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {paginatedRequirements.map(req => {
              const isZeroSub = req.submissions === 0
              return (
                <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-purple-700 font-bold text-[11px]">{req.id}</span>
                      {isZeroSub && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          <span>0 Submissions</span>
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-slate-900 text-xs mt-0.5">{req.title}</div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-purple-50 text-purple-900 border border-purple-200">
                      {req.domain}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center font-extrabold text-slate-900">
                    {req.positions}
                  </td>

                  <td className="py-3 px-4 text-center font-extrabold">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      isZeroSub ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {req.submissions}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-bold text-slate-700">{req.spoc}</td>

                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                      req.status === 'Open' ? 'bg-blue-100 text-blue-800' : req.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {req.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedDetailReq(req)
                        if (onSelectRequirement) onSelectRequirement(req.id)
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 ml-auto cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Drilldown</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-slate-100">
        <PaginationFooter
          currentPage={gapCurrentPage}
          totalPages={gapTotalPages}
          totalItems={filteredRequirements.length}
          pageSize={gapPageSize}
          onPageChange={setGapCurrentPage}
          onPageSizeChange={size => {
            setGapPageSize(size)
            setGapCurrentPage(1)
          }}
        />
      </div>
    </div>
  )
}
