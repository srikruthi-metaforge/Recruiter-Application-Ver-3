import React, { useState } from 'react'
import { Role } from '../../types'
import { ShieldCheck, Plus, Users, Lock, Sliders } from 'lucide-react'
import {
  RecruiterUserPermissionData,
  EnterpriseRoleData,
  INITIAL_RECRUITERS_PERMISSIONS,
  INITIAL_ROLES,
} from './rolesPermissions/rolesPermissionsData'
import { RecruiterPermissionsMatrix } from './rolesPermissions/RecruiterPermissionsMatrix'
import { RoleDefinitionsGrid } from './rolesPermissions/RoleDefinitionsGrid'
import { ConfigureRolePermissionsView } from './rolesPermissions/ConfigureRolePermissionsView'
import { CreateRoleView } from './rolesPermissions/CreateRoleView'
import { ManageUserPermissionsModal } from './rolesPermissions/ManageUserPermissionsModal'

interface RolesPermissionsPageProps {
  role?: Role
}

export function RolesPermissionsPage({ role = 'superadmin' }: RolesPermissionsPageProps) {
  const [activeTab, setActiveTab] = useState<'recruiter_matrix' | 'role_definitions'>('recruiter_matrix')
  const [recruiters, setRecruiters] = useState<RecruiterUserPermissionData[]>(INITIAL_RECRUITERS_PERMISSIONS)
  const [rolesList, setRolesList] = useState<EnterpriseRoleData[]>(INITIAL_ROLES)
  const [selectedRole, setSelectedRole] = useState<EnterpriseRoleData | null>(null)
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false)
  const [selectedRecruiterForModal, setSelectedRecruiterForModal] = useState<RecruiterUserPermissionData | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const handleTogglePermission = (userId: string, permKey: keyof RecruiterUserPermissionData['permissions']) => {
    setRecruiters(prev =>
      prev.map(r => {
        if (r.id === userId) {
          return {
            ...r,
            permissions: {
              ...r.permissions,
              [permKey]: !r.permissions[permKey],
            },
          }
        }
        return r
      })
    )
    showToast('Updated recruiter permission toggle!')
  }

  if (selectedRole) {
    return (
      <ConfigureRolePermissionsView
        roleData={selectedRole}
        onBack={() => setSelectedRole(null)}
        onSave={updated => {
          setRolesList(prev => prev.map(r => (r.id === updated.id ? updated : r)))
          setSelectedRole(null)
          showToast(`Saved permission configuration for role: ${updated.name}`)
        }}
      />
    )
  }

  if (isCreateRoleOpen) {
    return (
      <CreateRoleView
        onBack={() => setIsCreateRoleOpen(false)}
        onCreate={newRole => {
          setRolesList(prev => [...prev, newRole])
          setIsCreateRoleOpen(false)
          showToast(`Successfully created custom role: ${newRole.name}`)
        }}
      />
    )
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6B3BF6] flex items-center justify-center font-extrabold shadow-2xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Role Based Access Control (RBAC)</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Manage enterprise roles, permissions matrix, and feature access toggles for recruiters.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCreateRoleOpen(true)}
          className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-extrabold rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Custom Role</span>
        </button>
      </div>

      <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-2 border border-slate-200/80 w-fit overflow-x-auto">
        <button
          onClick={() => setActiveTab('recruiter_matrix')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'recruiter_matrix'
              ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-[#6B3BF6]" />
          <span>Recruiter Permissions Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('role_definitions')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'role_definitions'
              ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-4 h-4 text-emerald-600" />
          <span>Enterprise Role Definitions ({rolesList.length})</span>
        </button>
      </div>

      {activeTab === 'recruiter_matrix' && (
        <RecruiterPermissionsMatrix
          recruiters={recruiters}
          onTogglePermission={handleTogglePermission}
          onOpenManageModal={setSelectedRecruiterForModal}
          showToast={showToast}
        />
      )}

      {activeTab === 'role_definitions' && (
        <RoleDefinitionsGrid
          rolesList={rolesList}
          onConfigureRole={setSelectedRole}
          showToast={showToast}
        />
      )}

      {selectedRecruiterForModal && (
        <ManageUserPermissionsModal
          recruiter={selectedRecruiterForModal}
          onClose={() => setSelectedRecruiterForModal(null)}
          onSave={updated => {
            setRecruiters(prev => prev.map(r => (r.id === updated.id ? updated : r)))
            setSelectedRecruiterForModal(null)
            showToast(`Saved custom permissions for ${updated.name}`)
          }}
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
