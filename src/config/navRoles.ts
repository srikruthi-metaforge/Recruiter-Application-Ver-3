import { Role } from '../types'

export interface NavItem {
  key: string
  label: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const ROLE_NAV: Record<Role, NavSection[]> = {
  superadmin: [
    {
      title: 'Overview',
      items: [
        { key: 'Requirements', label: 'Requirements' },
        { key: 'Candidates', label: 'Add Candidates' },
        { key: 'Submissions', label: 'Submissions' },
      ],
    },
    {
      title: 'Organization',
      items: [
        { key: 'Users', label: 'User Management' },
      ],
    },
    {
      title: 'Operations',
      items: [
        { key: 'Clients', label: 'Clients' },
        { key: 'Interviews', label: 'Interview Scheduler' },
      ],
    },
    {
      title: 'Intelligence',
      items: [
        { key: 'Reports', label: 'Reports' },
        { key: 'History', label: 'History' },
      ],
    },
    {
      title: 'System',
      items: [
        { key: 'Audit Logs', label: 'Audit Logs' },
      ],
    },
  ],
  admin: [
    {
      title: 'Overview',
      items: [
        { key: 'Requirements', label: 'Requirements' },
        { key: 'Candidates', label: 'Add Candidates' },
        { key: 'Submissions', label: 'Submissions' },
      ],
    },
    {
      title: 'Operations',
      items: [
        { key: 'Clients', label: 'Clients' },
        { key: 'Interviews', label: 'Interview Scheduler' },
      ],
    },
    {
      title: 'Tools & System',
      items: [
        { key: 'Reports', label: 'Reports' },
        { key: 'History', label: 'History' },
        { key: 'Audit Logs', label: 'Audit Logs' },
      ],
    },
  ],
  lead: [
    {
      title: 'Overview',
      items: [
        { key: 'Requirements', label: 'Requirements' },
        { key: 'Dashboard', label: 'My Workspace' },
        { key: 'Candidates', label: 'Add Candidates' },
        { key: 'Submissions', label: 'Total Submissions' },
        { key: 'Interviews', label: 'Interview Tracker' },
        { key: 'Reports', label: 'Daily Reports' },
      ],
    },
  ],
  recruiter: [
    {
      title: 'Main',
      items: [
        { key: 'Dashboard', label: 'My Workspace' },
        { key: 'Requirements', label: 'Requirements' },
        { key: 'Candidates', label: 'Add Candidates' },
        { key: 'Submissions', label: 'Total Submissions' },
        { key: 'Interviews', label: 'Interview Tracking' },
        { key: 'Reports', label: 'Reports' },
      ],
    },
  ],
  devteam: [
    {
      title: 'Overview',
      items: [
        { key: 'Requirements', label: 'Requirements' },
        { key: 'Candidates', label: 'Add Candidates' },
        { key: 'Submissions', label: 'Submissions' },
      ],
    },
    {
      title: 'Organization',
      items: [
        { key: 'Users', label: 'User Management' },
      ],
    },
    {
      title: 'Operations',
      items: [
        { key: 'Clients', label: 'Clients' },
        { key: 'Interviews', label: 'Interview Scheduler' },
      ],
    },
    {
      title: 'Intelligence',
      items: [
        { key: 'Reports', label: 'Reports' },
        { key: 'History', label: 'History' },
      ],
    },
    {
      title: 'System',
      items: [
        { key: 'Audit Logs', label: 'Audit Logs' },
      ],
    },
  ],
  client: [
    {
      title: 'Overview',
      items: [
        { key: 'Requirements', label: 'My Requirements' },
        { key: 'Submissions', label: 'Candidate Submissions' },
        { key: 'Interviews', label: 'Interview Feedback' },
      ],
    },
  ],
}

export const UNIVERSAL_NAV: NavItem[] = [
  { key: 'Notifications', label: 'Notifications' },
  { key: 'AI Assistant', label: 'AI Assistant' },
  { key: 'Profile', label: 'Profile Settings' },
]

export function getPageTitle(role: Role, key: string): string {
  if (key === 'My Profile' || key === 'Profile') return 'My Profile'
  for (const section of ROLE_NAV[role]) {
    const item = section.items.find(i => i.key === key)
    if (item) return item.label
  }
  const universal = UNIVERSAL_NAV.find(i => i.key === key)
  return universal?.label || key
}

export function flattenNav(role: Role): NavItem[] {
  return [...ROLE_NAV[role].flatMap(s => s.items), ...UNIVERSAL_NAV]
}
