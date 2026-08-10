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
import { brand, roleTheme } from './theme'
import { getPageTitle } from './config/navigation'

import { Sidebar } from './components/layout/Sidebar'
import { Topbar } from './components/layout/Topbar'

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
  const [screen, setScreen] = useState<AuthScreen>('role-select')
  const [loginRole, setLoginRole] = useState<Role>('recruiter')
  const [role, setRole] = useState<Role>('recruiter')
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [searchQuery, setSearchQuery] = useState('')
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
    setScreen('role-select')
    setActiveNav('Dashboard')
    setSearchQuery('')
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

  const handleNewReqClick = () => {
    if (role === 'recruiter') handleOpenSubmitForReq()
    else setIsNewReqOpen(true)
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
          setActiveNav('Dashboard')
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

  const pageTitle = getPageTitle(role, activeNav)

  const renderContent = () => {
    if (activeNav === 'Dashboard') {
      return (
        <RecruiterDashboard
          submissions={submissions}
          interviews={interviews}
          requirements={requirements}
          onOpenSubmitCandidate={handleOpenSubmitForReq}
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
      />
    )
  }

  const canCreate = role === 'superadmin' || role === 'admin' || role === 'recruiter'

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
        <Topbar
          title={pageTitle}
          subtitle={`${currentUser.name} · ${roleTheme[role].label}`}
          role={role}
          onNewReqClick={canCreate ? handleNewReqClick : undefined}
          onSearchChange={setSearchQuery}
          searchValue={searchQuery}
          onSignOut={handleLogout}
          showNewReq={canCreate && activeNav === 'Dashboard'}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
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
