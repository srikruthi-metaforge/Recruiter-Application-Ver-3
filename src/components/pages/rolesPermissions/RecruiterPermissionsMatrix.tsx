import React from 'react'
import { Search, Sliders } from 'lucide-react'
import { RecruiterUserPermissionData } from './rolesPermissionsData'

interface Props {
  recruiters?: RecruiterUserPermissionData[]
  recruiterUsers?: RecruiterUserPermissionData[]
  searchQuery?: string
  setSearchQuery?: (v: string) => void
  roleFilter?: string
  setRoleFilter?: (v: string) => void
  onTogglePermission?: (userId: string, permKey: any) => void
  onOpenManageModal?: (user: RecruiterUserPermissionData) => void
  handleOpenUserPermissionModal?: (user: RecruiterUserPermissionData) => void
  showToast?: (msg: string) => void
}

export function RecruiterPermissionsMatrix({
  recruiters,
  recruiterUsers,
  searchQuery: externalSearchQuery,
  setSearchQuery: externalSetSearchQuery,
  roleFilter: externalRoleFilter,
  setRoleFilter: externalSetRoleFilter,
  onTogglePermission,
  onOpenManageModal,
  handleOpenUserPermissionModal,
  showToast,
}: Props) {
  const [internalSearchQuery, setInternalSearchQuery] = React.useState('')
  const [internalRoleFilter, setInternalRoleFilter] = React.useState('All Roles')

  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery
  const setSearchQuery = externalSetSearchQuery || setInternalSearchQuery
  const roleFilter = externalRoleFilter !== undefined ? externalRoleFilter : internalRoleFilter
  const setRoleFilter = externalSetRoleFilter || setInternalRoleFilter

  const list = recruiters || recruiterUsers || []
  const openModal = onOpenManageModal || handleOpenUserPermissionModal || (() => {})

  const filteredRecruiterUsers = list.filter(user => {
    const matchesQuery =
      !searchQuery.trim() ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'All Roles' || user.roleName.toLowerCase().includes(roleFilter.toLowerCase())
    return matchesQuery && matchesRole
  })

  return (
    <div className="space-y-4 animate-in fade-in duration-150 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900">
            Recruiter & Team Lead Permissions Control
          </h3>
          <p className="text-xs text-slate-500">
            View active roles and manage individual capabilities for all recruiters
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search recruiter name or email..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6]"
            />
          </div>

          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
          >
            <option value="All Roles">All Roles</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Senior Technical Recruiter">Senior Technical Recruiter</option>
            <option value="IT Recruiter">IT Recruiter</option>
            <option value="ERP Technical Recruiter">ERP Technical Recruiter</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-200/80 rounded-2xl bg-white shadow-2xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4">RECRUITER / USER</th>
              <th className="py-3.5 px-4">ASSIGNED ROLE</th>
              <th className="py-3.5 px-4">RECRUITMENT POD</th>
              <th className="py-3.5 px-4">ACTIVE PERMISSIONS SUMMARY</th>
              <th className="py-3.5 px-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {filteredRecruiterUsers.map(user => (
              <tr key={user.id} className="hover:bg-purple-50/40 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-[#6B3BF6] font-bold flex items-center justify-center text-xs shrink-0 border border-purple-200">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900">{user.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{user.email}</div>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${
                    user.roleCode === 'lead'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      : user.roleCode === 'admin'
                      ? 'bg-amber-100 text-amber-900 border-amber-200'
                      : 'bg-purple-100 text-purple-900 border-purple-200'
                  }`}>
                    {user.roleName}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-slate-700 font-bold">
                  {user.team}
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1">
                    {user.permissions.addCandidates && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        ✓ Add Candidates
                      </span>
                    )}
                    {user.permissions.submitToClients && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                        ✓ Submissions
                      </span>
                    )}
                    {user.permissions.scheduleInterviews && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ✓ Interviews
                      </span>
                    )}
                    {user.permissions.exportReportsCsv && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        ✓ Export CSV
                      </span>
                    )}
                    {user.permissions.viewTeamAnalytics && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        ✓ Team Analytics
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => openModal(user)}
                    className="px-3 py-1.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-2xs transition-all inline-flex items-center gap-1.5 cursor-pointer active:scale-98"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Manage Permissions</span>
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
