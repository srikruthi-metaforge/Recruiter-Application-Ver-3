export interface RecruiterMetric {
  recruiter: string
  requirementsAssigned: number
  submissionsCount: number
  l1Interviews: number
  l2Interviews: number
  customInterviews: number
  finalInterviews: number
  tatDays: number
}

export const RECRUITER_PERF_DATA: RecruiterMetric[] = [
  { recruiter: 'Marcus Chen', requirementsAssigned: 5, submissionsCount: 34, l1Interviews: 8, l2Interviews: 5, customInterviews: 3, finalInterviews: 2, tatDays: 1.8 },
  { recruiter: 'Priya Sharma', requirementsAssigned: 4, submissionsCount: 28, l1Interviews: 6, l2Interviews: 4, customInterviews: 2, finalInterviews: 3, tatDays: 2.1 },
  { recruiter: 'James O\'Brien', requirementsAssigned: 6, submissionsCount: 41, l1Interviews: 11, l2Interviews: 7, customInterviews: 4, finalInterviews: 4, tatDays: 1.5 },
  { recruiter: 'Aisha Patel', requirementsAssigned: 3, submissionsCount: 19, l1Interviews: 4, l2Interviews: 2, customInterviews: 1, finalInterviews: 1, tatDays: 2.4 },
  { recruiter: 'Carlos Rivera', requirementsAssigned: 5, submissionsCount: 37, l1Interviews: 9, l2Interviews: 6, customInterviews: 4, finalInterviews: 3, tatDays: 1.6 },
  { recruiter: 'Elena Volkov', requirementsAssigned: 4, submissionsCount: 22, l1Interviews: 5, l2Interviews: 3, customInterviews: 2, finalInterviews: 1, tatDays: 2.2 },
]
