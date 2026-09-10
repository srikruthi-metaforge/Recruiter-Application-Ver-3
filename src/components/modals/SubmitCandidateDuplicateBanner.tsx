import React from 'react'
import { ShieldAlert } from 'lucide-react'

interface SubmitCandidateDuplicateBannerProps {
  matchReason?: string
  existingSubmission?: any
}

export function SubmitCandidateDuplicateBanner({ matchReason, existingSubmission }: SubmitCandidateDuplicateBannerProps) {
  return (
    <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 space-y-2 animate-in fade-in duration-150">
      <div className="flex items-center gap-2 text-rose-800 font-extrabold text-xs uppercase tracking-wider">
        <ShieldAlert className="w-4 h-4 text-rose-600" />
        <span>Duplicate Submission Prevented</span>
      </div>
      <p className="text-xs text-rose-900 font-medium leading-relaxed">
        {matchReason || 'Candidate is already submitted for this requirement.'}
      </p>
      {existingSubmission && (
        <div className="text-[11px] text-rose-700 bg-rose-100/80 p-2 rounded-xl border border-rose-200 font-mono">
          Existing Record: ID <strong>{existingSubmission.id}</strong> | Submitted by <strong>{existingSubmission.recruiter}</strong> on <strong>{existingSubmission.date}</strong>
        </div>
      )}
    </div>
  )
}
