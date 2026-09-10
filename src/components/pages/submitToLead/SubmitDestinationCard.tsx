import React from 'react'
import { ShieldCheck, Clock } from 'lucide-react'
import { ForwardRequest, createOrUpdateForwardRequest, approveForwardRequest } from '../../../data/forwardRequestsStore'
import { Requirement } from '../../../types'
import { SubmitForwardPendingBanner } from './SubmitForwardPendingBanner'

interface SubmitDestinationCardProps {
  leadEmail: string
  forwardLoopChecked: boolean
  setForwardLoopChecked: (val: boolean) => void
  forwardReq?: ForwardRequest
  setForwardReq: (req?: ForwardRequest) => void
  currentReqId: string
  requirement?: Requirement | null
  clientName: string
  recruiterName: string
  recruiterEmail: string
  selectedCandidates: any[]
  toRecipients: string[]
  ccRecipients: string[]
  showToast: (msg: string) => void
}

export const SubmitDestinationCard: React.FC<SubmitDestinationCardProps> = ({
  leadEmail,
  forwardLoopChecked,
  setForwardLoopChecked,
  forwardReq,
  setForwardReq,
  currentReqId,
  requirement,
  clientName,
  recruiterName,
  recruiterEmail,
  selectedCandidates,
  toRecipients,
  ccRecipients,
  showToast,
}) => {
  const isLeadApproved = forwardReq?.status === 'approved'

  const handleApprove = () => {
    if (forwardReq) {
      approveForwardRequest(forwardReq.id, 'Team Lead')
    } else {
      const candidateNames = selectedCandidates.map(c => c.name || c.candidateName).filter(Boolean)
      const created = createOrUpdateForwardRequest(
        currentReqId,
        requirement?.title || 'TPC - Requirement - C# Automation - Bangalore /Mysore - Embedded',
        clientName || 'LTTS / L&T',
        recruiterName,
        recruiterEmail,
        candidateNames.length > 0 ? candidateNames : ['Priyanka Sharma'],
        toRecipients,
        ccRecipients,
        []
      )
      approveForwardRequest(created.id, 'Team Lead')
    }
    showToast('Forward request accepted by Team Lead! Sending information (TO, CC, BCC) displayed.')
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-5">
      <div>
        <h3 className="text-base font-extrabold text-slate-900">Submission destination</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Choose what to do — you can select one or both. Submit to Lead counts in metrics; forward to the loop does not add a second submission.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Option 1: Submit to Lead */}
        <div className="p-3.5 bg-blue-50/70 border border-blue-200/90 rounded-2xl flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <input type="checkbox" checked={true} readOnly className="w-4 h-4 text-blue-600 rounded cursor-pointer shrink-0" />
            <div className="truncate">
              <span className="font-extrabold text-slate-900">Submit to Lead</span>
              <span className="text-slate-500 text-[11px] ml-1.5 truncate">({leadEmail})</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="px-2 py-0.5 bg-blue-600 text-white rounded-md text-[10px] font-extrabold uppercase tracking-wider">Mandatory Default</span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-md text-[10px] font-extrabold">1 Submission</span>
          </div>
        </div>

        {/* Option 2: Forward to original requirement loop */}
        <div className={`p-4 rounded-2xl border transition-all ${
          forwardLoopChecked
            ? isLeadApproved
              ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20'
              : 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-500/20'
            : 'bg-slate-50/70 border-slate-200'
        }`}>
          <div className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <input
                type="checkbox"
                checked={forwardLoopChecked}
                onChange={e => {
                  const checked = e.target.checked
                  setForwardLoopChecked(checked)
                  if (checked) {
                    if (!isLeadApproved) {
                      const candidateNames = selectedCandidates.map(c => c.name || c.candidateName).filter(Boolean)
                      const req = createOrUpdateForwardRequest(
                        currentReqId,
                        requirement?.title || 'TPC - Requirement - C# Automation - Bangalore /Mysore - Embedded',
                        clientName || 'LTTS / L&T',
                        recruiterName,
                        recruiterEmail,
                        candidateNames.length > 0 ? candidateNames : ['Priyanka Sharma'],
                        toRecipients,
                        ccRecipients,
                        []
                      )
                      setForwardReq(req)
                      showToast('Forward Request raised to Team Lead! Waiting for Lead approval.')
                    } else {
                      showToast('Forwarding to client loop is approved by Team Lead!')
                    }
                  }
                }}
                className="w-4 h-4 text-amber-600 rounded cursor-pointer shrink-0"
              />
              <div className="truncate">
                <span className="font-extrabold text-slate-900">Forward to client loop</span>
                <span className="text-slate-500 text-[11px] ml-1.5 truncate hidden sm:inline">(Reply in client/DL thread)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {!forwardLoopChecked ? (
                <span className="px-2.5 py-0.5 bg-slate-200 text-slate-700 rounded-md text-[10px] font-extrabold">Manual Only</span>
              ) : isLeadApproved ? (
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-md text-[10px] font-extrabold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>✓ Lead Approved</span>
                </span>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-md text-[10px] font-extrabold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-700 animate-spin" />
                    <span>Pending Approval</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleApprove}
                    className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[10px] font-extrabold cursor-pointer transition-all shadow-xs"
                  >
                    Accept (Lead)
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 pl-6">
            {!forwardLoopChecked
              ? 'Unchecked by default. Tick this checkbox to send a forward request to your Team Lead for permission to forward in client email loop.'
              : isLeadApproved
              ? 'Team Lead has accepted your forward request. Sending information is now unlocked below.'
              : 'Forward request raised to Team Lead. Waiting for Lead to accept before sending information unlocks.'}
          </p>
        </div>
      </div>

      {forwardLoopChecked && !isLeadApproved && (
        <SubmitForwardPendingBanner
          reqTitle={requirement?.title || currentReqId}
          leadEmail={leadEmail}
          handleApprove={handleApprove}
        />
      )}
    </div>
  )
}
