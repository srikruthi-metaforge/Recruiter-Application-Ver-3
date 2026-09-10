import React from 'react'
import { Lock, Clock, Check } from 'lucide-react'

interface SubmitForwardPendingBannerProps {
  reqTitle: string
  leadEmail: string
  handleApprove: () => void
}

export function SubmitForwardPendingBanner({ reqTitle, leadEmail, handleApprove }: SubmitForwardPendingBannerProps) {
  return (
    <div className="p-5 bg-amber-50/90 border border-amber-300 rounded-2xl space-y-3 animate-in fade-in duration-200 w-full">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs sm:text-sm">
          <Lock className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Forwarding Information Locked — Pending Team Lead Approval</span>
        </div>
        <span className="px-2.5 py-0.5 bg-amber-200 text-amber-950 rounded-md text-[11px] font-extrabold flex items-center gap-1">
          <Clock className="w-3 h-3 text-amber-800" />
          <span>Request Raised</span>
        </span>
      </div>
      <p className="text-xs text-amber-800 leading-relaxed">
        Your request to forward candidate submission to client loop for <strong>{reqTitle}</strong> has been raised to your Team Lead (<strong>{leadEmail}</strong>).
      </p>
      <div className="flex items-center justify-between pt-2 border-t border-amber-200/80 flex-wrap gap-2">
        <span className="text-[11px] text-amber-700 font-semibold italic">
          Switch to Team Lead module to accept, or click Accept Request below.
        </span>
        <button
          type="button"
          onClick={handleApprove}
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Accept Request (As Lead)</span>
        </button>
      </div>
    </div>
  )
}
