import { Requirement } from '../../../types'

export interface RequirementDetailOverviewProps {
  requirement: Requirement
  role?: string
  onBack: () => void
  onOpenAssignModal?: () => void
  onEditRequirement?: () => void
  onAddCandidate?: () => void
  onRevokeRequirement?: () => void
}

export interface CandidateSubmissionRow {
  subId: string
  avatar: string
  name: string
  email: string
  submittedBy: string
  submitterEmail: string
  submittedOn: string
  status: string
  canSchedule: boolean
}

export const MOCK_CANDIDATE_SUBMISSIONS: CandidateSubmissionRow[] = [
  {
    subId: 'SUB-197',
    avatar: 'MS',
    name: 'MUNTAZAR SAYED',
    email: 'sayedmuntazar1996@gmail.com',
    submittedBy: 'Marcus Chen',
    submitterEmail: 'm.chen@talentflow.io',
    submittedOn: '06/19/2026, 07:29 PM',
    status: 'Submitted to Client',
    canSchedule: true,
  },
  {
    subId: 'SUB-196',
    avatar: 'NJ',
    name: 'Nikhil Joshte',
    email: 'nikhiljoshte@gmail.com',
    submittedBy: 'Marcus Chen',
    submitterEmail: 'm.chen@talentflow.io',
    submittedOn: '06/19/2026, 07:29 PM',
    status: 'Submitted to Client',
    canSchedule: true,
  },
  {
    subId: 'SUB-195',
    avatar: 'PK',
    name: 'Pratibha Kale',
    email: 'pratibhakale13@yahoo.com',
    submittedBy: 'Harish Gadipally',
    submitterEmail: 'harish.g@metaforgeit.com',
    submittedOn: '06/19/2026, 06:45 PM',
    status: 'Submitted to Client',
    canSchedule: true,
  },
  {
    subId: 'SUB-194',
    avatar: 'SY',
    name: 'SANDEEP YADAV',
    email: 'sandeep886441@gmail.com',
    submittedBy: 'Saiteja Puttapaka',
    submitterEmail: 'saiteja.p@metaforgeit.com',
    submittedOn: '06/19/2026, 06:38 PM',
    status: 'Submitted to Client',
    canSchedule: false,
  },
  {
    subId: 'SUB-193',
    avatar: 'AS',
    name: 'Akshay Soni',
    email: 'akkisoni12123@gmail.com',
    submittedBy: 'Harish Gadipally',
    submitterEmail: 'harish.g@metaforgeit.com',
    submittedOn: '06/19/2026, 06:33 PM',
    status: 'Submitted to Client',
    canSchedule: true,
  },
]
