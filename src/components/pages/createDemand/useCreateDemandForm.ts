import { useState } from 'react'
import { Requirement } from '../../../types'

interface Params {
  mode: 'create' | 'edit'
  initialData: Requirement | null
  onSubmit: (newReq: Requirement) => void
}

export function useCreateDemandForm({ mode, initialData, onSubmit }: Params) {
  const isEdit = mode === 'edit' || !!initialData

  const [reqId, setReqId] = useState(initialData?.id || `REQ-${new Date().toISOString().split('T')[0]}-001`)
  const [demandDate, setDemandDate] = useState(initialData?.dueDate || new Date().toISOString().split('T')[0])
  const [internalPoc, setInternalPoc] = useState(initialData?.assignedLead || 'offshore demands')
  const [requirementFrom, setRequirementFrom] = useState(initialData?.client || 'Other company / source...')
  const [customCompany, setCustomCompany] = useState(initialData?.client || 'LTTS')
  const [clientLeadPoc, setClientLeadPoc] = useState(initialData?.clientEmail || 'Kallol.Chakraborty@Ltts.com')
  const [clientPoc, setClientPoc] = useState(initialData?.clientEmail || 'Kallol.Chakraborty@Ltts.com')
  const [jobTitle, setJobTitle] = useState(initialData?.title || 'Senior Engineer (Catia V6) for')
  const [jobStatus, setJobStatus] = useState(initialData?.status === 'Closed' ? 'Closed' : 'Open')
  const [closedDate, setClosedDate] = useState('')
  const [typeOfDemand, setTypeOfDemand] = useState(initialData?.openings && initialData.openings > 1 ? 'Multiple' : 'Single')
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>(initialData?.priority || 'Low')

  const [openings, setOpenings] = useState<number>(initialData?.openings || 1)
  const [relevantExp, setRelevantExp] = useState('Select relevant experience')
  const [employmentType, setEmploymentType] = useState('Full-time')
  const [workMode, setWorkMode] = useState('On-site')
  const [budgetCurrency, setBudgetCurrency] = useState('INR (₹)')
  const [yearlyBudget, setYearlyBudget] = useState(initialData?.budget ? initialData.budget.replace(/[^0-9]/g, '') : '1400000')
  const [locationInput, setLocationInput] = useState('')
  const [locations, setLocations] = useState<string[]>(initialData?.location ? initialData.location.split(', ') : ['Pune'])
  const [overallExp, setOverallExp] = useState('7-12 years')
  const [noticePeriod, setNoticePeriod] = useState('Immediate')

  const [mandatorySkillInput, setMandatorySkillInput] = useState('')
  const [mandatorySkills, setMandatorySkills] = useState<string[]>(
    initialData?.skills || ['Catia V6', 'Door Panel design experience', 'packaging', 'gaps']
  )

  const [skillInput, setSkillInput] = useState('')
  const [skills, setSkills] = useState<string[]>(['Master section creation', 'Door mechanisms', 'Hinges & handles'])

  const [jdText, setJdText] = useState('')
  const [isExtracting, setIsExtracting] = useState(false)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  const handleAddLocation = () => {
    if (locationInput.trim()) {
      setLocations([...locations, locationInput.trim()])
      setLocationInput('')
    }
  }

  const handleAddMandatorySkill = () => {
    if (mandatorySkillInput.trim()) {
      const newSkills = mandatorySkillInput.split(',').map(s => s.trim()).filter(Boolean)
      setMandatorySkills([...mandatorySkills, ...newSkills])
      setMandatorySkillInput('')
    }
  }

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      const newSkills = skillInput.split(',').map(s => s.trim()).filter(Boolean)
      setSkills([...skills, ...newSkills])
      setSkillInput('')
    }
  }

  const handleExtractAndAutoFill = () => {
    if (!jdText.trim()) {
      showToast('Please paste JD text or upload a document to extract.')
      return
    }
    setIsExtracting(true)
    setTimeout(() => {
      setIsExtracting(false)
      if (!jobTitle) setJobTitle('Senior Data Engineer (AI/ML)')
      if (mandatorySkills.length === 0) setMandatorySkills(['Python', 'PySpark', 'SQL', 'Azure'])
      showToast('Extracted & auto-filled details from JD text successfully!')
    }, 1200)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!jobTitle.trim()) {
      showToast('Please specify a Job Title.')
      return
    }
    const finalClient = requirementFrom === 'Other' ? customCompany || 'Other' : requirementFrom
    const updatedReq: Requirement = {
      ...(initialData || {} as any),
      id: reqId || `REQ-${Date.now().toString().slice(-6)}`,
      client: finalClient,
      title: jobTitle,
      priority: priority,
      status: jobStatus === 'Closed' ? 'Closed' : (initialData?.status || 'Active'),
      assignmentStatus: initialData?.assignmentStatus || (jobStatus === 'Assigned' ? 'Assigned' : 'Unassigned'),
      owner: initialData?.owner || (jobStatus === 'Assigned' ? 'Harish Gadipally' : 'Unassigned'),
      submissions: initialData?.submissions || 7,
      interviews: initialData?.interviews || 0,
      placed: initialData?.placed || 0,
      rejections: initialData?.rejections || 0,
      clientEmail: clientLeadPoc || `${finalClient.toLowerCase()}@client.com`,
      clientPhone: '+91 98765 43210',
      location: locations.join(', ') || locationInput || 'Remote',
      openings: openings || 1,
      dueDate: demandDate || new Date().toISOString().split('T')[0],
      emailArrivedTime: initialData?.emailArrivedTime || `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}, 05:30 AM`,
      budget: yearlyBudget ? `₹${yearlyBudget}` : '₹1,400,000',
      skills: mandatorySkills,
    }
    onSubmit(updatedReq)
  }

  return {
    isEdit,
    reqId, setReqId,
    demandDate, setDemandDate,
    internalPoc, setInternalPoc,
    requirementFrom, setRequirementFrom,
    customCompany, setCustomCompany,
    clientLeadPoc, setClientLeadPoc,
    clientPoc, setClientPoc,
    jobTitle, setJobTitle,
    jobStatus, setJobStatus,
    closedDate, setClosedDate,
    typeOfDemand, setTypeOfDemand,
    priority, setPriority,
    openings, setOpenings,
    relevantExp, setRelevantExp,
    employmentType, setEmploymentType,
    workMode, setWorkMode,
    budgetCurrency, setBudgetCurrency,
    yearlyBudget, setYearlyBudget,
    locationInput, setLocationInput,
    locations, setLocations,
    overallExp, setOverallExp,
    noticePeriod, setNoticePeriod,
    mandatorySkillInput, setMandatorySkillInput,
    mandatorySkills, setMandatorySkills,
    skillInput, setSkillInput,
    skills, setSkills,
    jdText, setJdText,
    isExtracting,
    toastMsg,
    handleAddLocation,
    handleAddMandatorySkill,
    handleAddSkill,
    handleExtractAndAutoFill,
    handleSubmit,
  }
}
