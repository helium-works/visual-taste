# CLAUDE.md — Design Taste

Project context for Claude Code sessions.

---

## What this is

A two-sided design preference tool for [Helium](https://helium.works) studio.

- **Admin side** (`/#/admin`) — the designer configures a client's brand (font, primary colour, secondary colour) and generates a shareable URL. The "Prompt generator" sub-page (`/#/admin/prompt`) takes the returned questionnaire email + a wireframe HTML and produces a comprehensive Claude design brief.
- **Client side** (`/#/` with URL params) — a 15-step form that renders entirely in the client's own font and colours. Every question uses live visual previews so the client chooses between options they can actually see and feel.

---

## Dev commands

```bash
npm run dev        # dev server at http://localhost:5173
npm run build      # TypeScript check + Vite build → dist/
npm run preview    # serve the dist/ build locally
npm run deploy     # build + push to gh-pages branch
```

Test the client form locally:
```
http://localhost:5173/#/?font=DM+Sans&primary=FF6B6B&secondary=00C9A7&client=Test
```

---

## Secrets / credentials

**Never commit real credentials.** The EmailJS keys live in `.env.local` (gitignored via `*.local`).

```bash
cp .env.example .env.local   # then fill in the three values
```

The config reads from env vars:
```ts
// src/config/emailjs.ts
export const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  ?? ''
export const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? ''
export const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  ?? ''
```

If the keys are empty, the submit button will still work but EmailJS will reject the call — the error UI with clipboard fallback will appear.

> **Note on EmailJS public key:** EmailJS's "public key" is intentionally client-exposed (it's how the service works). The service ID and template ID are also client-side identifiers. The main risk is someone sending spam through your account — protect against this in the EmailJS dashboard by restricting allowed domains.

---

## Architecture

### Routing

HashRouter (`react-router-dom`). Hash-based for GitHub Pages static hosting compatibility.

| Route | Component |
|-------|-----------|
| `/#/admin` | `src/pages/AdminPage.tsx` |
| `/#/admin/prompt` | `src/pages/PromptGeneratorPage.tsx` |
| `/#/*` | `src/pages/ClientForm.tsx` (reads URL params) |

### Brand injection model

When the client opens their link, `src/hooks/useBrandStyles.ts` reads four URL params and sets CSS custom properties on `:root`:

| CSS var | Source | Used for |
|---------|--------|----------|
| `--color-primary` | `primary` param (hex) | Buttons, progress bar, accents |
| `--color-secondary` | `secondary` param (hex) | Decorative blobs, card fills |
| `--color-primary-light` | Derived — 10% alpha rgba | Hover fills, selection backgrounds |
| `--color-primary-dark` | Derived — HSL lightness −20% | Active states |
| `--font-brand` | `font` param → Google Fonts | All question content |

The form chrome (progress bar, back/next nav, step counter) uses these same vars so the client sees their brand everywhere. The structural background (`#f6f5f1`) and chrome typeface (DM Sans / DM Mono) are Helium's — they recede so the client's brand pops.

Color derivation math lives in `src/utils/color.ts` (extracted from `useBrandStyles` so `buildDesignPrompt` can reuse it without DOM access).

### Form state

Two contexts:

- `LanguageContext` (`src/context/LanguageContext.tsx`) — `lang` ('en' | 'es'), `setLang`, and a memoised `t()` translation helper.
- `FormContext` (`src/context/FormContext.tsx`) — `FormState`, `setField`, and a `registerGoToStep` / `goToStep` pair used by the Review step's edit buttons.

`ClientForm.tsx` owns the step index and passes `onNext`/`onBack` to each step. It calls `registerGoToStep(goToStep)` on mount so `ReviewStep` can jump to any step for edits.

---

## Key files

