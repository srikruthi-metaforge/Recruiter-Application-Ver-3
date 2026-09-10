import { useState } from 'react'

export function useCandidateFormState(selectedReqId: string | null, defaultReqId: string) {
  const [candidateId, setCandidateId] = useState('CAND-2026-08-07-001')
  const [submissionDate, setSubmissionDate] = useState('2026-08-07')
  const [candidateName, setCandidateName] = useState('')
  const [currentCompany, setCurrentCompany] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [email, setEmail] = useState('')
  const [linkedInUrl, setLinkedInUrl] = useState('')
  const [qualification, setQualification] = useState('')

  const [skills, setSkills] = useState('')
  const [technologies, setTechnologies] = useState('')

  const [totalExperience, setTotalExperience] = useState('')
  const [relevantExperience, setRelevantExperience] = useState('')
  const [currentCtc, setCurrentCtc] = useState('')
  const [expectedCtc, setExpectedCtc] = useState('')
  const [noticePeriod, setNoticePeriod] = useState('')

  const [currentLocation, setCurrentLocation] = useState('')
  const [preferredLocation, setPreferredLocation] = useState('')
  const [interviewAvailability, setInterviewAvailability] = useState('')
  const [offerInHand, setOfferInHand] = useState<'Select' | 'Yes' | 'No' | 'In Pipeline'>('Select')
  const [reasonForChange, setReasonForChange] = useState('')
  const [notes, setNotes] = useState('')

  const [targetReqId, setTargetReqId] = useState<string>(selectedReqId || defaultReqId)

  const resetFormFields = () => {
    setCandidateName('')
    setCurrentCompany('')
    setContactNumber('')
    setEmail('')
    setLinkedInUrl('')
    setQualification('')
    setSkills('')
    setTechnologies('')
    setTotalExperience('')
    setRelevantExperience('')
    setCurrentCtc('')
    setExpectedCtc('')
    setNoticePeriod('')
    setCurrentLocation('')
    setPreferredLocation('')
    setInterviewAvailability('')
    setOfferInHand('Select')
    setReasonForChange('')
    setNotes('')
  }

  const fillMockParsedData = () => {
    setCandidateName('Priya Nair')
    setCurrentCompany('Contoso')
    setContactNumber('+91 98765 43210')
    setEmail('priya.nair@contoso.com')
    setLinkedInUrl('https://www.linkedin.com/in/priyanair-tech')
    setQualification('B.Tech CS')
    setSkills('Communication, Problem solving, Stakeholder management')
    setTechnologies('React, TypeScript, Node.js, SQL, Tailwind CSS')
    setTotalExperience('4.5 Years')
    setRelevantExperience('3.8 Years')
    setCurrentCtc('12 LPA')
    setExpectedCtc('16 LPA')
    setNoticePeriod('30 days')
    setCurrentLocation('Bengaluru')
    setPreferredLocation('Bengaluru / Remote')
    setInterviewAvailability('Available after 5 PM weekdays')
    setOfferInHand('No')
    setReasonForChange('Better role / Growth')
    setNotes('Parsed via Metaforge AI. Strong frontend architecture expertise.')
  }

  return {
    candidateId,
    setCandidateId,
    submissionDate,
    setSubmissionDate,
    candidateName,
    setCandidateName,
    currentCompany,
    setCurrentCompany,
    contactNumber,
    setContactNumber,
    email,
    setEmail,
    linkedInUrl,
    setLinkedInUrl,
    qualification,
    setQualification,
    skills,
    setSkills,
    technologies,
    setTechnologies,
    totalExperience,
    setTotalExperience,
    relevantExperience,
    setRelevantExperience,
    currentCtc,
    setCurrentCtc,
    expectedCtc,
    setExpectedCtc,
    noticePeriod,
    setNoticePeriod,
    currentLocation,
    setCurrentLocation,
    preferredLocation,
    setPreferredLocation,
    interviewAvailability,
    setInterviewAvailability,
    offerInHand,
    setOfferInHand,
    reasonForChange,
    setReasonForChange,
    notes,
    setNotes,
    targetReqId,
    setTargetReqId,
    resetFormFields,
    fillMockParsedData,
  }
}
