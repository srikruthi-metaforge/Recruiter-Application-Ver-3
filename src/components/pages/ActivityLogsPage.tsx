import React, { useState, useMemo } from 'react'
import {
  Activity,
  Search,
  ChevronDown,
  Filter,
  ShieldCheck,
  User,
  Users,
  UserCheck,
  Building2,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Laptop,
  Eye,
  RefreshCw,
  Download,
  Calendar,
  Lock,
  Zap,
} from 'lucide-react'
import { Role } from '../../types'
import { PaginationFooter } from '../ui/PaginationFooter'

export interface ActivityLogItem {
  id: string
  timestamp: string
  userName: string
  userEmail: string
  userRole: 'superadmin' | 'admin' | 'lead' | 'recruiter' | 'devteam'
  userAvatar: string
  action: string
  category: 'Submissions' | 'Requirements' | 'User Management' | 'Client Management' | 'Interviews' | 'System & Access'
  targetEntity: string
  targetId?: string
  clientName?: string
  ipAddress: string
  status: 'Success' | 'Warning' | 'Security Alert'
  details?: string
}

const INITIAL_LOGS: ActivityLogItem[] = [
  // 1. TEAM LEAD ACTIONS
  {
    id: 'LOG-1001',
    timestamp: 'Today at 02:45 PM',
    userName: 'Harish Gadipally',
    userEmail: 'harish.g@metaforgeit.com',
    userRole: 'lead',
    userAvatar: 'H',
    action: 'Assigned Requirement REQ-2026-08-12-001 (Lead Java Full Stack) to Marcus Chen',
    category: 'Requirements',
    targetEntity: 'Requirement REQ-2026-08-12-001',
    targetId: 'REQ-2026-08-12-001',
    clientName: 'Accenture',
    ipAddress: '192.168.1.45',
    status: 'Success',
    details: 'Assigned requirement REQ-2026-08-12-001 for Accenture to team member Marcus Chen with high priority SLA.',
  },
  {
    id: 'LOG-1002',
    timestamp: 'Today at 01:20 PM',
    userName: 'Harish Gadipally',
    userEmail: 'harish.g@metaforgeit.com',
    userRole: 'lead',
    userAvatar: 'H',
    action: 'Cross-assigned Requirement REQ-2026-08-12-004 to Suresh kulkarni',
    category: 'Requirements',
    targetEntity: 'Requirement REQ-2026-08-12-004',
    targetId: 'REQ-2026-08-12-004',
    clientName: 'Accenture',
    ipAddress: '192.168.1.45',
    status: 'Success',
    details: 'Cross-client requirement assignment performed in My Team page for Accenture account.',
  },
  {
    id: 'LOG-1003',
    timestamp: 'Today at 11:35 AM',
    userName: 'Harish Gadipally',
    userEmail: 'harish.g@metaforgeit.com',
    userRole: 'lead',
    userAvatar: 'H',
    action: 'Approved candidate submission SUB-203 (Alex Turner) for Accenture',
    category: 'Submissions',
    targetEntity: 'Submission SUB-203',
    targetId: 'SUB-203',
    clientName: 'Accenture',
    ipAddress: '192.168.1.45',
    status: 'Success',
    details: 'Reviewed and approved candidate Alex Turner profile submission to client Accenture.',
  },
  {
    id: 'LOG-1004',
    timestamp: 'Yesterday at 04:15 PM',
    userName: 'Tom Walsh',
    userEmail: 'tom.w@goldmansachs.com',
    userRole: 'lead',
    userAvatar: 'T',
    action: 'Assigned requirement REQ-2026-08-06-005 to lakshmi.v Recruiter',
    category: 'Requirements',
    targetEntity: 'Requirement REQ-2026-08-06-005',
    targetId: 'REQ-2026-08-06-005',
    clientName: 'Goldman Sachs',
    ipAddress: '10.0.4.12',
    status: 'Success',
    details: 'Assigned Java Architect requirement to lakshmi.v Recruiter for Goldman Sachs team.',
  },

  // 2. RECRUITER ACTIONS
  {
    id: 'LOG-2001',
    timestamp: 'Today at 02:30 PM',
    userName: 'Marcus Chen',
    userEmail: 'm.chen@talentflow.io',
    userRole: 'recruiter',
    userAvatar: 'M',
    action: 'Submitted Candidate Alex Turner for Accenture REQ-2026-08-12-001',
    category: 'Submissions',
    targetEntity: 'Candidate Alex Turner',
    targetId: 'SUB-205',
    clientName: 'Accenture',
    ipAddress: '192.168.1.88',
    status: 'Success',
    details: 'Submitted candidate Alex Turner with resume PDF attached for Senior React Developer position.',
  },
  {
    id: 'LOG-2002',
    timestamp: 'Today at 01:10 PM',
    userName: 'Priya Sharma',
    userEmail: 'p.sharma@talentflow.io',
    userRole: 'recruiter',
    userAvatar: 'P',
    action: 'Submitted Candidate Vidyasagar Gade for Cloud Architect REQ-2026-08-12-003',
    category: 'Submissions',
    targetEntity: 'Candidate Vidyasagar Gade',
    targetId: 'SUB-206',
    clientName: 'Accenture',
    ipAddress: '192.168.1.92',
    status: 'Success',
    details: 'Candidate submission uploaded and routed to Team Lead Harish Gadipally for review.',
  },
  {
    id: 'LOG-2003',
    timestamp: 'Today at 10:45 AM',
    userName: 'Suresh kulkarni',
    userEmail: 'suresh.k@talentflow.io',
    userRole: 'recruiter',
    userAvatar: 'S',
    action: 'Updated Interview status to "L1 Technical Scheduled" for Suresh Kulkarni (Candidate)',
    category: 'Interviews',
    targetEntity: 'Interview INT-404',
    targetId: 'INT-404',
    clientName: 'Accenture',
    ipAddress: '192.168.1.99',
    status: 'Success',
    details: 'Scheduled L1 Technical Interview for Aug 19, 10:00 AM via Microsoft Teams.',
  },
  {
    id: 'LOG-2004',
    timestamp: 'Yesterday at 03:20 PM',
    userName: 'Marcus Chen',
    userEmail: 'm.chen@talentflow.io',
    userRole: 'recruiter',
    userAvatar: 'M',
    action: 'Uploaded resume Alex_Turner_Resume_2026.pdf into Candidate Repository',
    category: 'Submissions',
    targetEntity: 'Resume Document',
    clientName: 'Accenture',
    ipAddress: '192.168.1.88',
    status: 'Success',
    details: 'AI parsed resume with 94% skills match score against Accenture REQ-701.',
  },

  // 3. ADMIN ACTIONS
  {
    id: 'LOG-3001',
    timestamp: 'Today at 03:10 PM',
    userName: 'Admin User',
    userEmail: 'admin@talentflow.io',
    userRole: 'admin',
    userAvatar: 'A',
    action: 'Updated Client Accenture SLA contract details & primary contact info',
    category: 'Client Management',
    targetEntity: 'Client Accenture',
    clientName: 'Accenture',
    ipAddress: '172.16.0.10',
    status: 'Success',
    details: 'Updated SLA turnaround time to 24 hours and verified active status.',
  },
  {
    id: 'LOG-3002',
    timestamp: 'Today at 12:05 PM',
    userName: 'Admin User',
    userEmail: 'admin@talentflow.io',
    userRole: 'admin',
    userAvatar: 'A',
    action: 'Created new requirement REQ-2026-08-15-009 (Cloud Solutions Architect)',
    category: 'Requirements',
    targetEntity: 'Requirement REQ-2026-08-15-009',
    targetId: 'REQ-2026-08-15-009',
    clientName: 'Goldman Sachs',
    ipAddress: '172.16.0.10',
    status: 'Success',
    details: 'Published new requirement REQ-2026-08-15-009 with 8 open seats.',
  },
  {
    id: 'LOG-3003',
    timestamp: 'Yesterday at 05:40 PM',
    userName: 'Admin User',
    userEmail: 'admin@talentflow.io',
    userRole: 'admin',
    userAvatar: 'A',
    action: 'Exported Recruiter Performance & Daily Reports summary to Excel',
    category: 'System & Access',
    targetEntity: 'Reports Module',
    ipAddress: '172.16.0.10',
    status: 'Success',
    details: 'Downloaded performance metrics report for 8 active recruiters.',
  },
  {
    id: 'LOG-3004',
    timestamp: 'Yesterday at 02:00 PM',
    userName: 'Admin User',
    userEmail: 'admin@talentflow.io',
    userRole: 'admin',
    userAvatar: 'A',
    action: 'Attempted user deletion on User Management page (Blocked: Read-Only Access)',
    category: 'User Management',
    targetEntity: 'User Management',
    ipAddress: '172.16.0.10',
    status: 'Warning',
    details: 'Admin user attempted delete operation. Action blocked by security permissions policy.',
  },

  // 4. SUPER ADMIN & DEV TEAM ACTIONS
  {
    id: 'LOG-4001',
    timestamp: 'Today at 09:15 AM',
    userName: 'Super Admin',
    userEmail: 'super.admin@talentflow.io',
    userRole: 'superadmin',
    userAvatar: 'S',
    action: 'Created new user account harish.g@metaforgeit.com (Team Lead role)',
    category: 'User Management',
    targetEntity: 'User Account harish.g@metaforgeit.com',
    ipAddress: '10.0.0.1',
    status: 'Success',
    details: 'Provisioned new Team Lead account for Harish Gadipally assigned to Accenture client.',
  },
  {
    id: 'LOG-4002',
    timestamp: 'Today at 08:30 AM',
    userName: 'Dev Team Lead',
    userEmail: 'dev.team@talentflow.io',
    userRole: 'devteam',
    userAvatar: 'D',
    action: 'Configured microservice health telemetry & system log feed',
    category: 'System & Access',
    targetEntity: 'Dev Dashboard Telemetry',
    ipAddress: '10.0.0.88',
    status: 'Success',
    details: 'System diagnostic telemetry initialized with 99.98% uptime SLA.',
  },
  {
    id: 'LOG-4003',
    timestamp: 'Yesterday at 01:15 PM',
    userName: 'Super Admin',
    userEmail: 'super.admin@talentflow.io',
    userRole: 'superadmin',
    userAvatar: 'S',
    action: 'Updated global Role-Based Access Control (RBAC) permissions matrix',
    category: 'User Management',
    targetEntity: 'Roles & Permissions Matrix',
    ipAddress: '10.0.0.1',
    status: 'Success',
    details: 'Enforced Super Admin & Dev Team exclusive user creation, edit, and delete permissions.',
  },
]

