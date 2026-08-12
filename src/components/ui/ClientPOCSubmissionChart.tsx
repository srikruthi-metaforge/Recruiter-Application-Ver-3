import React, { useState } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts'
import { UserCheck, Building2, BarChart2 } from 'lucide-react'

export interface ClientPOCMetric {
  pocName: string
  submissions: number
  totalRequirements: number
}

// Data extracted pixel-by-pixel from Excel Reference Sheet
const CLIENT_POC_DATA: ClientPOCMetric[] = [
  { pocName: 'Kallol Chakraborty', submissions: 253, totalRequirements: 85 },
  { pocName: 'Trayeetanu Ganguly', submissions: 20, totalRequirements: 9 },
  { pocName: 'Pranati Paul', submissions: 9, totalRequirements: 4 },
  { pocName: 'Kiran N', submissions: 4, totalRequirements: 2 },
  { pocName: 'LTTS (generic mailbox)', submissions: 3, totalRequirements: 1 },
  { pocName: 'Janani', submissions: 2, totalRequirements: 1 },
  { pocName: 'Vinaya Kumar Patil', submissions: 2, totalRequirements: 1 },
  { pocName: 'Internal (data entry)', submissions: 1, totalRequirements: 1 },
  { pocName: 'Nikitha', submissions: 1, totalRequirements: 1 },
  { pocName: 'Pampa Sengarai', submissions: 1, totalRequirements: 1 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dataObj = payload[0].payload
    return (
      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs space-y-1.5 font-sans animate-in fade-in zoom-in-95 duration-150">
        <div className="font-extrabold text-blue-300 border-b border-slate-700 pb-1 flex items-center justify-between gap-4">
          <span>{dataObj.pocName}</span>
          <span className="text-[10px] text-slate-400 font-normal">Client POC</span>
        </div>
        <div className="space-y-1 text-[11px] font-medium pt-0.5">
          <div className="flex justify-between gap-6">
            <span className="text-blue-400 font-bold">No. of Submissions:</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.submissions}</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-red-400 font-bold">Total Requirements (unique):</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.totalRequirements}</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function ClientPOCSubmissionChart() {
  const [data] = useState<ClientPOCMetric[]>(CLIENT_POC_DATA)

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5 font-sans">
      {/* 1. TITLE HEADER */}
      <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB]">
            <UserCheck className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
            Client POC: Submissions vs Total Requirements
          </h2>
        </div>
        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold border border-slate-200">
          Client POC Breakdown (10 POCs)
        </span>
      </div>

      {/* 2. GRID LAYOUT: EXCEL TABLE + HORIZONTAL BAR GRAPH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Excel Table */}
        <div className="lg:col-span-5 space-y-3">
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#1E3A8A] text-white text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Client POC</th>
                  <th className="py-3 px-2 text-center">No. of Submissions</th>
                  <th className="py-3 px-3 text-right">Total Requirements (unique)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {data.map(row => (
                  <tr key={row.pocName} className="hover:bg-purple-50/60 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-slate-900 truncate max-w-[160px]" title={row.pocName}>
                      {row.pocName}
                    </td>
                    <td className="py-2.5 px-2 text-center font-extrabold text-[#2563EB] tabular-nums">
                      {row.submissions}
                    </td>
                    <td className="py-2.5 px-3 text-right font-extrabold text-[#DC2626] tabular-nums">
                      {row.totalRequirements}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Recharts Horizontal Grouped Bar Chart */}
        <div className="lg:col-span-7 h-[380px] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
            >
              <defs>
                <linearGradient id="pocBlueGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={1} />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.85} />
                </linearGradient>
                <linearGradient id="pocRedGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#DC2626" stopOpacity={1} />
                  <stop offset="100%" stopColor="#B91C1C" stopOpacity={0.85} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" domain={[0, 300]} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} tickLine={false} />
              <YAxis
                type="category"
                dataKey="pocName"
                width={120}
                tick={{ fontSize: 10, fontWeight: 700, fill: '#334155' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingTop: '10px' }} iconType="circle" />

              <Bar dataKey="submissions" name="No. of Submissions" fill="url(#pocBlueGrad)" radius={[0, 4, 4, 0]} maxBarSize={18} />
              <Bar dataKey="totalRequirements" name="Total Requirements (unique)" fill="url(#pocRedGrad)" radius={[0, 4, 4, 0]} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
