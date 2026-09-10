import React, { useState } from 'react'
import { ArrowRight, CheckCircle2, Lock, Mail, User, UserPlus } from 'lucide-react'

interface SignUpPageProps {
  onBack: () => void
  onSubmitted: () => void
}

export function SignUpPage({ onBack, onSubmitted }: SignUpPageProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}

    if (!fullName.trim()) errs.fullName = 'Full name is required'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Valid work email required'
    if (!password || password.length < 8) errs.password = 'Password must be at least 8 characters'
    if (confirmPassword !== password) errs.confirmPassword = 'Passwords do not match'

    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setTimeout(onSubmitted, 1800)
    }, 800)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 font-sans">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-2xl max-w-md w-full text-center animate-in fade-in duration-200">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Account Created!</h2>
          <p className="text-xs text-slate-500 font-medium mb-6">
            Your account has been created for <span className="font-bold text-slate-800">{email}</span>. Redirecting to sign in...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      {/* CARD MATCHING USER SCREENSHOT 3 */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-slate-900/5 max-w-md w-full animate-in fade-in duration-200">
        {/* TOP DARK NAVY ICON BADGE */}
        <div className="w-14 h-14 bg-[#1B2A4A] text-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-5">
          <UserPlus className="w-7 h-7 stroke-[2]" />
        </div>

        {/* TITLE & SUBTITLE */}
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight text-center">Create your account</h1>
        <h2 className="text-xs font-bold text-slate-500 text-center mt-1">Join Metaforge IT Solutions</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6" noValidate>
          {/* FULL NAME */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Full Name</label>
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl focus-within:border-blue-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-600/10 px-3.5 py-3 flex items-center gap-2.5 transition-all">
              <User className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-transparent text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            {errors.fullName && <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.fullName}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Email</label>
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl focus-within:border-blue-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-600/10 px-3.5 py-3 flex items-center gap-2.5 transition-all">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            {errors.email && <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.email}</p>}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Password</label>
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl focus-within:border-blue-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-600/10 px-3.5 py-3 flex items-center gap-2.5 transition-all">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-normal">At least 8 characters with uppercase, lowercase, and a number.</p>
            {errors.password && <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.password}</p>}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Confirm Password</label>
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl focus-within:border-blue-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-600/10 px-3.5 py-3 flex items-center gap-2.5 transition-all">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            {errors.confirmPassword && <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-2xl text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer mt-5 disabled:opacity-60"
          >
            <span>{submitting ? 'Creating account...' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* FOOTER */}
        <div className="text-center text-xs text-slate-500 mt-6 font-medium">
          Already have an account?{' '}
          <button type="button" onClick={onBack} className="text-[#2563EB] hover:underline font-extrabold cursor-pointer">
            Sign In
          </button>
        </div>
      </div>

      {/* SUB-FOOTER */}
      <button
        type="button"
        onClick={onBack}
        className="text-xs font-semibold text-slate-500 hover:text-slate-800 text-center mt-5 cursor-pointer flex items-center gap-1 transition-colors"
      >
        <span>← Back to Welcome</span>
      </button>
    </div>
  )
}
