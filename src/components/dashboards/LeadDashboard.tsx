import React, { useState } from 'react'
import { Interview, Recruiter, Requirement, Candidate } from '../../types'
import { ChartBlock, Panel, DataTable, AiInsightBanner } from '../wireframe/WireframeKit'
import { PageHeader } from '../layout/PageHeader'
import { RequirementsPage } from '../pages/RequirementsPage'
import { AddCandidatePage } from '../pages/AddCandidatePage'
import { CandidateRepositoryPage } from '../pages/CandidateRepositoryPage'
import { SubmissionsPage } from '../pages/SubmissionsPage'
import { INITIAL_CANDIDATES } from '../../data/mockData'

interface Props {
  recruiters: Recruiter[]
  requirements: Requirement[]
  interviews: Interview[]
}

export function LeadDashboard({ recruiters, requirements, interviews }: Props) {
  const [candidatesList, setCandidatesList] = useState<Candidate[]>(INITIAL_CANDIDATES)
  const [candViewMode, setCandViewMode] = useState<'add' | 'repository'>('add')

  return (
    <div className="space-y-8 w-full pb-12 font-sans">
      <PageHeader
        title="Team Dashboard"
        subtitle="Track recruiter productivity, approvals, and requirement progress"
      />

      <AiInsightBanner text="Aisha Patel is at 50% weekly quota — consider redistributing 1 requirement. 3 submissions pending your approval." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChartBlock title="Recruiter Productivity" />
        <ChartBlock title="Daily Submission Trend" />
        <ChartBlock title="Requirement Progress" />
      </div>

      {/* REQUIREMENTS PAGE PLACED AFTER DASHBOARD CHARTS */}
      <div className="pt-2 border-t border-slate-200">
        <RequirementsPage
          role="lead"
          requirements={requirements}
          interviews={interviews}
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

      <Panel title="Team Performance">
        <DataTable
          columns={['Recruiter', 'Today', 'Submissions', 'Interviews', 'Weekly %', 'Status']}
          rows={recruiters.map(r => [
            r.name,
            `+${r.today}`,
            r.submissions,
            r.interviews,
            `${r.weeklyProgress}%`,
            r.weeklyProgress >= 85 ? 'On Track' : r.weeklyProgress >= 60 ? 'Warning' : 'Critical',
          ])}
        />
      </Panel>

      <Panel title="Pending Approvals">
        <DataTable
          columns={['Candidate', 'Requirement', 'Recruiter', 'Match', 'Submitted']}
          rows={[
            ['Sarah Nguyen', 'REQ-001', 'Marcus Chen', '87%', 'Aug 5, 2026'],
            ['Omar Hassan', 'REQ-006', 'Marcus Chen', '89%', 'Aug 4, 2026'],
          ]}
        />
      </Panel>
    </div>
  )
}
