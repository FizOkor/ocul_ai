'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Download, RotateCcw } from 'lucide-react'
import { WizardData } from './cover-letter-wizard'

interface CoverLetterPreviewProps {
  letter: string
  data: WizardData
}

export default function CoverLetterPreview({
  letter,
  data,
}: CoverLetterPreviewProps) {
  const [editedLetter, setEditedLetter] = useState(letter)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editedLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadAsText = () => {
    const element = document.createElement('a')
    const file = new Blob([editedLetter], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `cover-letter-${data.companyName}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleReset = () => {
    setEditedLetter(letter)
  }

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">Your Cover Letter</h2>
      <p className="mb-6 text-muted-foreground">
        Review and edit your generated cover letter. You can make any changes you'd like before downloading or copying.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Editor */}
        <div>
          <label className="mb-2 block font-semibold text-foreground">Edit Your Letter</label>
          <Textarea
            value={editedLetter}
            onChange={(e) => setEditedLetter(e.target.value)}
            className="font-sans border-input"
            rows={15}
          />
        </div>

        {/* Preview */}
        <div>
          <label className="mb-2 block font-semibold text-foreground">Preview</label>
          <div className="rounded-lg border border-border bg-card p-8">
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {editedLetter}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          onClick={copyToClipboard}
          variant="outline"
          className="gap-2 bg-transparent"
        >
          <Copy className="h-4 w-4" />
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
        <Button
          onClick={downloadAsText}
          variant="outline"
          className="gap-2 bg-transparent"
        >
          <Download className="h-4 w-4" />
          Download as Text
        </Button>
        <Button
          onClick={handleReset}
          variant="ghost"
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset to Generated
        </Button>
      </div>

      {/* Next steps */}
      <div className="mt-8 rounded-lg bg-secondary/30 p-6">
        <h3 className="mb-2 font-semibold text-foreground">Next Steps</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="font-semibold">1.</span>
            <span>Review and edit the letter to match your style</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold">2.</span>
            <span>Copy to your email client or download as a file</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold">3.</span>
            <span>Submit with your job application</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
