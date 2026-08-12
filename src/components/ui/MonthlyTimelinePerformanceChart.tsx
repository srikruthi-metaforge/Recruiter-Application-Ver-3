import React, { useState } from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts'
import { Calendar, FileText } from 'lucide-react'

export interface MonthlyMetric {
  month: string
  requirementsReceived: number
  firstSubmissions: number
  totalSubmissions: number
  avgTATDays: number | null
}

export interface DetailLogItem {
  id: string
  subject: string
  recruiter: string
  clientPOC: string
  receivedDate: string
  receivedTime: string
  submittedDate: string
  submittedTime: string
}

const MONTHLY_TIMELINE_DATA: MonthlyMetric[] = [
  { month: 'Apr 2026', requirementsReceived: 40, firstSubmissions: 0, totalSubmissions: 0, avgTATDays: null },
  { month: 'May 2026', requirementsReceived: 92, firstSubmissions: 19, totalSubmissions: 23, avgTATDays: 4.84 },
  { month: 'Jun 2026', requirementsReceived: 86, firstSubmissions: 41, totalSubmissions: 86, avgTATDays: 1.1 },
  { month: 'Jul 2026', requirementsReceived: 68, firstSubmissions: 52, totalSubmissions: 187, avgTATDays: 0.73 },
]

