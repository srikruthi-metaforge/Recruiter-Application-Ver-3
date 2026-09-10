import React from 'react'
import { CheckCircle2, UserX } from 'lucide-react'
import { FinalDecisionRowItem } from './interviewTrackingData'

interface InterviewDecisionsTableProps {
  decisions: FinalDecisionRowItem[]
  showToast: (msg: string) => void
}

export const InterviewDecisionsTable: React.FC<InterviewDecisionsTableProps> = ({
  decisions,
  showToast,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Final Interview Decisions & Offers</h3>
          <p className="text-xs text-slate-500 font-medium">Outcome matrix for candidates who completed final rounds</p>
        </div>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-extrabold rounded-full border border-emerald-200">
          {decisions.length} Final Decisions
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <th className="py-3.5 px-4">Candidate & Requirement</th>
              <th className="py-3.5 px-4">Client</th>
              <th className="py-3.5 px-4">Decision</th>
              <th className="py-3.5 px-4">Offer Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {decisions.map(item => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">{item.candidateName}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{item.requirement}</div>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-700">{item.client || 'Client'}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                    item.decision === 'Selected for Interview'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}>
                    {item.decision}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900">{item.offerLetter}</td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => showToast(`Opening offer details for ${item.candidateName}...`)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center gap-1 ml-auto cursor-pointer"
                  >
                    <span>View Details</span>
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
