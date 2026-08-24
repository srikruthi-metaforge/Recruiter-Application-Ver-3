import React, { useId } from 'react'
import { AlertCircle, ArrowRight, Check, Eye, EyeOff, LucideIcon, X } from 'lucide-react'
import { PASSWORD_RULES, passwordStrength } from '../../data/authService'

const INPUT_BASE =
  'w-full h-12 sm:h-13 text-sm font-medium text-slate-900 bg-slate-50/70 border rounded-xl focus:outline-none transition-all placeholder:text-slate-400'
const INPUT_OK = 'border-slate-300 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10'
const INPUT_ERR = 'border-rose-400 bg-rose-50/50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'

export function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
      {children}
    </label>
  )
}

export function FieldError({ children }: { children?: string }) {
  if (!children) return null
  return (
    <p className="text-xs font-mono text-rose-500 mt-1.5 flex items-center gap-1.5" role="alert">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
      {children}
    </p>
  )
}

interface TextFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
  icon?: LucideIcon
  error?: string
  autoComplete?: string
  disabled?: boolean
  inputMode?: 'text' | 'email' | 'tel' | 'numeric'
  action?: React.ReactNode
}

export function TextField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  icon: Icon,
  error,
  autoComplete,
  disabled,
  inputMode,
  action,
}: TextFieldProps) {
  const id = useId()
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {action}
      </div>
      <div className="relative">
        {Icon && (
          <Icon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        )}
        <input
          id={id}
          type={type}
          value={value}
          inputMode={inputMode}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={!!error}
          onChange={e => onChange(e.target.value)}
          className={`${INPUT_BASE} ${Icon ? 'pl-12' : 'pl-4'} pr-4 ${error ? INPUT_ERR : INPUT_OK} disabled:opacity-60 disabled:cursor-not-allowed`}
        />
      </div>
      <FieldError>{error}</FieldError>
    </div>
  )
}

interface PasswordFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  icon?: LucideIcon
  error?: string
  autoComplete?: string
  disabled?: boolean
  action?: React.ReactNode
}

export function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  autoComplete,
  disabled,
  action,
}: PasswordFieldProps) {
  const id = useId()
  const [visible, setVisible] = React.useState(false)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {action}
      </div>
      <div className="relative">
        {Icon && (
          <Icon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        )}
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={!!error}
          onChange={e => onChange(e.target.value)}
          className={`${INPUT_BASE} ${Icon ? 'pl-12' : 'pl-4'} pr-12 ${error ? INPUT_ERR : INPUT_OK} disabled:opacity-60 disabled:cursor-not-allowed`}
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible(v => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
        >
          {visible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      <FieldError>{error}</FieldError>
    </div>
  )
}

/** Inline banner for form-level errors / notices. */
export function AuthAlert({
  tone = 'error',
  children,
}: {
  tone?: 'error' | 'info' | 'success'
  children: React.ReactNode
}) {
  const tones = {
    error: 'bg-rose-50 border-rose-200 text-rose-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  }
  const dots = { error: 'bg-rose-500', info: 'bg-blue-500', success: 'bg-emerald-500' }

  return (
    <div role="alert" className={`p-4 rounded-xl border text-xs font-medium flex items-start gap-2.5 ${tones[tone]}`}>
      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${dots[tone]}`} />
      <span className="leading-relaxed">{children}</span>
    </div>
  )
}

interface SubmitButtonProps {
  children: React.ReactNode
  loading?: boolean
  loadingLabel?: string
  disabled?: boolean
  withArrow?: boolean
  onClick?: () => void
  type?: 'submit' | 'button'
}

export function SubmitButton({
  children,
  loading,
  loadingLabel,
  disabled,
  withArrow = true,
  onClick,
  type = 'submit',
}: SubmitButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className="w-full h-12 sm:h-13 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
    >
      {loading ? (
        <>
          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          {loadingLabel || 'Please wait…'}
        </>
      ) : (
        <>
          {children}
          {withArrow && <ArrowRight className="w-4 h-4" />}
        </>
      )}
    </button>
  )
}

export function SecondaryButton({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 sm:h-13 px-5 border border-slate-300 bg-white text-slate-700 rounded-xl text-xs font-mono font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all cursor-pointer ${className}`}
    >
      {children}
    </button>
  )
}

/** Live password policy checklist + strength meter. */
export function PasswordRequirements({ value }: { value: string }) {
  const strength = passwordStrength(value)

  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold">
          Password Requirements
        </p>
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: strength.color }}>
          {value ? strength.label : '—'}
        </span>
      </div>

      <div className="flex gap-1">
        {PASSWORD_RULES.map((rule, i) => (
          <span
            key={rule.id}
            className="h-1.5 flex-1 rounded-full transition-colors"
            style={{ background: i < strength.score ? strength.color : '#E2E8F0' }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
        {PASSWORD_RULES.map(rule => {
          const passed = rule.test(value)
          return (
            <div key={rule.id} className="flex items-center gap-2">
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                  passed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-400'
                }`}
              >
                {passed ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
              </span>
              <span className={`text-[11px] font-medium ${passed ? 'text-slate-700' : 'text-slate-400'}`}>
                {rule.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
