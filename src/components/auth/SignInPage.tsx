import React, { useState } from 'react'
import { ArrowRight, ClipboardList, Key, Lock, Mail } from 'lucide-react'
import { Role } from '../../types'
import { authenticate } from '../../data/authService'
import { SignInDemoDrawer } from './SignInDemoDrawer'

interface SignInPageProps {
  onLogin: (role: Role) => void
  onForgot: (email?: string) => void
  onSignup: () => void
  onBack: () => void
  onRolePortals?: () => void
}

const REMEMBER_KEY = 'metaforge_remembered_email'

export function SignInPage({ onLogin, onForgot, onSignup, onBack }: SignInPageProps) {
  const [authMode, setAuthMode] = useState<'password' | 'code'>('password')
  const [email, setEmail] = useState(() => {
    try {
      return localStorage.getItem(REMEMBER_KEY) || ''
    } catch {
      return ''
    }
  })
  const [password, setPassword] = useState('')
  const [signInCode, setSignInCode] = useState('')
  const [codeMsg, setCodeMsg] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ email?: string; password?: string; code?: string; general?: string }>({})
  const [loading, setLoading] = useState(false)

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    if (!email.trim()) {
      setErrors({ email: 'Please enter your email' })
      return
    }
    const result = authenticate(email, password)
    if (!result.ok) {
      setErrors({ [result.field]: result.message })
      return
    }
    setLoading(true)
    const role = result.account.role
    window.setTimeout(() => {
      try { localStorage.setItem(REMEMBER_KEY, result.account.email) } catch {}
      onLogin(role)
    }, 600)
  }

  const handleSendCode = () => {
    if (!email.trim()) {
      setErrors({ email: 'Enter your email to receive a sign-in code' })
      return
    }
    setErrors({})
    setCodeMsg('A 6-digit code has been sent to your email (Demo code: 123456)')
    setSignInCode('123456')
  }

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    if (!email.trim()) {
      setErrors({ email: 'Please enter your email' })
      return
    }
    if (!signInCode.trim() || signInCode.length < 6) {
      setErrors({ code: 'Enter a valid 6-digit sign-in code' })
      return
    }
    setLoading(true)
    const matchedRole: Role = email.includes('admin')
      ? 'admin' : email.includes('lead')
      ? 'lead' : email.includes('super')
      ? 'superadmin' : 'recruiter'
    window.setTimeout(() => { onLogin(matchedRole) }, 600)
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-slate-900/5 max-w-md w-full animate-in fade-in duration-200">
        <div className="w-14 h-14 bg-[#1B2A4A] text-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-5">
          <ClipboardList className="w-7 h-7 stroke-[2]" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight text-center">Sign in</h1>
        <h2 className="text-sm font-extrabold text-[#1E3A8A] text-center mt-1">Metaforge IT Solutions</h2>
        <p className="text-xs text-slate-500 text-center mt-1.5 font-normal leading-relaxed max-w-xs mx-auto">
          Use your password or a one-time code sent to your email
        </p>

        <div className="p-1 bg-[#F1F5F9] border border-slate-200/60 rounded-2xl flex items-center mb-6 text-xs font-semibold mt-6">
          <button type="button" onClick={() => { setAuthMode('password'); setErrors({}) }} className={`flex-1 py-2.5 rounded-xl text-center transition-all cursor-pointer ${authMode === 'password' ? 'bg-white text-slate-900 shadow-sm font-extrabold' : 'text-slate-600 font-medium'}`}>Password</button>
          <button type="button" onClick={() => { setAuthMode('code'); setErrors({}) }} className={`flex-1 py-2.5 rounded-xl text-center transition-all cursor-pointer ${authMode === 'code' ? 'bg-white text-slate-900 shadow-sm font-extrabold' : 'text-slate-600 font-medium'}`}>Email code</button>
        </div>

        {authMode === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4" noValidate>
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">Email</label>
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl px-3.5 py-3 flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="w-full bg-transparent text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none" />
              </div>
              {errors.email && <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">Password</label>
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl px-3.5 py-3 flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-transparent text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none" />
              </div>
              {errors.password && <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.password}</p>}
              <button type="button" onClick={() => onForgot(email)} className="text-xs font-semibold text-[#2563EB] hover:text-blue-700 block text-right mt-2 ml-auto cursor-pointer">Forgot password?</button>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#2563EB] text-white font-bold rounded-2xl text-sm shadow-md flex items-center justify-center gap-2 mt-5">
              <span>{loading ? 'Signing in...' : 'Sign in'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {authMode === 'code' && (
          <form onSubmit={handleCodeSubmit} className="space-y-4" noValidate>
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">Email</label>
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl px-3.5 py-3 flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="w-full bg-transparent text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none" />
              </div>
              <p className="text-xs text-slate-500 mt-2 font-normal">We&apos;ll email a 6-digit code to your inbox (valid 10 minutes).</p>
              <button type="button" onClick={handleSendCode} className="w-full py-3 bg-[#F8FAFC] text-[#2563EB] border border-blue-200/80 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 mt-3 cursor-pointer">
                <Key className="w-3.5 h-3.5" /><span>Send code to my email</span>
              </button>
              {codeMsg && <p className="text-[11px] text-emerald-600 font-semibold mt-1.5 text-center">{codeMsg}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block mt-4">Sign-in code</label>
              <input type="text" maxLength={6} value={signInCode} onChange={e => setSignInCode(e.target.value)} placeholder="0 0 0 0 0 0" className="w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl p-3 text-center tracking-[0.5em] font-mono text-slate-800 text-base font-bold focus:outline-none" />
            </div>
            <button type="submit" disabled={loading} className={`w-full py-3.5 text-white font-bold rounded-2xl text-sm shadow-sm flex items-center justify-center gap-2 mt-5 ${signInCode.length >= 6 ? 'bg-[#2563EB]' : 'bg-[#82ACF9]'}`}>
              <span>{loading ? 'Verifying...' : 'Sign in with code'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-center text-xs text-slate-500 mt-6 font-medium">
          Don&apos;t have an account? <button type="button" onClick={onSignup} className="text-[#2563EB] font-extrabold cursor-pointer">Sign up</button>
        </div>

        <SignInDemoDrawer onQuickLogin={(r, em, pw) => { setEmail(em); setPassword(pw); onLogin(r) }} />
      </div>
      <button type="button" onClick={onBack} className="text-xs font-semibold text-slate-500 hover:text-slate-800 text-center mt-5 cursor-pointer flex items-center gap-1">← Back to Welcome</button>
    </div>
  )
}
