import React from 'react'
import { ShieldCheck } from 'lucide-react'
import { AI_CAPABILITIES, RECRUITMENT_WORKFLOW, ENTERPRISE_CAPABILITIES, GOVERNANCE_PILLARS } from './landingData'

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="max-w-2xl mb-10 sm:mb-12">
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 border border-blue-200/80 text-blue-700 text-[11px] font-mono font-bold uppercase tracking-wider mb-4">
        {eyebrow}
      </span>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">{title}</h2>
      <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">{subtitle}</p>
    </div>
  )
}

export function LandingAiAndWorkflowSections() {
  return (
    <>
      <section id="ai-intelligence" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="AI Intelligence Engine"
            title="Embedded recruitment AI for faster, higher-quality sourcing"
            subtitle="Eliminate manual screening bottlenecks with automated JD parsing, resume extraction, semantic match scoring, and duplicate detection."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {AI_CAPABILITIES.map(item => (
              <div
                key={item.title}
                className="group bg-slate-50/80 border border-slate-200/90 rounded-3xl p-6 shadow-2xs hover:shadow-xl hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-white transition-all duration-200"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105 shadow-2xs"
                  style={{ background: `${item.tone}1A`, color: item.tone }}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="py-16 sm:py-20 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/25 text-blue-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-4">
              Lifecycle Governance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
              End-to-end recruitment lifecycle workflow
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
              Every requirement moves through structured, traceable stages from initial intake to final candidate placement.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RECRUITMENT_WORKFLOW.map(stage => (
              <div
                key={stage.title}
                className="bg-slate-800/60 border border-slate-700/70 rounded-3xl p-5 hover:border-blue-500/50 hover:bg-slate-800/90 transition-all duration-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold">
                    <stage.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-extrabold text-blue-400">{stage.step}</span>
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">{stage.title}</h4>
                  <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function LandingCapabilitiesAndGovernanceSections() {
  return (
    <>
      <section id="capabilities" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Enterprise Capabilities"
            title="Comprehensive module suite for enterprise hiring teams"
            subtitle="Built for structured recruitment operations across multi-client accounts, team pods, and dedicated recruiters."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ENTERPRISE_CAPABILITIES.map(cap => (
              <div
                key={cap.title}
                className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-purple-300 transition-all duration-200 space-y-2.5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#6B3BF6] border border-purple-200/80 flex items-center justify-center shrink-0">
                    <cap.icon className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">{cap.title}</h3>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="governance" className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 border border-blue-200/80 text-blue-700 text-[11px] font-mono font-bold uppercase tracking-wider mb-4">
                Governance & Intelligence
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                Controlled recruitment operations designed for accountability
              </h2>
              <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed mb-8">
                MetaForge Recruiter Application Platform provides centralized visibility and role-governed execution across every tier of your hiring organization.
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                {GOVERNANCE_PILLARS.map(p => (
                  <div key={p.title} className="space-y-2">
                    <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-2xs">
                      <p.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900">{p.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl bg-[#0B1021] border border-slate-800 p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                  <h3 className="text-sm font-extrabold text-white">Role Governance Matrix</h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">● Active Governance</span>
              </div>
              <div className="space-y-3 text-xs">
                {[
                  { role: 'Super Admin', access: 'Full System Administration, User Management & System Audit Logs' },
                  { role: 'Admin', access: 'Regional Operations, Clients, Teams & Recruiter Oversight' },
                  { role: 'Team Lead', access: 'Pod Allocations, Submission Quality Review & SLA Tracking' },
                  { role: 'Recruiter', access: 'Candidate Sourcing, Resume Uploads & Requirements Execution' },
                  { role: 'Client Portal', access: 'Isolated View of Assigned Requirements & Submissions' },
                ].map(r => (
                  <div key={r.role} className="p-3 bg-white/[0.04] border border-white/5 rounded-2xl space-y-1">
                    <span className="font-extrabold text-blue-300 text-xs">{r.role}</span>
                    <p className="text-[11px] text-slate-400 font-medium">{r.access}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
