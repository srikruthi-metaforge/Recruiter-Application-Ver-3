import React, { useState } from 'react'
import { Requirement, Submission, Interview, Recruiter, Candidate } from '../../types'
import { PAGE_META } from '../../config/navigation'
import { Panel, DataTable, QuickActions, PriorityLegend } from '../wireframe/WireframeKit'
import { PremiumReportsAnalytics } from '../dashboards/PremiumReportsAnalytics'
import { RequirementsPage } from './RequirementsPage'
import { AddCandidatePage } from './AddCandidatePage'
import { CandidateRepositoryPage } from './CandidateRepositoryPage'
import { SubmissionsPage } from './SubmissionsPage'
import { INITIAL_CANDIDATES } from '../../data/mockData'
import { brand } from '../../theme'

interface ModulePageProps {
  pageKey: string
  role: string
  requirements?: Requirement[]
  submissions?: Submission[]
  interviews?: Interview[]
  recruiters?: Recruiter[]
  onOpenSubmit?: (reqId?: string) => void
  onOpenFeedback?: (iv: Interview) => void
  onOpenCandidate?: (sub: Submission) => void
}

export function ModulePage({
  pageKey,
  role,
  requirements = [],
  submissions = [],
  interviews = [],
  recruiters = [],
  onOpenSubmit,
  onOpenFeedback,
  onOpenCandidate,
}: ModulePageProps) {
  const [candidatesList, setCandidatesList] = useState<Candidate[]>(INITIAL_CANDIDATES)
  const [candidateViewMode, setCandidateViewMode] = useState<'add' | 'repository'>('add')

  if (pageKey === 'Reports') {
    return <PremiumReportsAnalytics recruiters={recruiters} role={role as any} />
  }

  const meta = PAGE_META[pageKey]

  if (pageKey === 'Requirements') {
    return (
      <RequirementsPage
        role={role}
        requirements={requirements}
        submissions={submissions}
        interviews={interviews}
        recruiters={recruiters}
        onOpenSubmit={onOpenSubmit}
      />
    )
  }

  if (pageKey === 'Candidates' || pageKey === 'Candidate Search') {
    if (candidateViewMode === 'repository') {
      return (
        <CandidateRepositoryPage
          candidates={candidatesList}
          onOpenAddForm={() => setCandidateViewMode('add')}
        />
      )
    }

    return (
      <AddCandidatePage
        onOpenRepository={() => setCandidateViewMode('repository')}
        onAddCandidate={newCandidate => {
          setCandidatesList([newCandidate, ...candidatesList])
        }}
      />
    )
  }

  if (pageKey === 'Submissions') {
    return (
      <SubmissionsPage
        submissions={submissions}
        onOpenSubmitCandidate={onOpenSubmit ? () => onOpenSubmit() : undefined}
      />
    )
  }

  if (pageKey === 'Interviews') {
    return (
      <Panel title="Interviews">
        <DataTable
          columns={['Candidate', 'Position', 'Client', 'Date', 'Stage', 'Recruiter', 'Status']}
          rows={interviews.map(iv => [iv.candidate, iv.position, iv.client, iv.date, iv.stage, iv.recruiter, iv.status])}
        />
        {interviews[0] && onOpenFeedback && (
          <button
            onClick={() => onOpenFeedback(interviews[0])}
            className="mt-3 text-xs px-3 py-1.5 rounded-lg text-white font-medium"
            style={{ background: brand.primary }}
          >
            Log Interview Feedback
          </button>
        )}
      </Panel>
    )
  }

  if (!meta) {
    return (
      <Panel title={pageKey}>
        <p className="text-sm" style={{ color: brand.textSecondary }}>
          Module wireframe — content for {pageKey} will appear here.
        </p>
      </Panel>
    )
  }

  return (
    <div className="space-y-4 max-w-6xl">
      <p className="text-sm" style={{ color: brand.textSecondary }}>
        {meta.description}
      </p>
      {meta.actions && <QuickActions actions={meta.actions} />}
      {meta.columns && meta.sampleRows && (
        <Panel title={meta.title}>
          <DataTable columns={meta.columns} rows={meta.sampleRows} />
        </Panel>
      )}
    </div>
  )
}
