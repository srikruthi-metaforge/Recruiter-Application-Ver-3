import { Submission } from '../types'
import { INITIAL_SUBMISSIONS } from './mockData'

const STORAGE_KEY = 'metaforge_candidate_submissions_v1'

// Additional initial submissions from demo screens
const DEFAULT_EXTRA_SUBMISSIONS: Submission[] = [
  {
    id: 'SUB-201',
    candidate: 'Alex Turner',
    req: 'REQ-2026-08-12-001',
    client: 'Accenture',
    date: 'Aug 17, 2026',
    stage: 'Submitted to Client',
    match: '94%',
    recruiter: 'Marcus Chen',
    email: 'alex.turner@dev.com',
    phone: '+1 555-0192',
    experience: '7 Years 6 Months',
  },
  {
    id: 'SUB-202',
    candidate: 'Vidyasagar Gade',
    req: 'REQ-2026-08-12-003',
    client: 'Accenture',
    date: 'Aug 16, 2026',
    stage: 'Interview Scheduled',
    match: '91%',
    recruiter: 'Priya Sharma',
    email: 'vidyasagar.gade@infosys.com',
    phone: '+91 98765 12345',
    experience: '10 Years',
  },
  {
    id: 'SUB-203',
    candidate: 'Suresh Kulkarni',
    req: 'REQ-2026-08-12-004',
    client: 'Accenture',
    date: 'Aug 16, 2026',
    stage: 'Rejected',
    match: '75%',
    recruiter: 'Suresh Kulkarni',
    email: 'suresh.kulkarni@wipro.com',
    phone: '+91 99887 11223',
    experience: '8 Years 2 Months',
  },
  {
    id: 'SUB-204',
    candidate: 'Harish Gadipally',
    req: 'REQ-2026-08-12-001',
    client: 'Accenture',
    date: 'Aug 15, 2026',
    stage: 'Submitted to Client',
    match: '98%',
    recruiter: 'Harish Gadipally',
    email: 'harish.g@metaforgeit.com',
    phone: '+91 98765 99887',
    experience: '12 Years',
  },
  {
    id: 'SUB-205',
    candidate: 'Rania Khalil',
    req: 'REQ-2026-08-06-005',
    client: 'Goldman Sachs',
    date: 'Aug 14, 2026',
    stage: 'Interview Scheduled',
    match: '95%',
    recruiter: 'lakshmi.v Recruiter',
    email: 'rkhalil@java.com',
    phone: '+1 555-0231',
    experience: '11 Years',
  },
  {
    id: 'SUB-206',
    candidate: 'Abhijit Narke',
    req: 'REQ-2026-08-06-005',
    client: 'Goldman Sachs',
    date: 'Aug 14, 2026',
    stage: 'Rejected',
    match: '82%',
    recruiter: 'Lingoji Pavani',
    email: 'abhijit.narke@barclays.com',
    phone: '+91 98111 22334',
    experience: '9 Years',
  },
  {
    id: 'SUB-207',
    candidate: 'Kanchan Meshram',
    req: 'REQ-2026-08-07-006',
    client: 'Tesla',
    date: 'Aug 13, 2026',
    stage: 'Submitted to Client',
    match: '92%',
    recruiter: 'rahimoon Shaik',
    email: 'kanchan.m@bosch.de',
    phone: '+91 97654 32109',
    experience: '6 Years 8 Months',
  },
  {
    id: 'SUB-208',
    candidate: 'Ben Wallace',
    req: 'REQ-2026-08-07-007',
    client: 'Tesla',
    date: 'Aug 13, 2026',
    stage: 'Rejected',
    match: '88%',
    recruiter: 'Adirala sathvika',
    email: 'ben.w@ai.com',
    phone: '+1 555-0412',
    experience: '5 Years 4 Months',
  },
  {
    id: 'SUB-197',
    candidate: 'MUNTAZAR SAYED',
    req: 'REQ-001',
    client: 'Accenture',
    date: 'Jun 19, 2026',
    stage: 'Submitted to Client',
    match: '93%',
    recruiter: 'Marcus Chen',
    email: 'sayedmuntazar1996@gmail.com',
    phone: '+91 98223 34455',
    experience: '6 Years',
  },
  {
    id: 'SUB-196',
    candidate: 'Nikhil Joshte',
    req: 'REQ-001',
    client: 'Accenture',
    date: 'Jun 19, 2026',
    stage: 'Submitted to Client',
    match: '91%',
    recruiter: 'Marcus Chen',
    email: 'nikhiljoshte@gmail.com',
    phone: '+91 98334 45566',
    experience: '7 Years',
  },
  {
    id: 'SUB-195',
    candidate: 'Pratibha Kale',
    req: 'REQ-001',
    client: 'Accenture',
    date: 'Jun 19, 2026',
    stage: 'Submitted to Client',
    match: '95%',
    recruiter: 'Harish Gadipally',
    email: 'pratibhakale13@yahoo.com',
    phone: '+91 98445 56677',
    experience: '8 Years',
  },
]

