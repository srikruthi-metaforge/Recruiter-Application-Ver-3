import React, { useState, useMemo } from 'react'
import {
  Users,
  UserCheck,
  Building2,
  Search,
  Briefcase,
  Plus,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  User,
  CheckCircle2,
  Send,
  Award,
  Layers,
} from 'lucide-react'
import { Role } from '../../types'

export interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  avatar: string
  requirementsCount: number
  submissionsCount: number
  primaryClient: string
}

export interface TeamLeadGroup {
  id: string
  leadName: string
  leadRole: string
  leadEmail: string
  leadAvatar: string
  primaryClient: string
  teamName: string
  leadRequirementsCount: number
  leadSubmissionsCount: number
  membersCount: number
  members: TeamMember[]
}

const INITIAL_TEAMS_DATA: TeamLeadGroup[] = [
  {
    id: 'team-1',
    leadName: 'Harish Gadipally',
    leadRole: 'Senior Recruiting Lead / Team Lead',
    leadEmail: 'harish.g@metaforgeit.com',
    leadAvatar: 'H',
    primaryClient: 'Accenture',
    teamName: 'Accenture Hiring Team',
    leadRequirementsCount: 45,
    leadSubmissionsCount: 142,
    membersCount: 3,
    members: [
      {
        id: 'tm-1',
        name: 'Marcus Chen',
        role: 'Senior Technical Recruiter',
        email: 'm.chen@talentflow.io',
        avatar: 'M',
        requirementsCount: 14,
        submissionsCount: 48,
        primaryClient: 'Accenture',
      },
      {
        id: 'tm-2',
        name: 'Priya Sharma',
        role: 'IT Recruiter',
        email: 'p.sharma@talentflow.io',
        avatar: 'P',
        requirementsCount: 12,
        submissionsCount: 36,
        primaryClient: 'Accenture',
      },
      {
        id: 'tm-3',
        name: 'Suresh kulkarni',
        role: 'Recruiter',
        email: 'suresh.k@talentflow.io',
        avatar: 'S',
        requirementsCount: 8,
        submissionsCount: 24,
        primaryClient: 'Accenture',
      },
    ],
  },
  {
    id: 'team-2',
    leadName: 'Tom Walsh',
    leadRole: 'Lead Recruiter — Financial Services',
    leadEmail: 't.walsh@talentflow.io',
    leadAvatar: 'T',
    primaryClient: 'Goldman Sachs',
    teamName: 'Goldman Sachs Enterprise Team',
    leadRequirementsCount: 32,
    leadSubmissionsCount: 98,
    membersCount: 3,
    members: [
      {
        id: 'tm-4',
        name: 'lakshmi.v Recruiter',
        role: 'Lead Recruiter',
        email: 'lakshmi.v@talentflow.io',
        avatar: 'L',
        requirementsCount: 18,
        submissionsCount: 54,
        primaryClient: 'Goldman Sachs',
      },
      {
        id: 'tm-5',
        name: 'Lingoji Pavani',
        role: 'Senior Technical Recruiter',
        email: 'lingoji.p@talentflow.io',
        avatar: 'L',
        requirementsCount: 10,
        submissionsCount: 28,
        primaryClient: 'Goldman Sachs',
      },
      {
        id: 'tm-6',
        name: 'Arvind GR',
        role: 'Technical Sourcing Recruiter',
        email: 'arvind.g@talentflow.io',
        avatar: 'A',
        requirementsCount: 6,
        submissionsCount: 16,
        primaryClient: 'Goldman Sachs',
      },
    ],
  },
  {
    id: 'team-3',
    leadName: 'Nina Brooks',
    leadRole: 'Lead Recruiter — EV & Tech Sourcing',
    leadEmail: 'n.brooks@talentflow.io',
    leadAvatar: 'N',
    primaryClient: 'Tesla',
    teamName: 'Tesla Mobility & Automotive Team',
    leadRequirementsCount: 28,
    leadSubmissionsCount: 84,
    membersCount: 3,
    members: [
      {
        id: 'tm-7',
        name: 'rahimoon Shaik',
        role: 'Automotive Sourcing Specialist',
        email: 'rahimoon.s@talentflow.io',
        avatar: 'R',
        requirementsCount: 14,
        submissionsCount: 42,
        primaryClient: 'Tesla',
      },
      {
        id: 'tm-8',
        name: 'Adirala sathvika',
        role: 'Software Recruiter',
        email: 'adirala.s@talentflow.io',
        avatar: 'A',
        requirementsCount: 8,
        submissionsCount: 22,
        primaryClient: 'Tesla',
      },
      {
        id: 'tm-9',
        name: 'Charlie Darwin',
        role: 'Technical Sourcing Lead',
        email: 'charlie.d@talentflow.io',
        avatar: 'C',
        requirementsCount: 6,
        submissionsCount: 20,
        primaryClient: 'Tesla',
      },
    ],
  },
  {
    id: 'team-4',
    leadName: 'Ray Diaz',
    leadRole: 'Lead Recruiter — Enterprise Accounts',
    leadEmail: 'r.diaz@talentflow.io',
    leadAvatar: 'R',
    primaryClient: 'ITC Limited',
    teamName: 'ITC Infotech Delivery Team',
    leadRequirementsCount: 24,
    leadSubmissionsCount: 72,
    membersCount: 3,
    members: [
      {
        id: 'tm-10',
        name: 'Harini Sindey',
        role: 'Enterprise Recruiter',
        email: 'harini.s@talentflow.io',
        avatar: 'H',
        requirementsCount: 10,
        submissionsCount: 32,
        primaryClient: 'ITC Limited',
      },
      {
        id: 'tm-11',
        name: 'Viswanath Reddy',
        role: 'SAP Recruiter',
        email: 'viswanath.r@talentflow.io',
        avatar: 'V',
        requirementsCount: 8,
        submissionsCount: 24,
        primaryClient: 'ITC Limited',
      },
      {
        id: 'tm-12',
        name: 'Rachana Golkonda',
        role: 'IT Talent Specialist',
        email: 'rachana.g@talentflow.io',
        avatar: 'R',
        requirementsCount: 6,
        submissionsCount: 16,
        primaryClient: 'ITC Limited',
      },
    ],
  },
]

