import React, { useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { Layers } from 'lucide-react'
import { Role } from '../../types'

export interface DomainMetric {
  domain: string
  submissions: number
  totalRequirements: number
}

const DOMAIN_WISE_DATA: DomainMetric[] = [
  { domain: 'Mechanical / CAD Design', submissions: 103, totalRequirements: 38 },
  { domain: 'Electrical / Controls / PLC', submissions: 23, totalRequirements: 19 },
  { domain: 'Manufacturing / Production', submissions: 23, totalRequirements: 9 },
  { domain: 'Software / IT Development', submissions: 23, totalRequirements: 26 },
  { domain: 'Other / Unclassified', submissions: 22, totalRequirements: 91 },
  { domain: 'Embedded / Hardware / Firmware', submissions: 20, totalRequirements: 21 },
  { domain: 'Piping / Plant Design', submissions: 18, totalRequirements: 15 },
  { domain: 'Mobility / FMS / Cloud Dev', submissions: 12, totalRequirements: 6 },
  { domain: 'Quality / Testing / QA', submissions: 11, totalRequirements: 28 },
  { domain: 'Telecom / Wireless / Networking', submissions: 9, totalRequirements: 5 },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const dataObj = payload[0].payload
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl text-xs space-y-1 font-sans">
        <div className="font-bold text-blue-300 border-b border-slate-700 pb-1">{dataObj.domain}</div>
        <div className="flex justify-between gap-4"><span className="text-blue-400">Submissions:</span><span>{dataObj.submissions}</span></div>
        <div className="flex justify-between gap-4"><span className="text-lime-400">Total Reqs:</span><span>{dataObj.totalRequirements}</span></div>
      </div>
    )
  }
  return null
}

export function DomainWiseSubmissionChart({ role = 'lead' }: { role?: Role }) {
  const [leadChartView, setLeadChartView] = useState<'individual' | 'team'>('individual')

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4 font-sans">
      <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#6B3BF6]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Domain / Department — Submission Analysis</h2>
            <p className="text-xs text-slate-500">Department submission analysis</p>
          </div>
        </div>
        {role === 'lead' && (
          <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs">
            <button onClick={() => setLeadChartView('individual')} className={`px-3 py-1 rounded-lg ${leadChartView === 'individual' ? 'bg-[#6B3BF6] text-white font-bold' : 'text-slate-600'}`}>Lead Individual</button>
            <button onClick={() => setLeadChartView('team')} className={`px-3 py-1 rounded-lg ${leadChartView === 'team' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600'}`}>Team Comparison</button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 border border-slate-200 rounded-xl overflow-hidden text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1E3A8A] text-white text-[10px] uppercase font-bold">
                <th className="py-2 px-3">Domain</th>
                <th className="py-2 px-2 text-center">Submissions</th>
                <th className="py-2 px-3 text-right">Total Reqs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DOMAIN_WISE_DATA.map(row => (
                <tr key={row.domain}>
                  <td className="py-2 px-3 font-bold text-slate-900 truncate max-w-[150px]">{row.domain}</td>
                  <td className="py-2 px-2 text-center font-bold text-[#2563EB]">{row.submissions}</td>
                  <td className="py-2 px-3 text-right font-bold text-[#84CC16]">{row.totalRequirements}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-7 h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={DOMAIN_WISE_DATA} margin={{ top: 10, right: 20, left: 100, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="domain" width={110} tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="submissions" name="Submissions" fill="#2563EB" radius={[0, 4, 4, 0]} maxBarSize={14} />
              <Bar dataKey="totalRequirements" name="Total Reqs" fill="#84CC16" radius={[0, 4, 4, 0]} maxBarSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
