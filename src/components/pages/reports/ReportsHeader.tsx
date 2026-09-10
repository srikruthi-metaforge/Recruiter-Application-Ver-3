import React from 'react'
import { FileText, Download, BarChart3, Users, Building2, TrendingUp } from 'lucide-react'

interface ReportsHeaderProps {
  activeTab: string
  setActiveTab: (tab: any) => void
  dateRange: string
  setDateRange: (val: string) => void
  onExportCsv: () => void
}

export const ReportsHeader: React.FC<ReportsHeaderProps> = ({
  activeTab,
  setActiveTab,
  dateRange,
  setDateRange,
  onExportCsv,
}) => {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6B3BF6] flex items-center justify-center font-extrabold shadow-2xs">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Reports & Performance Analytics</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Comprehensive benchmarks, recruiter productivity analytics, and client delivery gap analysis.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            className="px-3.5 py-2 bg-purple-50/90 border border-purple-200 rounded-2xl font-extrabold text-xs text-[#6B3BF6] focus:outline-none cursor-pointer"
          >
            <option value="All Time">All Time</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Year">This Year</option>
          </select>

          <button
            onClick={onExportCsv}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-2xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Export Analytics CSV</span>
          </button>
        </div>
      </div>

      {/* TABS SELECTOR */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-2 border border-slate-200/80 w-fit overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview_charts')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'overview_charts'
              ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-[#6B3BF6]" />
          <span>Overview Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('recruiter_breakdown')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'recruiter_breakdown'
              ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-600" />
          <span>Recruiter Breakdown</span>
        </button>

        <button
          onClick={() => setActiveTab('client_performance')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'client_performance'
              ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4 text-blue-600" />
          <span>Client Performance</span>
        </button>

        <button
          onClick={() => setActiveTab('team_vs_self')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'team_vs_self'
              ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-amber-600" />
          <span>Team vs Self Performance</span>
        </button>
      </div>
    </div>
  )
}
