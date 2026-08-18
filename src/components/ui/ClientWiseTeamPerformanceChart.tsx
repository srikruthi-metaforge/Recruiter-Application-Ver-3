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
  AreaChart,
  Area,
  Cell,
} from 'recharts'
import { Building2, Users, Layers, TrendingUp, Sparkles, Filter, Briefcase, Award } from 'lucide-react'

export interface ClientTeamPerformanceData {
  clientName: string
  engineeringPodSubs: number
  enterprisePodSubs: number
  cloudErpPodSubs: number
  totalRequirements: number
  interviewsScheduled: number
  hiresCount: number
  avgTatDays: number
  conversionRate: string
  activeRecruiters: number
}

const CLIENT_TEAM_PERFORMANCE_LIST: ClientTeamPerformanceData[] = [
  {
    clientName: 'Accenture',
    engineeringPodSubs: 142,
    enterprisePodSubs: 38,
    cloudErpPodSubs: 24,
    totalRequirements: 45,
    interviewsScheduled: 36,
    hiresCount: 11,
    avgTatDays: 1.8,
    conversionRate: '22.9%',
    activeRecruiters: 6,
  },
  {
    clientName: 'Goldman Sachs',
    engineeringPodSubs: 28,
    enterprisePodSubs: 194,
    cloudErpPodSubs: 12,
    totalRequirements: 72,
    interviewsScheduled: 24,
    hiresCount: 12,
    avgTatDays: 2.1,
    conversionRate: '26.2%',
    activeRecruiters: 5,
  },
  {
    clientName: 'LTTS Automotive',
    engineeringPodSubs: 86,
    enterprisePodSubs: 14,
    cloudErpPodSubs: 18,
    totalRequirements: 32,
    interviewsScheduled: 18,
    hiresCount: 6,
    avgTatDays: 2.4,
    conversionRate: '20.5%',
    activeRecruiters: 4,
  },
  {
    clientName: 'JPMorgan Chase',
    engineeringPodSubs: 18,
    enterprisePodSubs: 112,
    cloudErpPodSubs: 16,
    totalRequirements: 38,
    interviewsScheduled: 22,
    hiresCount: 8,
    avgTatDays: 2.0,
    conversionRate: '24.8%',
    activeRecruiters: 4,
  },
  {
    clientName: 'Infosys',
    engineeringPodSubs: 64,
    enterprisePodSubs: 22,
    cloudErpPodSubs: 28,
    totalRequirements: 28,
    interviewsScheduled: 16,
    hiresCount: 5,
    avgTatDays: 1.9,
    conversionRate: '21.4%',
    activeRecruiters: 3,
  },
  {
    clientName: 'Morgan Stanley',
    engineeringPodSubs: 12,
    enterprisePodSubs: 42,
    cloudErpPodSubs: 110,
    totalRequirements: 38,
    interviewsScheduled: 18,
    hiresCount: 7,
    avgTatDays: 2.3,
    conversionRate: '24.1%',
    activeRecruiters: 3,
  },
  {
    clientName: 'HCL Technologies',
    engineeringPodSubs: 38,
    enterprisePodSubs: 16,
    cloudErpPodSubs: 22,
    totalRequirements: 18,
    interviewsScheduled: 12,
    hiresCount: 4,
    avgTatDays: 2.2,
    conversionRate: '19.8%',
    activeRecruiters: 3,
  },
  {
    clientName: 'Wipro',
    engineeringPodSubs: 24,
    enterprisePodSubs: 10,
    cloudErpPodSubs: 14,
    totalRequirements: 12,
    interviewsScheduled: 8,
    hiresCount: 2,
    avgTatDays: 2.5,
    conversionRate: '16.7%',
    activeRecruiters: 2,
  },
]

