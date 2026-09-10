import React, { useState } from 'react'
import { Users, Layers } from 'lucide-react'
import { RecruiterHistoryItem } from './historyData'

interface Props {
  selectedRecruiterDetail: RecruiterHistoryItem
  onClose: () => void
}

export function HistoryDetailModal({ selectedRecruiterDetail, onClose }: Props) {
  const [modalTab, setModalTab] = useState<'sourced' | 'requirements'>('sourced')

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 font-sans max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6B3BF6] to-[#5833E0] text-white font-black text-base flex items-center justify-center shrink-0 border border-purple-300 shadow-md">
              {selectedRecruiterDetail.recruiterAvatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900">{selectedRecruiterDetail.recruiterName}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-50 text-[#6B3BF6] border border-purple-200">
                  {selectedRecruiterDetail.roleTitle}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Lead: <strong>{selectedRecruiterDetail.teamLead}</strong> • Clients: <strong>{selectedRecruiterDetail.clientAccounts.join(', ')}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100 text-center">
            <span className="text-[10px] font-bold text-blue-800 uppercase block">Assigned Reqs</span>
            <span className="text-xl font-black text-blue-950 font-mono">{selectedRecruiterDetail.assignedRequirementsCount}</span>
          </div>
          <div className="p-3 bg-purple-50/80 rounded-2xl border border-purple-100 text-center">
            <span className="text-[10px] font-bold text-purple-800 uppercase block">Sourced Profiles</span>
            <span className="text-xl font-black text-purple-950 font-mono">{selectedRecruiterDetail.sourcedProfilesCount}</span>
          </div>
          <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-100 text-center">
            <span className="text-[10px] font-bold text-emerald-800 uppercase block">Submissions</span>
            <span className="text-xl font-black text-emerald-950 font-mono">{selectedRecruiterDetail.submittedProfilesCount}</span>
          </div>
          <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-100 text-center">
            <span className="text-[10px] font-bold text-amber-900 uppercase block">Working Pipeline</span>
            <span className="text-xl font-black text-amber-950 font-mono">{selectedRecruiterDetail.workingProfilesCount}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <button
            onClick={() => setModalTab('sourced')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              modalTab === 'sourced' ? 'bg-[#6B3BF6] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Sourced Profiles History ({selectedRecruiterDetail.recentSourcedCandidates.length})</span>
          </button>

          <button
            onClick={() => setModalTab('requirements')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              modalTab === 'requirements' ? 'bg-[#6B3BF6] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Assigned Requirements ({selectedRecruiterDetail.assignedRequirementsList.length})</span>
          </button>
        </div>

        {modalTab === 'sourced' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Candidate Repository Sourcing History for {selectedRecruiterDetail.recruiterName}
            </h4>
            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/70 text-[10px] font-bold text-slate-600 uppercase">
                    <th className="py-2.5 px-3">CANDIDATE NAME</th>
                    <th className="py-2.5 px-3">REQUIREMENT & CLIENT</th>
                    <th className="py-2.5 px-3">SOURCED DATE</th>
                    <th className="py-2.5 px-3 text-center">CURRENT STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 text-slate-800 font-medium">
                  {selectedRecruiterDetail.recentSourcedCandidates.map(cand => (
                    <tr key={cand.id} className="hover:bg-white transition-colors">
                      <td className="py-2.5 px-3 font-bold text-slate-900">
                        {cand.candidateName}
                        <span className="text-[10px] text-slate-400 font-normal block">{cand.experience}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-slate-900">{cand.requirementName}</div>
                        <div className="text-[10px] text-purple-600 font-bold">{cand.clientName}</div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">{cand.sourcedDate}</td>
                      <td className="py-2.5 px-3 text-center">
                        {cand.status === 'Submitted' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">Submitted</span>
                        )}
                        {cand.status === 'Working' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">Working (Interviewing)</span>
                        )}
                        {cand.status === 'On Hold' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-200 text-slate-700">On Hold</span>
                        )}
                        {cand.status === 'Sourced' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-900 border border-purple-200">Sourced (Repo)</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {modalTab === 'requirements' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Assigned Requirements for {selectedRecruiterDetail.recruiterName}
            </h4>
            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/70 text-[10px] font-bold text-slate-600 uppercase">
                    <th className="py-2.5 px-3">REQUIREMENT NAME</th>
                    <th className="py-2.5 px-3">CLIENT ACCOUNT</th>
                    <th className="py-2.5 px-3">ASSIGNED DATE</th>
                    <th className="py-2.5 px-3 text-center">SUBMISSIONS</th>
                    <th className="py-2.5 px-3 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 text-slate-800 font-medium">
                  {selectedRecruiterDetail.assignedRequirementsList.map(req => (
                    <tr key={req.id} className="hover:bg-white transition-colors">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{req.reqName}</td>
                      <td className="py-2.5 px-3 font-semibold text-purple-700">{req.clientName}</td>
                      <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">{req.assignedDate}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-900">{req.submissionsCount}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-900 border border-blue-200">{req.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-2xs"
          >
            Close History Details
          </button>
        </div>
      </div>
    </div>
  )
}
