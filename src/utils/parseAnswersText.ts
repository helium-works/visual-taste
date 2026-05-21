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

const EMPTY_ENTRY = { url: '', note: '' }
const EMPTY_3 = [{ ...EMPTY_ENTRY }, { ...EMPTY_ENTRY }, { ...EMPTY_ENTRY }]

function parseUrlBlock(text: string, n: number): { url: string; note: string }[] {
  // Capture everything after "N. Label:" up to the next numbered line or end
  const blockRe = new RegExp(`^${n}\\.\\s+[^:]+:[\\s\\S]*?(?=^\\d+\\.|$)`, 'm')
  const block = text.match(blockRe)?.[0] ?? ''

  // Strip the "N. Label:" header line
  const headerRe = new RegExp(`^${n}\\.\\s+[^:]+:\\s*`)
  const body = block.replace(headerRe, '').trim()

  if (!body || NONE_PATTERN.test(body)) return [...EMPTY_3]

  let items: { url: string; note: string }[] = []

  // Multi-line format: each line starts with optional bullet/number
  const lines = body.split('\n').map(l => l.trim()).filter(Boolean)

  if (lines.length > 1 || lines[0]?.startsWith('-') || lines[0]?.startsWith('•')) {
    // New multi-line format
    items = lines
      .map(l => l.replace(/^[-•]\s*/, '').replace(/^\d+[).]\s*/, '').trim())
      .filter(Boolean)
      .map(l => {
        const sep = l.indexOf(' — ')
        return sep !== -1
          ? { url: l.slice(0, sep).trim(), note: l.slice(sep + 3).trim() }
          : { url: l.trim(), note: '' }
      })
  } else {
    // Legacy one-line comma-separated format (backward compat)
    items = body.split(',').map(s => s.trim()).filter(Boolean).map(url => ({ url, note: '' }))
  }

  // Pad / trim to exactly 3 entries
  while (items.length < 3) items.push({ ...EMPTY_ENTRY })
  return items.slice(0, 3)
}

function parseDensity(raw: string): number {
  const lower = raw.toLowerCase()
  if (lower.includes('spacious')) return 0
  if (lower.includes('dense')) return 2
  return 1
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
    websitesAdmire: [...EMPTY_3],
    websitesDislike: [...EMPTY_3],
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

  const font = line(text, 'Font')
  if (font) { answers.font = font.replace(/\+/g, ' '); count++ }

  const primary = line(text, 'Primary Color')
  if (primary) { answers.primary = primary.replace('#', ''); count++ }

  const secondary = line(text, 'Secondary Color')
  if (secondary) { answers.secondary = secondary.replace('#', ''); count++ }

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

  const admire = parseUrlBlock(text, 11)
  if (admire.some(x => x.url)) { answers.websitesAdmire = admire; count++ }

  const dislike = parseUrlBlock(text, 12)
  if (dislike.some(x => x.url)) { answers.websitesDislike = dislike; count++ }

  const notes = answerLine(text, 13)
  if (notes && !NONE_PATTERN.test(notes)) { answers.notes = notes; count++ }

  answers.parseCount = count
  const valid = count >= 8 && !!answers.clientName

  return { answers, parseCount: count, valid }
}
