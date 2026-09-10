import React from 'react'
import { BarChart3, Sparkles, TrendingUp } from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { RecruiterDetailData } from '../RecruiterDetailAnalyticsPage'
import { RecruiterFunnelAndClientCharts } from './RecruiterFunnelAndClientCharts'

interface RecruiterPerfChartsSectionProps {
  recruiter: RecruiterDetailData
}

export function RecruiterPerfChartsSection({ recruiter }: RecruiterPerfChartsSectionProps) {
  const subCount = recruiter.submissionsCount || 0
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 rounded-2xl shadow-sm border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#6B3BF6]/20 border border-[#6B3BF6]/40 flex items-center justify-center text-purple-300">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white font-sans tracking-tight">
              {recruiter.name} — Work Performance & Sourcing Analytics
            </h3>
            <p className="text-xs text-slate-300 font-sans font-medium mt-0.5">
              Weekly progress velocity, pipeline conversion, and client demand fulfillment breakdown.
            </p>
          </div>
        </div>
      </div>

      {/* Main Analytics Chart */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#6B3BF6]" />
            <h4 className="text-sm font-bold text-slate-900 font-sans">Monthly Velocity & Progress Trend</h4>
          </div>
          <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
            Target Velocity: {recruiter.weeklyProgress || '85%'}
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { week: 'Week 1', sourced: Math.round(subCount * 0.35), submissions: Math.round(subCount * 0.22), interviews: Math.round((recruiter.interviewsCount || 10) * 0.2) },
                { week: 'Week 2', sourced: Math.round(subCount * 0.45), submissions: Math.round(subCount * 0.28), interviews: Math.round((recruiter.interviewsCount || 10) * 0.25) },
                { week: 'Week 3', sourced: Math.round(subCount * 0.40), submissions: Math.round(subCount * 0.24), interviews: Math.round((recruiter.interviewsCount || 10) * 0.25) },
                { week: 'Week 4 (Current)', sourced: Math.round(subCount * 0.52), submissions: Math.round(subCount * 0.35), interviews: Math.round((recruiter.interviewsCount || 10) * 0.3) },
              ]}
              margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="recSourcedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="recSubsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6B3BF6" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#6B3BF6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="recInterviewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" />
              <Tooltip
                content={({ active, payload, label }: any) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs space-y-1.5 font-sans">
                        <p className="font-bold text-blue-300 border-b border-slate-700 pb-1">{label}</p>
                        <div className="space-y-1 font-mono text-[11px]">
                          <p className="text-blue-400 flex justify-between gap-4">
                            <span>Sourced:</span>
                            <strong className="text-white">{payload[0]?.value}</strong>
                          </p>
                          <p className="text-purple-300 flex justify-between gap-4">
                            <span>Submissions:</span>
                            <strong className="text-white">{payload[1]?.value}</strong>
                          </p>
                          <p className="text-emerald-400 flex justify-between gap-4">
                            <span>Interviews:</span>
                            <strong className="text-white">{payload[2]?.value}</strong>
                          </p>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area type="monotone" dataKey="sourced" name="Candidates Sourced" stroke="#3B82F6" strokeWidth={2.5} fillOpacity={1} fill="url(#recSourcedGrad)" />
              <Area type="monotone" dataKey="submissions" name="Submissions Sent" stroke="#6B3BF6" strokeWidth={2.5} fillOpacity={1} fill="url(#recSubsGrad)" />
              <Area type="monotone" dataKey="interviews" name="Interviews Scheduled" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#recInterviewsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart Row 2: Funnel & Client Workload */}
      <RecruiterFunnelAndClientCharts recruiter={recruiter} />
    </div>
  )
}

