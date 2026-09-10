import React, { useState, useMemo } from 'react'
import {
  Users,
  Search,
  Send,
  ShieldCheck,
  CheckCircle2,
  UserPlus,
  X,
  User,
  Building2,
  ChevronRight,
  Filter,
  Clock,
  Lock,
} from 'lucide-react'
import { Role } from '../../types'
import { PaginationFooter } from '../ui/PaginationFooter'
import { DEMO_ACCOUNTS } from '../../data/mockData'
import { getRecruiterScreenTime, formatDuration, formatDurationShort, canViewScreenTime } from '../../utils/screenTimeTracker'

export interface UnifiedTeamMember {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  isTeamLead: boolean
  teamLead: string
  clientNames: string[]
  totalRequirements: number
  totalSubmissions: number
  tatDays: number
  totalInterviews: number
  performanceStatus: 'Top Performer' | 'On Track' | 'Needs Attention'
  membersCount?: number
  teamMembers?: string[]
}

const INITIAL_MEMBERS_DATA: UnifiedTeamMember[] = [
  {
    id: 'rec-1',
    name: 'Harish Gadipally',
    email: 'harish.g@metaforgeit.com',
    avatar: 'H',
    role: 'Senior Recruiting Lead / Team Lead',
    isTeamLead: true,
    teamLead: 'Harish Gadipally (Self)',
    clientNames: ['Accenture', 'LTTS'],
    totalRequirements: 45,
    totalSubmissions: 142,
    tatDays: 1.5,
    totalInterviews: 38,
    performanceStatus: 'Top Performer',
    membersCount: 3,
    teamMembers: ['Marcus Chen', 'Priya Sharma', 'Suresh kulkarni'],
  },
  {
    id: 'rec-2',
    name: 'Marcus Chen',
    email: 'm.chen@talentflow.io',
    avatar: 'M',
    role: 'Senior Technical Recruiter',
    isTeamLead: false,
    teamLead: 'Harish Gadipally',
    clientNames: ['Accenture'],
    totalRequirements: 14,
    totalSubmissions: 48,
    tatDays: 1.8,
    totalInterviews: 12,
    performanceStatus: 'Top Performer',
  },
  {
    id: 'rec-3',
    name: 'Priya Sharma',
    email: 'p.sharma@talentflow.io',
    avatar: 'P',
    role: 'IT Recruiter',
    isTeamLead: false,
    teamLead: 'Harish Gadipally',
    clientNames: ['Accenture'],
    totalRequirements: 12,
    totalSubmissions: 36,
    tatDays: 2.1,
    totalInterviews: 9,
    performanceStatus: 'On Track',
  },
  {
    id: 'rec-4',
    name: 'Suresh kulkarni',
    email: 'suresh.k@talentflow.io',
    avatar: 'S',
    role: 'Technical Recruiter',
    isTeamLead: false,
    teamLead: 'Harish Gadipally',
    clientNames: ['Accenture'],
    totalRequirements: 8,
    totalSubmissions: 24,
    tatDays: 2.4,
    totalInterviews: 6,
    performanceStatus: 'On Track',
  },
  {
    id: 'rec-lead-2',
    name: 'Tom Walsh',
    email: 't.walsh@talentflow.io',
    avatar: 'T',
    role: 'Lead Recruiter — Financial Services',
    isTeamLead: true,
    teamLead: 'Tom Walsh (Self)',
    clientNames: ['Goldman Sachs'],
    totalRequirements: 32,
    totalSubmissions: 98,
    tatDays: 1.9,
    totalInterviews: 25,
    performanceStatus: 'Top Performer',
    membersCount: 3,
    teamMembers: ['lakshmi.v Recruiter', 'Lingoji Pavani', 'Arvind GR'],
  },
  {
    id: 'rec-5',
    name: 'lakshmi.v Recruiter',
    email: 'lakshmi.v@talentflow.io',
    avatar: 'L',
    role: 'Lead Recruiter',
    isTeamLead: false,
    teamLead: 'Tom Walsh',
    clientNames: ['Goldman Sachs'],
    totalRequirements: 18,
    totalSubmissions: 54,
    tatDays: 1.9,
    totalInterviews: 14,
    performanceStatus: 'Top Performer',
  },
  {
    id: 'rec-6',
    name: 'Lingoji Pavani',
    email: 'lingoji.p@talentflow.io',
    avatar: 'L',
    role: 'Senior Technical Recruiter',
    isTeamLead: false,
    teamLead: 'Tom Walsh',
    clientNames: ['Goldman Sachs'],
    totalRequirements: 10,
    totalSubmissions: 28,
    tatDays: 2.3,
    totalInterviews: 7,
    performanceStatus: 'On Track',
  },
  {
    id: 'rec-7',
    name: 'Arvind GR',
    email: 'arvind.g@talentflow.io',
    avatar: 'A',
    role: 'Technical Sourcing Recruiter',
    isTeamLead: false,
    teamLead: 'Tom Walsh',
    clientNames: ['Goldman Sachs'],
    totalRequirements: 6,
    totalSubmissions: 16,
    tatDays: 2.8,
    totalInterviews: 4,
    performanceStatus: 'On Track',
  },
  {
    id: 'rec-lead-3',
    name: 'Nina Brooks',
    email: 'n.brooks@talentflow.io',
    avatar: 'N',
    role: 'Lead Recruiter — EV & Tech Sourcing',
    isTeamLead: true,
    teamLead: 'Nina Brooks (Self)',
    clientNames: ['Tesla'],
    totalRequirements: 28,
    totalSubmissions: 84,
    tatDays: 2.0,
    totalInterviews: 20,
    performanceStatus: 'Top Performer',
    membersCount: 3,
    teamMembers: ['rahimoon Shaik', 'Adirala sathvika', 'Charlie Darwin'],
  },
  {
    id: 'rec-8',
    name: 'rahimoon Shaik',
    email: 'rahimoon.s@talentflow.io',
    avatar: 'R',
    role: 'Automotive Sourcing Specialist',
    isTeamLead: false,
    teamLead: 'Nina Brooks',
    clientNames: ['Tesla'],
    totalRequirements: 14,
    totalSubmissions: 42,
    tatDays: 2.0,
    totalInterviews: 11,
    performanceStatus: 'Top Performer',
  },
  {
    id: 'rec-9',
    name: 'Adirala sathvika',
    email: 'adirala.s@talentflow.io',
    avatar: 'A',
    role: 'Software Recruiter',
    isTeamLead: false,
    teamLead: 'Nina Brooks',
    clientNames: ['Tesla'],
    totalRequirements: 8,
    totalSubmissions: 22,
    tatDays: 2.5,
    totalInterviews: 5,
    performanceStatus: 'On Track',
  },
  {
    id: 'rec-10',
    name: 'Charlie Darwin',
    email: 'charlie.d@talentflow.io',
    avatar: 'C',
    role: 'Technical Sourcing Lead',
    isTeamLead: false,
    teamLead: 'Nina Brooks',
    clientNames: ['Tesla'],
    totalRequirements: 6,
    totalSubmissions: 20,
    tatDays: 2.2,
    totalInterviews: 4,
    performanceStatus: 'On Track',
  },
  {
    id: 'rec-lead-4',
    name: 'Ray Diaz',
    email: 'ray.d@talentflow.io',
    avatar: 'R',
    role: 'Lead Recruiter — Enterprise SAP & ERP',
    isTeamLead: true,
    teamLead: 'Ray Diaz (Self)',
    clientNames: ['ITC Limited'],
    totalRequirements: 24,
    totalSubmissions: 72,
    tatDays: 2.3,
    totalInterviews: 18,
    performanceStatus: 'On Track',
    membersCount: 3,
    teamMembers: ['Harini Sindey', 'Viswanath Reddy', 'Rachana Golkonda'],
  },
  {
    id: 'rec-11',
    name: 'Harini Sindey',
    email: 'harini.s@talentflow.io',
    avatar: 'H',
    role: 'Enterprise Recruiter',
    isTeamLead: false,
    teamLead: 'Ray Diaz',
    clientNames: ['ITC Limited'],
    totalRequirements: 10,
    totalSubmissions: 32,
    tatDays: 2.1,
    totalInterviews: 8,
    performanceStatus: 'On Track',
  },
  {
    id: 'rec-12',
    name: 'Viswanath Reddy',
    email: 'viswanath.r@talentflow.io',
    avatar: 'V',
    role: 'SAP Recruiter',
    isTeamLead: false,
    teamLead: 'Ray Diaz',
    clientNames: ['ITC Limited'],
    totalRequirements: 8,
    totalSubmissions: 24,
    tatDays: 2.6,
    totalInterviews: 6,
    performanceStatus: 'On Track',
  },
]

