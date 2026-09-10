import React, { useState, useEffect } from 'react'
import { X, Lock } from 'lucide-react'
import { Role } from '../../types'
import { SubmissionCandidateOverview } from './submissionCandidate/SubmissionCandidateOverview'

export interface SubmissionCandidateDetailModalProps {
  submission: any | null
  role?: Role
  onClose: () => void
  onViewFullProfile?: (sub: any) => void
  onBackToRequirement?: () => void
  rejectionReason?: string
  onSaveRejectionReason?: (submissionId: string, newReason: string) => void
}

export function SubmissionCandidateDetailModal({
  submission,
  role = 'recruiter',
  onClose,
  rejectionReason,
  onSaveRejectionReason,
}: SubmissionCandidateDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'interviews' | 'feedback' | 'activity' | 'communication' | 'offer'>('overview')
  const [reasonInput, setReasonInput] = useState(rejectionReason || submission?.rejectionReason || '')
  const [savedSuccessMsg, setSavedSuccessMsg] = useState(false)

  useEffect(() => {
    setReasonInput(rejectionReason || submission?.rejectionReason || '')
  }, [rejectionReason, submission])

  if (!submission) return null

  const name = submission.candidateName || submission.candidate || 'PUNEETH K A'
  const email = `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`
  const phone = '+91 89045 52774'
  const exp = submission.experience || '2 Years 6 Months'
  const company = submission.currentCompany || 'TE Connectivity India Pvt. Ltd'
  const submittedBy = submission.submittedBy || 'Suresh kulkarni'
  const submittedOn = submission.submittedOn || submission.date || '10 Aug 2026, 17:07'
  const submissionId = submission.id?.startsWith('SUB-') ? submission.id : `SUB-${submission.id || '571'}`
  const status = submission.status || submission.stage || 'Submitted to Client'

  const handleSaveReason = () => {
    if (onSaveRejectionReason) {
      onSaveRejectionReason(submission.id, reasonInput)
    }
    setSavedSuccessMsg(true)
    setTimeout(() => setSavedSuccessMsg(false), 2500)
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200/80 my-6 animate-in zoom-in-95 duration-150 font-sans text-slate-800">
        {/* TOP HEADER BAR */}
        <div className="px-6 pt-5 pb-4 border-b border-slate-100 space-y-3 bg-white">
          <div className="flex items-center justify-end">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close detail modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight uppercase">{name}</h2>

            <div className="flex flex-wrap items-center gap-2.5 text-xs mt-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {status}
              </span>
              <span className="text-slate-600 font-medium">{email}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-600 font-medium">{phone}</span>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS BAR */}
        <div className="px-6 border-b border-slate-200 bg-slate-50/50 flex items-center gap-1.5 pt-3 pb-2 overflow-x-auto custom-scrollbar">
          {(['overview', 'interviews', 'feedback', 'communication', 'offer'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                activeTab === tab ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {tab === 'offer' ? (
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Offer</span>
                </span>
              ) : (
                tab
              )}
            </button>
          ))}
          {role !== 'recruiter' && (
            <button
              onClick={() => setActiveTab('activity')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                activeTab === 'activity' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              Activity
            </button>
          )}
        </div>

        {/* TAB BODY */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto custom-scrollbar bg-white">
          {activeTab === 'overview' ? (
            <SubmissionCandidateOverview
              exp={exp}
              submissionId={submissionId}
              submittedBy={submittedBy}
              company={company}
              submittedOn={submittedOn}
              status={status}
              reasonInput={reasonInput}
              setReasonInput={setReasonInput}
              savedSuccessMsg={savedSuccessMsg}
              handleSaveReason={handleSaveReason}
            />
          ) : (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <p className="text-xs font-semibold text-slate-600 capitalize">{activeTab} section</p>
              <p className="text-[11px] text-slate-400">Detailed candidate {activeTab} logs will appear here.</p>
            </div>
          )}
        </div>

        {/* STICKY FOOTER BAR */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Submitted by {submittedBy}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl cursor-pointer transition-all text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
