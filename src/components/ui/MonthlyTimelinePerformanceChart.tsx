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
import { Role } from '../../types'

export interface MonthlyMetric {
  month: string
  requirementsReceived: number
  totalPositions: number
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
  positions: number
}

const MONTHLY_TIMELINE_DATA: MonthlyMetric[] = [
  { month: 'Apr 2026', requirementsReceived: 40, totalPositions: 95, firstSubmissions: 0, totalSubmissions: 0, avgTATDays: null },
  { month: 'May 2026', requirementsReceived: 92, totalPositions: 215, firstSubmissions: 19, totalSubmissions: 23, avgTATDays: 4.84 },
  { month: 'Jun 2026', requirementsReceived: 86, totalPositions: 198, firstSubmissions: 41, totalSubmissions: 86, avgTATDays: 1.1 },
  { month: 'Jul 2026', requirementsReceived: 68, totalPositions: 154, firstSubmissions: 52, totalSubmissions: 187, avgTATDays: 0.73 },
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
    positions: 6,
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
    positions: 4,
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
    positions: 8,
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
    positions: 5,
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
    positions: 3,
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
    positions: 7,
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
            <span className="text-indigo-400 font-bold">Total Positions:</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.totalPositions ?? 0}</span>
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

// Data for Lead Individual Performance
const MONTHLY_TIMELINE_DATA_INDIVIDUAL: MonthlyMetric[] = [
  { month: 'Apr 2026', requirementsReceived: 6, totalPositions: 15, firstSubmissions: 0, totalSubmissions: 0, avgTATDays: null },
  { month: 'May 2026', requirementsReceived: 14, totalPositions: 32, firstSubmissions: 4, totalSubmissions: 6, avgTATDays: 4.2 },
  { month: 'Jun 2026', requirementsReceived: 12, totalPositions: 28, firstSubmissions: 10, totalSubmissions: 18, avgTATDays: 1.2 },
  { month: 'Jul 2026', requirementsReceived: 13, totalPositions: 20, firstSubmissions: 12, totalSubmissions: 24, avgTATDays: 0.8 },
]

// Data for Team Members Comparison (Overall Team)
const MONTHLY_TIMELINE_DATA_TEAM: MonthlyMetric[] = [
  { month: 'Apr 2026', requirementsReceived: 40, totalPositions: 95, firstSubmissions: 0, totalSubmissions: 0, avgTATDays: null },
  { month: 'May 2026', requirementsReceived: 92, totalPositions: 215, firstSubmissions: 19, totalSubmissions: 23, avgTATDays: 4.84 },
  { month: 'Jun 2026', requirementsReceived: 86, totalPositions: 198, firstSubmissions: 41, totalSubmissions: 86, avgTATDays: 1.1 },
  { month: 'Jul 2026', requirementsReceived: 68, totalPositions: 154, firstSubmissions: 52, totalSubmissions: 187, avgTATDays: 0.73 },
]

export interface MonthlyTimelineProps {
  role?: Role
}

