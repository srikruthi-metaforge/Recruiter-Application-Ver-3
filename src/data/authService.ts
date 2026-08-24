import { Role } from '../types'
import { DEMO_ACCOUNTS } from './mockData'

/**
 * Thin auth helper over the application's existing account store
 * (DEMO_ACCOUNTS in data/mockData). The new public/auth pages resolve
 * credentials through here so they use the same source of truth as the
 * existing RoleLoginPage flow instead of inventing their own.
 */

export interface ResolvedAccount {
  role: Role
  email: string
  name: string
  password: string
  title: string
}

const ACCOUNTS = Object.entries(DEMO_ACCOUNTS) as [Role, (typeof DEMO_ACCOUNTS)[Role]][]

/** Roles that may sign in through the unified (non role-scoped) sign-in page. */
export const SIGN_IN_ROLES: Role[] = ['superadmin', 'admin', 'lead', 'recruiter', 'devteam', 'client']

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

/** Look up a registered account by work email (case-insensitive). */
export function findAccountByEmail(email: string): ResolvedAccount | null {
  const needle = email.trim().toLowerCase()
  if (!needle) return null

  const match = ACCOUNTS.find(([, acc]) => acc.email.toLowerCase() === needle)
  if (!match) return null

  const [role, acc] = match
  return { role, ...acc }
}

export type AuthResult =
  | { ok: true; account: ResolvedAccount }
  | { ok: false; field: 'email' | 'password' | 'general'; message: string }

/** Validate credentials against the existing account store. */
export function authenticate(email: string, password: string): AuthResult {
  const trimmed = email.trim()

  if (!trimmed) return { ok: false, field: 'email', message: 'Work email address is required' }
  if (!isValidEmail(trimmed)) return { ok: false, field: 'email', message: 'Enter a valid work email address' }
  if (!password) return { ok: false, field: 'password', message: 'Password is required' }

  const account = findAccountByEmail(trimmed)
  if (!account || account.password !== password) {
    return {
      ok: false,
      field: 'general',
      message: 'Invalid email or password. Check your credentials and try again.',
    }
  }

  return { ok: true, account }
}

/* ---------------------------------------------------------------------- */
/* Password policy                                                         */
/* ---------------------------------------------------------------------- */

export interface PasswordRule {
  id: string
  label: string
  test: (value: string) => boolean
}

export const PASSWORD_RULES: PasswordRule[] = [
  { id: 'length', label: 'At least 8 characters', test: v => v.length >= 8 },
  { id: 'upper', label: 'One uppercase letter (A–Z)', test: v => /[A-Z]/.test(v) },
  { id: 'lower', label: 'One lowercase letter (a–z)', test: v => /[a-z]/.test(v) },
  { id: 'number', label: 'One number (0–9)', test: v => /[0-9]/.test(v) },
  { id: 'symbol', label: 'One special character (!@#$…)', test: v => /[^A-Za-z0-9]/.test(v) },
]

export function passedRules(value: string): number {
  return PASSWORD_RULES.filter(r => r.test(value)).length
}

export function isStrongPassword(value: string): boolean {
  return passedRules(value) === PASSWORD_RULES.length
}

export function passwordStrength(value: string): { score: number; label: string; color: string } {
  const score = passedRules(value)
  if (!value) return { score: 0, label: 'Empty', color: '#CBD5E1' }
  if (score <= 2) return { score, label: 'Weak', color: '#DC2626' }
  if (score === 3) return { score, label: 'Fair', color: '#D97706' }
  if (score === 4) return { score, label: 'Good', color: '#2563EB' }
  return { score, label: 'Strong', color: '#059669' }
}

/* ---------------------------------------------------------------------- */
/* Verification codes (password recovery)                                  */
/* ---------------------------------------------------------------------- */

/** Six-digit recovery code. Surfaced in the UI the same way DEMO_ACCOUNTS are. */
export function generateVerificationCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export const VERIFICATION_CODE_LENGTH = 6
