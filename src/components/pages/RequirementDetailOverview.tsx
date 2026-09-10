import React, { useState, useMemo } from 'react'
import { Requirement } from '../../types'
import { ScheduleInterviewModal } from '../modals/ScheduleInterviewModal'
import { SubmitCandidateModal } from '../modals/SubmitCandidateModal'
import {
  RequirementDetailOverviewProps,
  MOCK_CANDIDATE_SUBMISSIONS,
  CandidateSubmissionRow,
} from './requirementDetail/requirementDetailData'
import { ReqDetailHeader } from './requirementDetail/ReqDetailHeader'
import { ReqDetailOverviewCard } from './requirementDetail/ReqDetailOverviewCard'
import { ReqDetailSubmissionsTab } from './requirementDetail/ReqDetailSubmissionsTab'

export function RequirementDetailOverview({
  requirement,
  role = 'superadmin',
  onBack,
  onOpenAssignModal,
  onEditRequirement,
  onAddCandidate,
  onRevokeRequirement,
}: RequirementDetailOverviewProps) {
  const normalizedRole = (role || '').toLowerCase()
  const isRecruiter = normalizedRole === 'recruiter'
  const isSuperAdminOrAdmin = normalizedRole === 'superadmin' || normalizedRole === 'admin' || normalizedRole === 'devteam'

  const availableTabs = isSuperAdminOrAdmin
    ? (['Overview', 'Pipeline', 'Interviews', 'Offers', 'Activity'] as const)
    : (['Overview', 'Pipeline', 'Interviews', 'Offers'] as const)

  const [activeTab, setActiveTab] = useState<'Overview' | 'Pipeline' | 'Interviews' | 'Offers' | 'Activity'>('Overview')
  const [historyTabFilter, setHistoryTabFilter] = useState<'all' | 'submitted_lead' | 'submitted_client' | 'interview' | 'selected' | 'rejected'>('all')
  const [historySearchQuery, setHistorySearchQuery] = useState('')
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [schedulingCandidateRow, setSchedulingCandidateRow] = useState<any>(null)
  const [isAddCandidateModalOpen, setIsAddCandidateModalOpen] = useState(false)

  const isUnassigned = !requirement.owner || requirement.owner === 'Unassigned'

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  const filteredHistoryRows = useMemo(() => {
    return MOCK_CANDIDATE_SUBMISSIONS.filter(row => {
      if (isRecruiter && row.submittedBy !== 'Marcus Chen') return false
      if (historyTabFilter !== 'all') {
        if (historyTabFilter === 'submitted_client' && row.status !== 'Submitted to Client') return false
        if (historyTabFilter === 'submitted_lead' && row.status !== 'Submitted to Lead') return false
      }
      if (historySearchQuery.trim()) {
        const q = historySearchQuery.toLowerCase()
        if (!row.name.toLowerCase().includes(q) && !row.subId.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [isRecruiter, historyTabFilter, historySearchQuery])

  const handleScheduleInterview = (candidateRow: CandidateSubmissionRow) => {
    setSchedulingCandidateRow(candidateRow)
    setIsScheduleModalOpen(true)
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-gray-800 animate-in fade-in duration-150">
      <ReqDetailHeader
        requirement={requirement}
        isUnassigned={isUnassigned}
        onBack={onBack}
        onOpenAssignModal={onOpenAssignModal}
        onEditRequirement={onEditRequirement}
        onAddCandidate={onAddCandidate}
        onRevokeRequirement={onRevokeRequirement}
        setIsAddCandidateModalOpen={setIsAddCandidateModalOpen}
        showToast={showToast}
      />

      {/* METRICS & PROGRESS BARS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold text-gray-400 uppercase">TOTAL CANDIDATES</div>
          <div className="text-2xl font-extrabold text-gray-900 mt-1">{isUnassigned ? 0 : (requirement.submissions || 7)}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold text-gray-400 uppercase">SUBMITTED</div>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">{isUnassigned ? 0 : (requirement.submissions || 7)}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold text-gray-400 uppercase">INTERVIEWING</div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{requirement.interviews || 0}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold text-gray-400 uppercase">SELECTED</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{requirement.placed || 0}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold text-gray-400 uppercase">REJECTED</div>
          <div className="text-2xl font-extrabold text-red-600 mt-1">{requirement.rejections || 0}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold text-gray-400 uppercase">OFFER RELEASED</div>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1">0</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold text-gray-400 uppercase">SLA REMAINING</div>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">{isUnassigned ? 10 : 0}</div>
        </div>
      </div>

      {/* TAB NAV */}
      <div className="bg-slate-50/80 border border-gray-200/80 rounded-xl p-1.5 flex items-center gap-1">
        {availableTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-white text-gray-900 shadow-xs border border-gray-200/60'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/60'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'Overview' && (
        <ReqDetailOverviewCard requirement={requirement} isUnassigned={isUnassigned} />
      )}

      {activeTab === 'Pipeline' && (
        <ReqDetailSubmissionsTab
          filteredHistoryRows={filteredHistoryRows}
          historyTabFilter={historyTabFilter}
          setHistoryTabFilter={setHistoryTabFilter}
          historySearchQuery={historySearchQuery}
          setHistorySearchQuery={setHistorySearchQuery}
          onScheduleInterview={handleScheduleInterview}
        />
      )}

      {/* MODALS */}
      {isScheduleModalOpen && schedulingCandidateRow && (
        <ScheduleInterviewModal
          candidate={{
            id: schedulingCandidateRow.subId,
            name: schedulingCandidateRow.name,
            email: schedulingCandidateRow.email,
            reqId: requirement.id,
            reqTitle: requirement.title,
            client: requirement.client,
          }}
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          onSuccess={() => {
            setIsScheduleModalOpen(false)
            showToast(`Interview scheduled for ${schedulingCandidateRow.name}!`)
          }}
        />
      )}

      {isAddCandidateModalOpen && (
        <SubmitCandidateModal
          requirement={requirement}
          isOpen={isAddCandidateModalOpen}
          onClose={() => setIsAddCandidateModalOpen(false)}
          onSuccess={() => {
            setIsAddCandidateModalOpen(false)
            showToast('Candidate submitted successfully!')
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
