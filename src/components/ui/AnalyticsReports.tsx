import React, { useState } from 'react'
import {
  PieChart as PieIcon,
  BarChart3,
  TrendingUp,
  Clock,
  UserCheck,
  Building2,
  Calendar,
  Filter,
  CheckCircle2,
  XCircle,
  Zap,
  Download,
  Layers,
} from 'lucide-react'
import { InteractiveTrendVisualizer } from './InteractiveTrendVisualizer'

// --- SVG DONUT / PIE CHART COMPONENT ---
interface PieSegment {
  label: string
  value: number
  color: string
}

function SVGDonutChart({ segments, size = 180 }: { segments: PieSegment[]; size?: number }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1
  let cumulativeAngle = 0

  const radius = size / 2 - 20
  const center = size / 2
  const strokeWidth = 28

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segments.map((seg, idx) => {
            const angle = (seg.value / total) * 360
            const strokeDasharray = `${(angle / 360) * (2 * Math.PI * radius)} ${2 * Math.PI * radius}`
            const strokeDashoffset = -((cumulativeAngle / 360) * (2 * Math.PI * radius))
            cumulativeAngle += angle

            return (
              <circle
                key={idx}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500 hover:opacity-80 cursor-pointer"
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-2xl font-extrabold font-mono text-slate-900">{total}</span>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Total Reqs</span>
        </div>
      </div>

      <div className="space-y-2">
        {segments.map((s, i) => {
          const pct = Math.round((s.value / total) * 100)
          return (
            <div key={i} className="flex items-center gap-3 text-xs font-mono">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
              <span className="text-slate-700 font-medium min-w-[140px]">{s.label}:</span>
              <span className="font-bold text-slate-900">{s.value} ({pct}%)</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// --- DUAL BAR CHART COMPONENT (Requirements vs Submissions per Recruiter) ---
interface DualBarItem {
  label: string
  value1: number // Requirements
  value2: number // Submissions
}

function DualBarChart({ items }: { items: DualBarItem[] }) {
  const maxVal = Math.max(...items.flatMap(i => [i.value1, i.value2]), 1)

  return (
    <div className="space-y-3 pt-2">
      {items.map((item, idx) => {
        const pct1 = Math.max(10, (item.value1 / maxVal) * 100)
        const pct2 = Math.max(10, (item.value2 / maxVal) * 100)

        return (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-mono font-semibold text-slate-800">
              <span>{item.label}</span>
              <span className="text-[11px] text-slate-500">
                <span className="text-indigo-600 font-bold">{item.value1} Reqs</span> ·{' '}
                <span className="text-blue-600 font-bold">{item.value2} Subs</span>
              </span>
            </div>
            <div className="space-y-1">
              <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden flex">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${pct1}%` }}
                  title={`Requirements: ${item.value1}`}
                />
              </div>
              <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden flex">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${pct2}%` }}
                  title={`Submissions: ${item.value2}`}
                />
              </div>
            </div>
          </div>
        )
      })}

      <div className="flex justify-end gap-4 pt-2 text-[10px] font-mono font-bold">
        <span className="flex items-center gap-1 text-indigo-600">
          <span className="w-2.5 h-2.5 rounded bg-indigo-600" /> Total Requirements
        </span>
        <span className="flex items-center gap-1 text-blue-600">
          <span className="w-2.5 h-2.5 rounded bg-blue-500" /> Total Submissions
        </span>
      </div>
    </div>
  )
}

// --- CLIENT POC WISE CHART COMPONENT ---
interface ClientPOCItem {
  pocName: string
  client: string
  reqs: number
  submissions: number
  conversion: string
}

const MOCK_CLIENT_POCS: ClientPOCItem[] = [
  { pocName: 'Rajesh Sharma', client: 'KPMG', reqs: 8, submissions: 42, conversion: '84%' },
  { pocName: 'Anita Desai', client: 'Accenture', reqs: 12, submissions: 68, conversion: '91%' },
  { pocName: 'Vikram Mehta', client: 'L&T', reqs: 7, submissions: 35, conversion: '78%' },
  { pocName: 'Sarah Jenkins', client: 'Goldman Sachs', reqs: 6, submissions: 38, conversion: '88%' },
  { pocName: 'Elena Rostova', client: 'Tesla', reqs: 5, submissions: 31, conversion: '82%' },
  { pocName: 'David Vance', client: 'Microsoft', reqs: 4, submissions: 22, conversion: '75%' },
]

// --- FIRST SUBMISSION SPEED TIMELINE DATA ---
const MOCK_FIRST_SUB_TIMELINE = [
  { reqId: 'REQ-001', title: 'Senior React Developer', client: 'Accenture', reqTime: 'Aug 1, 09:00 AM', firstSubTime: 'Aug 1, 11:30 AM', turnaround: '2.5 hrs', speedClass: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { reqId: 'REQ-002', title: 'Java Architect', client: 'Goldman Sachs', reqTime: 'Aug 2, 10:15 AM', firstSubTime: 'Aug 2, 02:45 PM', turnaround: '4.5 hrs', speedClass: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { reqId: 'REQ-003', title: 'DevOps Lead Engineer', client: 'JP Morgan', reqTime: 'Aug 3, 08:30 AM', firstSubTime: 'Aug 3, 05:00 PM', turnaround: '8.5 hrs', speedClass: 'text-blue-600 bg-blue-50 border-blue-200' },
  { reqId: 'REQ-004', title: 'Senior Data Scientist', client: 'Microsoft', reqTime: 'Aug 4, 11:00 AM', firstSubTime: 'Aug 5, 09:15 AM', turnaround: '22.2 hrs', speedClass: 'text-amber-600 bg-amber-50 border-amber-200' },
  { reqId: 'REQ-006', title: 'Python ML Engineer', client: 'Tesla', reqTime: 'Aug 4, 02:00 PM', firstSubTime: 'Aug 4, 04:15 PM', turnaround: '2.2 hrs', speedClass: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
]

export function AnalyticsReports() {
  // Data for Report 1: Submission vs Non-Submission Requirements
  const subVsNonSubSegments: PieSegment[] = [
    { label: 'Requirements WITH Submissions', value: 15, color: '#2563EB' },
    { label: 'Requirements WITHOUT Submissions (Zero Subs)', value: 3, color: '#F43F5E' },
  ]

  // Data for Report 3: Total Submissions vs Requirements per Recruiter
  const recruiterDualBarItems: DualBarItem[] = [
    { label: 'Marcus Chen', value1: 5, value2: 34 },
    { label: 'Priya Sharma', value1: 4, value2: 28 },
    { label: 'James O\'Brien', value1: 6, value2: 41 },
    { label: 'Aisha Patel', value1: 3, value2: 19 },
    { label: 'Carlos Rivera', value1: 5, value2: 37 },
    { label: 'Elena Volkov', value1: 4, value2: 22 },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Title Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded border border-blue-500/30 flex items-center gap-1">
              <PieIcon className="w-3 h-3 text-amber-400" /> Enterprise Analytics Suite
            </span>
            <span className="text-[10px] font-mono text-slate-400">Real-Time Data Engine</span>
          </div>
          <h2 className="text-xl font-bold font-sans tracking-tight">Recruiter & Client POC Performance Diagrams</h2>
          <p className="text-xs text-slate-300 font-body mt-0.5">
            Visual diagrams covering Submissions vs Non-Submissions, Time-to-First-Submission SLA, and Client POC metrics.
          </p>
        </div>

        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 self-start md:self-auto">
          <Download className="w-4 h-4" /> Export Analytics (PDF/CSV)
        </button>
      </div>

      {/* Grid Row 1: Report 1 (Submissions vs Non-Submissions) & Report 2 (Performance Trend) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* REPORT 1: Requirements with Submission VS Non-Submission (Donut Chart) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
                  <PieIcon className="w-4 h-4 text-blue-600" /> Requirements: Submissions VS Non-Submission
                </h3>
                <p className="text-xs text-slate-500 font-mono">Job openings coverage breakdown</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                83.3% Active Coverage
              </span>
            </div>

            <div className="py-4">
              <SVGDonutChart segments={subVsNonSubSegments} size={190} />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-center text-xs font-mono">
            <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100">
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Active Submissions</p>
              <p className="text-lg font-bold text-blue-600">15 Reqs (83%)</p>
            </div>
            <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-100">
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Zero Submissions (Critical)</p>
              <p className="text-lg font-bold text-rose-600">3 Reqs (17%)</p>
            </div>
          </div>
        </div>

        {/* REPORT 2: Recruiter-Wise Performance Trend (Glowing Curved Spline & Hover Tooltips) */}
        <InteractiveTrendVisualizer />
      </div>

      {/* Grid Row 2: Report 3 (Total Submissions vs Total Requirements per Recruiter) & Report 5 (Client POC Analysis) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* REPORT 3: Recruiter Performance: Total Requirements VS Submissions */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" /> Recruiter Performance: Reqs VS Submissions
              </h3>
              <p className="text-xs text-slate-500 font-mono">Assigned job orders vs candidate output per recruiter</p>
            </div>
          </div>

          <DualBarChart items={recruiterDualBarItems} />
        </div>

        {/* REPORT 5: Client POC-Wise Analysis (Requirements & Submissions per Client POC) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" /> Client POC-Wise Performance Analysis
                </h3>
                <p className="text-xs text-slate-500 font-mono">Requirements and submission yield per Client POC</p>
              </div>
              <span className="text-xs font-mono text-slate-400">6 Key Client Accounts</span>
            </div>

            <div className="space-y-3">
              {MOCK_CLIENT_POCS.map((poc, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50/60 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs font-mono">
                      {poc.pocName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 font-sans">{poc.pocName}</p>
                      <p className="text-[10px] font-mono text-slate-400">Client: {poc.client}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="text-[9px] font-mono text-slate-400">REQS</p>
                      <p className="text-xs font-bold font-mono text-indigo-600">{poc.reqs}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-mono text-slate-400">SUBS</p>
                      <p className="text-xs font-bold font-mono text-blue-600">{poc.submissions}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold rounded border border-emerald-200">
                      {poc.conversion}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* REPORT 4: Time-To-First-Submission Analysis (First Submission vs Requirement Date & Time) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-sans flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" /> First Submission Speed Analysis (Requirement Date/Time VS First Candidate)
            </h3>
            <p className="text-xs text-slate-500 font-mono">SLA calculation measuring time elapsed from job creation timestamp to first submission</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200 font-bold">
            <Zap className="w-3.5 h-3.5" /> Average Turnaround: 4.8 Hours
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/60 font-mono text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                <th className="py-3 px-4">Req ID & Job Title</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Requirement Created (Date & Time)</th>
                <th className="py-3 px-4">First Submission Timestamp</th>
                <th className="py-3 px-4 text-center">Calculated Turnaround SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_FIRST_SUB_TIMELINE.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-mono text-slate-400 mr-2">{item.reqId}</span>
                    <span className="font-bold text-slate-900 font-sans">{item.title}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{item.client}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{item.reqTime}</td>
                  <td className="py-3 px-4 font-mono text-blue-600 font-semibold">{item.firstSubTime}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${item.speedClass}`}>
                      ⚡ {item.turnaround}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
