import { Role } from '../types'

/** TalentFlow enterprise design tokens — single source of truth */
export const brand = {
  name: 'metaforge',
  primary: '#1B4FD8',
  primaryHover: '#1640B8',
  primaryLight: '#EBF1FF',
  primaryMuted: '#93B4F5',
  background: '#F5F7FA',
  surface: '#FFFFFF',
  border: '#E4E8EF',
  borderLight: '#F0F2F5',
  text: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  success: '#059669',
  successLight: '#ECFDF5',
  warning: '#D97706',
  warningLight: '#FFFBEB',
  danger: '#DC2626',
  dangerLight: '#FEF2F2',
} as const

export const roleTheme: Record<
  Role,
  {
    label: string
    portalTitle: string
    portalDesc: string
    accent: string
    accentLight: string
    accentDark: string
    gradient: string
  }
> = {
  superadmin: {
    label: 'Super Admin',
    portalTitle: 'Platform Administration',
    portalDesc: 'Full system access, org settings, and enterprise analytics.',
    accent: '#5B21B6',
    accentLight: '#F3E8FF',
    accentDark: '#4C1D95',
    gradient: 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%)',
  },
  admin: {
    label: 'Admin',
    portalTitle: 'Operations Console',
    portalDesc: 'Manage leads, recruiters, requirements, and regional performance.',
    accent: '#1B4FD8',
    accentLight: '#EBF1FF',
    accentDark: '#1640B8',
    gradient: 'linear-gradient(135deg, #1B4FD8 0%, #2563EB 100%)',
  },
  lead: {
    label: 'Team Lead',
    portalTitle: 'Team Lead Portal',
    portalDesc: 'Track team quotas, interview pipelines, and assigned requirements.',
    accent: '#0E7490',
    accentLight: '#ECFEFF',
    accentDark: '#0C6378',
    gradient: 'linear-gradient(135deg, #0E7490 0%, #0891B2 100%)',
  },
  recruiter: {
    label: 'Recruiter',
    portalTitle: 'Recruiter Workspace',
    portalDesc: 'Submit candidates, manage interviews, and hit daily targets.',
    accent: '#047857',
    accentLight: '#ECFDF5',
    accentDark: '#065F46',
    gradient: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
  },
  client: {
    label: 'Client Portal',
    portalTitle: 'Client Hiring Portal',
    portalDesc: 'Review submissions, interview feedback, offers, and hiring progress.',
    accent: '#B45309',
    accentLight: '#FFFBEB',
    accentDark: '#92400E',
    gradient: 'linear-gradient(135deg, #B45309 0%, #D97706 100%)',
  },
}

// Legacy helper — prefer ROLE_NAV from config/navigation.ts
export function getRoleNav(role: Role): { label: string; key: string }[] {
  return []
}
