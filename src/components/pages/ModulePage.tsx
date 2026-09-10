import React, { useState, useEffect } from 'react'
import { Requirement, Submission, Interview, Recruiter, Candidate, ActivityLogItem, Role } from '../../types'
import { PAGE_META, getPageTitle } from '../../config/navigation'
import { Panel, DataTable, QuickActions } from '../wireframe/WireframeKit'
import { PageHeader } from '../layout/PageHeader'
import { RequirementsPage } from './RequirementsPage'
import { AddCandidatePage } from './AddCandidatePage'
import { CandidateRepositoryPage } from './CandidateRepositoryPage'
import { SubmissionsPage } from './SubmissionsPage'
import { MyProfilePage } from './MyProfilePage'
import { InterviewTrackingPage } from './InterviewTrackingPage'
import { ReportsPage } from './ReportsPage'
import { ClientsPage } from './ClientsPage'
import { UserManagementPage } from './UserManagementPage'
import { ActivityLogsPage } from './ActivityLogsPage'
import { TeamsRecruitersPage } from './TeamsRecruitersPage'
import { HistoryPage } from './HistoryPage'
import { MyTeamPage } from './MyTeamPage'
import { INITIAL_CANDIDATES } from '../../data/mockData'

interface ModulePageProps {
  pageKey: string
  role: Role
  requirements?: Requirement[]
  submissions?: Submission[]
  interviews?: Interview[]
  recruiters?: Recruiter[]
  selectedReqId?: string | null
  activityLogs?: ActivityLogItem[]
  onOpenSubmit?: (reqId?: string) => void
  onOpenFeedback?: (iv: Interview) => void
  onOpenCandidate?: (sub: Submission) => void
  onUpdateRequirements?: (requirements: Requirement[]) => void
  onSelectRequirement?: (reqId: string | null) => void
  onAddActivityLog?: (log: ActivityLogItem) => void
  onNavigateToDashboard?: () => void
}

export function ModulePage({
  pageKey,
  role,
  requirements = [],
  submissions = [],
  interviews = [],
  recruiters = [],
  selectedReqId = null,
  activityLogs = [],
  onOpenSubmit,
  onOpenFeedback,
  onUpdateRequirements,
  onSelectRequirement,
  onAddActivityLog,
}: ModulePageProps) {
  const [candidatesList, setCandidatesList] = useState<Candidate[]>(INITIAL_CANDIDATES)
  const [candidateViewMode, setCandidateViewMode] = useState<'add' | 'repository'>(() => {
    try {
      const saved = localStorage.getItem('metaforge_candidate_view_mode')
      if (saved === 'add' || saved === 'repository') return saved
    } catch {}
    return 'add'
  })

  const handleCandidateViewModeChange = (mode: 'add' | 'repository') => {
    setCandidateViewMode(mode)
    try {
      localStorage.setItem('metaforge_candidate_view_mode', mode)
    } catch {}
  }

  useEffect(() => {
    if (selectedReqId) {
      setCandidateViewMode('repository')
      try {
        localStorage.setItem('metaforge_candidate_view_mode', 'repository')
      } catch {}
    }
  }, [selectedReqId, pageKey])

  if (pageKey === 'My Profile' || pageKey === 'Profile') return <MyProfilePage role={role as any} />
  if (pageKey === 'Reports' || pageKey === 'Reports & Analytics') return <ReportsPage role={role} />
  if (pageKey === 'Roles' || pageKey === 'Roles & Permissions') return <UserManagementPage role={role} initialTab="role_definitions" />
  if (pageKey === 'Clients' || pageKey === 'Client Management') return <ClientsPage role={role} />
  if (pageKey === 'Users' || pageKey === 'User Management') return <UserManagementPage role={role} />
  if (pageKey === 'Recruiters' || pageKey === 'Teams' || pageKey === 'Teams & Recruiters') return <TeamsRecruitersPage role={role} />
  if (pageKey === 'Activity Logs' || pageKey === 'Audit Logs') return <ActivityLogsPage role={role} logs={activityLogs} />
  if (pageKey === 'History' || pageKey === 'Recruiter History' || pageKey === 'Performance History') return <HistoryPage role={role} />
  if (pageKey === 'My Team') return <MyTeamPage />

  if (pageKey === 'Requirements') {
    return (
      <RequirementsPage
        role={role}
        requirements={requirements}
        submissions={submissions}
        interviews={interviews}
        recruiters={recruiters}
        onOpenSubmit={onOpenSubmit}
        onUpdateRequirements={onUpdateRequirements}
        onAddActivityLog={onAddActivityLog}
      />
    )
  }

  if (pageKey === 'Candidates' || pageKey === 'Candidate Search') {
    if (candidateViewMode === 'repository') {
      return (
        <CandidateRepositoryPage
          candidates={candidatesList}
          requirements={requirements}
          selectedReqId={selectedReqId}
          role={role}
          onOpenAddForm={() => handleCandidateViewModeChange('add')}
          onSelectRequirement={onSelectRequirement}
          onBackToDashboard={() => handleCandidateViewModeChange('add')}
        />
      )
    }
    return (
      <AddCandidatePage
        requirements={requirements}
        selectedReqId={selectedReqId}
        onOpenRepository={() => handleCandidateViewModeChange('repository')}
        onAddCandidate={newCandidate => setCandidatesList([newCandidate, ...candidatesList])}
      />
    )
  }

  if (pageKey === 'Submissions' || pageKey === 'Submission to Client' || pageKey === 'Submissions to Client') {
    return (
      <SubmissionsPage
        role={role}
        submissions={submissions}
        requirements={requirements}
        onOpenSubmitCandidate={onOpenSubmit ? (reqId?: string) => onOpenSubmit(reqId) : undefined}
        onUpdateRequirements={onUpdateRequirements}
      />
    )
  }

  if (pageKey === 'Interviews' || pageKey === 'Interview Tracking') {
    return <InterviewTrackingPage role={role} interviews={interviews} onOpenFeedbackModal={onOpenFeedback} />
  }

  const meta = PAGE_META[pageKey]
  if (!meta) {
    return (
      <div className="space-y-6 w-full pb-12 font-sans">
        <PageHeader title={getPageTitle(role, pageKey)} />
        <Panel title={pageKey}>
          <p className="text-sm text-slate-600">Module wireframe — content for {pageKey} will appear here.</p>
        </Panel>
      </div>
    )
  }

  return (
    <div className="space-y-6 w-full pb-12 font-sans">
      <PageHeader title={meta.title} subtitle={meta.description} />
      {meta.actions && <QuickActions actions={meta.actions} />}
      {meta.columns && meta.sampleRows && (
        <Panel title={meta.title}>
          <DataTable columns={meta.columns} rows={meta.sampleRows} />
        </Panel>
      )}
    </div>
  )
}
