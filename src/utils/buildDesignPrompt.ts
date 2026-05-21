import type { FormAnswers } from './email'
import {
  PERSONALITY, CORNER_RADIUS, SHADOW, BUTTON_STYLE, DENSITY,
  HERO_STYLE, IMAGERY_STYLE, NAVIGATION_STYLE, ANIMATION_LEVEL,
  COLOR_MODE, personalityCombination,
} from '../data/promptDescriptors'
import { derivedColors } from './color'

const DENSITY_LABEL: Record<number, string> = { 0: 'Spacious', 1: 'Balanced', 2: 'Dense' }

function get<T>(table: Record<string, T>, key: string, fallback: T): T {
  return table[key] ?? table[key.toLowerCase()] ?? fallback
}

function section(title: string, content: string): string {
  return `\n## ${title}\n\n${content.trim()}\n`
}

export function buildDesignPrompt(answers: FormAnswers, wireframeHtml?: string): string {
  const fontName = (answers.font || 'DM Sans').replace(/\+/g, ' ')
  const primaryHex = `#${answers.primary.replace('#', '') || '000000'}`
  const secondaryHex = `#${answers.secondary.replace('#', '') || '000000'}`
  const { primaryLight, primaryDark } = derivedColors(primaryHex)
  const densityLabel = DENSITY_LABEL[answers.layoutDensity] ?? 'Balanced'
  const densityKey = densityLabel

  // Personality
  const personalityIds = (answers.personality || []).map(p => p.toLowerCase())
  const personalityEntries = personalityIds
    .map(id => {
      const d = PERSONALITY[id]
      return d ? `**${id.charAt(0).toUpperCase() + id.slice(1)}:** ${d.prose}` : `**${id}**`
    })
    .join('\n\n')
  const personalityCombo = personalityCombination(personalityIds)

  // Tokens
  const radius = get(CORNER_RADIUS, answers.cornerRadius, CORNER_RADIUS['soft'])
  const shadow = get(SHADOW, answers.shadowDepth, SHADOW['subtle'])
  const button = get(BUTTON_STYLE, answers.buttonStyle, BUTTON_STYLE['solid'])
  const density = get(DENSITY, densityKey, DENSITY['Balanced'])
  const colorMode = get(COLOR_MODE, answers.colorMode, COLOR_MODE['light'])
  const animation = get(ANIMATION_LEVEL, answers.animationLevel, ANIMATION_LEVEL['subtle'])
  const hero = get(HERO_STYLE, answers.heroStyle, HERO_STYLE['split'])
  const imagery = get(IMAGERY_STYLE, answers.imageryStyle, IMAGERY_STYLE['photography'])
  const nav = get(NAVIGATION_STYLE, answers.navigationStyle, NAVIGATION_STYLE['topbar'])

  // Admired / disliked sites
  const admiredUrls = (answers.websitesAdmire || []).filter(Boolean)
  const dislikedUrls = (answers.websitesDislike || []).filter(Boolean)

  const lines: string[] = []

  // ── Role + goal ──────────────────────────────────────────────────────────
  lines.push(`# Design Brief: ${answers.clientName || 'Client'}`)
  lines.push('')
  lines.push(`You are a senior product designer and front-end craftsperson. Your task is to produce a **high-fidelity, pixel-ready HTML + CSS mockup** of the pages described in the wireframe below, re-skinned with the client's brand and the complete design language documented in this brief. Do not deviate from the design decisions recorded here — they were collected directly from the client. Your output should be a single, self-contained HTML file with an inline \`<style>\` block. Use no JavaScript frameworks. All images should be inline SVG placeholders or CSS-generated shapes coloured with the brand palette. Include a brief design-rationale comment block at the top of the HTML file.`)
  lines.push('')

  // ── Client ───────────────────────────────────────────────────────────────
  lines.push(section('Client', [
    `**Name:** ${answers.clientName || '—'}`,
    `**Language preference:** ${answers.language === 'es' ? 'Spanish' : 'English'}`,
    answers.timestamp ? `**Date captured:** ${answers.timestamp}` : '',
  ].filter(Boolean).join('\n')))

  // ── Brand foundations ────────────────────────────────────────────────────
  lines.push(section('Brand Foundations', [
    `**Font:** ${fontName}`,
    `  Google Fonts embed: \`<link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap" rel="stylesheet">\``,
    `  Set on \`body { font-family: '${fontName}', sans-serif; }\``,
    '',
    `**Primary colour:** \`${primaryHex}\``,
    `**Secondary colour:** \`${secondaryHex}\``,
    `**Primary light** (10% opacity — for hover fills, selection backgrounds): \`${primaryLight}\``,
    `**Primary dark** (20% darker — for active states, deep shadows): \`${primaryDark}\``,
    '',
    `Define these as CSS custom properties on \`:root\`:`,
    '```css',
    ':root {',
    `  --primary: ${primaryHex};`,
    `  --secondary: ${secondaryHex};`,
    `  --primary-light: ${primaryLight};`,
    `  --primary-dark: ${primaryDark};`,
    `  --font-brand: '${fontName}', sans-serif;`,
    `  --bg: ${colorMode.bg.split(' /')[0]};`,
    `  --surface: ${colorMode.surface.split(' /')[0]};`,
    `  --ink: ${colorMode.ink.split(' /')[0]};`,
    `  --ink-muted: ${colorMode.inkMuted.split(' /')[0]};`,
    `  --radius: ${radius.px === 9999 ? '9999px' : `${radius.px}px`};`,
    `  --shadow: ${shadow.css};`,
    '}',
    '```',
  ].join('\n')))

  // ── Brand personality ────────────────────────────────────────────────────
  lines.push(section('Brand Personality', [
    personalityEntries || '*(not specified)*',
    personalityCombo ? `\n**How they combine:** ${personalityCombo}` : '',
  ].filter(Boolean).join('\n\n')))

  // ── Design tokens ────────────────────────────────────────────────────────
  lines.push(section('Design Tokens', [
    `### Corner Radius`,
    `**Value:** \`border-radius: ${radius.px === 9999 ? '9999px' : `${radius.px}px`}\``,
    radius.prose,
    '',
    `### Shadow Depth`,
    `**Value:** \`box-shadow: ${shadow.css}\``,
    shadow.prose,
    '',
    `### Button Style`,
    button.prose,
    '```css',
    button.cssSample,
    '```',
    '',
    `### Layout Density — ${densityLabel}`,
    density.prose,
    `- Section padding: **${density.padding * 2}px** top/bottom (desktop)`,
    `- Internal card padding: **${density.padding}px**`,
    `- Grid/flex gap: **${density.gap}px**`,
    `- Content max-width: **${density.maxWidth}px**`,
    '',
    `### Color Mode — ${answers.colorMode || 'light'}`,
    colorMode.prose,
    `- Background: \`${colorMode.bg}\``,
    `- Surface (cards, sections): \`${colorMode.surface}\``,
    `- Ink (text): \`${colorMode.ink}\``,
    `- Ink muted (secondary text): \`${colorMode.inkMuted}\``,
    '',
    `### Animation Level — ${answers.animationLevel || 'subtle'}`,
    animation.prose,
    animation.cssTransition !== '/* none */' ? `\n\`\`\`css\n${animation.cssTransition}\n\`\`\`` : '',
  ].filter(s => s !== '').join('\n')))

  // ── Section style guidance ───────────────────────────────────────────────
  lines.push(section('Section Style Guidance', [
    `### Hero Section`,
    hero.prose,
    '',
    `### Navigation`,
    nav.prose,
    '',
    `### Imagery`,
    imagery.prose,
    imagery.placeholder ? `**Placeholder recipe:** ${imagery.placeholder}` : '',
  ].filter(s => s !== '').join('\n')))

  // ── Reference sites ──────────────────────────────────────────────────────
  if (admiredUrls.length > 0 || dislikedUrls.length > 0) {
    const refLines: string[] = []
    if (admiredUrls.length > 0) {
      refLines.push('**Draw inspiration from these sites** (the client specifically called them out as design references):')
      admiredUrls.forEach(url => refLines.push(`- ${url}`))
    }
    if (dislikedUrls.length > 0) {
      refLines.push('')
      refLines.push('**Explicitly avoid the aesthetic of these sites** (the client flagged them as design anti-references):')
      dislikedUrls.forEach(url => refLines.push(`- ${url}`))
    }
    lines.push(section('Reference Sites', refLines.join('\n')))
  }

  // ── Client notes ─────────────────────────────────────────────────────────
  if (answers.notes) {
    lines.push(section('Client Notes', `The client added the following free-form note:\n\n> ${answers.notes}`))
  }

  // ── Constraints ──────────────────────────────────────────────────────────
  lines.push(section('Constraints', [
    '- **Keep the wireframe DOM structure intact.** Re-skin only — do not add, remove, or reorganise sections.',
    '- **Responsive:** the output must work at 375px, 768px, and 1280px viewport widths.',
    '- **Self-contained:** one HTML file with a `<style>` block. No external CSS files, no JavaScript frameworks.',
    '- **Fonts:** embed the Google Fonts `<link>` in `<head>`. No other external assets.',
    '- **Images:** use inline SVG shapes or CSS-generated placeholders coloured with the brand palette. No placeholder services (placehold.co, picsum, etc.).',
    '- **Accessibility:** all interactive elements must have appropriate ARIA labels or roles. Colour contrast must pass WCAG AA.',
    '- **No cookie banners, modals, or popups** unless explicitly in the wireframe.',
  ].join('\n')))

  // ── Deliverable ──────────────────────────────────────────────────────────
  lines.push(section('Deliverable', [
    'Return **one complete HTML file** with:',
    '1. An HTML comment at the very top (inside `<head>`) with a brief design rationale (3–5 sentences explaining your top design decisions).',
    '2. A `<style>` block with CSS custom properties on `:root`, base resets, and all component styles.',
    '3. The full page markup, responsive down to 375px.',
    '4. All visual assets as inline SVG or CSS shapes — zero external image dependencies.',
  ].join('\n')))

  // ── Wireframe ────────────────────────────────────────────────────────────
  if (wireframeHtml?.trim()) {
    lines.push(section('Wireframe (Layout Source)', [
      'The following HTML is the structural wireframe. **Keep this DOM structure.** Re-skin it with the design language documented above.',
      '',
      '```html',
      wireframeHtml.trim(),
      '```',
    ].join('\n')))
  } else {
    lines.push(section('Wireframe', '*No wireframe was provided. Apply the design language above to a standard marketing landing page layout: hero → features (3-up grid) → testimonial → CTA section → footer.*'))
  }

  return lines.join('\n')
}
