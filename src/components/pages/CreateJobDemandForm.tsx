import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Requirement } from '../../types'
import { FormBasicAndClientInfo } from './createDemand/FormBasicAndClientInfo'
import { FormPositionAndSkillsInfo } from './createDemand/FormPositionAndSkillsInfo'
import { FormExtractJdSection } from './createDemand/FormExtractJdSection'
import { useCreateDemandForm } from './createDemand/useCreateDemandForm'

interface CreateJobDemandFormProps {
  onCancel: () => void
  onSubmit: (newReq: Requirement) => void
  userRole?: string
  mode?: 'create' | 'edit'
  initialData?: Requirement | null
}

export function CreateJobDemandForm({
  onCancel,
  onSubmit,
  mode = 'create',
  initialData = null,
}: CreateJobDemandFormProps) {
  const form = useCreateDemandForm({ mode, initialData, onSubmit })

  return (
    <div className="w-full space-y-6 pb-24 font-sans text-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 mb-3 px-3.5 py-1.5 border border-slate-200 rounded-xl bg-white shadow-2xs cursor-pointer transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {form.isEdit ? 'Edit Job Demand' : 'Create Job Demand'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {form.isEdit ? 'Update requirement details.' : 'Capture requirement details, client preferences, and assign recruiters.'}
          </p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit} className="space-y-6">
        <FormExtractJdSection
          jdText={form.jdText}
          setJdText={form.setJdText}
          isExtracting={form.isExtracting}
          handleExtractAndAutoFill={form.handleExtractAndAutoFill}
        />

        <FormBasicAndClientInfo
          reqId={form.reqId}
          setReqId={form.setReqId}
          demandDate={form.demandDate}
          setDemandDate={form.setDemandDate}
          internalPoc={form.internalPoc}
          setInternalPoc={form.setInternalPoc}
          requirementFrom={form.requirementFrom}
          setRequirementFrom={form.setRequirementFrom}
          customCompany={form.customCompany}
          setCustomCompany={form.setCustomCompany}
          clientLeadPoc={form.clientLeadPoc}
          setClientLeadPoc={form.setClientLeadPoc}
          clientPoc={form.clientPoc}
          setClientPoc={form.setClientPoc}
          jobTitle={form.jobTitle}
          setJobTitle={form.setJobTitle}
          jobStatus={form.jobStatus}
          setJobStatus={form.setJobStatus}
          closedDate={form.closedDate}
          setClosedDate={form.setClosedDate}
          typeOfDemand={form.typeOfDemand}
          setTypeOfDemand={form.setTypeOfDemand}
          priority={form.priority}
          setPriority={form.setPriority}
        />

        <FormPositionAndSkillsInfo
          openings={form.openings}
          setOpenings={form.setOpenings}
          relevantExp={form.relevantExp}
          setRelevantExp={form.setRelevantExp}
          employmentType={form.employmentType}
          setEmploymentType={form.setEmploymentType}
          workMode={form.workMode}
          setWorkMode={form.setWorkMode}
          budgetCurrency={form.budgetCurrency}
          setBudgetCurrency={form.setBudgetCurrency}
          yearlyBudget={form.yearlyBudget}
          setYearlyBudget={form.setYearlyBudget}
          locationInput={form.locationInput}
          setLocationInput={form.setLocationInput}
          locations={form.locations}
          setLocations={form.setLocations}
          handleAddLocation={form.handleAddLocation}
          overallExp={form.overallExp}
          setOverallExp={form.setOverallExp}
          noticePeriod={form.noticePeriod}
          setNoticePeriod={form.setNoticePeriod}
          mandatorySkillInput={form.mandatorySkillInput}
          setMandatorySkillInput={form.setMandatorySkillInput}
          mandatorySkills={form.mandatorySkills}
          setMandatorySkills={form.setMandatorySkills}
          handleAddMandatorySkill={form.handleAddMandatorySkill}
          skillInput={form.skillInput}
          setSkillInput={form.setSkillInput}
          skills={form.skills}
          setSkills={form.setSkills}
          handleAddSkill={form.handleAddSkill}
        />

        <div className="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md border border-slate-200/90 py-3.5 px-6 rounded-2xl shadow-xl flex items-center justify-end gap-3 mt-6">
          <button type="button" onClick={onCancel} className="px-5 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-gray-100 transition-all cursor-pointer">Cancel</button>
          <button type="submit" className="px-6 py-2.5 bg-[#5B4DFB] hover:bg-[#4A3CE4] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer">
            {form.isEdit ? 'Save changes' : 'Create Requirement'}
          </button>
        </div>
      </form>

      {form.toastMsg && (
        <div className="fixed bottom-16 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-gray-700 text-xs font-medium animate-in fade-in duration-200">
          {form.toastMsg}
        </div>
      )}
    </div>
  )
}

