import { useState, useMemo } from 'react'
import { Candidate, Requirement } from '../../../types'
import { getSavedDrafts, saveDraftItem, removeSavedDraft, SavedDraftItem } from '../../../data/savedDraftsStore'
import { checkDuplicateSubmission } from '../../../data/submissionsStore'
import { useCandidateFormState } from './useCandidateFormState'

interface Params {
  requirements: Requirement[]
  selectedReqId: string | null
  onAddCandidate?: (candidate: Candidate) => void
}

export function useAddCandidateForm({ requirements, selectedReqId, onAddCandidate }: Params) {
  const [importMode, setImportMode] = useState<'single' | 'bulk' | 'drafts'>('single')
  const [isParsing, setIsParsing] = useState(false)
  const [parsedFileName, setParsedFileName] = useState<string | null>(null)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [showSaveDraftToast, setShowSaveDraftToast] = useState(false)
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [draftsList, setDraftsList] = useState<SavedDraftItem[]>(() => getSavedDrafts())

  const formState = useCandidateFormState(selectedReqId, requirements[0]?.id ?? 'REQ-001')

  const dupCheckResult = useMemo(() => {
    if (!formState.targetReqId || (!formState.candidateName && !formState.email && !formState.contactNumber)) {
      return { isDuplicate: false }
    }
    return checkDuplicateSubmission(formState.targetReqId, {
      email: formState.email,
      phone: formState.contactNumber,
      candidateId: formState.candidateId,
      name: formState.candidateName,
    })
  }, [formState.targetReqId, formState.candidateName, formState.email, formState.contactNumber, formState.candidateId])

  const handleParseResume = () => {
    setIsParsing(true)
    setTimeout(() => {
      setIsParsing(false)
      setParsedFileName('Priya_Nair_Resume.pdf')
      formState.fillMockParsedData()
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (dupCheckResult.isDuplicate) {
      setToastMsg(`⚠️ Duplicate Submission: ${formState.candidateName || 'Candidate'} has already been submitted for this requirement.`)
      setTimeout(() => setToastMsg(null), 3500)
      return
    }

    const newCandidate: Candidate = {
      id: formState.candidateId,
      submissionDate: formState.submissionDate,
      name: formState.candidateName || 'Unnamed Candidate',
      company: formState.currentCompany,
      phone: formState.contactNumber,
      email: formState.email,
      linkedIn: formState.linkedInUrl,
      qualification: formState.qualification,
      skills: formState.skills,
      technologies: formState.technologies,
      totalExperience: formState.totalExperience,
      relevantExperience: formState.relevantExperience,
      currentCtc: formState.currentCtc,
      expectedCtc: formState.expectedCtc,
      noticePeriod: formState.noticePeriod,
      currentLocation: formState.currentLocation,
      preferredLocation: formState.preferredLocation,
      interviewAvailability: formState.interviewAvailability,
      offerInHand: formState.offerInHand,
      reasonForChange: formState.reasonForChange,
      notes: formState.notes,
      resumeName: parsedFileName || undefined,
      matchScore: '95%',
      status: 'Parsed',
    }

    if (onAddCandidate) onAddCandidate(newCandidate)

    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 3000)

    const match = formState.candidateId.match(/(\d+)$/)
    if (match) {
      const nextNum = (parseInt(match[1], 10) + 1).toString().padStart(3, '0')
      formState.setCandidateId(`CAND-2026-08-07-${nextNum}`)
    }

    formState.resetFormFields()
    setParsedFileName(null)
  }

  const handleSaveDraft = () => {
    const draft = {
      type: 'candidate' as const,
      title: formState.candidateName || 'Untitled Candidate Profile',
      subtitle: `${formState.currentCompany || 'N/A'} • ${formState.totalExperience || '0'} Yrs`,
      createdBy: 'Recruiter',
      candidateName: formState.candidateName || 'Untitled Candidate Profile',
      currentCompany: formState.currentCompany,
      contactNumber: formState.contactNumber,
      email: formState.email,
      skills: formState.skills,
      technologies: formState.technologies,
      experience: formState.totalExperience,
      parsedFileName: parsedFileName || undefined,
      savedAt: 'Just now',
      data: {},
    }
    saveDraftItem(draft)
    setDraftsList(getSavedDrafts())
    setShowSaveDraftToast(true)
    setTimeout(() => setShowSaveDraftToast(false), 3000)
  }

  const handleLoadDraft = (item: SavedDraftItem) => {
    formState.setCandidateName(item.candidateName || item.title || '')
    if (item.currentCompany) formState.setCurrentCompany(item.currentCompany)
    if (item.contactNumber) formState.setContactNumber(item.contactNumber)
    if (item.email) formState.setEmail(item.email)
    if (item.skills) formState.setSkills(item.skills)
    if (item.technologies) formState.setTechnologies(item.technologies)
    if (item.experience) formState.setTotalExperience(item.experience)
    if (item.parsedFileName) setParsedFileName(item.parsedFileName)
    setImportMode('single')
  }

  const handleRemoveDraft = (id: string) => {
    const updated = removeSavedDraft(id)
    setDraftsList(updated)
  }

  return {
    importMode,
    setImportMode,
    isParsing,
    parsedFileName,
    showSuccessToast,
    showSaveDraftToast,
    toastMsg,
    draftsList,
    ...formState,
    dupCheckResult,
    handleParseResume,
    handleSubmit,
    handleSaveDraft,
    handleLoadDraft,
    handleRemoveDraft,
  }
}
