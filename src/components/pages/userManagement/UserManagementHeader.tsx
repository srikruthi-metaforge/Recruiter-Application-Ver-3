import React from 'react'
import { Users, UserPlus, KeyRound, ShieldCheck } from 'lucide-react'

interface UserManagementHeaderProps {
  activeTab: 'users_list' | 'recruiter_matrix' | 'roles_def'
  setActiveTab: (tab: 'users_list' | 'recruiter_matrix' | 'roles_def') => void
  onOpenAddUserModal: () => void
}

export const UserManagementHeader: React.FC<UserManagementHeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAddUserModal,
}) => {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6B3BF6] flex items-center justify-center font-extrabold shadow-2xs">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">User & Role Management</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Manage system user accounts, recruiter permissions matrix, enterprise roles, and security access.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAddUserModal}
          className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-extrabold rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95 w-fit"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Create New User Account</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-2 border border-slate-200/80 w-fit overflow-x-auto">
        <button
          onClick={() => setActiveTab('users_list')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'users_list'
              ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-[#6B3BF6]" />
          <span>User Accounts List</span>
        </button>

        <button
          onClick={() => setActiveTab('recruiter_matrix')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'recruiter_matrix'
              ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Recruiter Permissions Matrix</span>
        </button>
      </div>
    </div>
  )
}
