import React from 'react'
import { KeyRound } from 'lucide-react'
import { Role } from '../../types'
import { DEMO_ACCOUNTS } from '../../data/mockData'
import { roleTheme } from '../../theme'

interface SignInDemoDrawerProps {
  onQuickLogin: (role: Role, email: string, pass: string) => void
}

export function SignInDemoDrawer({ onQuickLogin }: SignInDemoDrawerProps) {
  return (
    <div className="mt-6 pt-4 border-t border-slate-100">
      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest text-center mb-2 font-bold flex items-center justify-center gap-1.5">
        <KeyRound className="w-3 h-3 text-blue-500" />
        <span>Quick Demo Credentials Logins</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {(['superadmin', 'admin', 'lead', 'recruiter'] as Role[]).map(r => {
          const acc = DEMO_ACCOUNTS[r]
          return (
            <button
              key={r}
              type="button"
              onClick={() => onQuickLogin(r, acc.email, acc.password)}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-[11px] font-semibold text-slate-700 hover:text-blue-700 transition-all text-center cursor-pointer capitalize"
            >
              {roleTheme[r].label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
