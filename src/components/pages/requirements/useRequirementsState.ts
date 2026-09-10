import { useState, useMemo, useEffect } from 'react'
import { Requirement } from '../../../types'
import { CardFilterType } from '../../ui/RequirementCardsGrid'
import { DEFAULT_RECRUITER_LIST } from './requirementsData'

interface Params {
  role: string
  requirements: Requirement[]
  onUpdateRequirements?: (updated: Requirement[]) => void
}

export function useRequirementsState({ role, requirements, onUpdateRequirements }: Params) {
  const [localRequirements, setLocalRequirements] = useState<Requirement[]>(requirements)

  useEffect(() => { setLocalRequirements(requirements) }, [requirements])

  const [selectedReqForDetail, setSelectedReqForDetail] = useState<Requirement | null>(null)
  const [isCreatingDemand, setIsCreatingDemand] = useState(false)
  const [isEditingDemand, setIsEditingDemand] = useState(false)
  const [editingReq, setEditingReq] = useState<Requirement | null>(null)

  const [globalSearch, setGlobalSearch] = useState('')
  const [statusDropdown, setStatusDropdown] = useState<string>('All')
  const [clientDropdown, setClientDropdown] = useState<string>('All')
  const [activeCardFilter, setActiveCardFilter] = useState<CardFilterType>('ALL')
  const [selectedReqIds, setSelectedReqIds] = useState<Set<string>>(new Set())

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false)
  const [selectedReqForRevoke, setSelectedReqForRevoke] = useState<Requirement | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const [isAssignMyselfChecked, setIsAssignMyselfChecked] = useState(true)
  const [selectedRecruiterNames, setSelectedRecruiterNames] = useState<Set<string>>(new Set())
  const [recruiterSearchQuery, setRecruiterSearchQuery] = useState('')

  const currentUserName = useMemo(() => (role === 'superadmin' || role === 'admin') ? 'Harish Gadipally' : 'Sarah Kim', [role])
  const recruiterList = DEFAULT_RECRUITER_LIST

  const filteredRecruiterList = useMemo(() => {
    if (!recruiterSearchQuery.trim()) return recruiterList
    const q = recruiterSearchQuery.trim().toLowerCase()
    return recruiterList.filter(r => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q))
  }, [recruiterList, recruiterSearchQuery])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleSelfAssign = () => {
    if (selectedReqIds.size === 0) return
    const updated = localRequirements.map(r => selectedReqIds.has(r.id) ? { ...r, owner: currentUserName, assignmentStatus: 'Assigned' as const } : r)
    setLocalRequirements(updated)
    onUpdateRequirements?.(updated)
    showToast(`Successfully assigned ${selectedReqIds.size} requirement(s) to ${currentUserName}`)
    setSelectedReqIds(new Set())
  }

  const handleConfirmModalAssignment = () => {
    const assignees: string[] = []
    if (isAssignMyselfChecked) assignees.push(currentUserName)
    selectedRecruiterNames.forEach(name => assignees.push(name))
    if (assignees.length === 0) return

    const assigneesText = assignees.join(', ')
    const updated = localRequirements.map(r => selectedReqIds.has(r.id) ? { ...r, owner: assigneesText, assignmentStatus: 'Assigned' as const, submissions: r.submissions || 7 } : r)
    setLocalRequirements(updated)
    onUpdateRequirements?.(updated)
    setIsAssignModalOpen(false)
    setSelectedRecruiterNames(new Set())
    showToast(`Assigned ${selectedReqIds.size} requirement(s) to ${assigneesText}`)
    setSelectedReqIds(new Set())
  }

  const availableClients = useMemo(() => {
    const set = new Set<string>()
    localRequirements.forEach(r => { if (r.client) set.add(r.client) })
    return Array.from(set).sort()
  }, [localRequirements])

  const filteredRequirementsList = useMemo(() => {
    return localRequirements.filter(req => {
      if (globalSearch.trim()) {
        const q = globalSearch.toLowerCase()
        if (!req.title.toLowerCase().includes(q) && !req.id.toLowerCase().includes(q) && !req.client?.toLowerCase().includes(q)) return false
      }
      if (statusDropdown !== 'All' && req.status !== statusDropdown) return false
      if (clientDropdown !== 'All' && req.client !== clientDropdown) return false
      return true
    })
  }, [localRequirements, globalSearch, statusDropdown, clientDropdown])

  const totalPages = Math.ceil(filteredRequirementsList.length / pageSize) || 1
  const paginatedReqs = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredRequirementsList.slice(start, start + pageSize)
  }, [filteredRequirementsList, currentPage, pageSize])

  return {
    localRequirements,
    setLocalRequirements,
    selectedReqForDetail,
    setSelectedReqForDetail,
    isCreatingDemand,
    setIsCreatingDemand,
    isEditingDemand,
    setIsEditingDemand,
    editingReq,
    setEditingReq,
    globalSearch,
    setGlobalSearch,
    statusDropdown,
    setStatusDropdown,
    clientDropdown,
    setClientDropdown,
    activeCardFilter,
    setActiveCardFilter,
    selectedReqIds,
    setSelectedReqIds,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    isAssignModalOpen,
    setIsAssignModalOpen,
    isRevokeModalOpen,
    setIsRevokeModalOpen,
    selectedReqForRevoke,
    setSelectedReqForRevoke,
    toastMessage,
    isAssignMyselfChecked,
    setIsAssignMyselfChecked,
    selectedRecruiterNames,
    setSelectedRecruiterNames,
    recruiterSearchQuery,
    setRecruiterSearchQuery,
    currentUserName,
    filteredRecruiterList,
    showToast,
    handleSelfAssign,
    handleConfirmModalAssignment,
    availableClients,
    filteredRequirementsList,
    totalPages,
    paginatedReqs,
  }
}
