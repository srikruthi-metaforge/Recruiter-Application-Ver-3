import React, { useState } from 'react'
import {
  TrendingUp,
  Sparkles,
  Calendar,
  User,
  Zap,
  Award,
  ArrowUpRight,
  ChevronDown,
  Target,
  BarChart2,
  Activity,
} from 'lucide-react'

interface TrendPoint {
  label: string
  value: number
  target: number
  topCandidate?: string
}

const RECRUITER_TREND_DATA: Record<
  string,
  Record<'Day-Wise' | 'Month-Wise', TrendPoint[]>
> = {
  All: {
    'Day-Wise': [
      { label: 'Mon', value: 18, target: 20, topCandidate: 'Alex Turner (Accenture)' },
      { label: 'Tue', value: 24, target: 20, topCandidate: 'Sarah Nguyen (Accenture)' },
      { label: 'Wed', value: 32, target: 20, topCandidate: 'Rania Khalil (Goldman)' },
      { label: 'Thu', value: 27, target: 20, topCandidate: 'Ben Wallace (Tesla)' },
      { label: 'Fri', value: 35, target: 20, topCandidate: 'David Osei (Accenture)' },
      { label: 'Sat', value: 14, target: 10, topCandidate: 'Soo-Jin Lee (JP Morgan)' },
      { label: 'Sun', value: 12, target: 10, topCandidate: 'Fatima Al-Hassan (MSFT)' },
    ],
    'Month-Wise': [
      { label: 'Apr', value: 140, target: 160, topCandidate: 'Q1 Batch Placements' },
      { label: 'May', value: 165, target: 160, topCandidate: 'Full Stack Sprint' },
      { label: 'Jun', value: 190, target: 180, topCandidate: 'Java Architect Push' },
      { label: 'Jul', value: 210, target: 200, topCandidate: 'Tesla ML Hire Drive' },
      { label: 'Aug', value: 226, target: 210, topCandidate: 'Current Month Peak' },
    ],
  },
  'Marcus Chen': {
    'Day-Wise': [
      { label: 'Mon', value: 4, target: 5, topCandidate: 'Alex Turner' },
      { label: 'Tue', value: 6, target: 5, topCandidate: 'Sarah Nguyen' },
      { label: 'Wed', value: 8, target: 5, topCandidate: 'David Osei' },
      { label: 'Thu', value: 5, target: 5, topCandidate: 'Lily Zhao' },
      { label: 'Fri', value: 7, target: 5, topCandidate: 'Marcus Lead Sub' },
      { label: 'Sat', value: 2, target: 2, topCandidate: 'Weekend Dev' },
      { label: 'Sun', value: 2, target: 2, topCandidate: 'Weekend Sub' },
    ],
    'Month-Wise': [
      { label: 'Apr', value: 20, target: 30 },
      { label: 'May', value: 25, target: 30 },
      { label: 'Jun', value: 30, target: 35 },
      { label: 'Jul', value: 32, target: 35 },
      { label: 'Aug', value: 34, target: 35 },
    ],
  },
  'James O\'Brien': {
    'Day-Wise': [
      { label: 'Mon', value: 6, target: 6, topCandidate: 'Rania Khalil' },
      { label: 'Tue', value: 8, target: 6, topCandidate: 'Java Dev 1' },
      { label: 'Wed', value: 10, target: 6, topCandidate: 'Spring Boot Lead' },
      { label: 'Thu', value: 7, target: 6, topCandidate: 'Kafka Architect' },
      { label: 'Fri', value: 9, target: 6, topCandidate: 'Microservices Expert' },
      { label: 'Sat', value: 1, target: 2 },
      { label: 'Sun', value: 0, target: 2 },
    ],
    'Month-Wise': [
      { label: 'Apr', value: 28, target: 35 },
      { label: 'May', value: 32, target: 35 },
      { label: 'Jun', value: 36, target: 35 },
      { label: 'Jul', value: 39, target: 40 },
      { label: 'Aug', value: 41, target: 40 },
    ],
  },
}

