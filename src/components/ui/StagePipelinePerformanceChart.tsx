import React, { useState } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts'
import { Layers, Users } from 'lucide-react'

export interface StageMetric {
  stage: string
  stageName: string
  requirementsCount: number
  positionsCount: number
  submissionsCount: number
  placedCount: number
  closuresCount: number
  conversionPct: string
}

export interface RequirementStageDetail {
  id: string
  title: string
  client: string
  stage: string
  positions: number
  submissions: number
  placed: number
}

const STAGE_PIPELINE_DATA: StageMetric[] = [
  {
    stage: 'L1',
    stageName: 'Technical Round 1 (L1)',
    requirementsCount: 18,
    positionsCount: 45,
    submissionsCount: 42,
    placedCount: 12,
    closuresCount: 8,
    conversionPct: '100%',
  },
  {
    stage: 'L2',
    stageName: 'Technical Round 2 (L2)',
    requirementsCount: 14,
    positionsCount: 36,
    submissionsCount: 28,
    placedCount: 9,
    closuresCount: 6,
    conversionPct: '66.7%',
  },
  {
    stage: 'L3',
    stageName: 'Managerial / Architecture (L3)',
    requirementsCount: 10,
    positionsCount: 24,
    submissionsCount: 18,
    placedCount: 6,
    closuresCount: 4,
    conversionPct: '42.8%',
  },
  {
    stage: 'Final',
    stageName: 'Client Final / HR Round',
    requirementsCount: 6,
    positionsCount: 15,
    submissionsCount: 12,
    placedCount: 4,
    closuresCount: 3,
    conversionPct: '28.5%',
  },
]

const REQUIREMENT_STAGE_DETAILS: RequirementStageDetail[] = [
  { id: 'REQ-2026-08-12-001', title: 'TPC - Requirement - C# Automation - Embedded', client: 'LTTS / L&T', stage: 'L1 (Tech Round 1)', positions: 8, submissions: 14, placed: 3 },
  { id: 'REQ-2026-08-12-003', title: 'Senior React / Fullstack Architect', client: 'Accenture Enterprise', stage: 'L2 (Tech Round 2)', positions: 6, submissions: 18, placed: 2 },
  { id: 'REQ-701', title: 'Lead Java Full Stack Developer', client: 'Accenture', stage: 'L1 (Tech Round 1)', positions: 12, submissions: 42, placed: 5 },
  { id: 'REQ-702', title: 'Senior React Native Mobile Dev', stage: 'L3 (Managerial)', client: 'LTTS Automotive', positions: 8, submissions: 28, placed: 4 },
  { id: 'REQ-703', title: 'Cloud Solutions Architect', client: 'Infosys', stage: 'Final (Client HR)', positions: 5, submissions: 12, placed: 3 },
  { id: 'REQ-704', title: 'DevOps Cloud Infrastructure Specialist', client: 'Continental Automotive', stage: 'L2 (Tech Round 2)', positions: 7, submissions: 10, placed: 2 },
]

const CustomStageTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const dataObj = payload[0].payload as StageMetric
    return (
      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs space-y-1.5 font-sans animate-in fade-in zoom-in-95 duration-150">
        <div className="font-extrabold text-blue-300 border-b border-slate-700 pb-1 flex items-center justify-between gap-4">
          <span>Stage: {dataObj.stage}</span>
          <span className="text-[10px] text-slate-400 font-normal">{dataObj.stageName}</span>
        </div>
        <div className="space-y-1 text-[11px] font-medium pt-0.5">
          <div className="flex justify-between gap-4">
            <span className="text-blue-400 font-bold">Requirements:</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.requirementsCount ?? 0}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-indigo-400 font-bold">Total Positions:</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.positionsCount ?? 0}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-lime-400 font-bold">Submissions:</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.submissionsCount ?? 0}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-amber-400 font-bold">Placed:</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.placedCount ?? 0}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-purple-400 font-bold">Closures:</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.closuresCount ?? 0}</span>
          </div>
          <div className="flex justify-between gap-4 pt-1 border-t border-slate-800 text-purple-300 font-bold">
            <span>Pipeline Retention:</span>
            <span className="tabular-nums text-purple-300">{dataObj.conversionPct}</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

import { Role } from '../../types'

export interface StagePipelinePerformanceChartProps {
  role?: Role
}

