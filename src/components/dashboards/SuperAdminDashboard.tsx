import React, { useState } from 'react'
import { Admin, Interview, Recruiter, Requirement, Candidate } from '../../types'
import { KpiGrid, ChartBlock, Panel, DataTable, AiInsightBanner, ActivityFeed, WorkflowStrip } from '../wireframe/WireframeKit'
import { RequirementsPage } from '../pages/RequirementsPage'
import { AddCandidatePage } from '../pages/AddCandidatePage'
import { CandidateRepositoryPage } from '../pages/CandidateRepositoryPage'
import { SubmissionsPage } from '../pages/SubmissionsPage'
import { INITIAL_CANDIDATES } from '../../data/mockData'
import { brand } from '../../theme'

interface Props {
  admins: Admin[]
  recruiters: Recruiter[]
  requirements: Requirement[]
  interviews: Interview[]
}

export function SuperAdminDashboard({ admins, recruiters, requirements, interviews }: Props) {
  const openPositions = requirements.reduce((a, r) => a + r.openings, 0)
  const [candidatesList, setCandidatesList] = useState<Candidate[]>(INITIAL_CANDIDATES)
  const [candViewMode, setCandViewMode] = useState<'add' | 'repository'>('add')

  return (
    <div className="space-y-8 max-w-7xl">
      <AiInsightBanner text="3 requirements are at SLA risk. AI recommends reassigning 2 recruiters to Critical priority roles. Duplicate resume rate dropped 4% this week." />

      <KpiGrid
        columns={6}
        items={[
          { label: 'Total Clients', value: 14 },
          { label: 'Active Clients', value: 12 },
          { label: 'Total Requirements', value: requirements.length },
          { label: 'Open Positions', value: openPositions, highlight: true },
          { label: 'Closed Positions', value: 8 },
          { label: 'Total Recruiters', value: recruiters.length },
          { label: 'Active Recruiters', value: recruiters.filter(r => r.active).length },
          { label: 'Daily Submissions', value: 42 },
          { label: 'Monthly Placements', value: 16 },
          { label: 'Revenue (MTD)', value: '$395K', highlight: true },
          { label: 'Offer Acceptance', value: '78%' },
          { label: 'Interview Success', value: '34%' },
          { label: 'Candidate Database', value: '12.4K' },
          { label: 'Duplicate Resumes', value: '3.2%' },
          { label: 'AI Automations', value: '1,248', sub: 'runs today' },
          { label: 'Team Performance', value: '88%', sub: 'on track' },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <ChartBlock title="Monthly Hiring Trend" subtitle="Placements over last 7 months" />
        <ChartBlock title="Client-wise Requirements" subtitle="Open reqs by client" />
        <ChartBlock title="Recruiter Performance" subtitle="Submissions vs target" />
      </div>

      {/* REQUIREMENTS PAGE SECTION DIRECTLY ON DASHBOARD */}
      <div className="pt-2 border-t border-gray-200">
        <RequirementsPage
          role="superadmin"
          requirements={requirements}
          interviews={interviews}
          recruiters={recruiters}
        />
      </div>

      {/* ADD CANDIDATES & CANDIDATE REPOSITORY DIRECTLY BELOW REQUIREMENTS PAGE */}
      <div className="pt-6 border-t border-gray-200">
        {candViewMode === 'repository' ? (
          <CandidateRepositoryPage
            candidates={candidatesList}
            onOpenAddForm={() => setCandViewMode('add')}
          />
        ) : (
          <AddCandidatePage
            onOpenRepository={() => setCandViewMode('repository')}
            onAddCandidate={c => setCandidatesList([c, ...candidatesList])}
          />
        )}
      </div>

      {/* ALL SUBMISSIONS SECTION DIRECTLY BELOW CANDIDATES */}
      <div className="pt-6 border-t border-gray-200">
        <SubmissionsPage />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel title="Recent Activity">
          <ActivityFeed
            items={[
              { time: '18:42', user: 'Marcus Chen', action: 'submitted Alex Turner to REQ-001' },
              { time: '17:30', user: 'AI System', action: 'flagged duplicate resume for review' },
              { time: '16:15', user: 'Sarah Kim', action: 'approved submission for client review' },
              { time: '15:00', user: 'David Park', action: 'created requirement REQ-007' },
            ]}
          />
        </Panel>
        <Panel title="System Health">
          <div className="space-y-2 text-sm">
            {[
              ['API Services', 'Operational'],
              ['AI Engine', 'Operational'],
              ['Email Gateway', 'Operational'],
              ['LinkedIn Sync', 'Degraded'],
            ].map(([name, status]) => (
              <div key={name} className="flex justify-between py-2 border-b" style={{ borderColor: brand.borderLight }}>
                <span style={{ color: brand.text }}>{name}</span>
                <span style={{ color: status === 'Operational' ? brand.success : brand.warning }}>{status}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Admin Performance">
        <DataTable
          columns={['Admin', 'Leads', 'Recruiters', 'Submissions', 'Placements', 'Revenue']}
          rows={admins.map(a => [a.name, a.leads, a.recruiters, a.submissions, a.placements, a.revenue])}
        />
      </Panel>

      <WorkflowStrip />
    </div>
  )
}
