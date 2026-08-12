import React, { useState } from 'react'
import { AuthScreen, Interview, InterviewStatus, Recruiter, Role, Submission, Requirement } from './types'
import {
  INITIAL_ADMINS,
  INITIAL_INTERVIEWS,
  INITIAL_LEADS,
  INITIAL_RECRUITERS,
  INITIAL_REQUIREMENTS,
  INITIAL_SUBMISSIONS,
  DEMO_ACCOUNTS,
} from './data/mockData'
import { brand } from './theme'

import { Sidebar } from './components/layout/Sidebar'
import { PageContainer } from './components/layout/PageContainer'

import { SuperAdminDashboard } from './components/dashboards/SuperAdminDashboard'
import { AdminDashboard } from './components/dashboards/AdminDashboard'
import { LeadDashboard } from './components/dashboards/LeadDashboard'
import { RecruiterDashboard } from './components/dashboards/RecruiterDashboard'
import { ClientDashboard } from './components/dashboards/ClientDashboard'
import { ModulePage } from './components/pages/ModulePage'

import { RoleSelectPage } from './components/auth/RoleSelectPage'
import { RoleLoginPage } from './components/auth/RoleLoginPage'
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage'

import { NewRequirementModal } from './components/modals/NewRequirementModal'
import { SubmitCandidateModal } from './components/modals/SubmitCandidateModal'
import { InterviewFeedbackModal } from './components/modals/InterviewFeedbackModal'
import { CandidateDetailModal } from './components/modals/CandidateDetailModal'

