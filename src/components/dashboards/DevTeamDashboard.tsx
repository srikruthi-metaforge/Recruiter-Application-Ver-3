import React, { useState } from 'react'
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
import { Terminal, Cpu, Activity, TrendingUp, Building2, Target, Shield, CheckCircle2, AlertTriangle, Layers, Server, RefreshCw } from 'lucide-react'
import { Admin, Interview, Recruiter, Requirement, Candidate, Lead } from '../../types'
import { KpiGrid, Panel, DataTable, AiInsightBanner, ActivityFeed, WorkflowStrip } from '../wireframe/WireframeKit'
import { PageHeader } from '../layout/PageHeader'
import { RequirementsPage } from '../pages/RequirementsPage'
import { AddCandidatePage } from '../pages/AddCandidatePage'
import { CandidateRepositoryPage } from '../pages/CandidateRepositoryPage'
import { SubmissionsPage } from '../pages/SubmissionsPage'
import { INITIAL_CANDIDATES } from '../../data/mockData'

interface Props {
  admins: Admin[]
  leads: Lead[]
  recruiters: Recruiter[]
  requirements: Requirement[]
  interviews: Interview[]
  onUpdateRequirements?: (requirements: Requirement[]) => void
  onOpenSubmit?: (reqId?: string) => void
}

const SYSTEM_LATENCY_TREND = [
  { time: '08:00', ResponseTime: 120, APIRequests: 1420, SystemLoad: 32 },
  { time: '10:00', ResponseTime: 145, APIRequests: 2840, SystemLoad: 58 },
  { time: '12:00', ResponseTime: 180, APIRequests: 4120, SystemLoad: 74 },
  { time: '14:00', ResponseTime: 160, APIRequests: 3890, SystemLoad: 68 },
  { time: '16:00', ResponseTime: 135, APIRequests: 3200, SystemLoad: 52 },
  { time: '18:00', ResponseTime: 110, APIRequests: 2100, SystemLoad: 38 },
  { time: '20:00', ResponseTime: 95, APIRequests: 1150, SystemLoad: 24 },
]

const CLIENT_REQUIREMENTS_DATA = [
  { client: 'LTTS', Requirements: 14, Openings: 32 },
  { client: 'ITC', Requirements: 9, Openings: 18 },
  { client: 'KPMG', Requirements: 7, Openings: 12 },
  { client: 'Deloitte', Requirements: 5, Openings: 8 },
  { client: 'Metaforge', Requirements: 8, Openings: 15 },
  { client: 'Tesla AI', Requirements: 4, Openings: 6 },
]