interface TeamsRecruitersPageProps {
  role?: Role
}

export function TeamsRecruitersPage({ role = 'superadmin' }: TeamsRecruitersPageProps) {
  const [membersList, setMembersList] = useState<UnifiedTeamMember[]>(INITIAL_MEMBERS_DATA)

  // Filter & Toggle State
  const [roleToggle, setRoleToggle] = useState<'all' | 'leads' | 'recruiters'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [teamLeadFilter, setTeamLeadFilter] = useState('All Team Leads')
  const [performanceFilter, setPerformanceFilter] = useState('All Performance')

  // Modals & Toast State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedMemberDetail, setSelectedMemberDetail] = useState<UnifiedTeamMember | null>(null)

  // Add Member Form State
  const [newMemberName, setNewMemberName] = useState('')
  const [newMemberEmail, setNewMemberEmail] = useState('')
  const [newMemberRole, setNewMemberRole] = useState('Technical Recruiter')
  const [newIsTeamLead, setNewIsTeamLead] = useState(false)
  const [newAssignedLead, setNewAssignedLead] = useState('Harish Gadipally')
  const [newAssignedClient, setNewAssignedClient] = useState('Accenture')
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  // Unique Team Leads list for dropdown filter
  const uniqueTeamLeads = useMemo(() => {
    const leadsSet = new Set<string>()
    membersList.forEach(m => {
      if (m.isTeamLead) leadsSet.add(m.name)
      else if (m.teamLead && m.teamLead !== 'Unassigned') {
        const cleanLead = m.teamLead.replace(/\s*\(Self\)$/, '')
        leadsSet.add(cleanLead)
      }
    })
    return Array.from(leadsSet)
  }, [membersList])

  // Filtered Members List
  const filteredMembers = useMemo(() => {
    return membersList.filter(m => {
      // Role Toggle Filter
      if (roleToggle === 'leads' && !m.isTeamLead) return false
      if (roleToggle === 'recruiters' && m.isTeamLead) return false

      // Search Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchName = m.name.toLowerCase().includes(q)
        const matchEmail = m.email.toLowerCase().includes(q)
        const matchRole = m.role.toLowerCase().includes(q)
        const matchLead = m.teamLead.toLowerCase().includes(q)
        const matchClient = m.clientNames.some(c => c.toLowerCase().includes(q))
        if (!matchName && !matchEmail && !matchRole && !matchLead && !matchClient) return false
      }

      // Team Lead Filter
      if (teamLeadFilter !== 'All Team Leads') {
        const cleanLeadFilter = teamLeadFilter.toLowerCase()
        const cleanMemberLead = m.teamLead.toLowerCase().replace(/\s*\(self\)$/, '')
        if (cleanMemberLead !== cleanLeadFilter && m.name.toLowerCase() !== cleanLeadFilter) {
          return false
        }
      }

      // Performance Filter
      if (performanceFilter !== 'All Performance' && m.performanceStatus !== performanceFilter) {
        return false
      }

      return true
    })
  }, [membersList, roleToggle, searchQuery, teamLeadFilter, performanceFilter])

  // Pagination State (10 items per page limit)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const totalPages = Math.ceil(filteredMembers.length / pageSize) || 1

  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredMembers.slice(start, start + pageSize)
  }, [filteredMembers, currentPage, pageSize])

  // Form Submit Handler
  const handleCreateMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMemberName.trim() || !newMemberEmail.trim()) return

    const newRecord: UnifiedTeamMember = {
      id: `mem-${Date.now()}`,
      name: newMemberName.trim(),
      email: newMemberEmail.trim(),
      avatar: newMemberName.trim().charAt(0).toUpperCase(),
      role: newMemberRole,
      isTeamLead: newIsTeamLead,
      teamLead: newIsTeamLead ? `${newMemberName.trim()} (Self)` : newAssignedLead,
      clientNames: [newAssignedClient],
      totalRequirements: 0,
      totalSubmissions: 0,
      tatDays: 2.0,
      totalInterviews: 0,
      performanceStatus: 'On Track',
    }

    setMembersList([newRecord, ...membersList])
    setIsAddModalOpen(false)
    showToast(`Successfully added new ${newIsTeamLead ? 'Team Lead' : 'Recruiter'}: ${newMemberName}`)

    // Reset Form
    setNewMemberName('')
    setNewMemberEmail('')
    setNewIsTeamLead(false)
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-200">
      {/* TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. SIMPLE TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Teams & Recruiters</h1>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-100 text-[#6B3BF6] border border-purple-200 inline-flex items-center gap-1.5 shadow-2xs">
              <Users className="w-3.5 h-3.5 text-[#6B3BF6]" />
              <span>{filteredMembers.length} Team Members</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete list of recruiters and team leads with assigned lead details and client performance.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98 shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Add Team Member</span>
        </button>
      </div>

      {/* 2. SIMPLE FILTER & ROLE TOGGLE BAR */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-3">
        {/* ROW 1: SIMPLE ROLE TOGGLE PILLS */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            <button
              onClick={() => {
                setRoleToggle('all')
                setCurrentPage(1)
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                roleToggle === 'all'
                  ? 'bg-[#6B3BF6] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>All Team Members ({membersList.length})</span>
            </button>

            <button
              onClick={() => {
                setRoleToggle('leads')
                setCurrentPage(1)
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                roleToggle === 'leads'
                  ? 'bg-[#6B3BF6] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Team Leads ({membersList.filter(m => m.isTeamLead).length})</span>
            </button>

            <button
              onClick={() => {
                setRoleToggle('recruiters')
                setCurrentPage(1)
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                roleToggle === 'recruiters'
                  ? 'bg-[#6B3BF6] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Recruiters ({membersList.filter(m => !m.isTeamLead).length})</span>
            </button>
          </div>
        </div>

        {/* ROW 2: SEARCH & DROPDOWN FILTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search member, lead, role, client..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-xs font-medium"
            />
          </div>

          <div>
            <select
              value={teamLeadFilter}
              onChange={e => setTeamLeadFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
            >
              <option value="All Team Leads">All Team Leads ({uniqueTeamLeads.length})</option>
              {uniqueTeamLeads.map(lead => (
                <option key={lead} value={lead}>
                  Team Lead: {lead}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={performanceFilter}
              onChange={e => setPerformanceFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
            >
              <option value="All Performance">All Performance Statuses</option>
              <option value="Top Performer">Top Performer 🏆</option>
              <option value="On Track">On Track ⚡</option>
              <option value="Needs Attention">Needs Attention ⚠️</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. CLEAN & SIMPLE NORMAL LIST VIEW */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">TEAM MEMBER & ASSIGNED TEAM LEAD</th>
                <th className="py-3.5 px-4">ROLE TITLE</th>
                <th className="py-3.5 px-4">MAPPED CLIENTS</th>
                <th className="py-3.5 px-4 text-center">REQUIREMENTS</th>
                <th className="py-3.5 px-4 text-center">SUBMISSIONS</th>
                {role !== 'recruiter' && (
                  <th className="py-3.5 px-4 text-center">SCREEN TIME</th>
                )}
                <th className="py-3.5 px-4 text-center">STATUS</th>
                <th className="py-3.5 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {paginatedMembers.map(member => (
                <tr
                  key={member.id}
                  onClick={() => setSelectedMemberDetail(member)}
                  className="hover:bg-purple-50/40 transition-colors cursor-pointer group"
                >
                  {/* MEMBER NAME & TEAM LEAD BESIDE NAME */}
                  <td className="py-4 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B3BF6] to-[#5833E0] text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-2xs">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-slate-900 text-xs group-hover:text-[#6B3BF6] transition-colors">
                            {member.name}
                          </span>

                          {/* TEAM LEAD MENTIONED BESIDE NAME */}
                          {member.isTeamLead ? (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200 inline-flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-blue-600" />
                              <span>Team Lead (Self)</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-purple-50 text-[#6B3BF6] border border-purple-200 inline-flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-[#6B3BF6]" />
                              <span>Lead: {member.teamLead}</span>
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-normal mt-0.5">{member.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* ROLE TITLE */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="font-extrabold text-slate-800 text-xs">{member.role}</div>
                  </td>

                  {/* MAPPED CLIENTS */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                      {member.clientNames.join(', ')}
                    </span>
                  </td>

                  {/* REQUIREMENTS */}
                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-200 tabular-nums">
                      {member.totalRequirements} Reqs
                    </span>
                  </td>

                  {/* SUBMISSIONS */}
                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-purple-50 text-purple-900 border border-purple-200 tabular-nums">
                      {member.totalSubmissions} Subs
                    </span>
                  </td>

                  {/* SCREEN TIME (RECORDED) */}
                  {role !== 'recruiter' && (
                    <td className="py-4 px-4 whitespace-nowrap text-center">
                      {(() => {
                        const currentUser = DEMO_ACCOUNTS[role] || { name: 'Current User' }
                        const isAllowed = canViewScreenTime(role, currentUser.name, member.name, member.teamLead)
                        if (!isAllowed) {
                          return (
                            <span
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-400 border border-slate-200 text-[11px] font-bold"
                              title="Screen time privacy: Only visible to self, team lead, and admin"
                            >
                              <Lock className="w-3 h-3 text-slate-400" />
                              <span>Private</span>
                            </span>
                          )
                        }
                        const st = getRecruiterScreenTime(member.name)
                        return (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-50 text-[#6B3BF6] border border-purple-200 text-xs font-black">
                            <Clock className="w-3 h-3 text-[#6B3BF6]" />
                            <span>{formatDurationShort(st.activeSeconds)}</span>
                            <span className={`w-1.5 h-1.5 rounded-full ${st.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                          </span>
                        )
                      })()}
                    </td>
                  )}

                  {/* PERFORMANCE STATUS */}
                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                        member.performanceStatus === 'Top Performer'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : member.performanceStatus === 'On Track'
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : 'bg-rose-100 text-rose-800 border-rose-300'
                      }`}
                    >
                      {member.performanceStatus}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        setSelectedMemberDetail(member)
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-purple-100 text-[#6B3BF6] font-extrabold text-xs cursor-pointer inline-flex items-center gap-1 transition-all"
                    >
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PaginationFooter
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredMembers.length}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* 4. ADD TEAM MEMBER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
                <UserPlus className="w-5 h-5 text-[#6B3BF6]" />
                <span>Add New Team Member / Lead</span>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMemberSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Member Role Category *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewIsTeamLead(false)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      !newIsTeamLead ? 'bg-[#6B3BF6] text-white border-[#5833E0]' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Recruiter</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewIsTeamLead(true)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      newIsTeamLead ? 'bg-[#6B3BF6] text-white border-[#5833E0]' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Team Lead</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newMemberName}
                  onChange={e => setNewMemberName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Official Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="ramesh.k@talentflow.io"
                  value={newMemberEmail}
                  onChange={e => setNewMemberEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Designated Role Title</label>
                  <input
                    type="text"
                    value={newMemberRole}
                    onChange={e => setNewMemberRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6]"
                  />
                </div>

                {!newIsTeamLead && (
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">Assigned Team Lead</label>
                    <select
                      value={newAssignedLead}
                      onChange={e => setNewAssignedLead(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none cursor-pointer"
                    >
                      {uniqueTeamLeads.map(l => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Mapped Client Partner</label>
                <select
                  value={newAssignedClient}
                  onChange={e => setNewAssignedClient(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="Accenture">Accenture</option>
                  <option value="Goldman Sachs">Goldman Sachs</option>
                  <option value="Tesla">Tesla</option>
                  <option value="ITC Limited">ITC Limited</option>
                  <option value="LTTS">LTTS</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-extrabold rounded-xl shadow-md cursor-pointer active:scale-98"
                >
                  Save Member Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MEMBER DETAIL MODAL */}
      {selectedMemberDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#6B3BF6] text-white font-extrabold flex items-center justify-center text-sm">
                  {selectedMemberDetail.avatar}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <span>{selectedMemberDetail.name}</span>
                    {selectedMemberDetail.isTeamLead && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                        Team Lead
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-purple-700 font-semibold">{selectedMemberDetail.role}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedMemberDetail(null)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-medium">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Reporting Team Lead</span>
                  <span className="font-extrabold text-slate-900 text-xs block mt-0.5">{selectedMemberDetail.teamLead}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Mapped Clients</span>
                  <span className="font-extrabold text-purple-800 text-xs block mt-0.5">{selectedMemberDetail.clientNames.join(', ')}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100">
                  <span className="text-[10px] font-bold text-blue-700 block uppercase">Allocated Reqs</span>
                  <span className="text-lg font-extrabold text-blue-900 tabular-nums">{selectedMemberDetail.totalRequirements}</span>
                </div>
                <div className="p-3 bg-purple-50/80 rounded-2xl border border-purple-100">
                  <span className="text-[10px] font-bold text-purple-700 block uppercase">Submissions</span>
                  <span className="text-lg font-extrabold text-purple-900 tabular-nums">{selectedMemberDetail.totalSubmissions}</span>
                </div>
                <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-700 block uppercase">Average TAT</span>
                  <span className="text-lg font-extrabold text-emerald-900 tabular-nums">{selectedMemberDetail.tatDays} Days</span>
                </div>
              </div>

              {/* SCREEN TIME RECORDED CARD (PRIVACY ENFORCED FOR LEADS/ADMINS ONLY) */}
              {role !== 'recruiter' && (() => {
                const currentUser = DEMO_ACCOUNTS[role] || { name: 'Current User' }
                const isAllowed = canViewScreenTime(role, currentUser.name, selectedMemberDetail.name, selectedMemberDetail.teamLead)
                if (!isAllowed) {
                  return (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between text-xs font-medium">
                      <div className="flex items-center gap-2 text-slate-500 font-bold">
                        <Lock className="w-4 h-4 text-slate-400" />
                        <span>Screen Time & Usage Metrics</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-200 text-slate-600">
                        🔒 Restricted (Self & Team Lead Only)
                      </span>
                    </div>
                  )
                }
                const st = getRecruiterScreenTime(selectedMemberDetail.name)
                return (
                  <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-3.5 flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#6B3BF6]" />
                      <span className="text-purple-950 font-extrabold">Active Screen Time Recorded:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-black text-[#6B3BF6]">
                        {formatDuration(st.activeSeconds)}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase ${st.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {st.status}
                      </span>
                    </div>
                  </div>
                )
              })()}

              {selectedMemberDetail.isTeamLead && selectedMemberDetail.teamMembers && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-extrabold text-slate-700 block mb-2">Direct Team Members ({selectedMemberDetail.teamMembers.length})</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMemberDetail.teamMembers.map(m => (
                      <span key={m} className="px-2.5 py-1 rounded-xl bg-purple-50 text-[#6B3BF6] border border-purple-200 text-xs font-bold">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedMemberDetail(null)}
                className="px-4 py-2 bg-[#6B3BF6] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
