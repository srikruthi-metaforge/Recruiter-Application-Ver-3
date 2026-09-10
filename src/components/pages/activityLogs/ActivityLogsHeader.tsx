import React from 'react'
import { Activity, RefreshCw, LogIn, ShieldCheck } from 'lucide-react'

interface ActivityLogsHeaderProps {
  activeTab: 'login_reports' | 'audit_trail'
  setActiveTab: (tab: 'login_reports' | 'audit_trail') => void
  isRefreshing: boolean
  handleRefreshData: () => void
  lastRefreshedAt: string | null
}

export const ActivityLogsHeader: React.FC<ActivityLogsHeaderProps> = ({
  activeTab,
  setActiveTab,
  isRefreshing,
  handleRefreshData,
  lastRefreshedAt,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6B3BF6] flex items-center justify-center font-extrabold shadow-2xs">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Audit & Activity Logs</h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Track recruiter login sessions, active screen times, and system activity logs.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className={`px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-2xl text-xs font-bold shadow-2xs transition-all flex items-center gap-2 cursor-pointer ${
              isRefreshing ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#6B3BF6] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh Logs'}</span>
          </button>
        </div>
      </div>

      {/* TABS SELECTOR */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-2 border border-slate-200/80 w-fit">
        <button
          onClick={() => setActiveTab('login_reports')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'login_reports'
              ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <LogIn className="w-4 h-4 text-[#6B3BF6]" />
          <span>Recruiter Login & Session History</span>
        </button>

        <button
          onClick={() => setActiveTab('audit_trail')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'audit_trail'
              ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>System Action Audit Trail</span>
        </button>
      </div>
    </div>
  )
}