export default function App() {
  const [role, setRole] = useState<Role>(() => {
    try {
      const savedRole = localStorage.getItem('metaforge_user_role') as Role
      return savedRole || 'recruiter'
    } catch {
      return 'recruiter'
    }
  })

  const [screen, setScreen] = useState<AuthScreen>(() => {
    try {
      const savedSession = localStorage.getItem('metaforge_session_active')
      return savedSession === 'true' ? 'app' : 'role-select'
    } catch {
      return 'role-select'
    }
  })

  const [loginRole, setLoginRole] = useState<Role>(role)
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const [requirements, setRequirements] = useState<Requirement[]>(INITIAL_REQUIREMENTS)
  const [submissions, setSubmissions] = useState<Submission[]>(INITIAL_SUBMISSIONS)
  const [interviews, setInterviews] = useState<Interview[]>(INITIAL_INTERVIEWS)
  const [recruiters, setRecruiters] = useState<Recruiter[]>(INITIAL_RECRUITERS)
  const [leads] = useState(INITIAL_LEADS)
  const [admins] = useState(INITIAL_ADMINS)

  const [isNewReqOpen, setIsNewReqOpen] = useState(false)
  const [isSubmitCandidateOpen, setIsSubmitCandidateOpen] = useState(false)
  const [selectedReqIdForSubmit, setSelectedReqIdForSubmit] = useState<string | null>(null)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [selectedInterviewForFeedback, setSelectedInterviewForFeedback] = useState<Interview | null>(null)
  const [isCandidateDetailOpen, setIsCandidateDetailOpen] = useState(false)
  const [selectedSubmissionForDetail, setSelectedSubmissionForDetail] = useState<Submission | null>(null)

  const currentUser = DEMO_ACCOUNTS[role]

  const handleLogout = () => {
    try {
      localStorage.removeItem('metaforge_session_active')
      localStorage.removeItem('metaforge_user_role')
    } catch (e) {
      // ignore
    }
    setScreen('role-select')
    setActiveNav('Dashboard')
  }

  const handleNavSelect = (nav: string) => setActiveNav(nav)

  const handleAddRequirement = (newReq: Requirement) => {
    setRequirements([newReq, ...requirements])
  }

  const handleSubmitCandidate = (newSub: Submission) => {
    setSubmissions([newSub, ...submissions])
    setRequirements(prev =>
      prev.map(r => (r.id === newSub.req ? { ...r, submissions: r.submissions + 1 } : r))
    )
    setRecruiters(prev =>
      prev.map(rec =>
        rec.name === newSub.recruiter
          ? { ...rec, submissions: rec.submissions + 1, today: rec.today + 1 }
          : rec
      )
    )
  }

  const handleSaveInterviewFeedback = (interviewId: string, status: InterviewStatus, notes: string) => {
    setInterviews(prev => prev.map(iv => (iv.id === interviewId ? { ...iv, status, notes } : iv)))
  }

  const handleOpenSubmitForReq = (reqId?: string) => {
    setSelectedReqIdForSubmit(reqId || null)
    setIsSubmitCandidateOpen(true)
  }

  const handleOpenFeedbackForInterview = (iv: Interview) => {
    setSelectedInterviewForFeedback(iv)
    setIsFeedbackModalOpen(true)
  }

  const handleOpenCandidateDetail = (sub: Submission) => {
    setSelectedSubmissionForDetail(sub)
    setIsCandidateDetailOpen(true)
  }

  if (screen === 'role-select') {
    return (
      <RoleSelectPage
        onSelectRole={r => {
          setLoginRole(r)
          setScreen('role-login')
        }}
      />
    )
  }

  if (screen === 'role-login') {
    return (
      <RoleLoginPage
        role={loginRole}
        onLogin={r => {
          setRole(r)
          try {
            localStorage.setItem('metaforge_session_active', 'true')
            localStorage.setItem('metaforge_user_role', r)
          } catch (e) {
            // ignore
          }
          if (r === 'superadmin' || r === 'admin') {
            setActiveNav('Requirements')
          } else {
            setActiveNav('Dashboard')
          }
          setScreen('app')
        }}
        onBack={() => setScreen('role-select')}
        onForgot={() => setScreen('forgot')}
      />
    )
  }

  if (screen === 'forgot') {
    return (
      <ForgotPasswordPage
        onBack={() => setScreen('role-login')}
        onSent={() => setScreen('role-login')}
      />
    )
  }

  const renderContent = () => {
    if (activeNav === 'Dashboard') {
      switch (role) {
        case 'superadmin':
        case 'admin':
          // Dashboard removed for Super Admin and Admin - fall back to Requirements
          return (
            <ModulePage
              pageKey="Requirements"
              role={role}
              requirements={requirements}
              submissions={submissions}
              interviews={interviews}
              recruiters={recruiters}
              onOpenSubmit={handleOpenSubmitForReq}
              onOpenFeedback={handleOpenFeedbackForInterview}
              onOpenCandidate={handleOpenCandidateDetail}
              onUpdateRequirements={setRequirements}
            />
          )
        case 'lead':
          return (
            <LeadDashboard
              recruiters={recruiters}
              requirements={requirements}
              interviews={interviews}
            />
          )
        case 'client':
          return <ClientDashboard />
        default:
          return (
            <RecruiterDashboard
              submissions={submissions}
              interviews={interviews}
              requirements={requirements}
              onOpenSubmitCandidate={() => setActiveNav('Candidates')}
              onOpenFeedbackModal={handleOpenFeedbackForInterview}
              onOpenCandidateDetail={handleOpenCandidateDetail}
            />
          )
      }
    }

    if (activeNav === 'Requirements' && role === 'recruiter') {
      return (
        <RecruiterDashboard
          submissions={submissions}
          interviews={interviews}
          requirements={requirements}
          onOpenSubmitCandidate={() => setActiveNav('Candidates')}
          onOpenFeedbackModal={handleOpenFeedbackForInterview}
          onOpenCandidateDetail={handleOpenCandidateDetail}
        />
      )
    }

    return (
      <ModulePage
        pageKey={activeNav}
        role={role}
        requirements={requirements}
        submissions={submissions}
        interviews={interviews}
        recruiters={recruiters}
        onOpenSubmit={role !== 'client' ? handleOpenSubmitForReq : undefined}
        onOpenFeedback={handleOpenFeedbackForInterview}
        onOpenCandidate={handleOpenCandidateDetail}
        onUpdateRequirements={setRequirements}
      />
    )
  }

  return (
    <div className="flex h-screen overflow-hidden font-body" style={{ background: brand.background }}>
      <Sidebar
        role={role}
        onLogout={handleLogout}
        activeNav={activeNav}
        onNavSelect={handleNavSelect}
        collapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <main className="flex-1 overflow-y-auto w-full min-w-0 px-4 py-5 lg:px-6 xl:px-8 app-main-content">
          <PageContainer>{renderContent()}</PageContainer>
        </main>
      </div>

      <NewRequirementModal isOpen={isNewReqOpen} onClose={() => setIsNewReqOpen(false)} onAdd={handleAddRequirement} />
      <SubmitCandidateModal
        isOpen={isSubmitCandidateOpen}
        onClose={() => setIsSubmitCandidateOpen(false)}
        requirements={requirements}
        selectedReqId={selectedReqIdForSubmit}
        onSubmit={handleSubmitCandidate}
        currentRecruiterName={currentUser.name}
      />
      <InterviewFeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        interview={selectedInterviewForFeedback}
        onSaveFeedback={handleSaveInterviewFeedback}
      />
      <CandidateDetailModal
        isOpen={isCandidateDetailOpen}
        onClose={() => setIsCandidateDetailOpen(false)}
        submission={selectedSubmissionForDetail}
      />
    </div>
  )
}
