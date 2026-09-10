import React from 'react'
import { ArrowLeft, Search, UserPlus, Send, RotateCcw } from 'lucide-react'
import { Requirement } from '../../../types'

interface CandidateRepoHeaderProps {
  searchQuery: string
  setSearchQuery: (val: string) => void
  totalExpFilter: string
  setTotalExpFilter: (val: string) => void
  activeRequirement: Requirement | null
  selectedCount: number
  onOpenAddForm: () => void
  onSubmitToLead: () => void
  onBackToDashboard?: () => void
  onClearRequirement: () => void
}

export const CandidateRepoHeader: React.FC<CandidateRepoHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  totalExpFilter,
  setTotalExpFilter,
  activeRequirement,
  selectedCount,
  onOpenAddForm,
  onSubmitToLead,
  onBackToDashboard,
  onClearRequirement,
}) => {
  return (
    <div className="space-y-5 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div>
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer mb-3"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Back to Dashboard</span>
            </button>
          )}
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Candidate Repository</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Centralized talent pool — search, filter, mask contact info, and submit candidates to requirements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddForm}
            className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-extrabold rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add Candidate</span>
          </button>
        </div>
      </div>

      {/* Requirement Context Banner */}
      {activeRequirement && (
        <div className="bg-purple-50/80 border border-purple-200 p-4 rounded-2xl flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-[#6B3BF6] text-white text-[10px] font-extrabold rounded-md uppercase tracking-wider">
              Target Requirement
            </span>
            <div>
              <span className="font-mono text-xs font-extrabold text-purple-900 mr-2">{activeRequirement.id}</span>
              <span className="font-extrabold text-slate-900 text-xs">{activeRequirement.title}</span>
              <span className="text-slate-500 text-xs ml-2">({activeRequirement.client})</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onSubmitToLead}
              disabled={selectedCount === 0}
              className={`px-5 py-2 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 ${
                selectedCount > 0
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Submit {selectedCount} Candidate{selectedCount > 1 ? 's' : ''} to Lead</span>
            </button>
            <button onClick={onClearRequirement} className="p-2 hover:bg-purple-100 rounded-lg text-purple-700 cursor-pointer" title="Clear requirement filter">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidate name, skills, tech, or candidate ID..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-xs"
          />
        </div>

        <select
          value={totalExpFilter}
          onChange={e => setTotalExpFilter(e.target.value)}
          className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs text-slate-700 focus:outline-none cursor-pointer"
        >
          <option value="All experience">All Experience</option>
          <option value="Entry Level (0-2 Yrs)">Entry Level (0-2 Yrs)</option>
          <option value="Mid Level (3-7 Yrs)">Mid Level (3-7 Yrs)</option>
          <option value="Senior Level (8+ Yrs)">Senior Level (8+ Yrs)</option>
        </select>
      </div>
    </div>
  )
}
