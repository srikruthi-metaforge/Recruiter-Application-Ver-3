import React from 'react'
import { Search, History, Users, FileText, CheckCircle2, RefreshCw } from 'lucide-react'
import { PageHeader } from '../../layout/PageHeader'

interface Props {
  totalRecruitersCount: number
  totalSourcedCount: number
  totalSubmissionsCount: number
  totalWorkingCount: number
  searchQuery: string
  setSearchQuery: (val: string) => void
  selectedTeamLead: string
  setSelectedTeamLead: (val: string) => void
  selectedClient: string
  setSelectedClient: (val: string) => void
  teamLeads: string[]
  clients: string[]
  handleRefreshData: () => void
}

export function HistoryMetricsHeader({
  totalRecruitersCount,
  totalSourcedCount,
  totalSubmissionsCount,
  totalWorkingCount,
  searchQuery,
  setSearchQuery,
  selectedTeamLead,
  setSelectedTeamLead,
  selectedClient,
  setSelectedClient,
  teamLeads,
  clients,
  handleRefreshData,
}: Props) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader
          title="Recruiters History & Traceability"
          subtitle="Audit historical sourcing metrics, assigned requirements, candidate repository logs, and submissions by recruiter."
        />
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleRefreshData}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Refresh Audit Logs</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active Recruiters</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">{totalRecruitersCount}</div>
          <p className="text-[11px] text-slate-500 font-medium">Logged in historical audit trail</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Sourced (Repo)</span>
            <History className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">{totalSourcedCount}</div>
          <p className="text-[11px] text-slate-500 font-medium">Candidates in candidate repository</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Submissions</span>
            <FileText className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">{totalSubmissionsCount}</div>
          <p className="text-[11px] text-slate-500 font-medium">Total submissions sent to clients</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Working Candidates</span>
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">{totalWorkingCount}</div>
          <p className="text-[11px] text-slate-500 font-medium">Active in interview rounds</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by recruiter name or skill..."
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

          <select
            value={selectedClient}
            onChange={e => setSelectedClient(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-[#6B3BF6]/20 outline-none cursor-pointer"
          >
            {clients.map(cl => (
              <option key={cl} value={cl}>
                {cl === 'ALL' ? 'All Client Accounts' : `Client: ${cl}`}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}
