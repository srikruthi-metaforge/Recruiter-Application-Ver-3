import React from 'react'
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

interface GapAnalysisChartsSectionProps {
  domainChartData: any[]
  openSections: Record<string, boolean>
}

export const GapAnalysisChartsSection: React.FC<GapAnalysisChartsSectionProps> = ({
  domainChartData,
  openSections,
}) => {
  if (!openSections.domainCharts) return null

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Domain-wise Delivery & Gap Breakdown</h3>
          <p className="text-xs text-slate-500 font-medium">Positions vs Submissions per Standardized Domain</p>
        </div>
      </div>

      <div className="h-80 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={domainChartData} margin={{ top: 10, right: 30, left: 0, bottom: 65 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="domainShort"
              angle={-30}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }}
            />
            <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                borderRadius: '12px',
                border: 'none',
                fontSize: '12px',
              }}
            />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', fontWeight: 700 }} />
            <Bar dataKey="positions" name="Positions Demanded" fill="#6B3BF6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="submissions" name="Submissions Delivered" fill="#10B981" radius={[6, 6, 0, 0]} />
            <Bar dataKey="zeroSubReqs" name="Zero-Sub Reqs" fill="#F43F5E" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
