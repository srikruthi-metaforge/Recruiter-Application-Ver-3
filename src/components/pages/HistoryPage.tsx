import React, { useState, useMemo } from 'react'
import { Role } from '../../types'
import { RECRUITERS_HISTORY_DATA, RecruiterHistoryItem } from './history/historyData'
import { HistoryMetricsHeader } from './history/HistoryMetricsHeader'
import { HistoryTable } from './history/HistoryTable'
import { HistoryDetailModal } from './history/HistoryDetailModal'

interface HistoryPageProps {
  userRole?: Role
  role?: Role
}

export function HistoryPage({ userRole, role = 'superadmin' }: HistoryPageProps) {
  const activeRole = userRole || role
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTeamLead, setSelectedTeamLead] = useState<string>('ALL')
  const [selectedClient, setSelectedClient] = useState<string>('ALL')
  const [selectedRecruiterDetail, setSelectedRecruiterDetail] = useState<RecruiterHistoryItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const [historyData, setHistoryData] = useState<RecruiterHistoryItem[]>(RECRUITERS_HISTORY_DATA)

  const teamLeads = useMemo(() => {
    const set = new Set<string>()
    set.add('ALL')
    historyData.forEach(item => set.add(item.teamLead))
    return Array.from(set)
  }, [historyData])

  const clients = useMemo(() => {
    const set = new Set<string>()
    set.add('ALL')
    historyData.forEach(item => item.clientAccounts.forEach(c => set.add(c)))
    return Array.from(set)
  }, [historyData])

  const filteredRecruiters = useMemo(() => {
    return historyData.filter(item => {
      const matchesSearch =
        !searchQuery.trim() ||
        item.recruiterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.recruiterEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.topSkillsSourced.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTeamLead = selectedTeamLead === 'ALL' || item.teamLead === selectedTeamLead
      const matchesClient = selectedClient === 'ALL' || item.clientAccounts.includes(selectedClient)

      return matchesSearch && matchesTeamLead && matchesClient
    })
  }, [historyData, searchQuery, selectedTeamLead, selectedClient])

  const totalPages = Math.ceil(filteredRecruiters.length / pageSize) || 1
  const paginatedRecruiters = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredRecruiters.slice(start, start + pageSize)
  }, [filteredRecruiters, currentPage, pageSize])

  const totalSourcedCount = useMemo(() => historyData.reduce((acc, curr) => acc + curr.sourcedProfilesCount, 0), [historyData])
  const totalSubmissionsCount = useMemo(() => historyData.reduce((acc, curr) => acc + curr.submittedProfilesCount, 0), [historyData])
  const totalWorkingCount = useMemo(() => historyData.reduce((acc, curr) => acc + curr.workingProfilesCount, 0), [historyData])

  const handleRefreshData = () => {
    setHistoryData([...RECRUITERS_HISTORY_DATA])
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800">
      <HistoryMetricsHeader
        totalRecruitersCount={historyData.length}
        totalSourcedCount={totalSourcedCount}
        totalSubmissionsCount={totalSubmissionsCount}
        totalWorkingCount={totalWorkingCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTeamLead={selectedTeamLead}
        setSelectedTeamLead={setSelectedTeamLead}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        teamLeads={teamLeads}
        clients={clients}
        handleRefreshData={handleRefreshData}
      />

      <HistoryTable
        paginatedRecruiters={paginatedRecruiters}
        filteredRecruitersLength={filteredRecruiters.length}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setSelectedRecruiterDetail={setSelectedRecruiterDetail}
      />

      {selectedRecruiterDetail && (
        <HistoryDetailModal
          selectedRecruiterDetail={selectedRecruiterDetail}
          onClose={() => setSelectedRecruiterDetail(null)}
        />
      )}
    </div>
  )
}
