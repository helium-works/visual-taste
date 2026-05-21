import type { FormAnswers } from './email'

type ParsedAnswers = Omit<FormAnswers, 'timestamp'> & { timestamp: string; parseCount: number }

function line(text: string, prefix: string): string {
  const re = new RegExp(`^${prefix}:\\s*(.+)$`, 'm')
  return text.match(re)?.[1]?.trim() ?? ''
}

function answerLine(text: string, n: number): string {
  // Matches "N. Label: value" format
  const re = new RegExp(`^${n}\\.\\s+[^:]+:\\s*(.+)$`, 'm')
  return text.match(re)?.[1]?.trim() ?? ''
}

const NONE_PATTERN = /^(none|none provided|skipped|n\/a)$/i

function parseUrls(raw: string): string[] {
  if (!raw || NONE_PATTERN.test(raw)) return ['', '', '']
  const urls = raw.split(',').map(s => s.trim()).filter(Boolean)
  return [urls[0] || '', urls[1] || '', urls[2] || '']
}

function parseDensity(raw: string): number {
  const lower = raw.toLowerCase()
  if (lower.includes('spacious')) return 0
  if (lower.includes('dense')) return 2
  return 1 // balanced
}

function parsePersonality(raw: string): string[] {
  if (!raw || NONE_PATTERN.test(raw)) return []
  return raw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
}

export interface ParseResult {
  answers: ParsedAnswers
  parseCount: number
  valid: boolean
}

export function parseAnswersText(text: string): ParseResult {
  const answers: ParsedAnswers = {
    clientName: '',
    font: '',
    primary: '',
    secondary: '',
    language: 'en',
    personality: [],
    cornerRadius: '',
    shadowDepth: '',
    buttonStyle: '',
    layoutDensity: 1,
    heroStyle: '',
    imageryStyle: '',
    navigationStyle: '',
    animationLevel: '',
    colorMode: '',
    websitesAdmire: ['', '', ''],
    websitesDislike: ['', '', ''],
    notes: '',
    timestamp: '',
    parseCount: 0,
  }

  if (!text.trim()) return { answers, parseCount: 0, valid: false }

  let count = 0

  const clientName = line(text, 'Client')
  if (clientName) { answers.clientName = clientName; count++ }

  const timestamp = line(text, 'Date')
  if (timestamp) { answers.timestamp = timestamp; count++ }

  const lang = line(text, 'Language')
  if (lang) { answers.language = lang === 'es' ? 'es' : 'en'; count++ }

  // Brand section
  const font = line(text, 'Font')
  if (font) { answers.font = font.replace(/\+/g, ' '); count++ }

  const primary = line(text, 'Primary Color')
  if (primary) { answers.primary = primary.replace('#', ''); count++ }

  const secondary = line(text, 'Secondary Color')
  if (secondary) { answers.secondary = secondary.replace('#', ''); count++ }

  // Answers section (numbered lines)
  const personality = answerLine(text, 1)
  if (personality) { answers.personality = parsePersonality(personality); count++ }

  const cornerRadius = answerLine(text, 2)
  if (cornerRadius) { answers.cornerRadius = cornerRadius.toLowerCase(); count++ }

  const shadowDepth = answerLine(text, 3)
  if (shadowDepth) { answers.shadowDepth = shadowDepth.toLowerCase(); count++ }

  const buttonStyle = answerLine(text, 4)
  if (buttonStyle) { answers.buttonStyle = buttonStyle; count++ }

  const density = answerLine(text, 5)
  if (density) { answers.layoutDensity = parseDensity(density); count++ }

  const heroStyle = answerLine(text, 6)
  if (heroStyle) { answers.heroStyle = heroStyle.toLowerCase(); count++ }

  const imageryStyle = answerLine(text, 7)
  if (imageryStyle) { answers.imageryStyle = imageryStyle.toLowerCase(); count++ }

  const navigationStyle = answerLine(text, 8)
  if (navigationStyle) { answers.navigationStyle = navigationStyle.toLowerCase(); count++ }

  const animationLevel = answerLine(text, 9)
  if (animationLevel) { answers.animationLevel = animationLevel.toLowerCase(); count++ }

  const colorMode = answerLine(text, 10)
  if (colorMode) { answers.colorMode = colorMode.toLowerCase(); count++ }

  const admire = answerLine(text, 11)
  if (admire) { answers.websitesAdmire = parseUrls(admire); count++ }

  const dislike = answerLine(text, 12)
  if (dislike) { answers.websitesDislike = parseUrls(dislike); count++ }

  const notes = answerLine(text, 13)
  if (notes && !NONE_PATTERN.test(notes)) { answers.notes = notes; count++ }

  answers.parseCount = count
  const valid = count >= 8 && !!answers.clientName

  return { answers, parseCount: count, valid }
}
