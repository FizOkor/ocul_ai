'use client'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { WizardData } from '../cover-letter-wizard'

interface ToneAndOptionsProps {
  data: WizardData
  updateData: (updates: Partial<WizardData>) => void
}

export default function ToneAndOptions({
  data,
  updateData,
}: ToneAndOptionsProps) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">Tone & Generation</h2>
      <p className="mb-8 text-muted-foreground">
        Select your preferred tone and enable AI assistance to enhance your letter.
      </p>

      <div className="space-y-8">
        {/* Tone selector */}
        <div>
          <Label className="mb-4 block text-lg font-semibold">Select Tone</Label>
          <RadioGroup value={data.tone} onValueChange={(value) => updateData({ tone: value as WizardData['tone'] })}>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="professional" id="professional" />
                <Label htmlFor="professional" className="cursor-pointer font-normal">
                  <span className="font-semibold">Professional</span>
                  <p className="text-sm text-muted-foreground">
                    Formal and polished approach suitable for most industries
                  </p>
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="confident" id="confident" />
                <Label htmlFor="confident" className="cursor-pointer font-normal">
                  <span className="font-semibold">Confident</span>
                  <p className="text-sm text-muted-foreground">
                    Assertive tone that highlights your strengths and achievements
                  </p>
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="concise" id="concise" />
                <Label htmlFor="concise" className="cursor-pointer font-normal">
                  <span className="font-semibold">Concise</span>
                  <p className="text-sm text-muted-foreground">
                    Brief and direct, getting straight to the point
                  </p>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* AI toggle */}
        <div className="rounded-lg bg-secondary/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-lg font-semibold">Use AI-Assisted Writing</Label>
              <p className="mt-1 text-sm text-muted-foreground">
                AI will help enhance, refine, and polish your cover letter for maximum impact
              </p>
            </div>
            <Switch
              checked={data.useAI}
              onCheckedChange={(checked) => updateData({ useAI: checked })}
              className="ml-4"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Preview Summary</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold text-foreground">Template:</span>
              <span className="ml-2 text-muted-foreground">
                {data.template
                  ? data.template.replace(/-/g, ' ').charAt(0).toUpperCase() +
                    data.template.slice(1).replace(/-/g, ' ')
                  : 'Not selected'}
              </span>
            </div>
            <div>
              <span className="font-semibold text-foreground">Applicant:</span>
              <span className="ml-2 text-muted-foreground">{data.fullName || 'Not provided'}</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">Position:</span>
              <span className="ml-2 text-muted-foreground">
                {data.jobTitle || 'Not provided'} at {data.companyName || 'Not provided'}
              </span>
            </div>
            <div>
              <span className="font-semibold text-foreground">Tone:</span>
              <span className="ml-2 text-muted-foreground">
                {data.tone.charAt(0).toUpperCase() + data.tone.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
