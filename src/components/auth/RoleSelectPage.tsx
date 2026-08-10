import React from 'react'
import { Shield, UserCheck, Users, User, ArrowRight, Building2 } from 'lucide-react'
import { Role } from '../../types'
import { brand, roleTheme } from '../../theme'

interface RoleSelectPageProps {
  onSelectRole: (role: Role) => void
}

const ROLES: { role: Role; icon: React.ElementType }[] = [
  { role: 'superadmin', icon: Shield },
  { role: 'admin', icon: UserCheck },
  { role: 'lead', icon: Users },
  { role: 'recruiter', icon: User },
  { role: 'client', icon: Building2 },
]

export function RoleSelectPage({ onSelectRole }: RoleSelectPageProps) {
  return (
    <div className="min-h-screen flex" style={{ background: brand.background }}>
      {/* Left brand panel */}
      <div
        className="hidden lg:flex lg:w-[440px] xl:w-[480px] flex-col justify-between p-12 text-white flex-shrink-0"
        style={{ background: brand.primary }}
      >
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center font-bold text-sm">
              TF
            </div>
            <div>
              <p className="font-semibold text-lg">{brand.name}</p>
              <p className="text-xs text-white/60">Enterprise Recruitment Platform</p>
            </div>
          </div>

          <h1 className="text-3xl font-bold leading-snug mb-4">
            Sign in to your<br />role portal
          </h1>
          <p className="text-white/70 text-sm leading-relaxed max-w-xs">
            Each role has a dedicated login with scoped access to requirements, submissions, and analytics.
          </p>
        </div>

        <p className="text-xs text-white/40">© 2026 TalentFlow Inc. · v3.0</p>
      </div>

      {/* Role cards */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-lg">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: brand.primary }}
            >
              TF
            </div>
            <span className="font-semibold text-lg" style={{ color: brand.text }}>
              {brand.name}
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-1" style={{ color: brand.text }}>
            Select your portal
          </h2>
          <p className="text-sm mb-8" style={{ color: brand.textSecondary }}>
            Choose your role to continue to the secure login page.
          </p>

          <div className="space-y-3">
            {ROLES.map(({ role, icon: Icon }) => {
              const theme = roleTheme[role]
              return (
                <button
                  key={role}
                  onClick={() => onSelectRole(role)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border bg-white text-left transition-all hover:shadow-md group"
                  style={{ borderColor: brand.border }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: theme.accentLight, color: theme.accent }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm" style={{ color: brand.text }}>
                      {theme.label}
                    </p>
                    <p className="text-xs truncate" style={{ color: brand.textSecondary }}>
                      {theme.portalTitle}
                    </p>
                  </div>
                  <ArrowRight
                    className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0"
                    style={{ color: theme.accent }}
                  />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