export function InteractiveTrendVisualizer() {
  const [selectedRecruiter, setSelectedRecruiter] = useState<string>('All')
  const [timeframe, setTimeframe] = useState<'Day-Wise' | 'Month-Wise'>('Day-Wise')
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [metricMode, setMetricMode] = useState<'Submissions' | 'Interviews' | 'Placements'>('Submissions')

  const rawPoints =
    RECRUITER_TREND_DATA[selectedRecruiter]?.[timeframe] ||
    RECRUITER_TREND_DATA['All'][timeframe]

  // Scale multiplier based on metricMode
  const points = rawPoints.map(p => {
    let multiplier = 1
    if (metricMode === 'Interviews') multiplier = 0.35
    if (metricMode === 'Placements') multiplier = 0.12
    return {
      ...p,
      displayVal: Math.max(1, Math.round(p.value * multiplier)),
      displayTarget: Math.max(1, Math.round(p.target * multiplier)),
    }
  })

  const maxVal = Math.max(...points.map(p => p.displayVal), 1)
  const svgWidth = 600
  const svgHeight = 220
  const paddingX = 40
  const paddingY = 30

  // Calculate SVG spline path points
  const coords = points.map((p, idx) => {
    const x = paddingX + (idx / (points.length - 1)) * (svgWidth - 2 * paddingX)
    const y = svgHeight - paddingY - (p.displayVal / maxVal) * (svgHeight - 2 * paddingY)
    return { x, y, point: p }
  })

  // Create smooth curved SVG path using Bezier control points
  let pathD = `M ${coords[0].x},${coords[0].y}`
  for (let i = 0; i < coords.length - 1; i++) {
    const curr = coords[i]
    const next = coords[i + 1]
    const cpX = (curr.x + next.x) / 2
    pathD += ` C ${cpX},${curr.y} ${cpX},${next.y} ${next.x},${next.y}`
  }

  // Area under curve path
  const areaD = `${pathD} L ${coords[coords.length - 1].x},${svgHeight - paddingY} L ${coords[0].x},${svgHeight - paddingY} Z`

  const activePoint = hoveredIdx !== null ? coords[hoveredIdx] : coords[coords.length - 1]

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white border border-slate-800 shadow-2xl p-6 glow-card">
      {/* Ambient background glowing orbs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Controls Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-full border border-blue-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400 animate-spin" /> Interactive Trend Engine
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              ⚡ Live Velocity: +24% Growth
            </span>
          </div>
          <h3 className="text-xl font-bold font-sans tracking-tight text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" /> Recruiter Performance Surge Visualizer
          </h3>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          {/* Recruiter Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-1.5">
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-400">Recruiter:</span>
            <select
              value={selectedRecruiter}
              onChange={e => setSelectedRecruiter(e.target.value)}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-white">All Recruiters (Aggregate)</option>
              <option value="Marcus Chen" className="bg-slate-900 text-white">Marcus Chen</option>
              <option value="James O'Brien" className="bg-slate-900 text-white">James O'Brien</option>
            </select>
          </div>

          {/* Metric Selector Pills */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/80">
            {(['Submissions', 'Interviews', 'Placements'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMetricMode(m)}
                className={`px-2.5 py-1 text-[10px] font-mono rounded-lg transition-all ${
                  metricMode === m
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Timeframe Selector Pills */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/80">
            {(['Day-Wise', 'Month-Wise'] as const).map(f => (
              <button
                key={f}
                onClick={() => setTimeframe(f)}
                className={`px-2.5 py-1 text-[10px] font-mono rounded-lg transition-all ${
                  timeframe === f
                    ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Curved Spline Chart Area */}
      <div className="relative z-10 py-4">
        {/* Dynamic Tooltip Header Pill */}
        <div className="flex flex-wrap items-center justify-between bg-slate-800/50 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/60 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-mono font-bold text-sm shadow-md">
              {activePoint.point.displayVal}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Point:</span>
                <span className="text-sm font-bold font-mono text-white">{activePoint.point.label} ({timeframe})</span>
                <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {metricMode}: {activePoint.point.displayVal}
                </span>
              </div>
              {activePoint.point.topCandidate && (
                <p className="text-[11px] text-slate-300 font-body">
                  🌟 Top Candidate Highlight: <span className="font-semibold text-emerald-400">{activePoint.point.topCandidate}</span>
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-right font-mono text-xs">
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Target Threshold</p>
              <p className="font-bold text-slate-300">{activePoint.point.displayTarget}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Target Surplus</p>
              <p className="font-bold text-emerald-400">
                +{Math.max(0, activePoint.point.displayVal - activePoint.point.displayTarget)}
              </p>
            </div>
          </div>
        </div>

        {/* SVG Curved Chart */}
        <div className="relative w-full h-[220px]">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="neonTrendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#6366F1" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
              </linearGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Grid horizontal lines */}
            {[0.25, 0.5, 0.75].map(ratio => (
              <line
                key={ratio}
                x1={paddingX}
                y1={paddingY + ratio * (svgHeight - 2 * paddingY)}
                x2={svgWidth - paddingX}
                y2={paddingY + ratio * (svgHeight - 2 * paddingY)}
                stroke="#1E293B"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            ))}

            {/* Glowing Area Fill */}
            <path d={areaD} fill="url(#neonTrendGrad)" />

            {/* Smooth Curved Line Path */}
            <path
              d={pathD}
              fill="none"
              stroke="#60A5FA"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#neonGlow)"
            />

            {/* Interactive Glowing Data Nodes */}
            {coords.map((c, i) => {
              const isHovered = hoveredIdx === i
              return (
                <g key={i} className="cursor-pointer group" onMouseEnter={() => setHoveredIdx(i)}>
                  {/* Invisible hit box circle */}
                  <circle cx={c.x} cy={c.y} r="14" fill="transparent" />

                  {/* Pulsing ring on hover */}
                  {isHovered && (
                    <circle cx={c.x} cy={c.y} r="10" fill="none" stroke="#60A5FA" strokeWidth="2" className="animate-ping" />
                  )}

                  {/* Outer circle */}
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={isHovered ? '7' : '5'}
                    fill={isHovered ? '#60A5FA' : '#1E1B4B'}
                    stroke={isHovered ? '#FFFFFF' : '#3B82F6'}
                    strokeWidth="2.5"
                    className="transition-all duration-200"
                  />

                  {/* Label underneath */}
                  <text
                    x={c.x}
                    y={svgHeight - 8}
                    textAnchor="middle"
                    fill={isHovered ? '#FFFFFF' : '#94A3B8'}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight={isHovered ? 'bold' : 'normal'}
                  >
                    {c.point.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="relative z-10 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-center">
        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase">Peak Surge Point</p>
          <p className="font-bold text-emerald-400 text-sm">
            {points.reduce((prev, curr) => (curr.displayVal > prev.displayVal ? curr : prev), points[0]).label} (
            {Math.max(...points.map(p => p.displayVal))} {metricMode})
          </p>
        </div>
        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase">Sourcing Velocity Pace</p>
          <p className="font-bold text-blue-400 text-sm">124% of Target Goal</p>
        </div>
        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
          <p className="text-[10px] text-slate-400 uppercase">Filtered View</p>
          <p className="font-bold text-indigo-300 text-sm">{selectedRecruiter} · {timeframe}</p>
        </div>
      </div>
    </div>
  )
}
