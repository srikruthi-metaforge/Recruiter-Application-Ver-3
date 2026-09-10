import React from 'react'
import { Building2, FileText, CheckCircle2, ShieldCheck, Plus, Search, Filter } from 'lucide-react'
import { PageHeader } from '../../layout/PageHeader'

interface Props {
  totalClientsCount: number
  activeReqsCount: number
  totalPlacementsCount: number
  executedAgreementsCount: number
  setIsAddModalOpen: (v: boolean) => void
  setIsGapAnalysisOpen: (v: boolean) => void
  searchQuery: string
  setSearchQuery: (v: string) => void
  selectedTeamLead: string
  setSelectedTeamLead: (v: string) => void
  teamLeads: string[]
}

export function ClientsMetricsHeader({
  totalClientsCount,
  activeReqsCount,
  totalPlacementsCount,
  executedAgreementsCount,
  setIsAddModalOpen,
  setIsGapAnalysisOpen,
  searchQuery,
  setSearchQuery,
  selectedTeamLead,
  setSelectedTeamLead,
  teamLeads,
}: Props) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader
          title="Client Accounts & MSA Contracts"
          subtitle="Manage enterprise client partnerships, assigned recruiter pods, commercial agreements, and SLA delivery benchmarks."
        />
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setIsGapAnalysisOpen(true)}
            className="px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-[#6B3BF6] font-extrabold text-xs rounded-xl border border-purple-200 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
          >
            <Filter className="w-4 h-4 text-[#6B3BF6]" />
            <span>Delivery Gap Analysis</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Onboard New Client</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active Client Accounts</span>
            <Building2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">{totalClientsCount}</div>
          <p className="text-[11px] text-slate-500 font-medium">Enterprise corporate accounts</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Active Requirements</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">{activeReqsCount}</div>
          <p className="text-[11px] text-slate-500 font-medium">Assigned across delivery pods</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Successful Placements</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">{totalPlacementsCount}</div>
          <p className="text-[11px] text-slate-500 font-medium">Candidates placed in 2026</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Executed MSA Agreements</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">{executedAgreementsCount} / {totalClientsCount}</div>
          <p className="text-[11px] text-slate-500 font-medium">Active legal agreements</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 font-sans">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search client account, POC name, domain..."
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
                {tl === 'ALL' ? 'All Lead Recruiter Pods' : `Lead: ${tl}`}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}
