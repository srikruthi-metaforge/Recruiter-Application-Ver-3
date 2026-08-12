import React, { useState } from 'react'
import {
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Users,
  Lock,
  CheckCircle2,
  XCircle,
  Search,
  Check,
  X,
  Shield,
  Sliders,
  Eye,
  Key,
  ArrowLeft,
  Save,
  Layers,
  CheckSquare,
  Square,
  RotateCcw,
} from 'lucide-react'
import { Role } from '../../types'

export interface PermissionGroup {
  module: string
  permissions: {
    key: string
    label: string
    enabled: boolean
  }[]
}

export interface EnterpriseRoleData {
  id: string
  name: string
  code: string
  description: string
  userCount: number
  isSystem: boolean
  lastUpdated: string
  permissions: Record<string, boolean>
}

const DEFAULT_MODULE_PERMISSIONS: PermissionGroup[] = [
  {
    module: 'Requirements Management',
    permissions: [
      { key: 'req_view_all', label: 'View Organization Requirements', enabled: true },
      { key: 'req_create', label: 'Create New Job Requirements', enabled: true },
      { key: 'req_edit', label: 'Edit Job Details & Budgets', enabled: true },
      { key: 'req_assign', label: 'Assign Recruiters to Requirements', enabled: true },
      { key: 'req_delete', label: 'Delete Requirements', enabled: false },
    ],
  },
  {
    module: 'Candidates & Repository',
    permissions: [
      { key: 'cand_search', label: 'Search Candidate Repository', enabled: true },
      { key: 'cand_add', label: 'Add New Candidate Profiles', enabled: true },
      { key: 'cand_export', label: 'Export Resumes & Contact Details', enabled: true },
      { key: 'cand_delete', label: 'Remove Candidates', enabled: false },
    ],
  },
  {
    module: 'Submissions & Pipeline',
    permissions: [
      { key: 'sub_create', label: 'Submit Candidates to Client', enabled: true },
      { key: 'sub_view_all', label: 'View All Team Submissions', enabled: true },
      { key: 'sub_reassign', label: 'Reassign Candidates Between Recruiters', enabled: true },
      { key: 'sub_move_stage', label: 'Update Candidate Stage Status', enabled: true },
    ],
  },
  {
    module: 'Interviews & Scheduling',
    permissions: [
      { key: 'int_schedule', label: 'Schedule Candidate Interviews', enabled: true },
      { key: 'int_join_links', label: 'Access Meeting & Video Links', enabled: true },
      { key: 'int_feedback', label: 'Submit Interview Feedback', enabled: true },
      { key: 'int_cancel', label: 'Cancel & Reschedule Slots', enabled: true },
    ],
  },
  {
    module: 'Reports & Analytics',
    permissions: [
      { key: 'rep_view_exec', label: 'View Executive Level Analytics', enabled: true },
      { key: 'rep_view_recruiter', label: 'View Individual Recruiter Benchmarks', enabled: true },
      { key: 'rep_export_csv', label: 'Export Reports to Excel / CSV', enabled: true },
    ],
  },
  {
    module: 'System & User Management',
    permissions: [
      { key: 'user_manage', label: 'Manage User Accounts & Roles', enabled: false },
      { key: 'role_manage', label: 'Modify System Roles & Access Matrix', enabled: false },
      { key: 'audit_logs', label: 'Access Security Audit Trail', enabled: false },
    ],
  },
]

