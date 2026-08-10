import React, { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react'
import { Role } from '../../types'
import { DEMO_ACCOUNTS } from '../../data/mockData'
import { brand, roleTheme } from '../../theme'

interface RoleLoginPageProps {
  role: Role
  onLogin: (role: Role) => void
  onBack: () => void
  onForgot: () => void
}

export function RoleLoginPage({ role, onLogin, onBack, onForgot }: RoleLoginPageProps) {
  const theme = roleTheme[role]
  const account = DEMO_ACCOUNTS[role]

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const emailMatch = email.trim().toLowerCase() === account.email.toLowerCase()
      const passMatch = password === account.password

      if (emailMatch && passMatch) {
        onLogin(role)
      } else {
        setError('Invalid email or password. Use the demo credentials below.')
        setLoading(false)
      }
    }, 600)
  }

  const fillDemo = () => {
    setEmail(account.email)
    setPassword(account.password)
    setError('')
  }

  return (
    <div className="min-h-screen flex" style={{ background: brand.background }}>
      {/* Role-branded panel */}
      <div
        className="hidden lg:flex lg:w-[440px] xl:w-[480px] flex-col justify-between p-12 text-white flex-shrink-0"
        style={{ background: theme.gradient }}
      >
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-12 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All portals
          </button>

          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center font-bold text-sm">
              TF
            </div>
            <div>
              <p className="font-semibold text-lg">{brand.name}</p>
              <p className="text-xs text-white/60">{theme.label} Portal</p>
            </div>
          </div>

          <h1 className="text-3xl font-bold leading-snug mb-3">{theme.portalTitle}</h1>
          <p className="text-white/75 text-sm leading-relaxed max-w-xs">{theme.portalDesc}</p>
        </div>

        <div className="rounded-xl bg-white/10 p-4">
          <p className="text-xs text-white/50 mb-2 uppercase tracking-wide font-medium">Demo account</p>
          <p className="text-sm font-medium">{account.name}</p>
          <p className="text-xs text-white/60 mt-0.5">{account.email}</p>
        </div>
      </div>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <button
            onClick={onBack}
            className="lg:hidden flex items-center gap-1.5 text-sm mb-6 transition-colors"
            style={{ color: brand.textSecondary }}
          >
            <ArrowLeft className="w-4 h-4" /> Back to portals
          </button>

          <div
            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold mb-4"
            style={{ background: theme.accentLight, color: theme.accent }}
          >
            {theme.label} Login
          </div>

          <h2 className="text-2xl font-bold mb-1" style={{ color: brand.text }}>
            Welcome back
          </h2>
          <p className="text-sm mb-6" style={{ color: brand.textSecondary }}>
            Sign in to access your {theme.label.toLowerCase()} workspace.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: brand.text }}>
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: brand.textMuted }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={account.email}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: brand.border, color: brand.text, boxShadow: 'none' }}
                  onFocus={e => (e.currentTarget.style.outline = `2px solid ${theme.accent}33`)}
                  onBlur={e => (e.currentTarget.style.outline = 'none')}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: brand.text }}>
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: brand.textMuted }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: brand.border, color: brand.text }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: brand.textMuted }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs px-3 py-2 rounded-lg" style={{ background: brand.dangerLight, color: brand.danger }}>
                {error}
              </p>
            )}

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={fillDemo}
                className="text-xs font-medium hover:underline"
                style={{ color: theme.accent }}
              >
                Use demo credentials
              </button>
              <button
                type="button"
                onClick={onForgot}
                className="text-xs hover:underline"
                style={{ color: brand.textSecondary }}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-white text-sm font-semibold flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
              style={{ background: theme.accent }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
