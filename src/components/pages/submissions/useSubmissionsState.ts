import { useState, useMemo } from 'react'
import { Requirement, Role } from '../../../types'
import { DEFAULT_SCREENSHOT_SUBMISSIONS, ScreenshotSubmission } from './submissionsData'

interface Params {
  role: Role
  requirements: Requirement[]
  onOpenSubmitCandidate?: (reqId?: string) => void
}

export function useSubmissionsState({ role, requirements, onOpenSubmitCandidate }: Params) {
  const isLeadUser = role === 'lead' || role === 'superadmin' || role === 'admin'
  const [scopeTab, setScopeTab] = useState<'my_only' | 'team_members'>('my_only')
  const [selectedSub, setSelectedSub] = useState<ScreenshotSubmission | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [clientFilter, setClientFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('All')
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const [selectedReqForDetail, setSelectedReqForDetail] = useState<Requirement | null>(null)
  const [reasons, setReasons] = useState<Record<string, string>>({})
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [targetSubForInterview, setTargetSubForInterview] = useState<ScreenshotSubmission | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  const handleOpenReqOverview = (reqId: string, reqName?: string, reqClient?: string) => {
    const found = requirements.find(r => r.id === reqId) || {
      id: reqId,
      client: reqClient || 'ITC Limited',
      title: reqName || 'Senior Software Engineer',
      priority: 'Medium' as const,
      status: 'Active' as const,
      assignmentStatus: 'Assigned' as const,
      owner: 'Harish Gadipally',
      submissions: 14,
      interviews: 2,
      placed: 1,
      rejections: 0,
      clientEmail: `${(reqClient || 'client').toLowerCase().replace(/\s+/g, '')}@partner.com`,
      clientPhone: '+91 98765 43210',
      location: 'Hybrid, Bangalore',
      openings: 2,
      dueDate: '2026-08-30',
      emailArrivedTime: 'Aug 12, 2026, 09:30 AM',
      budget: '₹1,800,000',
    }
    setSelectedReqForDetail(found)
  }

  const scopeSubmissions = useMemo(() => {
    if (!isLeadUser) return DEFAULT_SCREENSHOT_SUBMISSIONS
    if (scopeTab === 'my_only') {
      return DEFAULT_SCREENSHOT_SUBMISSIONS.filter(s => s.submittedBy.toLowerCase().includes('harish'))
    }
    return DEFAULT_SCREENSHOT_SUBMISSIONS.filter(s => !s.submittedBy.toLowerCase().includes('harish'))
  }, [isLeadUser, scopeTab])

  const clientOptions = useMemo(() => {
    const set = new Set<string>()
    scopeSubmissions.forEach(s => {
      if (s.clientName) set.add(s.clientName)
    })
    return Array.from(set)
  }, [scopeSubmissions])

  const clientCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    scopeSubmissions.forEach(s => {
      const name = s.clientName || 'Other'
      counts[name] = (counts[name] || 0) + 1
    })
    return counts
  }, [scopeSubmissions])

  const filteredData = useMemo(() => {
    return scopeSubmissions.filter(sub => {
      if (clientFilter !== 'All' && sub.clientName !== clientFilter) return false
      if (statusFilter !== 'All') {
        const statusMap: Record<string, string> = {
          'Submitted to Lead': 'submitted',
          'Interview Scheduled': 'interview',
          Selected: 'selected',
          Placed: 'placed',
          Rejected: 'rejected',
        }
        const target = statusMap[statusFilter] || statusFilter.toLowerCase()
        if (!sub.status.toLowerCase().includes(target)) return false
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchesName = sub.candidateName.toLowerCase().includes(q)
        const matchesReq = sub.requirement.toLowerCase().includes(q)
        const matchesClient = (sub.clientName || '').toLowerCase().includes(q)
        const matchesBy = sub.submittedBy.toLowerCase().includes(q)
        if (!matchesName && !matchesReq && !matchesClient && !matchesBy) return false
      }
      return true
    })
  }, [scopeSubmissions, clientFilter, statusFilter, searchQuery])

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1
  const paginatedSubmissions = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, currentPage, pageSize])

  const submittedToClientCount = useMemo(() => scopeSubmissions.filter(s => s.status.includes('Submitted')).length, [scopeSubmissions])
  const interviewsCount = useMemo(() => scopeSubmissions.filter(s => s.status.includes('Interview')).length, [scopeSubmissions])
  const rejectedCount = useMemo(() => scopeSubmissions.filter(s => s.status.includes('Rejected')).length, [scopeSubmissions])

  return {
    isLeadUser,
    scopeTab,
    setScopeTab,
    selectedSub,
    setSelectedSub,
    searchQuery,
    setSearchQuery,
    clientFilter,
    setClientFilter,
    dateFilter,
    setDateFilter,
    customStartDate,
    setCustomStartDate,
    customEndDate,
    setCustomEndDate,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    pageSize,
    selectedReqForDetail,
    setSelectedReqForDetail,
    reasons,
    setReasons,
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    targetSubForInterview,
    setTargetSubForInterview,
    toastMsg,
    showToast,
    handleOpenReqOverview,
    scopeSubmissions,
    clientOptions,
    clientCounts,
    filteredData,
    totalPages,
    paginatedSubmissions,
    submittedToClientCount,
    interviewsCount,
    rejectedCount,
  }
}
