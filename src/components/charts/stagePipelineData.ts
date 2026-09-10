export interface RecruiterStageMetric {
  recruiter: string
  isLead?: boolean
  sourced: number
  screening: number
  submittedToClient: number
  l1Interview: number
  l2Interview: number
  customClientInterview: number
  finalInterview: number
  offered: number
  placed: number
  totalSubmissions: number
}

export const STAGE_PIPELINE_DATA: RecruiterStageMetric[] = [
  { recruiter: 'Harish Gadipally (Team Lead)', isLead: true, sourced: 42, screening: 38, submittedToClient: 31, l1Interview: 18, l2Interview: 12, customClientInterview: 8, finalInterview: 6, offered: 5, placed: 4, totalSubmissions: 31 },
  { recruiter: 'Adirala sathvika', sourced: 28, screening: 25, submittedToClient: 19, l1Interview: 11, l2Interview: 7, customClientInterview: 4, finalInterview: 3, offered: 2, placed: 2, totalSubmissions: 19 },
  { recruiter: 'rahimoon Shaik', sourced: 26, screening: 22, submittedToClient: 18, l1Interview: 10, l2Interview: 6, customClientInterview: 5, finalInterview: 3, offered: 2, placed: 1, totalSubmissions: 18 },
  { recruiter: 'Puttapaka Saiteja', sourced: 24, screening: 20, submittedToClient: 15, l1Interview: 9, l2Interview: 5, customClientInterview: 3, finalInterview: 2, offered: 1, placed: 1, totalSubmissions: 15 },
  { recruiter: 'Suresh kulkarni', sourced: 22, screening: 19, submittedToClient: 14, l1Interview: 8, l2Interview: 4, customClientInterview: 2, finalInterview: 2, offered: 1, placed: 1, totalSubmissions: 14 },
]
