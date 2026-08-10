import React from 'react'
import { LucideIcon } from 'lucide-react'
import { brand } from '../../theme'

interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  icon?: LucideIcon
}

export function StatCard({ label, value, sub, icon: Icon }: StatCardProps) {
  return (
    <div
      className="rounded-lg border p-4"
      style={{ background: brand.surface, borderColor: brand.border }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium" style={{ color: brand.textSecondary }}>
            {label}
          </p>
          <p className="text-2xl font-semibold mt-1 tabular-nums" style={{ color: brand.text }}>
            {value}
          </p>
          {sub && (
            <p className="text-xs mt-1" style={{ color: brand.textMuted }}>
              {sub}
            </p>
          )}
        </div>
        {Icon && <Icon className="w-5 h-5 flex-shrink-0" style={{ color: brand.textMuted }} />}
      </div>
    </div>
  )
}