const INITIAL_ROLES: EnterpriseRoleData[] = [
  {
    id: 'role-1',
    name: 'Super Admin',
    code: 'superadmin',
    description: 'Complete unrestricted access across all organizational modules, system settings, billing, and user governance.',
    userCount: 3,
    isSystem: true,
    lastUpdated: '10 Aug 2026',
    permissions: {
      req_view_all: true, req_create: true, req_edit: true, req_assign: true, req_delete: true,
      cand_search: true, cand_add: true, cand_export: true, cand_delete: true,
      sub_create: true, sub_view_all: true, sub_reassign: true, sub_move_stage: true,
      int_schedule: true, int_join_links: true, int_feedback: true, int_cancel: true,
      rep_view_exec: true, rep_view_recruiter: true, rep_export_csv: true,
      user_manage: true, role_manage: true, audit_logs: true,
    },
  },
  {
    id: 'role-2',
    name: 'Admin',
    code: 'admin',
    description: 'Full operational control over hiring teams, requirement assignments, candidate flow, and performance reports.',
    userCount: 8,
    isSystem: true,
    lastUpdated: '08 Aug 2026',
    permissions: {
      req_view_all: true, req_create: true, req_edit: true, req_assign: true, req_delete: false,
      cand_search: true, cand_add: true, cand_export: true, cand_delete: false,
      sub_create: true, sub_view_all: true, sub_reassign: true, sub_move_stage: true,
      int_schedule: true, int_join_links: true, int_feedback: true, int_cancel: true,
      rep_view_exec: true, rep_view_recruiter: true, rep_export_csv: true,
      user_manage: true, role_manage: false, audit_logs: false,
    },
  },
  {
    id: 'role-3',
    name: 'Team Lead',
    code: 'lead',
    description: 'Supervises assigned recruiter team, monitors daily submission targets, and manages interview scheduling.',
    userCount: 14,
    isSystem: true,
    lastUpdated: '05 Aug 2026',
    permissions: {
      req_view_all: true, req_create: false, req_edit: false, req_assign: true, req_delete: false,
      cand_search: true, cand_add: true, cand_export: true, cand_delete: false,
      sub_create: true, sub_view_all: true, sub_reassign: true, sub_move_stage: true,
      int_schedule: true, int_join_links: true, int_feedback: true, int_cancel: true,
      rep_view_exec: false, rep_view_recruiter: true, rep_export_csv: true,
      user_manage: false, role_manage: false, audit_logs: false,
    },
  },
  {
    id: 'role-4',
    name: 'Recruiter',
    code: 'recruiter',
    description: 'Individual recruiter focused on sourcing candidates, submitting to requirements, and tracking scheduled slots.',
    userCount: 48,
    isSystem: true,
    lastUpdated: '01 Aug 2026',
    permissions: {
      req_view_all: false, req_create: false, req_edit: false, req_assign: false, req_delete: false,
      cand_search: true, cand_add: true, cand_export: false, cand_delete: false,
      sub_create: true, sub_view_all: false, sub_reassign: false, sub_move_stage: true,
      int_schedule: true, int_join_links: true, int_feedback: true, int_cancel: false,
      rep_view_exec: false, rep_view_recruiter: false, rep_export_csv: false,
      user_manage: false, role_manage: false, audit_logs: false,
    },
  },
]

