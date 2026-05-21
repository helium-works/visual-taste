import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { parseAnswersText } from '../utils/parseAnswersText'
import { buildDesignPrompt } from '../utils/buildDesignPrompt'

export default function PromptGeneratorPage() {
  const [answersText, setAnswersText] = useState('')
  const [wireframeHtml, setWireframeHtml] = useState('')
  const [prompt, setPrompt] = useState('')
  const [copied, setCopied] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const parseResult = answersText.trim() ? parseAnswersText(answersText) : null

  const handleGenerate = useCallback(() => {
    if (!parseResult?.valid) return
    const built = buildDesignPrompt(parseResult.answers, wireframeHtml || undefined)
    setPrompt(built)
  }, [parseResult, wireframeHtml])

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([prompt], { type: 'text/markdown' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `design-brief-${parseResult?.answers.clientName?.replace(/\s+/g, '-').toLowerCase() || 'client'}.md`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setWireframeHtml((ev.target?.result as string) || '')
    reader.readAsText(file)
  }

  const charCount = prompt.length
  const tokenEstimate = Math.round(charCount / 4)

  const parseStatus = (() => {
    if (!answersText.trim()) return null
    if (!parseResult) return null
    if (parseResult.valid) return { ok: true, msg: `✓ ${parseResult.parseCount} answers parsed` }
    return { ok: false, msg: `Could not parse — check format (need at least Client + 8 answers)` }
  })()

  return (
    <div className="admin-bg" style={{ fontFamily: 'DM Sans, sans-serif', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c6e6c0' }} />
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.5)' }}>
          Helium
        </span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'rgba(232,230,227,0.25)' }}>/</span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.5)' }}>
          Prompt Generator
        </span>
        <div style={{ flex: 1 }} />
        <Link
          to="/admin"
          style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.4)', textDecoration: 'none', padding: '6px 12px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, transition: 'border-color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
        >
          ← Admin
        </Link>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        {/* Left column — inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 26, fontWeight: 400, letterSpacing: '-0.025em', color: '#e8e6e3', margin: '0 0 6px' }}>
              Generate <em style={{ fontStyle: 'italic', fontWeight: 300 }}>design prompt</em>
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(232,230,227,0.45)', margin: 0, fontFamily: 'DM Mono, monospace', letterSpacing: '0.04em' }}>
              Paste the questionnaire email + wireframe HTML. Copy the prompt into Claude.
            </p>
          </div>

          {/* Answers body */}
          <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.55)' }}>
                Questionnaire body
              </label>
              {parseStatus && (
                <span style={{
                  fontSize: 10,
                  fontFamily: 'DM Mono, monospace',
                  letterSpacing: '0.06em',
                  padding: '3px 10px',
                  borderRadius: 20,
                  background: parseStatus.ok ? 'rgba(198,230,192,0.15)' : 'rgba(255,100,100,0.12)',
                  color: parseStatus.ok ? '#c6e6c0' : '#ff8a8a',
                  border: `1px solid ${parseStatus.ok ? 'rgba(198,230,192,0.3)' : 'rgba(255,100,100,0.25)'}`,
                }}>
                  {parseStatus.msg}
                </span>
              )}
            </div>
            <textarea
              className="admin-input"
              value={answersText}
              onChange={e => setAnswersText(e.target.value)}
              placeholder={`DESIGN TASTE QUESTIONNAIRE\nClient: Diego Rojas\nDate: 5/21/2026...\n\nBRAND\nFont: DM+Sans\nPrimary Color: #ff6b6b\n...\n\nANSWERS\n1. Brand Personality: elegant, corporate\n...`}
              rows={14}
              style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, lineHeight: 1.7, resize: 'vertical' }}
            />
          </div>

          {/* Wireframe HTML */}
          <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.55)' }}>
                Wireframe HTML
              </label>
              <button
                onClick={() => fileRef.current?.click()}
                style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', letterSpacing: '0.06em', color: 'rgba(232,230,227,0.5)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}
              >
                Upload .html ↑
              </button>
              <input ref={fileRef} type="file" accept=".html,.htm" onChange={handleFileUpload} style={{ display: 'none' }} />
            </div>
            <textarea
              className="admin-input"
              value={wireframeHtml}
              onChange={e => setWireframeHtml(e.target.value)}
              placeholder="<!DOCTYPE html>&#10;<html>&#10;  <body>&#10;    <section class='hero'>...</section>&#10;    ...&#10;  </body>&#10;</html>"
              rows={10}
              style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, lineHeight: 1.6, resize: 'vertical' }}
            />
            <p style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', color: 'rgba(232,230,227,0.3)', margin: 0 }}>
              Optional — paste your wireframe HTML or upload a .html file. If empty, the prompt instructs Claude to use a standard marketing layout.
            </p>
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={!parseResult?.valid}
            style={{
              padding: '14px',
              borderRadius: 12,
              background: parseResult?.valid ? 'rgba(198,230,192,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${parseResult?.valid ? 'rgba(198,230,192,0.35)' : 'rgba(255,255,255,0.08)'}`,
              color: parseResult?.valid ? '#c6e6c0' : 'rgba(232,230,227,0.3)',
              fontFamily: 'DM Mono, monospace',
              fontSize: 13,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: parseResult?.valid ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}
          >
            {parseResult?.valid ? '⚡ Generate prompt' : 'Paste questionnaire to enable'}
          </button>
        </div>

        {/* Right column — output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 40 }}>
          <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.55)' }}>
                Generated prompt
              </label>
              {prompt && (
                <span style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', color: 'rgba(232,230,227,0.35)' }}>
                  {charCount.toLocaleString()} chars · ~{tokenEstimate.toLocaleString()} tokens
                </span>
              )}
            </div>

            {prompt ? (
              <>
                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  padding: '16px',
                  maxHeight: 420,
                  overflowY: 'auto',
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 11,
                  lineHeight: 1.7,
                  color: 'rgba(232,230,227,0.75)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}>
                  {prompt}
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={handleCopy}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: 10,
                      background: copied ? 'rgba(198,230,192,0.15)' : 'rgba(255,255,255,0.08)',
                      border: `1px solid ${copied ? 'rgba(198,230,192,0.4)' : 'rgba(255,255,255,0.15)'}`,
                      color: copied ? '#c6e6c0' : '#e8e6e3',
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 13,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                    }}
                  >
                    {copied ? '✓ Copied!' : '⎘ Copy prompt'}
                  </button>
                  <button
                    onClick={handleDownload}
                    style={{
                      padding: '12px 18px',
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      color: 'rgba(232,230,227,0.55)',
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 12,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    ↓ .md
                  </button>
                </div>
              </>
            ) : (
              <div style={{
                minHeight: 300,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                color: 'rgba(232,230,227,0.2)',
                fontFamily: 'DM Mono, monospace',
                fontSize: 12,
                letterSpacing: '0.06em',
                border: '1px dashed rgba(255,255,255,0.08)',
                borderRadius: 10,
                padding: 24,
              }}>
                <div style={{ fontSize: 28 }}>✦</div>
                <div>Prompt will appear here</div>
              </div>
            )}
          </div>

          {/* Quick reference */}
          <div style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10 }}>
            <div style={{ fontSize: 10, fontFamily: 'DM Mono, monospace', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(232,230,227,0.35)', marginBottom: 10 }}>
              Expected format
            </div>
            <pre style={{ margin: 0, fontFamily: 'DM Mono, monospace', fontSize: 10, color: 'rgba(232,230,227,0.4)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{`DESIGN TASTE QUESTIONNAIRE
Client: [name]
Date: [date]
Language: en

BRAND
Font: [font name or DM+Sans]
Primary Color: #[hex]
Secondary Color: #[hex]

ANSWERS
1. Brand Personality: [p1], [p2]
2. Corner Radius: sharp|soft|rounded|pill
3. Shadow Depth: none|subtle|medium|dramatic
4. Button Style: solid|outlined|ghost|solidIcon
5. Layout Density: Spacious|Balanced|Dense
6. Hero Style: fullscreen|video|typography|...
7. Imagery Style: photography|illustration|...
8. Navigation Style: topbar|hamburger|...
9. Animation Level: none|subtle|moderate|dynamic
10. Color Mode: light|dark|both
11. Websites I Love: [urls or None]
12. Websites I Dislike: [urls or None]
13. Additional Notes: [text or None]`}
            </pre>
          </div>
        </div>
      </div>

      {/* Mobile note */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="position: sticky"] {
            position: static !important;
          }
        }
      `}</style>
    </div>
  )
}
