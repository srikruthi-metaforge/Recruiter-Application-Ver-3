import React, { useState } from 'react'
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react'

interface ForgotPasswordPageProps {
  initialEmail?: string
  onBack: () => void
  onSent?: () => void
}

export function ForgotPasswordPage({ initialEmail, onBack }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState(initialEmail || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 font-sans">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-2xl max-w-md w-full text-center animate-in fade-in duration-200">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Instructions Sent!</h2>
          <p className="text-xs text-slate-500 font-medium mb-6">
            We sent password reset recovery instructions to <span className="font-bold text-slate-800">{email}</span>.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="w-full py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-2xl text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      {/* CARD MATCHING USER SCREENSHOT 4 */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-slate-900/5 max-w-md w-full animate-in fade-in duration-200">
        {/* TITLE & DESCRIPTION */}
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight text-center">Forgot Password</h1>
        <p className="text-xs text-slate-500 text-center mt-2 max-w-xs mx-auto leading-relaxed font-normal">
          Enter your email and we&apos;ll send you instructions to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6" noValidate>
          {/* EMAIL */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Email</label>
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl focus-within:border-blue-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-600/10 px-3.5 py-3 flex items-center gap-2.5 transition-all">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  setError('')
                }}
                placeholder="you@example.com"
                className="w-full bg-transparent text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            {error && <p className="text-[11px] text-rose-500 font-medium mt-1">{error}</p>}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-2xl text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer mt-6 disabled:opacity-60"
          >
            <span>{loading ? 'Sending Instructions...' : 'Send Reset Instructions'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* FOOTER */}
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 text-center mt-6 cursor-pointer block mx-auto transition-colors"
        >
          ← Back to Login
        </button>
      </div>
    </div>
  )
}
