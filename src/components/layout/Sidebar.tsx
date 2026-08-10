import React, { useState } from 'react'
import {
  LayoutDashboard,
  Building2,
  Users,
  Shield,
  Briefcase,
  UserPlus,
  Send,
  Calendar,
  Award,
  Sparkles,
  BarChart3,
  Plug,
  Settings,
  FileText,
  Mail,
  Activity,
  Search,
  GitBranch,
  Target,
  TrendingUp,
  Bell,
  Bot,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'
import { Role } from '../../types'
import { DEMO_ACCOUNTS } from '../../data/mockData'
import { ROLE_NAV } from '../../config/navigation'
import { MetaforgeLogo } from '../common/MetaforgeLogo'

interface SidebarProps {
  role: Role
  onLogout?: () => void
  activeNav?: string
  onNavSelect?: (nav: string) => void
  collapsed?: boolean
  onToggleCollapse?: () => void
}

const ICONS: Record<string, React.ElementType> = {
  Dashboard: LayoutDashboard,
  Requirements: Briefcase,
  Candidates: UserPlus,
  Submissions: Send,
  Interviews: Calendar,
  Organization: Building2,
  Users: Users,
  Roles: Shield,
  Clients: Building2,
  Offers: Award,
  'AI Center': Sparkles,
  Reports: BarChart3,
  Integrations: Plug,
  Settings: Settings,
  'Audit Logs': FileText,
  Recruiters: Users,
  Teams: Users,
  Calendar: Calendar,
  Documents: FileText,
  'Email Center': Mail,
  'Activity Logs': Activity,
  'My Team': Users,
  Performance: TrendingUp,
  Targets: Target,
  'Candidate Search': Search,
  'AI Match': Sparkles,
  Pipeline: GitBranch,
  'Follow-ups': Activity,
  Analytics: BarChart3,
  Notifications: Bell,
  'AI Assistant': Bot,
  Profile: User,
}

// Friendly display labels
const NAV_LABELS: Record<string, string> = {
  Requirements: 'Requirements',
  Candidates: 'Add Candidate',
  Submissions: 'Submissions',
  Interviews: 'Interview Tracking',
  Reports: 'Reports',
}

export function Sidebar({
  role,
  onLogout,
  activeNav = 'Dashboard',
  onNavSelect,
  collapsed: externalCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false)

  // Use controlled collapsed state if provided, else fallback to internal state
  const isCollapsed =
    externalCollapsed !== undefined ? externalCollapsed : internalCollapsed

  const handleToggle = () => {
    if (onToggleCollapse) {
      onToggleCollapse()
    } else {
      setInternalCollapsed(!internalCollapsed)
    }
  }

  const user = DEMO_ACCOUNTS[role]
  const sections = ROLE_NAV[role]

  // Flatten all navigation items to remove category header names (Overview, Organization, Operations, etc.)
  const allNavItems = sections.flatMap(section => section.items)

  return (
    <aside
      className={`${
        isCollapsed ? 'w-[72px]' : 'w-64'
      } h-screen flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out select-none shadow-2xl relative z-20`}
      style={{
        background: 'linear-gradient(180deg, #0d1b2a 0%, #09121d 100%)',
      }}
    >
      {/* FLOATING SIDEBAR TOGGLE BUTTON ON RIGHT EDGE */}
      <button
        onClick={handleToggle}
        className="absolute -right-3.5 top-20 w-7 h-7 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg border-2 border-slate-900 flex items-center justify-center transition-transform hover:scale-110 z-30 group"
        title={isCollapsed ? 'Open Sidebar' : 'Close Sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* SIDEBAR HEADER WITH METAFORGE BRANDING & OPEN/CLOSE TOGGLE */}
      <div className="h-16 flex items-center justify-between px-4 flex-shrink-0 border-b border-slate-800/60">
        {!isCollapsed ? (
          <MetaforgeLogo variant="light" size="md" />
        ) : (
          <div className="w-9 h-9 rounded-xl bg-indigo-600/30 flex items-center justify-center text-white text-xs font-extrabold mx-auto border border-indigo-500/30 shadow-inner">
            M
          </div>
        )}

        <button
          onClick={handleToggle}
          className="text-slate-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10"
          title={isCollapsed ? 'Open Sidebar' : 'Close Sidebar'}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="w-5 h-5" />
          ) : (
            <PanelLeftClose className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* NAVIGATION ITEMS LIST - CLEAN FLAT LIST WITHOUT SECTION HEADERS */}
      <nav className="flex-1 py-4 px-3 space-y-2 overflow-y-auto scrollbar-none">
        {allNavItems.map(item => {
          const Icon = ICONS[item.key] || LayoutDashboard
          const isActive = activeNav === item.key
          const displayLabel = NAV_LABELS[item.key] || item.label

          return (
            <div key={item.key} className="relative group">
              <button
                onClick={() => onNavSelect?.(item.key)}
                className={`w-full flex items-center gap-3.5 rounded-2xl transition-all duration-200 ${
                  isCollapsed ? 'justify-center py-3' : 'px-3.5 py-3'
                } ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/10 font-medium'
                }`}
              >
                {/* ICON CONTAINER */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800/80 text-slate-300 group-hover:bg-slate-700/80 group-hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {!isCollapsed && (
                  <span className="text-sm tracking-wide truncate text-left">
                    {displayLabel}
                  </span>
                )}
              </button>

              {/* TOOLTIP ON HOVER WHEN COLLAPSED */}
              {isCollapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-slate-700">
                  {displayLabel}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* BOTTOM ACTION BUTTONS (MY PROFILE & LOGOUT) */}
      <div className="p-3 border-t border-slate-800/60 space-y-2 flex-shrink-0">
        {/* My Profile Button */}
        <div className="relative group">
          <button
            onClick={() => onNavSelect?.('Settings')}
            className={`w-full flex items-center gap-3.5 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-all ${
              isCollapsed ? 'justify-center py-3' : 'px-3.5 py-3'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-slate-800/80 text-slate-300 flex items-center justify-center shrink-0 group-hover:bg-slate-700 group-hover:text-white">
              <User className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <span className="text-sm font-medium tracking-wide truncate">
                My Profile
              </span>
            )}
          </button>

          {isCollapsed && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-slate-700">
              My Profile
            </div>
          )}
        </div>

        {/* Logout Button */}
        {onLogout && (
          <div className="relative group">
            <button
              onClick={onLogout}
              className={`w-full flex items-center gap-3.5 rounded-2xl text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 transition-all ${
                isCollapsed ? 'justify-center py-3' : 'px-3.5 py-3'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-slate-800/80 text-slate-300 flex items-center justify-center shrink-0 group-hover:bg-rose-500/20 group-hover:text-rose-400">
                <LogOut className="w-5 h-5" />
              </div>
              {!isCollapsed && (
                <span className="text-sm font-medium tracking-wide truncate">
                  Logout
                </span>
              )}
            </button>

            {isCollapsed && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-slate-700">
                Logout
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}
