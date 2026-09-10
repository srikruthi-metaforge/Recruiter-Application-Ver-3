import React from 'react'
import { X, Search, Upload, UserPlus } from 'lucide-react'
import { Requirement, Submission } from '../../types'
import { checkDuplicateSubmission } from '../../data/submissionsStore'
import { SubmitCandidatePathExisting } from './submitCandidate/SubmitCandidatePathExisting'
import { SubmitCandidatePathNew } from './submitCandidate/SubmitCandidatePathNew'
import { useSubmitCandidateModalState } from './submitCandidate/useSubmitCandidateModalState'

interface SubmitCandidateModalProps {
  isOpen: boolean
  onClose: () => void
  requirements?: Requirement[]
  requirement?: Requirement
  selectedReqId?: string | null
  onSubmit?: (sub: Submission) => void
  onSuccess?: () => void
  currentRecruiterName?: string
}

export function SubmitCandidateModal({
  isOpen,
  onClose,
  requirements,
  requirement,
  selectedReqId,
  onSubmit = () => {},
  onSuccess,
  currentRecruiterName = 'Recruiter',
}: SubmitCandidateModalProps) {
  const reqList = requirements || (requirement ? [requirement] : [])
  const reqId = selectedReqId || requirement?.id
  const modalState = useSubmitCandidateModalState({
    requirements: reqList,
    selectedReqId: reqId,
    onSubmit: sub => {
      onSubmit(sub)
      onSuccess?.()
    },
    currentRecruiterName,
    onClose,
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#6B3BF6]/10 text-[#6B3BF6] flex items-center justify-center border border-[#6B3BF6]/20 font-bold">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base tracking-tight">Add Candidate to Requirement</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Targeting: <strong className="text-slate-800 font-bold">{modalState.targetReq?.id} — {modalState.targetReq?.title}</strong> ({modalState.targetReq?.client})
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pt-3 pb-2 border-b border-slate-100 bg-white flex items-center gap-2">
          <button
            type="button"
            onClick={() => modalState.setPathMode('existing')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              modalState.pathMode === 'existing' ? 'bg-[#6B3BF6] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Path 1: Search Existing Candidate</span>
          </button>
          <button
            type="button"
            onClick={() => modalState.setPathMode('new')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              modalState.pathMode === 'new' ? 'bg-[#6B3BF6] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Path 2: Add New Candidate</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          {modalState.pathMode === 'existing' ? (
            <SubmitCandidatePathExisting
              searchQuery={modalState.searchQuery}
              setSearchQuery={modalState.setSearchQuery}
              filteredCandidates={modalState.filteredCandidates}
              selectedCandidate={modalState.selectedCandidate}
              setSelectedCandidate={modalState.setSelectedCandidate}
              targetReqId={modalState.targetReqId}
              targetReq={modalState.targetReq}
              existingDupResult={modalState.existingDupResult}
              checkDuplicateSubmission={checkDuplicateSubmission}
              handleSubmitExisting={modalState.handleSubmitExisting}
              onClose={onClose}
            />
          ) : (
            <SubmitCandidatePathNew
              resumeName={modalState.resumeName}
              isParsing={modalState.isParsing}
              handleSimulateResumeUpload={modalState.handleSimulateResumeUpload}
              newCandidateName={modalState.newCandidateName}
              setNewCandidateName={modalState.setNewCandidateName}
              newEmail={modalState.newEmail}
              setNewEmail={modalState.setNewEmail}
              newPhone={modalState.newPhone}
              setNewPhone={modalState.setNewPhone}
              newExperience={modalState.newExperience}
              setNewExperience={modalState.setNewExperience}
              newCompany={modalState.newCompany}
              setNewCompany={modalState.setNewCompany}
              newSkills={modalState.newSkills}
              setNewSkills={modalState.setNewSkills}
              targetReq={modalState.targetReq}
              newDupResult={modalState.newDupResult}
              handleSubmitNew={modalState.handleSubmitNew}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  )
}

