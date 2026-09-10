import React, { useState, useMemo } from 'react'
import { Role, ActivityLogItem } from '../../types'
import {
  RecruiterLoginRecord,
  INITIAL_LOGIN_RECORDS,
  MOCK_ACTIVITY_LOGS,
} from './activityLogs/activityLogsData'
import { ActivityLogsHeader } from './activityLogs/ActivityLogsHeader'
import { RecruiterLoginsTable } from './activityLogs/RecruiterLoginsTable'
import { SystemActivityLogsTable } from './activityLogs/SystemActivityLogsTable'
import { RecruiterLoginHistoryModal } from './activityLogs/RecruiterLoginHistoryModal'

export type { ActivityLogItem, RecruiterLoginRecord }

interface ActivityLogsPageProps {
  role?: Role
  logs?: ActivityLogItem[]
}

export function ActivityLogsPage({ role = 'superadmin', logs = [] }: ActivityLogsPageProps) {
  const [activeTab, setActiveTab] = useState<'login_reports' | 'audit_trail'>('login_reports')
  const [loginRecordsList] = useState<RecruiterLoginRecord[]>(INITIAL_LOGIN_RECORDS)

  const [logsList] = useState<ActivityLogItem[]>(() => {
    if (logs && logs.length > 0) return logs
    return MOCK_ACTIVITY_LOGS
  })

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const [loginSearch, setLoginSearch] = useState('')
  const [selectedRecruiterFilter, setSelectedRecruiterFilter] = useState('All Users')
  const [loginStatusFilter, setLoginStatusFilter] = useState('All Statuses')

  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')

  const [selectedLoginRecord, setSelectedLoginRecord] = useState<RecruiterLoginRecord | null>(null)
  const [selectedLog, setSelectedLog] = useState<ActivityLogItem | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const handleRefreshData = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      const now = new Date().toLocaleTimeString()
      setLastRefreshedAt(now)
      showToast(`Logs refreshed at ${now}`)
    }, 800)
  }

  const filteredLoginRecords = useMemo(() => {
    return loginRecordsList.filter(rec => {
      if (loginSearch.trim()) {
        const q = loginSearch.toLowerCase()
        if (!rec.userName.toLowerCase().includes(q) && !rec.userEmail.toLowerCase().includes(q) && !rec.ipAddress.includes(q)) return false
      }
      if (selectedRecruiterFilter !== 'All Users' && rec.userName !== selectedRecruiterFilter) return false
      if (loginStatusFilter !== 'All Statuses' && rec.status !== loginStatusFilter) return false
      return true
    })
  }, [loginRecordsList, loginSearch, selectedRecruiterFilter, loginStatusFilter])

  const filteredLogsList = useMemo(() => {
    return logsList.filter(item => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchAction = item.action.toLowerCase().includes(q)
        const matchDetails = (item.details || '').toLowerCase().includes(q)
        if (!matchAction && !matchDetails) return false
      }
      const itemRole = item.userRole || item.role
      if (roleFilter !== 'All Roles' && itemRole !== roleFilter) return false
      if (categoryFilter !== 'All Categories' && item.category !== categoryFilter) return false
      return true
    })
  }, [logsList, searchQuery, roleFilter, categoryFilter])

  const uniqueRecruiterNames = useMemo(() => {
    return Array.from(new Set(loginRecordsList.map(r => r.userName)))
  }, [loginRecordsList])

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-150">
      <ActivityLogsHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isRefreshing={isRefreshing}
        handleRefreshData={handleRefreshData}
        lastRefreshedAt={lastRefreshedAt}
      />

      {activeTab === 'login_reports' && (
        <RecruiterLoginsTable
          loginRecords={filteredLoginRecords}
          loginSearch={loginSearch}
          setLoginSearch={setLoginSearch}
          selectedRecruiterFilter={selectedRecruiterFilter}
          setSelectedRecruiterFilter={setSelectedRecruiterFilter}
          loginStatusFilter={loginStatusFilter}
          setLoginStatusFilter={setLoginStatusFilter}
          uniqueRecruiterNames={uniqueRecruiterNames}
          onInspectSession={setSelectedLoginRecord}
        />
      )}

      {activeTab === 'audit_trail' && (
        <SystemActivityLogsTable
          logsList={filteredLogsList}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          onInspectLog={setSelectedLog}
        />
      )}

      <RecruiterLoginHistoryModal
        rec={selectedLoginRecord}
        onClose={() => setSelectedLoginRecord(null)}
      />

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
