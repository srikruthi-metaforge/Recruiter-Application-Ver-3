import React, { useState } from 'react'
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Briefcase,
  Calendar,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  Gauge,
  Layers,
  Lock,
  Menu,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import { Role } from '../../types'
import { roleTheme } from '../../theme'
import { MetaforgeLogo } from '../common/MetaforgeLogo'

interface LandingPageProps {
  onSignIn: () => void
  onRequestAccess: () => void
}

const NAV_LINKS = [
  { label: 'Platform', href: '#platform' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Roles', href: '#roles' },
  { label: 'Security', href: '#security' },
]

const HERO_STATS = [
  { value: '226', label: 'Submissions / mo' },
  { value: '52', label: 'Interviews / mo' },
  { value: '16', label: 'Placements / mo' },
  { value: '4', label: 'Access tiers' },
]

const CAPABILITIES: { icon: React.ElementType; title: string; desc: string; tone: string }[] = [
  {
    icon: ClipboardList,
    title: 'Requirement Management',
    desc: 'Capture every client requirement with priority, openings, budget and due dates in one live register.',
    tone: '#1B4FD8',
  },
  {
    icon: UserCheck,
    title: 'Recruiter Assignment',
    desc: 'Route requirements to leads and recruiters, track ownership and reassign without losing history.',
    tone: '#0E7490',
  },
  {
    icon: FileSearch,
    title: 'Resume & JD Parsing',
    desc: 'AI extracts skills, experience and qualifications from resumes and job descriptions automatically.',
    tone: '#7C3AED',
  },
  {
    icon: Target,
    title: 'JD vs Resume Matching',
    desc: 'Every candidate carries a match score so recruiters submit the strongest profile first, every time.',
    tone: '#059669',
  },
  {
    icon: Send,
    title: 'Submissions & Lead Review',
    desc: 'Structured submission pipeline with lead approval gates before anything reaches the client.',
    tone: '#D97706',
  },
  {
    icon: Calendar,
    title: 'Interviews & Offers',
    desc: 'Schedule rounds, capture feedback at every stage and drive candidates through to offer and placement.',
    tone: '#DB2777',
  },
  {
    icon: TrendingUp,
    title: 'Recruiter Performance',
    desc: 'Targets, throughput, TAT and stage velocity per recruiter, team, client and domain.',
    tone: '#4338CA',
  },
  {
    icon: BarChart3,
    title: 'Reports & Analytics',
    desc: 'Client delivery gaps, coverage, pipeline health and monthly timelines rendered in real time.',
    tone: '#0891B2',
  },
  {
    icon: Shield,
    title: 'RBAC & Audit Logs',
    desc: 'Role-scoped access with a full activity trail of who changed what, when and from where.',
    tone: '#BE123C',
  },
]

const WORKFLOW = [
  { icon: Briefcase, title: 'Requirement Intake', desc: 'Client requirement captured and prioritised' },
  { icon: UserCheck, title: 'Assignment', desc: 'Routed to the right lead and recruiters' },
  { icon: UserPlus, title: 'Sourcing & Parsing', desc: 'Resumes parsed, candidates enriched' },
  { icon: Target, title: 'AI Matching', desc: 'JD vs resume scoring ranks the shortlist' },
  { icon: Send, title: 'Submission', desc: 'Candidate packaged and submitted' },
  { icon: ShieldCheck, title: 'Lead Review', desc: 'Quality gate before the client sees it' },
  { icon: Calendar, title: 'Interviews', desc: 'Rounds scheduled, feedback captured' },
  { icon: CheckCircle2, title: 'Offer & Placement', desc: 'Offer rolled out, placement recorded' },
]

const LANDING_ROLES: { role: Role; icon: React.ElementType; points: string[] }[] = [
  {
    role: 'superadmin',
    icon: Shield,
    points: ['Organization-wide analytics', 'User management & RBAC', 'Audit logs and settings'],
  },
  {
    role: 'admin',
    icon: Terminal,
    points: ['Clients, teams and recruiters', 'Requirement oversight', 'Regional performance reports'],
  },
  {
    role: 'lead',
    icon: Users,
    points: ['Team quotas and targets', 'Submission review gate', 'Interview pipeline tracking'],
  },
  {
    role: 'recruiter',
    icon: UserPlus,
    points: ['Assigned requirements', 'Candidate submissions', 'Daily targets and feedback'],
  },
]

const SECURITY_POINTS = [
  { icon: Lock, title: 'Role-based access control', desc: 'Every screen, action and record scoped to the signed-in role.' },
  { icon: Activity, title: 'Complete audit trail', desc: 'Immutable activity logs across submissions, users and clients.' },
  { icon: Bell, title: 'Governed notifications', desc: 'Targeted alerts for reviews, interviews and requirement changes.' },
  { icon: Gauge, title: 'Built for scale', desc: 'Multi-team, multi-client operations without losing traceability.' },
]

export function LandingPage({ onSignIn, onRequestAccess }: LandingPageProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      {/* ---------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ---------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <MetaforgeLogo variant="dark" size="md" />
            <span className="hidden sm:block h-6 w-px bg-slate-200" />
            <span className="hidden sm:block text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold leading-tight">
              Recruiter Intelligence
              <br />
              Platform
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onRequestAccess}
              className="hidden sm:inline-flex h-10 items-center px-4 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-mono font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all cursor-pointer"
            >
              Request Access
            </button>
            <button
              type="button"
              onClick={onSignIn}
              className="inline-flex h-10 items-center gap-2 px-4 sm:px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 transition-all active:scale-[0.98] cursor-pointer"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(o => !o)}
              className="lg:hidden w-10 h-10 rounded-xl border border-slate-300 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-slate-200/80 bg-white px-5 sm:px-8 py-4 space-y-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                onRequestAccess()
              }}
              className="w-full mt-2 h-11 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-mono font-semibold hover:bg-slate-50 transition-all cursor-pointer"
            >
              Request Access
            </button>
          </div>
        )}
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section id="platform" className="relative bg-[#0B1021] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute -top-32 -left-24 w-[500px] h-[500px] bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[560px] h-[560px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] gap-12 lg:gap-14 items-center">
            {/* Copy column */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs font-mono font-medium mb-7 shadow-sm">
                <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                <span>MetaForge Recruiter Application Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-[3.4rem] font-extrabold leading-[1.1] tracking-tight mb-6">
                Recruitment Intelligence.
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  Built for High-Performance Teams.
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mb-9">
                Manage requirements, candidates, submissions, interviews and recruiter performance from one intelligent
                recruitment platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-11">
                <button
                  type="button"
                  onClick={onSignIn}
                  className="h-13 px-7 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  Sign In to MRAP <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onRequestAccess}
                  className="h-13 px-7 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Request Workspace Access
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-800/80 pt-8">
                {HERO_STATS.map(stat => (
                  <div key={stat.label}>
                    <p className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight tabular-nums">
                      {stat.value}
                    </p>
                    <p className="text-[10px] font-mono text-blue-400 mt-1 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Product preview column */}
            <HeroPreview />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Value strip                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {[
            { icon: Bot, title: 'AI-assisted sourcing', desc: 'Parsing and match scoring on every resume and JD.' },
            { icon: Layers, title: 'One connected pipeline', desc: 'Requirement to placement without spreadsheets.' },
            { icon: ShieldCheck, title: 'Enterprise governance', desc: 'RBAC, audit logs and reviewable approvals.' },
          ].map(item => (
            <div key={item.title} className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Capabilities                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section id="capabilities" className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Platform Capabilities"
            title="Everything a recruitment organization runs on"
            subtitle="MRAP covers the full delivery lifecycle — intake, sourcing, matching, review, interviews and reporting — in a single governed workspace."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {CAPABILITIES.map(item => (
              <article
                key={item.title}
                className="group bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 hover:border-blue-500/40 transition-all duration-200"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105"
                  style={{ background: `${item.tone}14`, color: item.tone }}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1.5">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Workflow                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section id="workflow" className="py-16 sm:py-20 lg:py-24 bg-white border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Delivery Workflow"
            title="From client requirement to confirmed placement"
            subtitle="Each stage is tracked, owned and measurable — so leads know where every candidate stands without chasing an update."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {WORKFLOW.map((stage, i) => (
              <div
                key={stage.title}
                className="relative bg-slate-50 border border-slate-200/90 rounded-2xl p-5 hover:border-blue-500/40 hover:bg-white hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-blue-600 flex items-center justify-center shadow-sm">
                    <stage.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-300 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900 tracking-tight">{stage.title}</p>
                <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Roles                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section id="roles" className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Role-Based Workspaces"
            title="A scoped console for every person in the org"
            subtitle="Super Admin, Admin, Lead and Recruiter each sign in to a workspace tuned to what they own — nothing more, nothing less."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {LANDING_ROLES.map(({ role, icon: Icon, points }) => {
              const theme = roleTheme[role]
              return (
                <article
                  key={role}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm"
                    style={{ background: theme.accentLight, color: theme.accent }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">{theme.label}</h3>
                  <p className="text-[11px] font-mono uppercase tracking-wider mt-1 mb-4" style={{ color: theme.accent }}>
                    {theme.portalTitle}
                  </p>
                  <ul className="space-y-2 mt-auto">
                    {points.map(point => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: theme.accent }} />
                        <span className="text-xs text-slate-600 font-medium leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Security                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section id="security" className="py-16 sm:py-20 lg:py-24 bg-white border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 border border-blue-200/80 text-blue-700 text-[11px] font-mono font-bold uppercase tracking-wider mb-4">
              Security & Governance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Enterprise controls that hold up to an audit
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed mb-8">
              MRAP is built for organizations where access boundaries and traceability matter. Permissions follow the
              role, and every meaningful action leaves a record.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {SECURITY_POINTS.map(point => (
                <div key={point.title}>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-3">
                    <point.icon className="w-4.5 h-4.5" />
                  </div>
                  <p className="text-sm font-bold text-slate-900">{point.title}</p>
                  <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl bg-[#0B1021] border border-slate-800 p-7 sm:p-9 overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  'linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-5 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-blue-400" /> Recent Activity Log
              </p>

              <div className="space-y-2.5">
                {[
                  { actor: 'Robert Haines', action: 'Updated role permissions', tag: 'Super Admin', tone: '#A78BFA' },
                  { actor: 'David Park', action: 'Assigned REQ-2043 to Team North', tag: 'Admin', tone: '#60A5FA' },
                  { actor: 'Harish Gadipally', action: 'Approved 3 candidate submissions', tag: 'Lead', tone: '#22D3EE' },
                  { actor: 'Marcus Chen', action: 'Submitted candidate — 94% match', tag: 'Recruiter', tone: '#34D399' },
                ].map(row => (
                  <div
                    key={row.action}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] border border-white/5 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{row.action}</p>
                      <p className="text-[10px] font-mono text-slate-400 mt-0.5 truncate">{row.actor}</p>
                    </div>
                    <span
                      className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex-shrink-0"
                      style={{ background: `${row.tone}1A`, color: row.tone }}
                    >
                      {row.tag}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Immutable audit trail
                </span>
                <span>RBAC enforced</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Final CTA                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="relative rounded-3xl bg-[#0B1021] overflow-hidden px-7 sm:px-12 lg:px-16 py-12 sm:py-16 text-center shadow-2xl border border-slate-800">
            <div className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                Your recruitment workspace is waiting
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto mb-9">
                Sign in to pick up your requirements, submissions and interviews — or request access and your
                administrator will provision the right role.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  type="button"
                  onClick={onSignIn}
                  className="h-13 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  Sign In <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onRequestAccess}
                  className="h-13 px-8 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold transition-all cursor-pointer"
                >
                  Request Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Footer                                                            */}
      {/* ---------------------------------------------------------------- */}
      <footer className="bg-white border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MetaforgeLogo variant="dark" size="sm" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
              Recruiter Application Platform
            </span>
          </div>
          <div className="flex items-center gap-5 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Enterprise Secured
            </span>
            <span>v3.2.0</span>
            <span>© 2026 MetaForge</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Local building blocks                                               */
/* ------------------------------------------------------------------ */

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
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

/** Stylised in-product snapshot shown beside the hero copy. */
function HeroPreview() {
  const kpis = [
    { label: 'Active Requirements', value: '38', delta: '+6 this week', tone: '#60A5FA' },
    { label: 'Pending Lead Review', value: '12', delta: '4 due today', tone: '#FBBF24' },
    { label: 'Interviews Scheduled', value: '17', delta: 'Next in 2h', tone: '#34D399' },
    { label: 'Offers In Flight', value: '5', delta: '2 awaiting sign-off', tone: '#A78BFA' },
  ]

  const pipeline = [
    { stage: 'Submitted', pct: 100, count: 226 },
    { stage: 'Client Review', pct: 68, count: 154 },
    { stage: 'Interview', pct: 34, count: 77 },
    { stage: 'Offer', pct: 14, count: 32 },
    { stage: 'Placed', pct: 7, count: 16 },
  ]

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 via-indigo-500/10 to-purple-600/20 rounded-[2rem] blur-2xl pointer-events-none" />

      <div className="relative rounded-3xl bg-slate-900/70 border border-slate-700/60 backdrop-blur-xl p-5 sm:p-6 shadow-2xl">
        {/* Window chrome */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Lead Workspace</span>
        </div>

        {/* KPI grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {kpis.map(kpi => (
            <div key={kpi.label} className="rounded-xl bg-white/[0.05] border border-white/10 p-3.5">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider truncate">{kpi.label}</p>
              <p className="text-2xl font-bold text-white tabular-nums mt-1.5" style={{ color: kpi.tone }}>
                {kpi.value}
              </p>
              <p className="text-[10px] font-mono text-slate-500 mt-0.5 truncate">{kpi.delta}</p>
            </div>
          ))}
        </div>

        {/* Pipeline funnel */}
        <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
          <div className="flex items-center justify-between mb-3.5">
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
              Submission Pipeline
            </p>
            <span className="text-[10px] font-mono text-blue-400">Live</span>
          </div>

          <div className="space-y-2.5">
            {pipeline.map(row => (
              <div key={row.stage}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-slate-300">{row.stage}</span>
                  <span className="text-[11px] font-mono text-slate-400 tabular-nums">{row.count}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-400"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI match strip */}
        <div className="mt-4 rounded-xl bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/25 p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">AI match: Priya Nair → REQ-2043</p>
            <p className="text-[10px] font-mono text-blue-300 mt-0.5">94% skill alignment · resume parsed</p>
          </div>
        </div>
      </div>
    </div>
  )
}
