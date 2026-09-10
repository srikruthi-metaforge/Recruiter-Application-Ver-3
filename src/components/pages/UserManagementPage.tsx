import React, { useState, useMemo } from 'react'
import { Role } from '../../types'
import {
  UserAccountData,
  RecruiterUserPermissionData,
  INITIAL_USER_ACCOUNTS,
} from './userManagement/userManagementData'
import { UserManagementHeader } from './userManagement/UserManagementHeader'
import { UserAccountsTable } from './userManagement/UserAccountsTable'
import { UserPermissionsMatrixTab } from './userManagement/UserPermissionsMatrixTab'

export interface UserManagementPageProps {
  role?: Role
  initialTab?: string
}

export function UserManagementPage({ role = 'superadmin', initialTab = 'users_list' }: UserManagementPageProps) {
  const [activeTab, setActiveTab] = useState<'users_list' | 'recruiter_matrix' | 'roles_def'>(
    (initialTab as 'users_list' | 'recruiter_matrix' | 'roles_def') || 'users_list'
  )
  const [userAccounts, setUserAccounts] = useState<UserAccountData[]>(INITIAL_USER_ACCOUNTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const [permissionsList, setPermissionsList] = useState<RecruiterUserPermissionData[]>([
    {
      id: 'USR-004',
      name: 'Marcus Chen',
      email: 'm.chen@talentflow.io',
      roleName: 'Recruiter',
      roleCode: 'recruiter',
      team: 'Engineering Sourcing',
      avatar: 'M',
      assignedClient: 'Accenture Enterprise',
      status: 'Active',
      permissions: {
        addCandidates: true,
        submitToClients: true,
        scheduleInterviews: true,
        exportReportsCsv: true,
        viewTeamAnalytics: false,
        deleteRecords: false,
        reassignRequirements: false,
      },
    },
    {
      id: 'USR-005',
      name: 'Priya Sharma',
      email: 'p.sharma@talentflow.io',
      roleName: 'Recruiter',
      roleCode: 'recruiter',
      team: 'Engineering Sourcing',
      avatar: 'P',
      assignedClient: 'Continental Automotive',
      status: 'Active',
      permissions: {
        addCandidates: true,
        submitToClients: true,
        scheduleInterviews: true,
        exportReportsCsv: false,
        viewTeamAnalytics: false,
        deleteRecords: false,
        reassignRequirements: false,
      },
    },
  ])

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const filteredUserAccounts = useMemo(() => {
    return userAccounts.filter(user => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        if (!user.name.toLowerCase().includes(q) && !user.email.toLowerCase().includes(q) && !user.employeeId.toLowerCase().includes(q)) return false
      }
      if (roleFilter !== 'All Roles' && user.role !== roleFilter) return false
      return true
    })
  }, [userAccounts, searchQuery, roleFilter])

  const handleTogglePermission = (userId: string, permKey: keyof RecruiterUserPermissionData['permissions']) => {
    setPermissionsList(prev =>
      prev.map(item => {
        if (item.id === userId) {
          return {
            ...item,
            permissions: {
              ...item.permissions,
              [permKey]: !item.permissions[permKey],
            },
          }
        }
        return item
      })
    )
    showToast('Permission toggle updated!')
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-150">
      <UserManagementHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddUserModal={() => showToast('Opening Add New User Account modal...')}
      />

      {activeTab === 'users_list' && (
        <UserAccountsTable
          userAccounts={filteredUserAccounts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          onEditUser={u => showToast(`Editing user ${u.name}...`)}
          onResetPassword={u => showToast(`Password reset link sent to ${u.email}`)}
        />
      )}

      {activeTab === 'recruiter_matrix' && (
        <UserPermissionsMatrixTab
          permissionsList={permissionsList}
          onTogglePermission={handleTogglePermission}
          showToast={showToast}
        />
      )}

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
