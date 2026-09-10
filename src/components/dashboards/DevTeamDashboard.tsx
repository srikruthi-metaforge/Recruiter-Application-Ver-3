import React, { useState } from 'react'
import { Terminal } from 'lucide-react'
import { Admin, Interview, Recruiter, Requirement, Candidate, Lead } from '../../types'
import { KpiGrid, Panel, DataTable, AiInsightBanner, ActivityFeed, WorkflowStrip } from '../wireframe/WireframeKit'
import { RequirementsPage } from '../pages/RequirementsPage'
import { AddCandidatePage } from '../pages/AddCandidatePage'
import { CandidateRepositoryPage } from '../pages/CandidateRepositoryPage'
import { SubmissionsPage } from '../pages/SubmissionsPage'
import { INITIAL_CANDIDATES } from '../../data/mockData'
import { DevTeamCharts } from './devTeam/DevTeamCharts'

interface Props {
  admins: Admin[]
  leads: Lead[]
  recruiters: Recruiter[]
  requirements: Requirement[]
  interviews: Interview[]
  onUpdateRequirements?: (requirements: Requirement[]) => void
  onOpenSubmit?: (reqId?: string) => void
}

export function DevTeamDashboard({
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
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-md">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Dev Team Dashboard</h1>
            <p className="text-xs text-slate-500 font-medium">Full Admin & Super Admin System Access · Core Diagnostics & Operations Console</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Core Platform v3.4 — Stable
        </span>
      </div>

      <AiInsightBanner text="Dev Console Active — Full administrative privilege granted. 0 system errors logged in the last 24h." />

      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {(['overview', 'requirements', 'candidates', 'submissions'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all capitalize ${
              activeTab === tab ? 'bg-violet-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab === 'overview' ? 'Executive & System Overview' : tab === 'requirements' ? `Requirements Console (${requirements.length})` : tab === 'candidates' ? 'Candidate Repository' : 'All Submissions'}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          <KpiGrid
            columns={6}
            items={[
              { label: 'System Status', value: 'Operational', highlight: true },
              { label: 'Avg Latency', value: '138ms' },
              { label: 'Total Clients', value: 14 },
              { label: 'Active Reqs', value: requirements.length, highlight: true },
              { label: 'Open Positions', value: openPositions },
              { label: 'Total Recruiters', value: recruiters.length },
              { label: 'Active Leads', value: leads.length },
              { label: 'Submissions Today', value: 42 },
              { label: 'Interviews Active', value: interviews.length },
              { label: 'Database Size', value: '12.4K' },
              { label: 'AI Worker Engine', value: 'Online' },
              { label: 'Security Health', value: 'Grade A+', highlight: true },
            ]}
          />
          <DevTeamCharts />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Panel title="System Diagnostics & Environment Logs">
              <ActivityFeed
                items={[
                  { time: '10:04', user: 'Dev System', action: 'database index maintenance completed successfully' },
                  { time: '09:45', user: 'Marcus Chen', action: 'submitted candidate Alex Turner to REQ-001' },
                  { time: '09:12', user: 'AI Parser', action: 'processed 42 new candidate resumes' },
                ]}
              />
            </Panel>
            <Panel title="Core Microservices Status">
              <div className="space-y-2 text-sm">
                {[
                  ['Authentication & AuthZ Engine', 'Operational', '99.99%'],
                  ['AI Candidate Ranking Worker', 'Operational', '99.95%'],
                  ['Email & SMTP Gateway', 'Operational', '99.90%'],
                ].map(([service, status, uptime]) => (
                  <div key={service} className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-800">{service}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 font-mono">{uptime}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">{status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
          <Panel title="Platform Administrative Overview">
            <DataTable
              columns={['Admin / Lead', 'Role', 'Leads / Team', 'Recruiters', 'Active Reqs', 'Status']}
              rows={[
                ['Robert Haines', 'Super Admin', '5 Leads', '24 Recruiters', '42 Reqs', 'Active'],
                ['David Park', 'Admin', '3 Leads', '12 Recruiters', '24 Reqs', 'Active'],
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
