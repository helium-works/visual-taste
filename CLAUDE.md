# CLAUDE.md — Design Taste

Project context for Claude Code sessions.

---

## What this is

A two-sided design preference tool for [Helium](https://helium.works) studio, live at `https://helium-works.github.io/visual-taste/`.

- **Admin side** (`/#/admin`) — the designer configures a client's brand (font, primary colour, secondary colour) and generates a shareable URL. The "Prompt generator" sub-page (`/#/admin/prompt`) takes the returned questionnaire email + a wireframe HTML and produces a comprehensive Claude design brief.
- **Client side** (`/#/` with URL params) — a 15-step form that renders entirely in the client's own font and colours. Every question uses live visual previews so the client chooses between options they can actually see and feel. **Mobile-first** — clients typically open their link on a phone.

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

**Never commit real credentials.** Keys live in `.env.local` (gitignored via `*.local`).

```bash
cp .env.example .env.local   # then fill in all values
```

| Env var | Purpose |
|---------|---------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_ADMIN_PASSPHRASE_HASH` | SHA-256 hex of admin passphrase (see below) |

> **EmailJS note:** All three IDs are intentionally client-exposed (that's how EmailJS works). Main risk is spam — mitigate in the EmailJS dashboard: restrict allowed origins to `helium-works.github.io`, enable per-IP rate limiting, enable CAPTCHA.

**Admin passphrase** (`VITE_ADMIN_PASSPHRASE_HASH`): SHA-256 hex of the passphrase protecting `/#/admin` and `/#/admin/prompt`. If unset, both routes show a blank 404.

```bash
echo -n 'your-passphrase' | shasum -a 256
# copy the hex (without trailing " -") into .env.local
```

---

## Architecture

### Routing

HashRouter (`react-router-dom`). Hash-based for GitHub Pages static hosting compatibility. Both admin routes are wrapped in `AdminGate`.

| Route | Component |
|-------|-----------|
| `/#/admin` | `AdminGate` → `src/pages/AdminPage.tsx` |
| `/#/admin/prompt` | `AdminGate` → `src/pages/PromptGeneratorPage.tsx` |
| `/#/*` | `src/pages/ClientForm.tsx` (reads URL params) |

### URL param validation

`src/hooks/useUrlParams.ts` validates params **before** they reach CSS:

- `font` — must match `/^[A-Za-z0-9 +\-]{1,50}$/`, else falls back to `DM Sans`.
- `primary` / `secondary` — must be valid 3- or 6-char hex, else falls back to defaults.
- `client` — capped at 100 chars.

Invalid params fall back silently; `isValid: false` is only used to show the "missing params" screen when all four are absent.

### Brand injection model

`src/hooks/useBrandStyles.ts` reads validated params and sets CSS custom properties on `:root`:

| CSS var | Source | Used for |
|---------|--------|----------|
| `--color-primary` | `primary` param (hex) | Buttons, progress bar, accents |
| `--color-secondary` | `secondary` param (hex) | Decorative blobs, card fills |
| `--color-primary-light` | Derived — 10% alpha rgba | Hover fills, selection backgrounds |
| `--color-primary-dark` | Derived — HSL lightness −20% | Active states |
| `--font-brand` | `font` param → Google Fonts | All question content |

Color derivation math lives in `src/utils/color.ts`.

### Form state

Two contexts:

- `LanguageContext` (`src/context/LanguageContext.tsx`) — `lang` ('en' | 'es'), `setLang`, and a memoised `t()` translation helper.
- `FormContext` (`src/context/FormContext.tsx`) — `FormState`, `setField`, and a `registerGoToStep` / `goToStep` pair used by the Review step's edit buttons.

`ClientForm.tsx` owns the step index and passes `onNext`/`onBack` to each step.

---

## Key files

```
src/
├── config/
│   └── emailjs.ts              — reads VITE_* env vars (never hardcode keys here)
├── data/
│   ├── translations.ts         — complete EN + ES strings for all 15 steps
│   └── promptDescriptors.ts   — design descriptor tables: answer ID → { prose, css }
├── hooks/
│   ├── useUrlParams.ts         — parses + validates font/primary/secondary/client
│   └── useBrandStyles.ts       — sets CSS vars + dynamically loads Google Font
├── utils/
│   ├── email.ts                — FormAnswers interface, sendFormEmail, answersToText
│   ├── parseAnswersText.ts     — inverse of answersToText; parses email body → FormAnswers
│   ├── buildDesignPrompt.ts    — pure fn: FormAnswers + wireframe HTML → Claude prompt
│   └── color.ts                — hexToRgb, hexToHsl, hslToHex, derivedColors (shared)
├── pages/
│   ├── AdminPage.tsx           — dark admin dashboard: URL generator + live preview
│   ├── ClientForm.tsx          — step orchestrator (step index, keyboard nav, missing params screen)
│   └── PromptGeneratorPage.tsx — paste answers + wireframe → copy Claude design brief
├── components/
│   ├── AdminGate.tsx           — passphrase gate for admin routes (SHA-256 via Web Crypto)
│   ├── ProgressBar.tsx         — fixed top bar, uses --color-primary
│   ├── StepContainer.tsx       — Framer Motion directional slide wrapper
│   ├── LanguageToggle.tsx      — floating 🌐 EN/ES pill (.lang-toggle CSS class)
│   ├── SelectableCard.tsx      — accessible selectable card (aria-pressed, keyboard + touch)
│   ├── ColorPicker.tsx         — native color input + hex text field (admin only)
│   ├── FontPicker.tsx          — searchable Google Fonts dropdown + live preview (admin only)
│   └── LivePreview.tsx         — 16:9 mini welcome-screen mockup (admin only)
└── steps/                      — one file per step, WelcomeStep.tsx → ReviewStep.tsx
```

---

## Mobile / responsive

Client form is **mobile-first**. Admin is desktop-optimised with minimum-viable phone support.

Key patterns in `src/index.css` (single `@media (max-width: 640px)` block at bottom):

- **Input zoom**: all `input`/`textarea`/`select` get `font-size: max(1em, 16px)` on mobile — prevents iOS Safari auto-zoom on focus.
- **Safe-area**: `.lang-toggle` and `.step-counter` use `top: max(20px, env(safe-area-inset-top))` — clears notch / Dynamic Island.
- **Tap targets**: `.step-nav > *` gets `flex: 1; min-height: 48px`. `.edit-btn` gets 36px min-height. `.lang-toggle` gets 40px.
- **Admin grid**: `.admin-grid` class on the 2-col container — collapses to 1 col on mobile. `.admin-sticky-col` removes `position: sticky` once stacked.
- **Step option grids**: fixed `repeat(2, 1fr)` replaced with `repeat(auto-fill, minmax(160px, 1fr))` in ButtonStyle, CornerRadius, Animation, Navigation steps — collapses naturally.

When adding new steps: use `repeat(auto-fill, minmax(160px, 1fr))` for option grids, not `repeat(2, 1fr)`.

---

## i18n

All strings in `src/data/translations.ts` as two complete objects: `en` and `es`. The `Translations` interface enforces shape at compile time — if you add a key, add it to both languages or the build fails.

```ts
import { useLanguage } from '../context/LanguageContext'
const { t } = useLanguage()
t('cornerTitle')                          // → "How do your corners feel?"
t('welcomeGreeting', { name: 'Diego' })   // → "Hi, Diego"
```

---

## Adding a new step

1. Create `src/steps/YourStep.tsx` — accept `{ onNext, onBack }` props, use `useForm()` + `useLanguage()`.
2. Add translation keys to `src/data/translations.ts` in both `en` and `es`.
3. Add a new field to `FormState` in `src/context/FormContext.tsx` and `FormAnswers` in `src/utils/email.ts`.
4. Register the step in `src/pages/ClientForm.tsx` — increment `TOTAL_STEPS`, add a `case` to `renderStep()`.
5. Add a review section in `src/steps/ReviewStep.tsx`.
6. Add to `answersToText` in `src/utils/email.ts` and `parseAnswersText` in `src/utils/parseAnswersText.ts`.

Use `repeat(auto-fill, minmax(160px, 1fr))` for option grids — collapses on mobile.

---

## Prompt generator workflow

After receiving a client's email:

1. Open `/#/admin/prompt` (enter passphrase if prompted)
2. Paste the questionnaire email body — the parser shows `✓ N answers parsed`
3. Paste or upload your wireframe `.html` file (optional)
4. Click **Generate prompt**
5. Copy into a Claude session or download as `.md`

The generated prompt includes: client identity, brand palette + derived colours, brand personality expansion (prose, not just labels), every design token with exact CSS values, hero/nav/imagery guidance, reference sites, constraints, and the wireframe in a fenced code block. Triple-backticks in the wireframe are escaped automatically.

**Descriptor tables** live in `src/data/promptDescriptors.ts`. Each answer ID maps to `{ prose, css }` — edit these to change what Claude receives. Keep IDs in sync with the option IDs used in `FormState`.

---

## Deployment

```bash
npm run deploy   # runs build then gh-pages -d dist
```

Requirements:
- `.env.local` must exist with all four `VITE_*` keys before building.
- `vite.config.ts` uses `base: './'` for GitHub Pages asset resolution.
- `public/404.html` redirects unknown paths back to `index.html` (SPA shim).
- Repo: `helium-works/visual-taste`, Pages source branch: `gh-pages`.

**GitHub Actions** (optional): store the four keys as repository secrets and expose them as env vars in the workflow.

---

## Design system notes

- **Form chrome**: DM Sans (headings/body), DM Mono (labels/UI text), `#f6f5f1` background, `#121012` ink — Helium's own brand so it recedes behind the client's colours.
- **Signature detail**: diagonal triangle accent in `--color-primary` bottom-right of each step card (opacity 0.04) + CSS noise texture overlay (`.noise-bg`).
- **Framer Motion**: step transitions (`StepContainer`) + animation-level interactive demo (`AnimationStep`). House easing: `cubic-bezier(0.2, 0.7, 0.3, 1)`.
- **No icon library**: inline SVG only. Exception: 🌐 emoji in `LanguageToggle`.
- **CSS custom properties** for brand: set on `:root` by `useBrandStyles`. Tailwind extends with `var(--color-primary)` etc. so `bg-primary` works.
- **Inline styles dominate** the codebase (especially admin pages). Responsive overrides live in `src/index.css` via CSS class selectors — add a class to the element, add the rule in the mobile block.
