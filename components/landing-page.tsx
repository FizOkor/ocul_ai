'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface LandingPageProps {
  onGetStarted: () => void
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 md:px-12">
        <div className="text-2xl font-bold text-primary">CoverLetterAI</div>
        <nav className="hidden gap-8 md:flex">
          <a href="#features" className="text-foreground hover:text-primary transition-colors">
            Features
          </a>
          <a href="#templates" className="text-foreground hover:text-primary transition-colors">
            Templates
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex items-center justify-center px-6 py-20 md:py-32">
        <div className="max-w-2xl text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-6xl text-balance">
            Create Professional Cover Letters in Minutes
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            AI-powered, template-based cover letter generation. Select your template, fill in your details, and let AI help you craft the perfect letter for any job application.
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:justify-center">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="gap-2"
            >
              Build My Cover Letter
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-muted-foreground text-muted-foreground hover:bg-secondary bg-transparent"
            >
              View Templates
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-card p-4">
              <div className="mb-2 text-sm font-semibold text-primary">Fast & Easy</div>
              <p className="text-sm text-muted-foreground">
                Complete your cover letter in just 5-10 minutes
              </p>
            </div>
            <div className="rounded-lg bg-card p-4">
              <div className="mb-2 text-sm font-semibold text-primary">AI-Enhanced</div>
              <p className="text-sm text-muted-foreground">
                AI assistance to polish and improve your letter
              </p>
            </div>
            <div className="rounded-lg bg-card p-4">
              <div className="mb-2 text-sm font-semibold text-primary">Multiple Templates</div>
              <p className="text-sm text-muted-foreground">
                Choose from professional templates for any career stage
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
