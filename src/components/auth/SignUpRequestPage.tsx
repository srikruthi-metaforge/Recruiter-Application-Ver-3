import React, { useState } from 'react'
import { Building2, CheckCircle2, Lock, Mail, Phone, ShieldCheck, User } from 'lucide-react'
import { Role } from '../../types'
import { findAccountByEmail, isStrongPassword, isValidEmail } from '../../data/authService'
import { roleTheme } from '../../theme'
import { AuthCard, AuthShell } from './AuthShell'
import {
  AuthAlert,
  FieldError,
  FieldLabel,
  PasswordField,
  PasswordRequirements,
  SecondaryButton,
  SubmitButton,
  TextField,
} from './AuthFormControls'

interface SignUpPageProps {
  /** Return to sign in */
  onBack: () => void
  /** Called once the access request has been submitted */
  onSubmitted: () => void
}

/** Roles a user may request. Super Admin / Dev Team are provisioned internally only. */
const REQUESTABLE_ROLES: Role[] = ['recruiter', 'lead', 'admin']

type Step = 1 | 2

export function SignUpPage({ onBack, onSubmitted }: SignUpPageProps) {
  const [step, setStep] = useState<Step>(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    role: 'recruiter' as Role,
    password: '',
    confirm: '',
    agree: false,
  })

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: '', general: '' }))
  }

  const validateStep1 = () => {
    const next: Record<string, string> = {}
    if (!form.firstName.trim()) next.firstName = 'First name is required'
    if (!form.lastName.trim()) next.lastName = 'Last name is required'
    if (!form.email.trim()) next.email = 'Work email is required'
    else if (!isValidEmail(form.email)) next.email = 'Enter a valid work email address'
    else if (findAccountByEmail(form.email)) next.email = 'An account already exists for this email'
    if (!form.organization.trim()) next.organization = 'Organization is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const validateStep2 = () => {
    const next: Record<string, string> = {}
    if (!form.password) next.password = 'Password is required'
    else if (!isStrongPassword(form.password)) next.password = 'Password does not meet all requirements'
    if (!form.confirm) next.confirm = 'Confirm your password'
    else if (form.confirm !== form.password) next.confirm = 'Passwords do not match'
    if (!form.agree) next.agree = 'You must accept the Terms of Service and Privacy Policy'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep1()) setStep(2)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep2()) return

    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 900)
  }

  const shell = (children: React.ReactNode) => (
    <AuthShell
      wide
      backLabel="Back to sign in"
      onBack={onBack}
      eyebrow="Administrator-Approved Access"
      headline={
        <>
          Request access to
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            your organization&apos;s workspace.
          </span>
        </>
      }
      description="MRAP accounts are provisioned by your platform administrator. Submit your details and your workspace is activated with the right role and permissions."
      bullets={[
        'Requests are reviewed by your Super Admin or Admin',
        'Roles and permissions are assigned centrally via RBAC',
        'Your credentials stay encrypted until the account is activated',
      ]}
    >
      {children}
    </AuthShell>
  )

  if (submitted) {
    return shell(
      <AuthCard className="text-center">
        <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans mb-2 tracking-tight">
          Access request submitted
        </h2>
        <p className="text-sm text-slate-500 font-normal mb-7 leading-relaxed">
          We&apos;ve sent your request to the administrators of{' '}
          <span className="text-slate-900 font-semibold">{form.organization}</span>. You&apos;ll receive an activation
          email at <span className="text-slate-900 font-semibold">{form.email}</span> once your{' '}
          {roleTheme[form.role].label} workspace is approved.
        </p>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left mb-7 space-y-2.5">
          <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold">What happens next</p>
          {[
            'An admin reviews your request and confirms your role',
            'RBAC permissions are applied to your account',
            'You receive an activation link to sign in',
          ].map((item, i) => (
            <div key={item} className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 text-[9px] font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-xs text-slate-600 font-medium">{item}</span>
            </div>
          ))}
        </div>

        <SubmitButton type="button" onClick={onSubmitted} withArrow={false}>
          Back to Sign In
        </SubmitButton>
      </AuthCard>
    )
  }

  return shell(
    <AuthCard>
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-8">
        {([1, 2] as Step[]).map(s => (
          <div key={s} className="flex items-center gap-2.5">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                step === s
                  ? 'bg-blue-600 text-white ring-4 ring-blue-600/15'
                  : step > s
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-400'
              }`}
            >
              {step > s ? '✓' : s}
            </div>
            <span className={`text-xs font-mono font-semibold ${step === s ? 'text-slate-900' : 'text-slate-400'}`}>
              {s === 1 ? 'Profile Details' : 'Security Credentials'}
            </span>
            {s < 2 && <div className="w-8 h-px bg-slate-200 mx-1" />}
          </div>
        ))}
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans tracking-tight mb-2">
        {step === 1 ? 'Request enterprise access' : 'Create your password'}
      </h2>
      <p className="text-sm text-slate-500 font-normal mb-8 leading-relaxed">
        {step === 1
          ? 'Tell us who you are and which workspace role you need. Your administrator approves the request.'
          : 'Set the credentials you will use to sign in once your account is activated.'}
      </p>

      {step === 1 && (
        <form onSubmit={handleNext} className="space-y-5" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="First Name"
              icon={User}
              value={form.firstName}
              onChange={v => set('firstName', v)}
              placeholder="Jane"
              autoComplete="given-name"
              error={errors.firstName}
            />
            <TextField
              label="Last Name"
              icon={User}
              value={form.lastName}
              onChange={v => set('lastName', v)}
              placeholder="Smith"
              autoComplete="family-name"
              error={errors.lastName}
            />
          </div>

          <TextField
            label="Work Email Address"
            type="email"
            icon={Mail}
            value={form.email}
            onChange={v => set('email', v)}
            placeholder="jane@company.com"
            autoComplete="email"
            error={errors.email}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              label="Contact Number"
              type="tel"
              inputMode="tel"
              icon={Phone}
              value={form.phone}
              onChange={v => set('phone', v)}
              placeholder="+1 555 0100"
              autoComplete="tel"
            />
            <TextField
              label="Organization"
              icon={Building2}
              value={form.organization}
              onChange={v => set('organization', v)}
              placeholder="Acme Staffing Inc."
              autoComplete="organization"
              error={errors.organization}
            />
          </div>

          <div className="space-y-2">
            <FieldLabel>Requested Platform Role</FieldLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {REQUESTABLE_ROLES.map(r => {
                const theme = roleTheme[r]
                const active = form.role === r
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => set('role', r)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'border-blue-500 bg-blue-50/60 ring-4 ring-blue-600/10 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full mb-2"
                      style={{ background: theme.accent }}
                      aria-hidden
                    />
                    <p className={`text-sm font-bold font-sans ${active ? 'text-blue-700' : 'text-slate-900'}`}>
                      {theme.label}
                    </p>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5 leading-snug">{theme.portalTitle}</p>
                  </button>
                )
              })}
            </div>
            <p className="text-[11px] text-slate-400 font-medium pt-1">
              Super Admin and Dev Team accounts are provisioned internally and cannot be requested here.
            </p>
          </div>

          <SubmitButton>Continue to Security</SubmitButton>

          <p className="text-center text-xs sm:text-sm text-slate-500 font-normal pt-1">
            Already have an account?{' '}
            <button type="button" onClick={onBack} className="text-blue-600 font-semibold hover:underline cursor-pointer">
              Sign In →
            </button>
          </p>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <PasswordField
            label="Account Password"
            icon={Lock}
            value={form.password}
            onChange={v => set('password', v)}
            placeholder="Create a strong password"
            autoComplete="new-password"
            error={errors.password}
            disabled={submitting}
          />

          <PasswordRequirements value={form.password} />

          <PasswordField
            label="Confirm Password"
            icon={ShieldCheck}
            value={form.confirm}
            onChange={v => set('confirm', v)}
            placeholder="Re-enter your password"
            autoComplete="new-password"
            error={errors.confirm}
            disabled={submitting}
          />

          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={e => set('agree', e.target.checked)}
                className="mt-0.5 rounded border-slate-300 accent-blue-600 w-4 h-4 cursor-pointer"
              />
              <span className="text-xs text-slate-600 font-normal leading-relaxed">
                I agree to the MetaForge Terms of Service and Privacy Policy, and consent to my access request being
                reviewed by my organization&apos;s administrators.
              </span>
            </label>
            <FieldError>{errors.agree}</FieldError>
          </div>

          {errors.general && <AuthAlert tone="error">{errors.general}</AuthAlert>}

          <div className="flex gap-3 pt-2">
            <SecondaryButton onClick={() => setStep(1)}>← Back</SecondaryButton>
            <div className="flex-1">
              <SubmitButton loading={submitting} loadingLabel="Submitting request…" withArrow={false}>
                Submit Access Request
              </SubmitButton>
            </div>
          </div>
        </form>
      )}
    </AuthCard>
  )
}
