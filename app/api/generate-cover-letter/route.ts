interface RequestBody {
  template: string
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
  tone: string
  length: 'brief' | 'standard' | 'verbose'
  useAI: boolean
}

// Build detailed, intelligent prompt for AI model
function buildDetailedPrompt(data: RequestBody): string {
  const toneGuide = {
    professional: 'formal, polished, and corporate',
    confident: 'assertive, bold, and achievement-focused',
    concise: 'direct, clear, and to-the-point',
  }

  const templateContext = {
    standard: 'A professional cover letter from an experienced candidate highlighting skills and achievements that match the role',
    'entry-level':
      'An enthusiastic cover letter from a recent graduate or early-career professional, emphasizing learning potential and eagerness to grow',
    'career-switch':
      'A strategic cover letter that bridges experience from a different field, showing how transferable skills apply to this new role',
    executive:
      'A strategic leadership cover letter highlighting vision, team leadership, and business impact at an executive level',
  }

  const lengthGuide = {
    brief: {
      words: '150-200 words',
      description: 'concise and impactful, hitting only the most important points',
      structure: 'Short opening, 1-2 brief body points, quick closing',
    },
    standard: {
      words: '250-350 words',
      description: 'well-balanced with good detail and flow',
      structure: 'Strong opening, 2-3 body paragraphs, compelling closing',
    },
    verbose: {
      words: '400-500 words',
      description: 'detailed and comprehensive, with multiple examples and deep insights',
      structure: 'Compelling opening, 3-4 detailed body paragraphs with examples, strong closing',
    },
  }

  const lengthConfig = lengthGuide[data.length]

  const prompt = `You are an expert professional cover letter writer. Write a compelling, personalized cover letter based on the following information:

APPLICANT PROFILE:
Name: ${data.fullName}
Current Role: ${data.currentRole || 'Not specified'}
Years of Experience: ${data.yearsOfExperience || 'Not specified'}
Key Skills: ${data.keySkills}
Key Achievements: ${data.achievements}

TARGET OPPORTUNITY:
Company: ${data.companyName}
Position: ${data.jobTitle}
Hiring Manager: ${data.hiringManager || 'Not provided'}
Job Description: ${data.jobDescription}
Motivation/Interest: ${data.motivation || 'Not provided'}

LETTER TYPE: ${templateContext[data.template as keyof typeof templateContext] || templateContext['standard']}

TONE: Write in a ${toneGuide[data.tone as keyof typeof toneGuide] || toneGuide['professional']} tone.

LENGTH REQUIREMENT: ${lengthConfig.words} - The letter should be ${lengthConfig.description}
Structure: ${lengthConfig.structure}

REQUIREMENTS:
1. Length: Aim for ${lengthConfig.words} (approximately ${data.length === 'brief' ? '3-4' : data.length === 'standard' ? '4-5' : '5-7'} sentences per paragraph)
2. Opening: Strong hook that shows genuine interest and relevant experience
3. Body: Connect the candidate's specific skills and achievements to the job requirements (provide ${data.length === 'brief' ? '1-2' : data.length === 'standard' ? '2-3' : '3-4'} clear examples)
4. Closing: Compelling call to action with enthusiasm
5. Salutation: ${data.hiringManager ? `Dear ${data.hiringManager},` : 'Dear Hiring Manager,'}
6. Sign-off: Sincerely, ${data.fullName}
7. Style: Professional but conversational, show personality while maintaining professionalism
8. Content: Use specific examples and quantifiable achievements where possible
9. Relevance: Directly address how the candidate's background matches what the company needs

CRITICAL: Only reference skills and achievements provided above. Do NOT make up or hallucinate any experiences. Make the letter compelling, unique, and memorable while being honest about qualifications.

Write ONLY the cover letter text, nothing else. Include the salutation and sign-off.`;

  return prompt
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json()

    // Validate required fields
    if (!body.fullName || !body.companyName || !body.jobTitle) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: Full Name, Company Name, and Job Title are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenRouter API key not configured. Please add OPENROUTER_API_KEY to your environment variables.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const prompt = buildDetailedPrompt(body)

    // Call DeepSeek via OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 1500,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('[v0] OpenRouter API error:', error)

      const errorMessage = error.error?.message || error.message || JSON.stringify(error)
      let userFriendlyError = errorMessage

      if (errorMessage.includes('API key') || errorMessage.includes('authentication')) {
        userFriendlyError = 'Invalid OpenRouter API key. Please verify your OPENROUTER_API_KEY is correct at https://openrouter.ai/keys'
      } else if (errorMessage.includes('rate limit') || errorMessage.includes('quota')) {
        userFriendlyError = 'Rate limit reached. Please try again in a moment.'
      } else if (errorMessage.includes('model') || errorMessage.includes('not found')) {
        userFriendlyError = 'DeepSeek model not available. Please try again later.'
      }

      return new Response(JSON.stringify({ error: userFriendlyError }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    let data
    try {
      data = await response.json()
    } catch (parseError) {
      console.error('[v0] Failed to parse response as JSON:', parseError)
      const responseText = await response.text()
      console.error('[v0] Response body:', responseText)
      return new Response(
        JSON.stringify({ error: 'Invalid response from OpenRouter API. Please check your API key and try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const letter = data.choices?.[0]?.message?.content || ''

    if (!letter) {
      console.error('[v0] No content in response:', JSON.stringify(data))
      throw new Error('No content in response from DeepSeek')
    }

    return new Response(JSON.stringify({ letter }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('[v0] Error generating cover letter:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to generate cover letter' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
