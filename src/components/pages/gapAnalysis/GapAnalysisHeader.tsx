import React from 'react'
import { ArrowLeft, Building2, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { Role } from '../../../types'
import { GapAnalysisFilterBar } from './GapAnalysisFilterBar'

interface GapAnalysisHeaderProps {
  clientName: string
  pocName?: string
  pocEmail?: string
  teamLead?: string
  role?: Role
  dateRange: string
  setDateRange: (val: string) => void
  searchQuery: string
  setSearchQuery: (val: string) => void
  selectedDomainFilter: string
  setSelectedDomainFilter: (val: string) => void
  selectedSpocFilter: string
  setSelectedSpocFilter: (val: string) => void
  selectedReqStatus: string
  setSelectedReqStatus: (val: string) => void
  selectedSubStatus: string
  setSelectedSubStatus: (val: string) => void
  selectedInterviewStatus: string
  setSelectedInterviewStatus: (val: string) => void
  healthStatus: 'Healthy' | 'Needs Attention' | 'Critical'
  uniqueSpocList: string[]
  standardizedDomains: string[]
  onBack: () => void
  showToast: (msg: string) => void
  resetFilters: () => void
  expandAll: () => void
  collapseAll: () => void
  openSections: Record<string, boolean>
  toggleSection: (key: string) => void
}

export const GapAnalysisHeader: React.FC<GapAnalysisHeaderProps> = ({
  clientName,
  pocName = 'Kallol Chakraborty',
  pocEmail = 'kallol.c@client.com',
  teamLead = 'Harish Gadipally',
  role,
  dateRange,
  setDateRange,
  searchQuery,
  setSearchQuery,
  selectedDomainFilter,
  setSelectedDomainFilter,
  selectedSpocFilter,
  setSelectedSpocFilter,
  selectedReqStatus,
  setSelectedReqStatus,
  selectedSubStatus,
  setSelectedSubStatus,
  selectedInterviewStatus,
  setSelectedInterviewStatus,
  healthStatus,
  uniqueSpocList,
  standardizedDomains,
  onBack,
  showToast,
  resetFilters,
  expandAll,
  collapseAll,
  openSections,
  toggleSection,
}) => {
  return (
    <div className="space-y-6">
      {/* 1. TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div className="space-y-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer border border-slate-200/90 active:scale-98"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Clients List</span>
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#6B3BF6] font-extrabold flex items-center justify-center text-lg border border-purple-200 shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">
                  {clientName}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold border inline-flex items-center gap-1.5 shadow-2xs ${
                    healthStatus === 'Healthy'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      : healthStatus === 'Needs Attention'
                      ? 'bg-amber-100 text-amber-900 border-amber-200'
                      : 'bg-rose-100 text-rose-800 border-rose-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full animate-pulse ${
                    healthStatus === 'Healthy' ? 'bg-emerald-600' : healthStatus === 'Needs Attention' ? 'bg-amber-600' : 'bg-rose-600'
                  }`} />
                  <span>Status: {healthStatus}</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Client Delivery Gap Analysis • SPOC: <strong className="text-slate-800">{pocName}</strong> ({pocEmail}) • Lead: <strong className="text-purple-700">{teamLead}</strong>
              </p>
            </div>
          </div>
        </div>

        {role !== 'recruiter' && role !== 'lead' && role !== 'admin' && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast(`Exporting Gap Report for ${clientName}...`)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Gap Report CSV</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. FILTERS BAR */}
      <GapAnalysisFilterBar
        dateRange={dateRange}
        setDateRange={setDateRange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDomainFilter={selectedDomainFilter}
        setSelectedDomainFilter={setSelectedDomainFilter}
        selectedSpocFilter={selectedSpocFilter}
        setSelectedSpocFilter={setSelectedSpocFilter}
        selectedReqStatus={selectedReqStatus}
        setSelectedReqStatus={setSelectedReqStatus}
        selectedSubStatus={selectedSubStatus}
        setSelectedSubStatus={setSelectedSubStatus}
        selectedInterviewStatus={selectedInterviewStatus}
        setSelectedInterviewStatus={setSelectedInterviewStatus}
        uniqueSpocList={uniqueSpocList}
        standardizedDomains={standardizedDomains}
        resetFilters={resetFilters}
      />

      {/* SECTION NAV BUTTONS */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 font-sans">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => toggleSection('kpi')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              openSections.kpi ? 'bg-[#6B3BF6] text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            KPI Overview
          </button>
          <button
            onClick={() => toggleSection('domainCharts')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              openSections.domainCharts ? 'bg-[#6B3BF6] text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Domain Charts
          </button>
          <button
            onClick={() => toggleSection('reqGaps')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              openSections.reqGaps ? 'bg-[#6B3BF6] text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Requirement Gap Matrix
          </button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button onClick={expandAll} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer">
            <ChevronDown className="w-3.5 h-3.5" />
            <span>Expand All</span>
          </button>
          <button onClick={collapseAll} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer">
            <ChevronUp className="w-3.5 h-3.5" />
            <span>Collapse All</span>
          </button>
        </div>
      </div>
    </div>
  )
}
