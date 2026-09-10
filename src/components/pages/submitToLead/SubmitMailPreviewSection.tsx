import React from 'react'
import { ShieldAlert, Send } from 'lucide-react'
import { Requirement } from '../../../types'
import { SubmitMailRecipientsCard } from './SubmitMailRecipientsCard'

interface SubmitMailPreviewSectionProps {
  forwardLoopChecked: boolean
  isLeadApproved: boolean
  threadSubject: string
  setThreadSubject: (val: string) => void
  recruiterName: string
  setRecruiterName: (val: string) => void
  recruiterEmail: string
  setRecruiterEmail: (val: string) => void
  toRecipients: string[]
  ccRecipients: string[]
  newToInput: string
  setNewToInput: (val: string) => void
  newCcInput: string
  setNewCcInput: (val: string) => void
  handleAddToRecipient: () => void
  handleAddCcRecipient: () => void
  handleRemoveTo: (email: string) => void
  handleRemoveCc: (email: string) => void
  leadEmail: string
  setLeadEmail: (val: string) => void
  introduction: string
  setIntroduction: (val: string) => void
  confirmForwardChecked: boolean
  setConfirmForwardChecked: (val: boolean) => void
  requirement?: Requirement | null
  hasDuplicateSubmission: boolean
  firstDuplicate?: any
  currentReqId: string
  handleSubmitFinal: () => void
}

export const SubmitMailPreviewSection: React.FC<SubmitMailPreviewSectionProps> = ({
  forwardLoopChecked,
  isLeadApproved,
  threadSubject,
  setThreadSubject,
  recruiterName,
  setRecruiterName,
  recruiterEmail,
  setRecruiterEmail,
  toRecipients,
  ccRecipients,
  newToInput,
  setNewToInput,
  newCcInput,
  setNewCcInput,
  handleAddToRecipient,
  handleAddCcRecipient,
  handleRemoveTo,
  handleRemoveCc,
  leadEmail,
  setLeadEmail,
  introduction,
  setIntroduction,
  confirmForwardChecked,
  setConfirmForwardChecked,
  hasDuplicateSubmission,
  firstDuplicate,
  currentReqId,
  handleSubmitFinal,
}) => {
  return (
    <div className="space-y-6 font-sans">
      {forwardLoopChecked && isLeadApproved && (
        <div className="space-y-6 pt-2 animate-in fade-in duration-200 w-full">
          <div>
            <label className="block text-slate-700 font-bold text-xs mb-1">THREAD SUBJECT</label>
            <input
              type="text"
              value={threadSubject}
              onChange={e => setThreadSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-blue-50/30 border border-blue-200 rounded-xl text-xs font-semibold text-blue-950 focus:outline-none"
            />
          </div>

          <div className="bg-emerald-50/60 border border-emerald-200/90 rounded-2xl p-4 space-y-3">
            <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block">
              FROM Recruiter sending this submission
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1">Display name</label>
                <input
                  type="text"
                  value={recruiterName}
                  onChange={e => setRecruiterName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1">Reply-to email</label>
                <input
                  type="email"
                  value={recruiterEmail}
                  onChange={e => setRecruiterEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <SubmitMailRecipientsCard
            toRecipients={toRecipients}
            ccRecipients={ccRecipients}
            newToInput={newToInput}
            setNewToInput={setNewToInput}
            newCcInput={newCcInput}
            setNewCcInput={setNewCcInput}
            handleAddToRecipient={handleAddToRecipient}
            handleAddCcRecipient={handleAddCcRecipient}
            handleRemoveTo={handleRemoveTo}
            handleRemoveCc={handleRemoveCc}
          />
        </div>
      )}

      {/* LEAD REVIEW EMAIL CARD */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-extrabold text-slate-900">Lead review email</h3>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-[#6B3BF6] border border-purple-200">Default (1 Submission)</span>
          </div>
          <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            ✓ Mandatory
          </span>
        </div>

        <div>
          <label className="block text-slate-700 font-bold text-xs mb-1">Lead email</label>
          <input
            type="email"
            value={leadEmail}
            onChange={e => setLeadEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none"
          />
        </div>

        <div>
          <textarea
            rows={3}
            value={introduction}
            onChange={e => setIntroduction(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
          />
        </div>
      </div>

      {/* STICKY BOTTOM ACTION BAR */}
      <div className={`sticky bottom-4 z-30 border backdrop-blur-md py-3.5 px-6 rounded-2xl shadow-xl flex items-center justify-between gap-4 mt-6 ${
        hasDuplicateSubmission ? 'bg-rose-50/95 border-rose-300' : 'bg-white/95 border-slate-200/90'
      }`}>
        <span className="text-xs font-bold text-slate-700">
          {hasDuplicateSubmission ? (
            <span className="text-rose-700 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Duplicate Candidate Submission — Cannot submit to Lead or Client.</span>
            </span>
          ) : (
            <span>Submit candidate(s) to lead and forward in the client loop.</span>
          )}
        </span>

        <button
          onClick={handleSubmitFinal}
          disabled={hasDuplicateSubmission}
          className={`px-6 py-2.5 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 shrink-0 ${
            hasDuplicateSubmission
              ? 'bg-rose-300 text-rose-900 cursor-not-allowed border border-rose-300 shadow-none'
              : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white cursor-pointer active:scale-98'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Submit to Lead & Forward</span>
        </button>
      </div>
    </div>
  )
}
