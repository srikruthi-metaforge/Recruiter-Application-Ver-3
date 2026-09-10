import React, { useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { Building2 } from 'lucide-react'
import { Role } from '../../types'
import { ClientTeamMetric, CLIENT_WISE_DATA } from './clientWiseData'

export type { ClientTeamMetric }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    return (
      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs space-y-1.5 font-sans">
        <div className="font-extrabold text-blue-300 border-b border-slate-700 pb-1 flex justify-between gap-4">
          <span>{label}</span>
          <span className="text-[10px] text-slate-400 font-normal">Client Account</span>
        </div>
        <div className="space-y-1 text-[11px] font-medium pt-0.5">
          <div className="flex justify-between gap-6"><span className="text-purple-400 font-bold">Harish (Lead):</span><span className="font-extrabold text-white">{d.harishSubmissions}</span></div>
          <div className="flex justify-between gap-6"><span className="text-blue-400 font-bold">Sathvika:</span><span className="font-extrabold text-white">{d.sathvikaSubmissions}</span></div>
          <div className="flex justify-between gap-6"><span className="text-emerald-400 font-bold">Shaik:</span><span className="font-extrabold text-white">{d.shaikSubmissions}</span></div>
          <div className="flex justify-between gap-6"><span className="text-amber-400 font-bold">Saiteja:</span><span className="font-extrabold text-white">{d.saitejaSubmissions}</span></div>
          <div className="flex justify-between gap-6"><span className="text-rose-400 font-bold">Kulkarni:</span><span className="font-extrabold text-white">{d.kulkarniSubmissions}</span></div>
        </div>
      </div>
    )
  }
  return null
}

export interface ClientWiseTeamPerformanceChartProps {
  role?: Role
}

export function ClientWiseTeamPerformanceChart({ role = 'lead' }: ClientWiseTeamPerformanceChartProps) {
  const [data] = useState<ClientTeamMetric[]>(CLIENT_WISE_DATA)

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5 font-sans">
      <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Client-Wise Team Member Submission Breakdown</h2>
            <p className="text-xs text-slate-500">Distribution of candidate submissions across assigned client accounts for Harish Gadipally&apos;s team</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-3">
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#1E3A8A] text-white text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Client Account</th>
                  <th className="py-2.5 px-2 text-center">Harish</th>
                  <th className="py-2.5 px-2 text-center">Team</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {data.map(row => (
                  <tr key={row.clientName} className="hover:bg-blue-50/60 transition-colors">
                    <td className="py-2 px-3 font-bold text-slate-900 truncate max-w-[160px]" title={row.clientName}>{row.clientName}</td>
                    <td className="py-2 px-2 text-center font-extrabold text-[#6B3BF6]">{row.harishSubmissions}</td>
                    <td className="py-2 px-2 text-center font-extrabold text-blue-600">{row.sathvikaSubmissions + row.shaikSubmissions + row.saitejaSubmissions + row.kulkarniSubmissions}</td>
                    <td className="py-2 px-3 text-right font-extrabold text-emerald-600">{row.totalClientSubmissions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-7 h-[420px] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="clientName" tick={{ fontSize: 9, fontWeight: 700, fill: '#64748B' }} angle={-25} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingTop: '10px' }} iconType="circle" />
              <Bar dataKey="harishSubmissions" name="Harish (Lead)" fill="#6B3BF6" stackId="a" />
              <Bar dataKey="sathvikaSubmissions" name="Sathvika" fill="#2563EB" stackId="a" />
              <Bar dataKey="shaikSubmissions" name="Shaik" fill="#10B981" stackId="a" />
              <Bar dataKey="saitejaSubmissions" name="Saiteja" fill="#F59E0B" stackId="a" />
              <Bar dataKey="kulkarniSubmissions" name="Kulkarni" fill="#EC4899" stackId="a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
