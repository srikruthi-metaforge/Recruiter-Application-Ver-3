import React from 'react'
import { InterviewStatus, Submission } from './types'
import { DEMO_ACCOUNTS } from './data/mockData'
import { brand } from './theme'
import { Sidebar } from './components/layout/Sidebar'
import { PageContainer } from './components/layout/PageContainer'
import { DevTeamDashboard } from './components/dashboards/DevTeamDashboard'
import { RecruiterDashboard } from './components/dashboards/RecruiterDashboard'
import { ModulePage } from './components/pages/ModulePage'
import { AuthScreenRouter } from './components/auth/AuthScreenRouter'
import { NewRequirementModal } from './components/modals/NewRequirementModal'
import { SubmitCandidateModal } from './components/modals/SubmitCandidateModal'
import { InterviewFeedbackModal } from './components/modals/InterviewFeedbackModal'
import { CandidateDetailModal } from './components/modals/CandidateDetailModal'
import { useAppState } from './hooks/useAppState'

export default function App() {
  const s = useAppState()
  const currentUser = DEMO_ACCOUNTS[s.role]

  const handleAddActivityLog = (newLog: any) => s.setActivityLogs(prev => [newLog, ...prev])

  const handleLogout = () => {
    try {
      localStorage.removeItem('metaforge_session_active')
      localStorage.removeItem('metaforge_user_role')
      localStorage.removeItem('metaforge_active_nav')
    } catch (e) {}
    s.setScreen('landing')
    s.setActiveNav('Requirements')
  }

  const handleAuthenticated = (r: any) => {
    s.setRole(r)
    const defaultNav = (r === 'superadmin' || r === 'devteam' || r === 'admin' || r === 'lead') ? 'Requirements' : 'Dashboard'
    try {
      localStorage.setItem('metaforge_session_active', 'true')
      localStorage.setItem('metaforge_user_role', r)
      localStorage.setItem('metaforge_active_nav', defaultNav)
    } catch (e) {}
    s.setActiveNav(defaultNav)
    s.setScreen('app')
  }

  const handleNavSelect = (nav: string) => {
    if (nav === 'Candidates' || nav === 'Candidate Search') s.setSelectedReqIdForSubmit(null)
    s.setActiveNav(nav)
    try { localStorage.setItem('metaforge_active_nav', nav) } catch (e) {}
  }

  const handleSubmitCandidate = (newSub: Submission) => {
    s.setSubmissions([newSub, ...s.submissions])
    s.setRequirements(prev => prev.map(r => (r.id === newSub.req ? { ...r, submissions: r.submissions + 1 } : r)))
    s.setRecruiters(prev => prev.map(rec => rec.name === newSub.recruiter ? { ...rec, submissions: rec.submissions + 1, today: rec.today + 1 } : rec))
    handleAddActivityLog({
      id: `LOG-${Date.now()}`, timestamp: 'Just now', userName: newSub.recruiter || currentUser.name,
      userEmail: currentUser.email, userRole: s.role, userAvatar: (newSub.recruiter || currentUser.name).charAt(0).toUpperCase(),
      action: `Submitted candidate ${newSub.candidate} for ${newSub.req}`, category: 'Submissions',
      targetEntity: `Candidate ${newSub.candidate}`, targetId: newSub.id, clientName: newSub.client, ipAddress: '192.168.1.45', status: 'Success', details: `Submitted candidate profile to client ${newSub.client}`,
    })
  }

  const handleSaveInterviewFeedback = (interviewId: string, status: InterviewStatus, notes: string) => {
    s.setInterviews(prev => prev.map(iv => (iv.id === interviewId ? { ...iv, status, notes } : iv)))
    const targetIv = s.interviews.find(i => i.id === interviewId)
    handleAddActivityLog({
      id: `LOG-${Date.now()}`, timestamp: 'Just now', userName: currentUser.name, userEmail: currentUser.email, userRole: s.role,
      userAvatar: currentUser.name.charAt(0).toUpperCase(), action: `Recorded interview feedback (${status}) for ${targetIv?.candidate || 'Candidate'}`,
      category: 'Interviews', targetEntity: `Interview ${interviewId}`, targetId: interviewId, clientName: targetIv?.client || 'Client', ipAddress: '192.168.1.45', status: 'Success', details: notes || `Interview status updated to ${status}`,
    })
  }

  if (s.screen !== 'app') {
    return <AuthScreenRouter screen={s.screen} loginRole={s.loginRole} recoveryEmail={s.recoveryEmail} onScreenChange={s.setScreen} onAuthenticated={handleAuthenticated} onLoginRoleChange={s.setLoginRole} onRecoveryEmailChange={s.setRecoveryEmail} />
  }

  const renderContent = () => {
    const effectiveNav = (s.role === 'superadmin' || s.role === 'devteam' || s.role === 'admin') && s.activeNav === 'Dashboard' ? 'Requirements' : s.activeNav
    if (effectiveNav === 'Dashboard') {
      if (s.role === 'devteam') {
        return <DevTeamDashboard admins={s.admins} leads={s.leads} recruiters={s.recruiters} requirements={s.requirements} interviews={s.interviews} onUpdateRequirements={s.setRequirements} onOpenSubmit={reqId => { s.setSelectedReqIdForSubmit(reqId || null); handleNavSelect('Candidates') }} />
      }
      return <RecruiterDashboard submissions={s.submissions} interviews={s.interviews} requirements={s.requirements} activityLogs={s.activityLogs} currentUserName={currentUser.name} currentUserEmail={currentUser.email} onOpenSubmitCandidate={reqId => { s.setSelectedReqIdForSubmit(reqId || null); if (s.role !== 'recruiter') handleNavSelect('Candidates') }} onOpenCandidateRepo={reqId => { s.setSelectedReqIdForSubmit(reqId || null); if (s.role !== 'recruiter') handleNavSelect('Candidates') }} onOpenFeedbackModal={iv => { s.setSelectedInterviewForFeedback(iv); s.setIsFeedbackModalOpen(true) }} onOpenCandidateDetail={sub => { s.setSelectedSubmissionForDetail(sub); s.setIsCandidateDetailOpen(true) }} onAddActivityLog={handleAddActivityLog} />
    }
    return <ModulePage pageKey={s.activeNav} role={s.role} requirements={s.requirements} submissions={s.submissions} interviews={s.interviews} recruiters={s.recruiters} selectedReqId={s.selectedReqIdForSubmit} onOpenSubmit={s.role !== 'client' ? reqId => { s.setSelectedReqIdForSubmit(reqId || null); handleNavSelect('Candidates') } : undefined} onOpenFeedback={iv => { s.setSelectedInterviewForFeedback(iv); s.setIsFeedbackModalOpen(true) }} onOpenCandidate={sub => { s.setSelectedSubmissionForDetail(sub); s.setIsCandidateDetailOpen(true) }} onUpdateRequirements={s.setRequirements} onSelectRequirement={s.setSelectedReqIdForSubmit} activityLogs={s.activityLogs} onAddActivityLog={handleAddActivityLog} onNavigateToDashboard={() => s.setActiveNav('Dashboard')} />
  }

  return (
    <div className="flex h-screen overflow-hidden font-body" style={{ background: brand.background }}>
      <Sidebar role={s.role} onLogout={handleLogout} activeNav={s.activeNav} onNavSelect={handleNavSelect} collapsed={s.isSidebarCollapsed} onToggleCollapse={() => s.setIsSidebarCollapsed(!s.isSidebarCollapsed)} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <main className="flex-1 overflow-y-auto w-full min-w-0 px-4 py-5 lg:px-6 xl:px-8 app-main-content">
          <PageContainer>{renderContent()}</PageContainer>
        </main>
      </div>
      <NewRequirementModal isOpen={s.isNewReqOpen} onClose={() => s.setIsNewReqOpen(false)} onAdd={newReq => s.setRequirements([newReq, ...s.requirements])} />
      <SubmitCandidateModal isOpen={s.isSubmitCandidateOpen} onClose={() => s.setIsSubmitCandidateOpen(false)} requirements={s.requirements} selectedReqId={s.selectedReqIdForSubmit} onSubmit={handleSubmitCandidate} currentRecruiterName={currentUser.name} />
      <InterviewFeedbackModal isOpen={s.isFeedbackModalOpen} onClose={() => s.setIsFeedbackModalOpen(false)} interview={s.selectedInterviewForFeedback} onSaveFeedback={handleSaveInterviewFeedback} />
      <CandidateDetailModal isOpen={s.isCandidateDetailOpen} onClose={() => s.setIsCandidateDetailOpen(false)} submission={s.selectedSubmissionForDetail} />
    </div>
  )
}
