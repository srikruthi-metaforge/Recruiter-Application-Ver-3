import React, { useState } from 'react'
import {
  ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
} from 'recharts'
import { Calendar } from 'lucide-react'
import { Role } from '../../types'
import { MonthlyMetric, DetailLogItem, MONTHLY_TIMELINE_DATA, FIRST_SUBMISSION_LOGS } from './monthlyTimelineData'
import { MonthlyTimelineLogsModal } from './MonthlyTimelineLogsModal'

export type { MonthlyMetric, DetailLogItem }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    return (
      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs space-y-1.5 font-sans">
        <div className="font-extrabold text-blue-300 border-b border-slate-700 pb-1">{label} Timeline</div>
        <div className="space-y-1 text-[11px] font-medium pt-0.5">
          <div className="flex justify-between gap-6"><span className="text-blue-400 font-bold">Requirements Received:</span><span className="font-extrabold text-white">{d.requirementsReceived}</span></div>
          <div className="flex justify-between gap-6"><span className="text-lime-400 font-bold">First Submissions:</span><span className="font-extrabold text-white">{d.firstSubmissions}</span></div>
          <div className="flex justify-between gap-6"><span className="text-purple-400 font-bold">Total Submissions:</span><span className="font-extrabold text-white">{d.totalSubmissions}</span></div>
          <div className="flex justify-between gap-6"><span className="text-amber-400 font-bold">Avg TAT (Turnaround):</span><span className="font-extrabold text-white">{d.avgTATDays !== null ? `${d.avgTATDays} Days` : 'N/A'}</span></div>
        </div>
      </div>
    )
  }
  return null
}

export interface MonthlyTimelinePerformanceChartProps {
  role?: Role
}

export function MonthlyTimelinePerformanceChart({ role = 'lead' }: MonthlyTimelinePerformanceChartProps) {
  const [data] = useState<MonthlyMetric[]>(MONTHLY_TIMELINE_DATA)
  const [detailLogs] = useState<DetailLogItem[]>(FIRST_SUBMISSION_LOGS)
  const [showLogsModal, setShowLogsModal] = useState(false)

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5 font-sans">
      <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB]">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Monthly Timeline Analysis — Requirements & First Submissions</h2>
            <p className="text-xs text-slate-500">Track month-by-month received requirements, position totals, first submissions, and TAT</p>
          </div>
        </div>

        <button type="button" onClick={() => setShowLogsModal(true)} className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#2563EB] text-xs font-bold rounded-xl transition-all cursor-pointer">
          View Detail Timelines Log
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-3">
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#1E3A8A] text-white text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Month</th>
                  <th className="py-2.5 px-2 text-center">Reqs</th>
                  <th className="py-2.5 px-2 text-center">1st Sub</th>
                  <th className="py-2.5 px-2 text-center">Total</th>
                  <th className="py-2.5 px-3 text-right">Avg TAT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {data.map(row => (
                  <tr key={row.month} className="hover:bg-blue-50/60 transition-colors">
                    <td className="py-2 px-3 font-bold text-slate-900">{row.month}</td>
                    <td className="py-2 px-2 text-center font-extrabold text-slate-700">{row.requirementsReceived}</td>
                    <td className="py-2 px-2 text-center font-extrabold text-[#84CC16]">{row.firstSubmissions}</td>
                    <td className="py-2 px-2 text-center font-extrabold text-[#2563EB]">{row.totalSubmissions}</td>
                    <td className="py-2 px-3 text-right font-extrabold text-amber-600">{row.avgTATDays !== null ? `${row.avgTATDays} Days` : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-7 h-[420px] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fontWeight: 700, fill: '#F59E0B' }} unit="d" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700 }} iconType="circle" />
              <Bar yAxisId="left" dataKey="requirementsReceived" name="Reqs Received" fill="#2563EB" radius={[4, 4, 0, 0]} maxBarSize={16} />
              <Bar yAxisId="left" dataKey="firstSubmissions" name="First Submissions" fill="#84CC16" radius={[4, 4, 0, 0]} maxBarSize={16} />
              <Bar yAxisId="left" dataKey="totalSubmissions" name="Total Submissions" fill="#818CF8" radius={[4, 4, 0, 0]} maxBarSize={16} />
              <Line yAxisId="right" dataKey="avgTATDays" name="Avg TAT (Days)" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4 }} connectNulls />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {showLogsModal && <MonthlyTimelineLogsModal logs={detailLogs} onClose={() => setShowLogsModal(false)} />}
    </div>
  )
}
