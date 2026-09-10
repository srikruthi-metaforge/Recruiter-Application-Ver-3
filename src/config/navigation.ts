import { Role } from '../types'

export interface NavItem {
  key: string
  label: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export interface PageMeta {
  title: string
  description: string
  actions?: string[]
  columns?: string[]
  sampleRows?: string[][]
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

export const PAGE_META: Record<string, PageMeta> = {
  Organization: {
    title: 'Organization',
    description: 'Company details, branches, departments, and teams.',
    actions: ['Edit Company', 'Add Branch', 'Add Department'],
    columns: ['Name', 'Type', 'Location', 'Headcount', 'Status'],
    sampleRows: [
      ['TalentFlow HQ', 'Head Office', 'New York', '120', 'Active'],
      ['India Delivery Center', 'Branch', 'Hyderabad', '85', 'Active'],
      ['Tech Recruiting Dept', 'Department', 'Remote', '42', 'Active'],
    ],
  },
  'My Team': {
    title: 'My Team',
    description: 'Overview of team members and working client account assignments.',
    actions: ['View Performance', 'Assign Requirements'],
    columns: ['Recruiter Name', 'Role', 'Working Client Accounts', 'Active Reqs', 'Submissions', 'Actions'],
    sampleRows: [
      ['Marcus Chen', 'Senior Recruiter', 'Accenture, Goldman Sachs', '7', '62', 'View Analytics'],
      ['Priya Sharma', 'IT Recruiter', 'Accenture, Infosys', '5', '46', 'View Analytics'],
    ],
  },
  Users: {
    title: 'User Management',
    description: 'Create, edit, disable users. Assign roles and teams.',
    actions: ['Create User', 'Reset Password', 'Assign Role'],
    columns: ['Name', 'Email', 'Role', 'Team', 'Status', 'Last Login'],
    sampleRows: [
      ['David Park', 'd.park@talentflow.io', 'Admin', 'North America', 'Active', 'Aug 6, 2026'],
      ['Sarah Kim', 's.kim@talentflow.io', 'Team Lead', 'Tech Hiring', 'Active', 'Aug 6, 2026'],
      ['Marcus Chen', 'm.chen@talentflow.io', 'Recruiter', 'Tech Hiring', 'Active', 'Aug 6, 2026'],
    ],
  },
  Roles: {
    title: 'Roles & Permissions',
    description: 'Module access, feature access, and approval workflows.',
    actions: ['Create Role', 'Edit Permissions'],
    columns: ['Role', 'Users', 'Modules', 'Last Updated'],
    sampleRows: [
      ['Super Admin', '2', 'All Modules', 'Aug 1, 2026'],
      ['Admin', '4', 'Operations', 'Aug 2, 2026'],
      ['Team Lead', '8', 'Team + Approvals', 'Aug 3, 2026'],
    ],
  },
  Clients: {
    title: 'Client Management',
    description: 'Clients, contacts, agreements, and active contracts.',
    actions: ['Add Client', 'View Agreements'],
    columns: ['Client', 'Contacts', 'Active Reqs', 'Contract Status', 'Revenue MTD'],
    sampleRows: [
      ['Accenture', '3', '12', 'Active', '$48K'],
      ['Goldman Sachs', '2', '8', 'Active', '$62K'],
      ['Microsoft', '4', '6', 'Renewal Due', '$35K'],
    ],
  },
  Candidates: {
    title: 'Candidate Database',
    description: 'Master repository with duplicate detection, resume parsing, and AI match scores.',
    actions: ['Upload Resume', 'Run Duplicate Check', 'AI Rank'],
    columns: ['Candidate', 'Skills', 'Experience', 'Match Score', 'Duplicates', 'Last Activity'],
    sampleRows: [
      ['Alex Turner', 'React, TS', '8 yrs', '94%', 'None', 'Aug 5, 2026'],
      ['Rania Khalil', 'Java, Spring', '11 yrs', '96%', '1 flagged', 'Aug 4, 2026'],
      ['Ben Wallace', 'Python, ML', '10 yrs', '98%', 'None', 'Aug 2, 2026'],
    ],
  },
  Offers: {
    title: 'Offers & Placements',
    description: 'Offer negotiation, joining status, placements, and billing.',
    actions: ['Create Offer', 'Track Joining'],
    columns: ['Candidate', 'Client', 'Offer Amount', 'Status', 'Joining Date'],
    sampleRows: [
      ['Ben Wallace', 'Tesla', '$185K', 'Accepted', 'Sep 1, 2026'],
      ['Alex Turner', 'Accenture', '$145K', 'Pending', '—'],
    ],
  },
  'AI Center': {
    title: 'AI Center',
    description: 'JD intelligence, resume intelligence, duplicate detection, candidate ranking, and recommendations.',
    actions: ['Analyze JD', 'Parse Resumes', 'View Recommendations'],
    columns: ['AI Module', 'Runs Today', 'Accuracy', 'Time Saved'],
    sampleRows: [
      ['JD Intelligence', '24', '92%', '18 hrs'],
      ['Resume Parsing', '156', '89%', '42 hrs'],
      ['Duplicate Detection', '89', '96%', '12 hrs'],
      ['Candidate Ranking', '67', '91%', '8 hrs'],
    ],
  },
  Integrations: {
    title: 'Integrations',
    description: 'Naukri, LinkedIn, Email, WhatsApp, SMS, Outlook, Google Calendar.',
    columns: ['Integration', 'Status', 'Last Sync'],
    sampleRows: [
      ['LinkedIn Recruiter', 'Connected', '2 min ago'],
      ['Naukri', 'Connected', '15 min ago'],
      ['Outlook Calendar', 'Connected', '1 hr ago'],
      ['WhatsApp Business', 'Pending Setup', '—'],
    ],
  },
  Settings: {
    title: 'System Settings',
    description: 'Email templates, SMS templates, and notification settings.',
    actions: ['Edit Templates', 'Notification Rules'],
    columns: ['Setting', 'Category', 'Last Modified'],
    sampleRows: [
      ['Interview Reminder Email', 'Email Template', 'Jul 28, 2026'],
      ['Offer Release SMS', 'SMS Template', 'Jul 30, 2026'],
      ['SLA Breach Alert', 'Notifications', 'Aug 1, 2026'],
    ],
  },
  'Audit Logs': {
    title: 'Audit Logs',
    description: 'System-wide activity and compliance audit trail.',
    columns: ['Timestamp', 'User', 'Action', 'Module', 'IP'],
    sampleRows: [
      ['Aug 6, 18:42', 'Robert Haines', 'Updated role permissions', 'Roles', '192.168.1.10'],
      ['Aug 6, 17:15', 'David Park', 'Created requirement REQ-007', 'Requirements', '192.168.1.22'],
    ],
  },
  Recruiters: {
    title: 'Recruiters',
    description: 'Manage recruiter accounts and assignments.',
    actions: ['Assign Recruiter'],
    columns: ['Recruiter', 'Lead', 'Active Reqs', 'Submissions', 'Status'],
    sampleRows: [
      ['Marcus Chen', 'Sarah Kim', '5', '34', 'Active'],
      ['Priya Sharma', 'Sarah Kim', '4', '28', 'Active'],
    ],
  },
  Teams: {
    title: 'Teams',
    description: 'Team structure and lead assignments.',
    columns: ['Team', 'Lead', 'Recruiters', 'Open Positions'],
    sampleRows: [
      ['Tech Hiring', 'Sarah Kim', '4', '18'],
      ['Finance Hiring', 'Tom Walsh', '3', '12'],
    ],
  },
  'Email Center': {
    title: 'Email Center',
    description: 'Bulk and transactional email communication.',
    actions: ['Compose Email', 'Use Template'],
    columns: ['Subject', 'Recipients', 'Status', 'Sent At'],
    sampleRows: [['Interview Reminder — Alex Turner', '12', 'Delivered', 'Aug 6, 10:00 AM']],
  },
  'Activity Logs': {
    title: 'Activity Logs',
    description: 'Daily operational activity across your region.',
    columns: ['Time', 'User', 'Activity', 'Details'],
    sampleRows: [['14:30', 'Marcus Chen', 'Submitted candidate', 'REQ-001 · Alex Turner']],
  },
  Performance: {
    title: 'Recruiter Performance',
    description: 'Individual productivity metrics and rankings.',
    columns: ['Recruiter', 'Submissions', 'Interviews', 'Placements', 'Conversion'],
    sampleRows: [
      ['Marcus Chen', '34', '8', '2', '5.9%'],
      ['James O\'Brien', '41', '11', '4', '9.8%'],
    ],
  },
  Targets: {
    title: 'Target Tracking',
    description: 'Daily and weekly hiring targets vs actuals.',
    columns: ['Metric', 'Target', 'Actual', 'Variance'],
    sampleRows: [
      ['Daily Submissions', '40', '42', '+5%'],
      ['Weekly Interviews', '60', '52', '-13%'],
    ],
  },
  'Candidate Search': {
    title: 'Candidate Search',
    description: 'Search internal database and external sources.',
    actions: ['Advanced Search', 'Save Filter'],
    columns: ['Candidate', 'Skills', 'Location', 'Availability', 'Match'],
    sampleRows: [['Sarah Nguyen', 'React, Node', 'Remote', 'Immediate', '87%']],
  },
  'AI Match': {
    title: 'AI Candidate Match',
    description: 'AI-suggested candidates for active requirements.',
    actions: ['Refresh Suggestions'],
    columns: ['Requirement', 'Candidate', 'Match Score', 'Reason'],
    sampleRows: [['Senior React Developer', 'Alex Turner', '94%', 'Skills + experience fit']],
  },
  Pipeline: {
    title: 'Candidate Pipeline',
    description: 'Track candidates through sourcing to submission.',
    columns: ['Candidate', 'Stage', 'Requirement', 'Last Action', 'Owner'],
    sampleRows: [['David Osei', 'Screening', 'REQ-001', 'Call completed', 'Marcus Chen']],
  },
  'Follow-ups': {
    title: 'Follow-up Tracker',
    description: 'Pending calls, follow-ups, and call notes.',
    actions: ['Add Follow-up', 'Log Call'],
    columns: ['Candidate', 'Type', 'Due', 'Priority', 'Status'],
    sampleRows: [['Alex Turner', 'Client feedback', 'Today', 'High', 'Pending']],
  },
  Analytics: {
    title: 'Hiring Progress Analytics',
    description: 'Positions filled, open, and pipeline conversion for your account.',
    columns: ['Requirement', 'Open', 'Filled', 'In Interview', 'Offers'],
    sampleRows: [['Senior React Developer', '2', '1', '3', '1']],
  },
  Invoices: {
    title: 'Invoices',
    description: 'Billing and payment status.',
    columns: ['Invoice #', 'Period', 'Amount', 'Status', 'Due Date'],
    sampleRows: [['INV-2026-084', 'July 2026', '$24,600', 'Paid', 'Aug 5, 2026']],
  },
  Contacts: {
    title: 'Company Contacts',
    description: 'Your hiring managers and TalentFlow account team.',
    columns: ['Name', 'Role', 'Email', 'Phone'],
    sampleRows: [['Jane Cooper', 'Hiring Manager', 'j.cooper@accenture.com', '+1 555-0100']],
  },
  Notifications: {
    title: 'Notifications',
    description: 'Alerts, SLA breaches, and system updates.',
    columns: ['Type', 'Message', 'Time', 'Read'],
    sampleRows: [['SLA Alert', 'REQ-004 approaching deadline', '2 hrs ago', 'No']],
  },
  'AI Assistant': {
    title: 'AI Assistant',
    description: 'Ask questions about requirements, candidates, and pipeline.',
    actions: ['New Conversation'],
    columns: ['Query', 'Response Preview', 'Time'],
    sampleRows: [['Top candidates for REQ-001?', '3 matches above 90% score…', 'Just now']],
  },
  'My Profile': {
    title: 'My Profile',
    description: 'Manage your recruiter profile and login details',
  },
  Calendar: {
    title: 'Calendar',
    description: 'Interviews, follow-ups, and team events.',
    columns: ['Event', 'Date', 'Time', 'Type'],
    sampleRows: [['Technical Interview — Alex Turner', 'Aug 7', '10:00 AM', 'Interview']],
  },
  Documents: {
    title: 'Documents',
    description: 'Resumes, JDs, offer letters, and agreements.',
    columns: ['Document', 'Type', 'Uploaded', 'Owner'],
    sampleRows: [['Alex_Turner_Resume.pdf', 'Resume', 'Aug 5, 2026', 'Marcus Chen']],
  },
}
