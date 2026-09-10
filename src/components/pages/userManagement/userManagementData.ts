import { Role } from '../../../types'

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

export const INITIAL_USER_ACCOUNTS: UserAccountData[] = [
  {
    id: 'USR-001',
    name: 'Robert Haines',
    email: 'r.haines@talentflow.io',
    phone: '+91 98450 11223',
    employeeId: 'EMP-1001',
    role: 'Super Admin',
    roleCode: 'superadmin',
    team: 'Executive Leadership',
    supervisor: 'Self (Managing Director)',
    status: 'Active',
    twoFactorEnabled: true,
    lastLogin: 'Today at 08:15 AM',
    lastPasswordChange: '15 days ago',
  },
  {
    id: 'USR-002',
    name: 'David Park',
    email: 'd.park@talentflow.io',
    phone: '+91 98450 44556',
    employeeId: 'EMP-1002',
    role: 'Admin',
    roleCode: 'admin',
    team: 'Operations Management',
    supervisor: 'Robert Haines',
    status: 'Active',
    twoFactorEnabled: true,
    lastLogin: 'Today at 08:30 AM',
    lastPasswordChange: '30 days ago',
  },
  {
    id: 'USR-003',
    name: 'Harish Gadipally',
    email: 'harish.g@metaforgeit.com',
    phone: '+91 98210 44905',
    employeeId: 'EMP-1003',
    role: 'Team Lead',
    roleCode: 'lead',
    team: 'Engineering Sourcing',
    supervisor: 'David Park',
    assignedClient: 'LTTS / L&T',
    status: 'Active',
    twoFactorEnabled: true,
    lastLogin: 'Today at 08:45 AM',
    lastPasswordChange: '12 days ago',
  },
  {
    id: 'USR-004',
    name: 'Marcus Chen',
    email: 'm.chen@talentflow.io',
    phone: '+91 98210 99887',
    employeeId: 'EMP-1004',
    role: 'Recruiter',
    roleCode: 'recruiter',
    team: 'Engineering Sourcing',
    supervisor: 'Harish Gadipally',
    assignedClient: 'Accenture Enterprise',
    status: 'Active',
    twoFactorEnabled: false,
    lastLogin: 'Today at 09:15 AM',
    lastPasswordChange: '45 days ago',
  },
  {
    id: 'USR-005',
    name: 'Priya Sharma',
    email: 'p.sharma@talentflow.io',
    phone: '+91 98210 66778',
    employeeId: 'EMP-1005',
    role: 'Recruiter',
    roleCode: 'recruiter',
    team: 'Engineering Sourcing',
    supervisor: 'Harish Gadipally',
    assignedClient: 'Continental Automotive',
    status: 'Active',
    twoFactorEnabled: false,
    lastLogin: 'Today at 09:30 AM',
    lastPasswordChange: '20 days ago',
  },
]
