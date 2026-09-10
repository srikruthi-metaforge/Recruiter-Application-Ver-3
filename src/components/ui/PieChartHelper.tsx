import React from 'react'

export interface PieSegment {
  label: string
  value: number
  color: string
}

export function DonutChart({ data, centerText }: { data: PieSegment[]; centerText: string }) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  let currentAngle = 0

  const arcs = data.map(d => {
    const angle = (d.value / total) * 360
    const start = currentAngle
    currentAngle += angle
    const startRad = ((start - 90) * Math.PI) / 180
    const endRad = ((start + angle - 90) * Math.PI) / 180
    const r = 40
    const x1 = 50 + r * Math.cos(startRad)
    const y1 = 50 + r * Math.sin(startRad)
    const x2 = 50 + r * Math.cos(endRad)
    const y2 = 50 + r * Math.sin(endRad)
    const largeArc = angle > 180 ? 1 : 0
    const path = `M 50 50 L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
    return { ...d, path, percent: Math.round((d.value / total) * 100) }
  })

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative w-36 h-36 shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {arcs.map(arc => (
            <path key={arc.label} d={arc.path} fill={arc.color} className="transition-all duration-300 hover:opacity-80" />
          ))}
          <circle cx="50" cy="50" r="26" fill="white" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-slate-800 text-center font-sans">
          {centerText}
        </div>
      </div>

      <div className="space-y-1.5 flex-1">
        {arcs.map(arc => (
          <div key={arc.label} className="flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: arc.color }} />
              <span className="text-slate-700">{arc.label}</span>
            </div>
            <div className="font-extrabold text-slate-900 tabular-nums">
              {arc.value} <span className="text-slate-400 font-normal">({arc.percent}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
