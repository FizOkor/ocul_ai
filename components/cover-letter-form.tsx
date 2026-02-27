'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import CoverLetterPreview from './cover-letter-preview'
import { ChevronLeft } from 'lucide-react'

export interface FormData {
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
  length: 'brief' | 'standard' | 'verbose'
  useAI: boolean
}

interface CoverLetterFormProps {
  onBack: () => void
}

export default function CoverLetterForm({ onBack }: CoverLetterFormProps) {
  const [data, setData] = useState<FormData>({
    template: 'standard',
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
    length: 'standard',
    useAI: true,
  })
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const updateData = (updates: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  const handleGenerate = async () => {
    if (!data.fullName.trim() || !data.companyName.trim() || !data.jobTitle.trim()) {
      setError('Please fill in Full Name, Company Name, and Job Title')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        const errorMsg = result.error || 'Failed to generate cover letter'
        setError(errorMsg)
        throw new Error(errorMsg)
      }

      setGeneratedLetter(result.letter)
      setShowPreview(true)
    } catch (err) {
      console.error('[v0] Generation error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <button
            onClick={() => setShowPreview(false)}
            className="mb-8 flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
          >
            <ChevronLeft className="h-5 w-5" />
            Back to Form
          </button>
          <CoverLetterPreview letter={generatedLetter} data={data} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Home
        </button>

        <div className="mb-10">
          <h1 className="mb-3 text-4xl font-bold text-foreground">Create Your Cover Letter</h1>
          <p className="text-base text-muted-foreground">
            Fill in your information and we'll generate a professional cover letter tailored to the role.
          </p>
        </div>

        <Card className="border-0 shadow-sm bg-white p-8">
          <form className="space-y-8">
            {/* Template Selection */}
            <div>
              <Label className="mb-4 block text-sm font-semibold text-foreground">Cover Letter Template *</Label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {['standard', 'entry-level', 'career-switch', 'executive'].map((tmpl) => (
                  <button
                    key={tmpl}
                    type="button"
                    onClick={() => updateData({ template: tmpl as any })}
                    className={`rounded-2xl border-2 px-4 py-3 text-center text-sm font-medium transition-all ${
                      data.template === tmpl
                        ? 'border-primary bg-primary/15 text-primary'
                        : 'border-border text-foreground hover:border-primary/30 hover:bg-secondary/50'
                    }`}
                  >
                    {tmpl
                      .split('-')
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-border/50 pt-8">
              <h3 className="mb-6 text-base font-semibold text-foreground">Your Information</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="fullName" className="mb-2 block text-sm font-medium text-foreground">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={data.fullName}
                    onChange={(e) => updateData({ fullName: e.target.value })}
                    className="rounded-xl border-0 bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:bg-white focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="currentRole" className="mb-2 block text-sm font-medium text-foreground">
                    Current Role
                  </Label>
                  <Input
                    id="currentRole"
                    placeholder="e.g., Software Developer"
                    value={data.currentRole}
                    onChange={(e) => updateData({ currentRole: e.target.value })}
                    className="rounded-xl border-0 bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:bg-white focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="yearsOfExperience" className="mb-2 block text-sm font-medium text-foreground">
                    Years of Experience
                  </Label>
                  <Input
                    id="yearsOfExperience"
                    type="number"
                    placeholder="5"
                    value={data.yearsOfExperience}
                    onChange={(e) => updateData({ yearsOfExperience: e.target.value })}
                    className="rounded-xl border-0 bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:bg-white focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="hiringManager" className="mb-2 block text-sm font-medium text-foreground">
                    Hiring Manager Name (Optional)
                  </Label>
                  <Input
                    id="hiringManager"
                    placeholder="e.g., Jane Smith"
                    value={data.hiringManager}
                    onChange={(e) => updateData({ hiringManager: e.target.value })}
                    className="rounded-xl border-0 bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:bg-white focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="keySkills" className="mb-2 block text-sm font-medium text-foreground">
                  Key Skills
                </Label>
                <Textarea
                  id="keySkills"
                  placeholder="e.g., Project Management, Python, Team Leadership"
                  value={data.keySkills}
                  onChange={(e) => updateData({ keySkills: e.target.value })}
                  rows={3}
                  className="rounded-xl border-0 bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:bg-white focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mt-6">
                <Label htmlFor="achievements" className="mb-2 block text-sm font-medium text-foreground">
                  Key Achievements or Responsibilities
                </Label>
                <Textarea
                  id="achievements"
                  placeholder="Describe your major accomplishments"
                  value={data.achievements}
                  onChange={(e) => updateData({ achievements: e.target.value })}
                  rows={3}
                  className="rounded-xl border-0 bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:bg-white focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="border-t border-border/50 pt-8">
              <h3 className="mb-6 text-base font-semibold text-foreground">Job Information</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="companyName" className="mb-2 block text-sm font-medium text-foreground">
                    Company Name *
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="e.g., Tech Company Inc."
                    value={data.companyName}
                    onChange={(e) => updateData({ companyName: e.target.value })}
                    className="rounded-xl border-0 bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:bg-white focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="jobTitle" className="mb-2 block text-sm font-medium text-foreground">
                    Job Title *
                  </Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Senior Engineer"
                    value={data.jobTitle}
                    onChange={(e) => updateData({ jobTitle: e.target.value })}
                    className="rounded-xl border-0 bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:bg-white focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="jobDescription" className="mb-2 block text-sm font-medium text-foreground">
                  Job Description (Paste the job posting)
                </Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the job description here..."
                  value={data.jobDescription}
                  onChange={(e) => updateData({ jobDescription: e.target.value })}
                  rows={4}
                  className="rounded-xl border-0 bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:bg-white focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mt-6">
                <Label htmlFor="motivation" className="mb-2 block text-sm font-medium text-foreground">
                  Why are you interested in this role? (Optional)
                </Label>
                <Textarea
                  id="motivation"
                  placeholder="Share your motivation..."
                  value={data.motivation}
                  onChange={(e) => updateData({ motivation: e.target.value })}
                  rows={3}
                  className="rounded-xl border-0 bg-secondary/50 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:bg-white focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="border-t border-border/50 pt-8">
              <h3 className="mb-6 text-base font-semibold text-foreground">Preferences</h3>

              <div>
                <Label className="mb-4 block text-sm font-medium text-foreground">Tone *</Label>
                <div className="grid grid-cols-3 gap-3">
                  {['professional', 'confident', 'concise'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => updateData({ tone: t as any })}
                      className={`rounded-2xl px-4 py-2.5 text-center text-sm font-medium transition-all ${
                        data.tone === t
                          ? 'bg-primary text-white'
                          : 'bg-secondary/50 text-foreground hover:bg-secondary'
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Label className="mb-4 block text-sm font-medium text-foreground">Letter Length *</Label>
                <div className="grid grid-cols-3 gap-3">
                  {['brief', 'standard', 'verbose'].map((len) => (
                    <button
                      key={len}
                      type="button"
                      onClick={() => updateData({ length: len as any })}
                      className={`rounded-2xl px-4 py-2.5 text-center text-sm font-medium transition-all ${
                        data.length === len
                          ? 'bg-primary text-white'
                          : 'bg-secondary/50 text-foreground hover:bg-secondary'
                      }`}
                    >
                      {len === 'brief' && 'Brief'}
                      {len === 'standard' && 'Standard'}
                      {len === 'verbose' && 'Verbose'}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Brief: 150-200 words • Standard: 250-350 words • Verbose: 400-500 words
                </p>
              </div>

              <label className="mt-6 flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.useAI}
                  onChange={(e) => updateData({ useAI: e.target.checked })}
                  className="h-4 w-4 rounded-lg border-border accent-primary"
                />
                <span className="text-sm font-medium text-foreground">Use AI enhancement</span>
              </label>
            </div>

            {error && (
              <div className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-6">
              <Button
                onClick={onBack}
                type="button"
                className="rounded-xl border-2 border-foreground bg-white px-6 py-2.5 font-semibold text-foreground hover:bg-foreground hover:text-white transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={isLoading}
                className="flex-1 rounded-xl border-2 border-foreground bg-white px-6 py-2.5 font-semibold text-foreground hover:bg-foreground hover:text-white transition-colors disabled:opacity-60 disabled:hover:bg-white disabled:hover:text-foreground"
              >
                {isLoading ? 'Generating...' : '↑ Generate'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
