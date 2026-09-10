import { useState, useMemo } from 'react'
import {
  ClientRequirementItem,
  STANDARDIZED_DOMAINS_LIST,
  getClientGapAnalysisDataset,
} from './gapAnalysisData'

export function useGapAnalysisFilters(clientName: string, pocName: string, initialDateRange: string) {
  const [dateRange, setDateRange] = useState(initialDateRange || 'All Time')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDomainFilter, setSelectedDomainFilter] = useState('All Domains')
  const [selectedSpocFilter, setSelectedSpocFilter] = useState('All SPOCs')
  const [selectedReqStatus, setSelectedReqStatus] = useState('All Statuses')
  const [selectedSubStatus, setSelectedSubStatus] = useState('All')
  const [selectedInterviewStatus, setSelectedInterviewStatus] = useState('All')
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [selectedDetailReq, setSelectedDetailReq] = useState<ClientRequirementItem | null>(null)

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    kpi: true,
    domainCharts: true,
    reqGaps: true,
  })

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const expandAll = () => {
    setOpenSections({ kpi: true, domainCharts: true, reqGaps: true })
    showToast('Expanded all sections.')
  }

  const collapseAll = () => {
    setOpenSections({ kpi: false, domainCharts: false, reqGaps: false })
    showToast('Collapsed all sections.')
  }

  const rawClientRequirements = useMemo(() => {
    return getClientGapAnalysisDataset(clientName, pocName)
  }, [clientName, pocName])

  const filteredRequirements = useMemo(() => {
    return rawClientRequirements.filter(req => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        if (!req.title.toLowerCase().includes(q) && !req.id.toLowerCase().includes(q) && !req.spoc.toLowerCase().includes(q)) return false
      }
      if (dateRange !== 'All Time' && dateRange !== 'All') {
        if (dateRange === 'This Week' && req.createdDate < '2026-08-22') return false
        if (dateRange === 'This Month' && !req.createdDate.includes('2026-08')) return false
        if (dateRange === 'This Year' && !req.createdDate.includes('2026')) return false
      }
      if (selectedDomainFilter !== 'All Domains' && req.domain !== selectedDomainFilter) return false
      if (selectedSpocFilter !== 'All SPOCs' && req.spoc !== selectedSpocFilter) return false
      if (selectedReqStatus !== 'All Statuses' && req.status !== selectedReqStatus) return false
      if (selectedSubStatus === 'Zero Submissions' && req.submissions > 0) return false
      if (selectedSubStatus === 'Has Submissions' && req.submissions === 0) return false
      return true
    })
  }, [
    rawClientRequirements,
    searchQuery,
    dateRange,
    selectedDomainFilter,
    selectedSpocFilter,
    selectedReqStatus,
    selectedSubStatus,
  ])

  const [gapCurrentPage, setGapCurrentPage] = useState(1)
  const [gapPageSize, setGapPageSize] = useState(10)
  const gapTotalPages = Math.ceil(filteredRequirements.length / gapPageSize) || 1

  const paginatedRequirements = useMemo(() => {
    const start = (gapCurrentPage - 1) * gapPageSize
    return filteredRequirements.slice(start, start + gapPageSize)
  }, [filteredRequirements, gapCurrentPage, gapPageSize])

  const metrics = useMemo(() => {
    const totalReqs = filteredRequirements.length
    let totalPositions = 0
    let totalSubmissions = 0
    let zeroSubReqs = 0

    filteredRequirements.forEach(req => {
      if (typeof req.positions === 'number') totalPositions += req.positions
      totalSubmissions += req.submissions
      if (req.submissions === 0) zeroSubReqs++
    })

    const coveragePct = totalPositions > 0 ? Math.round((totalSubmissions / totalPositions) * 100) : 0
    let healthStatus: 'Healthy' | 'Needs Attention' | 'Critical' = 'Healthy'
    if (coveragePct < 25 || zeroSubReqs > totalReqs * 0.35) healthStatus = 'Critical'
    else if (coveragePct < 45 || zeroSubReqs > totalReqs * 0.18) healthStatus = 'Needs Attention'

    return {
      totalReqs,
      totalPositions,
      totalSubmissions,
      coveragePct,
      zeroSubReqs,
      missingDomainReqs: 0,
      nonNumericPositions: 0,
      healthStatus,
    }
  }, [filteredRequirements])

  const domainChartData = useMemo(() => {
    const map: Record<string, { positions: number; submissions: number; zeroSubReqs: number }> = {}
    STANDARDIZED_DOMAINS_LIST.forEach(d => { map[d] = { positions: 0, submissions: 0, zeroSubReqs: 0 } })
    filteredRequirements.forEach(req => {
      const d = STANDARDIZED_DOMAINS_LIST.includes(req.domain) ? req.domain : 'Other / Needs Validation'
      if (typeof req.positions === 'number') map[d].positions += req.positions
      map[d].submissions += req.submissions
      if (req.submissions === 0) map[d].zeroSubReqs += 1
    })
    return STANDARDIZED_DOMAINS_LIST.map(d => ({
      domainShort: d.length > 18 ? d.substring(0, 16) + '...' : d,
      positions: map[d].positions,
      submissions: map[d].submissions,
      zeroSubReqs: map[d].zeroSubReqs,
    }))
  }, [filteredRequirements])

  const uniqueSpocList = useMemo(() => {
    return Array.from(new Set(rawClientRequirements.map(r => r.spoc)))
  }, [rawClientRequirements])

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedDomainFilter('All Domains')
    setSelectedSpocFilter('All SPOCs')
    setSelectedReqStatus('All Statuses')
    setSelectedSubStatus('All')
    setSelectedInterviewStatus('All')
    showToast('Filters reset to default.')
  }

  return {
    dateRange,
    setDateRange,
    searchQuery,
    setSearchQuery,
    selectedDomainFilter,
    setSelectedDomainFilter,
    selectedSpocFilter,
    setSelectedSpocFilter,
    selectedReqStatus,
    setSelectedReqStatus,
    selectedSubStatus,
    setSelectedSubStatus,
    selectedInterviewStatus,
    setSelectedInterviewStatus,
    toastMsg,
    showToast,
    selectedDetailReq,
    setSelectedDetailReq,
    openSections,
    toggleSection,
    expandAll,
    collapseAll,
    filteredRequirements,
    gapCurrentPage,
    setGapCurrentPage,
    gapPageSize,
    setGapPageSize,
    gapTotalPages,
    paginatedRequirements,
    metrics,
    domainChartData,
    uniqueSpocList,
    resetFilters,
  }
}
