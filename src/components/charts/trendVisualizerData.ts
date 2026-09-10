export interface TrendDataPoint {
  month: string
  submissions: number
  interviews: number
  placements: number
  requirementsReceived: number
  conversionRate: number
}

export const TREND_DATA: TrendDataPoint[] = [
  { month: 'Jan', submissions: 120, interviews: 28, placements: 8, requirementsReceived: 35, conversionRate: 6.6 },
  { month: 'Feb', submissions: 145, interviews: 34, placements: 10, requirementsReceived: 42, conversionRate: 6.8 },
  { month: 'Mar', submissions: 160, interviews: 38, placements: 12, requirementsReceived: 48, conversionRate: 7.5 },
  { month: 'Apr', submissions: 180, interviews: 42, placements: 14, requirementsReceived: 55, conversionRate: 7.7 },
  { month: 'May', submissions: 210, interviews: 50, placements: 17, requirementsReceived: 62, conversionRate: 8.0 },
  { month: 'Jun', submissions: 245, interviews: 58, placements: 21, requirementsReceived: 70, conversionRate: 8.5 },
  { month: 'Jul', submissions: 270, interviews: 64, placements: 25, requirementsReceived: 78, conversionRate: 9.2 },
  { month: 'Aug', submissions: 295, interviews: 71, placements: 28, requirementsReceived: 85, conversionRate: 9.4 },
]