interface TeamsPageProps {
  role?: Role
}

export function TeamsPage({ role = 'superadmin' }: TeamsPageProps) {
  const [teamsData] = useState<TeamLeadGroup[]>(INITIAL_TEAMS_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [clientFilter, setClientFilter] = useState('All Clients')

  // Unique clients list
  const uniqueClients = useMemo(() => {
    const clients = new Set<string>()
    teamsData.forEach(t => clients.add(t.primaryClient))
    return Array.from(clients)
  }, [teamsData])

  // Total summary metrics
  const totalLeadsCount = teamsData.length
  const totalMembersCount = useMemo(() => {
    return teamsData.reduce((acc, t) => acc + t.membersCount, 0)
  }, [teamsData])

  const totalTeamSubmissions = useMemo(() => {
    return teamsData.reduce((acc, t) => {
      const memberSubs = t.members.reduce((mAcc, m) => mAcc + m.submissionsCount, 0)
      return acc + t.leadSubmissionsCount + memberSubs
    }, 0)
  }, [teamsData])

  // Filtered teams list
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
      {/* 1. TOP HEADER */}
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

      {/* 2. SUMMARY KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Team Leads */}
        <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-purple-900 uppercase tracking-wider">Total Team Leads</span>
            <ShieldCheck className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{totalLeadsCount} Leads</p>
          <span className="text-[10px] text-purple-700 font-bold">Harish, Tom, Nina, Ray</span>
        </div>

        {/* Total Team Members */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-blue-900 uppercase tracking-wider">Total Team Members</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{totalMembersCount} Recruiters</p>
          <span className="text-[10px] text-blue-700 font-bold">Assigned to primary clients</span>
        </div>

        {/* Average Team Size */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-wider">Avg Team Size</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">3 Members / Lead</p>
          <span className="text-[10px] text-emerald-700 font-bold">Strict 1 Team = 1 Client Rule</span>
        </div>

        {/* Total Sourcing Output */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 shadow-2xs border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-purple-300 uppercase tracking-wider">Total Sourced Submissions</span>
            <Send className="w-4 h-4 text-purple-300" />
          </div>
          <p className="text-3xl font-extrabold text-white tabular-nums">{totalTeamSubmissions}</p>
          <span className="text-[10px] text-slate-300 font-medium">Combined Lead + Recruiter Output</span>
        </div>
      </div>

      {/* 3. SEARCH & FILTERS BAR */}
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

      {/* 4. TEAMS LIST & MEMBER HIERARCHY CARDS */}
      <div className="space-y-6">
        {filteredTeams.map(team => (
          <div
            key={team.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all hover:border-purple-200 font-sans"
          >
            {/* Team Header Bar */}
            <div className="bg-slate-900 text-white p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-purple-600/30 text-purple-300 font-extrabold flex items-center justify-center text-lg border border-purple-500/40">
                  {team.leadAvatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-extrabold text-white">{team.teamName}</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Primary Client: {team.primaryClient}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    Team Lead: <strong className="text-white">{team.leadName}</strong> ({team.leadEmail})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs font-extrabold text-purple-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>Team Size: {team.membersCount} Recruiters</span>
                </div>
              </div>
            </div>

            {/* Team Lead Profile Summary & Team Members Breakdown */}
            <div className="p-6 space-y-6">
              {/* Team Lead Overview Box */}
              <div className="bg-purple-50/60 border border-purple-200/80 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-extrabold flex items-center justify-center text-sm border border-purple-700 shadow-2xs">
                    {team.leadAvatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-extrabold text-slate-900">{team.leadName}</h3>
                      <span className="px-2 py-0.5 rounded bg-purple-200 text-purple-900 text-[10px] font-extrabold border border-purple-300">
                        Team Lead
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{team.leadRole} • {team.leadEmail}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-purple-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Assigned Reqs</span>
                    <span className="text-sm font-extrabold text-blue-600 tabular-nums">{team.leadRequirementsCount} Reqs</span>
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-purple-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Lead Submissions</span>
                    <span className="text-sm font-extrabold text-purple-700 tabular-nums">{team.leadSubmissionsCount} Submissions</span>
                  </div>
                </div>
              </div>

              {/* Team Members List Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#6B3BF6]" />
                    <span>Recruiters In {team.leadName}'s Team ({team.membersCount} Members)</span>
                  </h4>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    All members dedicated to {team.primaryClient}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {team.members.map(member => (
                    <div
                      key={member.id}
                      className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-3 hover:bg-purple-50/40 hover:border-purple-200 transition-all shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#6B3BF6] font-extrabold flex items-center justify-center text-xs shrink-0 border border-purple-200">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900 text-xs">{member.name}</div>
                          <div className="text-[10px] text-slate-500 font-medium">{member.role}</div>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-200/60 space-y-1">
                        <div className="flex items-center justify-between">
                          <span>Primary Client:</span>
                          <span className="font-extrabold text-purple-900">{member.primaryClient}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Active Reqs:</span>
                          <span className="font-extrabold text-blue-600 tabular-nums">{member.requirementsCount} Reqs</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Total Submissions:</span>
                          <span className="font-extrabold text-purple-700 tabular-nums">{member.submissionsCount} Submissions</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
