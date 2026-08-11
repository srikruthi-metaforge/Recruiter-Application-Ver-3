import React, { useState } from 'react'
import { Lead, Recruiter, Requirement, Candidate } from '../../types'
import { ChartBlock, Panel, DataTable, AiInsightBanner } from '../wireframe/WireframeKit'
import { PageHeader } from '../layout/PageHeader'
import { RequirementsPage } from '../pages/RequirementsPage'
import { AddCandidatePage } from '../pages/AddCandidatePage'
import { CandidateRepositoryPage } from '../pages/CandidateRepositoryPage'
import { SubmissionsPage } from '../pages/SubmissionsPage'
import { INITIAL_CANDIDATES } from '../../data/mockData'

interface Props {
  leads: Lead[]
  recruiters: Recruiter[]
  requirements: Requirement[]
}

export function AdminDashboard({ leads, recruiters, requirements }: Props) {
  const [candidatesList, setCandidatesList] = useState<Candidate[]>(INITIAL_CANDIDATES)
  const [candViewMode, setCandViewMode] = useState<'add' | 'repository'>('add')

  return (
    <div className="space-y-8 w-full pb-12 font-sans">
      <PageHeader
        title="Operations Dashboard"
        subtitle="Manage requirements, recruiters, submissions, and team performance"
      />

      <AiInsightBanner text="Admin Operations Panel — Full operational control for requirements, recruiters, and submissions. 2 recruiters are below daily submission target." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChartBlock title="Recruiter Productivity" />
        <ChartBlock title="Requirement Status" />
        <ChartBlock title="Interview Status" />
      </div>

      {/* REQUIREMENTS PAGE PLACED AFTER DASHBOARD CHARTS */}
      <div className="pt-2 border-t border-slate-200">
        <RequirementsPage
          role="admin"
          requirements={requirements}
          recruiters={recruiters}
        />
      </div>

      {/* ADD CANDIDATES & REPOSITORY DIRECTLY BELOW REQUIREMENTS */}
      <div className="pt-6 border-t border-slate-200">
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

      {/* ALL SUBMISSIONS DIRECTLY BELOW CANDIDATES */}
      <div className="pt-6 border-t border-slate-200">
        <SubmissionsPage />
      </div>

      <Panel title="Team Leads">
        <DataTable
          columns={['Lead', 'Recruiters', 'Submissions', 'Interviews', 'Placements']}
          rows={leads.map(l => [l.name, l.recruiters, l.submissions, l.interviews, l.placements])}
        />
      </Panel>
    </div>
  )
}
