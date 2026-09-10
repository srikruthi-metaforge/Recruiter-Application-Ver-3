import React from 'react'

interface Props {
  formState: any
}

export const AddCandidateSingleFormFields: React.FC<Props> = ({ formState }) => {
  const {
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
  } = formState

  return (
    <div className="space-y-6">
      {/* Basic Candidate Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Basic Candidate Info</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Candidate ID</label>
            <input
              type="text"
              value={candidateId}
              onChange={e => setCandidateId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Submission Date</label>
            <input
              type="date"
              value={submissionDate}
              onChange={e => setSubmissionDate(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Candidate Name *</label>
            <input
              type="text"
              required
              value={candidateName}
              onChange={e => setCandidateName(e.target.value)}
              placeholder="e.g. Anish Malhotra"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-[#6B3BF6]/20 outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Current Company</label>
            <input
              type="text"
              value={currentCompany}
              onChange={e => setCurrentCompany(e.target.value)}
              placeholder="e.g. Wipro Limited"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Contact Number *</label>
            <input
              type="text"
              required
              value={contactNumber}
              onChange={e => setContactNumber(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="anish.m@devnet.io"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Skills & Experience */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Skills & Experience</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Highest Qualification</label>
            <input
              type="text"
              value={qualification}
              onChange={e => setQualification(e.target.value)}
              placeholder="B.E. Computer Science"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Total Experience</label>
            <input
              type="text"
              value={totalExperience}
              onChange={e => setTotalExperience(e.target.value)}
              placeholder="8 Years"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Relevant Experience</label>
            <input
              type="text"
              value={relevantExperience}
              onChange={e => setRelevantExperience(e.target.value)}
              placeholder="6.5 Years"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Current CTC</label>
            <input
              type="text"
              value={currentCtc}
              onChange={e => setCurrentCtc(e.target.value)}
              placeholder="18 LPA"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Expected CTC</label>
            <input
              type="text"
              value={expectedCtc}
              onChange={e => setExpectedCtc(e.target.value)}
              placeholder="25 LPA"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Notice Period</label>
            <input
              type="text"
              value={noticePeriod}
              onChange={e => setNoticePeriod(e.target.value)}
              placeholder="30 Days"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
