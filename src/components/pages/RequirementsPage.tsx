import React from 'react'
import { Requirement, Submission, Interview, Recruiter } from '../../types'
import { RequirementDetailOverview } from './RequirementDetailOverview'
import { CreateJobDemandForm } from './CreateJobDemandForm'
import { RevokeRequirementModal } from '../modals/RevokeRequirementModal'
import { PendingRevokeBanner } from './requirements/PendingRevokeBanner'
import { RequirementsSearchBar } from './requirements/RequirementsSearchBar'
import { RequirementsTable } from './requirements/RequirementsTable'
import { AssignRecruiterModal } from './requirements/AssignRecruiterModal'
import { useRequirementsState } from './requirements/useRequirementsState'

interface RequirementsPageProps {
  role?: string
  requirements: Requirement[]
  submissions?: Submission[]
  interviews?: Interview[]
  recruiters?: Recruiter[]
  onOpenSubmit?: (reqId?: string) => void
  onUpdateRequirements?: (updated: Requirement[]) => void
  onAddActivityLog?: (log: any) => void
  onNavigateToDashboard?: () => void
}

export function RequirementsPage({
  role = 'superadmin',
  requirements = [],
  onOpenSubmit,
  onUpdateRequirements,
}: RequirementsPageProps) {
  const reqState = useRequirementsState({ role, requirements, onUpdateRequirements })

  if (reqState.selectedReqForDetail) {
    return (
      <RequirementDetailOverview
        requirement={reqState.selectedReqForDetail}
        role={role}
        onBack={() => reqState.setSelectedReqForDetail(null)}
        onOpenAssignModal={() => {
          reqState.setSelectedReqIds(new Set([reqState.selectedReqForDetail!.id]))
          reqState.setIsAssignModalOpen(true)
        }}
      />
    )
  }

  if (reqState.isCreatingDemand || reqState.isEditingDemand) {
    return (
      <CreateJobDemandForm
        initialData={reqState.editingReq}
        onCancel={() => { reqState.setIsCreatingDemand(false); reqState.setIsEditingDemand(false); reqState.setEditingReq(null) }}
        onSubmit={newReq => {
          reqState.setIsCreatingDemand(false); reqState.setIsEditingDemand(false); reqState.setEditingReq(null)
          reqState.showToast(`Job Demand ${newReq.id} saved successfully!`)
        }}
      />
    )
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-150">
      <PendingRevokeBanner
        pendingRequests={reqState.localRequirements.filter(r => r.revokeStatus === 'Pending')}
        onApprove={reqId => {
          const updated = reqState.localRequirements.map(r => r.id === reqId ? { ...r, owner: 'Unassigned', assignmentStatus: 'Unassigned' as const, revokeStatus: undefined } : r)
          reqState.setLocalRequirements(updated); onUpdateRequirements?.(updated); reqState.showToast(`Approved revoke for ${reqId}`)
        }}
        onDecline={reqId => {
          const updated = reqState.localRequirements.map(r => r.id === reqId ? { ...r, revokeStatus: undefined } : r)
          reqState.setLocalRequirements(updated); onUpdateRequirements?.(updated); reqState.showToast(`Declined revoke for ${reqId}`)
        }}
      />

      <RequirementsSearchBar
        globalSearch={reqState.globalSearch}
        setGlobalSearch={reqState.setGlobalSearch}
        statusDropdown={reqState.statusDropdown}
        setStatusDropdown={reqState.setStatusDropdown}
        clientDropdown={reqState.clientDropdown}
        setClientDropdown={reqState.setClientDropdown}
        availableClients={reqState.availableClients}
        selectedCount={reqState.selectedReqIds.size}
        onOpenAssignModal={() => reqState.setIsAssignModalOpen(true)}
        onSelfAssign={reqState.handleSelfAssign}
        onCreateDemand={() => reqState.setIsCreatingDemand(true)}
      />

      <RequirementsTable
        requirements={reqState.paginatedReqs}
        selectedReqIds={reqState.selectedReqIds}
        toggleSelectReq={id => {
          const next = new Set(reqState.selectedReqIds)
          if (next.has(id)) next.delete(id); else next.add(id); reqState.setSelectedReqIds(next)
        }}
        toggleSelectAll={() => {
          if (reqState.selectedReqIds.size === reqState.paginatedReqs.length) reqState.setSelectedReqIds(new Set())
          else reqState.setSelectedReqIds(new Set(reqState.paginatedReqs.map(r => r.id)))
        }}
        onSelectReqForDetail={reqState.setSelectedReqForDetail}
        onOpenSubmit={onOpenSubmit}
        onRevokeReq={req => { reqState.setSelectedReqForRevoke(req); reqState.setIsRevokeModalOpen(true) }}
        currentPage={reqState.currentPage}
        setCurrentPage={reqState.setCurrentPage}
        pageSize={reqState.pageSize}
        setPageSize={reqState.setPageSize}
        totalPages={reqState.totalPages}
        totalItems={reqState.filteredRequirementsList.length}
      />

      <AssignRecruiterModal
        isOpen={reqState.isAssignModalOpen}
        onClose={() => reqState.setIsAssignModalOpen(false)}
        selectedReqIdsCount={reqState.selectedReqIds.size}
        isAssignMyselfChecked={reqState.isAssignMyselfChecked}
        setIsAssignMyselfChecked={reqState.setIsAssignMyselfChecked}
        currentUserName={reqState.currentUserName}
        recruiterSearchQuery={reqState.recruiterSearchQuery}
        setRecruiterSearchQuery={reqState.setRecruiterSearchQuery}
        filteredRecruiterList={reqState.filteredRecruiterList}
        selectedRecruiterNames={reqState.selectedRecruiterNames}
        toggleRecruiterSelection={name => {
          const next = new Set(reqState.selectedRecruiterNames)
          if (next.has(name)) next.delete(name); else next.add(name); reqState.setSelectedRecruiterNames(next)
        }}
        totalSelectedRecruitersCount={(reqState.isAssignMyselfChecked ? 1 : 0) + reqState.selectedRecruiterNames.size}
        onConfirm={reqState.handleConfirmModalAssignment}
      />

      {reqState.isRevokeModalOpen && reqState.selectedReqForRevoke && (
        <RevokeRequirementModal
          requirement={reqState.selectedReqForRevoke}
          isOpen={reqState.isRevokeModalOpen}
          onClose={() => reqState.setIsRevokeModalOpen(false)}
          onConfirm={(reqId, reason) => {
            const updated = reqState.localRequirements.map(r => r.id === reqId ? { ...r, owner: 'Unassigned', assignmentStatus: 'Unassigned' as const } : r)
            reqState.setLocalRequirements(updated); onUpdateRequirements?.(updated); reqState.setIsRevokeModalOpen(false); reqState.showToast(`Revoked ${reqId}`)
          }}
        />
      )}

      {reqState.toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium">
          {reqState.toastMessage}
        </div>
      )}
    </div>
  )
}
