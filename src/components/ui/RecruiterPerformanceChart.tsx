import React, { useState, useMemo } from 'react'
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
import { BarChart3, TrendingUp, Sparkles } from 'lucide-react'
import { Role } from '../../types'

export interface RecruiterChartMetric {
  name: string
  fullName: string
  totalSubmissions: number
  totalRequirements: number
  firstSubmissions: number
  avgTATDays: number
}

// Data matching all recruiters for Super Admin / Admin / Lead
const ALL_RECRUITERS_DATA: RecruiterChartMetric[] = [
  { name: 'lakshmi.v', fullName: 'lakshmi.v Recruiter', totalSubmissions: 143, totalRequirements: 69, firstSubmissions: 53, avgTATDays: 0.62 },
  { name: 'Suresh k.', fullName: 'Suresh kulkarni', totalSubmissions: 40, totalRequirements: 26, firstSubmissions: 13, avgTATDays: 3.31 },
  { name: 'Charlie D.', fullName: 'Charlie Darwin', totalSubmissions: 37, totalRequirements: 27, firstSubmissions: 22, avgTATDays: 3.32 },
  { name: 'Harini S.', fullName: 'Harini Sindey', totalSubmissions: 32, totalRequirements: 13, firstSubmissions: 6, avgTATDays: 0.67 },
  { name: 'rahimoon S.', fullName: 'rahimoon Shaik', totalSubmissions: 24, totalRequirements: 14, firstSubmissions: 11, avgTATDays: 1.18 },
  { name: 'Lingoji P.', fullName: 'Lingoji Pavani', totalSubmissions: 11, totalRequirements: 7, firstSubmissions: 4, avgTATDays: 0.25 },
  { name: 'Viswanath R.', fullName: 'Viswanath Reddy', totalSubmissions: 5, totalRequirements: 4, firstSubmissions: 2, avgTATDays: 2.0 },
  { name: 'Rachana G.', fullName: 'Rachana Golkonda', totalSubmissions: 3, totalRequirements: 3, firstSubmissions: 0, avgTATDays: 0.0 },
  { name: 'Nithya M.', fullName: 'Nithya Maripelly', totalSubmissions: 1, totalRequirements: 1, firstSubmissions: 1, avgTATDays: 4.0 },
]

// Personal monthly performance trend data for logged-in recruiter (Marcus Chen)
const RECRUITER_PERSONAL_TREND_DATA: RecruiterChartMetric[] = [
  { name: 'May 2026', fullName: 'May 2026 Performance', totalSubmissions: 28, totalRequirements: 10, firstSubmissions: 8, avgTATDays: 3.2 },
  { name: 'Jun 2026', fullName: 'June 2026 Performance', totalSubmissions: 36, totalRequirements: 12, firstSubmissions: 10, avgTATDays: 2.8 },
  { name: 'Jul 2026', fullName: 'July 2026 Performance', totalSubmissions: 42, totalRequirements: 14, firstSubmissions: 12, avgTATDays: 2.1 },
  { name: 'Aug 2026', fullName: 'August 2026 (MTD)', totalSubmissions: 36, totalRequirements: 9, firstSubmissions: 8, avgTATDays: 1.9 },
]

// Personal monthly performance trend data for Team Lead (Harish Gadipally)
const LEAD_PERSONAL_TREND_DATA: RecruiterChartMetric[] = [
  { name: 'May 2026', fullName: 'May 2026 Performance', totalSubmissions: 34, totalRequirements: 11, firstSubmissions: 12, avgTATDays: 2.4 },
  { name: 'Jun 2026', fullName: 'June 2026 Performance', totalSubmissions: 40, totalRequirements: 12, firstSubmissions: 14, avgTATDays: 1.8 },
  { name: 'Jul 2026', fullName: 'July 2026 Performance', totalSubmissions: 42, totalRequirements: 13, firstSubmissions: 15, avgTATDays: 1.4 },
  { name: 'Aug 2026', fullName: 'August 2026 (MTD)', totalSubmissions: 26, totalRequirements: 9, firstSubmissions: 7, avgTATDays: 1.2 },
]

// Team Lead's team performance comparison data (Harish Gadipally & team members)
const LEAD_TEAM_CHART_DATA: RecruiterChartMetric[] = [
  { name: 'Harish G. (Lead)', fullName: 'Harish Gadipally (Team Lead)', totalSubmissions: 142, totalRequirements: 45, firstSubmissions: 48, avgTATDays: 1.2 },
  { name: 'Marcus C.', fullName: 'Marcus Chen (Senior Recruiter)', totalSubmissions: 48, totalRequirements: 14, firstSubmissions: 18, avgTATDays: 1.5 },
  { name: 'Priya S.', fullName: 'Priya Sharma (IT Recruiter)', totalSubmissions: 36, totalRequirements: 12, firstSubmissions: 14, avgTATDays: 1.8 },
  { name: 'Suresh K.', fullName: 'Suresh kulkarni (Recruiter)', totalSubmissions: 46, totalRequirements: 27, firstSubmissions: 16, avgTATDays: 2.1 },
]