const RECRUITER_PERFORM_DATA = [
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

export function DevTeamDashboard({
  admins,
  leads,
  recruiters,
  requirements,
  interviews,
  onUpdateRequirements,
  onOpenSubmit,
}: Props) {
  const openPositions = requirements.reduce((a, r) => a + r.openings, 0)
  const [candidatesList, setCandidatesList] = useState<Candidate[]>(INITIAL_CANDIDATES)
  const [candViewMode, setCandViewMode] = useState<'add' | 'repository'>('add')
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'candidates' | 'submissions'>('overview')

  return (
    <div className="space-y-8 w-full pb-12 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-md">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Dev Team Dashboard</h1>
              <p className="text-xs text-slate-500 font-medium">
                Full Admin & Super Admin System Access · Core Diagnostics & Operations Console
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Core Platform v3.4 — Stable
          </span>
        </div>
      </div>

      <AiInsightBanner text="Dev Console Active — Full administrative privilege granted. 0 system errors logged in the last 24h. Database query response time averaging 138ms." />

      {/* QUICK VIEW CONTROLLER TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'overview'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Executive & System Overview
        </button>
        <button
          onClick={() => setActiveTab('requirements')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'requirements'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Requirements Console ({requirements.length})
        </button>
        <button
          onClick={() => setActiveTab('candidates')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'candidates'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Candidate Repository
        </button>
        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'submissions'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Submissions
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* DEV & PLATFORM KPI GRID */}
          <KpiGrid
            columns={6}
            items={[
              { label: 'System Status', value: 'Operational', highlight: true, sub: '99.98% Uptime' },
              { label: 'Avg Latency', value: '138ms', sub: 'Peak load 180ms' },
              { label: 'Total Clients', value: 14 },
              { label: 'Active Reqs', value: requirements.length, highlight: true },
              { label: 'Open Positions', value: openPositions },
              { label: 'Total Recruiters', value: recruiters.length },
              { label: 'Active Leads', value: leads.length },
              { label: 'Submissions Today', value: 42 },
              { label: 'Interviews Active', value: interviews.length },
              { label: 'Database Size', value: '12.4K', sub: 'Resumes & Profiles' },
              { label: 'AI Worker Engine', value: 'Online', sub: '1,248 runs today' },
              { label: 'Security Health', value: 'Grade A+', highlight: true },
            ]}
          />

          {/* INTERACTIVE GRAPHS GRID */}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Panel title="System Diagnostics & Environment Logs">
              <ActivityFeed
                items={[
                  { time: '10:04', user: 'Dev System', action: 'database index maintenance completed successfully' },
                  { time: '09:45', user: 'Marcus Chen', action: 'submitted candidate Alex Turner to REQ-001' },
                  { time: '09:12', user: 'AI Parser', action: 'processed 42 new candidate resumes with 99.2% accuracy' },
                  { time: '08:30', user: 'System Cron', action: 'executed daily metrics aggregation job' },
                ]}
              />
            </Panel>

            <Panel title="Core Microservices Status">
              <div className="space-y-2 text-sm">
                {[
                  ['Authentication & AuthZ Engine', 'Operational', '99.99%'],
                  ['AI Candidate Ranking Worker', 'Operational', '99.95%'],
                  ['Email & SMTP Gateway', 'Operational', '99.90%'],
                  ['Resume Parsing Microservice', 'Operational', '99.85%'],
                  ['LinkedIn Recruiter Sync API', 'Degraded Sync', '97.40%'],
                ].map(([service, status, uptime]) => (
                  <div key={service} className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-800">{service}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 font-mono">{uptime}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          status === 'Operational'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <Panel title="Platform Administrative Overview">
            <DataTable
              columns={['Admin / Lead', 'Role', 'Leads / Team', 'Recruiters', 'Active Reqs', 'Submissions', 'Status']}
              rows={[
                ['Robert Haines', 'Super Admin', '5 Leads', '24 Recruiters', '42 Reqs', '480', 'Active'],
                ['David Park', 'Admin', '3 Leads', '12 Recruiters', '24 Reqs', '210', 'Active'],
                ['Sarah Kim', 'Team Lead', 'Tech Hiring', '6 Recruiters', '12 Reqs', '134', 'Active'],
                ['Tom Walsh', 'Team Lead', 'Finance Hiring', '4 Recruiters', '8 Reqs', '86', 'Active'],
              ]}
            />
          </Panel>
        </>
      )}

      {activeTab === 'requirements' && (
        <RequirementsPage
          role="devteam"
          requirements={requirements}
          interviews={interviews}
          recruiters={recruiters}
          onOpenSubmit={onOpenSubmit}
          onUpdateRequirements={onUpdateRequirements}
        />
      )}

      {activeTab === 'candidates' && (
        <div>
          {candViewMode === 'repository' ? (
            <CandidateRepositoryPage
              candidates={candidatesList}
              requirements={requirements}
              onOpenAddForm={() => setCandViewMode('add')}
              onBackToDashboard={() => setCandViewMode('add')}
            />
          ) : (
            <AddCandidatePage
              requirements={requirements}
              onOpenRepository={() => setCandViewMode('repository')}
              onAddCandidate={c => setCandidatesList([c, ...candidatesList])}
            />
          )}
        </div>
      )}

      {activeTab === 'submissions' && (
        <SubmissionsPage
          role="devteam"
          requirements={requirements}
          onOpenSubmitCandidate={onOpenSubmit ? (reqId?: string) => onOpenSubmit(reqId) : undefined}
          onUpdateRequirements={onUpdateRequirements}
        />
      )}

      <WorkflowStrip />
    </div>
  )
}