export function getSubmissionsStore(): Submission[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      const parsed = JSON.parse(data)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (e) {
    console.error('Failed to parse submissionsStore from localStorage', e)
  }

  // Combine initial mock data
  const combined = [...INITIAL_SUBMISSIONS]
  for (const extra of DEFAULT_EXTRA_SUBMISSIONS) {
    if (!combined.some(s => s.id === extra.id)) {
      combined.push(extra)
    }
  }
  return combined
}

export function saveSubmissionsStore(submissions: Submission[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions))
    window.dispatchEvent(new Event('submissions_updated'))
  } catch (e) {
    console.error('Failed to save submissionsStore to localStorage', e)
  }
}

export function addSubmissionToStore(sub: Submission): Submission[] {
  const current = getSubmissionsStore()
  // Check if ID exists, replace or prepend
  const existsIndex = current.findIndex(s => s.id === sub.id)
  let updated: Submission[]
  if (existsIndex >= 0) {
    updated = [...current]
    updated[existsIndex] = sub
  } else {
    updated = [sub, ...current]
  }
  saveSubmissionsStore(updated)
  return updated
}

export interface DuplicateCheckCandidate {
  email?: string | null
  phone?: string | null
  candidateId?: string | null
  name?: string | null
}

export interface DuplicateCheckResult {
  isDuplicate: boolean
  existingSubmission?: Submission
  matchReason?: string
}

/**
 * Normalizes phone strings for comparison (removes spaces, dashes, country code prefix).
 */
function normalizePhone(phone?: string | null): string {
  if (!phone) return ''
  let cleaned = phone.replace(/[^\d]/g, '')
  if (cleaned.length > 10) {
    cleaned = cleaned.slice(-10)
  }
  return cleaned
}

/**
 * Normalizes email strings for comparison (lowercase, trimmed).
 */
function normalizeEmail(email?: string | null): string {
  if (!email) return ''
  return email.trim().toLowerCase()
}

/**
 * Normalizes name strings for comparison.
 */
function normalizeName(name?: string | null): string {
  if (!name) return ''
  return name.trim().toLowerCase().replace(/\s+/g, ' ')
}

/**
 * Checks if a candidate is already submitted for a specific requirement ID.
 * Returns { isDuplicate: true, existingSubmission, matchReason } if a match is found.
 */
export function checkDuplicateSubmission(
  reqId?: string | null,
  candidate?: DuplicateCheckCandidate | null
): DuplicateCheckResult {
  if (!reqId || !candidate) {
    return { isDuplicate: false }
  }

  const submissions = getSubmissionsStore()
  const normEmail = normalizeEmail(candidate.email)
  const normPhone = normalizePhone(candidate.phone)
  const normName = normalizeName(candidate.name)
  const candidateId = candidate.candidateId?.trim().toLowerCase()

  const targetReqId = reqId.trim().toLowerCase()

  for (const sub of submissions) {
    const subReqId = (sub.req || '').trim().toLowerCase()
    
    // Check exact or requirement code match
    const isReqMatch =
      subReqId === targetReqId ||
      (targetReqId === 'req-001' && subReqId.endsWith('001')) ||
      (subReqId === 'req-001' && targetReqId.endsWith('001')) ||
      (targetReqId === 'req-002' && subReqId.endsWith('002')) ||
      (subReqId === 'req-002' && targetReqId.endsWith('002')) ||
      (targetReqId === 'req-003' && subReqId.endsWith('003')) ||
      (subReqId === 'req-003' && targetReqId.endsWith('003')) ||
      (targetReqId === 'req-004' && subReqId.endsWith('004')) ||
      (subReqId === 'req-004' && targetReqId.endsWith('004')) ||
      (targetReqId === 'req-005' && subReqId.endsWith('005')) ||
      (subReqId === 'req-005' && targetReqId.endsWith('005')) ||
      (targetReqId === 'req-006' && subReqId.endsWith('006')) ||
      (subReqId === 'req-006' && targetReqId.endsWith('006'))

    if (!isReqMatch) continue

    // 1. Email Match
    if (normEmail && sub.email) {
      if (normalizeEmail(sub.email) === normEmail) {
        return {
          isDuplicate: true,
          existingSubmission: sub,
          matchReason: `Matching email address (${candidate.email})`,
        }
      }
    }

    // 2. Phone Match
    if (normPhone && normPhone.length >= 7 && sub.phone) {
      const subPhoneNorm = normalizePhone(sub.phone)
      if (subPhoneNorm && subPhoneNorm === normPhone) {
        return {
          isDuplicate: true,
          existingSubmission: sub,
          matchReason: `Matching phone number (${candidate.phone})`,
        }
      }
    }

    // 3. Name Match
    if (normName && sub.candidate) {
      const subNameNorm = normalizeName(sub.candidate)
      if (subNameNorm && (subNameNorm === normName || subNameNorm.includes(normName) || normName.includes(subNameNorm))) {
        if (normName.length > 3) {
          return {
            isDuplicate: true,
            existingSubmission: sub,
            matchReason: `Matching candidate name (${sub.candidate})`,
          }
        }
      }
    }

    // 4. Candidate ID Match
    if (candidateId && sub.id) {
      if (sub.id.toLowerCase() === candidateId) {
        return {
          isDuplicate: true,
          existingSubmission: sub,
          matchReason: `Matching Candidate ID (${sub.id})`,
        }
      }
    }
  }

  return { isDuplicate: false }
}
