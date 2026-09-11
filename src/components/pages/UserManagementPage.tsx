import React, { useState, useMemo } from 'react'
import {
  Users,
  UserPlus,
  KeyRound,
  ShieldCheck,
  Search,
  ArrowLeft,
  Save,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  Shield,
  Lock,
  RefreshCw,
  Eye,
  EyeOff,
  Send,
  AlertCircle,
  Building,
  Building2,
  User,
  Sliders,
  Check,
  RotateCcw,
  Plus,
  Edit2,
  Trash2,
  X,
  CheckSquare,
  Square,
  UserCheck,
  Sparkles,
  Key,
  Filter,
} from 'lucide-react'
import { Role } from '../../types'

export interface UserAccountData {
  id: string
  name: string
  email: string
  phone: string
  employeeId: string
  role: 'Super Admin' | 'Admin' | 'Team Lead' | 'Recruiter' | 'Client Reviewer' | 'Dev Team'
  roleCode: string
  team: string
  supervisor: string
  assignedClient?: string
  status: 'Active' | 'Locked' | 'Pending Invite'
  twoFactorEnabled: boolean
  lastLogin: string
  lastPasswordChange: string
}

export interface RecruiterUserPermissionData {
  id: string
  name: string
  email: string
  roleName: string
  roleCode: string
  team: string
  avatar: string
  assignedClient?: string
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
    email: 'harish.g@metaforgeit.com',
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
    name: 'Arvind GR',
    email: 'arvind.gr@metaforgeit.com',
    roleName: 'Senior Technical Recruiter',
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
    id: 'user-3',
    name: 'Charlie Darwin',
    email: 'charlie.d@metaforgeit.com',
    roleName: 'Team Lead',
    roleCode: 'lead',
    team: 'Automotive Pod',
    avatar: 'C',
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
    id: 'user-4',
    name: 'Harini Sindey',
    email: 'harini.s@metaforgeit.com',
    roleName: 'ERP Technical Recruiter',
    roleCode: 'recruiter',
    team: 'ERP & SAP Pod',
    avatar: 'H',
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
    name: 'Puttapaka Saiteja',
    email: 'saiteja.p@metaforgeit.com',
    roleName: 'Junior Recruiter',
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
    id: 'user-6',
    name: 'Sarah Kim',
    email: 'sarah.k@metaforgeit.com',
    roleName: 'Admin',
    roleCode: 'admin',
    team: 'Executive Operations',
    avatar: 'S',
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

const INITIAL_USERS: UserAccountData[] = [
  {
    id: 'usr-101',
    name: 'Harish Gadipally',
    email: 'harish.g@metaforgeit.com',
    phone: '+91 98765 12345',
    employeeId: 'EMP-2024-001',
    role: 'Recruiter',
    roleCode: 'recruiter',
    team: 'Engineering Team',
    supervisor: 'Charlie Darwin (Lead)',
    assignedClient: 'Accenture',
    status: 'Active',
    twoFactorEnabled: true,
    lastLogin: 'Today • 09:30 AM',
    lastPasswordChange: '15 Jul 2026',
  },
  {
    id: 'usr-102',
    name: 'Arvind GR',
    email: 'arvind.gr@metaforgeit.com',
    phone: '+91 98123 45678',
    employeeId: 'EMP-2024-002',
    role: 'Recruiter',
    roleCode: 'recruiter',
    team: 'Engineering Team',
    supervisor: 'Charlie Darwin (Lead)',
    assignedClient: 'Accenture',
    status: 'Active',
    twoFactorEnabled: false,
    lastLogin: 'Today • 10:15 AM',
    lastPasswordChange: '01 Jun 2026',
  },
  {
    id: 'usr-103',
    name: 'Charlie Darwin',
    email: 'charlie.d@metaforgeit.com',
    phone: '+91 97654 32109',
    employeeId: 'EMP-2023-014',
    role: 'Team Lead',
    roleCode: 'lead',
    team: 'Automotive Team',
    supervisor: 'Super Admin Governance',
    assignedClient: 'Deloitte',
    status: 'Active',
    twoFactorEnabled: true,
    lastLogin: 'Today • 08:45 AM',
    lastPasswordChange: '10 Aug 2026',
  },
  {
    id: 'usr-104',
    name: 'Harini Sindey',
    email: 'harini.s@metaforgeit.com',
    phone: '+91 99887 76655',
    employeeId: 'EMP-2024-009',
    role: 'Recruiter',
    roleCode: 'recruiter',
    team: 'ERP & SAP Team',
    supervisor: 'Charlie Darwin (Lead)',
    assignedClient: 'Google',
    status: 'Active',
    twoFactorEnabled: true,
    lastLogin: 'Yesterday • 04:20 PM',
    lastPasswordChange: '20 May 2026',
  },
  {
    id: 'usr-105',
    name: 'Puttapaka Saiteja',
    email: 'saiteja.p@metaforgeit.com',
    phone: '+91 91234 56789',
    employeeId: 'EMP-2024-012',
    role: 'Recruiter',
    roleCode: 'recruiter',
    team: 'Engineering Team',
    supervisor: 'Charlie Darwin (Lead)',
    assignedClient: 'MetaForge',
    status: 'Active',
    twoFactorEnabled: false,
    lastLogin: 'Today • 11:05 AM',
    lastPasswordChange: '12 Apr 2026',
  },
  {
    id: 'usr-106',
    name: 'Sarah Kim',
    email: 'sarah.k@metaforgeit.com',
    phone: '+91 95555 44433',
    employeeId: 'EMP-2022-003',
    role: 'Admin',
    roleCode: 'admin',
    team: 'Executive Operations',
    supervisor: 'Super Admin Governance',
    assignedClient: 'All Clients',
    status: 'Active',
    twoFactorEnabled: true,
    lastLogin: 'Today • 08:00 AM',
    lastPasswordChange: '05 Aug 2026',
  },
]

interface UserManagementPageProps {
  role?: Role
  initialTab?: 'users' | 'permissions' | 'role_definitions'
}

export function UserManagementPage({ role = 'superadmin', initialTab = 'users' }: UserManagementPageProps) {
  const canModifyUsers = role === 'superadmin' || role === 'devteam'
  const [activeTab, setActiveTab] = useState<'users' | 'permissions' | 'role_definitions'>(initialTab)

  const [users, setUsers] = useState<UserAccountData[]>(INITIAL_USERS)
  const [roles, setRoles] = useState<EnterpriseRoleData[]>(INITIAL_ROLES)
  const [recruiterUsers, setRecruiterUsers] = useState<RecruiterUserPermissionData[]>(INITIAL_RECRUITERS_PERMISSIONS)

  const [viewMode, setViewMode] = useState<'list' | 'create_user' | 'reset_password' | 'assign_role' | 'create_role' | 'configure_permissions'>('list')
  const [selectedUser, setSelectedUser] = useState<UserAccountData | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')

  // Create User Form State
  const [newUserName, setNewUserName] = useState('')
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserPhone, setNewUserPhone] = useState('')
  const [newUserEmpId, setNewUserEmpId] = useState('')
  const [newUserRole, setNewUserRole] = useState<'Super Admin' | 'Admin' | 'Team Lead' | 'Recruiter' | 'Dev Team'>('Recruiter')
  const [newUserTeam, setNewUserTeam] = useState('Engineering Team')
  const [newUserSupervisor, setNewUserSupervisor] = useState('Charlie Darwin (Lead)')
  const [newUserClient, setNewUserClient] = useState('Accenture')
  const [tempPassword, setTempPassword] = useState('Pass@2026#Temp')

