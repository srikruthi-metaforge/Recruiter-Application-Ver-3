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

export const DEFAULT_MODULE_PERMISSIONS: PermissionGroup[] = [
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

export { INITIAL_ROLES } from './initialRolesData'

export const INITIAL_RECRUITER_USERS: RecruiterUserPermissionData[] = [
  {
    id: 'usr-1',
    name: 'Harish Gadipally',
    email: 'harish.g@metaforgeit.com',
    roleName: 'Team Lead',
    roleCode: 'lead',
    team: 'Accenture Pod',
    avatar: 'H',
    status: 'Active',
    permissions: {
      addCandidates: true, submitToClients: true, scheduleInterviews: true,
      exportReportsCsv: true, viewTeamAnalytics: true, deleteRecords: false, reassignRequirements: true,
    },
  },
  {
    id: 'usr-2',
    name: 'Marcus Chen',
    email: 'm.chen@talentflow.io',
    roleName: 'Senior Technical Recruiter',
    roleCode: 'recruiter',
    team: 'Accenture Pod',
    avatar: 'M',
    status: 'Active',
    permissions: {
      addCandidates: true, submitToClients: true, scheduleInterviews: true,
      exportReportsCsv: false, viewTeamAnalytics: false, deleteRecords: false, reassignRequirements: false,
    },
  },
  {
    id: 'usr-3',
    name: 'Priya Sharma',
    email: 'p.sharma@talentflow.io',
    roleName: 'IT Recruiter',
    roleCode: 'recruiter',
    team: 'Accenture Pod',
    avatar: 'P',
    status: 'Active',
    permissions: {
      addCandidates: true, submitToClients: true, scheduleInterviews: true,
      exportReportsCsv: false, viewTeamAnalytics: false, deleteRecords: false, reassignRequirements: false,
    },
  },
]

export const INITIAL_RECRUITERS_PERMISSIONS = INITIAL_RECRUITER_USERS
