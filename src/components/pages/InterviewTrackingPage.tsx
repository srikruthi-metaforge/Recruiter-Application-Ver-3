import React, { useState } from 'react'
import { Role } from '../../types'
import { ScheduleInterviewModal } from '../modals/ScheduleInterviewModal'
import {
  ScheduleRowItem,
  FinalDecisionRowItem,
  RejectedCandidateRowItem,
  DEFAULT_SCHEDULE_ITEMS,
  DEFAULT_FINAL_DECISIONS,
  DEFAULT_REJECTED_CANDIDATES,
} from './interviewTracking/interviewTrackingData'
import { InterviewTrackingHeader } from './interviewTracking/InterviewTrackingHeader'
import { InterviewScheduleTable } from './interviewTracking/InterviewScheduleTable'
import { InterviewDecisionsTable } from './interviewTracking/InterviewDecisionsTable'
import { InterviewRejectionsTable } from './interviewTracking/InterviewRejectionsTable'

export type { ScheduleRowItem, FinalDecisionRowItem, RejectedCandidateRowItem }

interface InterviewTrackingPageProps {
  role?: Role
  interviews?: any[]
  onOpenFeedbackModal?: (iv: any) => void
}

export function InterviewTrackingPage({ role = 'superadmin' }: InterviewTrackingPageProps) {
  const [activeTab, setActiveTab] = useState<'schedules' | 'decisions' | 'rejections'>('schedules')
  const [schedules] = useState<ScheduleRowItem[]>(DEFAULT_SCHEDULE_ITEMS)
  const [decisions] = useState<FinalDecisionRowItem[]>(DEFAULT_FINAL_DECISIONS)
  const [rejections] = useState<RejectedCandidateRowItem[]>(DEFAULT_REJECTED_CANDIDATES)

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-150">
      <InterviewTrackingHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
      />

      {activeTab === 'schedules' && (
        <InterviewScheduleTable schedules={schedules} showToast={showToast} />
      )}

      {activeTab === 'decisions' && (
        <InterviewDecisionsTable decisions={decisions} showToast={showToast} />
      )}

      {activeTab === 'rejections' && (
        <InterviewRejectionsTable rejections={rejections} showToast={showToast} />
      )}

      {isScheduleModalOpen && (
        <ScheduleInterviewModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          onSuccess={() => {
            setIsScheduleModalOpen(false)
            showToast('New interview scheduled successfully!')
          }}
        />
      )}

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
