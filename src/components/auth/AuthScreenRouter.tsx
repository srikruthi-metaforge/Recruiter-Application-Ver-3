import React from 'react'
import { AuthScreen, Role } from '../../types'
import { LandingPage } from '../landing/LandingPage'
import { SignInPage } from './SignInPage'
import { SignUpPage } from './SignUpRequestPage'
import { ForgotPasswordPage } from './ForgotPasswordPage'
import { RoleSelectPage } from './RoleSelectPage'
import { RoleLoginPage } from './RoleLoginPage'

interface AuthScreenRouterProps {
  screen: AuthScreen
  loginRole: Role
  recoveryEmail: string
  onScreenChange: (screen: AuthScreen) => void
  onAuthenticated: (role: Role) => void
  onLoginRoleChange: (role: Role) => void
  onRecoveryEmailChange: (email: string) => void
}

export function AuthScreenRouter({
  screen,
  loginRole,
  recoveryEmail,
  onScreenChange,
  onAuthenticated,
  onLoginRoleChange,
  onRecoveryEmailChange,
}: AuthScreenRouterProps) {
  if (screen === 'landing') {
    return (
      <LandingPage
        onSignIn={() => onScreenChange('signin')}
        onRequestAccess={() => onScreenChange('signup')}
      />
    )
  }

  if (screen === 'signin') {
    return (
      <SignInPage
        onLogin={onAuthenticated}
        onForgot={email => {
          onRecoveryEmailChange(email || '')
          onScreenChange('password-recovery')
        }}
        onSignup={() => onScreenChange('signup')}
        onBack={() => onScreenChange('landing')}
        onRolePortals={() => onScreenChange('role-select')}
      />
    )
  }

  if (screen === 'signup') {
    return <SignUpPage onBack={() => onScreenChange('signin')} onSubmitted={() => onScreenChange('signin')} />
  }

  if (screen === 'password-recovery') {
    return <ForgotPasswordPage initialEmail={recoveryEmail} onBack={() => onScreenChange('signin')} onSent={() => onScreenChange('signin')} />
  }

  if (screen === 'role-select') {
    return (
      <RoleSelectPage
        onSelectRole={r => {
          onLoginRoleChange(r)
          onScreenChange('role-login')
        }}
        onBack={() => onScreenChange('signin')}
      />
    )
  }

  if (screen === 'role-login') {
    return (
      <RoleLoginPage
        role={loginRole}
        onLogin={onAuthenticated}
        onBack={() => onScreenChange('role-select')}
        onForgot={() => onScreenChange('forgot')}
      />
    )
  }

  if (screen === 'forgot') {
    return (
      <ForgotPasswordPage
        onBack={() => onScreenChange('role-login')}
        onSent={() => onScreenChange('role-login')}
      />
    )
  }

  return null
}
