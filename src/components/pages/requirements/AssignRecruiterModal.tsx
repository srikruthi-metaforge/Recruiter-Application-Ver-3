import React from 'react'
import { X, Search, Check } from 'lucide-react'

interface AssignRecruiterModalProps {
  isOpen: boolean
  onClose: () => void
  selectedReqIdsCount: number
  isAssignMyselfChecked: boolean
  setIsAssignMyselfChecked: (val: boolean) => void
  currentUserName: string
  recruiterSearchQuery: string
  setRecruiterSearchQuery: (val: string) => void
  filteredRecruiterList: { name: string; email: string }[]
  selectedRecruiterNames: Set<string>
  toggleRecruiterSelection: (name: string) => void
  totalSelectedRecruitersCount: number
  onConfirm: () => void
}

export const AssignRecruiterModal: React.FC<AssignRecruiterModalProps> = ({
  isOpen,
  onClose,
  selectedReqIdsCount,
  isAssignMyselfChecked,
  setIsAssignMyselfChecked,
  currentUserName,
  recruiterSearchQuery,
  setRecruiterSearchQuery,
  filteredRecruiterList,
  selectedRecruiterNames,
  toggleRecruiterSelection,
  totalSelectedRecruitersCount,
  onConfirm,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Assign Requirement(s)</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Select team members to assign to <strong className="text-slate-800">{selectedReqIdsCount} requirement(s)</strong>
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 bg-purple-50/70 border border-purple-200/90 rounded-2xl flex items-center justify-between">
          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-900">
            <input
              type="checkbox"
              checked={isAssignMyselfChecked}
              onChange={e => setIsAssignMyselfChecked(e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded cursor-pointer"
            />
            <span>Assign to Myself ({currentUserName})</span>
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-extrabold text-slate-800">Assign to Team Members</label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search team member name or email..."
              value={recruiterSearchQuery}
              onChange={e => setRecruiterSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>

          <div className="max-h-48 overflow-y-auto space-y-1.5 pt-1 pr-1">
            {filteredRecruiterList.map(r => {
              const isSelected = selectedRecruiterNames.has(r.name)
              return (
                <div
                  key={r.email}
                  onClick={() => toggleRecruiterSelection(r.name)}
                  className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                    isSelected ? 'bg-purple-50 border-purple-300 font-bold' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <div className="text-slate-900 font-bold">{r.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{r.email}</div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-purple-600 font-extrabold" />}
                </div>
              )
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">{totalSelectedRecruitersCount} Recruiter(s) Selected</span>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl cursor-pointer">
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={totalSelectedRecruitersCount === 0}
              className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-extrabold rounded-xl shadow-md cursor-pointer disabled:opacity-50"
            >
              Confirm Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