interface RecruiterPerformanceChartProps {
  role?: Role
  recruiterName?: string
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dataObj = payload[0].payload
    return (
      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs space-y-2 font-sans animate-in fade-in zoom-in-95 duration-150">
        <div className="font-extrabold text-blue-300 border-b border-slate-700 pb-1 flex items-center justify-between gap-6">
          <span>{dataObj.fullName || label}</span>
          <span className="text-[10px] text-slate-400 font-normal">Recharts Engine</span>
        </div>
        <div className="space-y-1 text-[11px]">
          <div className="flex justify-between gap-4">
            <span className="text-blue-400 font-bold">Total Submissions:</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.totalSubmissions}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-red-400 font-bold">Total Requirements:</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.totalRequirements}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-emerald-400 font-bold">First Submissions (won):</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.firstSubmissions}</span>
          </div>
          <div className="flex justify-between gap-4 pt-1 border-t border-slate-800 text-purple-300 font-bold">
            <span>Avg First-Submission TAT:</span>
            <span className="tabular-nums text-purple-300">{dataObj.avgTATDays} Days</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function RecruiterPerformanceChart({
  role = 'recruiter',
  recruiterName = 'Marcus Chen',
}: RecruiterPerformanceChartProps) {
  const [leadChartView, setLeadChartView] = useState<'individual' | 'team'>('individual')

  const chartData = useMemo(() => {
    if (role === 'lead') {
      return leadChartView === 'individual' ? LEAD_PERSONAL_TREND_DATA : LEAD_TEAM_CHART_DATA
    }
    if (role === 'recruiter') {
      return RECRUITER_PERSONAL_TREND_DATA
    }
    return ALL_RECRUITERS_DATA
  }, [role, leadChartView])

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5 font-sans">
      {/* 1. CHART HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            {role === 'recruiter' || (role === 'lead' && leadChartView === 'individual') ? (
              <TrendingUp className="w-5 h-5 text-[#6B3BF6]" />
            ) : (
              <BarChart3 className="w-5 h-5 text-[#2563EB]" />
            )}
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {role === 'lead'
                ? leadChartView === 'individual'
                  ? `Team Lead Individual Performance Timeline & TAT Trend (${recruiterName || 'Harish Gadipally'})`
                  : `Team Members Sourcing & Turnaround Comparison`
                : role === 'recruiter'
                ? `My Performance Timeline & Turnaround Time Trend (${recruiterName})`
                : 'Recruiter: Submissions, Requirements & First-Submission TAT Trend'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {role === 'lead'
              ? leadChartView === 'individual'
                ? `Individual monthly performance trend, requirement submissions, and turnaround SLA for ${recruiterName || 'Harish Gadipally'}`
                : `Sourcing and turnaround comparison across team recruiters.`
              : role === 'recruiter'
              ? `Personal performance timeline for ${recruiterName}`
              : 'Organization-wide recruiter comparison'}
          </p>
        </div>

        {/* Lead View Mode Toggle */}
        {role === 'lead' && (
          <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setLeadChartView('individual')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                leadChartView === 'individual' ? 'bg-[#6B3BF6] text-white shadow-2xs font-bold' : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              Lead Individual Performance
            </button>
            <button
              onClick={() => setLeadChartView('team')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                leadChartView === 'team' ? 'bg-blue-600 text-white shadow-2xs font-bold' : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              Team Members Comparison
            </button>
          </div>
        )}
      </div>

      {/* 2. RECHARTS CANVAS */}
      <div className="h-[330px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={1} />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#DC2626" stopOpacity={1} />
                  <stop offset="100%" stopColor="#B91C1C" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16A34A" stopOpacity={1} />
                  <stop offset="100%" stopColor="#15803D" stopOpacity={0.8} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700, fill: '#334155' }} tickLine={false} />
              <YAxis
                yAxisId="left"
                orientation="left"
                domain={[0, role === 'recruiter' ? 50 : 160]}
                tick={{ fontSize: 11, fontWeight: 700, fill: '#64748B' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 4.5]}
                unit="d"
                tick={{ fontSize: 11, fontWeight: 700, fill: '#7E22CE' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '12px', fontWeight: 700, paddingTop: '10px' }}
                iconType="circle"
              />

              <Bar yAxisId="left" dataKey="totalSubmissions" name="Total Submissions" fill="url(#blueGrad)" radius={[6, 6, 0, 0]} maxBarSize={32} />
              <Bar yAxisId="left" dataKey="totalRequirements" name="Total Requirements" fill="url(#redGrad)" radius={[6, 6, 0, 0]} maxBarSize={32} />
              <Bar yAxisId="left" dataKey="firstSubmissions" name="First Submissions (won)" fill="url(#greenGrad)" radius={[6, 6, 0, 0]} maxBarSize={32} />

              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgTATDays"
                name="Avg First-Sub TAT (days)"
                stroke="#9333EA"
                strokeWidth={3.5}
                dot={{ r: 5, fill: '#9333EA', stroke: '#FFFFFF', strokeWidth: 2 }}
                activeDot={{ r: 8, fill: '#6B21A8', stroke: '#FFFFFF', strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
    </div>
  )
}