export function MonthlyTimelinePerformanceChart({ role = 'lead' }: MonthlyTimelineProps) {
  const [leadChartView, setLeadChartView] = useState<'individual' | 'team'>('individual')
  const [selectedTeammate, setSelectedTeammate] = useState<string>('All Team Members')

  // Dynamic monthly timeline dataset based on view mode and teammate filter
  const data = React.useMemo(() => {
    if (leadChartView === 'individual') return MONTHLY_TIMELINE_DATA_INDIVIDUAL
    if (selectedTeammate === 'Marcus Chen') {
      return [
        { month: 'Apr 2026', requirementsReceived: 12, totalPositions: 28, firstSubmissions: 0, totalSubmissions: 0, avgTATDays: null },
        { month: 'May 2026', requirementsReceived: 28, totalPositions: 65, firstSubmissions: 6, totalSubmissions: 8, avgTATDays: 4.1 },
        { month: 'Jun 2026', requirementsReceived: 26, totalPositions: 60, firstSubmissions: 14, totalSubmissions: 28, avgTATDays: 1.0 },
        { month: 'Jul 2026', requirementsReceived: 20, totalPositions: 45, firstSubmissions: 18, totalSubmissions: 62, avgTATDays: 0.65 },
      ]
    }
    if (selectedTeammate === 'Priya Sharma') {
      return [
        { month: 'Apr 2026', requirementsReceived: 10, totalPositions: 24, firstSubmissions: 0, totalSubmissions: 0, avgTATDays: null },
        { month: 'May 2026', requirementsReceived: 24, totalPositions: 55, firstSubmissions: 5, totalSubmissions: 6, avgTATDays: 4.9 },
        { month: 'Jun 2026', requirementsReceived: 22, totalPositions: 50, firstSubmissions: 10, totalSubmissions: 22, avgTATDays: 1.3 },
        { month: 'Jul 2026', requirementsReceived: 18, totalPositions: 40, firstSubmissions: 12, totalSubmissions: 48, avgTATDays: 0.8 },
      ]
    }
    if (selectedTeammate === 'Arvind GR') {
      return [
        { month: 'Apr 2026', requirementsReceived: 6, totalPositions: 14, firstSubmissions: 0, totalSubmissions: 0, avgTATDays: null },
        { month: 'May 2026', requirementsReceived: 12, totalPositions: 28, firstSubmissions: 2, totalSubmissions: 3, avgTATDays: 5.2 },
        { month: 'Jun 2026', requirementsReceived: 10, totalPositions: 24, firstSubmissions: 4, totalSubmissions: 10, avgTATDays: 1.4 },
        { month: 'Jul 2026', requirementsReceived: 8, totalPositions: 18, firstSubmissions: 6, totalSubmissions: 16, avgTATDays: 0.9 },
      ]
    }
    return MONTHLY_TIMELINE_DATA_TEAM
  }, [leadChartView, selectedTeammate])

  // Filter logs by selected teammate or show team logs
  const logs = React.useMemo(() => {
    if (leadChartView === 'individual') {
      return FIRST_SUBMISSION_LOGS.filter(l => l.recruiter.toLowerCase().includes('harish') || l.recruiter.toLowerCase().includes('charlie'))
    }
    if (selectedTeammate !== 'All Team Members') {
      return FIRST_SUBMISSION_LOGS.filter(l => l.recruiter.toLowerCase().includes(selectedTeammate.toLowerCase()))
    }
    return FIRST_SUBMISSION_LOGS
  }, [leadChartView, selectedTeammate])

  const totalReqs = data.reduce((acc, curr) => acc + curr.requirementsReceived, 0)
  const totalPositionsSum = data.reduce((acc, curr) => acc + curr.totalPositions, 0)
  const totalFirstSubs = data.reduce((acc, curr) => acc + curr.firstSubmissions, 0)
  const totalSubsSum = data.reduce((acc, curr) => acc + curr.totalSubmissions, 0)

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
              {role !== 'recruiter'
                ? leadChartView === 'individual'
                  ? 'Lead Individual Performance: Monthly Requirements, Total Positions & Submissions Trend'
                  : selectedTeammate !== 'All Team Members'
                  ? `${selectedTeammate}: Monthly Requirements vs Submissions Performance`
                  : 'Team Members Comparison: Monthly Requirements vs Submissions Trend'
                : 'Monthly: Requirements, Total Positions & Submissions with TAT Trend'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            {role !== 'recruiter'
              ? leadChartView === 'individual'
                ? 'Monthly timeline tracking requirements received, total position openings & submissions for Harish Gadipally (Team Lead)'
                : selectedTeammate !== 'All Team Members'
                ? `Monthly timeline tracking requirements received, positions & submissions for ${selectedTeammate}`
                : 'Monthly timeline comparison for all Team Members under Harish Gadipally (Engineering Pod)'
              : 'Monthly timeline tracking Requirements Received, Total Requirement Positions, Submissions, and Average TAT'}
          </p>
        </div>

        {/* Controls: Lead View Mode Toggle & Teammate Filter */}
        {role !== 'recruiter' && (
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLeadChartView('individual')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  leadChartView === 'individual' ? 'bg-[#6B3BF6] text-white shadow-2xs font-extrabold' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                Lead Individual Performance
              </button>
              <button
                type="button"
                onClick={() => setLeadChartView('team')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  leadChartView === 'team' ? 'bg-blue-600 text-white shadow-2xs font-extrabold' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                Team Members Comparison
              </button>
            </div>

            {/* Teammate Filter Dropdown (Active in Team Mode) */}
            {leadChartView === 'team' && (
              <select
                value={selectedTeammate}
                onChange={e => setSelectedTeammate(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-800 focus:outline-none focus:border-[#6B3BF6] cursor-pointer shadow-2xs"
              >
                <option value="All Team Members">All Team Members (Engineering Pod)</option>
                <option value="Harish Gadipally">Harish Gadipally (Team Lead)</option>
                <option value="Marcus Chen">Marcus Chen (Senior Recruiter)</option>
                <option value="Priya Sharma">Priya Sharma (IT Recruiter)</option>
                <option value="Arvind GR">Arvind GR (Sourcing Specialist)</option>
              </select>
            )}
          </div>
        )}
      </div>

      {/* 2. DUAL Y-AXIS COMBINATION GRAPH & MONTHLY TABLE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Monthly Summary Table */}
        <div className="lg:col-span-5 space-y-3">
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#1E3A8A] text-white text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-2.5">Month</th>
                  <th className="py-3 px-2 text-center">Reqs</th>
                  <th className="py-3 px-2 text-center">Positions</th>
                  <th className="py-3 px-2 text-center">First Sub</th>
                  <th className="py-3 px-2 text-center">Total Sub</th>
                  <th className="py-3 px-2.5 text-right">Avg TAT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {data.map(row => (
                  <tr key={row.month} className="hover:bg-purple-50/60 transition-colors">
                    <td className="py-3 px-2.5 font-extrabold text-slate-900">{row.month}</td>
                    <td className="py-3 px-2 text-center font-bold text-[#2563EB]">{row.requirementsReceived}</td>
                    <td className="py-3 px-2 text-center font-extrabold text-indigo-600">{row.totalPositions}</td>
                    <td className="py-3 px-2 text-center font-bold text-slate-700">{row.firstSubmissions}</td>
                    <td className="py-3 px-2 text-center font-extrabold text-[#84CC16]">{row.totalSubmissions}</td>
                    <td className="py-3 px-2.5 text-right font-bold text-purple-700">
                      {row.avgTATDays !== null ? `${row.avgTATDays}d` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 border-t border-slate-200 text-slate-900 font-extrabold">
                  <td className="py-2.5 px-2.5 text-xs">Total YTD</td>
                  <td className="py-2.5 px-2 text-center text-blue-700">{totalReqs}</td>
                  <td className="py-2.5 px-2 text-center text-indigo-700">{totalPositionsSum}</td>
                  <td className="py-2.5 px-2 text-center text-slate-700">{totalFirstSubs}</td>
                  <td className="py-2.5 px-2 text-center text-lime-700">{totalSubsSum}</td>
                  <td className="py-2.5 px-2.5 text-right text-purple-700">1.67d</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Right Column: Recharts Combination Chart */}
        <div className="lg:col-span-7 h-[300px] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={1} />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="posGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#84CC16" stopOpacity={1} />
                  <stop offset="100%" stopColor="#65A30D" stopOpacity={0.8} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 700, fill: '#334155' }} tickLine={false} />
              <YAxis yAxisId="left" orientation="left" domain={[0, 250]} tick={{ fontSize: 11, fontWeight: 700, fill: '#64748B' }} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 6]} unit="d" tick={{ fontSize: 11, fontWeight: 700, fill: '#7E22CE' }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingTop: '10px' }} iconType="circle" />

              <Bar yAxisId="left" dataKey="requirementsReceived" name="Requirements Received" fill="url(#reqGrad)" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar yAxisId="left" dataKey="totalPositions" name="Total Positions" fill="url(#posGrad)" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar yAxisId="left" dataKey="totalSubmissions" name="Total Submissions" fill="url(#subGrad)" radius={[4, 4, 0, 0]} maxBarSize={28} />
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

      {/* 3. MONTHLY REQUIREMENT POSITIONS LOG TABLE */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#6B3BF6]" />
              <span>Monthly Requirement Positions Log</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Breakdown of total positions count (openings) for monthly received requirements
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-[11px] font-extrabold">
            Total Logged Positions: {logs.reduce((acc, curr) => acc + (curr.positions || 0), 0)} Positions
          </span>
        </div>

        <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-3">REQ ID & SUBJECT</th>
                <th className="py-3 px-3">RECRUITER</th>
                <th className="py-3 px-3">CLIENT POC</th>
                <th className="py-3 px-3 text-center bg-indigo-50/70 text-indigo-900 font-extrabold">POSITIONS (OPENINGS)</th>
                <th className="py-3 px-3">RECEIVED ON</th>
                <th className="py-3 px-3">SUBMITTED ON</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900">
                    <div>{log.subject}</div>
                    <span className="text-[10px] text-slate-400 font-normal font-mono">{log.id}</span>
                  </td>
                  <td className="py-3 px-3 font-bold text-purple-700">{log.recruiter}</td>
                  <td className="py-3 px-3 text-slate-600">{log.clientPOC}</td>
                  <td className="py-3 px-3 text-center font-black text-indigo-900 bg-indigo-50/40 text-sm">
                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-800 border border-indigo-200 inline-block">
                      {log.positions} Openings
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{log.receivedDate} ({log.receivedTime})</td>
                  <td className="py-3 px-3 text-emerald-700 font-bold">{log.submittedDate} ({log.submittedTime})</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