interface ActivityLogsPageProps {
  role?: Role
}

export function ActivityLogsPage({ role = 'superadmin' }: ActivityLogsPageProps) {
  const [logsList] = useState<ActivityLogItem[]>(INITIAL_LOGS)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('All Roles')
  const [categoryFilter, setCategoryFilter] = useState<string>('All Categories')
  const [statusFilter, setStatusFilter] = useState<string>('All Statuses')
  const [selectedLog, setSelectedLog] = useState<ActivityLogItem | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // Filter logs list based on role filter, category, status, and search query
  const filteredLogs = useMemo(() => {
    return logsList.filter(log => {
      // Role Filter
      if (roleFilter !== 'All Roles') {
        if (roleFilter === 'Team Lead' && log.userRole !== 'lead') return false
        if (roleFilter === 'Recruiter' && log.userRole !== 'recruiter') return false
        if (roleFilter === 'Admin' && log.userRole !== 'admin') return false
        if (roleFilter === 'Super Admin' && log.userRole !== 'superadmin' && log.userRole !== 'devteam') return false
      }

      // Category Filter
      if (categoryFilter !== 'All Categories' && log.category !== categoryFilter) return false

      // Status Filter
      if (statusFilter !== 'All Statuses' && log.status !== statusFilter) return false

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchName = log.userName.toLowerCase().includes(q)
        const matchAction = log.action.toLowerCase().includes(q)
        const matchEmail = log.userEmail.toLowerCase().includes(q)
        const matchTarget = log.targetEntity.toLowerCase().includes(q)
        const matchClient = (log.clientName || '').toLowerCase().includes(q)
        if (!matchName && !matchAction && !matchEmail && !matchTarget && !matchClient) return false
      }

      return true
    })
  }, [logsList, roleFilter, categoryFilter, statusFilter, searchQuery])

  // Paginated Logs
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredLogs.slice(start, start + pageSize)
  }, [filteredLogs, currentPage, pageSize])

  const totalPages = Math.ceil(filteredLogs.length / pageSize) || 1

  const getRoleBadge = (userRole: ActivityLogItem['userRole']) => {
    switch (userRole) {
      case 'lead':
        return (
          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-blue-900 border border-blue-200">
            Team Lead
          </span>
        )
      case 'recruiter':
        return (
          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-purple-100 text-purple-900 border border-purple-200">
            Recruiter
          </span>
        )
      case 'admin':
        return (
          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-200">
            Admin
          </span>
        )
      case 'devteam':
        return (
          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-indigo-100 text-indigo-900 border border-indigo-200">
            Dev Team
          </span>
        )
      case 'superadmin':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-rose-100 text-rose-900 border border-rose-200">
            Super Admin
          </span>
        )
    }
  }

  const getStatusBadge = (status: ActivityLogItem['status']) => {
    switch (status) {
      case 'Success':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1 w-fit">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Success</span>
          </span>
        )
      case 'Warning':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1 w-fit">
            <AlertTriangle className="w-3 h-3 text-amber-700" />
            <span>Warning</span>
          </span>
        )
      case 'Security Alert':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1 w-fit">
            <XCircle className="w-3 h-3 text-rose-600" />
            <span>Alert</span>
          </span>
        )
    }
  }

  return (
    <div className="space-y-6 w-full pb-20 font-sans text-slate-800 animate-in fade-in duration-200">
      {/* 1. HEADER & SUMMARY CARDS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Activity & Audit Logs</h1>
            <span className="px-3 py-1 bg-purple-50 text-[#6B3BF6] text-xs font-extrabold rounded-full border border-purple-200 flex items-center gap-1.5 shadow-2xs">
              <Activity className="w-3.5 h-3.5 text-[#6B3BF6]" />
              <span>Real-Time User Action Stream</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete audit trail of user actions performed by Team Leads, Recruiters, Admins, and Super Admins
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSearchQuery('')
              setRoleFilter('All Roles')
              setCategoryFilter('All Categories')
              setStatusFilter('All Statuses')
            }}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Refresh Logs</span>
          </button>
        </div>
      </div>

      {/* 2. ROLE ACTION METRICS BANNER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Team Lead Actions Metric */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">Team Lead Actions</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 tabular-nums">42 Logs</p>
          <p className="text-[10px] text-blue-700 font-medium">Req assignments, submission approvals & team management</p>
        </div>

        {/* Recruiter Actions Metric */}
        <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider">Recruiter Actions</span>
            <UserCheck className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 tabular-nums">118 Logs</p>
          <p className="text-[10px] text-purple-700 font-medium">Candidate submissions, interview schedules & uploads</p>
        </div>

        {/* Admin Actions Metric */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">Admin Actions</span>
            <ShieldCheck className="w-4 h-4 text-amber-700" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 tabular-nums">56 Logs</p>
          <p className="text-[10px] text-amber-800 font-medium">Requirement creations, client updates & data reports</p>
        </div>

        {/* Super Admin & Dev Team Actions Metric */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-1.5 shadow-2xs border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">Super Admin / Dev Logs</span>
            <Lock className="w-4 h-4 text-purple-300" />
          </div>
          <p className="text-2xl font-extrabold text-white tabular-nums">32 Logs</p>
          <p className="text-[10px] text-slate-300 font-medium">User provisioning, RBAC updates & system telemetry</p>
        </div>
      </div>

      {/* 3. FILTERS & CONTROLS BAR */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search user name, action, or client..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter by Role */}
            <div className="relative">
              <select
                value={roleFilter}
                onChange={e => {
                  setRoleFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="appearance-none pl-3.5 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
              >
                <option value="All Roles">All User Roles</option>
                <option value="Team Lead">Team Lead Actions</option>
                <option value="Recruiter">Recruiter Actions</option>
                <option value="Admin">Admin Actions</option>
                <option value="Super Admin">Super Admin & Dev Team</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Filter by Category */}
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={e => {
                  setCategoryFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="appearance-none pl-3.5 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
              >
                <option value="All Categories">All Categories</option>
                <option value="Submissions">Submissions</option>
                <option value="Requirements">Requirements</option>
                <option value="User Management">User Management</option>
                <option value="Client Management">Client Management</option>
                <option value="Interviews">Interviews</option>
                <option value="System & Access">System & Access</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Filter by Status */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={e => {
                  setStatusFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="appearance-none pl-3.5 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
              >
                <option value="All Statuses">All Log Statuses</option>
                <option value="Success">Success Logs</option>
                <option value="Warning">Warning Logs</option>
                <option value="Security Alert">Security Alerts</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. ACTIVITY LOGS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">TIMESTAMP</th>
                <th className="py-3.5 px-4">PERFORMED BY</th>
                <th className="py-3.5 px-4">ROLE</th>
                <th className="py-3.5 px-4">ACTION & DETAILS</th>
                <th className="py-3.5 px-4">CATEGORY</th>
                <th className="py-3.5 px-4">CLIENT / TARGET</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-4 text-center">DETAILS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {paginatedLogs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <p className="font-bold text-sm">No activity logs found</p>
                    <p className="text-xs mt-1">Try adjusting your role or search filters above</p>
                  </td>
                </tr>
              ) : (
                paginatedLogs.map(log => (
                  <tr
                    key={log.id}
                    className="hover:bg-purple-50/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedLog(log)}
                  >
                    {/* TIMESTAMP */}
                    <td className="py-4 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{log.timestamp}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{log.ipAddress}</div>
                    </td>

                    {/* PERFORMED BY */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-[#6B3BF6] font-extrabold flex items-center justify-center text-xs shrink-0 border border-purple-200">
                          {log.userAvatar}
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900 text-xs">{log.userName}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{log.userEmail}</div>
                        </div>
                      </div>
                    </td>

                    {/* ROLE BADGE */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {getRoleBadge(log.userRole)}
                    </td>

                    {/* ACTION & DETAILS */}
                    <td className="py-4 px-4 max-w-sm">
                      <div className="font-extrabold text-slate-900 text-xs leading-snug">{log.action}</div>
                      {log.details && (
                        <div className="text-[11px] text-slate-500 font-normal truncate mt-0.5">
                          {log.details}
                        </div>
                      )}
                    </td>

                    {/* CATEGORY */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {log.category}
                      </span>
                    </td>

                    {/* CLIENT / TARGET */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {log.clientName ? (
                        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
                          <Building2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                          <span>{log.clientName}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-normal text-xs">{log.targetEntity}</span>
                      )}
                    </td>

                    {/* STATUS */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {getStatusBadge(log.status)}
                    </td>

                    {/* ACTION: VIEW DETAILS */}
                    <td className="py-4 px-4 whitespace-nowrap text-center" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 cursor-pointer shadow-2xs flex items-center gap-1 mx-auto"
                      >
                        <Eye className="w-3 h-3 text-[#6B3BF6]" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <PaginationFooter
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredLogs.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* 5. LOG INSPECTION MODAL */}
      {selectedLog && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6B3BF6] font-extrabold flex items-center justify-center text-sm border border-purple-200">
                  {selectedLog.userAvatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900">{selectedLog.userName}</h3>
                    {getRoleBadge(selectedLog.userRole)}
                  </div>
                  <p className="text-xs text-slate-500 font-mono">{selectedLog.userEmail} • IP {selectedLog.ipAddress}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Action Description</span>
                <p className="text-sm font-extrabold text-slate-900">{selectedLog.action}</p>
                <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500 font-medium">
                  <span>Category: <strong>{selectedLog.category}</strong></span>
                  <span>Time: <strong>{selectedLog.timestamp}</strong></span>
                </div>
              </div>

              {selectedLog.details && (
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Detailed Execution Payload</span>
                  <div className="p-3.5 bg-slate-900 text-emerald-400 font-mono rounded-2xl text-[11px] leading-relaxed border border-slate-800">
                    {selectedLog.details}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
                  <span className="text-[10px] text-purple-700 font-bold block">Target Entity</span>
                  <span className="text-xs font-extrabold text-slate-900">{selectedLog.targetEntity}</span>
                </div>
                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                  <span className="text-[10px] text-blue-700 font-bold block">Client Account</span>
                  <span className="text-xs font-extrabold text-slate-900">{selectedLog.clientName || 'System Wide'}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-2xs"
              >
                Close Audit Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
