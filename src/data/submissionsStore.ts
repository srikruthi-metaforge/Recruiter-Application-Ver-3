import { Submission } from '../types'
import { INITIAL_SUBMISSIONS } from './mockData'
import { DEFAULT_EXTRA_SUBMISSIONS } from './submissionsData'
import {
  DuplicateCheckCandidate,
  DuplicateCheckResult,
  checkDuplicateSubmissionInList,
} from './submissionsDupCheck'

export type { DuplicateCheckCandidate, DuplicateCheckResult }

const STORAGE_KEY = 'metaforge_candidate_submissions_v1'

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

export function checkDuplicateSubmission(
  reqId?: string | null,
  candidate?: DuplicateCheckCandidate | null
): DuplicateCheckResult {
  const submissions = getSubmissionsStore()
  return checkDuplicateSubmissionInList(submissions, reqId, candidate)
}
