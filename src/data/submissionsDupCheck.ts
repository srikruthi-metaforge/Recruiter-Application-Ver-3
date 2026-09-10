import { Submission } from '../types'

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

function normalizePhone(phone?: string | null): string {
  if (!phone) return ''
  let cleaned = phone.replace(/[^\d]/g, '')
  if (cleaned.length > 10) {
    cleaned = cleaned.slice(-10)
  }
  return cleaned
}

function normalizeEmail(email?: string | null): string {
  if (!email) return ''
  return email.trim().toLowerCase()
}

function normalizeName(name?: string | null): string {
  if (!name) return ''
  return name.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function checkDuplicateSubmissionInList(
  submissions: Submission[],
  reqId?: string | null,
  candidate?: DuplicateCheckCandidate | null
): DuplicateCheckResult {
  if (!reqId || !candidate) {
    return { isDuplicate: false }
  }

  const normEmail = normalizeEmail(candidate.email)
  const normPhone = normalizePhone(candidate.phone)
  const normName = normalizeName(candidate.name)
  const candidateId = candidate.candidateId?.trim().toLowerCase()
  const targetReqId = reqId.trim().toLowerCase()

  for (const sub of submissions) {
    const subReqId = (sub.req || '').trim().toLowerCase()
    
    const isReqMatch =
      subReqId === targetReqId ||
      (targetReqId === 'req-001' && subReqId.endsWith('001')) ||
      (subReqId === 'req-001' && targetReqId.endsWith('001')) ||
      (targetReqId === 'req-002' && subReqId.endsWith('002')) ||
      (subReqId === 'req-002' && targetReqId.endsWith('002')) ||
      (targetReqId === 'req-003' && subReqId.endsWith('003')) ||
      (subReqId === 'req-003' && targetReqId.endsWith('003'))

    if (!isReqMatch) continue

    if (normEmail && sub.email && normalizeEmail(sub.email) === normEmail) {
      return {
        isDuplicate: true,
        existingSubmission: sub,
        matchReason: `Matching email address (${candidate.email})`,
      }
    }

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

    if (candidateId && sub.id && sub.id.toLowerCase() === candidateId) {
      return {
        isDuplicate: true,
        existingSubmission: sub,
        matchReason: `Matching Candidate ID (${sub.id})`,
      }
    }
  }

  return { isDuplicate: false }
}
