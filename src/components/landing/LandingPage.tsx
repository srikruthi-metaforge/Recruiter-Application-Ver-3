import React from 'react'
import { ShieldCheck } from 'lucide-react'
import { MetaforgeLogo } from '../common/MetaforgeLogo'
import { LandingHeader } from './LandingHeader'
import { LandingHeroSection } from './LandingHeroSection'
import { LandingAiAndWorkflowSections, LandingCapabilitiesAndGovernanceSections } from './LandingBodySections'

interface LandingPageProps {
  onSignIn: () => void
  onRequestAccess: () => void
}

export function LandingPage({ onSignIn, onRequestAccess }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden text-slate-800">
      <LandingHeader onSignIn={onSignIn} onRequestAccess={onRequestAccess} />
      <LandingHeroSection onSignIn={onSignIn} onRequestAccess={onRequestAccess} />
      <LandingAiAndWorkflowSections />
      <LandingCapabilitiesAndGovernanceSections />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MetaforgeLogo variant="dark" size="sm" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
              Recruiter Intelligence Platform
            </span>
          </div>
          <div className="flex items-center gap-5 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Enterprise Governed
            </span>
            <span>v3.2.0</span>
            <span>© 2026 MetaForge</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
