import React, { useState } from 'react'
import { CheckCircle2, User, Mail, Phone, Building, Shield, ArrowRight, ArrowLeft } from 'lucide-react'
import { Role } from '../../types'
import { ROLE_META } from '../../data/mockData'
import { AuthLayout } from './AuthLayout'

interface SignupPageProps {
  onBack: () => void
  onSuccess: () => void
}

export function SignupPage({ onBack, onSuccess }: SignupPageProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    role: 'recruiter' as Role,
    password: '',
    confirm: '',
    agreeTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const validateStep1 = () => {
    const errs: Record<string, string> = {}
    if (!form.firstName.trim()) errs.firstName = 'First name required'
    if (!form.lastName.trim()) errs.lastName = 'Last name required'
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid work email required'
    if (!form.company.trim()) errs.company = 'Company name required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep2 = () => {
    const errs: Record<string, string> = {}
    if (!form.password || form.password.length < 8) errs.password = 'Minimum 8 characters'
    if (form.confirm !== form.password) errs.confirm = 'Passwords do not match'
    if (!form.agreeTerms) errs.agreeTerms = 'Must agree to terms'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep1()) setStep(2)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep2()) return
    setSubmitted(true)
    setTimeout(onSuccess, 1800)
  }

  if (submitted) {
    return (
      <AuthLayout>
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl shadow-slate-900/5 text-center">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-sans mb-2 tracking-tight">Access Request Submitted!</h2>
          <p className="text-sm text-slate-500 font-normal mb-6">
            An admin will review and activate your agency workspace within 24 hours.
          </p>
          <p className="text-xs text-slate-400 font-mono">Redirecting to sign in...</p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl shadow-slate-900/5">
        {/* Step Indicator */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                  step === s ? 'bg-blue-600 text-white ring-4 ring-blue-600/15' : step > s ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {step > s ? '✓' : s}
              </div>
              <span className={`text-xs font-mono font-semibold ${step === s ? 'text-slate-900' : 'text-slate-400'}`}>
                {s === 1 ? 'Profile Details' : 'Security Credentials'}
              </span>
              {s < 2 && <div className="w-10 h-px bg-slate-200 mx-1" />}
            </div>
          ))}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans tracking-tight mb-2">
          {step === 1 ? 'Request Enterprise Access' : 'Create Account Password'}
        </h1>
        <p className="text-sm text-slate-500 font-normal mb-8 leading-relaxed">
          {step === 1 ? 'Enter your professional details to join your agency workspace.' : 'Set up credentials to access your TalentFlow account.'}
        </p>

        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">First Name</label>
                <input
                  type="text"
                  placeholder="Jane"
                  value={form.firstName}
                  onChange={e => setForm({ ...form, firstName: e.target.value })}
                  className="w-full h-12 px-4 text-sm bg-slate-50/70 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 font-medium"
                />
                {errors.firstName && <p className="text-xs font-mono text-rose-500">{errors.firstName}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">Last Name</label>
                <input
                  type="text"
                  placeholder="Smith"
                  value={form.lastName}
                  onChange={e => setForm({ ...form, lastName: e.target.value })}
                  className="w-full h-12 px-4 text-sm bg-slate-50/70 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 font-medium"
                />
                {errors.lastName && <p className="text-xs font-mono text-rose-500">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">Work Email Address</label>
              <input
                type="email"
                placeholder="jane@company.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full h-12 px-4 text-sm bg-slate-50/70 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 font-medium"
              />
              {errors.email && <p className="text-xs font-mono text-rose-500">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">Agency / Organization</label>
              <input
                type="text"
                placeholder="Acme Staffing Inc."
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
                className="w-full h-12 px-4 text-sm bg-slate-50/70 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 font-medium"
              />
              {errors.company && <p className="text-xs font-mono text-rose-500">{errors.company}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">Requested Platform Role</label>
              <select
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value as Role })}
                className="w-full h-12 px-4 text-sm bg-slate-50/70 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 font-mono font-medium"
              >
                <option value="recruiter">Recruiter (Candidate Submissions)</option>
                <option value="lead">Team Lead (Team Oversight)</option>
                <option value="admin">Admin (Regional Management)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full h-12 sm:h-13 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 mt-6 cursor-pointer"
            >
              <span>Continue to Security</span> <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">Account Password</label>
              <input
                type="password"
                placeholder="Minimum 8 characters"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full h-12 px-4 text-sm bg-slate-50/70 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 font-medium"
              />
              {errors.password && <p className="text-xs font-mono text-rose-500">{errors.password}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={form.confirm}
                onChange={e => setForm({ ...form, confirm: e.target.value })}
                className="w-full h-12 px-4 text-sm bg-slate-50/70 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 font-medium"
              />
              {errors.confirm && <p className="text-xs font-mono text-rose-500">{errors.confirm}</p>}
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={form.agreeTerms}
                onChange={e => setForm({ ...form, agreeTerms: e.target.checked })}
                className="mt-1 rounded border-slate-300 accent-blue-600 w-4 h-4"
              />
              <span className="text-xs text-slate-600 font-normal">
                I agree to the Terms of Service & Privacy Policy
              </span>
            </label>
            {errors.agreeTerms && <p className="text-xs font-mono text-rose-500">{errors.agreeTerms}</p>}

            <div className="flex gap-4 pt-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="h-12 px-5 border border-slate-300 text-slate-700 rounded-xl text-xs font-mono font-semibold hover:bg-slate-50 cursor-pointer"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="flex-1 h-12 sm:h-13 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/25 cursor-pointer"
              >
                Submit Access Request
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-xs sm:text-sm text-slate-500 font-normal mt-8">
          Already have an account?{' '}
          <button onClick={onBack} className="text-blue-600 font-semibold hover:underline">
            Sign In →
          </button>
        </p>
      </div>
    </AuthLayout>
  )
}

