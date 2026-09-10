import React from 'react'
import { Layers, Briefcase } from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts'
import { RecruiterDetailData } from '../RecruiterDetailAnalyticsPage'

interface RecruiterFunnelAndClientChartsProps {
  recruiter: RecruiterDetailData
}

export function RecruiterFunnelAndClientCharts({ recruiter }: RecruiterFunnelAndClientChartsProps) {
  const subCount = recruiter.submissionsCount || 0
  const shortCount = recruiter.shortlistedCount || 0
  const hiresCount = recruiter.hiresCount || 0
  const reqList = recruiter.requirementsList || []

  const funnelData = [
    { stage: 'Sourced', count: subCount + 28, color: '#3B82F6' },
    { stage: 'Submitted to Lead', count: subCount, color: '#6B3BF6' },
    { stage: 'Client Shortlisted', count: shortCount, color: '#8B5CF6' },
    { stage: 'Interviewing', count: recruiter.interviewsCount || 10, color: '#EC4899' },
    { stage: 'Placed & Hired', count: hiresCount, color: '#10B981' },
  ]

  const clientData = reqList.map(req => ({
    client: req.client.length > 15 ? req.client.substring(0, 13) + '...' : req.client,
    fullClient: req.client,
    submissions: req.submissions,
    interviews: req.interviews,
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#6B3BF6]" />
            <span>Candidate Pipeline Stage Funnel</span>
          </h4>
          <p className="text-xs text-slate-500">
            Conversion distribution from initial sourcing to placement for {recruiter.name}
          </p>
        </div>

        <div className="h-60 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={funnelData}
              margin={{ top: 5, right: 30, left: 45, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" />
              <YAxis type="category" dataKey="stage" tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} stroke="#E2E8F0" width={110} />
              <Tooltip
                content={({ active, payload }: any) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-xl text-xs font-mono shadow-2xl border border-slate-700">
                        <p className="font-bold text-purple-300">{item.stage}</p>
                        <p className="text-white mt-1">Candidate Count: <strong>{item.count}</strong></p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span>Client Account Workload & Submissions</span>
          </h4>
          <p className="text-xs text-slate-500">
            Number of submissions made by {recruiter.name} per client account
          </p>
        </div>

        <div className="h-60 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={clientData}
              margin={{ top: 10, right: 20, left: -10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="client" tick={{ fontSize: 10, fill: '#64748B' }} stroke="#E2E8F0" angle={-15} textAnchor="end" />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" />
              <Tooltip
                content={({ active, payload }: any) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-xl text-xs font-mono shadow-2xl border border-slate-700">
                        <p className="font-bold text-blue-300">{item.fullClient}</p>
                        <p className="text-purple-300 mt-1">Submissions: <strong>{item.submissions}</strong></p>
                        <p className="text-emerald-400">Interviews: <strong>{item.interviews}</strong></p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="submissions" name="Submissions" fill="#6B3BF6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="interviews" name="Interviews" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