export function RolesPermissionsPage() {
  const [roles, setRoles] = useState<EnterpriseRoleData[]>(INITIAL_ROLES)
  const [viewMode, setViewMode] = useState<'list' | 'create_role' | 'configure_permissions'>('list')
  const [searchQuery, setSearchQuery] = useState('')

  // Create Role Form State (Full Page)
  const [newRoleName, setNewRoleName] = useState('')
  const [newRoleDescription, setNewRoleDescription] = useState('')
  const [newRoleTemplate, setNewRoleTemplate] = useState('recruiter')
  const [newPermissions, setNewPermissions] = useState<Record<string, boolean>>({
    req_view_all: false, req_create: true, req_edit: true, req_assign: false, req_delete: false,
    cand_search: true, cand_add: true, cand_export: true, cand_delete: false,
    sub_create: true, sub_view_all: false, sub_reassign: false, sub_move_stage: true,
    int_schedule: true, int_join_links: true, int_feedback: true, int_cancel: false,
    rep_view_exec: false, rep_view_recruiter: false, rep_export_csv: false,
    user_manage: false, role_manage: false, audit_logs: false,
  })

  // Full-Page Configure Permissions State
  const [editingRole, setEditingRole] = useState<EnterpriseRoleData | null>(null)
  const [tempPermissions, setTempPermissions] = useState<Record<string, boolean>>({})

  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  // Handle Open Full-Page Configure Permissions View
  const handleOpenConfigurePermissionsPage = (role: EnterpriseRoleData) => {
    setEditingRole(role)
    setTempPermissions({ ...role.permissions })
    setViewMode('configure_permissions')
  }

  // Save Permissions from Full Page View
  const handleSavePermissions = () => {
    if (!editingRole) return
    const updatedRoles = roles.map(r =>
      r.id === editingRole.id ? { ...r, permissions: { ...tempPermissions }, lastUpdated: 'Today' } : r
    )
    setRoles(updatedRoles)
    setViewMode('list')
    showToast(`Permissions updated successfully for ${editingRole.name}!`)
    setEditingRole(null)
  }

  // Quick Action: Select All Permissions for Editing Role
  const handleSelectAllPermissions = () => {
    const allTrue: Record<string, boolean> = {}
    DEFAULT_MODULE_PERMISSIONS.forEach(group => {
      group.permissions.forEach(p => {
        allTrue[p.key] = true
      })
    })
    setTempPermissions(allTrue)
    showToast('Selected all module permissions')
  }

  // Quick Action: Deselect All Permissions for Editing Role
  const handleDeselectAllPermissions = () => {
    const allFalse: Record<string, boolean> = {}
    DEFAULT_MODULE_PERMISSIONS.forEach(group => {
      group.permissions.forEach(p => {
        allFalse[p.key] = false
      })
    })
    setTempPermissions(allFalse)
    showToast('Deselected all module permissions')
  }

  // Handle Create Role Form Submit (Full Page)
  const handleCreateRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRoleName.trim()) return

    const createdRole: EnterpriseRoleData = {
      id: `role-${Date.now()}`,
      name: newRoleName.trim(),
      code: newRoleName.toLowerCase().replace(/\s+/g, '_'),
      description: newRoleDescription.trim() || 'Custom enterprise role created by administrator.',
      userCount: 0,
      isSystem: false,
      lastUpdated: 'Just now',
      permissions: { ...newPermissions },
    }

    setRoles([...roles, createdRole])
    setViewMode('list')
    showToast(`New Role "${createdRole.name}" created successfully!`)

    // Reset Form
    setNewRoleName('')
    setNewRoleDescription('')
  }

  // Handle Template Selection for New Role
  const handleSelectTemplate = (templateCode: string) => {
    setNewRoleTemplate(templateCode)
    const baseRole = roles.find(r => r.code === templateCode)
    if (baseRole) {
      setNewPermissions({ ...baseRole.permissions })
    }
  }

  // Toggle New Role Permission Checkbox
  const toggleNewPermission = (key: string) => {
    setNewPermissions(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Delete Role
  const handleDeleteRole = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the role "${name}"?`)) {
      setRoles(roles.filter(r => r.id !== id))
      showToast(`Role "${name}" deleted.`)
    }
  }

  // -------------------------------------------------------------
  // DEDICATED FULL-PAGE VIEW: CONFIGURE ROLE PERMISSIONS PAGE
  // -------------------------------------------------------------
  if (viewMode === 'configure_permissions' && editingRole) {
    return (
      <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-200">
        {/* TOP HEADER WITH BACK BUTTON */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('list')}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-slate-200"
              title="Back to Roles List"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Configure Permissions Matrix
                </h1>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-100 text-[#6B3BF6] border border-purple-200 inline-flex items-center gap-1.5 shadow-2xs">
                  <Shield className="w-3.5 h-3.5 text-[#6B3BF6]" />
                  <span>{editingRole.name}</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Role System Code: <strong className="font-mono text-slate-800">{editingRole.code}</strong> • Assigned Users: <strong className="text-purple-700">{editingRole.userCount} Active Accounts</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSelectAllPermissions}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Select All</span>
            </button>

            <button
              onClick={handleDeselectAllPermissions}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Square className="w-3.5 h-3.5 text-slate-400" />
              <span>Deselect All</span>
            </button>

            <button
              onClick={() => setViewMode('list')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSavePermissions}
              className="px-5 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Save className="w-4 h-4" />
              <span>Save Permission Matrix</span>
            </button>
          </div>
        </div>

        {/* FULL PAGE PERMISSION MATRIX GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEFAULT_MODULE_PERMISSIONS.map(group => (
            <div key={group.module} className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#6B3BF6]" />
                    <span>{group.module}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-50 text-[#6B3BF6] border border-purple-200">
                    {group.permissions.filter(p => tempPermissions[p.key]).length} / {group.permissions.length} Enabled
                  </span>
                </div>

                <div className="space-y-2">
                  {group.permissions.map(p => {
                    const isChecked = !!tempPermissions[p.key]
                    return (
                      <label
                        key={p.key}
                        className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-purple-50/50 border-purple-200 text-purple-950 font-bold'
                            : 'bg-slate-50/60 border-slate-200/80 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-xs">{p.label}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() =>
                            setTempPermissions(prev => ({
                              ...prev,
                              [p.key]: !prev[p.key],
                            }))
                          }
                          className="w-4 h-4 text-[#6B3BF6] rounded-md focus:ring-[#6B3BF6] cursor-pointer"
                        />
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM SAVE BAR */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSavePermissions}
            className="px-6 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>Save Permission Matrix for {editingRole.name}</span>
          </button>
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------
  // DEDICATED FULL-PAGE VIEW: CREATE NEW ROLE PAGE
  // -------------------------------------------------------------
  if (viewMode === 'create_role') {
    return (
      <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-200">
        {/* TOP HEADER WITH BACK BUTTON */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('list')}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-slate-200"
              title="Back to Roles List"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#6B3BF6]" />
                <span>Create New Custom Enterprise Role</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Define custom access control levels, assign module permissions, and clone base security templates.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              form="create-role-full-form"
              type="submit"
              className="px-5 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Save className="w-4 h-4" />
              <span>Save & Create Role</span>
            </button>
          </div>
        </div>

        {/* FULL PAGE FORM */}
        <form id="create-role-full-form" onSubmit={handleCreateRoleSubmit} className="space-y-6">
          {/* SECTION 1: ROLE BASIC INFORMATION */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-900 font-extrabold text-sm">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>1. Role Basic Information</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Role Name / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Talent Acquisition Partner"
                  value={newRoleName}
                  onChange={e => setNewRoleName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Role System Code</label>
                <input
                  type="text"
                  readOnly
                  value={newRoleName ? newRoleName.toLowerCase().replace(/\s+/g, '_') : 'role_code_auto'}
                  className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono text-slate-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Base Permission Template</label>
                <select
                  value={newRoleTemplate}
                  onChange={e => handleSelectTemplate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-purple-50/70 border border-purple-200 rounded-xl text-xs font-bold text-[#6B3BF6] focus:outline-none cursor-pointer"
                >
                  <option value="recruiter">Recruiter Template (Standard Sourcing)</option>
                  <option value="lead">Team Lead Template (Supervisor Access)</option>
                  <option value="admin">Admin Template (Full Operations)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold text-xs mb-1.5">Role Description & Responsibilities</label>
              <textarea
                rows={3}
                placeholder="Describe what this role is responsible for in your recruitment workflow..."
                value={newRoleDescription}
                onChange={e => setNewRoleDescription(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
              />
            </div>
          </div>

          {/* SECTION 2: GRANULAR PERMISSION MATRIX BY MODULE */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                <Sliders className="w-5 h-5 text-[#6B3BF6]" />
                <span>2. Granular Module Permission Matrix</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Check or uncheck individual permission capabilities below
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {DEFAULT_MODULE_PERMISSIONS.map(group => (
                <div key={group.module} className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-3">
                  <span className="text-xs font-extrabold text-slate-900 block border-b border-slate-200 pb-2">
                    {group.module}
                  </span>

                  <div className="space-y-2">
                    {group.permissions.map(p => {
                      const isChecked = !!newPermissions[p.key]
                      return (
                        <label
                          key={p.key}
                          className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200/70 hover:border-purple-200 cursor-pointer transition-all"
                        >
                          <span className="text-xs font-semibold text-slate-700">{p.label}</span>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleNewPermission(p.key)}
                            className="w-4 h-4 text-[#6B3BF6] rounded-md focus:ring-[#6B3BF6] cursor-pointer"
                          />
                        </label>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM SUBMIT BAR */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Save className="w-4 h-4" />
              <span>Save & Create Custom Role</span>
            </button>
          </div>
        </form>
      </div>
    )
  }

  // -------------------------------------------------------------
  // MAIN ROLES & PERMISSIONS LIST VIEW
  // -------------------------------------------------------------
  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800">
      {/* 1. TOP HEADER & ACTION BUTTONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Roles & Permissions</h1>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-200 inline-flex items-center gap-1.5 shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-rose-600" />
              <span>Security Governance</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage system roles, configure granular permissions, and enforce access control policies across your organization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* BUTTON SWITCHES TO DEDICATED FULL-PAGE CREATE ROLE VIEW */}
          <button
            onClick={() => setViewMode('create_role')}
            className="px-4 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create New Role</span>
          </button>
        </div>
      </div>

      {/* 2. ROLES LIST CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {roles.map(role => (
          <div
            key={role.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-all duration-200 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-purple-50 text-[#6B3BF6] font-extrabold flex items-center justify-center border border-purple-200">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-slate-900">{role.name}</h3>
                      {role.isSystem && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                          System Default
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">code: {role.code}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-xl text-slate-700 text-xs font-extrabold border border-slate-200">
                  <Users className="w-3.5 h-3.5 text-purple-600" />
                  <span>{role.userCount} Users</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {role.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400 font-medium">Updated: {role.lastUpdated}</span>

              <div className="flex items-center gap-2">
                {!role.isSystem && (
                  <button
                    onClick={() => handleDeleteRole(role.id, role.name)}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Custom Role"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                {/* FULL-PAGE CONFIGURE PERMISSIONS BUTTON */}
                <button
                  onClick={() => handleOpenConfigurePermissionsPage(role)}
                  className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-[#6B3BF6] font-extrabold rounded-xl border border-purple-200 transition-all cursor-pointer flex items-center gap-1.5 text-xs shadow-2xs"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configure Permissions</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-12 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