export function ClientWiseTeamPerformanceChart() {
  const [selectedClient, setSelectedClient] = useState<string>('All Clients')

  const filteredData =
    selectedClient === 'All Clients'
      ? CLIENT_TEAM_PERFORMANCE_LIST
      : CLIENT_TEAM_PERFORMANCE_LIST.filter(c => c.clientName === selectedClient)

  // Totals calculations
  const totalReqs = filteredData.reduce((acc, c) => acc + c.totalRequirements, 0)
  const totalEngSubs = filteredData.reduce((acc, c) => acc + c.engineeringPodSubs, 0)
  const totalEntSubs = filteredData.reduce((acc, c) => acc + c.enterprisePodSubs, 0)
  const totalCloudSubs = filteredData.reduce((acc, c) => acc + c.cloudErpPodSubs, 0)
  const totalSubs = totalEngSubs + totalEntSubs + totalCloudSubs
  const totalInterviews = filteredData.reduce((acc, c) => acc + c.interviewsScheduled, 0)
  const totalHires = filteredData.reduce((acc, c) => acc + c.hiresCount, 0)

  return (
    <div className="space-y-6 font-sans">
      {/* 1. TOP EXECUTIVE HEADER & CLIENT SELECTOR TOGGLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#6B3BF6]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Client-wise Team Performance Overview Graphs</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-[#6B3BF6] border border-purple-200">
                  Visual Analytics
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Sourcing velocity, team pod distribution, and candidate conversion per client account
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#6B3BF6]" />
            <span>Select Client Account:</span>
          </label>
          <select
            value={selectedClient}
            onChange={e => setSelectedClient(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6] cursor-pointer shadow-2xs min-w-44"
          >
            <option value="All Clients">All Clients (Executive View)</option>
            {CLIENT_TEAM_PERFORMANCE_LIST.map(c => (
              <option key={c.clientName} value={c.clientName}>
                {c.clientName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. SUMMARY KPI CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-1.5 shadow-2xs">
          <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">
            Total Requirements
          </span>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{totalReqs}</p>
          <span className="text-xs font-semibold text-blue-700">Client Reqs Received</span>
        </div>

        <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-5 space-y-1.5 shadow-2xs">
          <span className="text-[11px] font-bold text-[#5B51D8] uppercase tracking-wider block">
            Total Submissions
          </span>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{totalSubs}</p>
          <span className="text-xs font-semibold text-[#5B51D8]">Candidates Submitted</span>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 space-y-1.5 shadow-2xs">
          <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider block">
            Total Interviews
          </span>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{totalInterviews}</p>
          <span className="text-xs font-semibold text-purple-700">Scheduled Sessions</span>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-1.5 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
            Successful Hires
          </span>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{totalHires}</p>
          <span className="text-xs font-semibold text-emerald-700">Candidates Placed</span>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-1.5 shadow-2xs">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
            Avg Turnaround (TAT)
          </span>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">1.9 Days</p>
          <span className="text-xs font-semibold text-amber-700">Speed to Submit</span>
        </div>
      </div>

      {/* 3. GRAPH 1: TEAM POD SUBMISSION DISTRIBUTION BY CLIENT (STACKED BAR CHART) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-4.5 h-4.5 text-[#6B3BF6]" />
              <span>Team Pod Sourcing & Submissions by Client Account</span>
            </h3>
            <p className="text-xs text-slate-500">
              Contribution of Engineering Pod vs Enterprise Accounts Pod vs Cloud & ERP Pod per client
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-slate-600 font-medium">Engineering Pod</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#6B3BF6]" />
              <span className="text-slate-600 font-medium">Enterprise Pod</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-600 font-medium">Cloud & ERP Pod</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData} margin={{ top: 10, right: 20, left: -10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="clientName" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" angle={-15} textAnchor="end" />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" />
              <Tooltip
                content={({ active, payload, label }: any) => {
                  if (active && payload && payload.length) {
                    const dataObj = payload[0].payload as ClientTeamPerformanceData
                    return (
                      <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 text-xs space-y-2 font-sans">
                        <div className="font-extrabold text-purple-300 border-b border-slate-700 pb-1 flex justify-between gap-4">
                          <span>{label} Account</span>
                          <span className="text-[10px] text-slate-400 font-mono">{dataObj.activeRecruiters} Recruiters</span>
                        </div>
                        <div className="space-y-1 font-mono text-[11px]">
                          <p className="text-blue-400 flex justify-between gap-4">
                            <span>Engineering Pod:</span>
                            <strong className="text-white">{dataObj.engineeringPodSubs}</strong>
                          </p>
                          <p className="text-purple-300 flex justify-between gap-4">
                            <span>Enterprise Pod:</span>
                            <strong className="text-white">{dataObj.enterprisePodSubs}</strong>
                          </p>
                          <p className="text-emerald-400 flex justify-between gap-4">
                            <span>Cloud & ERP Pod:</span>
                            <strong className="text-white">{dataObj.cloudErpPodSubs}</strong>
                          </p>
                          <div className="border-t border-slate-800 pt-1 text-slate-300 flex justify-between gap-4 font-bold">
                            <span>Total Submissions:</span>
                            <strong className="text-white">{dataObj.engineeringPodSubs + dataObj.enterprisePodSubs + dataObj.cloudErpPodSubs}</strong>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="engineeringPodSubs" name="Engineering Pod" stackId="a" fill="#3B82F6" />
              <Bar dataKey="enterprisePodSubs" name="Enterprise Pod" stackId="a" fill="#6B3BF6" />
              <Bar dataKey="cloudErpPodSubs" name="Cloud & ERP Pod" stackId="a" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. TWO-COLUMN GRID FOR PIPELINE RETENTION & CONVERSION EFFICIENCY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph 2: Client Requirements vs Interviews vs Hires */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>Client Funnel: Requirements ➔ Interviews ➔ Hires</span>
            </h4>
            <p className="text-xs text-slate-500">
              Requirements received vs interviews scheduled vs hires per client account
            </p>
          </div>

          <div className="h-64 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData} margin={{ top: 10, right: 15, left: -15, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="clientName" tick={{ fontSize: 10, fill: '#64748B' }} stroke="#E2E8F0" angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" />
                <Tooltip
                  content={({ active, payload, label }: any) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl text-xs font-mono shadow-2xl border border-slate-700">
                          <p className="font-bold text-blue-300">{label}</p>
                          <p className="text-blue-400 mt-1">Total Requirements: <strong>{item.totalRequirements}</strong></p>
                          <p className="text-purple-300">Interviews Scheduled: <strong>{item.interviewsScheduled}</strong></p>
                          <p className="text-emerald-400">Successful Hires: <strong>{item.hiresCount}</strong></p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="totalRequirements" name="Total Reqs" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="interviewsScheduled" name="Interviews" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="hiresCount" name="Hires" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graph 3: Client Turnaround Time (TAT) & Conversion Rates Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Client SLA Speed & Placement Conversion Efficiency</span>
            </h4>
            <p className="text-xs text-slate-500">
              Average turnaround time to submit first candidate & placement win rate
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-3">CLIENT ACCOUNT</th>
                  <th className="py-3 px-3 text-center">ACTIVE PODS</th>
                  <th className="py-3 px-3 text-center">AVG TAT (DAYS)</th>
                  <th className="py-3 px-3 text-right">CONVERSION %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredData.map(c => (
                  <tr key={c.clientName} className="hover:bg-purple-50/50 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-[#6B3BF6]" />
                      <span>{c.clientName}</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-100 text-[#6B3BF6] border border-purple-200">
                        {c.activeRecruiters} Members
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-amber-700 tabular-nums">
                      ⚡ {c.avgTatDays} Days
                    </td>
                    <td className="py-3 px-3 text-right font-extrabold text-emerald-700 tabular-nums">
                      {c.conversionRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
