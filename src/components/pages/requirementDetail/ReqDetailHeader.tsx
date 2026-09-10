import React from 'react'
import { ArrowLeft, Pencil, UserPlus, RotateCcw, Briefcase, Calendar, User } from 'lucide-react'
import { Requirement } from '../../../types'

interface ReqDetailHeaderProps {
  requirement: Requirement
  isUnassigned: boolean
  onBack: () => void
  onOpenAssignModal?: () => void
  onEditRequirement?: () => void
  onAddCandidate?: () => void
  onRevokeRequirement?: () => void
  setIsAddCandidateModalOpen: (val: boolean) => void
  showToast: (msg: string) => void
}

export const ReqDetailHeader: React.FC<ReqDetailHeaderProps> = ({
  requirement,
  isUnassigned,
  onBack,
  onOpenAssignModal,
  onEditRequirement,
  onAddCandidate,
  onRevokeRequirement,
  setIsAddCandidateModalOpen,
  showToast,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-2xs cursor-pointer w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-gray-500" />
          <span>Back</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          {onOpenAssignModal && !isUnassigned && (
            <button
              onClick={onOpenAssignModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-blue-200 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-all shadow-2xs cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5 text-blue-600" />
              <span>Reassign</span>
            </button>
          )}

          {onRevokeRequirement && !isUnassigned && (
            <button
              onClick={onRevokeRequirement}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-rose-200 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 transition-all shadow-2xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
              <span>Revoke Requirement</span>
            </button>
          )}

          {!isUnassigned && (
            <button
              onClick={() => {
                if (onAddCandidate) onAddCandidate()
                setIsAddCandidateModalOpen(true)
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-[#6B3BF6]/30 rounded-xl text-xs font-bold text-[#6B3BF6] bg-purple-50 hover:bg-purple-100 transition-all shadow-2xs cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#6B3BF6]" />
              <span>Add Candidate</span>
            </button>
          )}

          <button
            onClick={onEditRequirement || (() => showToast('Editing requirement details...'))}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-2xs cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5 text-gray-500" />
            <span>Edit Requirement</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-gray-800">
            <Briefcase className="w-4 h-4 text-gray-400" />
            <span>{requirement.id}</span>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase border ${
              requirement.priority === 'High'
                ? 'bg-red-50 text-red-700 border-red-200'
                : requirement.priority === 'Medium'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
            }`}
          >
            {requirement.priority}
          </span>

          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
              isUnassigned ? 'bg-gray-100 text-gray-600 border-gray-300' : 'bg-indigo-50 text-indigo-700 border-indigo-200'
            }`}
          >
            {isUnassigned ? 'Unassigned' : (requirement.assignmentStatus || 'Submitted')}
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
          {requirement.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 font-medium pt-1">
          <span>{requirement.clientEmail ? requirement.clientEmail.split('@')[0] : 'harish'}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            <span>SLA remaining: <strong>{isUnassigned ? '10 days' : '0 days'}</strong></span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 bg-purple-50 text-[#6B3BF6] px-2.5 py-0.5 rounded-full border border-purple-200 font-extrabold">
            <User className="w-3.5 h-3.5 text-[#6B3BF6]" />
            <span>Assigned Recruiter: <strong>{requirement.owner || 'Unassigned'}</strong></span>
          </span>
        </div>
      </div>
    </div>
  )
}
