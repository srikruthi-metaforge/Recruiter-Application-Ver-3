import React, { useState, useMemo } from 'react'
import { Candidate, Requirement, Role } from '../../types'
import { SubmitToLeadPage } from './SubmitToLeadPage'
import { INITIAL_REQUIREMENTS } from '../../data/mockData'
import {
  CandidateRepoItem,
  INITIAL_CANDIDATE_DATA,
} from './candidateRepo/candidateRepoData'
import { CandidateRepoHeader } from './candidateRepo/CandidateRepoHeader'
import { CandidateRepoTable } from './candidateRepo/CandidateRepoTable'
import { CandidateDetailModal } from './candidateRepo/CandidateDetailModal'

interface CandidateRepositoryPageProps {
  candidates?: Candidate[]
  requirements?: Requirement[]
  selectedReqId?: string | null
  role?: Role
  onOpenAddForm: () => void
  onSelectCandidate?: (candidate: Candidate) => void
  onSelectRequirement?: (reqId: string | null) => void
  onBackToDashboard?: () => void
}

export function CandidateRepositoryPage({
  requirements = INITIAL_REQUIREMENTS,
  selectedReqId = null,
  role = 'recruiter',
  onOpenAddForm,
  onBackToDashboard,
}: CandidateRepositoryPageProps) {
  const [repoList, setRepoList] = useState<CandidateRepoItem[]>(INITIAL_CANDIDATE_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [totalExpFilter, setTotalExpFilter] = useState('All experience')
  const [unmaskedContactIds, setUnmaskedContactIds] = useState<Set<string>>(new Set())
  const [activeReqId, setActiveReqId] = useState<string | null>(selectedReqId || null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [inspectCandidate, setInspectCandidate] = useState<CandidateRepoItem | null>(null)
  const [showSubmitToLeadPage, setShowSubmitToLeadPage] = useState(false)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const activeRequirement = useMemo(() => {
    if (!activeReqId) return null
    return (
      requirements.find(r => r.id === activeReqId) ||
      ({
        id: activeReqId,
        title: 'Requirement ' + activeReqId,
        client: 'Metaforge Client',
        priority: 'High',
        status: 'Active',
      } as Requirement)
    )
  }, [requirements, activeReqId])

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const toggleUnmaskContact = (id: string) => {
    const next = new Set(unmaskedContactIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setUnmaskedContactIds(next)
  }

  const toggleSelectCandidate = (id: string, e?: React.SyntheticEvent) => {
    e?.stopPropagation()
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredList.length) setSelectedIds(new Set())
    else setSelectedIds(new Set(filteredList.map(item => item.id)))
  }

  const filteredList = useMemo(() => {
    return repoList.filter(item => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        if (!item.name.toLowerCase().includes(q) && !item.technology.toLowerCase().includes(q) && !item.candidateId.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [repoList, searchQuery])

  const selectedCandidates = useMemo(() => {
    return repoList.filter(item => selectedIds.has(item.id))
  }, [repoList, selectedIds])

  if (showSubmitToLeadPage) {
    return (
      <SubmitToLeadPage
        selectedCandidates={selectedCandidates}
        requirement={activeRequirement}
        role={role}
        onBack={() => setShowSubmitToLeadPage(false)}
        onSubmitSuccess={() => {
          setShowSubmitToLeadPage(false)
          setSelectedIds(new Set())
          showToast('Candidate(s) submitted successfully!')
        }}
      />
    )
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-150">
      <CandidateRepoHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalExpFilter={totalExpFilter}
        setTotalExpFilter={setTotalExpFilter}
        activeRequirement={activeRequirement}
        selectedCount={selectedIds.size}
        onOpenAddForm={onOpenAddForm}
        onSubmitToLead={() => setShowSubmitToLeadPage(true)}
        onBackToDashboard={onBackToDashboard}
        onClearRequirement={() => setActiveReqId(null)}
      />

      <CandidateRepoTable
        candidates={filteredList}
        unmaskedContactIds={unmaskedContactIds}
        toggleUnmaskContact={toggleUnmaskContact}
        selectedIds={selectedIds}
        toggleSelectCandidate={toggleSelectCandidate}
        toggleSelectAll={toggleSelectAll}
        hasActiveReq={!!activeRequirement}
        onInspectCandidate={setInspectCandidate}
        onEditCandidate={c => showToast(`Editing candidate ${c.name}...`)}
        onSubmitSingle={c => {
          setSelectedIds(new Set([c.id]))
          setShowSubmitToLeadPage(true)
        }}
      />

      <CandidateDetailModal
        candidate={inspectCandidate}
        unmaskedContactIds={unmaskedContactIds}
        toggleUnmaskContact={toggleUnmaskContact}
        onClose={() => setInspectCandidate(null)}
      />

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
