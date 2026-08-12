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
  User,
  Sliders,
  Check,
  RotateCcw,
} from 'lucide-react'
import { Role } from '../../types'

export interface UserAccountData {
  id: string
  name: string
  email: string
  phone: string
  employeeId: string
  role: 'Super Admin' | 'Admin' | 'Team Lead' | 'Recruiter' | 'Client Reviewer'
  roleCode: string
  team: string
  supervisor: string
  status: 'Active' | 'Locked' | 'Pending Invite'
  twoFactorEnabled: boolean
  lastLogin: string
  lastPasswordChange: string
}

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
    status: 'Active',
    twoFactorEnabled: true,
    lastLogin: 'Today • 08:00 AM',
    lastPasswordChange: '05 Aug 2026',
  },
]

interface UserManagementPageProps {
  role?: Role
}

export function UserManagementPage({ role = 'superadmin' }: UserManagementPageProps) {
  const [users, setUsers] = useState<UserAccountData[]>(INITIAL_USERS)
  const [viewMode, setViewMode] = useState<'list' | 'create_user' | 'reset_password' | 'assign_role'>('list')
  const [selectedUser, setSelectedUser] = useState<UserAccountData | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')

  // Create User Form State
  const [newUserName, setNewUserName] = useState('')
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserPhone, setNewUserPhone] = useState('')
  const [newUserEmpId, setNewUserEmpId] = useState('')
  const [newUserRole, setNewUserRole] = useState<'Super Admin' | 'Admin' | 'Team Lead' | 'Recruiter'>('Recruiter')
  const [newUserTeam, setNewUserTeam] = useState('Engineering Team')
  const [newUserSupervisor, setNewUserSupervisor] = useState('Charlie Darwin (Lead)')
  const [tempPassword, setTempPassword] = useState('Pass@2026#Temp')

  // Reset Password State
  const [resetNewPass, setResetNewPass] = useState('')
  const [resetConfirmPass, setResetConfirmPass] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [forceChangePass, setForceChangePass] = useState(true)
  const [sendEmailNotify, setSendEmailNotify] = useState(true)

  // Assign Role State
  const [targetRole, setTargetRole] = useState<'Super Admin' | 'Admin' | 'Team Lead' | 'Recruiter' | 'Client Reviewer'>('Recruiter')
  const [reassignReason, setReassignReason] = useState('')

  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  // Filtered Users
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

  // Open Reset Password Page
  const openResetPasswordPage = (user: UserAccountData) => {
    setSelectedUser(user)
    setResetNewPass('Pass@' + Math.floor(1000 + Math.random() * 9000))
    setResetConfirmPass('')
    setViewMode('reset_password')
  }

  // Open Assign Role Page
  const openAssignRolePage = (user: UserAccountData) => {
    setSelectedUser(user)
    setTargetRole(user.role)
    setReassignReason('')
    setViewMode('assign_role')
  }

  // Handle Create User Submit (Full Page)
  const handleCreateUserSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
      status: 'Active',
      twoFactorEnabled: true,
      lastLogin: 'Never (New Account)',
      lastPasswordChange: 'Just now',
    }

    setUsers([newRecord, ...users])
    setViewMode('list')
    showToast(`Successfully created user account for ${newUserName}`)

    // Reset Form
    setNewUserName('')
    setNewUserEmail('')
    setNewUserPhone('')
    setNewUserEmpId('')
  }

  // Handle Reset Password Submit (Full Page)
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

  // Handle Assign Role Submit (Full Page)
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
            }
          : u
      )
    )
    setViewMode('list')
    showToast(`Role updated to "${targetRole}" for ${selectedUser.name}`)
    setSelectedUser(null)
  }

  // -------------------------------------------------------------
  // DEDICATED FULL-PAGE VIEW 1: CREATE NEW USER PAGE
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
          {/* SECTION 1: PERSONAL & ACCOUNT INFORMATION */}
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

          {/* SECTION 2: ROLE & TEAM ASSIGNMENT */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-900 font-extrabold text-sm">
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              <span>2. Role Governance & Team Assignment</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          {/* SECTION 3: INITIAL CREDENTIALS & SECURITY */}
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
  // DEDICATED FULL-PAGE VIEW 2: RESET USER PASSWORD PAGE
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
          {/* USER INFO SUMMARY CARD */}
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

          {/* PASSWORD ENTRY CARD */}
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
  // DEDICATED FULL-PAGE VIEW 3: ASSIGN ROLE PAGE
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
          {/* USER SUMMARY CARD */}
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

          {/* ROLE SELECTION CARDS GRID */}
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
  // MAIN USER MANAGEMENT LIST VIEW
  // -------------------------------------------------------------
  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800">
      {/* 1. TOP HEADER & ACTION BUTTONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Management</h1>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-100 text-[#6B3BF6] border border-purple-200 inline-flex items-center gap-1.5 shadow-2xs">
              <Users className="w-3.5 h-3.5 text-[#6B3BF6]" />
              <span>{users.length} Active Accounts</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Provision user accounts, reset passwords, assign organizational roles, and enforce security policies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('create_user')}
            className="px-4 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Create New User</span>
          </button>
        </div>
      </div>

      {/* 2. SUMMARY KPI METRIC CARDS */}
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

      {/* 3. SEARCH & ROLE FILTER BAR */}
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

        <div className="w-full sm:w-56">
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
          >
            <option value="All Roles">All System Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Recruiter">Recruiter</option>
          </select>
        </div>
      </div>

      {/* 4. USERS TABLE LIST */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">USER & EMAIL</th>
                <th className="py-3.5 px-4">ROLE & TEAM</th>
                <th className="py-3.5 px-4">SECURITY & LAST LOGIN</th>
                <th className="py-3.5 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-purple-50/30 transition-colors">
                  {/* Column 1: User & Email */}
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

                  {/* Column 2: Role & Team */}
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <span className="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-purple-100 text-[#6B3BF6] border border-purple-200 inline-block">
                        {user.role}
                      </span>
                      <div className="text-[11px] text-slate-900 font-bold">{user.team}</div>
                      <div className="text-[10px] text-slate-500">Supervisor: {user.supervisor}</div>
                    </div>
                  </td>

                  {/* Column 3: Security & Last Login */}
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

                  {/* Column 4: Actions (DEDICATED FULL-PAGE BUTTONS) */}
                  <td className="py-4 px-4 text-right whitespace-nowrap space-x-2">
                    {/* ASSIGN ROLE FULL-PAGE BUTTON */}
                    <button
                      onClick={() => openAssignRolePage(user)}
                      className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6B3BF6] font-extrabold cursor-pointer inline-flex items-center gap-1 text-xs border border-purple-200 shadow-2xs transition-all active:scale-98"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#6B3BF6]" />
                      <span>Assign Role</span>
                    </button>

                    {/* RESET PASSWORD FULL-PAGE BUTTON */}
                    <button
                      onClick={() => openResetPasswordPage(user)}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold cursor-pointer inline-flex items-center gap-1 text-xs border border-rose-200 shadow-2xs transition-all active:scale-98"
                    >
                      <KeyRound className="w-3.5 h-3.5 text-rose-600" />
                      <span>Reset Password</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
