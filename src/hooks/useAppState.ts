import { useState } from 'react'
import { ActivityLogItem, AuthScreen, Interview, Recruiter, Requirement, Role, Submission } from '../types'
import {
  INITIAL_ADMINS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_INTERVIEWS,
  INITIAL_LEADS,
  INITIAL_RECRUITERS,
  INITIAL_REQUIREMENTS,
  INITIAL_SUBMISSIONS,
} from '../data/mockData'

export function useAppState() {
  const [role, setRole] = useState<Role>(() => {
    try {
      return (localStorage.getItem('metaforge_user_role') as Role) || 'recruiter'
    } catch {
      return 'recruiter'
    }
  })

  const [screen, setScreen] = useState<AuthScreen>(() => {
    try {
      return localStorage.getItem('metaforge_session_active') === 'true' ? 'app' : 'landing'
    } catch {
      return 'landing'
    }
  })

  const [loginRole, setLoginRole] = useState<Role>(role)
  const [recoveryEmail, setRecoveryEmail] = useState('')
  const [activeNav, setActiveNav] = useState<string>(() => {
    try {
      const savedNav = localStorage.getItem('metaforge_active_nav')
      if (savedNav && savedNav !== 'Dashboard') return savedNav
      if (savedNav === 'Dashboard' && (role === 'lead' || role === 'superadmin' || role === 'admin' || role === 'devteam')) {
        return 'Requirements'
      }
      if (savedNav) return savedNav
    } catch {}
    return (role === 'superadmin' || role === 'devteam' || role === 'admin' || role === 'lead') ? 'Requirements' : 'Dashboard'
  })
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const [requirements, setRequirements] = useState<Requirement[]>(INITIAL_REQUIREMENTS)
  const [submissions, setSubmissions] = useState<Submission[]>(INITIAL_SUBMISSIONS)
  const [interviews, setInterviews] = useState<Interview[]>(INITIAL_INTERVIEWS)
  const [recruiters, setRecruiters] = useState<Recruiter[]>(INITIAL_RECRUITERS)
  const [leads] = useState(INITIAL_LEADS)
  const [admins] = useState(INITIAL_ADMINS)
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(INITIAL_ACTIVITY_LOGS)

  const [isNewReqOpen, setIsNewReqOpen] = useState(false)
  const [isSubmitCandidateOpen, setIsSubmitCandidateOpen] = useState(false)
  const [selectedReqIdForSubmit, setSelectedReqIdForSubmit] = useState<string | null>(null)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [selectedInterviewForFeedback, setSelectedInterviewForFeedback] = useState<Interview | null>(null)
  const [isCandidateDetailOpen, setIsCandidateDetailOpen] = useState(false)
  const [selectedSubmissionForDetail, setSelectedSubmissionForDetail] = useState<Submission | null>(null)

  return {
    role, setRole,
    screen, setScreen,
    loginRole, setLoginRole,
    recoveryEmail, setRecoveryEmail,
    activeNav, setActiveNav,
    isSidebarCollapsed, setIsSidebarCollapsed,
    requirements, setRequirements,
    submissions, setSubmissions,
    interviews, setInterviews,
    recruiters, setRecruiters,
    leads, admins,
    activityLogs, setActivityLogs,
    isNewReqOpen, setIsNewReqOpen,
    isSubmitCandidateOpen, setIsSubmitCandidateOpen,
    selectedReqIdForSubmit, setSelectedReqIdForSubmit,
    isFeedbackModalOpen, setIsFeedbackModalOpen,
    selectedInterviewForFeedback, setSelectedInterviewForFeedback,
    isCandidateDetailOpen, setIsCandidateDetailOpen,
    selectedSubmissionForDetail, setSelectedSubmissionForDetail,
  }
}
