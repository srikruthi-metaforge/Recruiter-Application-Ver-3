import React, { useState } from 'react'
import {
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Users,
  Lock,
  CheckCircle2,
  XCircle,
  Search,
  Check,
  X,
  Shield,
  Sliders,
  ArrowLeft,
  Save,
  CheckSquare,
  Square,
  UserCheck,
  Filter,
  Sparkles,
  AlertCircle,
  Key,
} from 'lucide-react'
import { Role } from '../../types'

export interface RecruiterUserPermissionData {
  id: string
  name: string
  email: string
  roleName: string
  roleCode: string
  team: string
  avatar: string
  status: 'Active' | 'Inactive'
  permissions: {
    addCandidates: boolean
    submitToClients: boolean
    scheduleInterviews: boolean
    exportReportsCsv: boolean
    viewTeamAnalytics: boolean
    deleteRecords: boolean
    reassignRequirements: boolean
  }
}

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
      rep_view_exec: true, rep_view_recruiter: true, rep_export_csv: false,
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
      rep_view_exec: false, rep_view_recruiter: true, rep_export_csv: false,
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

const INITIAL_RECRUITERS_PERMISSIONS: RecruiterUserPermissionData[] = [
  {
    id: 'user-1',
    name: 'Harish Gadipally',
    email: 'h.gadipally@talentflow.io',
    roleName: 'Team Lead',
    roleCode: 'lead',
    team: 'Engineering Pod',
    avatar: 'H',
    status: 'Active',
    permissions: {
      addCandidates: true,
      submitToClients: true,
      scheduleInterviews: true,
      exportReportsCsv: false,
      viewTeamAnalytics: true,
      deleteRecords: false,
      reassignRequirements: true,
    },
  },
  {
    id: 'user-2',
    name: 'Marcus Chen',
    email: 'm.chen@talentflow.io',
    roleName: 'Senior Technical Recruiter',
    roleCode: 'recruiter',
    team: 'Engineering Pod',
    avatar: 'M',
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
  {
    id: 'user-3',
    name: 'Priya Sharma',
    email: 'p.sharma@talentflow.io',
    roleName: 'IT Recruiter',
    roleCode: 'recruiter',
    team: 'Engineering Pod',
    avatar: 'P',
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
  {
    id: 'user-4',
    name: 'Suresh Kulkarni',
    email: 's.kulkarni@talentflow.io',
    roleName: 'ERP Technical Recruiter',
    roleCode: 'recruiter',
    team: 'Engineering Pod',
    avatar: 'S',
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
  {
    id: 'user-5',
    name: 'Adirala Sathvika',
    email: 'a.sathvika@talentflow.io',
    roleName: 'Junior Recruiter',
    roleCode: 'recruiter',
    team: 'Engineering Pod',
    avatar: 'A',
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
  {
    id: 'user-6',
    name: 'Arvind GR',
    email: 'a.gr@talentflow.io',
    roleName: 'Sourcing Specialist',
    roleCode: 'recruiter',
    team: 'Engineering Pod',
    avatar: 'A',
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
  {
    id: 'user-7',
    name: 'Tom Walsh',
    email: 't.walsh@talentflow.io',
    roleName: 'Team Lead',
    roleCode: 'lead',
    team: 'Enterprise Accounts Pod',
    avatar: 'T',
    status: 'Active',
    permissions: {
      addCandidates: true,
      submitToClients: true,
      scheduleInterviews: true,
      exportReportsCsv: true,
      viewTeamAnalytics: true,
      deleteRecords: false,
      reassignRequirements: true,
    },
  },
  {
    id: 'user-8',
    name: 'Lakshmi V',
    email: 'l.v@talentflow.io',
    roleName: 'Lead Technical Recruiter',
    roleCode: 'lead',
    team: 'Enterprise Accounts Pod',
    avatar: 'L',
    status: 'Active',
    permissions: {
      addCandidates: true,
      submitToClients: true,
      scheduleInterviews: true,
      exportReportsCsv: true,
      viewTeamAnalytics: true,
      deleteRecords: false,
      reassignRequirements: true,
    },
  },
  {
    id: 'user-9',
    name: 'Sarah Kim',
    email: 's.kim@talentflow.io',
    roleName: 'FinTech Technical Recruiter',
    roleCode: 'recruiter',
    team: 'Enterprise Accounts Pod',
    avatar: 'S',
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
  {
    id: 'user-10',
    name: 'Rahul Verma',
    email: 'r.verma@talentflow.io',
    roleName: 'Team Lead',
    roleCode: 'lead',
    team: 'Cloud & ERP Pod',
    avatar: 'R',
    status: 'Active',
    permissions: {
      addCandidates: true,
      submitToClients: true,
      scheduleInterviews: true,
      exportReportsCsv: true,
      viewTeamAnalytics: true,
      deleteRecords: false,
      reassignRequirements: true,
    },
  },
  {
    id: 'user-11',
    name: 'Neha Gupta',
    email: 'n.gupta@talentflow.io',
    roleName: 'SAP & Cloud Specialist',
    roleCode: 'recruiter',
    team: 'Cloud & ERP Pod',
    avatar: 'N',
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
  {
    id: 'user-12',
    name: 'David Park',
    email: 'd.park@talentflow.io',
    roleName: 'Admin',
    roleCode: 'admin',
    team: 'Operations',
    avatar: 'D',
    status: 'Active',
    permissions: {
      addCandidates: true,
      submitToClients: true,
      scheduleInterviews: true,
      exportReportsCsv: true,
      viewTeamAnalytics: true,
      deleteRecords: true,
      reassignRequirements: true,
    },
  },
]

interface RolesPermissionsPageProps {
  role?: Role
}

export function RolesPermissionsPage({ role = 'superadmin' }: RolesPermissionsPageProps) {
  // If user is non-SuperAdmin and non-DevTeam, restrict access cleanly
  if (role !== 'superadmin' && role !== 'devteam') {
    return (
      <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-200">
        <div className="bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-rose-500/30 text-center space-y-6 max-w-2xl mx-auto my-12">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/20 border border-rose-400/40 text-rose-300 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 border border-rose-400/30 text-rose-300 inline-block uppercase tracking-wider">
              Access Control Restricted
            </span>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Super Admin Access Only
            </h2>
            <p className="text-xs text-rose-200/80 max-w-md mx-auto leading-relaxed font-medium">
              Managing recruiter accounts, system roles, and security permissions is strictly reserved for Super Admin level accounts. Admin role does not have permission to alter organizational access policies.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Super Admin view state
  const [activeTab, setActiveTab] = useState<'recruiter_matrix' | 'role_definitions'>('recruiter_matrix')
  const [roles, setRoles] = useState<EnterpriseRoleData[]>(INITIAL_ROLES)
  const [recruiterUsers, setRecruiterUsers] = useState<RecruiterUserPermissionData[]>(INITIAL_RECRUITERS_PERMISSIONS)
  const [viewMode, setViewMode] = useState<'list' | 'create_role' | 'configure_permissions'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')

  // Manage Recruiter Permission Modal State
  const [selectedUserForManage, setSelectedUserForManage] = useState<RecruiterUserPermissionData | null>(null)
  const [tempUserPermissions, setTempUserPermissions] = useState<RecruiterUserPermissionData['permissions']>({
    addCandidates: true,
    submitToClients: true,
    scheduleInterviews: true,
    exportReportsCsv: false,
    viewTeamAnalytics: false,
    deleteRecords: false,
    reassignRequirements: false,
  })
  const [tempUserRoleName, setTempUserRoleName] = useState('')

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
  const [tempRolePermissions, setTempRolePermissions] = useState<Record<string, boolean>>({})

  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  // Open Manage Recruiter Permissions Modal
  const handleOpenUserPermissionModal = (user: RecruiterUserPermissionData) => {
    setSelectedUserForManage(user)
    setTempUserPermissions({ ...user.permissions })
    setTempUserRoleName(user.roleName)
  }

  // Save Recruiter Individual Permissions
  const handleSaveUserPermissions = () => {
    if (!selectedUserForManage) return
    const updatedUsers = recruiterUsers.map(u =>
      u.id === selectedUserForManage.id
        ? {
            ...u,
            roleName: tempUserRoleName,
            permissions: { ...tempUserPermissions },
          }
        : u
    )
    setRecruiterUsers(updatedUsers)
    showToast(`Permissions updated successfully for ${selectedUserForManage.name}!`)
    setSelectedUserForManage(null)
  }

  // Handle Open Full-Page Configure Role Permissions View
  const handleOpenConfigurePermissionsPage = (roleObj: EnterpriseRoleData) => {
    setEditingRole(roleObj)
    setTempRolePermissions({ ...roleObj.permissions })
    setViewMode('configure_permissions')
  }

  // Save Role Permissions from Full Page View
  const handleSaveRolePermissions = () => {
    if (!editingRole) return
    const updatedRoles = roles.map(r =>
      r.id === editingRole.id ? { ...r, permissions: { ...tempRolePermissions }, lastUpdated: 'Today' } : r
    )
    setRoles(updatedRoles)
    setViewMode('list')
    showToast(`Role permissions updated for ${editingRole.name}!`)
    setEditingRole(null)
  }

  // Handle Create Role Form Submit
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

    setNewRoleName('')
    setNewRoleDescription('')
  }

  const filteredRecruiterUsers = recruiterUsers.filter(u => {
    if (searchQuery.trim() && !u.name.toLowerCase().includes(searchQuery.toLowerCase()) && !u.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (roleFilter !== 'All Roles' && u.roleName !== roleFilter) {
      return false
    }
    return true
  })

  // -------------------------------------------------------------
  // FULL-PAGE VIEW: CONFIGURE ROLE PERMISSIONS PAGE
  // -------------------------------------------------------------
  if (viewMode === 'configure_permissions' && editingRole) {
    return (
      <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-200">
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
              onClick={() => setViewMode('list')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSaveRolePermissions}
              className="px-5 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Save className="w-4 h-4" />
              <span>Save Permission Matrix</span>
            </button>
          </div>
        </div>

        {/* PERMISSION MATRIX GRID */}
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
                    {group.permissions.filter(p => tempRolePermissions[p.key]).length} / {group.permissions.length} Enabled
                  </span>
                </div>

                <div className="space-y-2">
                  {group.permissions.map(p => {
                    const isChecked = !!tempRolePermissions[p.key]
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
                            setTempRolePermissions(prev => ({
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
      </div>
    )
  }

  // -------------------------------------------------------------
  // FULL-PAGE VIEW: CREATE NEW ROLE PAGE
  // -------------------------------------------------------------
  if (viewMode === 'create_role') {
    return (
      <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-200">
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

        <form id="create-role-full-form" onSubmit={handleCreateRoleSubmit} className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-900 font-extrabold text-sm">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>Role Information</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Role Description & Responsibilities</label>
                <textarea
                  rows={2}
                  placeholder="Describe what this role is responsible for..."
                  value={newRoleDescription}
                  onChange={e => setNewRoleDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }

  // -------------------------------------------------------------
  // MAIN ROLES & PERMISSIONS GOVERNANCE VIEW (SUPER ADMIN)
  // -------------------------------------------------------------
  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-150">
      {/* 1. TOP HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Roles & Permissions</h1>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-200 inline-flex items-center gap-1.5 shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-rose-600" />
              <span>Super Admin Governance Control</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage recruiter accounts, assigned roles, and granular security capabilities across your organization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('create_role')}
            className="px-4 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create Custom Role</span>
          </button>
        </div>
      </div>

      {/* 2. TAB NAVIGATION SWITCHER */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('recruiter_matrix')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'recruiter_matrix'
              ? 'bg-[#6B3BF6] text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Recruiters & User Permissions Matrix ({recruiterUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('role_definitions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'role_definitions'
              ? 'bg-[#6B3BF6] text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>System Role Definitions ({roles.length})</span>
        </button>
      </div>

      {/* TAB 1: RECRUITER USER PERMISSIONS MATRIX */}
      {activeTab === 'recruiter_matrix' && (
        <div className="space-y-4 animate-in fade-in duration-150">
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
                        onClick={() => handleOpenUserPermissionModal(user)}
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
      )}

      {/* TAB 2: SYSTEM ROLE DEFINITIONS GRID */}
      {activeTab === 'role_definitions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in duration-150">
          {roles.map(roleObj => (
            <div
              key={roleObj.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-2xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-purple-50 text-[#6B3BF6] font-extrabold flex items-center justify-center border border-purple-200">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-extrabold text-slate-900">{roleObj.name}</h3>
                        {roleObj.isSystem && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                            System Default
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">code: {roleObj.code}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-xl text-slate-700 text-xs font-extrabold border border-slate-200">
                    <Users className="w-3.5 h-3.5 text-purple-600" />
                    <span>{roleObj.userCount} Users</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {roleObj.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 font-medium">Updated: {roleObj.lastUpdated}</span>

                <button
                  onClick={() => handleOpenConfigurePermissionsPage(roleObj)}
                  className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-[#6B3BF6] font-extrabold rounded-xl border border-purple-200 transition-all cursor-pointer flex items-center gap-1.5 text-xs shadow-2xs"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configure Role Matrix</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. RECRUITER MANAGE PERMISSIONS MODAL */}
      {selectedUserForManage && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-[#6B3BF6] font-bold flex items-center justify-center text-sm border border-purple-200">
                  {selectedUserForManage.avatar}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Manage Permissions — {selectedUserForManage.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    {selectedUserForManage.email} • {selectedUserForManage.team}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUserForManage(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 text-xs">
              {/* Role Selection */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Assigned System Role</label>
                <select
                  value={tempUserRoleName}
                  onChange={e => setTempUserRoleName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
                >
                  <option value="Senior Technical Recruiter">Senior Technical Recruiter</option>
                  <option value="IT Recruiter">IT Recruiter</option>
                  <option value="ERP Technical Recruiter">ERP Technical Recruiter</option>
                  <option value="Junior Recruiter">Junior Recruiter</option>
                  <option value="Team Lead">Team Lead</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {/* Individual Capability Switches */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-700 mb-1">Granular Capabilities & Access Rights</label>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {[
                    { key: 'addCandidates', label: 'Add & Search Candidate Repository' },
                    { key: 'submitToClients', label: 'Submit Candidates to Client Requirements' },
                    { key: 'scheduleInterviews', label: 'Schedule Candidate Interviews' },
                    { key: 'exportReportsCsv', label: 'Export Reports & Resumes CSV' },
                    { key: 'viewTeamAnalytics', label: 'View Team Analytics & Benchmarks' },
                    { key: 'reassignRequirements', label: 'Reassign Requirements & Candidates' },
                    { key: 'deleteRecords', label: 'Delete Requirements / Candidates' },
                  ].map(cap => {
                    const isChecked = (tempUserPermissions as any)[cap.key]
                    return (
                      <label
                        key={cap.key}
                        className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-purple-50/60 border-purple-200 text-purple-950 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span>{cap.label}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() =>
                            setTempUserPermissions(prev => ({
                              ...prev,
                              [cap.key]: !(prev as any)[cap.key],
                            }))
                          }
                          className="w-4 h-4 text-[#6B3BF6] rounded focus:ring-[#6B3BF6] cursor-pointer"
                        />
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedUserForManage(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveUserPermissions}
                className="px-5 py-2 text-xs font-bold bg-[#6B3BF6] text-white rounded-xl hover:bg-[#5833E0] shadow-xs cursor-pointer active:scale-98 flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Recruiter Permissions</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-12 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
