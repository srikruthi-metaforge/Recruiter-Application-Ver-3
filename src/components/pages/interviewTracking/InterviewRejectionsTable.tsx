import React from 'react'
import { UserX, AlertTriangle } from 'lucide-react'
import { RejectedCandidateRowItem } from './interviewTrackingData'

interface InterviewRejectionsTableProps {
  rejections: RejectedCandidateRowItem[]
  showToast: (msg: string) => void
}

export const InterviewRejectionsTable: React.FC<InterviewRejectionsTableProps> = ({
  rejections,
  showToast,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Rejection Archive & Feedback Audit</h3>
          <p className="text-xs text-slate-500 font-medium">Stage-by-stage rejection feedback and evaluator notes</p>
        </div>
        <span className="px-3 py-1 bg-rose-50 text-rose-800 text-xs font-extrabold rounded-full border border-rose-200">
          {rejections.length} Rejection Records
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <th className="py-3.5 px-4">Candidate & Position</th>
              <th className="py-3.5 px-4">Client</th>
              <th className="py-3.5 px-4">Rejected Stage</th>
              <th className="py-3.5 px-4">Rejection Reason & Notes</th>
              <th className="py-3.5 px-4">Evaluated By</th>
              <th className="py-3.5 px-4 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {rejections.map(item => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">{item.candidateName}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{item.position}</div>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-700">{item.company}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-200">
                    {item.rejectedStage}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">{item.rejectionReason}</div>
                  <div className="text-[11px] text-slate-500 font-medium italic">{item.evaluatorNotes}</div>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-700">{item.evaluatedBy}</td>
                <td className="py-3.5 px-4 text-right font-mono text-[11px] text-slate-500">{item.rejectionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