export function StagePipelinePerformanceChart({ role = 'lead' }: StagePipelinePerformanceChartProps) {
  const [leadChartView, setLeadChartView] = useState<'individual' | 'team'>('individual')
  const [data] = useState<StageMetric[]>(STAGE_PIPELINE_DATA)

  const totalReqs = data.reduce((acc, curr) => acc + (Number(curr.requirementsCount) || 0), 0)
  const totalPositions = data.reduce((acc, curr) => acc + (Number(curr.positionsCount) || 0), 0)
  const totalSubs = data.reduce((acc, curr) => acc + (Number(curr.submissionsCount) || 0), 0)
  const totalPlaced = data.reduce((acc, curr) => acc + (Number(curr.placedCount) || 0), 0)
  const totalClosures = data.reduce((acc, curr) => acc + (Number(curr.closuresCount) || 0), 0)

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6 font-sans">
      {/* 1. CHART TITLE HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#6B3BF6]">
              <Layers className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {role === 'lead'
                ? leadChartView === 'individual'
                  ? 'Lead Individual Pipeline: Requirements, Positions & Candidate Submissions by Interview Stage'
                  : 'Team Members Comparison: Interview Stage Pipeline Breakdown'
                : 'Requirements, Positions & Candidate Submissions by Interview Stage'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {role === 'lead'
              ? leadChartView === 'individual'
                ? 'Individual recruitment pipeline progression with total requirement position counts across L1, L2, L3, and Final rounds'
                : 'Team members pipeline progression comparison with position counts'
              : 'Recruitment pipeline progression showing candidate volume & total requirement positions across L1, L2, L3, and Final rounds'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Lead View Mode Toggle (Lead Only) */}
          {role === 'lead' && (
            <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLeadChartView('individual')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  leadChartView === 'individual' ? 'bg-[#6B3BF6] text-white shadow-2xs font-bold' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                Lead Individual Performance
              </button>
              <button
                type="button"
                onClick={() => setLeadChartView('team')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  leadChartView === 'team' ? 'bg-blue-600 text-white shadow-2xs font-bold' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                Team Members Comparison
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. SUMMARY TABLE & BAR GRAPH GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Summary Table */}
        <div className="lg:col-span-5 space-y-3">
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#1E3A8A] text-white text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-2">Stage</th>
                  <th className="py-3 px-2 text-right">Reqs</th>
                  <th className="py-3 px-2 text-right">Positions</th>
                  <th className="py-3 px-2 text-right">Subs</th>
                  <th className="py-3 px-2 text-right">Placed</th>
                  <th className="py-3 px-2 text-right">Closures</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {data.map(row => (
                  <tr key={row.stage} className="hover:bg-purple-50/60 transition-colors">
                    <td className="py-3 px-2">
                      <div className="font-extrabold text-slate-900">{row.stage}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{row.stageName}</div>
                    </td>
                    <td className="py-3 px-2 text-right font-extrabold text-[#2563EB]">
                      {row.requirementsCount ?? 0}
                    </td>
                    <td className="py-3 px-2 text-right font-extrabold text-indigo-600">
                      {row.positionsCount ?? 0}
                    </td>
                    <td className="py-3 px-2 text-right font-extrabold text-[#84CC16]">
                      {row.submissionsCount ?? 0}
                    </td>
                    <td className="py-3 px-2 text-right font-extrabold text-amber-600">
                      {row.placedCount ?? 0}
                    </td>
                    <td className="py-3 px-2 text-right font-extrabold text-purple-600">
                      {row.closuresCount ?? 0}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 border-t border-slate-200 text-slate-900 font-extrabold">
                  <td className="py-2.5 px-2 text-xs">Total Pipeline</td>
                  <td className="py-2.5 px-2 text-right text-blue-700">{totalReqs}</td>
                  <td className="py-2.5 px-2 text-right text-indigo-700">{totalPositions}</td>
                  <td className="py-2.5 px-2 text-right text-lime-700">{totalSubs}</td>
                  <td className="py-2.5 px-2 text-right text-amber-700">{totalPlaced}</td>
                  <td className="py-2.5 px-2 text-right text-purple-700">{totalClosures}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Right Column: Recharts Bar Graph */}
        <div className="lg:col-span-7 h-[300px] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="stageReqGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={1} />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="stagePosGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="stageSubGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#84CC16" stopOpacity={1} />
                  <stop offset="100%" stopColor="#65A30D" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="stagePlacedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity={1} />
                  <stop offset="100%" stopColor="#D97706" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="stageClosureGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9333EA" stopOpacity={1} />
                  <stop offset="100%" stopColor="#7E22CE" stopOpacity={0.8} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="stage" tick={{ fontSize: 11, fontWeight: 700, fill: '#334155' }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontWeight: 700, fill: '#64748B' }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomStageTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingTop: '10px' }} iconType="circle" />

              <Bar dataKey="requirementsCount" name="Requirements" fill="url(#stageReqGrad)" radius={[4, 4, 0, 0]} maxBarSize={22} />
              <Bar dataKey="positionsCount" name="Total Positions" fill="url(#stagePosGrad)" radius={[4, 4, 0, 0]} maxBarSize={22} />
              <Bar dataKey="submissionsCount" name="Submissions" fill="url(#stageSubGrad)" radius={[4, 4, 0, 0]} maxBarSize={22} />
              <Bar dataKey="placedCount" name="Placed" fill="url(#stagePlacedGrad)" radius={[4, 4, 0, 0]} maxBarSize={22} />
              <Bar dataKey="closuresCount" name="Closures" fill="url(#stageClosureGrad)" radius={[4, 4, 0, 0]} maxBarSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. DETAILED REQUIREMENT POSITIONS BREAKDOWN TABLE */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#6B3BF6]" />
              <span>Requirement Stage Positions Breakdown</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Total position counts (openings) per active requirement across pipeline stages
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-[11px] font-extrabold">
            Total Positions Sourced: {REQUIREMENT_STAGE_DETAILS.reduce((acc, curr) => acc + curr.positions, 0)} Positions
          </span>
        </div>

        <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-3">REQUIREMENT TITLE & ID</th>
                <th className="py-3 px-3">CLIENT</th>
                <th className="py-3 px-3">CURRENT STAGE</th>
                <th className="py-3 px-3 text-center bg-indigo-50/70 text-indigo-900 font-extrabold">TOTAL POSITIONS (OPENINGS)</th>
                <th className="py-3 px-3 text-center">SUBMISSIONS</th>
                <th className="py-3 px-3 text-center">PLACED</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {REQUIREMENT_STAGE_DETAILS.map(req => (
                <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900">
                    <div>{req.title}</div>
                    <span className="text-[10px] text-slate-400 font-normal font-mono">{req.id}</span>
                  </td>
                  <td className="py-3 px-3 font-bold text-purple-700">{req.client}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      {req.stage}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-black text-indigo-900 bg-indigo-50/40 text-sm">
                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-800 border border-indigo-200 inline-block">
                      {req.positions} Openings
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-extrabold text-[#84CC16]">{req.submissions}</td>
                  <td className="py-3 px-3 text-center font-extrabold text-amber-600">{req.placed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
