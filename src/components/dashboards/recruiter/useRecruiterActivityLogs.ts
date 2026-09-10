import { useMemo } from 'react'
import { Submission, Interview, ActivityLogItem } from '../../../types'

interface Params {
  activityLogs?: ActivityLogItem[]
  submissions: Submission[]
  interviews: Interview[]
  currentUserName?: string
  currentUserEmail?: string
}

export function useRecruiterActivityLogs({
  activityLogs,
  submissions,
  interviews,
  currentUserName = 'Harish Gadipally',
  currentUserEmail,
}: Params) {
  return useMemo(() => {
    const targetName = (currentUserName || 'Harish Gadipally').toLowerCase()
    const targetEmail = (currentUserEmail || '').toLowerCase()
    const explicitLogs = (activityLogs || []).filter(log => {
      const matchName = log.userName && log.userName.toLowerCase().includes(targetName)
      const matchEmail = targetEmail && log.userEmail && log.userEmail.toLowerCase().includes(targetEmail)
      return matchName || matchEmail
    })
    const submissionLogs: ActivityLogItem[] = submissions
      .filter(s => !targetName || s.recruiter.toLowerCase().includes(targetName) || targetName.includes('harish'))
      .map(s => ({
        id: `sub-activity-${s.id}`,
        timestamp: s.date || 'Recently',
        userName: s.recruiter,
        userEmail: currentUserEmail || '',
        userRole: 'recruiter',
        userAvatar: s.recruiter.charAt(0).toUpperCase(),
        action: `Submitted candidate ${s.candidate} for ${s.req}`,
        category: 'Submissions',
        targetEntity: `Candidate ${s.candidate}`,
        targetId: s.id,
        clientName: s.client,
        ipAddress: '192.168.1.45',
        status: s.stage.toLowerCase().includes('reject') ? 'Warning' : 'Success',
        details: `Submitted to client ${s.client} | Current Stage: ${s.stage}`,
      }))
    const interviewLogs: ActivityLogItem[] = interviews
      .filter(i => !targetName || (i.recruiter && i.recruiter.toLowerCase().includes(targetName)) || targetName.includes('harish'))
      .map(i => ({
        id: `iv-activity-${i.id}`,
        timestamp: i.date || 'Recently',
        userName: i.recruiter || currentUserName || 'Harish Gadipally',
        userEmail: currentUserEmail || '',
        userRole: 'recruiter',
        userAvatar: (i.recruiter || 'H').charAt(0).toUpperCase(),
        action: `Scheduled interview (${i.stage || 'Round'}) for ${i.candidate}`,
        category: 'Interviews',
        targetEntity: `Interview with ${i.candidate}`,
        targetId: i.id,
        clientName: i.client || 'Client',
        ipAddress: '192.168.1.45',
        status: i.status === 'Passed' || i.status === 'Confirmed' ? 'Success' : 'Warning',
        details: `Status: ${i.status} | Client: ${i.client || 'Partner'}`,
      }))
    const combined = [...explicitLogs, ...submissionLogs, ...interviewLogs]
    const seen = new Set<string>()
    return combined.filter(item => {
      const key = `${item.action}-${item.timestamp}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }, [activityLogs, submissions, interviews, currentUserName, currentUserEmail])
}
