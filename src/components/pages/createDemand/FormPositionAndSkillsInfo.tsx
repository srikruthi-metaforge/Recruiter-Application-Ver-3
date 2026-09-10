import React from 'react'
import { FormSkillsCardSection } from './FormSkillsCardSection'
import { FormPositionCard } from './FormPositionCard'

interface FormPositionAndSkillsInfoProps {
  openings: number
  setOpenings: (v: number) => void
  relevantExp: string
  setRelevantExp: (v: string) => void
  employmentType: string
  setEmploymentType: (v: string) => void
  workMode: string
  setWorkMode: (v: string) => void
  budgetCurrency: string
  setBudgetCurrency: (v: string) => void
  yearlyBudget: string
  setYearlyBudget: (v: string) => void
  locationInput: string
  setLocationInput: (v: string) => void
  locations: string[]
  setLocations: (v: string[]) => void
  handleAddLocation: () => void
  overallExp: string
  setOverallExp: (v: string) => void
  noticePeriod: string
  setNoticePeriod: (v: string) => void
  mandatorySkillInput: string
  setMandatorySkillInput: (v: string) => void
  mandatorySkills: string[]
  setMandatorySkills: (v: string[]) => void
  handleAddMandatorySkill: () => void
  skillInput: string
  setSkillInput: (v: string) => void
  skills: string[]
  setSkills: (v: string[]) => void
  handleAddSkill: () => void
}

export function FormPositionAndSkillsInfo({
  openings,
  setOpenings,
  relevantExp,
  setRelevantExp,
  employmentType,
  setEmploymentType,
  workMode,
  setWorkMode,
  budgetCurrency,
  setBudgetCurrency,
  yearlyBudget,
  setYearlyBudget,
  locationInput,
  setLocationInput,
  locations,
  setLocations,
  handleAddLocation,
  overallExp,
  setOverallExp,
  noticePeriod,
  setNoticePeriod,
  mandatorySkillInput,
  setMandatorySkillInput,
  mandatorySkills,
  setMandatorySkills,
  handleAddMandatorySkill,
  skillInput,
  setSkillInput,
  skills,
  setSkills,
  handleAddSkill,
}: FormPositionAndSkillsInfoProps) {
  return (
    <>
      <FormPositionCard
        openings={openings}
        setOpenings={setOpenings}
        relevantExp={relevantExp}
        setRelevantExp={setRelevantExp}
        employmentType={employmentType}
        setEmploymentType={setEmploymentType}
        workMode={workMode}
        setWorkMode={setWorkMode}
        budgetCurrency={budgetCurrency}
        setBudgetCurrency={setBudgetCurrency}
        yearlyBudget={yearlyBudget}
        setYearlyBudget={setYearlyBudget}
        locationInput={locationInput}
        setLocationInput={setLocationInput}
        locations={locations}
        setLocations={setLocations}
        handleAddLocation={handleAddLocation}
        overallExp={overallExp}
        setOverallExp={setOverallExp}
        noticePeriod={noticePeriod}
        setNoticePeriod={setNoticePeriod}
      />

      <FormSkillsCardSection
        mandatorySkillInput={mandatorySkillInput}
        setMandatorySkillInput={setMandatorySkillInput}
        mandatorySkills={mandatorySkills}
        setMandatorySkills={setMandatorySkills}
        handleAddMandatorySkill={handleAddMandatorySkill}
        skillInput={skillInput}
        setSkillInput={setSkillInput}
        skills={skills}
        setSkills={setSkills}
        handleAddSkill={handleAddSkill}
      />
    </>
  )
}
