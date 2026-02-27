'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { WizardData } from '../cover-letter-wizard'

interface JobDetailsProps {
  data: WizardData
  updateData: (updates: Partial<WizardData>) => void
}

export default function JobDetails({
  data,
  updateData,
}: JobDetailsProps) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">Job Details</h2>
      <p className="mb-8 text-muted-foreground">
        Provide information about the position you're applying for.
      </p>

      <div className="space-y-6">
        <div>
          <Label htmlFor="companyName" className="mb-2 block font-semibold">
            Company Name *
          </Label>
          <Input
            id="companyName"
            placeholder="Acme Corporation"
            value={data.companyName}
            onChange={(e) => updateData({ companyName: e.target.value })}
            className="border-input"
          />
        </div>

        <div>
          <Label htmlFor="jobTitle" className="mb-2 block font-semibold">
            Job Title *
          </Label>
          <Input
            id="jobTitle"
            placeholder="Senior Software Engineer"
            value={data.jobTitle}
            onChange={(e) => updateData({ jobTitle: e.target.value })}
            className="border-input"
          />
        </div>

        <div>
          <Label htmlFor="hiringManager" className="mb-2 block font-semibold">
            Hiring Manager Name
          </Label>
          <Input
            id="hiringManager"
            placeholder="Jane Smith"
            value={data.hiringManager}
            onChange={(e) => updateData({ hiringManager: e.target.value })}
            className="border-input"
          />
        </div>

        <div>
          <Label htmlFor="jobDescription" className="mb-2 block font-semibold">
            Job Description Summary *
          </Label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the key requirements and responsibilities from the job posting"
            value={data.jobDescription}
            onChange={(e) => updateData({ jobDescription: e.target.value })}
            className="border-input"
            rows={5}
          />
        </div>

        <div>
          <Label htmlFor="motivation" className="mb-2 block font-semibold">
            Motivation for Applying
          </Label>
          <Textarea
            id="motivation"
            placeholder="Why are you interested in this position? What attracts you to this company?"
            value={data.motivation}
            onChange={(e) => updateData({ motivation: e.target.value })}
            className="border-input"
            rows={4}
          />
        </div>
      </div>
    </div>
  )
}
