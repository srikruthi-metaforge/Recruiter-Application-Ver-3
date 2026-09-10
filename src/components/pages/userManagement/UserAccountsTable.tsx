import React from 'react'
import { Search, Edit2, Lock, KeyRound } from 'lucide-react'
import { UserAccountData } from './userManagementData'

interface UserAccountsTableProps {
  userAccounts: UserAccountData[]
  searchQuery: string
  setSearchQuery: (val: string) => void
  roleFilter: string
  setRoleFilter: (val: string) => void
  onEditUser: (user: UserAccountData) => void
  onResetPassword: (user: UserAccountData) => void
}

export const UserAccountsTable: React.FC<UserAccountsTableProps> = ({
  userAccounts,
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  onEditUser,
  onResetPassword,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">User Accounts Directory</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            View, edit, and configure user accounts across all organization roles.
          </p>
        </div>
        <span className="px-3 py-1 bg-purple-50 text-[#6B3BF6] text-xs font-extrabold rounded-full border border-purple-200">
          {userAccounts.length} Active Accounts
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name, email, or employee ID..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-xs"
          />
        </div>

        <div>
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="All Roles">All Organization Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Recruiter">Recruiter</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <th className="py-3.5 px-4">Employee ID & Name</th>
              <th className="py-3.5 px-4">Role</th>
              <th className="py-3.5 px-4">Team / Supervisor</th>
              <th className="py-3.5 px-4">Client Allocation</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {userAccounts.map(user => (
              <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-purple-700 font-extrabold text-[11px] bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                      {user.employeeId}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">{user.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{user.email}</div>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                    user.role === 'Super Admin' ? 'bg-purple-100 text-purple-900 border border-purple-300' : user.role === 'Team Lead' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-blue-100 text-blue-900 border border-blue-300'
                  }`}>
                    {user.role}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-800">{user.team}</div>
                  <div className="text-[10px] text-slate-400">Supervisor: {user.supervisor}</div>
                </td>

                <td className="py-3.5 px-4 font-bold text-slate-700">
                  {user.assignedClient || 'Global / All Clients'}
                </td>

                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {user.status}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onResetPassword(user)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <KeyRound className="w-3.5 h-3.5 text-purple-600" />
                      <span>Reset Password</span>
                    </button>
                    <button
                      onClick={() => onEditUser(user)}
                      className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
