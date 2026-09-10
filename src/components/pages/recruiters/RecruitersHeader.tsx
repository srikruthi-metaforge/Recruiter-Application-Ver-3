import React from 'react'
import { Users, UserCheck, Clock, TrendingUp, Search, Plus } from 'lucide-react'
import { PageHeader } from '../../layout/PageHeader'

interface Props {
  totalRecruitersCount: number
  topPerformersCount: number
  avgTatDays: string
  searchQuery: string
  setSearchQuery: (val: string) => void
  selectedTeamLead: string
  setSelectedTeamLead: (val: string) => void
  teamLeads: string[]
  setIsAddModalOpen: (val: boolean) => void
}

export function RecruitersHeader({
  totalRecruitersCount,
  topPerformersCount,
  avgTatDays,
  searchQuery,
  setSearchQuery,
  selectedTeamLead,
  setSelectedTeamLead,
  teamLeads,
  setIsAddModalOpen,
}: Props) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader
          title="Recruiters & Pod Allocation"
          subtitle="Manage recruiter assignments, team leads, client pairings, and SLA performance metrics."
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 self-start md:self-auto cursor-pointer active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard New Recruiter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Recruiters</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">{totalRecruitersCount}</div>
          <p className="text-[11px] text-slate-500 font-medium">Across active delivery pods</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Top Performers</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">{topPerformersCount}</div>
          <p className="text-[11px] text-slate-500 font-medium">Exceeding SLA TAT metrics</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Average TAT</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">{avgTatDays} Days</div>
          <p className="text-[11px] text-slate-500 font-medium">From requirement intake to sub</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Submissions SLA</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">94.2%</div>
          <p className="text-[11px] text-slate-500 font-medium">On-time candidate delivery</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or client..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#6B3BF6]/20 outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedTeamLead}
            onChange={e => setSelectedTeamLead(e.target.value)}
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
