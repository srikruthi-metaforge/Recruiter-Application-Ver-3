import React from 'react'
import { RecruiterStageMetric } from './stagePipelineData'

interface StagePipelineTableProps {
  data: RecruiterStageMetric[]
}

export function StagePipelineTable({ data }: StagePipelineTableProps) {
  return (
    <div className="border border-slate-200 rounded-2xl overflow-x-auto shadow-2xs">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-[#1E3A8A] text-white text-[10px] font-bold uppercase tracking-wider">
            <th className="py-2.5 px-3">Recruiter Name</th>
            <th className="py-2.5 px-2 text-center">Sourced</th>
            <th className="py-2.5 px-2 text-center">Screening</th>
            <th className="py-2.5 px-2 text-center">Sub to Client</th>
            <th className="py-2.5 px-2 text-center bg-purple-900/60">L1</th>
            <th className="py-2.5 px-2 text-center bg-purple-900/60">L2</th>
            <th className="py-2.5 px-2 text-center bg-purple-900/60">Custom Client</th>
            <th className="py-2.5 px-2 text-center bg-purple-900/60">Final</th>
            <th className="py-2.5 px-2 text-center bg-emerald-900/60">Offered</th>
            <th className="py-2.5 px-3 text-right bg-emerald-900/80">Placed</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
          {data.map(row => (
            <tr key={row.recruiter} className={`hover:bg-blue-50/60 transition-colors ${row.isLead ? 'bg-purple-50/50 font-bold' : ''}`}>
              <td className="py-2.5 px-3 font-bold text-slate-900 truncate max-w-[170px]" title={row.recruiter}>
                {row.recruiter}
                {row.isLead && <span className="ml-1.5 px-1.5 py-0.5 rounded-md bg-purple-100 text-[#6B3BF6] text-[9px] font-extrabold">LEAD</span>}
              </td>
              <td className="py-2.5 px-2 text-center font-semibold text-slate-600">{row.sourced}</td>
              <td className="py-2.5 px-2 text-center font-semibold text-slate-600">{row.screening}</td>
              <td className="py-2.5 px-2 text-center font-extrabold text-[#2563EB]">{row.submittedToClient}</td>
              <td className="py-2.5 px-2 text-center font-extrabold text-[#6B3BF6]">{row.l1Interview}</td>
              <td className="py-2.5 px-2 text-center font-bold text-indigo-600">{row.l2Interview}</td>
              <td className="py-2.5 px-2 text-center font-bold text-indigo-600">{row.customClientInterview}</td>
              <td className="py-2.5 px-2 text-center font-bold text-indigo-700">{row.finalInterview}</td>
              <td className="py-2.5 px-2 text-center font-extrabold text-[#84CC16]">{row.offered}</td>
              <td className="py-2.5 px-3 text-right font-extrabold text-emerald-600">{row.placed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
