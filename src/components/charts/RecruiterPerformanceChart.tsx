import React, { useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { Users } from 'lucide-react'
import { Role } from '../../types'
import { RecruiterMetric, RECRUITER_PERF_DATA } from './recruiterPerfData'

export type { RecruiterMetric }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    return (
      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs space-y-1 font-sans">
        <div className="font-extrabold text-blue-300 border-b border-slate-700 pb-1">{label}</div>
        <div className="space-y-1 text-[11px] font-medium pt-0.5">
          <div className="flex justify-between gap-6"><span className="text-blue-400 font-bold">Submissions:</span><span className="font-extrabold text-white">{d.submissionsCount}</span></div>
          <div className="flex justify-between gap-6"><span className="text-[#6B3BF6] font-bold">L1 Interviews:</span><span className="font-extrabold text-white">{d.l1Interviews}</span></div>
          <div className="flex justify-between gap-6"><span className="text-emerald-400 font-bold">Placements / Final:</span><span className="font-extrabold text-white">{d.finalInterviews}</span></div>
          <div className="flex justify-between gap-6"><span className="text-amber-400 font-bold">Avg TAT:</span><span className="font-extrabold text-white">{d.tatDays} Days</span></div>
        </div>
      </div>
    )
  }
  return null
}

export interface RecruiterPerformanceChartProps {
  role?: Role
}

export function RecruiterPerformanceChart({ role = 'lead' }: RecruiterPerformanceChartProps) {
  const [data] = useState<RecruiterMetric[]>(RECRUITER_PERF_DATA)

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5 font-sans">
      <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#6B3BF6]">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Recruiter Performance Comparison — Submissions & Interviews</h2>
            <p className="text-xs text-slate-500">Comparative breakdown of candidate submissions and interview pipeline stages across team recruiters</p>
          </div>
        </div>
      </div>

      <div className="h-[360px] w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="recruiter" tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} />
            <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700 }} iconType="circle" />
            <Bar dataKey="submissionsCount" name="Total Submissions" fill="#2563EB" radius={[4, 4, 0, 0]} maxBarSize={18} />
            <Bar dataKey="l1Interviews" name="L1 Interviews" fill="#6B3BF6" radius={[4, 4, 0, 0]} maxBarSize={18} />
            <Bar dataKey="finalInterviews" name="Final Interviews" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
