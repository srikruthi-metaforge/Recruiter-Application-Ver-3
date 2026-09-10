import React, { useState } from 'react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
} from 'recharts'
import { UserCheck } from 'lucide-react'
import { Role } from '../../types'
import { ClientPOCMetric, CLIENT_POC_DATA } from './clientPocData'

export type { ClientPOCMetric }

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    return (
      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs space-y-1.5 font-sans">
        <div className="font-extrabold text-blue-300 border-b border-slate-700 pb-1 flex justify-between gap-4">
          <span>{d.pocName}</span>
          <span className="text-[10px] text-slate-400 font-normal">{d.clientName}</span>
        </div>
        <div className="space-y-1 text-[11px] font-medium pt-0.5">
          <div className="flex justify-between gap-6"><span className="text-blue-400 font-bold">Total Submissions:</span><span className="font-extrabold text-white">{d.totalSubmissions}</span></div>
          <div className="flex justify-between gap-6"><span className="text-emerald-400 font-bold">First Submissions:</span><span className="font-extrabold text-white">{d.firstSubmissions}</span></div>
          <div className="flex justify-between gap-6"><span className="text-amber-400 font-bold">Conversion Rate:</span><span className="font-extrabold text-white">{d.conversionRate}%</span></div>
        </div>
      </div>
    )
  }
  return null
}

export interface ClientPOCSubmissionChartProps {
  role?: Role
}

export function ClientPOCSubmissionChart({ role = 'lead' }: ClientPOCSubmissionChartProps) {
  const [data] = useState<ClientPOCMetric[]>(CLIENT_POC_DATA)

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5 font-sans">
      <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Client POC Wise — Submission & Requirement Analysis</h2>
            <p className="text-xs text-slate-500">Breakdown of requirements received and total candidate submissions per Client Point of Contact</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-3">
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#1E3A8A] text-white text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Client POC Name</th>
                  <th className="py-2.5 px-2 text-center">Reqs</th>
                  <th className="py-2.5 px-2 text-center">1st Sub</th>
                  <th className="py-2.5 px-3 text-right">Total Sub</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {data.map(row => (
                  <tr key={row.pocName} className="hover:bg-blue-50/60 transition-colors">
                    <td className="py-2 px-3 font-bold text-slate-900 truncate max-w-[150px]" title={`${row.pocName} (${row.clientName})`}>
                      {row.pocName}
                      <span className="block text-[10px] text-slate-400 font-normal truncate">{row.clientName}</span>
                    </td>
                    <td className="py-2 px-2 text-center font-extrabold text-slate-700">{row.requirementsReceived}</td>
                    <td className="py-2 px-2 text-center font-extrabold text-emerald-600">{row.firstSubmissions}</td>
                    <td className="py-2 px-3 text-right font-extrabold text-[#2563EB]">{row.totalSubmissions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-7 h-[420px] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={data} margin={{ top: 10, right: 30, left: 120, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} />
              <YAxis type="category" dataKey="pocName" width={130} tick={{ fontSize: 10, fontWeight: 700, fill: '#334155' }} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700 }} iconType="circle" />
              <Bar dataKey="firstSubmissions" name="First Submissions" fill="#10B981" radius={[0, 4, 4, 0]} maxBarSize={14} />
              <Bar dataKey="totalSubmissions" name="Total Submissions" fill="#2563EB" radius={[0, 4, 4, 0]} maxBarSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