```
src/
├── config/
│   └── emailjs.ts          — reads VITE_* env vars (never hardcode keys here)
├── data/
│   ├── translations.ts     — complete EN + ES strings for all 15 steps
│   └── promptDescriptors.ts — rich design descriptor tables (prose + CSS tokens)
│                              for every answer ID → used by buildDesignPrompt
├── hooks/
│   ├── useUrlParams.ts     — parses font/primary/secondary/client from hash query string
│   └── useBrandStyles.ts   — sets CSS vars + dynamically loads Google Font
├── utils/
│   ├── email.ts            — FormAnswers interface, sendFormEmail, answersToText
│   ├── parseAnswersText.ts — inverse of answersToText; parses email body → FormAnswers
│   ├── buildDesignPrompt.ts — pure function: FormAnswers + wireframe HTML → Claude prompt
│   └── color.ts            — hexToRgb, hexToHsl, hslToHex, derivedColors (shared)
├── pages/
│   ├── AdminPage.tsx       — dark admin dashboard: URL generator + live preview
│   ├── ClientForm.tsx      — step orchestrator (step index, keyboard nav, missing params screen)
│   └── PromptGeneratorPage.tsx — paste answers + wireframe → copy Claude design brief
├── components/
│   ├── ProgressBar.tsx     — fixed top bar, uses --color-primary
│   ├── StepContainer.tsx   — Framer Motion directional slide wrapper
│   ├── LanguageToggle.tsx  — floating 🌐 EN/ES pill
│   ├── SelectableCard.tsx  — accessible selectable card (aria-pressed, keyboard support)
│   ├── ColorPicker.tsx     — native color input + hex text field (admin only)
│   ├── FontPicker.tsx      — searchable Google Fonts dropdown + live preview (admin only)
│   └── LivePreview.tsx     — 16:9 mini welcome-screen mockup (admin only)
└── steps/                  — one file per step, WelcomeStep.tsx → ReviewStep.tsx
```

---

## i18n

All strings in `src/data/translations.ts` as two complete objects: `en` and `es`. The `Translations` interface enforces shape at compile time — if you add a key, add it to both languages or the build fails.

Translation helper:
```ts
import { useLanguage } from '../context/LanguageContext'
const { t } = useLanguage()
t('cornerTitle')                          // → "How do your corners feel?"
t('welcomeGreeting', { name: 'Diego' })   // → "Hi, Diego"
```

The floating language toggle (`LanguageToggle.tsx`) is always visible on steps 1–14, anchored top-right.

---

## Adding a new step

1. Create `src/steps/YourStep.tsx` — accept `{ onNext, onBack }` props, use `useForm()` + `useLanguage()`.
2. Add translation keys to `src/data/translations.ts` in both `en` and `es`.
3. Add a new field to `FormState` in `src/context/FormContext.tsx` and `FormAnswers` in `src/utils/email.ts`.
4. Register the step in `src/pages/ClientForm.tsx` — increment `TOTAL_STEPS`, add a `case` to `renderStep()`.
5. Add a review section in `src/steps/ReviewStep.tsx`.
6. Add to `answersToText` in `src/utils/email.ts` and `parseAnswersText` in `src/utils/parseAnswersText.ts`.

---

## Prompt generator workflow

After receiving a client's email:

1. Open `/#/admin/prompt`
2. Paste the questionnaire email body — the parser shows `✓ N answers parsed`
3. Paste or upload your wireframe `.html` file (optional)
4. Click **Generate prompt**
5. Copy into a Claude session or download as `.md`

The generated prompt includes: client identity, brand palette + derived colours, brand personality expansion (prose, not just labels), every design token with exact CSS values, hero/nav/imagery guidance, reference sites, constraints, and the wireframe in a fenced code block.

**Descriptor tables** live in `src/data/promptDescriptors.ts`. Each answer ID maps to `{ prose, css }` — edit these to change what Claude receives. Keep IDs in sync with the option IDs used in `FormState`.

---

## Deployment

```bash
npm run deploy   # runs build then gh-pages -d dist
```

Requirements:
- `.env.local` must exist with the three `VITE_EMAILJS_*` keys before building.
- `vite.config.ts` uses `base: './'` for GitHub Pages asset resolution.
- `public/404.html` redirects unknown paths back to `index.html` (SPA shim).
- Set `gh-pages` as the Pages source branch in the repo settings.

**GitHub Actions** (optional): if you later add CI, store the three keys as repository secrets and expose them as env vars in the workflow. The `npm run build` step will pick them up via Vite's standard env var injection.

---

## Design system notes

- **Form chrome**: DM Sans (headings/body), DM Mono (labels/UI text), `#f6f5f1` background, `#121012` ink — Helium's own brand so it recedes behind the client's colours.
- **Signature detail**: a diagonal triangle accent in `--color-primary` at the bottom-right of each step card (opacity 0.04) + a CSS noise texture overlay (`.noise-bg`).
- **Framer Motion**: used for step transitions (`StepContainer`) and the animation-level interactive demo (`AnimationStep`). House easing curve: `cubic-bezier(0.2, 0.7, 0.3, 1)`.
- **No icon library**: inline SVG only, per Helium's design rules. The one exception is the 🌐 emoji in `LanguageToggle`.
- **CSS custom properties** for brand: set on `:root` by `useBrandStyles`. Tailwind config extends with `var(--color-primary)` etc. so Tailwind utilities like `bg-primary` work.
