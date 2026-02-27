'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { WizardData } from '../cover-letter-wizard'

interface ApplicantDetailsProps {
  data: WizardData
  updateData: (updates: Partial<WizardData>) => void
}

export default function ApplicantDetails({
  data,
  updateData,
}: ApplicantDetailsProps) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">Your Details</h2>
      <p className="mb-8 text-muted-foreground">
        Tell us about yourself. This information will be used to personalize your cover letter.
      </p>

      <div className="space-y-6">
        <div>
          <Label htmlFor="fullName" className="mb-2 block font-semibold">
            Full Name *
          </Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
            className="border-input"
          />
        </div>

        <div>
          <Label htmlFor="currentRole" className="mb-2 block font-semibold">
            Current Role or Field
          </Label>
          <Input
            id="currentRole"
            placeholder="e.g., Software Developer, Marketing Manager"
            value={data.currentRole}
            onChange={(e) => updateData({ currentRole: e.target.value })}
            className="border-input"
          />
        </div>

        <div>
          <Label htmlFor="yearsOfExperience" className="mb-2 block font-semibold">
            Years of Experience
          </Label>
          <Input
            id="yearsOfExperience"
            placeholder="5"
            value={data.yearsOfExperience}
            onChange={(e) => updateData({ yearsOfExperience: e.target.value })}
            className="border-input"
          />
        </div>

        <div>
          <Label htmlFor="keySkills" className="mb-2 block font-semibold">
            Key Skills
          </Label>
          <Textarea
            id="keySkills"
            placeholder="e.g., Project Management, Python, Team Leadership, Data Analysis"
            value={data.keySkills}
            onChange={(e) => updateData({ keySkills: e.target.value })}
            className="border-input"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="achievements" className="mb-2 block font-semibold">
            Key Achievements or Responsibilities
          </Label>
          <Textarea
            id="achievements"
            placeholder="Describe your major accomplishments and responsibilities in your current or previous roles"
            value={data.achievements}
            onChange={(e) => updateData({ achievements: e.target.value })}
            className="border-input"
            rows={4}
          />
        </div>
      </div>
    </div>
  )
}
