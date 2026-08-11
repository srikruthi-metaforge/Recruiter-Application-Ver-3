import React, { useState } from 'react'
import { ArrowLeft, X, Lock, ExternalLink } from 'lucide-react'

export interface SubmissionCandidateDetailModalProps {
  submission: any | null
  onClose: () => void
  onViewFullProfile?: (sub: any) => void
  onBackToRequirement?: () => void
}

export function SubmissionCandidateDetailModal({
  submission,
  onClose,
  onViewFullProfile,
  onBackToRequirement,
}: SubmissionCandidateDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'interviews' | 'feedback' | 'activity' | 'communication' | 'offer'>('overview')

  if (!submission) return null

  // Support both property schemas
  const name = submission.candidateName || submission.candidate || 'PUNEETH K A'
  const email = `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`
  const phone = '+91 89045 52774'
  const exp = submission.experience || '2 Years 6 Months'
  const company = submission.currentCompany || 'TE Connectivity India Pvt. Ltd'
  const submittedBy = submission.submittedBy || 'Suresh kulkarni'
  const submittedOn = submission.submittedOn || submission.date || '10 Aug 2026, 17:07'
  const submissionId = submission.id?.startsWith('SUB-') ? submission.id : `SUB-${submission.id || '571'}`
  const status = submission.status || submission.stage || 'Submitted to Client'

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200/80 my-6 animate-in zoom-in-95 duration-150 font-sans text-slate-800">
        {/* TOP HEADER BAR */}
        <div className="px-6 pt-5 pb-4 border-b border-slate-100 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToRequirement || onClose}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Requirement Overview</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close detail modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight uppercase">
              {name}
            </h2>

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
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('interviews')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'interviews'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            Interviews
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'feedback'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            Feedback
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'activity'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setActiveTab('communication')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'communication'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            Communication
          </button>
          <button
            onClick={() => setActiveTab('offer')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'offer'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50'
            }`}
          >
            <Lock className="w-3 h-3 text-slate-400" />
            <span>Offer</span>
          </button>
        </div>

        {/* TAB BODY */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto custom-scrollbar bg-white">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 2-Column Grid matching Screenshot */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 text-xs">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      TOTAL EXPERIENCE
                    </span>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">{exp}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      NOTICE PERIOD
                    </span>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">30 Days</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      EXPECTED SALARY
                    </span>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">6.5 Lpa</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      PREFERRED LOCATION
                    </span>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">Bengaluru</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      SKILLS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-medium text-[11px]">
                        PLM/PDM Engineer
                      </span>
                      <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-medium text-[11px]">
                        PLM-6 Months PDM-1.06 Years Change Management-1.06 Years
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      SUBMISSION ID
                    </span>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">{submissionId}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      SUBMITTED BY
                    </span>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">{submittedBy}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      CURRENT COMPANY
                    </span>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">{company}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      CURRENT SALARY
                    </span>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">3.5 Lpa</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      LOCATION
                    </span>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">Bengaluru</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      SOURCE
                    </span>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">—</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      SUBMITTED
                    </span>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">{submittedOn}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      STATUS
                    </span>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">{status}</p>
                  </div>
                </div>
              </div>

              {/* Rejection Reason Container */}
              <div className="bg-[#FFF1F2] border border-[#FFE4E6] rounded-xl p-4 space-y-1">
                <h4 className="text-[11px] font-bold text-[#9F1239] uppercase tracking-wider">
                  REJECTION REASON
                </h4>
                <p className="text-xs text-[#881337] font-medium">—</p>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <p className="text-xs font-semibold text-slate-600 capitalize">{activeTab} section</p>
              <p className="text-[11px] text-slate-400">
                Detailed candidate {activeTab} logs will appear here.
              </p>
            </div>
          )}
        </div>

        {/* STICKY FOOTER BAR */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>View only — submitted by {submittedBy}.</span>
          <button
            type="button"
            onClick={() => {
              if (onViewFullProfile) onViewFullProfile(submission)
              onClose()
            }}
            className="text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>View full profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}
