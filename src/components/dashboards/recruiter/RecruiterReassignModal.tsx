import React from 'react'
import { X } from 'lucide-react'

interface RecruiterReassignModalProps {
  isAssignModalOpen: boolean
  setIsAssignModalOpen: (open: boolean) => void
  isAssignMyselfChecked: boolean
  setIsAssignMyselfChecked: (checked: boolean) => void
  recruiterSearchQuery: string
  setRecruiterSearchQuery: (query: string) => void
  filteredRecruiterList: Array<{ id: string; name: string; email: string }>
  recruiterList: Array<{ id: string; name: string; email: string }>
  selectedRecruiterNames: Set<string>
  toggleRecruiterSelection: (name: string) => void
  handleConfirmReassign: () => void
  totalSelectedRecruitersCount: number
}

export function RecruiterReassignModal({
  isAssignModalOpen,
  setIsAssignModalOpen,
  isAssignMyselfChecked,
  setIsAssignMyselfChecked,
  recruiterSearchQuery,
  setRecruiterSearchQuery,
  filteredRecruiterList,
  recruiterList,
  selectedRecruiterNames,
  toggleRecruiterSelection,
  handleConfirmReassign,
  totalSelectedRecruitersCount,
}: RecruiterReassignModalProps) {
  if (!isAssignModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[480px] overflow-hidden border border-slate-100 font-sans">
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Reassign</h3>
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

        <div className="p-6 space-y-4">
          <label className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 flex items-start gap-3.5 cursor-pointer hover:bg-blue-50 transition-colors block">
            <input
              type="checkbox"
              checked={isAssignMyselfChecked}
              onChange={e => setIsAssignMyselfChecked(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
            />
            <div>
              <div className="text-sm font-bold text-blue-900 leading-snug">Assign myself (Harish Gadipally)</div>
              <div className="text-xs text-blue-600/90 leading-normal mt-0.5 font-normal">
                Include yourself along with any recruiters selected below.
              </div>
            </div>
          </label>

          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ASSIGN TO RECRUITER</div>
            <input
              type="text"
              placeholder="Search recruiter by name or email"
              value={recruiterSearchQuery}
              onChange={e => setRecruiterSearchQuery(e.target.value)}
              className="w-full h-11 px-4 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-800 placeholder:text-slate-400 shadow-2xs transition-all"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium px-0.5">
            Showing {filteredRecruiterList.length} of {recruiterList.length} recruiters
          </div>

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
                    <div className="text-sm font-bold text-slate-900 leading-snug">{rec.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5 font-normal">{rec.email}</div>
                  </div>
                </label>
              )
            })}
          </div>
        </div>

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
  )
}
