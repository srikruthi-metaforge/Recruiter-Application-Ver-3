import React from 'react'

export interface RecruiterAnalyticsData {
  id: string
  name: string
  lead: string
  admin: string
  email: string
  avatar: string
  requirementsCount: number
  submissionsCount: number
  l1Interviews: number
  l2Interviews: number
  customInterviews: number
  finalInterviews: number
  placements: number
  weeklyProgress: number
  weeklyTarget: number
  taskStatus: 'POSITIVE' | 'CRITICAL'
  submissionType: string
  primaryClient: string
  tat: string
}

interface RecruiterAnalyticsRowProps {
  row: RecruiterAnalyticsData
  onSelect: (row: RecruiterAnalyticsData) => void
}

export function RecruiterAnalyticsRow({ row, onSelect }: RecruiterAnalyticsRowProps) {
  return (
    <tr onClick={() => onSelect(row)} className="hover:bg-blue-50/60 transition-colors cursor-pointer text-xs font-medium text-slate-800">
      <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center text-xs shrink-0">
          {row.avatar}
        </div>
        <div className="truncate max-w-[140px]">
          <span className="block font-bold text-slate-900 truncate">{row.name}</span>
          <span className="block text-[10px] text-slate-400 font-normal truncate">{row.email}</span>
        </div>
      </td>
      <td className="py-3 px-3 text-center font-bold text-slate-700">{row.requirementsCount}</td>
      <td className="py-3 px-3 text-center font-extrabold text-[#2563EB]">{row.submissionsCount}</td>
      <td className="py-3 px-3 text-center font-bold text-purple-600">{row.l1Interviews}</td>
      <td className="py-3 px-3 text-center font-bold text-indigo-600">{row.l2Interviews}</td>
      <td className="py-3 px-3 text-center font-bold text-indigo-600">{row.customInterviews}</td>
      <td className="py-3 px-3 text-center font-bold text-indigo-700">{row.finalInterviews}</td>
      <td className="py-3 px-3 text-center font-extrabold text-emerald-600">{row.placements}</td>
      <td className="py-3 px-3 text-center font-bold text-slate-700">{row.tat}</td>
      <td className="py-3 px-3 text-center">
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${row.taskStatus === 'POSITIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
          {row.taskStatus}
        </span>
      </td>
    </tr>
  )
}
