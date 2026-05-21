# Design Taste 🎈

A visual design preference capture tool for [Helium](https://helium.works) studio.

Two sides: the **designer** configures a client's brand and generates a shareable URL. The **client** opens that URL and works through a 15-step form that renders entirely in their own font and colors — so every choice is made in context, not abstract.

---

## Routes

| URL | Who uses it |
|-----|-------------|
| `/#/admin` | Designer — configure brand, generate + copy client URL |
| `/#/admin/prompt` | Designer — paste returned questionnaire + wireframe HTML → copy Claude design brief |
| `/#/?font=DM+Sans&primary=FF6B6B&secondary=00C9A7&client=Acme+Corp` | Client — the full preference form |

If any URL param is missing the client sees a friendly error screen, not a broken UI.

---

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
```

Admin page: `http://localhost:5173/#/admin`  
Client form: `http://localhost:5173/#/?font=DM+Sans&primary=FF6B6B&secondary=00C9A7&client=Test`

---

## EmailJS setup

Keys live in `.env.local` (gitignored). Copy the template and fill in your values:

```bash
cp .env.example .env.local
```

```ini
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Get these from [emailjs.com](https://www.emailjs.com/) → Email Services + Email Templates. Until set, the submit button surfaces the error UI with a "Copy responses" clipboard fallback.

**Never commit real keys** to `src/config/emailjs.ts` or anywhere in the repo — that file now only reads from `import.meta.env.VITE_*`.

---

## Deploy to GitHub Pages

Make sure `.env.local` exists with valid keys first — Vite bakes them into the bundle at build time.

```bash
npm run deploy
```

This runs `npm run build` then `gh-pages -d dist`. Push the `gh-pages` branch to GitHub and enable Pages in repo settings.

Two things that make it work on GitHub Pages:
- `vite.config.ts` sets `base: './'` so assets resolve from any subdirectory.
- `public/404.html` redirects unknown paths back to `index.html` (SPA shim).

---

## The 15 steps

1. **Welcome** — language picker (English / Español), sets i18n for all following steps
2. **Brand personality** — 8 visual mood-board cards, pick exactly 2
3. **Corner radius** — sharp / soft / rounded / pill, shown as live card + button previews
4. **Shadow depth** — flat / subtle / medium / dramatic, shown as live card previews
5. **Button style** — solid / outlined / ghost / solid+icon, interactive hover demos
6. **Layout density** — slider from spacious → balanced → dense with live spacing preview
7. **Hero section** — full-screen photo / video / typography / illustrated / split layout
8. **Imagery style** — photography / illustration / 3D-abstract / icon-heavy / mixed
9. **Navigation** — top bar / hamburger / mega menu / sticky sidebar
10. **Animation level** — none / subtle / moderate / dynamic (preview performs the animation on tap)
11. **Color mode** — light / dark / you decide (split-screen mini-page preview)
12. **Sites you love** — up to 3 URLs, optional
13. **Sites you dislike** — up to 3 URLs, optional
14. **Additional notes** — free-form textarea, optional
15. **Review + submit** — scrollable summary, ✏ edit buttons jump back to any step, EmailJS send

---

## Brand injection model

When the client opens their URL, `src/hooks/useBrandStyles.ts` reads the query params and sets four CSS custom properties on `:root`:

| Variable | Source |
|----------|--------|
| `--color-primary` | `primary` param (hex) |
| `--color-secondary` | `secondary` param (hex) |
| `--color-primary-light` | derived — 10% opacity rgba |
| `--color-primary-dark` | derived — HSL lightness −20% |
| `--font-brand` | `font` param, loaded from Google Fonts |

Every question card, button, and preview uses these variables. The form's structural chrome (progress bar, back/next nav, step counter) uses Helium's design system — warm off-white background, DM Sans, DM Mono for labels — so the client brand pops rather than competes.

---

## i18n

All strings live in `src/data/translations.ts` as two complete objects: `en` and `es`. A floating 🌐 toggle lets clients switch at any point. If you add a key to one language, add it to both — the `Translations` interface enforces the shape at build time.

---

## Tech stack

- **React 19** + **Vite** + **TypeScript**
- **Tailwind CSS v3** — utility classes + CSS custom properties for brand injection
- **Framer Motion** — step transitions, animation-level demo, success screen
- **react-router-dom v7** — HashRouter (`/#/admin` vs `/#/`)
- **@emailjs/browser** — client-side email without a backend

---

## Project structure

```
src/
├── components/    # ProgressBar, StepContainer, LanguageToggle, SelectableCard,
│                  # ColorPicker, FontPicker, LivePreview
├── config/        # emailjs.ts — reads from VITE_* env vars (never hardcode here)
├── context/       # LanguageContext, FormContext
├── data/          # translations.ts (EN + ES), promptDescriptors.ts (design descriptor tables)
├── hooks/         # useUrlParams, useBrandStyles
├── pages/         # AdminPage, ClientForm, PromptGeneratorPage
├── steps/         # one file per step (WelcomeStep → ReviewStep)
└── utils/         # email.ts, parseAnswersText.ts, buildDesignPrompt.ts, color.ts
```

See `CLAUDE.md` for a deeper architecture reference.
