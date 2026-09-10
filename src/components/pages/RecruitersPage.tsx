import React, { useState, useMemo } from 'react'
import { Role } from '../../types'
import { INITIAL_RECRUITERS_DATA, RecruiterOverviewItem } from './recruiters/recruitersData'
import { RecruitersHeader } from './recruiters/RecruitersHeader'
import { RecruitersTable } from './recruiters/RecruitersTable'
import { AddRecruiterModal } from './recruiters/AddRecruiterModal'
import { AdjustClientModal } from './recruiters/AdjustClientModal'

interface RecruitersPageProps {
  userRole?: Role
}

export function RecruitersPage({ userRole = 'superadmin' }: RecruitersPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTeamLead, setSelectedTeamLead] = useState<string>('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const [recruitersList, setRecruitersList] = useState<RecruiterOverviewItem[]>(INITIAL_RECRUITERS_DATA)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [adjustClientRecruiter, setAdjustClientRecruiter] = useState<RecruiterOverviewItem | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  const teamLeads = useMemo(() => {
    const set = new Set<string>()
    set.add('ALL')
    recruitersList.forEach(r => set.add(r.teamLead))
    return Array.from(set)
  }, [recruitersList])

  const filteredRecruiters = useMemo(() => {
    return recruitersList.filter(recruiter => {
      const matchesSearch =
        !searchQuery.trim() ||
        recruiter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recruiter.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recruiter.clientNames.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTeamLead = selectedTeamLead === 'ALL' || recruiter.teamLead === selectedTeamLead
      return matchesSearch && matchesTeamLead
    })
  }, [recruitersList, searchQuery, selectedTeamLead])

  const totalPages = Math.ceil(filteredRecruiters.length / pageSize) || 1
  const paginatedRecruiters = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredRecruiters.slice(start, start + pageSize)
  }, [filteredRecruiters, currentPage, pageSize])

  const topPerformersCount = useMemo(() => recruitersList.filter(r => r.performanceStatus === 'Top Performer').length, [recruitersList])
  const avgTatDays = useMemo(() => {
    if (recruitersList.length === 0) return '0.0'
    const sum = recruitersList.reduce((acc, curr) => acc + curr.tatDays, 0)
    return (sum / recruitersList.length).toFixed(1)
  }, [recruitersList])

  const handleCreateRecruiter = (rec: any) => {
    const created: RecruiterOverviewItem = {
      id: `rec-${Date.now()}`,
      name: rec.name,
      email: rec.email,
      avatar: rec.name.charAt(0).toUpperCase(),
      role: rec.role,
      teamLead: rec.teamLead,
      clientNames: rec.clientNames,
      totalRequirements: 0,
      totalSubmissions: 0,
      tatDays: rec.tatDays,
      totalInterviews: 0,
      performanceStatus: 'On Track',
    }
    setRecruitersList([created, ...recruitersList])
    setIsAddModalOpen(false)
    showToast(`Successfully onboarded new recruiter "${rec.name}"!`)
  }

  const handleSaveAdjustClient = (recruiterId: string, newClient: string) => {
    setRecruitersList(prev =>
      prev.map(r => (r.id === recruiterId ? { ...r, clientNames: [newClient] } : r))
    )
    const found = recruitersList.find(r => r.id === recruiterId)
    showToast(`Adjusted assigned client for ${found?.name || 'recruiter'} to "${newClient}"!`)
    setAdjustClientRecruiter(null)
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800">
      <RecruitersHeader
        totalRecruitersCount={recruitersList.length}
        topPerformersCount={topPerformersCount}
        avgTatDays={avgTatDays}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTeamLead={selectedTeamLead}
        setSelectedTeamLead={setSelectedTeamLead}
        teamLeads={teamLeads}
        setIsAddModalOpen={setIsAddModalOpen}
      />

      <RecruitersTable
        paginatedRecruiters={paginatedRecruiters}
        filteredRecruitersLength={filteredRecruiters.length}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setAdjustClientRecruiter={setAdjustClientRecruiter}
        userRole={userRole}
      />

      <AddRecruiterModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreate={handleCreateRecruiter}
      />

      <AdjustClientModal
        adjustClientRecruiter={adjustClientRecruiter}
        onClose={() => setAdjustClientRecruiter(null)}
        onSave={handleSaveAdjustClient}
      />

      {toastMsg && (
        <div className="fixed bottom-12 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
