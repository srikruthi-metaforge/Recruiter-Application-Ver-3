import React, { useState, useMemo } from 'react'
import { Role } from '../../types'
import { INITIAL_MEMBERS_DATA, UnifiedTeamMember } from './teamsRecruiters/teamsRecruitersData'
import { TeamsRecruitersHeader } from './teamsRecruiters/TeamsRecruitersHeader'
import { TeamsRecruitersTable } from './teamsRecruiters/TeamsRecruitersTable'
import { AddTeamMemberModal } from './teamsRecruiters/AddTeamMemberModal'

interface TeamsRecruitersPageProps {
  userRole?: Role
  role?: Role
}

export function TeamsRecruitersPage({ userRole, role = 'superadmin' }: TeamsRecruitersPageProps) {
  const activeRole = userRole || role
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLeadFilter, setSelectedLeadFilter] = useState<string>('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const [membersList, setMembersList] = useState<UnifiedTeamMember[]>(INITIAL_MEMBERS_DATA)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  const teamLeads = useMemo(() => {
    const set = new Set<string>()
    set.add('ALL')
    membersList.forEach(m => {
      if (m.isTeamLead) set.add(m.name)
    })
    return Array.from(set)
  }, [membersList])

  const filteredMembers = useMemo(() => {
    return membersList.filter(member => {
      const matchesSearch =
        !searchQuery.trim() ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.clientNames.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesLead = selectedLeadFilter === 'ALL' || member.teamLead.includes(selectedLeadFilter) || member.name === selectedLeadFilter
      return matchesSearch && matchesLead
    })
  }, [membersList, searchQuery, selectedLeadFilter])

  const totalPages = Math.ceil(filteredMembers.length / pageSize) || 1
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredMembers.slice(start, start + pageSize)
  }, [filteredMembers, currentPage, pageSize])

  const totalLeadsCount = useMemo(() => membersList.filter(m => m.isTeamLead).length, [membersList])
  const totalRecruitersCount = useMemo(() => membersList.filter(m => !m.isTeamLead).length, [membersList])

  const handleCreateMember = (mem: any) => {
    const created: UnifiedTeamMember = {
      id: `rec-${Date.now()}`,
      name: mem.name,
      email: mem.email,
      avatar: mem.name.charAt(0).toUpperCase(),
      role: mem.role,
      isTeamLead: mem.isTeamLead,
      teamLead: mem.teamLead,
      clientNames: mem.clientNames,
      totalRequirements: 0,
      totalSubmissions: 0,
      tatDays: 2.0,
      totalInterviews: 0,
      performanceStatus: 'On Track',
      membersCount: mem.isTeamLead ? 0 : undefined,
    }
    setMembersList([created, ...membersList])
    setIsAddModalOpen(false)
    showToast(`Successfully onboarded "${mem.name}"!`)
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800">
      <TeamsRecruitersHeader
        totalMembersCount={membersList.length}
        totalLeadsCount={totalLeadsCount}
        totalRecruitersCount={totalRecruitersCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLeadFilter={selectedLeadFilter}
        setSelectedLeadFilter={setSelectedLeadFilter}
        teamLeads={teamLeads}
        setIsAddModalOpen={setIsAddModalOpen}
      />

      <TeamsRecruitersTable
        paginatedMembers={paginatedMembers}
        filteredMembersLength={filteredMembers.length}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        userRole={activeRole}
      />

      <AddTeamMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreate={handleCreateMember}
      />

      {toastMsg && (
        <div className="fixed bottom-12 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
