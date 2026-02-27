'use client'

import { Card } from '@/components/ui/card'
import { WizardData } from '../cover-letter-wizard'

const templates = [
  {
    id: 'standard',
    name: 'Standard Professional',
    description: 'Classic and timeless approach suitable for most industries',
    tone: 'Professional',
    length: '250-300 words',
  },
  {
    id: 'entry-level',
    name: 'Entry Level',
    description: 'Perfect for recent graduates or career starters with limited experience',
    tone: 'Enthusiastic',
    length: '200-250 words',
  },
  {
    id: 'career-switch',
    name: 'Career Switch',
    description: 'Designed for professionals changing industries or careers',
    tone: 'Confident',
    length: '300-350 words',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'For senior-level positions and leadership roles',
    tone: 'Strategic',
    length: '300-350 words',
  },
]

interface TemplateSelectionProps {
  data: WizardData
  updateData: (updates: Partial<WizardData>) => void
}

export default function TemplateSelection({
  data,
  updateData,
}: TemplateSelectionProps) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">Select Your Template</h2>
      <p className="mb-8 text-muted-foreground">
        Choose a template that best fits your career stage and the position you're applying for.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <Card
            key={template.id}
            onClick={() =>
              updateData({ template: template.id as WizardData['template'] })
            }
            className={`cursor-pointer p-6 transition-all hover:border-primary hover:shadow-md ${
              data.template === template.id
                ? 'border-primary border-2 bg-primary/5'
                : 'border border-border'
            }`}
          >
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              {template.name}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {template.description}
            </p>
            <div className="flex gap-4 text-xs">
              <div>
                <span className="font-semibold text-foreground">Tone:</span>
                <p className="text-muted-foreground">{template.tone}</p>
              </div>
              <div>
                <span className="font-semibold text-foreground">Length:</span>
                <p className="text-muted-foreground">{template.length}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
