import emailjs from '@emailjs/browser'
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../config/emailjs'

export interface FormAnswers {
  clientName: string
  font: string
  primary: string
  secondary: string
  language: string
  personality: string[]
  cornerRadius: string
  shadowDepth: string
  buttonStyle: string
  layoutDensity: number
  heroStyle: string
  imageryStyle: string
  navigationStyle: string
  animationLevel: string
  colorMode: string
  websitesAdmire: { url: string; note: string }[]
  websitesDislike: { url: string; note: string }[]
  notes: string
  timestamp: string
}

export async function sendFormEmail(answers: FormAnswers): Promise<void> {
  const templateParams = {
    client_name: answers.clientName,
    message: answersToText(answers),
  }

  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY
  )
}

export function answersToText(answers: FormAnswers): string {
  return `
DESIGN TASTE QUESTIONNAIRE
Client: ${answers.clientName}
Date: ${answers.timestamp}
Language: ${answers.language}

BRAND
Font: ${answers.font}
Primary Color: #${answers.primary}
Secondary Color: #${answers.secondary}

ANSWERS
1. Brand Personality: ${answers.personality.join(', ')}
2. Corner Radius: ${answers.cornerRadius}
3. Shadow Depth: ${answers.shadowDepth}
4. Button Style: ${answers.buttonStyle}
5. Layout Density: ${answers.layoutDensity === 0 ? 'Spacious' : answers.layoutDensity === 1 ? 'Balanced' : 'Dense'}
6. Hero Style: ${answers.heroStyle}
7. Imagery Style: ${answers.imageryStyle}
8. Navigation Style: ${answers.navigationStyle}
9. Animation Level: ${answers.animationLevel}
10. Color Mode: ${answers.colorMode}
11. Websites I Love:
${answers.websitesAdmire.filter(x => x.url).map(x => `   - ${x.url}${x.note ? ` — ${x.note}` : ''}`).join('\n') || '   None'}
12. Websites I Dislike:
${answers.websitesDislike.filter(x => x.url).map(x => `   - ${x.url}${x.note ? ` — ${x.note}` : ''}`).join('\n') || '   None'}
13. Additional Notes: ${answers.notes || 'None'}
`.trim()
}
