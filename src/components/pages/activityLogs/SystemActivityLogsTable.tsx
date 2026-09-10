import React from 'react'
import { Search, Eye } from 'lucide-react'
import { ActivityLogItem } from '../../../types'

interface SystemActivityLogsTableProps {
  logsList: ActivityLogItem[]
  searchQuery: string
  setSearchQuery: (val: string) => void
  roleFilter: string
  setRoleFilter: (val: string) => void
  categoryFilter: string
  setCategoryFilter: (val: string) => void
  onInspectLog: (log: ActivityLogItem) => void
}

export const SystemActivityLogsTable: React.FC<SystemActivityLogsTableProps> = ({
  logsList,
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  categoryFilter,
  setCategoryFilter,
  onInspectLog,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">System Action Audit Trail</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Immutable log of all user actions across candidates, requirements, permissions, and settings.
          </p>
        </div>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-extrabold rounded-full border border-emerald-200">
          {logsList.length} Audit Entries
        </span>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search action or details..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-xs"
          />
        </div>

        <div>
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="All Roles">All Roles</option>
            <option value="recruiter">Recruiters</option>
            <option value="lead">Team Leads</option>
            <option value="admin">Admins</option>
            <option value="superadmin">Super Admins</option>
          </select>
        </div>

        <div>
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="All Categories">All Action Categories</option>
            <option value="Submissions">Submissions</option>
            <option value="Requirements">Requirements</option>
            <option value="Client Management">Client Management</option>
            <option value="System & Access">System & Access</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <th className="py-3 px-4">Log ID</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Action & Details</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {logsList.map(item => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-purple-700">{item.id}</td>
                <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{item.timestamp}</td>
                <td className="py-3 px-4 font-bold text-slate-900">{item.userName || item.user}</td>
                <td className="py-3 px-4">
                  <div className="font-bold text-slate-900">{item.action}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{item.details}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
                    {item.category}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onInspectLog(item)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1 ml-auto cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Log</span>
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
