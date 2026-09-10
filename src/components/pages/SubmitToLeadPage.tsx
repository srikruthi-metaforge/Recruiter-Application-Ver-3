import React from 'react'
import { Requirement } from '../../types'
import { SubmitToLeadHeader } from './submitToLead/SubmitToLeadHeader'
import { SubmitDestinationCard } from './submitToLead/SubmitDestinationCard'
import { SubmitTrackerConfig } from './submitToLead/SubmitTrackerConfig'
import { SubmitCandidateTable } from './submitToLead/SubmitCandidateTable'
import { SubmitMailPreviewSection } from './submitToLead/SubmitMailPreviewSection'
import { useSubmitToLeadState } from './submitToLead/useSubmitToLeadState'

interface SubmitToLeadPageProps {
  selectedCandidates?: any[]
  requirement?: Requirement | null
  role?: string
  onBack: () => void
  onSubmitSuccess?: () => void
}

export function SubmitToLeadPage({
  selectedCandidates = [],
  requirement = null,
  role = 'recruiter',
  onBack,
  onSubmitSuccess,
}: SubmitToLeadPageProps) {
  const state = useSubmitToLeadState(selectedCandidates, requirement, role, onBack, onSubmitSuccess)

  return (
    <div className="space-y-6 w-full pb-24 font-sans text-slate-800 animate-in fade-in duration-200">
      <SubmitToLeadHeader requirement={requirement} onBack={onBack} />
      <SubmitDestinationCard
        leadEmail={state.leadEmail}
        forwardLoopChecked={state.forwardLoopChecked}
        setForwardLoopChecked={state.setForwardLoopChecked}
        forwardReq={state.forwardReq}
        setForwardReq={state.setForwardReq}
        currentReqId={state.currentReqId}
        requirement={requirement}
        clientName={state.clientName}
        recruiterName={state.recruiterName}
        recruiterEmail={state.recruiterEmail}
        selectedCandidates={selectedCandidates}
        toRecipients={state.toRecipients}
        ccRecipients={state.ccRecipients}
        showToast={state.showToast}
      />
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-5">
        <SubmitCandidateTable
          visibleColumns={state.visibleColumns}
          headerColor={state.headerColor}
          trackerRows={state.trackerRows}
          handleUpdateCell={state.handleUpdateCell}
        />
        <SubmitTrackerConfig
          clientName={state.clientName}
          handleClientChange={state.handleClientChange}
          headerColor={state.headerColor}
          setHeaderColor={state.setHeaderColor}
          columnList={state.columnList}
          setColumnList={state.setColumnList}
          hiddenColumns={state.hiddenColumns}
          toggleColumnVisibility={state.toggleColumnVisibility}
          customColName={state.customColName}
          setCustomColName={state.setCustomColName}
          customColPosition={state.customColPosition}
          setCustomColPosition={state.setCustomColPosition}
          handleInsertCustomColumn={state.handleInsertCustomColumn}
          draggedColIndex={state.draggedColIndex}
          dragOverColIndex={state.dragOverColIndex}
          selectedColIndex={state.selectedColIndex}
          handleDragStart={state.handleDragStart}
          handleDragEnter={state.handleDragEnter}
          handleDragOver={state.handleDragOver}
          handleDrop={state.handleDrop}
          handleDragEnd={state.handleDragEnd}
          handleChipClick={state.handleChipClick}
          moveColumnLeft={state.moveColumnLeft}
          moveColumnRight={state.moveColumnRight}
          showToast={state.showToast}
        />
      </div>
      <SubmitMailPreviewSection
        forwardLoopChecked={state.forwardLoopChecked}
        isLeadApproved={state.forwardReq?.status === 'approved'}
        threadSubject={state.threadSubject}
        setThreadSubject={state.setThreadSubject}
        recruiterName={state.recruiterName}
        setRecruiterName={state.setRecruiterName}
        recruiterEmail={state.recruiterEmail}
        setRecruiterEmail={state.setRecruiterEmail}
        toRecipients={state.toRecipients}
        ccRecipients={state.ccRecipients}
        newToInput={state.newToInput}
        setNewToInput={state.setNewToInput}
        newCcInput={state.newCcInput}
        setNewCcInput={state.setNewCcInput}
        handleAddToRecipient={() => {
          if (state.newToInput.includes('@')) {
            state.setToRecipients([...state.toRecipients, state.newToInput])
            state.setNewToInput('')
          }
        }}
        handleAddCcRecipient={() => {
          if (state.newCcInput.includes('@')) {
            state.setCcRecipients([...state.ccRecipients, state.newCcInput])
            state.setNewCcInput('')
          }
        }}
        handleRemoveTo={email => state.setToRecipients(state.toRecipients.filter(e => e !== email))}
        handleRemoveCc={email => state.setCcRecipients(state.ccRecipients.filter(e => e !== email))}
        leadEmail={state.leadEmail}
        setLeadEmail={state.setLeadEmail}
        introduction={state.introduction}
        setIntroduction={state.setIntroduction}
        confirmForwardChecked={state.confirmForwardChecked}
        setConfirmForwardChecked={state.setConfirmForwardChecked}
        requirement={requirement}
        hasDuplicateSubmission={state.hasDuplicateSubmission}
        firstDuplicate={state.firstDuplicate}
        currentReqId={state.currentReqId}
        handleSubmitFinal={state.handleSubmitFinal}
      />
      {state.toastMsg && (
        <div className="fixed bottom-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium">
          {state.toastMsg}
        </div>
      )}
    </div>
  )
}
