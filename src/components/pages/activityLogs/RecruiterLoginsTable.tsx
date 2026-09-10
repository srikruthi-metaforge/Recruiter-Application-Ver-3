import React from 'react'
import { LogIn, Search, Eye } from 'lucide-react'
import { RecruiterLoginRecord } from './activityLogsData'

interface RecruiterLoginsTableProps {
  loginRecords: RecruiterLoginRecord[]
  loginSearch: string
  setLoginSearch: (val: string) => void
  selectedRecruiterFilter: string
  setSelectedRecruiterFilter: (val: string) => void
  loginStatusFilter: string
  setLoginStatusFilter: (val: string) => void
  uniqueRecruiterNames: string[]
  onInspectSession: (rec: RecruiterLoginRecord) => void
}

export const RecruiterLoginsTable: React.FC<RecruiterLoginsTableProps> = ({
  loginRecords,
  loginSearch,
  setLoginSearch,
  selectedRecruiterFilter,
  setSelectedRecruiterFilter,
  loginStatusFilter,
  setLoginStatusFilter,
  uniqueRecruiterNames,
  onInspectSession,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Recruiter Daily Login & Session History</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Monitors when recruiters log in, log out, session durations, and active screen times.
          </p>
        </div>
        <span className="px-3 py-1 bg-purple-50 text-[#6B3BF6] text-xs font-extrabold rounded-full border border-purple-200">
          {loginRecords.length} Sessions Logged
        </span>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name, email or IP..."
            value={loginSearch}
            onChange={e => setLoginSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-xs"
          />
        </div>

        <div>
          <select
            value={selectedRecruiterFilter}
            onChange={e => setSelectedRecruiterFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="All Users">All Users</option>
            {uniqueRecruiterNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={loginStatusFilter}
            onChange={e => setLoginStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="All Statuses">All Session Statuses</option>
            <option value="Active Now">Active Now</option>
            <option value="Logged Out">Logged Out</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Login Time</th>
              <th className="py-3 px-4">Logout Time</th>
              <th className="py-3 px-4">Session Duration</th>
              <th className="py-3 px-4">Active Screen Time</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {loginRecords.map(rec => (
              <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-[#6B3BF6] font-extrabold flex items-center justify-center text-xs border border-purple-200">
                      {rec.userAvatar}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{rec.userName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{rec.userEmail}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 font-bold text-slate-700">{rec.logDate}</td>
                <td className="py-3 px-4 font-mono text-[11px] text-emerald-700 font-bold">{rec.loginTime}</td>
                <td className="py-3 px-4 font-mono text-[11px] text-slate-600">{rec.logoutTime}</td>
                <td className="py-3 px-4 font-bold text-slate-900">{rec.sessionDuration}</td>
                <td className="py-3 px-4 font-bold text-purple-700">{rec.activeScreenTime}</td>
                <td className="py-3 px-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                    rec.status === 'Active Now'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {rec.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onInspectSession(rec)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1 ml-auto cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
