import React, { useState, useMemo } from 'react'
import { Users, Search, ShieldCheck, UserCheck, Send } from 'lucide-react'
import { Role } from '../../types'
import { INITIAL_TEAMS_DATA, TeamLeadGroup } from './teams/teamsData'
import { TeamGroupCard } from './teams/TeamGroupCard'

interface TeamsPageProps {
  role?: Role
}

export function TeamsPage({ role = 'superadmin' }: TeamsPageProps) {
  const [teamsData] = useState<TeamLeadGroup[]>(INITIAL_TEAMS_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [clientFilter, setClientFilter] = useState('All Clients')

  const uniqueClients = useMemo(() => {
    const clients = new Set<string>()
    teamsData.forEach(t => clients.add(t.primaryClient))
    return Array.from(clients)
  }, [teamsData])

  const totalLeadsCount = teamsData.length
  const totalMembersCount = useMemo(() => teamsData.reduce((acc, t) => acc + t.membersCount, 0), [teamsData])
  const totalTeamSubmissions = useMemo(() => {
    return teamsData.reduce((acc, t) => {
      const memberSubs = t.members.reduce((mAcc, m) => mAcc + m.submissionsCount, 0)
      return acc + t.leadSubmissionsCount + memberSubs
    }, 0)
  }, [teamsData])

  const filteredTeams = useMemo(() => {
    return teamsData.filter(team => {
      if (clientFilter !== 'All Clients' && team.primaryClient !== clientFilter) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchLead = team.leadName.toLowerCase().includes(q)
        const matchTeam = team.teamName.toLowerCase().includes(q)
        const matchClient = team.primaryClient.toLowerCase().includes(q)
        const matchMember = team.members.some(m => m.name.toLowerCase().includes(q))
        if (!matchLead && !matchTeam && !matchClient && !matchMember) return false
      }
      return true
    })
  }, [teamsData, clientFilter, searchQuery])

  return (
    <div className="space-y-6 w-full pb-20 font-sans text-slate-800 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Hiring Teams & Team Leads</h1>
            <span className="px-3 py-1 bg-purple-50 text-[#6B3BF6] text-xs font-extrabold rounded-full border border-purple-200 flex items-center gap-1.5 shadow-2xs">
              <Users className="w-3.5 h-3.5 text-[#6B3BF6]" />
              <span>Team Lead & Member Hierarchy</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Overview of Team Leads, assigned client accounts, member recruiter counts, and individual recruiter names
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-purple-900 uppercase tracking-wider">Total Team Leads</span>
            <ShieldCheck className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{totalLeadsCount} Leads</p>
          <span className="text-[10px] text-purple-700 font-bold">Harish, Tom, Nina, Ray</span>
        </div>

        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-blue-900 uppercase tracking-wider">Total Team Members</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{totalMembersCount} Recruiters</p>
          <span className="text-[10px] text-blue-700 font-bold">Assigned to primary clients</span>
        </div>

        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-wider">Avg Team Size</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">3 Members / Lead</p>
          <span className="text-[10px] text-emerald-700 font-bold">Strict 1 Team = 1 Client Rule</span>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 shadow-2xs border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-purple-300 uppercase tracking-wider">Total Sourced Submissions</span>
            <Send className="w-4 h-4 text-purple-300" />
          </div>
          <p className="text-3xl font-extrabold text-white tabular-nums">{totalTeamSubmissions}</p>
          <span className="text-[10px] text-slate-300 font-medium">Combined Lead + Recruiter Output</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Team Lead name, member recruiter, or client..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 font-medium"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={clientFilter}
            onChange={e => setClientFilter(e.target.value)}
            className="px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
          >
            <option value="All Clients">All Client Teams</option>
            {uniqueClients.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {filteredTeams.map(team => (
          <TeamGroupCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  )
}
