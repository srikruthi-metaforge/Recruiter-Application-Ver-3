import React, { useState, useMemo } from 'react'
import {
  FileText,
  Search,
  ChevronDown,
  Target,
  Users,
  BarChart3,
  Briefcase,
  UserCheck,
  Building2,
  Trophy,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Clock,
  Send,
  MessageSquare,
  Award,
  Calendar,
  Filter,
  Activity,
  ArrowUpRight,
  PieChart,
  User,
  ShieldCheck,
  Zap,
  Sparkles,
  AlertCircle,
} from 'lucide-react'
import { Role } from '../../types'
import { PaginationFooter } from '../ui/PaginationFooter'

interface ReportsPageProps {
  role?: Role
}

export function ReportsPage({ role = 'recruiter' }: ReportsPageProps) {
  const [dateRange, setDateRange] = useState('30_days')
  const [selectedDept, setSelectedDept] = useState('All Departments')
  const [selectedTeam, setSelectedTeam] = useState('All Teams')
  const [searchQuery, setSearchQuery] = useState('')

  // Pagination for recruiters leaderboard
  const [recruiterPage, setRecruiterPage] = useState(1)
  const [recruiterPageSize, setRecruiterPageSize] = useState(5)

  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  // Super Admin KPI Data
  const superAdminKPIs = {
    totalHires: 124,
    totalSourced: 1480,
    offerAcceptanceRate: '89.2%',
    avgTimeToHire: '16 Days',
    overallConversion: '26.4%',
  }

  // Admin KPI Data
  const adminKPIs = {
    hiresPerTeam: 42,
    interviewsCompleted: 186,
    productivityIndex: '91.4 / 100',
  }

  // Team Lead KPI Data
  const teamLeadKPIs = {
    candidatesHandled: 142,
    interviewsScheduled: 48,
    closures: 11,
    conversionRate: '22.9%',
  }

  // Recruiter Leaderboard Data for Admin & Team Lead
  const teamData = [
    { rank: 1, name: 'Harish Gadipally', team: 'Engineering Team', sourced: 142, scheduled: 48, completed: 36, hired: 11, rate: '22.9%', status: 'Top Performer', velocity: 'Fast (12 Days)' },
    { rank: 2, name: 'Arvind GR', team: 'Engineering Team', sourced: 128, scheduled: 42, completed: 31, hired: 9, rate: '21.4%', status: 'On Track', velocity: 'Normal (15 Days)' },
    { rank: 3, name: 'Charlie Darwin', team: 'Automotive Team', sourced: 110, scheduled: 38, completed: 28, hired: 7, rate: '18.4%', status: 'On Track', velocity: 'Normal (16 Days)' },
    { rank: 4, name: 'Harini Sindey', team: 'ERP & SAP Team', sourced: 95, scheduled: 30, completed: 22, hired: 5, rate: '16.6%', status: 'Needs Coaching', velocity: 'Slow (21 Days)' },
    { rank: 5, name: 'Puttapaka Saiteja', team: 'Automotive Team', sourced: 82, scheduled: 24, completed: 18, hired: 4, rate: '16.6%', status: 'Critical Review', velocity: 'Slow (24 Days)' },
  ]

  const filteredTeam = useMemo(() => {
    return teamData.filter(t => {
      if (selectedTeam !== 'All Teams' && t.team !== selectedTeam) return false
      if (searchQuery.trim() && !t.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
  }, [teamData, selectedTeam, searchQuery])

  const paginatedTeam = useMemo(() => {
    const start = (recruiterPage - 1) * recruiterPageSize
    return filteredTeam.slice(start, start + recruiterPageSize)
  }, [filteredTeam, recruiterPage, recruiterPageSize])

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800">
      {/* 1. TOP HEADER & ROLE IDENTIFIER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reports & Performance</h1>

            {role === 'superadmin' && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-200 inline-flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                <span>🔴 Super Admin View (Executive Analytics)</span>
              </span>
            )}

            {role === 'admin' && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-200 inline-flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <span>🟠 Admin View (Operational Performance)</span>
              </span>
            )}

            {role === 'lead' && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-900 border border-blue-200 inline-flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>🔵 Team Lead View (Team Execution)</span>
              </span>
            )}

            {role === 'recruiter' && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EEF2FF] text-[#5B51D8] border border-[#C7D2FE] inline-flex items-center gap-1.5 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5B51D8]" />
                <span>My Performance Only</span>
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500 mt-1">
            {role === 'superadmin' && 'Company-wide hiring performance, executive KPIs, department conversion funnels, and efficiency scores.'}
            {role === 'admin' && 'Team & recruiter operational productivity, recruiter comparisons, and pipeline drop-off analysis.'}
            {role === 'lead' && 'Team member execution, high vs slow performer identification, and daily closure metrics.'}
            {role === 'recruiter' && 'Your personal sourcing metrics, conversion funnel, and weekly interview progress.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Filters */}
          {(role === 'superadmin' || role === 'admin') && (
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
            >
              <option value="All Departments">All Departments</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Hardware & Automotive">Hardware & Automotive</option>
              <option value="Enterprise Applications">Enterprise Applications</option>
            </select>
          )}

          <select
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
          >
            <option value="7_days">Last 7 Days</option>
            <option value="30_days">Last 30 Days</option>
            <option value="90_days">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>

          <button
            onClick={() => showToast(`Exporting ${role.toUpperCase()} Executive Performance CSV Report...`)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 2. ROLE-BASED TOP KPI CARDS */}

      {/* 🔴 SUPER ADMIN REVENUE & EXECUTIVE KPIS */}
      {role === 'superadmin' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-4 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#5B51D8] uppercase tracking-wider">Total Hires Joined</span>
              <Award className="w-4 h-4 text-[#5B51D8]" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{superAdminKPIs.totalHires}</p>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+24% YoY Company Growth</span>
            </span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">Total Sourced</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{superAdminKPIs.totalSourced}</p>
            <span className="text-[10px] text-blue-600 font-medium">Across all teams</span>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Offer Acceptance</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{superAdminKPIs.offerAcceptanceRate}</p>
            <span className="text-[10px] text-emerald-600 font-bold">High offer retention</span>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider">Avg Time to Hire</span>
              <Clock className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{superAdminKPIs.avgTimeToHire}</p>
            <span className="text-[10px] text-purple-600 font-medium">Industry Benchmark: 21 Days</span>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2 shadow-2xs border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">Org Conversion %</span>
              <TrendingUp className="w-4 h-4 text-purple-300" />
            </div>
            <p className="text-2xl font-extrabold text-white tabular-nums">{superAdminKPIs.overallConversion}</p>
            <span className="text-[10px] text-purple-200 font-medium">Sourced to Hired</span>
          </div>
        </div>
      )}

      {/* 🟠 ADMIN OPERATIONAL KPIS */}
      {role === 'admin' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Hires Per Team (Avg)</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{adminKPIs.hiresPerTeam}</p>
            <span className="text-[10px] text-emerald-600 font-bold">On track for Q3 target</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Interviews Completed</span>
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{adminKPIs.interviewsCompleted}</p>
            <span className="text-[10px] text-slate-500 font-medium">Across 5 active recruiters</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Recruiter Productivity Index</span>
              <Zap className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-3xl font-extrabold text-[#6B3BF6] tabular-nums">{adminKPIs.productivityIndex}</p>
            <span className="text-[10px] text-purple-600 font-bold">High team output</span>
          </div>
        </div>
      )}

      {/* 🔵 TEAM LEAD EXECUTION KPIS */}
      {(role === 'lead' || role === 'recruiter') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-4 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#5B51D8] uppercase">Candidates Handled</span>
              <Users className="w-4 h-4 text-[#5B51D8]" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{teamLeadKPIs.candidatesHandled}</p>
            <span className="text-[10px] text-slate-500">Active pipeline volume</span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-800 uppercase">Interviews Scheduled</span>
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{teamLeadKPIs.interviewsScheduled}</p>
            <span className="text-[10px] text-blue-600 font-bold">+8% vs last week</span>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-800 uppercase">Team Closures</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{teamLeadKPIs.closures}</p>
            <span className="text-[10px] text-emerald-600 font-bold">Target Achieved!</span>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2 shadow-2xs border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-purple-300 uppercase">Conversion Rate %</span>
              <TrendingUp className="w-4 h-4 text-purple-300" />
            </div>
            <p className="text-2xl font-extrabold text-white tabular-nums">{teamLeadKPIs.conversionRate}</p>
            <span className="text-[10px] text-purple-200">Sourced to Hired</span>
          </div>
        </div>
      )}

      {/* 3. CHARTS SECTION BASED ON ROLE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Hiring Trends / Recruiter Comparison */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {role === 'superadmin' ? 'Monthly Hiring Trends (Global)' : 'Recruiter Interview Comparison'}
              </h3>
              <p className="text-xs text-slate-500">Volume distribution across time & team members</p>
            </div>
            <BarChart3 className="w-4 h-4 text-[#6B3BF6]" />
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-100 pb-2">
            {[
              { label: 'Harish', count: 36, height: '100%' },
              { label: 'Arvind', count: 31, height: '85%' },
              { label: 'Charlie', count: 28, height: '75%' },
              { label: 'Harini', count: 22, height: '60%' },
              { label: 'Saiteja', count: 18, height: '48%' },
            ].map(item => (
              <div key={item.label} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.count}
                </span>
                <div
                  className="w-full bg-[#6B3BF6] group-hover:bg-[#5833E0] rounded-t-xl transition-all duration-300 shadow-2xs"
                  style={{ height: item.height }}
                />
                <span className="text-[10px] font-semibold text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Department-wise Hiring / Team Trends */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Department Hiring Breakdown</h3>
              <p className="text-xs text-slate-500">Distribution across active business units</p>
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-100 pb-2">
            {[
              { month: 'Software', count: 54, height: '100%' },
              { month: 'Automotive', count: 38, height: '70%' },
              { month: 'ERP/SAP', count: 22, height: '45%' },
              { month: 'Hardware', count: 10, height: '25%' },
            ].map(m => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-emerald-700">{m.count} Hires</span>
                <div
                  className="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-xl transition-all duration-300 shadow-2xs"
                  style={{ height: m.height }}
                />
                <span className="text-[10px] font-semibold text-slate-500 truncate max-w-[55px]">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Pipeline Funnel Conversion */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Pipeline Conversion Funnel</h3>
              <p className="text-xs text-slate-500">Drop-off rates across stages</p>
            </div>
            <PieChart className="w-4 h-4 text-purple-600" />
          </div>

          <div className="space-y-3 pt-2">
            {[
              { stage: '1. Sourced', count: 1480, pct: '100%', bg: 'bg-[#EEF2FF] text-[#5B51D8]' },
              { stage: '2. Interview Scheduled', count: 480, pct: '32.4%', bg: 'bg-blue-100 text-blue-800' },
              { stage: '3. Interview Completed', count: 360, pct: '24.3%', bg: 'bg-purple-100 text-purple-800' },
              { stage: '4. Offers Extended', count: 140, pct: '9.4%', bg: 'bg-amber-100 text-amber-800' },
              { stage: '5. Successful Hires', count: 124, pct: '8.3%', bg: 'bg-emerald-100 text-emerald-800' },
            ].map(f => (
              <div key={f.stage} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{f.stage}</span>
                  <span className="tabular-nums font-bold">{f.count} ({f.pct})</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${f.bg.split(' ')[0]} rounded-full`} style={{ width: f.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. ROLE INSIGHTS & BOTTLENECK DETECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Insights Panel */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#6B3BF6]" />
              <span>
                {role === 'superadmin' ? 'Executive Bottleneck & Efficiency Insights' : 'Recruiter Operational Drivers'}
              </span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-50 text-[#6B3BF6] border border-purple-200">
              AI Insights
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-950">Top Performing Team: Engineering Team</h4>
                <p className="text-emerald-800 text-[11px] mt-0.5">
                  Conversion rate of 22.9% with average time to hire of 12 days.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-950">Bottleneck Alert: L2 Technical Assessment</h4>
                <p className="text-amber-800 text-[11px] mt-0.5">
                  Candidates waiting avg 4.2 days for L2 panel availability in ERP & SAP department.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 flex items-start gap-3">
              <Zap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-blue-950">Efficiency Score: 94 / 100</h4>
                <p className="text-blue-800 text-[11px] mt-0.5">
                  Recruiter responsiveness and offer acceptance rate exceed national industry benchmarks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Suggestions / Driver Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-600" />
            <span>Actionable Management Suggestions</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Reallocate candidates to Harish Gadipally</span>
                <span className="text-[11px] text-slate-500">High bandwidth & fast completion velocity</span>
              </div>
              <button
                onClick={() => showToast('Action queued: Candidate reallocation suggested')}
                className="px-3 py-1.5 bg-[#6B3BF6] text-white text-[11px] font-bold rounded-lg cursor-pointer"
              >
                Apply Action
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Schedule panel sync for SAP requirement</span>
                <span className="text-[11px] text-slate-500">Reduce screening to interview delay</span>
              </div>
              <button
                onClick={() => showToast('Action queued: Panel sync notification sent')}
                className="px-3 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-lg cursor-pointer"
              >
                Notify Panel
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Automate offer letter reminders</span>
                <span className="text-[11px] text-slate-500">3 candidates pending candidate signature</span>
              </div>
              <button
                onClick={() => showToast('Reminders sent to 3 candidates via WhatsApp')}
                className="px-3 py-1.5 bg-emerald-600 text-white text-[11px] font-bold rounded-lg cursor-pointer"
              >
                Send Reminders
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. RECRUITER COMPARISON & PERFORMANCE RANKING TABLE (FOR ADMIN & TEAM LEAD) */}
      {(role === 'admin' || role === 'lead' || role === 'superadmin') && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {role === 'superadmin' ? 'Organization Recruiter Leaderboard' : 'Team Recruiter Performance Ranking'}
              </h3>
              <p className="text-xs text-slate-500">Drill-down ranking: Team → Recruiter → Candidates</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search recruiter name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-12 text-center">RANK</th>
                  <th className="py-3.5 px-4">RECRUITER</th>
                  <th className="py-3.5 px-4">TEAM</th>
                  <th className="py-3.5 px-4">SOURCED</th>
                  <th className="py-3.5 px-4">SCHEDULED</th>
                  <th className="py-3.5 px-4">COMPLETED</th>
                  <th className="py-3.5 px-4">HIRED</th>
                  <th className="py-3.5 px-4">CONVERSION RATE</th>
                  <th className="py-3.5 px-4">VELOCITY</th>
                  <th className="py-3.5 px-4">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {paginatedTeam.map(t => (
                  <tr key={t.rank} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                      {t.rank === 1 ? '🏆 1' : t.rank}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{t.name}</td>
                    <td className="py-3.5 px-4 text-slate-500">{t.team}</td>
                    <td className="py-3.5 px-4 font-semibold text-blue-600">{t.sourced}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{t.scheduled}</td>
                    <td className="py-3.5 px-4 font-semibold text-purple-700">{t.completed}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600">{t.hired}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{t.rate}</td>
                    <td className="py-3.5 px-4 text-slate-500">{t.velocity}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          t.status === 'Top Performer'
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : t.status === 'On Track'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-100 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PaginationFooter
            currentPage={recruiterPage}
            totalPages={Math.ceil(filteredTeam.length / recruiterPageSize)}
            totalItems={filteredTeam.length}
            pageSize={recruiterPageSize}
            onPageChange={setRecruiterPage}
            onPageSizeChange={setRecruiterPageSize}
            itemLabel="recruiters"
          />
        </div>
      )}

      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-12 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
