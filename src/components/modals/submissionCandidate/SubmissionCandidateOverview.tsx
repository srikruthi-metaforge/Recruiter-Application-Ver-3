import React from 'react'

interface SubmissionCandidateOverviewProps {
  exp: string
  submissionId: string
  submittedBy: string
  company: string
  submittedOn: string
  status: string
  reasonInput: string
  setReasonInput: (v: string) => void
  savedSuccessMsg: boolean
  handleSaveReason: () => void
}

export function SubmissionCandidateOverview({
  exp,
  submissionId,
  submittedBy,
  company,
  submittedOn,
  status,
  reasonInput,
  setReasonInput,
  savedSuccessMsg,
  handleSaveReason,
}: SubmissionCandidateOverviewProps) {
  return (
    <div className="space-y-6">
      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 text-xs">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TOTAL EXPERIENCE</span>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">{exp}</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">NOTICE PERIOD</span>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">30 Days</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">EXPECTED SALARY</span>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">6.5 Lpa</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PREFERRED LOCATION</span>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">Bengaluru</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">SKILLS</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-medium text-[11px]">PLM/PDM Engineer</span>
              <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-medium text-[11px]">
                PLM-6 Months PDM-1.06 Years Change Management-1.06 Years
              </span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SUBMISSION ID</span>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">{submissionId}</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SUBMITTED BY</span>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">{submittedBy}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CURRENT COMPANY</span>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">{company}</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CURRENT SALARY</span>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">3.5 Lpa</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">LOCATION</span>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">Bengaluru</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SOURCE</span>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">—</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SUBMITTED</span>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">{submittedOn}</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">STATUS</span>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">{status}</p>
          </div>
        </div>
      </div>

      {/* Minimal Rejection Reason Container */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Reason for Rejection</h4>
          {savedSuccessMsg && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              ✓ Reason saved
            </span>
          )}
        </div>

        <div className="space-y-2">
          <textarea
            rows={2}
            value={reasonInput}
            onChange={e => setReasonInput(e.target.value)}
            placeholder="Enter reason for rejection (e.g. Notice period > 60 days, expected CTC budget mismatch)..."
            className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-900 leading-relaxed resize-y"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSaveReason}
              className="px-4 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer active:scale-98"
            >
              Save Reason
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
