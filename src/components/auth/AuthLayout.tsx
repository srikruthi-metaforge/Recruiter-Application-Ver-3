import React from 'react'
import { ShieldCheck, Award, Users, Sparkles, CheckCircle2 } from 'lucide-react'
import { MetaforgeLogo } from '../common/MetaforgeLogo'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel - Branding & Platform Showcase */}
      <div className="hidden lg:flex w-[520px] flex-shrink-0 bg-[#0B101D] flex-col relative overflow-hidden text-white border-r border-slate-800">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Ambient lighting glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full px-12 py-12">

          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div>
              <MetaforgeLogo variant="light" size="lg" />
              <p className="text-[10px] text-slate-400 font-mono tracking-wider mt-1">RECRUITER INTELLIGENCE PLATFORM</p>
            </div>
          </div>

          {/* Headline */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6 w-max">
              <Sparkles className="w-3.5 h-3.5" /> Next-Gen Enterprise Recruitment Console
            </div>

            <h2 className="text-4xl font-extrabold text-white leading-tight mb-6 font-sans tracking-tight">
              Manage every<br />placement & candidate,<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                end to end.
              </span>
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm font-body">
              Track active requirements, recruiter submissions, and interview pipelines across your entire staffing enterprise in real time.
            </p>

            {/* Feature Highlights */}
            <div className="mt-8 space-y-3">
              {[
                'Role-isolated access (Super Admin, Admin, Lead, Recruiter)',
                'AI candidate match score calculation',
                'Live pipeline feedback & placement analytics',
              ].map(f => (
                <div key={f} className="flex items-center gap-2.5 text-xs text-slate-300 font-body">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            {/* Stats strip */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-800 pt-8">
              {[
                { val: '226', label: 'Submissions / mo' },
                { val: '52', label: 'Interviews / mo' },
                { val: '16', label: 'Placements / mo' },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-2xl font-bold font-mono text-white">{s.val}</p>
                  <p className="text-[11px] font-mono text-blue-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-slate-500 text-[11px] font-mono pt-6">
            <span>© 2026 TalentFlow Inc.</span>
            <span>v2.4.1 Enterprise</span>
          </div>
        </div>
      </div>

      {/* Right panel - Form container */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold font-mono text-xs shadow-xs">
              TF
            </div>
            <span className="text-slate-900 font-bold text-base font-sans">TalentFlow</span>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
