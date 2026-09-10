import { useState, useEffect, useMemo } from 'react'
import { Requirement } from '../../../types'
import { getForwardRequestByReq, ForwardRequest } from '../../../data/forwardRequestsStore'
import { checkDuplicateSubmission } from '../../../data/submissionsStore'
import { CLIENT_TRACKER_PRESETS } from './submitToLeadData'
import { useSubmitToLeadTracker } from './useSubmitToLeadTracker'

export function useSubmitToLeadState(
  selectedCandidates: any[] = [],
  requirement: Requirement | null = null,
  role = 'recruiter',
  onBack: () => void,
  onSubmitSuccess?: () => void
) {
  const currentReqId = requirement?.id || 'REQ-2026-08-12-001'

  const [forwardReq, setForwardReq] = useState<ForwardRequest | undefined>(() =>
    getForwardRequestByReq(currentReqId)
  )

  const [forwardLoopChecked, setForwardLoopChecked] = useState(false)
  const [clientName, setClientName] = useState(requirement?.client || 'METAFORGE (INTERNAL)')
  const [threadSubject, setThreadSubject] = useState(
    requirement
      ? `${requirement.id} — ${requirement.title} (${requirement.client})`
      : 'Candidate Profile Submission'
  )

  const [recruiterName, setRecruiterName] = useState('Harish Gadipally')
  const [recruiterEmail, setRecruiterEmail] = useState('harish.g@metaforgeit.com')
  const [toRecipients, setToRecipients] = useState([
    'Nikitha.S@Ltts.com',
    'Deepashree.Bc_ext@Ltts.com',
    'Bowya.Bowya_ext@Ltts.com',
  ])
  const [ccRecipients, setCcRecipients] = useState([
    'Ashwini.Kudi@Ltts.com',
    'Kallol.Chakraborty@Ltts.com',
  ])
  const [newToInput, setNewToInput] = useState('')
  const [newCcInput, setNewCcInput] = useState('')
  const [leadEmail, setLeadEmail] = useState('lead.review@metaforgeit.com')
  const [introduction, setIntroduction] = useState(
    'I hope you are doing well.\n\nPlease find below candidate profile submitted for review.'
  )
  const [confirmForwardChecked, setConfirmForwardChecked] = useState(true)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const trackerState = useSubmitToLeadTracker(selectedCandidates, requirement)

  useEffect(() => {
    const handleSync = () => setForwardReq(getForwardRequestByReq(currentReqId))
    handleSync()
    window.addEventListener('forward_requests_updated', handleSync)
    return () => window.removeEventListener('forward_requests_updated', handleSync)
  }, [currentReqId])

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  const handleClientChange = (newClient: string) => {
    setClientName(newClient)
    const preset = CLIENT_TRACKER_PRESETS[newClient]
    if (preset) {
      trackerState.setHeaderColor(preset.headerColor)
      trackerState.setColumnList(preset.columns)
      trackerState.setHiddenColumns(new Set())
      showToast(`Loaded tracker preset layout for ${newClient}!`)
    }
  }

  const duplicateCheckResults = useMemo(() => {
    if (!trackerState.trackerRows || trackerState.trackerRows.length === 0) return []
    return trackerState.trackerRows.map(row => {
      const candidateName = row['Candidate Name'] || row['Full Name of the candidate']
      const email = row['Email id'] || row['Mail ID']
      const phone = row['Contact Number'] || row['MOBILE NO']
      return {
        row,
        candidateName: candidateName || 'Selected Candidate',
        ...checkDuplicateSubmission(currentReqId, { email, phone, name: candidateName }),
      }
    })
  }, [trackerState.trackerRows, currentReqId])

  const hasDuplicateSubmission = duplicateCheckResults.some((r: any) => r.isDuplicate)
  const firstDuplicate = duplicateCheckResults.find((r: any) => r.isDuplicate)

  const handleSubmitFinal = () => {
    if (hasDuplicateSubmission && firstDuplicate) {
      showToast(`⚠️ Duplicate Submission: Candidate "${firstDuplicate.candidateName}" already submitted.`)
      return
    }
    showToast(`Sent for Lead Review Email (${leadEmail}) successfully!`)
    if (onSubmitSuccess) setTimeout(onSubmitSuccess, 1200)
    else setTimeout(onBack, 1200)
  }

  const visibleColumns = trackerState.columnList.filter(col => !trackerState.hiddenColumns.has(col))

  return {
    currentReqId,
    forwardReq,
    setForwardReq,
    forwardLoopChecked,
    setForwardLoopChecked,
    clientName,
    threadSubject,
    setThreadSubject,
    recruiterName,
    setRecruiterName,
    recruiterEmail,
    setRecruiterEmail,
    toRecipients,
    setToRecipients,
    ccRecipients,
    setCcRecipients,
    newToInput,
    setNewToInput,
    newCcInput,
    setNewCcInput,
    leadEmail,
    setLeadEmail,
    introduction,
    setIntroduction,
    confirmForwardChecked,
    setConfirmForwardChecked,
    toastMsg,
    columnList: trackerState.columnList,
    setColumnList: trackerState.setColumnList,
    hiddenColumns: trackerState.hiddenColumns,
    customColName: trackerState.customColName,
    setCustomColName: trackerState.setCustomColName,
    customColPosition: trackerState.customColPosition,
    setCustomColPosition: trackerState.setCustomColPosition,
    headerColor: trackerState.headerColor,
    setHeaderColor: trackerState.setHeaderColor,
    draggedColIndex: trackerState.draggedColIndex,
    dragOverColIndex: trackerState.dragOverColIndex,
    selectedColIndex: trackerState.selectedColIndex,
    trackerRows: trackerState.trackerRows,
    showToast,
    handleClientChange,
    handleDragStart: trackerState.handleDragStart,
    handleDragEnter: trackerState.handleDragEnter,
    handleDragOver: trackerState.handleDragOver,
    handleDrop: trackerState.handleDrop,
    handleDragEnd: trackerState.handleDragEnd,
    handleChipClick: trackerState.handleChipClick,
    moveColumnLeft: trackerState.moveColumnLeft,
    moveColumnRight: trackerState.moveColumnRight,
    toggleColumnVisibility: trackerState.toggleColumnVisibility,
    handleInsertCustomColumn: trackerState.handleInsertCustomColumn,
    handleUpdateCell: trackerState.handleUpdateCell,
    hasDuplicateSubmission,
    firstDuplicate,
    handleSubmitFinal,
    visibleColumns,
  }
}
