import React, { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, Shield, ArrowRight, Sparkles, Zap } from 'lucide-react'
import { Role } from '../../types'
import { DEMO_ACCOUNTS, ROLE_META } from '../../data/mockData'
import { AuthLayout } from './AuthLayout'

interface LoginPageProps {
  onLogin: (role: Role) => void
  onForgot: () => void
  onSignup: () => void
}

export function LoginPage({ onLogin, onForgot, onSignup }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const [loading, setLoading] = useState(false)
  const [quickRole, setQuickRole] = useState<Role | null>('superadmin')

  const fillDemo = (role: Role) => {
    setQuickRole(role)
    setEmail(DEMO_ACCOUNTS[role].email)
    setPassword(DEMO_ACCOUNTS[role].password)
    setErrors({})
  }

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    onLogin(quickRole || 'superadmin')
  }

  const handleDemoClick = (role: Role) => {
    fillDemo(role)
    onLogin(role)
  }

  return (
    <AuthLayout>
      <div className="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-xl">
        {/* Direct One-Click Console Launcher */}
        <div className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-300" /> Redesigned Enterprise Demo
            </span>
            <span className="text-[10px] font-mono text-blue-100">Live Console</span>
          </div>
          <p className="text-xs text-blue-100 font-body mb-3">
            Explore the updated dashboards, visual charts, command palette, and candidate Kanban boards.
          </p>
          <button
            onClick={() => onLogin(quickRole || 'superadmin')}
            className="w-full py-2 bg-white text-blue-700 hover:bg-blue-50 font-bold font-sans text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
          >
            Launch Redesigned Dashboard Directly <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 font-sans tracking-tight">Select Demo Persona</h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">Click any role to enter that persona dashboard view</p>
        </div>

        {/* Quick Demo Role Selector */}
        <div className="mb-6 bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
          <div className="grid grid-cols-2 gap-2">
            {(Object.entries(ROLE_META) as [Role, typeof ROLE_META[Role]][]).map(([r, meta]) => (
              <button
                key={r}
                type="button"
                onClick={() => handleDemoClick(r)}
                className={`px-3 py-2.5 rounded-lg border text-left transition-all hover:scale-[1.02] active:scale-95 ${
                  quickRole === r
                    ? `${meta.bg} ${meta.border} shadow-xs font-semibold ring-2 ring-blue-500/20`
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <p className={`text-xs font-sans font-bold ${quickRole === r ? meta.color : 'text-slate-900'}`}>{meta.label}</p>
                <p className="text-[9px] font-mono text-slate-400 truncate">{meta.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <button
            type="submit"
            className="w-full h-11 bg-slate-900 hover:bg-blue-600 text-white font-semibold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 font-sans"
          >
            <span>Enter Console as {ROLE_META[quickRole || 'superadmin'].label}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </AuthLayout>
  )
}
