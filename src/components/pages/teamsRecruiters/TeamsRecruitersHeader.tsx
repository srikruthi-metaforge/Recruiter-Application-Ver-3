import React from 'react'
import { Users, UserCheck, ShieldCheck, Plus, Search } from 'lucide-react'
import { PageHeader } from '../../layout/PageHeader'

interface Props {
  totalMembersCount: number
  totalLeadsCount: number
  totalRecruitersCount: number
  searchQuery: string
  setSearchQuery: (v: string) => void
  selectedLeadFilter: string
  setSelectedLeadFilter: (v: string) => void
  teamLeads: string[]
  setIsAddModalOpen: (v: boolean) => void
}

export function TeamsRecruitersHeader({
  totalMembersCount,
  totalLeadsCount,
  totalRecruitersCount,
  searchQuery,
  setSearchQuery,
  selectedLeadFilter,
  setSelectedLeadFilter,
  teamLeads,
  setIsAddModalOpen,
}: Props) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader
          title="Team Members & Recruiter Pods"
          subtitle="Overview of all team leads, assigned recruiters, client partner accounts, and active delivery pods."
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 self-start md:self-auto cursor-pointer active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard Team Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Pod Members</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">{totalMembersCount}</div>
          <p className="text-[11px] text-slate-500 font-medium">Combined team leads & recruiters</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active Team Leads</span>
            <ShieldCheck className="w-4 h-4 text-[#6B3BF6]" />
          </div>
          <div className="text-2xl font-extrabold text-[#6B3BF6] font-mono tabular-nums">{totalLeadsCount}</div>
          <p className="text-[11px] text-slate-500 font-medium">Pod managers supervising accounts</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active Recruiters</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono tabular-nums">{totalRecruitersCount}</div>
          <p className="text-[11px] text-slate-500 font-medium">Executing candidate sourcing</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search team member name, role, client..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#6B3BF6]/20 outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedLeadFilter}
            onChange={e => setSelectedLeadFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-[#6B3BF6]/20 outline-none cursor-pointer"
          >
            {teamLeads.map(tl => (
              <option key={tl} value={tl}>
                {tl === 'ALL' ? 'All Team Leads' : `Lead: ${tl}`}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}