  // Reset Password State
  const [resetNewPass, setResetNewPass] = useState('')
  const [resetConfirmPass, setResetConfirmPass] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [forceChangePass, setForceChangePass] = useState(true)
  const [sendEmailNotify, setSendEmailNotify] = useState(true)

  // Assign Role & Adjust Client State
  const [targetRole, setTargetRole] = useState<'Super Admin' | 'Admin' | 'Team Lead' | 'Recruiter' | 'Client Reviewer' | 'Dev Team'>('Recruiter')
  const [targetClient, setTargetClient] = useState<string>('Accenture')
  const [reassignReason, setReassignReason] = useState('')
  const [adjustClientUser, setAdjustClientUser] = useState<UserAccountData | null>(null)

  // Open Quick Adjust Client Modal
  const openAdjustClientModal = (user: UserAccountData) => {
    if (!canModifyUsers) {
      showToast('Access Restricted: Only Super Admin and Dev Team can adjust client assignments.')
      return
    }
    setAdjustClientUser(user)
    setTargetClient(user.assignedClient || 'Accenture')
  }

  // Manage Recruiter Individual Permission Modal State
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

  // Create Role Form State
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

  // Full-Page Configure Role Permissions State
  const [editingRole, setEditingRole] = useState<EnterpriseRoleData | null>(null)
  const [tempRolePermissions, setTempRolePermissions] = useState<Record<string, boolean>>({})

  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  // Filtered Users for Tab 1
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      if (roleFilter !== 'All Roles' && u.role !== roleFilter) {
        return false
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return (
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.employeeId.toLowerCase().includes(q) ||
          u.team.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [users, searchQuery, roleFilter])

  // Filtered Recruiter Matrix Users for Tab 2
  const filteredRecruiterUsers = useMemo(() => {
    return recruiterUsers.filter(u => {
      if (searchQuery.trim() && !u.name.toLowerCase().includes(searchQuery.toLowerCase()) && !u.email.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      if (roleFilter !== 'All Roles' && u.roleName !== roleFilter) {
        return false
      }
      return true
    })
  }, [recruiterUsers, searchQuery, roleFilter])

  // Open Reset Password Page
  const openResetPasswordPage = (user: UserAccountData) => {
    if (!canModifyUsers) {
      showToast('Access Restricted: Only Super Admin and Dev Team can reset user passwords.')
      return
    }
    setSelectedUser(user)
    setResetNewPass('Pass@' + Math.floor(1000 + Math.random() * 9000))
    setResetConfirmPass('')
    setViewMode('reset_password')
  }

  // Open Assign Role Page
  const openAssignRolePage = (user: UserAccountData) => {
    if (!canModifyUsers) {
      showToast('Access Restricted: Only Super Admin and Dev Team can edit or reassign user roles.')
      return
    }
    setSelectedUser(user)
    setTargetRole(user.role)
    setTargetClient(user.assignedClient || 'Accenture')
    setReassignReason('')
    setViewMode('assign_role')
  }

  // Open Manage Individual Permissions Modal for a user
  const openManageUserPermissionsModal = (user: UserAccountData | RecruiterUserPermissionData) => {
    if (!canModifyUsers) {
      showToast('Access Restricted: Only Super Admin can modify individual user permission capabilities.')
      return
    }
    const existing = recruiterUsers.find(r => r.email === user.email || r.name === user.name)
    if (existing) {
      setSelectedUserForManage(existing)
      setTempUserPermissions({ ...existing.permissions })
      setTempUserRoleName(existing.roleName)
    } else {
      const dummy: RecruiterUserPermissionData = {
        id: user.id,
        name: user.name,
        email: user.email,
        roleName: (user as UserAccountData).role || 'Recruiter',
        roleCode: (user as UserAccountData).roleCode || 'recruiter',
        team: (user as UserAccountData).team || 'Engineering Pod',
        avatar: user.name.charAt(0),
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
      }
      setSelectedUserForManage(dummy)
      setTempUserPermissions(dummy.permissions)
      setTempUserRoleName(dummy.roleName)
    }
  }

  // Save Recruiter Individual Permissions
  const handleSaveUserPermissions = () => {
    if (!selectedUserForManage) return
    const updated = recruiterUsers.map(u =>
      u.id === selectedUserForManage.id
        ? {
            ...u,
            roleName: tempUserRoleName,
            permissions: { ...tempUserPermissions },
          }
        : u
    )
    if (!recruiterUsers.some(u => u.id === selectedUserForManage.id)) {
      setRecruiterUsers([...recruiterUsers, { ...selectedUserForManage, roleName: tempUserRoleName, permissions: tempUserPermissions }])
    } else {
      setRecruiterUsers(updated)
    }
    showToast(`Permissions updated successfully for ${selectedUserForManage.name}!`)
    setSelectedUserForManage(null)
  }

  // Handle Delete User
  const handleDeleteUser = (userId: string, userName: string) => {
    if (!canModifyUsers) {
      showToast('Access Restricted: Only Super Admin and Dev Team can delete user accounts.')
      return
    }
    setUsers(prev => prev.filter(u => u.id !== userId))
    setRecruiterUsers(prev => prev.filter(u => u.id !== userId))
    showToast(`User account for ${userName} has been removed.`)
  }

  // Handle Create User Submit
  const handleCreateUserSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canModifyUsers) {
      showToast('Access Restricted: Admin has view-only permissions.')
      setViewMode('list')
      return
    }
    if (!newUserName.trim() || !newUserEmail.trim()) return

    const newRecord: UserAccountData = {
      id: `usr-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      phone: newUserPhone.trim() || '+91 98765 00000',
      employeeId: newUserEmpId.trim() || `EMP-2026-${Math.floor(100 + Math.random() * 900)}`,
      role: newUserRole,
      roleCode: newUserRole.toLowerCase().replace(/\s+/g, '_'),
      team: newUserTeam,
      supervisor: newUserSupervisor,
      assignedClient: newUserClient,
      status: 'Active',
      twoFactorEnabled: true,
      lastLogin: 'Never (New Account)',
      lastPasswordChange: 'Just now',
    }

    setUsers([newRecord, ...users])
    setViewMode('list')
    showToast(`Successfully created user account for ${newUserName} (Client: ${newUserClient})`)

    setNewUserName('')
    setNewUserEmail('')
    setNewUserPhone('')
    setNewUserEmpId('')
  }

  // Handle Reset Password Submit
  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser || !resetNewPass) return

    setUsers(prev =>
      prev.map(u =>
        u.id === selectedUser.id ? { ...u, lastPasswordChange: 'Today (Reset by Admin)' } : u
      )
    )
    setViewMode('list')
    showToast(`Password successfully reset for ${selectedUser.name}!`)
    setSelectedUser(null)
  }

  // Handle Assign Role & Adjust Client Submit
  const handleAssignRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return

    setUsers(prev =>
      prev.map(u =>
        u.id === selectedUser.id
          ? {
              ...u,
              role: targetRole,
              roleCode: targetRole.toLowerCase().replace(/\s+/g, '_'),
              assignedClient: targetClient,
            }
          : u
      )
    )
    setRecruiterUsers(prev =>
      prev.map(r =>
        r.id === selectedUser.id || r.email === selectedUser.email
          ? { ...r, assignedClient: targetClient }
          : r
      )
    )
    setViewMode('list')
    showToast(`Updated role to "${targetRole}" & client to "${targetClient}" for ${selectedUser.name}`)
    setSelectedUser(null)
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

  // Handle Save Role Permissions
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
              title="Back to User Management"
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
                Enable or restrict module-level capabilities for all users assigned to the <strong>{editingRole.name}</strong> role.
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
              onClick={handleSaveRolePermissions}
              className="px-5 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Save className="w-4 h-4" />
              <span>Save Role Matrix</span>
            </button>
          </div>
        </div>

        {/* ROLE HEADER CARD */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase bg-purple-500/20 border border-purple-400/30 text-purple-300">
                Code: {editingRole.code}
              </span>
              {editingRole.isSystem && (
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 border border-amber-400/30 text-amber-300">
                  System Guarded
                </span>
              )}
            </div>
            <h2 className="text-xl font-extrabold text-white">{editingRole.name} Role</h2>
            <p className="text-xs text-slate-300 max-w-2xl">{editingRole.description}</p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 shrink-0 text-center sm:text-right">
            <div className="text-xs text-slate-400 font-medium">Assigned Users</div>
            <div className="text-xl font-extrabold text-purple-400">{editingRole.userCount} Accounts</div>
          </div>
        </div>

        {/* PERMISSIONS MATRIX PER MODULE */}
        <div className="space-y-6">
          {DEFAULT_MODULE_PERMISSIONS.map(group => (
            <div key={group.module} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#6B3BF6]" />
                  <span>{group.module}</span>
                </h3>

                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...tempRolePermissions }
                      group.permissions.forEach(p => (updated[p.key] = true))
                      setTempRolePermissions(updated)
                    }}
                    className="text-purple-600 hover:text-purple-800 font-bold hover:underline cursor-pointer"
                  >
                    Select All
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...tempRolePermissions }
                      group.permissions.forEach(p => (updated[p.key] = false))
                      setTempRolePermissions(updated)
                    }}
                    className="text-slate-500 hover:text-slate-700 font-bold hover:underline cursor-pointer"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {group.permissions.map(p => {
                  const isChecked = tempRolePermissions[p.key] ?? p.enabled
                  return (
                    <label
                      key={p.key}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-purple-50/50 border-purple-200 text-purple-950 font-bold'
                          : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-xs font-semibold">{p.label}</span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={e => {
                          setTempRolePermissions({
                            ...tempRolePermissions,
                            [p.key]: e.target.checked,
                          })
                        }}
                        className="w-4 h-4 text-[#6B3BF6] rounded-md cursor-pointer focus:ring-[#6B3BF6]"
                      />
                    </label>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveRolePermissions}
            className="px-6 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>Save Role Permissions Matrix</span>
          </button>
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
              title="Back to User Management"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Plus className="w-6 h-6 text-[#6B3BF6]" />
                <span>Create New System Role</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Define custom operational roles, set baseline security templates, and grant module permissions.
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
            <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#6B3BF6]" />
              <span>1. Role Identity & Description</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Role Title / Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sourcing Specialist Lead"
                  value={newRoleName}
                  onChange={e => setNewRoleName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Base Permission Template</label>
                <select
                  value={newRoleTemplate}
                  onChange={e => setNewRoleTemplate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="recruiter">Recruiter Template (Standard Pipeline Access)</option>
                  <option value="lead">Team Lead Template (Supervisory Scope)</option>
                  <option value="admin">Admin Template (Operations & Compliance)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Description & Operational Scope</label>
                <textarea
                  rows={2}
                  placeholder="Brief summary of duties and permissions granted to this role..."
                  value={newRoleDescription}
                  onChange={e => setNewRoleDescription(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>
            </div>
          </div>

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
              <span>Create System Role</span>
            </button>
          </div>
        </form>
      </div>
    )
  }

  // -------------------------------------------------------------
  // DEDICATED FULL-PAGE VIEW: CREATE NEW USER PAGE
  // -------------------------------------------------------------
  if (viewMode === 'create_user') {
    return (
      <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-200">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('list')}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-slate-200"
              title="Back to User Management"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <UserPlus className="w-6 h-6 text-[#6B3BF6]" />
                <span>Create New User Account</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Provision new employee accounts, assign organizational roles, and issue initial security credentials.
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
              form="create-user-full-form"
              type="submit"
              className="px-5 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Save className="w-4 h-4" />
              <span>Save & Provision User</span>
            </button>
          </div>
        </div>

        <form id="create-user-full-form" onSubmit={handleCreateUserSubmit} className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-900 font-extrabold text-sm">
              <User className="w-5 h-5 text-blue-600" />
              <span>1. User Personal Details & Identity</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Sen"
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Official Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="vikram.sen@metaforgeit.com"
                  value={newUserEmail}
                  onChange={e => setNewUserEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Mobile Contact Number</label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={newUserPhone}
                  onChange={e => setNewUserPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Employee ID</label>
                <input
                  type="text"
                  placeholder="EMP-2026-045"
                  value={newUserEmpId}
                  onChange={e => setNewUserEmpId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-900 font-extrabold text-sm">
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              <span>2. Role Governance & Team Assignment</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Assign System Role *</label>
                <select
                  value={newUserRole}
                  onChange={e => setNewUserRole(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-purple-50/70 border border-purple-200 rounded-xl text-xs font-bold text-[#6B3BF6] focus:outline-none cursor-pointer"
                >
                  <option value="Recruiter">Recruiter (Sourcing & Pipeline Access)</option>
                  <option value="Team Lead">Team Lead (Team Supervision Access)</option>
                  <option value="Admin">Admin (Full Operational Control)</option>
                  <option value="Super Admin">Super Admin (System Governance)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Assigned Client Account *</label>
                <select
                  value={newUserClient}
                  onChange={e => setNewUserClient(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs font-bold text-blue-800 focus:outline-none cursor-pointer"
                >
                  <option value="Accenture">Accenture</option>
                  <option value="Deloitte">Deloitte</option>
                  <option value="MetaForge">MetaForge IT Solutions</option>
                  <option value="Google">Google</option>
                  <option value="Microsoft">Microsoft</option>
                  <option value="TCS">TCS</option>
                  <option value="Infosys">Infosys</option>
                  <option value="Wipro">Wipro</option>
                  <option value="All Clients">All Clients</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Assigned Hiring Team</label>
                <select
                  value={newUserTeam}
                  onChange={e => setNewUserTeam(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="Engineering Team">Engineering Team</option>
                  <option value="Automotive Team">Automotive Team</option>
                  <option value="ERP & SAP Team">ERP & SAP Team</option>
                  <option value="Executive Operations">Executive Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Direct Reporting Supervisor</label>
                <input
                  type="text"
                  value={newUserSupervisor}
                  onChange={e => setNewUserSupervisor(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-900 font-extrabold text-sm">
              <KeyRound className="w-5 h-5 text-emerald-600" />
              <span>3. Initial Temporary Password & Security Options</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Initial Temporary Password</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempPassword}
                    onChange={e => setTempPassword(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setTempPassword('Pass@' + Math.floor(10000 + Math.random() * 90000))}
                    className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Generate</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#6B3BF6] rounded-md" />
                  <span>Force password reset on first login</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#6B3BF6] rounded-md" />
                  <span>Send welcome email with login credentials</span>
                </label>
              </div>
            </div>
          </div>

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
              <span>Save & Provision User Account</span>
            </button>
          </div>
        </form>
      </div>
    )
  }

  // -------------------------------------------------------------
  // DEDICATED FULL-PAGE VIEW: RESET USER PASSWORD PAGE
  // -------------------------------------------------------------
  if (viewMode === 'reset_password' && selectedUser) {
    return (
      <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-200">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('list')}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-slate-200"
              title="Back to User Management"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <KeyRound className="w-6 h-6 text-rose-600" />
                <span>Reset User Security Password</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Issue a new password, invalidate active sessions, and send temporary credentials securely.
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
              form="reset-password-full-form"
              type="submit"
              className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>Reset & Send Credentials</span>
            </button>
          </div>
        </div>

        <form id="reset-password-full-form" onSubmit={handleResetPasswordSubmit} className="space-y-6 max-w-3xl">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-md border border-slate-700 space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Target User Account
            </span>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 font-extrabold flex items-center justify-center text-lg border border-purple-500/30">
                {selectedUser.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">{selectedUser.name}</h3>
                <p className="text-xs text-purple-300 font-bold">{selectedUser.email} • {selectedUser.employeeId}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Role: {selectedUser.role} • Last Changed: {selectedUser.lastPasswordChange}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-slate-900 font-extrabold text-sm flex items-center gap-2">
                <Lock className="w-5 h-5 text-rose-600" />
                <span>Enter New Password Credentials</span>
              </span>

              <button
                type="button"
                onClick={() => {
                  const gen = 'Pass@' + Math.floor(10000 + Math.random() * 90000)
                  setResetNewPass(gen)
                  setResetConfirmPass(gen)
                  showToast('Generated strong password')
                }}
                className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-[#6B3BF6] text-xs font-bold rounded-xl border border-purple-200 cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Auto-Generate Password</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">New Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={resetNewPass}
                    onChange={e => setResetNewPass(e.target.value)}
                    placeholder="Enter new password..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-900 focus:outline-none focus:border-[#6B3BF6]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 font-medium">
                <label className="flex items-center gap-2.5 cursor-pointer text-slate-800">
                  <input
                    type="checkbox"
                    checked={forceChangePass}
                    onChange={e => setForceChangePass(e.target.checked)}
                    className="w-4 h-4 text-[#6B3BF6] rounded-md"
                  />
                  <span>Force user to change password upon next login session</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-slate-800">
                  <input
                    type="checkbox"
                    checked={sendEmailNotify}
                    onChange={e => setSendEmailNotify(e.target.checked)}
                    className="w-4 h-4 text-[#6B3BF6] rounded-md"
                  />
                  <span>Send temporary password to user email ({selectedUser.email})</span>
                </label>
              </div>
            </div>
          </div>

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
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>Reset & Issue New Credentials</span>
            </button>
          </div>
        </form>
      </div>
    )
  }

  // -------------------------------------------------------------
  // DEDICATED FULL-PAGE VIEW: ASSIGN ROLE PAGE
  // -------------------------------------------------------------
  if (viewMode === 'assign_role' && selectedUser) {
    return (
      <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-200">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('list')}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-slate-200"
              title="Back to User Management"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#6B3BF6]" />
                <span>Reassign User Role & Security Scope</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Update user access permissions, assign leadership scope, and record compliance audit reason.
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
              form="assign-role-full-form"
              type="submit"
              className="px-5 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Save className="w-4 h-4" />
              <span>Update & Apply New Role</span>
            </button>
          </div>
        </div>

        <form id="assign-role-full-form" onSubmit={handleAssignRoleSubmit} className="space-y-6 max-w-4xl">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#5B51D8] font-extrabold flex items-center justify-center text-lg border border-[#C7D2FE]">
                {selectedUser.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">{selectedUser.name}</h3>
                <p className="text-xs text-[#6B3BF6] font-bold">{selectedUser.email} • {selectedUser.team}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Current Role: <strong className="text-slate-900">{selectedUser.role}</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <span className="text-slate-900 font-extrabold text-sm block border-b border-slate-100 pb-3">
              Select Target Role Level
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {[
                { name: 'Super Admin', desc: 'Unrestricted system-wide governance, billing & user management.' },
                { name: 'Admin', desc: 'Full operational control over requirements, teams & reports.' },
                { name: 'Team Lead', desc: 'Supervises recruiter team, submission targets & interviews.' },
                { name: 'Recruiter', desc: 'Sourcing, candidate submissions & interview tracking.' },
              ].map(r => (
                <label
                  key={r.name}
                  onClick={() => setTargetRole(r.name as any)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    targetRole === r.name
                      ? 'bg-purple-50/70 border-purple-300 ring-2 ring-purple-500/20'
                      : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="roleSelection"
                    checked={targetRole === r.name}
                    onChange={() => setTargetRole(r.name as any)}
                    className="mt-1 text-[#6B3BF6] focus:ring-[#6B3BF6]"
                  />
                  <div>
                    <h4 className="font-extrabold text-slate-900">{r.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{r.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="pt-3">
              <label className="block text-slate-700 font-bold text-xs mb-1.5">Reason for Role Reassignment (Audit Log)</label>
              <textarea
                rows={2}
                placeholder="Specify reason for promotion/reassignment..."
                value={reassignReason}
                onChange={e => setReassignReason(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
              />
            </div>
          </div>

          {/* CLIENT ACCOUNT ASSIGNMENT */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <span className="text-slate-900 font-extrabold text-sm block border-b border-slate-100 pb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#6B3BF6]" />
              <span>Adjust Client Account Assignment</span>
            </span>

            <div className="space-y-2">
              <label className="block text-slate-700 font-bold text-xs">
                Assigned Client Account for {selectedUser.name}
              </label>
              <select
                value={targetClient}
                onChange={e => setTargetClient(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
              >
                <option value="Accenture">Accenture</option>
                <option value="Deloitte">Deloitte</option>
                <option value="MetaForge">MetaForge IT Solutions</option>
                <option value="Google">Google</option>
                <option value="Microsoft">Microsoft</option>
                <option value="TCS">Tata Consultancy Services (TCS)</option>
                <option value="Infosys">Infosys</option>
                <option value="Wipro">Wipro</option>
                <option value="All Clients">All Clients (Executive Oversight)</option>
              </select>
              <p className="text-[10px] text-slate-500 font-medium">
                Adjusting this client assignment links all requirements, candidate submissions, and delivery SLAs for this {targetRole} to the selected client account.
              </p>
            </div>
          </div>

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
              <span>Update & Apply New Role</span>
            </button>
          </div>
        </form>
      </div>
    )
  }

  // -------------------------------------------------------------
  // MAIN CONSOLIDATED GOVERNANCE VIEW (TABS: USERS | PERMISSIONS | ROLE_DEFINITIONS)
  // -------------------------------------------------------------
  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800">
      {/* VIEW-ONLY BANNER FOR NON-SUPERADMIN/DEVTEAM ROLES */}
      {!canModifyUsers && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-2xl flex items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center font-bold shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="font-extrabold text-xs text-amber-900">Read-Only Mode (Admin Console Access)</p>
              <p className="text-[11px] text-amber-800 font-medium">
                Admin users have view-only access to user & access governance. Creating accounts, modifying role matrices, and individual permission overrides are reserved for <strong>Super Admin</strong>.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-amber-200/60 text-amber-900 text-[10px] font-extrabold rounded-full border border-amber-300 shrink-0">
            View-Only
          </span>
        </div>
      )}

      {/* 1. TOP HEADER & TOP TAB NAVIGATION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User & Access Governance</h1>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-100 text-[#6B3BF6] border border-purple-200 inline-flex items-center gap-1.5 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6B3BF6]" />
              <span>Super Admin Portal</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Provision accounts, manage security credentials, define enterprise roles, and configure granular permission matrices.
          </p>
        </div>

        {/* TOP NAVIGATION TABS */}
        <div className="bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('users')
              setViewMode('list')
            }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'users'
                ? 'bg-white text-purple-700 shadow-xs border border-purple-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-[#6B3BF6]" />
            <span>User Accounts & Access</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('permissions')
              setViewMode('list')
            }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'permissions'
                ? 'bg-white text-purple-700 shadow-xs border border-purple-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4 text-[#6B3BF6]" />
            <span>Manage Permissions Matrix</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('role_definitions')
              setViewMode('list')
            }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'role_definitions'
                ? 'bg-white text-purple-700 shadow-xs border border-purple-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4 text-[#6B3BF6]" />
            <span>System Role Definitions</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: USER ACCOUNTS & ACCESS                                              */}
      {/* ========================================================================= */}
      {activeTab === 'users' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Total Active Accounts
                </span>
                <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">{users.length}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#6B3BF6]">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Recruiter Accounts
                </span>
                <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
                  {users.filter(u => u.role === 'Recruiter').length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#6B3BF6]">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  2FA Security Enforced
                </span>
                <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
                  {users.filter(u => u.twoFactorEnabled).length} Accounts
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#6B3BF6]">
                <Lock className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* SEARCH & FILTER BAR */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search user name, email, employee ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6]"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
                className="px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
              >
                <option value="All Roles">All System Roles</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Admin">Admin</option>
                <option value="Dev Team">Dev Team</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Recruiter">Recruiter</option>
              </select>

              {canModifyUsers && (
                <button
                  onClick={() => setViewMode('create_user')}
                  className="px-4 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98 whitespace-nowrap"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>+ Create User</span>
                </button>
              )}
            </div>
          </div>

          {/* USERS TABLE */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-4">USER & EMAIL</th>
                    <th className="py-3.5 px-4">ROLE & TEAM</th>
                    <th className="py-3.5 px-4">ASSIGNED CLIENT</th>
                    <th className="py-3.5 px-4">SECURITY & LAST LOGIN</th>
                    <th className="py-3.5 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-purple-50/30 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-[#EEF2FF] text-[#5B51D8] font-extrabold flex items-center justify-center text-sm shrink-0 border border-[#C7D2FE]">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-slate-900 font-extrabold text-xs flex items-center gap-1.5">
                              <span>{user.name}</span>
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                                {user.employeeId}
                              </span>
                            </div>
                            <div className="text-[11px] text-blue-700 font-semibold mt-0.5">{user.email}</div>
                            <div className="text-[10px] text-slate-500 font-normal mt-0.5">{user.phone}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <span className="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-purple-100 text-[#6B3BF6] border border-purple-200 inline-block">
                            {user.role}
                          </span>
                          <div className="text-[11px] text-slate-900 font-bold">{user.team}</div>
                          <div className="text-[10px] text-slate-500">Supervisor: {user.supervisor}</div>
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs">
                          <Building2 className="w-3.5 h-3.5 text-blue-600 inline" />
                          <span>{user.assignedClient || 'Accenture'}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                            <span>{user.status}</span>
                          </span>
                          <div className="text-[10px] text-slate-600 font-medium">
                            Last Login: <strong className="text-slate-900">{user.lastLogin}</strong>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-right whitespace-nowrap space-x-2">
                        {canModifyUsers ? (
                          <>
                            <button
                              onClick={() => openAdjustClientModal(user)}
                              className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold cursor-pointer inline-flex items-center gap-1 text-xs border border-blue-200 shadow-2xs transition-all active:scale-98"
                              title="Adjust Assigned Client Account"
                            >
                              <Building2 className="w-3.5 h-3.5 text-blue-600" />
                              <span>Adjust Client</span>
                            </button>

                            <button
                              onClick={() => openManageUserPermissionsModal(user)}
                              className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold cursor-pointer inline-flex items-center gap-1 text-xs border border-indigo-200 shadow-2xs transition-all active:scale-98"
                              title="Manage Individual User Permissions"
                            >
                              <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                              <span>Manage Permissions</span>
                            </button>

                            <button
                              onClick={() => openAssignRolePage(user)}
                              className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6B3BF6] font-extrabold cursor-pointer inline-flex items-center gap-1 text-xs border border-purple-200 shadow-2xs transition-all active:scale-98"
                            >
                              <ShieldCheck className="w-3.5 h-3.5 text-[#6B3BF6]" />
                              <span>Edit Role</span>
                            </button>

                            <button
                              onClick={() => openResetPasswordPage(user)}
                              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold cursor-pointer inline-flex items-center gap-1 text-xs border border-rose-200 shadow-2xs transition-all active:scale-98"
                            >
                              <KeyRound className="w-3.5 h-3.5 text-rose-600" />
                              <span>Reset Password</span>
                            </button>

                            <button
                              onClick={() => handleDeleteUser(user.id, user.name)}
                              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-700 font-extrabold cursor-pointer inline-flex items-center gap-1 text-xs border border-slate-200 hover:border-rose-200 shadow-2xs transition-all active:scale-98"
                              title="Delete user account"
                            >
                              <XCircle className="w-3.5 h-3.5 text-rose-500" />
                              <span>Delete</span>
                            </button>
                          </>
                        ) : (
                          <span className="px-2.5 py-1.5 bg-slate-100 text-slate-500 rounded-xl text-xs font-bold border border-slate-200 inline-flex items-center gap-1 cursor-not-allowed">
                            <Lock className="w-3 h-3 text-slate-400" />
                            <span>View Only</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MANAGE PERMISSIONS MATRIX (RECRUITER INDIVIDUAL ACCESS)             */}
      {/* ========================================================================= */}
      {activeTab === 'permissions' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* SEARCH & FILTER BAR */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search recruiter name, email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6]"
              />
            </div>

            <div className="w-full sm:w-56">
              <select
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
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

          {/* PERMISSIONS MATRIX TABLE */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-4">USER & ROLE</th>
                    <th className="py-3.5 px-4 text-center">ADD CANDIDATES</th>
                    <th className="py-3.5 px-4 text-center">SUBMIT TO CLIENTS</th>
                    <th className="py-3.5 px-4 text-center">SCHEDULE INTERVIEWS</th>
                    <th className="py-3.5 px-4 text-center">EXPORT REPORTS</th>
                    <th className="py-3.5 px-4 text-center">TEAM ANALYTICS</th>
                    <th className="py-3.5 px-4 text-center">REASSIGN REQS</th>
                    <th className="py-3.5 px-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                  {filteredRecruiterUsers.map(user => (
                    <tr key={user.id} className="hover:bg-purple-50/30 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-900 max-w-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#6B3BF6] font-extrabold flex items-center justify-center text-xs shrink-0 border border-purple-200">
                            {user.avatar}
                          </div>
                          <div>
                            <div className="text-slate-900 font-extrabold text-xs">{user.name}</div>
                            <div className="text-[11px] text-[#6B3BF6] font-bold mt-0.5">{user.roleName}</div>
                            <div className="text-[10px] text-slate-500 font-normal">{user.team}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center">
                        {user.permissions.addCandidates ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Enabled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-200">
                            <XCircle className="w-3 h-3 text-rose-600" /> Disabled
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-center">
                        {user.permissions.submitToClients ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Enabled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-200">
                            <XCircle className="w-3 h-3 text-rose-600" /> Disabled
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-center">
                        {user.permissions.scheduleInterviews ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Enabled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-200">
                            <XCircle className="w-3 h-3 text-rose-600" /> Disabled
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-center">
                        {user.permissions.exportReportsCsv ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Enabled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-600 border border-slate-200">
                            Off
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-center">
                        {user.permissions.viewTeamAnalytics ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Enabled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-600 border border-slate-200">
                            Off
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-center">
                        {user.permissions.reassignRequirements ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Enabled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-600 border border-slate-200">
                            Off
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => openManageUserPermissionsModal(user)}
                          className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6B3BF6] font-extrabold cursor-pointer inline-flex items-center gap-1 text-xs border border-purple-200 shadow-2xs transition-all active:scale-98"
                        >
                          <Sliders className="w-3.5 h-3.5 text-[#6B3BF6]" />
                          <span>Manage Permissions</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SYSTEM ROLE DEFINITIONS                                            */}
      {/* ========================================================================= */}
      {activeTab === 'role_definitions' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#6B3BF6]" />
              <span>Enterprise System Role Definitions</span>
            </h2>

            {canModifyUsers && (
              <button
                onClick={() => setViewMode('create_role')}
                className="px-4 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <Plus className="w-4 h-4" />
                <span>+ Create New Role</span>
              </button>
            )}
          </div>

          {/* ROLE CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map(r => (
              <div
                key={r.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-purple-50 text-[#6B3BF6] flex items-center justify-center font-extrabold border border-purple-100">
                        <Shield className="w-4 h-4" />
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900">{r.name}</h3>
                    </div>

                    {r.isSystem ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-200">
                        System Guarded
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-900 border border-blue-200">
                        Custom Role
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {r.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    Active Users: <strong className="text-slate-900 font-extrabold">{r.userCount} Accounts</strong>
                  </div>

                  {canModifyUsers ? (
                    <button
                      onClick={() => {
                        setEditingRole(r)
                        setTempRolePermissions({ ...r.permissions })
                        setViewMode('configure_permissions')
                      }}
                      className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-[#6B3BF6] text-xs font-extrabold rounded-xl border border-purple-200 flex items-center gap-1.5 cursor-pointer transition-all active:scale-98"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Configure Permissions</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-bold rounded-xl border border-slate-200">
                      View Only
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MANAGE INDIVIDUAL USER PERMISSION MODAL                                     */}
      {/* ========================================================================= */}
      {selectedUserForManage && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6B3BF6] font-extrabold flex items-center justify-center text-sm border border-purple-200">
                  {selectedUserForManage.avatar || selectedUserForManage.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Manage Permissions — {selectedUserForManage.name}
                  </h3>
                  <p className="text-xs text-purple-600 font-bold">
                    {selectedUserForManage.email} • {selectedUserForManage.team}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedUserForManage(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Designated Role Title</label>
                <input
                  type="text"
                  value={tempUserRoleName}
                  onChange={e => setTempUserRoleName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>

              <div className="space-y-2">
                <span className="block text-slate-900 font-extrabold text-xs">
                  Granular User Capabilities
                </span>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {[
                    { key: 'addCandidates', label: 'Add Candidates & Resumes to Repository' },
                    { key: 'submitToClients', label: 'Submit Candidate Profiles Directly to Client Partners' },
                    { key: 'scheduleInterviews', label: 'Schedule Candidate Interviews & Video Slots' },
                    { key: 'exportReportsCsv', label: 'Export Analytics Reports to Excel / CSV' },
                    { key: 'viewTeamAnalytics', label: 'View Overall Hiring Team Performance Analytics' },
                    { key: 'reassignRequirements', label: 'Reassign Requirements & Candidates Between Recruiters' },
                    { key: 'deleteRecords', label: 'Delete Candidate Profiles & Submission Records' },
                  ].map(item => (
                    <label
                      key={item.key}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                        (tempUserPermissions as any)[item.key]
                          ? 'bg-purple-50/70 border-purple-200 text-purple-950 font-bold'
                          : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-semibold">{item.label}</span>
                      <input
                        type="checkbox"
                        checked={Boolean((tempUserPermissions as any)[item.key])}
                        onChange={e =>
                          setTempUserPermissions({
                            ...tempUserPermissions,
                            [item.key]: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-[#6B3BF6] rounded-md cursor-pointer focus:ring-[#6B3BF6]"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedUserForManage(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveUserPermissions}
                className="px-5 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <Save className="w-4 h-4" />
                <span>Save Permissions</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK ADJUST CLIENT ACCOUNT MODAL */}
      {adjustClientUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150 font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#6B3BF6]" />
                <h3 className="font-extrabold text-slate-900 text-base">Adjust Client Account Assignment</h3>
              </div>
              <button
                type="button"
                onClick={() => setAdjustClientUser(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-purple-50/80 p-3.5 rounded-2xl border border-purple-200">
                <p className="text-xs font-extrabold text-slate-900">{adjustClientUser.name}</p>
                <p className="text-[11px] text-[#6B3BF6] font-bold mt-0.5">{adjustClientUser.role} • {adjustClientUser.team}</p>
              </div>

              <div>
                <label className="block text-slate-700 font-extrabold text-xs mb-1.5">
                  Assigned Client Account *
                </label>
                <select
                  value={targetClient}
                  onChange={e => setTargetClient(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
                >
                  <option value="Accenture">Accenture</option>
                  <option value="Deloitte">Deloitte</option>
                  <option value="MetaForge">MetaForge IT Solutions</option>
                  <option value="Google">Google</option>
                  <option value="Microsoft">Microsoft</option>
                  <option value="TCS">Tata Consultancy Services (TCS)</option>
                  <option value="Infosys">Infosys</option>
                  <option value="Wipro">Wipro</option>
                  <option value="All Clients">All Clients (Executive Oversight)</option>
                </select>
                <p className="text-[10px] text-slate-500 mt-1 font-medium">
                  Reassigning this client updates requirement allocations, candidate submission targets, and performance SLAs for this recruiter/lead.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setAdjustClientUser(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setUsers(prev =>
                    prev.map(u =>
                      u.id === adjustClientUser.id
                        ? { ...u, assignedClient: targetClient }
                        : u
                    )
                  )
                  setRecruiterUsers(prev =>
                    prev.map(r =>
                      r.id === adjustClientUser.id || r.email === adjustClientUser.email
                        ? { ...r, assignedClient: targetClient }
                        : r
                    )
                  )
                  showToast(`Adjusted client assignment for ${adjustClientUser.name} to "${targetClient}"!`)
                  setAdjustClientUser(null)
                }}
                className="px-5 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <Save className="w-4 h-4" />
                <span>Save Client Assignment</span>
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
