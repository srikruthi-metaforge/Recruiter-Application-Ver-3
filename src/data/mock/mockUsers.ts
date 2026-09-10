import { Admin, Lead, Role } from '../../types'
export { INITIAL_RECRUITERS } from './mockRecruiters'

export const INITIAL_LEADS: Lead[] = [
  { id: 'L01', name: 'Harish Gadipally', admin: 'David Park', recruiters: 2, submissions: 62, interviews: 14, placements: 5, email: 'harish.g@metaforgeit.com', clientAccount: 'Accenture', clientAccounts: ['Accenture'] },
  { id: 'L02', name: 'Tom Walsh', admin: 'David Park', recruiters: 2, submissions: 60, interviews: 15, placements: 5, email: 't.walsh@talentflow.io', clientAccount: 'Goldman Sachs', clientAccounts: ['Goldman Sachs'] },
  { id: 'L03', name: 'Nina Brooks', admin: 'Lisa Ho', recruiters: 3, submissions: 74, interviews: 16, placements: 4, email: 'n.brooks@talentflow.io', clientAccount: 'Tesla', clientAccounts: ['Tesla'] },
  { id: 'L04', name: 'Ray Diaz', admin: 'Lisa Ho', recruiters: 1, submissions: 30, interviews: 7, placements: 2, email: 'r.diaz@talentflow.io', clientAccount: 'ITC', clientAccounts: ['ITC'] },
]

export const INITIAL_ADMINS: Admin[] = [
  { id: 'A01', name: 'David Park', leads: 2, recruiters: 4, requirements: 12, submissions: 122, interviews: 29, placements: 10, revenue: '$220K', email: 'd.park@talentflow.io' },
  { id: 'A02', name: 'Lisa Ho', leads: 2, recruiters: 4, requirements: 10, submissions: 104, interviews: 23, placements: 6, revenue: '$175K', email: 'l.ho@talentflow.io' },
]

export const DEMO_ACCOUNTS: Record<Role, { email: string; name: string; password: string; title: string }> = {
  superadmin: { email: 'r.haines@talentflow.io', name: 'Robert Haines', password: 'Admin@2026', title: 'Platform Managing Director' },
  admin: { email: 'd.park@talentflow.io', name: 'David Park', password: 'Admin@2026', title: 'VP of Recruiting Operations' },
  lead: { email: 'harish.g@metaforgeit.com', name: 'Harish Gadipally', password: 'Lead@2026', title: 'Senior Recruiting Lead' },
  recruiter: { email: 'm.chen@talentflow.io', name: 'Marcus Chen', password: 'Rec@2026', title: 'Lead Technical Recruiter' },
  devteam: { email: 'dev.team@talentflow.io', name: 'Dev Team Engineer', password: 'Dev@2026', title: 'Senior Systems Engineer / Core Platform' },
  client: { email: 'client@accenture.com', name: 'Client Account Lead', password: 'Client@2026', title: 'Hiring Manager / Client Portal' },
}

export const ROLE_META: Record<Role, { label: string; desc: string; color: string; bg: string; border: string }> = {
  superadmin: { label: 'Super Admin', desc: 'Full platform metrics & enterprise settings', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  admin: { label: 'Admin', desc: 'Oversee regional leads & recruiter teams', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  lead: { label: 'Team Lead', desc: 'Track team performance & assigned reqs', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  recruiter: { label: 'Recruiter', desc: 'Candidate submissions & interview management', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  devteam: { label: 'Dev Team', desc: 'Full Super Admin control, platform metrics, and administrative privileges', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  client: { label: 'Client', desc: 'Client portal for requirements and candidate review', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
}
