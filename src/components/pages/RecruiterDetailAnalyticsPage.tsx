import React, { useState } from 'react'
import { RecruiterPerfChartsSection } from './recruiterAnalytics/RecruiterPerfChartsSection'
import { NonSubmissionReasonModal } from './recruiterAnalytics/NonSubmissionReasonModal'
import { RecruiterDetailHeader } from './recruiterAnalytics/RecruiterDetailHeader'
import { RecruiterRequirementsTable } from './recruiterAnalytics/RecruiterRequirementsTable'

export interface RecruiterDetailData {
  id: string
  name: string
  email?: string
  role?: string
  team?: string
  avatar?: string
  requirementsCount?: number
  workedReqs?: number
  nonWorkedReqs?: number
  submissionsCount?: number
  shortlistedCount?: number
  noSubmissionsCount?: number
  interviewsCount?: number
  hiresCount?: number
  conversionRate?: string
  dailyTaskStatus?: string
  weeklyProgress?: string
  weeklyProgressPct?: number
  teamLead?: string
  primaryClient?: string
  assignedReqsCount?: number
  submittedClients?: string[]
  status?: 'On Track' | 'Warning' | 'Critical'
  requirementsList?: {
    id: string
    title: string
    client: string
    status: 'Worked' | 'Non-Worked'
    submissions: number
    interviews: number
    reasonNote?: string
  }[]
}

interface RecruiterDetailAnalyticsPageProps {
  recruiter: RecruiterDetailData
  onBack: () => void
  userRole?: string
}

export function RecruiterDetailAnalyticsPage({
  recruiter: initialRecruiter,
  onBack,
  userRole = 'recruiter',
}: RecruiterDetailAnalyticsPageProps) {
  const [recruiter, setRecruiter] = useState<RecruiterDetailData>(initialRecruiter)
  const [activeTab, setActiveTab] = useState<'requirements' | 'submissions'>('requirements')
  const [dateFilter, setDateFilter] = useState<'today' | 'this_week' | 'this_month' | 'custom'>('this_month')
  const [startDate, setStartDate] = useState('2026-08-01')
  const [endDate, setEndDate] = useState('2026-08-11')

  const [selectedReqForReason, setSelectedReqForReason] = useState<{ id: string; title: string; currentReason?: string } | null>(null)
  const [reasonText, setReasonText] = useState('')
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const handleOpenReasonModal = (req: { id: string; title: string; reasonNote?: string }) => {
    setSelectedReqForReason({ id: req.id, title: req.title, currentReason: req.reasonNote })
    setReasonText(req.reasonNote || '')
  }

  const handleSaveReasonNote = () => {
    if (!selectedReqForReason) return
    const updatedList = (recruiter.requirementsList || []).map(item =>
      item.id === selectedReqForReason.id ? { ...item, reasonNote: reasonText.trim() } : item
    )
    setRecruiter({ ...recruiter, requirementsList: updatedList })
    showToast(`Saved non-submission reason for ${selectedReqForReason.id}!`)
    setSelectedReqForReason(null)
    setReasonText('')
  }

  const PRESET_REASONS = [
    'Client JD requirements unclear / pending clarification',
    'Candidate salary expectation exceeds client budget',
    'Location constraint / No local candidates available',
    'Requirement put on hold by hiring manager',
    'Niche skill set requiring extended sourcing timeline',
  ]

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-150">
      <RecruiterDetailHeader
        recruiter={recruiter}
        onBack={onBack}
        userRole={userRole}
        showToast={showToast}
      />

      <RecruiterPerfChartsSection recruiter={recruiter} />

      <RecruiterRequirementsTable
        recruiter={recruiter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleOpenReasonModal={handleOpenReasonModal}
      />

      <NonSubmissionReasonModal
        selectedReqForReason={selectedReqForReason}
        setSelectedReqForReason={setSelectedReqForReason}
        reasonText={reasonText}
        setReasonText={setReasonText}
        handleSaveReasonNote={handleSaveReasonNote}
        PRESET_REASONS={PRESET_REASONS}
      />

      {toastMsg && (
        <div className="fixed bottom-12 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
