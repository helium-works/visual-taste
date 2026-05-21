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
  websitesAdmire: string[]
  websitesDislike: string[]
  notes: string
  timestamp: string
}

export async function sendFormEmail(answers: FormAnswers): Promise<void> {
  const templateParams = {
    client_name: answers.clientName,
    timestamp: answers.timestamp,
    font: answers.font,
    primary_color: `#${answers.primary}`,
    secondary_color: `#${answers.secondary}`,
    language: answers.language,
    personality: answers.personality.join(', '),
    corner_radius: answers.cornerRadius,
    shadow_depth: answers.shadowDepth,
    button_style: answers.buttonStyle,
    layout_density: answers.layoutDensity === 0 ? 'Spacious' : answers.layoutDensity === 1 ? 'Balanced' : 'Dense',
    hero_style: answers.heroStyle,
    imagery_style: answers.imageryStyle,
    navigation_style: answers.navigationStyle,
    animation_level: answers.animationLevel,
    color_mode: answers.colorMode,
    websites_admire: answers.websitesAdmire.filter(Boolean).join('\n') || 'None provided',
    websites_dislike: answers.websitesDislike.filter(Boolean).join('\n') || 'None provided',
    notes: answers.notes || 'None',
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
11. Websites I Love: ${answers.websitesAdmire.filter(Boolean).join(', ') || 'None'}
12. Websites I Dislike: ${answers.websitesDislike.filter(Boolean).join(', ') || 'None'}
13. Additional Notes: ${answers.notes || 'None'}
`.trim()
}
