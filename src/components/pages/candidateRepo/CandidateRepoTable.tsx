import React from 'react'
import { Eye, EyeOff, Edit2, Send } from 'lucide-react'
import { CandidateRepoItem, maskEmail, maskPhone, getCandidateSubmissionsHistory } from './candidateRepoData'

interface CandidateRepoTableProps {
  candidates: CandidateRepoItem[]
  unmaskedContactIds: Set<string>
  toggleUnmaskContact: (id: string) => void
  selectedIds: Set<string>
  toggleSelectCandidate: (id: string, e?: React.SyntheticEvent) => void
  toggleSelectAll: () => void
  hasActiveReq: boolean
  onInspectCandidate: (cand: CandidateRepoItem) => void
  onEditCandidate: (cand: CandidateRepoItem) => void
  onSubmitSingle: (cand: CandidateRepoItem) => void
}

export const CandidateRepoTable: React.FC<CandidateRepoTableProps> = ({
  candidates,
  unmaskedContactIds,
  toggleUnmaskContact,
  selectedIds,
  toggleSelectCandidate,
  toggleSelectAll,
  hasActiveReq,
  onInspectCandidate,
  onEditCandidate,
  onSubmitSingle,
}) => {
  const isAllSelected = candidates.length > 0 && selectedIds.size === candidates.length

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200">
              {hasActiveReq && (
                <th className="py-3.5 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                  />
                </th>
              )}
              <th className="py-3.5 px-4">Candidate ID & Name</th>
              <th className="py-3.5 px-4">Email</th>
              <th className="py-3.5 px-4">Phone</th>
              <th className="py-3.5 px-4">Technology / Primary Skill</th>
              <th className="py-3.5 px-4">Total Experience</th>
              <th className="py-3.5 px-4">Submissions History</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {candidates.map(item => {
              const isUnmasked = unmaskedContactIds.has(item.id)
              const isSelected = selectedIds.has(item.id)
              const history = getCandidateSubmissionsHistory(item)

              return (
                <tr key={item.id} className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-purple-50/50' : ''}`}>
                  {hasActiveReq && (
                    <td className="py-3.5 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={e => toggleSelectCandidate(item.id, e)}
                        className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                      />
                    </td>
                  )}

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-purple-700 font-extrabold text-[11px] bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                        {item.candidateId}
                      </span>
                      <span className="font-bold text-slate-900">{item.name}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span>{isUnmasked ? item.email : maskEmail(item.email)}</span>
                      <button onClick={() => toggleUnmaskContact(item.id)} className="p-0.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 cursor-pointer">
                        {isUnmasked ? <EyeOff className="w-3 h-3 text-emerald-600" /> : <Eye className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span>{isUnmasked ? item.phone : maskPhone(item.phone)}</span>
                      <button onClick={() => toggleUnmaskContact(item.id)} className="p-0.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 cursor-pointer">
                        {isUnmasked ? <EyeOff className="w-3 h-3 text-emerald-600" /> : <Eye className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-slate-900">{item.technology}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-700">{item.totalExperience}</td>

                  <td className="py-3.5 px-4">
                    {history.count > 0 ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
                        {history.count} Submissions ({history.companyNames})
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic">No submissions yet</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onInspectCandidate(item)}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                      <button
                        onClick={() => onEditCandidate(item)}
                        className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onSubmitSingle(item)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
