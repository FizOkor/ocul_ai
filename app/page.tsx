'use client'

import { useState } from 'react'
import LandingPage from '@/components/landing-page'
import CoverLetterForm from '@/components/cover-letter-form'

export default function Page() {
  const [showForm, setShowForm] = useState(false)

  return showForm ? (
    <CoverLetterForm onBack={() => setShowForm(false)} />
  ) : (
    <LandingPage onGetStarted={() => setShowForm(true)} />
  )
}