const FIRST_SUBMISSION_LOGS: DetailLogItem[] = [
  {
    id: 'REQ-2026-05-08-003',
    subject: 'TPC OSI PI Engineer / Lead Engineer - TPC Any LTTS',
    recruiter: 'Charlie Darwin',
    clientPOC: 'Trayeetanu Ganguly',
    receivedDate: '08 May 2026',
    receivedTime: '01:58 pm',
    submittedDate: '26 Jun 2026',
    submittedTime: '01:19 pm',
  },
  {
    id: 'REQ-2026-05-12-014',
    subject: 'TPC Data Analyst for Vadodara-TPC',
    recruiter: 'Charlie Darwin',
    clientPOC: 'Trayeetanu Ganguly',
    receivedDate: '12 May 2026',
    receivedTime: '04:05 pm',
    submittedDate: '01 Jun 2026',
    submittedTime: '03:22 pm',
  },
  {
    id: 'REQ-2026-05-19-010',
    subject: 'C# with Mobile Automation',
    recruiter: 'lakshmi.v Recruiter',
    clientPOC: 'Trayeetanu Ganguly',
    receivedDate: '19 May 2026',
    receivedTime: '05:30 am',
    submittedDate: '19 May 2026',
    submittedTime: '06:47 pm',
  },
  {
    id: 'REQ-2026-05-19-003',
    subject: 'TPC- MIG exhaust welding fixture / BIW welding fixture',
    recruiter: 'Suresh kulkarni',
    clientPOC: 'Trayeetanu Ganguly',
    receivedDate: '19 May 2026',
    receivedTime: '11:57 am',
    submittedDate: '29 May 2026',
    submittedTime: '08:27 pm',
  },
  {
    id: 'REQ-2026-05-21-004',
    subject: 'MIG welding Fixtures / Modular Fixtures',
    recruiter: 'Viswanath Reddy',
    clientPOC: 'Internal (data entry)',
    receivedDate: '21 May 2026',
    receivedTime: '05:30 am',
    submittedDate: '25 May 2026',
    submittedTime: '04:04 pm',
  },
  {
    id: 'REQ-2026-05-21-002',
    subject: 'DPS- TPC Golang, Kubernetes, NATS Bangalore',
    recruiter: 'Lingoji Pavani',
    clientPOC: 'Kiran N',
    receivedDate: '21 May 2026',
    receivedTime: '10:22 am',
    submittedDate: '21 May 2026',
    submittedTime: '06:34 pm',
  },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dataObj = payload[0].payload
    return (
      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs space-y-1.5 font-sans animate-in fade-in zoom-in-95 duration-150">
        <div className="font-extrabold text-blue-300 border-b border-slate-700 pb-1 flex items-center justify-between gap-4">
          <span>{label}</span>
          <span className="text-[10px] text-slate-400 font-normal">Monthly Timeline</span>
        </div>
        <div className="space-y-1 text-[11px] font-medium pt-0.5">
          <div className="flex justify-between gap-4">
            <span className="text-blue-400 font-bold">Requirements Received:</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.requirementsReceived}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-emerald-400 font-bold">Total Submissions:</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.totalSubmissions}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-300 font-bold">First Submissions:</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.firstSubmissions}</span>
          </div>
          <div className="flex justify-between gap-4 pt-1 border-t border-slate-800 text-purple-300 font-bold">
            <span>Avg First-Sub TAT:</span>
            <span className="tabular-nums text-purple-300">
              {dataObj.avgTATDays !== null ? `${dataObj.avgTATDays} Days` : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function MonthlyTimelinePerformanceChart() {
  const [data] = useState<MonthlyMetric[]>(MONTHLY_TIMELINE_DATA)
  const [logs] = useState<DetailLogItem[]>(FIRST_SUBMISSION_LOGS)
  const [showLogTable, setShowLogTable] = useState(true)

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6 font-sans">
      {/* 1. CHART TITLE */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#6B3BF6]">
              <Calendar className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Monthly: Requirements vs Total Submissions with TAT Trend (Apr-Jul 2026)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Recharts high-precision monthly timeline tracking Requirements Received, Total Submissions, and Average TAT (Days)
          </p>
        </div>
      </div>

      {/* 2. DUAL Y-AXIS COMBINATION GRAPH & MONTHLY TABLE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Monthly Summary Table */}
        <div className="lg:col-span-4 space-y-3">
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#1E3A8A] text-white text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Month</th>
                  <th className="py-3 px-2 text-center">Reqs</th>
                  <th className="py-3 px-2 text-center">First Sub</th>
                  <th className="py-3 px-2 text-center">Total Sub</th>
                  <th className="py-3 px-3 text-right">Avg TAT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {data.map(row => (
                  <tr key={row.month} className="hover:bg-purple-50/60 transition-colors">
                    <td className="py-3 px-3 font-extrabold text-slate-900">{row.month}</td>
                    <td className="py-3 px-2 text-center font-bold text-[#2563EB]">{row.requirementsReceived}</td>
                    <td className="py-3 px-2 text-center font-bold text-slate-700">{row.firstSubmissions}</td>
                    <td className="py-3 px-2 text-center font-extrabold text-[#84CC16]">{row.totalSubmissions}</td>
                    <td className="py-3 px-3 text-right font-bold text-purple-700">
                      {row.avgTATDays !== null ? `${row.avgTATDays}d` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Recharts Combination Chart */}
        <div className="lg:col-span-8 h-[300px] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={1} />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#84CC16" stopOpacity={1} />
                  <stop offset="100%" stopColor="#65A30D" stopOpacity={0.8} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 700, fill: '#334155' }} tickLine={false} />
              <YAxis yAxisId="left" orientation="left" domain={[0, 200]} tick={{ fontSize: 11, fontWeight: 700, fill: '#64748B' }} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 6]} unit="d" tick={{ fontSize: 11, fontWeight: 700, fill: '#7E22CE' }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 700, paddingTop: '10px' }} iconType="circle" />

              <Bar yAxisId="left" dataKey="requirementsReceived" name="Requirements Received" fill="url(#reqGrad)" radius={[6, 6, 0, 0]} maxBarSize={36} />
              <Bar yAxisId="left" dataKey="totalSubmissions" name="Total Submissions" fill="url(#subGrad)" radius={[6, 6, 0, 0]} maxBarSize={36} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgTATDays"
                name="Avg First-Sub TAT (days)"
                stroke="#9333EA"
                strokeWidth={3.5}
                connectNulls={true}
                dot={{ r: 5, fill: '#9333EA', stroke: '#FFFFFF', strokeWidth: 2 }}
                activeDot={{ r: 8, fill: '#6B21A8', stroke: '#FFFFFF', strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. FIRST-SUBMISSION DETAIL LOG TABLE */}
      <div className="pt-4 border-t border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#6B3BF6]" />
            <span>First-Submission Detail Log (Apr-Jul 2026)</span>
          </h3>
          <button
            onClick={() => setShowLogTable(!showLogTable)}
            className="text-xs font-bold text-[#6B3BF6] hover:underline cursor-pointer"
          >
            {showLogTable ? 'Hide Detail Log' : 'Show Detail Log (6)'}
          </button>
        </div>

        {showLogTable && (
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Requirement ID</th>
                  <th className="py-3 px-4">Requirement Subject</th>
                  <th className="py-3 px-4">Recruiter</th>
                  <th className="py-3 px-4">Client POC</th>
                  <th className="py-3 px-4">Received Date & Time</th>
                  <th className="py-3 px-4">Submitted Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {logs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{log.id}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{log.subject}</td>
                    <td className="py-3 px-4 font-bold text-purple-700">{log.recruiter}</td>
                    <td className="py-3 px-4 text-slate-600">{log.clientPOC}</td>
                    <td className="py-3 px-4 text-slate-500">
                      <div>{log.receivedDate}</div>
                      <span className="text-[10px] text-slate-400">{log.receivedTime}</span>
                    </td>
                    <td className="py-3 px-4 text-emerald-700 font-bold">
                      <div>{log.submittedDate}</div>
                      <span className="text-[10px] text-emerald-600 font-normal">{log.submittedTime}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
