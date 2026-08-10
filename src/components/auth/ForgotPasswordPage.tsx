import React, { useState } from 'react'
import { Mail, Key, CheckCircle2, ArrowLeft } from 'lucide-react'
import { AuthLayout } from './AuthLayout'
import { DEMO_ACCOUNTS, ROLE_META } from '../../data/mockData'
import { Role } from '../../types'

interface ForgotPasswordPageProps {
  onBack: () => void
  onSent: () => void
}

export function ForgotPasswordPage({ onBack, onSent }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!email) {
      setError('Work email is required')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid work email address')
      return
    }

    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 800)
  }

  if (sent) {
    return (
      <AuthLayout>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-xl">
          <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-sans tracking-tight mb-2">Check your inbox</h1>
          <p className="text-xs text-slate-500 font-mono mb-4">
            We sent a password reset link to <span className="text-slate-900 font-semibold">{email}</span>.
          </p>

          <button
            onClick={onBack}
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs font-mono transition-all shadow-md shadow-blue-600/20"
          >
            ← Back to Sign In
          </button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <div className="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-xl">
        <button onClick={onBack} className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-slate-700 mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
        </button>

        <div className="w-12 h-12 bg-amber-50 border border-amber-200 text-amber-600 rounded-xl flex items-center justify-center mb-4">
          <Key className="w-6 h-6" />
        </div>

        <h1 className="text-xl font-bold text-slate-900 font-sans tracking-tight mb-1">Reset password</h1>
        <p className="text-xs text-slate-500 font-mono mb-6">Enter your email and we'll send password recovery instructions.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono font-semibold uppercase text-slate-600">Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  setError('')
                }}
                className={`w-full h-11 pl-10 pr-3 text-sm bg-slate-50 border rounded-xl focus:outline-none transition-colors ${
                  error ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-blue-600 focus:bg-white'
                }`}
              />
            </div>
            {error && <p className="text-[11px] font-mono text-rose-500">{error}</p>}
          </div>

          {/* Quick Demo Helper */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs space-y-1">
            <p className="font-mono text-[10px] text-slate-400 uppercase">Demo Emails:</p>
            {(Object.entries(DEMO_ACCOUNTS) as [Role, typeof DEMO_ACCOUNTS[Role]][]).map(([r, acc]) => (
              <button
                key={r}
                type="button"
                onClick={() => setEmail(acc.email)}
                className="block text-left text-[11px] font-mono text-blue-600 hover:underline"
              >
                {ROLE_META[r].label}: {acc.email}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-blue-600/20 active:scale-95 disabled:opacity-60 font-sans"
          >
            {loading ? 'Sending link...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </AuthLayout>
  )
}
