import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { Server, Building2, Target } from 'lucide-react'

export const SYSTEM_LATENCY_TREND = [
  { time: '08:00', ResponseTime: 120, APIRequests: 1420, SystemLoad: 32 },
  { time: '10:00', ResponseTime: 145, APIRequests: 2840, SystemLoad: 58 },
  { time: '12:00', ResponseTime: 180, APIRequests: 4120, SystemLoad: 74 },
  { time: '14:00', ResponseTime: 160, APIRequests: 3890, SystemLoad: 68 },
  { time: '16:00', ResponseTime: 135, APIRequests: 3200, SystemLoad: 52 },
  { time: '18:00', ResponseTime: 110, APIRequests: 2100, SystemLoad: 38 },
  { time: '20:00', ResponseTime: 95, APIRequests: 1150, SystemLoad: 24 },
]

export const CLIENT_REQUIREMENTS_DATA = [
  { client: 'LTTS', Requirements: 14, Openings: 32 },
  { client: 'ITC', Requirements: 9, Openings: 18 },
  { client: 'KPMG', Requirements: 7, Openings: 12 },
  { client: 'Deloitte', Requirements: 5, Openings: 8 },
  { client: 'Metaforge', Requirements: 8, Openings: 15 },
  { client: 'Tesla AI', Requirements: 4, Openings: 6 },
]

export const RECRUITER_PERFORM_DATA = [
  { name: 'Lakshmi V', Submissions: 194, Target: 150 },
  { name: 'Harish G', Submissions: 142, Target: 120 },
  { name: 'Rahimoon S', Submissions: 82, Target: 100 },
  { name: 'Suresh K', Submissions: 46, Target: 60 },
  { name: 'Lingoji P', Submissions: 38, Target: 50 },
]

const CustomDevTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-2xl border border-slate-700 text-xs space-y-1 font-sans">
        <p className="font-extrabold text-violet-400 border-b border-slate-700 pb-1 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`dev-${index}`} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-bold text-white tabular-nums">
              {entry.name === 'ResponseTime' ? `${entry.value}ms` : entry.name === 'SystemLoad' ? `${entry.value}%` : entry.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function DevTeamCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {/* Graph 1: System Latency & Requests */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-600">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">API & System Load</h3>
              <p className="text-[11px] text-slate-500">Response time vs request throughput</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 bg-violet-50 text-violet-700 rounded-full text-[10px] font-extrabold border border-violet-200">
            Realtime
          </span>
        </div>

        <div className="h-[220px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SYSTEM_LATENCY_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDevResponse" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomDevTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingTop: '8px' }} />
              <Area type="monotone" dataKey="ResponseTime" stroke="#7C3AED" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDevResponse)" />
              <Area type="monotone" dataKey="SystemLoad" stroke="#2563EB" strokeWidth={2} fillOpacity={0.1} fill="#2563EB" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Graph 2: Client Requirements Distribution */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Client Requirements</h3>
              <p className="text-[11px] text-slate-500">Active positions by client entity</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-extrabold border border-blue-200">
            Enterprise
          </span>
        </div>

        <div className="h-[220px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CLIENT_REQUIREMENTS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="client" tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomDevTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingTop: '8px' }} />
              <Bar dataKey="Requirements" fill="#2563EB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Openings" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Graph 3: Recruiter Performance vs Target */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Recruiter Output</h3>
              <p className="text-[11px] text-slate-500">Submissions vs quota target</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-extrabold border border-emerald-200">
            Performance
          </span>
        </div>

        <div className="h-[220px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={RECRUITER_PERFORM_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomDevTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingTop: '8px' }} />
              <Bar dataKey="Submissions" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="Target" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 4, fill: '#EF4444' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
