import React from 'react'
import { Submission, Requirement, Role } from '../../types'
import { RequirementDetailOverview } from './RequirementDetailOverview'
import { SubmissionCandidateDetailModal } from '../modals/SubmissionCandidateDetailModal'
import { ScheduleInterviewModal } from '../modals/ScheduleInterviewModal'
import { CheckCircle } from 'lucide-react'
import { SubmissionsMetricsHeader } from './submissions/SubmissionsMetricsHeader'
import { SubmissionsTable } from './submissions/SubmissionsTable'
import { useSubmissionsState } from './submissions/useSubmissionsState'

interface SubmissionsPageProps {
  role?: Role
  submissions?: Submission[]
  requirements?: Requirement[]
  onOpenSubmitCandidate?: (reqId?: string) => void
  onUpdateRequirements?: (updated: Requirement[]) => void
}

export function SubmissionsPage({
  role = 'recruiter',
  submissions = [],
  requirements = [],
  onOpenSubmitCandidate,
}: SubmissionsPageProps) {
  const state = useSubmissionsState({ role, requirements, onOpenSubmitCandidate })

  if (state.selectedReqForDetail) {
    return (
      <RequirementDetailOverview
        requirement={state.selectedReqForDetail}
        role={role}
        onBack={() => state.setSelectedReqForDetail(null)}
        onAddCandidate={() => onOpenSubmitCandidate?.(state.selectedReqForDetail!.id)}
      />
    )
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800">
      <SubmissionsMetricsHeader
        totalSubmissionsCount={state.scopeSubmissions.length}
        submittedToClientCount={state.submittedToClientCount}
        interviewsCount={state.interviewsCount}
        rejectedCount={state.rejectedCount}
        onOpenSubmitCandidate={onOpenSubmitCandidate}
        searchQuery={state.searchQuery}
        setSearchQuery={state.setSearchQuery}
        clientFilter={state.clientFilter}
        setClientFilter={state.setClientFilter}
        clientOptions={state.clientOptions}
        clientCounts={state.clientCounts}
        dateFilter={state.dateFilter}
        setDateFilter={state.setDateFilter}
        customStartDate={state.customStartDate}
        setCustomStartDate={state.setCustomStartDate}
        customEndDate={state.customEndDate}
        setCustomEndDate={state.setCustomEndDate}
        statusFilter={state.statusFilter}
        setStatusFilter={state.setStatusFilter}
        filteredCount={state.filteredData.length}
        totalScopeCount={state.scopeSubmissions.length}
      />

      <SubmissionsTable
        paginatedSubmissions={state.paginatedSubmissions}
        filteredDataLength={state.filteredData.length}
        currentPage={state.currentPage}
        totalPages={state.totalPages}
        pageSize={state.pageSize}
        setCurrentPage={state.setCurrentPage}
        setSelectedSub={state.setSelectedSub}
        handleOpenReqOverview={state.handleOpenReqOverview}
        reasons={state.reasons}
      />

      {state.selectedSub && (
        <SubmissionCandidateDetailModal
          role={role}
          submission={{
            id: state.selectedSub.id,
            candidate: state.selectedSub.candidateName,
            reqId: 'REQ-2026-05',
            req: state.selectedSub.requirement,
            client: state.selectedSub.currentCompany,
            experience: state.selectedSub.experience,
            recruiter: state.selectedSub.submittedBy,
            date: state.selectedSub.submittedOn,
            stage: state.selectedSub.status,
            email: 'candidate@email.com',
            phone: '+91 98765 43210',
            location: 'Bangalore, India',
            noticePeriod: '30 Days',
            currentCtc: '14 LPA',
            expectedCtc: '18 LPA',
            skills: ['Java', 'Spring Boot', 'Microservices', 'SQL'],
          }}
          rejectionReason={state.reasons[state.selectedSub.id] || state.selectedSub.rejectionReason}
          onSaveRejectionReason={(id, newReason) => {
            state.setReasons(prev => ({ ...prev, [id]: newReason }))
          }}
          onClose={() => state.setSelectedSub(null)}
        />
      )}

      <ScheduleInterviewModal
        isOpen={state.isScheduleModalOpen}
        initialSubmission={state.targetSubForInterview ? `${state.targetSubForInterview.candidateName} — ${state.targetSubForInterview.requirement}` : undefined}
        onClose={() => {
          state.setIsScheduleModalOpen(false)
          state.setTargetSubForInterview(null)
        }}
        onScheduleSuccess={() => state.showToast('Interview scheduled successfully!')}
      />

      {state.toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-medium animate-in fade-in duration-200 border border-slate-800">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{state.toastMsg}</span>
        </div>
      )}
    </div>
  )
}

