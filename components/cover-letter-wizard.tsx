'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import TemplateSelection from './wizard-steps/template-selection'
import ApplicantDetails from './wizard-steps/applicant-details'
import JobDetails from './wizard-steps/job-details'
import ToneAndOptions from './wizard-steps/tone-and-options'
import CoverLetterPreview from './cover-letter-preview'
import { ChevronLeft } from 'lucide-react'

export interface WizardData {
  template: 'standard' | 'entry-level' | 'career-switch' | 'executive' | null
  fullName: string
  currentRole: string
  yearsOfExperience: string
  keySkills: string
  achievements: string
  companyName: string
  jobTitle: string
  hiringManager: string
  jobDescription: string
  motivation: string
  tone: 'professional' | 'confident' | 'concise'
  useAI: boolean
}

interface CoverLetterWizardProps {
  onBack: () => void
}

export default function CoverLetterWizard({ onBack }: CoverLetterWizardProps) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<WizardData>({
    template: null,
    fullName: '',
    currentRole: '',
    yearsOfExperience: '',
    keySkills: '',
    achievements: '',
    companyName: '',
    jobTitle: '',
    hiringManager: '',
    jobDescription: '',
    motivation: '',
    tone: 'professional',
    useAI: true,
  })
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const updateData = (updates: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  const handleGenerate = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to generate cover letter')
      }

      const result = await response.json()
      setGeneratedLetter(result.letter)
      setStep(5)
    } catch (err) {
      setError('Failed to generate cover letter. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.template !== null
      case 2:
        return data.fullName.trim() !== '' && data.companyName.trim() !== '' && data.jobTitle.trim() !== ''
      case 3:
        return data.jobDescription.trim() !== ''
      case 4:
        return true
      default:
        return false
    }
  }

  const steps = ['Template', 'Your Details', 'Job Details', 'Tone & Generation', 'Preview']

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Header with back button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Home
        </button>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((stepName, index) => (
              <div
                key={index}
                className={`flex flex-1 items-center ${
                  index < steps.length - 1 ? 'after:content-[""] after:flex-1 after:mx-2 after:h-1 after:rounded' : ''
                } ${
                  index < steps.length - 1
                    ? step > index
                      ? 'after:bg-primary'
                      : 'after:bg-muted'
                    : ''
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-colors ${
                    step >= index + 1
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs">
            {steps.map((name, index) => (
              <span
                key={index}
                className={
                  step >= index + 1 ? 'font-semibold text-foreground' : 'text-muted-foreground'
                }
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Step content */}
        <Card className="mb-8 p-8">
          {step === 1 && <TemplateSelection data={data} updateData={updateData} />}
          {step === 2 && <ApplicantDetails data={data} updateData={updateData} />}
          {step === 3 && <JobDetails data={data} updateData={updateData} />}
          {step === 4 && <ToneAndOptions data={data} updateData={updateData} />}
          {step === 5 && (
            <CoverLetterPreview letter={generatedLetter} data={data} />
          )}

          {error && (
            <div className="mt-6 rounded-lg bg-destructive/10 p-4 text-destructive">
              {error}
            </div>
          )}
        </Card>

        {/* Navigation buttons */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Previous
          </Button>

          {step < 4 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
            >
              Next
            </Button>
          ) : step === 4 ? (
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !canProceed()}
            >
              {isLoading ? 'Generating...' : 'Generate Cover Letter'}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
