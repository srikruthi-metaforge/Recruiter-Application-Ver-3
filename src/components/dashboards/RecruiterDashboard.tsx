import React, { useState } from 'react'
import { Interview, Requirement, Submission, ActivityLogItem } from '../../types'
import { RequirementDetailOverview } from '../pages/RequirementDetailOverview'
import { CandidateRepositoryPage } from '../pages/CandidateRepositoryPage'
import { SubmissionsPage } from '../pages/SubmissionsPage'
import { InterviewTrackingPage } from '../pages/InterviewTrackingPage'
import { ChevronLeft } from 'lucide-react'
import { PageHeader } from '../layout/PageHeader'
import { RecruiterReassignModal } from './recruiter/RecruiterReassignModal'
import { RecruiterPerformanceSummary } from './recruiter/RecruiterPerformanceSummary'
import { RecruiterActiveReqsTable, ActiveReqRow } from './recruiter/RecruiterActiveReqsTable'
import { RecruiterRecentActivityFeed } from './recruiter/RecruiterRecentActivityFeed'
import { useRecruiterActivityLogs } from './recruiter/useRecruiterActivityLogs'

interface Props {
  submissions: Submission[]
  interviews: Interview[]
  requirements: Requirement[]
  activityLogs?: ActivityLogItem[]
  currentUserName?: string
  currentUserEmail?: string
  onOpenSubmitCandidate?: (reqId?: string) => void
  onOpenCandidateRepo?: (reqId?: string) => void
  onOpenFeedbackModal?: (interview: Interview) => void
  onOpenCandidateDetail?: (sub: Submission) => void
  onAddActivityLog?: (log: ActivityLogItem) => void
}

const DEFAULT_ACTIVE_REQS: ActiveReqRow[] = [
  { type: 'Requirement', id: 'REQ-2026-06-19-001', name: 'AI Data Engineer', client: 'harish', status: 'Assigned', timestamp: 'Jun 19, 2026, 07:29 PM' },
  { type: 'Requirement', id: 'REQ-2026-06-19-002', name: 'Fullstack React Developer', client: 'Metaforge IT', status: 'Submitted', timestamp: 'Jun 20, 2026, 10:15 AM' },
]

export function RecruiterDashboard({
  submissions,
  interviews,
  requirements,
  activityLogs,
  currentUserName = 'Harish Gadipally',
  currentUserEmail,
  onOpenSubmitCandidate,
}: Props) {
  const userActivityLogs = useRecruiterActivityLogs({ activityLogs, submissions, interviews, currentUserName, currentUserEmail })

  const [selectedReqForDetail, setSelectedReqForDetail] = useState<Requirement | null>(null)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [isAssignMyselfChecked, setIsAssignMyselfChecked] = useState(true)
  const [selectedRecruiterNames, setSelectedRecruiterNames] = useState<Set<string>>(new Set())
  const [recruiterSearchQuery, setRecruiterSearchQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('Assigned')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [inlineView, setInlineView] = useState<'submissions' | 'interviews' | null>(null)
  const [inlineReqId, setInlineReqId] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(null), 3500) }

  const handleOpenInlineCandidateRepo = (reqId: string) => {
    setInlineReqId(reqId)
    setTimeout(() => {
      const el = document.getElementById('inline-candidate-repo-section')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleOpenReqOverview = (reqId: string, reqName?: string, reqClient?: string) => {
    const found = requirements.find(r => r.id === reqId) || {
      id: reqId,
      client: reqClient || 'harish',
      title: reqName || 'Implement and support SAP Transportation Management',
      priority: 'Medium' as const,
      status: 'Active' as const,
      assignmentStatus: 'Assigned' as const,
      owner: 'Harish Gadipally',
      submissions: 7, interviews: 0, placed: 0, rejections: 0,
      clientEmail: reqClient || 'harish', location: 'Remote, Hybrid, Onsite', openings: 1, dueDate: '2026-06-19', budget: '₹5,000,000',
    }
    setSelectedReqForDetail(found)
  }

  const recruiterList = [
    { id: '1', name: 'Adirala sathvika', email: 'No email' },
    { id: '2', name: 'Arvind GR', email: 'arvind.gr@metaforgeit.com' },
    { id: '3', name: 'Harish Gadipally', email: 'harish.g@metaforgeit.com' },
  ]

  const filteredRecruiterList = recruiterList.filter(
    r => !recruiterSearchQuery.trim() || r.name.toLowerCase().includes(recruiterSearchQuery.toLowerCase())
  )

  const handleConfirmReassign = () => {
    const assignees: string[] = []
    if (isAssignMyselfChecked) assignees.push('Harish Gadipally')
    selectedRecruiterNames.forEach(n => assignees.push(n))
    if (assignees.length === 0) return
    const assigneesText = assignees.join(', ')
    if (selectedReqForDetail) {
      setSelectedReqForDetail({ ...selectedReqForDetail, owner: assigneesText, assignmentStatus: 'Assigned' })
    }
    setIsAssignModalOpen(false)
  }

  if (selectedReqForDetail) {
    return (
      <>
        <RequirementDetailOverview
          requirement={selectedReqForDetail}
          role="recruiter"
          onBack={() => setSelectedReqForDetail(null)}
          onAddCandidate={() => onOpenSubmitCandidate?.(selectedReqForDetail.id)}
          onOpenAssignModal={() => setIsAssignModalOpen(true)}
        />
        <RecruiterReassignModal
          isAssignModalOpen={isAssignModalOpen}
          setIsAssignModalOpen={setIsAssignModalOpen}
          isAssignMyselfChecked={isAssignMyselfChecked}
          setIsAssignMyselfChecked={setIsAssignMyselfChecked}
          recruiterSearchQuery={recruiterSearchQuery}
          setRecruiterSearchQuery={setRecruiterSearchQuery}
          filteredRecruiterList={filteredRecruiterList}
          recruiterList={recruiterList}
          selectedRecruiterNames={selectedRecruiterNames}
          toggleRecruiterSelection={name => {
            const next = new Set(selectedRecruiterNames)
            if (next.has(name)) next.delete(name); else next.add(name); setSelectedRecruiterNames(next)
          }}
          handleConfirmReassign={handleConfirmReassign}
          totalSelectedRecruitersCount={(isAssignMyselfChecked ? 1 : 0) + selectedRecruiterNames.size}
        />
      </>
    )
  }

  const activeReqRows: ActiveReqRow[] = DEFAULT_ACTIVE_REQS

  return (
    <div className="space-y-6 w-full pb-16 font-sans">
      <PageHeader title="Recruiter Dashboard" subtitle="Track assigned requirements, active candidate submissions, and recruitment progress." />
      <RecruiterPerformanceSummary submissions={submissions} interviews={interviews} />

      <RecruiterActiveReqsTable
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        activeReqRows={activeReqRows}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={1}
        onOpenSubmitCandidate={onOpenSubmitCandidate}
        onOpenInlineCandidateRepo={handleOpenInlineCandidateRepo}
        onOpenReqOverview={handleOpenReqOverview}
      />

      <RecruiterRecentActivityFeed userActivityLogs={userActivityLogs} showToast={showToast} />

      {inlineReqId && (
        <div id="inline-candidate-repo-section" className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-900">Candidate Repository for #{inlineReqId}</h3>
            <button onClick={() => setInlineReqId(null)} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl">Close</button>
          </div>
          <CandidateRepositoryPage requirements={requirements} selectedReqId={inlineReqId} onOpenAddForm={() => {}} />
        </div>
      )}

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
