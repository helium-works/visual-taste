// Rich descriptors — maps every form answer ID to prose and CSS tokens for the Claude design prompt.

export interface PersonalityDescriptor {
  prose: string
}

export interface RadiusDescriptor {
  px: number
  prose: string
}

export interface ShadowDescriptor {
  css: string
  prose: string
}

export interface ButtonDescriptor {
  prose: string
  cssSample: string
}

export interface DensityDescriptor {
  padding: number
  gap: number
  maxWidth: number
  prose: string
}

export interface HeroDescriptor {
  prose: string
}

export interface ImageryDescriptor {
  prose: string
  placeholder: string
}

export interface NavDescriptor {
  prose: string
}

export interface AnimationDescriptor {
  prose: string
  cssTransition: string
}

export interface ColorModeDescriptor {
  bg: string
  surface: string
  ink: string
  inkMuted: string
  prose: string
}

// ─── Personality ────────────────────────────────────────────────────────────

export const PERSONALITY: Record<string, PersonalityDescriptor> = {
  minimalist: {
    prose: 'Extreme whitespace is the primary design element. No decorative elements, no gradients on surfaces, no drop shadows unless absolutely structural. Typography alone carries hierarchy — size and weight contrast, not colour. Brand colours appear only in micro-accents: a single underline, a dot, a thin rule. Everything unnecessary is removed.',
  },
  bold: {
    prose: 'High visual impact through scale and contrast. Oversized headlines (80–120px), thick borders or full-bleed background fills using the primary colour. Uppercase labels with wide tracking. Buttons are large, chunky, with heavy hover feedback. The page should feel like it commands attention, not requests it.',
  },
  playful: {
    prose: 'Energetic and light-spirited. Slight rotations (±1–3°) on decorative elements, rounded shapes, and bouncy micro-interactions. Mixed font weights within headlines. Brand colours used freely as fills on cards, tags, and backgrounds. The visual rhythm is irregular and joyful rather than strict and metronomic.',
  },
  elegant: {
    prose: 'Refined and reserved. Generous whitespace, fine hairlines (1px or thinner dividers), and a serif-like treatment even if the typeface is a sans — achieved by using weight-300 for most body text and italicising key words instead of bolding them. Brand colours appear as small accents (a thin border, an icon tint) never as bold fills. Every element should feel considered and unhurried.',
  },
  corporate: {
    prose: 'Structured grid, predictable rhythm, neutral ink-on-white. Clear visual hierarchy enforced by strong section dividers and consistent spacing increments. Brand colour is applied as a single accent: the primary call-to-action button, an eyebrow dot, or a thin horizontal rule — never as a full-section background fill. Professional credibility over creative expression.',
  },
  artistic: {
    prose: 'Asymmetric and experimental. Overlapping elements, large typographic elements used as decoration, sections that break the grid deliberately. The secondary colour is used aggressively as a background or large shape. Visual composition matters more than conventional readability rules — expect unexpected negative space and deliberate visual tension.',
  },
  techy: {
    prose: 'Monospace accents for labels, version numbers, or status badges. Sharp edges everywhere. Dark surfaces preferred even in light mode (navy or near-black cards on a lighter background). Code-adjacent visual language: small ALL-CAPS badges, grid lines, precision. Brand colour used as a glowing accent — think terminal-green, neon, or a vivid saturated tint.',
  },
  warm: {
    prose: 'Organic and inviting. Soft gradients between primary and secondary colour on hero backgrounds or illustration fills. Rounded shapes, human-scale typography (no oversized display text). Photos or illustrations that suggest human presence. Micro-details that feel handcrafted: slightly irregular spacing, a subtle paper texture, warm off-white surfaces (#F9F7F4 rather than pure white).',
  },
}

export function personalityCombination(ids: string[]): string {
  if (ids.length === 0) return ''
  if (ids.length === 1) return `The single personality axis is **${ids[0]}**.`
  const [a, b] = ids
  const combos: Record<string, string> = {
    'minimalist+bold': 'The combination of minimalist restraint and bold impact is rare and powerful — large scale, but zero clutter. Everything on the page is there on purpose; what remains hits hard.',
    'bold+minimalist': 'The combination of bold impact and minimalist restraint is rare and powerful — large scale, but zero clutter. Everything on the page is there on purpose; what remains hits hard.',
    'minimalist+elegant': 'Minimal elegance: the quietest, most refined tier. Luxury through absence. Think high-end fashion editorial — near-empty pages where every element is precisely chosen.',
    'elegant+minimalist': 'Minimal elegance: the quietest, most refined tier. Luxury through absence. Think high-end fashion editorial — near-empty pages where every element is precisely chosen.',
    'elegant+corporate': 'Refined corporate — structured hierarchy with an elevated visual finish. Not stiff or bureaucratic, but polished and trustworthy. Think premium B2B SaaS or high-end consultancy.',
    'corporate+elegant': 'Refined corporate — structured hierarchy with an elevated visual finish. Not stiff or bureaucratic, but polished and trustworthy. Think premium B2B SaaS or high-end consultancy.',
    'playful+warm': 'Friendly and inviting with a lot of energy. Organic shapes, vibrant colour use, and expressive typography. Approachable for all ages — community, consumer apps, or family brands.',
    'warm+playful': 'Friendly and inviting with a lot of energy. Organic shapes, vibrant colour use, and expressive typography. Approachable for all ages — community, consumer apps, or family brands.',
    'bold+techy': 'High-voltage technical — loud and precise. Big numbers, vivid accent colours, monospace labels, and dark surfaces with bright highlights. Developer tools, gaming, or security brands.',
    'techy+bold': 'High-voltage technical — loud and precise. Big numbers, vivid accent colours, monospace labels, and dark surfaces with bright highlights. Developer tools, gaming, or security brands.',
    'artistic+bold': 'Creative studio energy. Not just making things look nice, but making bold aesthetic statements. Expect layout experiments, dramatic colour blocking, and typographic art.',
    'bold+artistic': 'Creative studio energy. Not just making things look nice, but making bold aesthetic statements. Expect layout experiments, dramatic colour blocking, and typographic art.',
    'corporate+techy': 'Enterprise tech aesthetic — serious, data-rich, and precise. Think Stripe Docs, Linear, or Notion: monospace accents, structured grids, minimal colour, maximum information density.',
    'techy+corporate': 'Enterprise tech aesthetic — serious, data-rich, and precise. Think Stripe Docs, Linear, or Notion: monospace accents, structured grids, minimal colour, maximum information density.',
  }
  const key = `${a}+${b}`
  return combos[key] ?? `The combination of **${a}** and **${b}** should feel like a considered synthesis of both: take the dominant traits of each and let them inform — without conflicting with — the other.`
}

// ─── Corner Radius ───────────────────────────────────────────────────────────

export const CORNER_RADIUS: Record<string, RadiusDescriptor> = {
  sharp: {
    px: 0,
    prose: 'All corners are razor-sharp at 0px radius — cards, buttons, inputs, image frames, tags, and tooltips. This is load-bearing to the aesthetic; do not round any corner even slightly, including in hover states or focus rings.',
  },
  soft: {
    px: 8,
    prose: '8px radius across all interactive elements and containers. Reads as approachable and modern without tipping into playfulness. Image frames: 8px. Input fields: 8px. Cards: 8px. Buttons: 8px.',
  },
  rounded: {
    px: 16,
    prose: '16px radius — confidently rounded. Cards and modals use 16px; buttons use 10–14px (slightly less than containers to avoid visual imbalance); input fields use 12px. Image frames: 16px.',
  },
  pill: {
    px: 9999,
    prose: 'Fully pill-shaped buttons (border-radius: 9999px). Cards use 24–32px rounded corners (not full-pill, but generously curved). Input fields: 12–16px. Tags and badges: pill (9999px). The pill shape on buttons is the signature detail — it must be consistent across every CTA.',
  },
}

// ─── Shadow Depth ────────────────────────────────────────────────────────────

export const SHADOW: Record<string, ShadowDescriptor> = {
  none: {
    css: 'none',
    prose: 'Flat surfaces — no shadow on any card, button, panel, or modal. Depth and hierarchy come from background colour contrast and spacing alone. Do not add even a 1px border-shadow as compensation.',
  },
  subtle: {
    css: '0 1px 3px rgba(0,0,0,0.08)',
    prose: 'Almost-imperceptible lift. Use `box-shadow: 0 1px 3px rgba(0,0,0,0.08)` on cards. Do not stack or compound shadows. The card should feel like it is barely lifted off the page, not floating.',
  },
  medium: {
    css: '0 4px 12px rgba(0,0,0,0.12)',
    prose: 'Clear, grounded elevation. Use `box-shadow: 0 4px 12px rgba(0,0,0,0.12)` on cards at rest. Hover state lifts to `0 8px 24px rgba(0,0,0,0.14)`. Cards feel like physical surfaces on a lit table.',
  },
  dramatic: {
    css: '0 8px 30px rgba(0,0,0,0.18)',
    prose: 'Strong floating presence. Use `box-shadow: 0 8px 30px rgba(0,0,0,0.18)` for primary surfaces (hero cards, feature panels, modals). Secondary cards use `0 4px 16px rgba(0,0,0,0.12)`. Reserve the heaviest shadow for the most important element per section.',
  },
}

// ─── Button Style ────────────────────────────────────────────────────────────

export const BUTTON_STYLE: Record<string, ButtonDescriptor> = {
  solid: {
    prose: 'Solid filled primary buttons: background is the primary colour, text is white (#fff). No border. Hover: opacity 0.88 and a 1–2px upward translate. Active: scale(0.98). Secondary actions use the same shape but transparent background + primary-colour border.',
    cssSample: `.btn-primary {
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: var(--radius);
  font-weight: 500;
  transition: opacity 0.2s, transform 0.2s;
}
.btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }`,
  },
  outlined: {
    prose: 'Outlined buttons: transparent background with a 2px solid border in the primary colour, primary-coloured text. Hover: primary-light (10% opacity) background fill appears. No filled background at rest. This style should be used for secondary CTAs alongside a solid primary button.',
    cssSample: `.btn-primary {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
  padding: 10px 24px;
  border-radius: var(--radius);
  font-weight: 500;
  transition: background 0.2s;
}
.btn-primary:hover { background: rgba(var(--primary-rgb), 0.10); }`,
  },
  ghost: {
    prose: 'Ghost buttons: no background, no border — only the text label in the primary colour. Hover: a soft primary-light fill (10% opacity) appears as the background. This style works for tertiary actions or navigation-adjacent CTAs. It must not be the only CTA variant on a page — pair with a visible anchor.',
    cssSample: `.btn-primary {
  background: transparent;
  color: var(--primary);
  border: none;
  padding: 12px 24px;
  border-radius: var(--radius);
  font-weight: 500;
  transition: background 0.2s;
}
.btn-primary:hover { background: rgba(var(--primary-rgb), 0.10); }`,
  },
  solidIcon: {
    prose: 'Solid filled button with a right-pointing arrow icon (→ or a true SVG arrow) as a trailing element. The arrow lives inside the button pill, separated by a small gap (8px). On hover, the arrow translates 4px to the right while the button itself lifts 1px. The label + arrow combination signals forward motion — use it for primary CTAs ("Get started →", "View project →").',
    cssSample: `.btn-primary {
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: var(--radius);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s, transform 0.2s;
}
.btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
.btn-primary:hover .arrow { transform: translateX(4px); }
.arrow { transition: transform 0.2s; display: inline-block; }`,
  },
}

// ─── Layout Density ──────────────────────────────────────────────────────────

export const DENSITY: Record<string, DensityDescriptor> = {
  Spacious: {
    padding: 48,
    gap: 32,
    maxWidth: 1120,
    prose: 'Generous whitespace throughout. Section top/bottom padding: 80–140px. Card internal padding: 40–48px. Grid gaps: 28–32px. Content max-width: 1120px centered. Display headings run large (clamp 48px–96px). Line-height on body text: 1.65. The page breathes — elements never feel crowded.',
  },
  Balanced: {
    padding: 28,
    gap: 20,
    maxWidth: 1200,
    prose: 'Moderate breathing room. Section padding: 60–100px. Card padding: 28–32px. Grid gaps: 16–20px. Content max-width: 1200px. Standard display sizes (clamp 36px–72px). Line-height: 1.55. Information is easy to scan without feeling sparse.',
  },
  Dense: {
    padding: 16,
    gap: 12,
    maxWidth: 1280,
    prose: 'Compact, information-rich layout. Section padding: 32–60px. Card padding: 16–20px. Grid gaps: 8–12px. Content max-width: 1280px. Smaller display sizes (clamp 28px–52px). Line-height: 1.45. More content is visible without scrolling — appropriate for dashboards, data-heavy sections, or tool-like products.',
  },
}

// ─── Hero Style ──────────────────────────────────────────────────────────────

export const HERO_STYLE: Record<string, HeroDescriptor> = {
  fullscreen: {
    prose: 'Full-viewport photo hero. A large image (or gradient placeholder) fills 100vh. A dark scrim overlay (linear-gradient from rgba(0,0,0,0.5) to transparent) sits above the image. Headline and subtext are white, centred or left-aligned at the bottom third of the viewport. Primary CTA button floats above the scrim. The image should use an `<img>` with a coloured SVG placeholder in the brand secondary colour if no real photo is available.',
  },
  video: {
    prose: 'Video background hero. The video area is 100vh (or 80vh on mobile where autoplay is disabled). A centred ▶ play icon (40px, white, inside a translucent circular button) sits in the middle for the paused state. Text content (headline + CTA) overlays the bottom third. Since no real video exists yet, render a dark gradient placeholder with the play icon centred over it.',
  },
  typography: {
    prose: 'Typography-dominant hero — no background imagery. A single massive display headline (clamp 56px–120px, weight 400, letter-spacing −0.04em) takes up most of the viewport height. A short subline (16–20px) sits below. The primary CTA button sits at the bottom of the type block. The background is the page surface colour. Brand colour can tint a single word or italicise the last word for warmth. No photos or illustrations compete with the text.',
  },
  illustrated: {
    prose: 'Illustrated hero. A custom abstract illustration (geometric shapes, brand-coloured blobs, or flat figures — NOT a photo) lives alongside the headline. On desktop: two-column split (text left, illustration right). On mobile: illustration stacks below the text or is used as a decorative background element. Use inline SVG shapes in primary and secondary colours to represent the illustration. The illustration should feel native to the brand, not stock.',
  },
  split: {
    prose: 'Classic split hero. 50/50 two-column grid on desktop. Left side: headline, subline, CTA button, stacked vertically with generous padding. Right side: a large image frame (aspect-ratio 4/5 or 1/1) with an SVG placeholder filled in a gradient from secondary to primary colour. On mobile: single column, image stacks below text (or is hidden on very small screens). The divider between columns should be invisible — no border, just spacing.',
  },
}

// ─── Imagery Style ───────────────────────────────────────────────────────────

export const IMAGERY_STYLE: Record<string, ImageryDescriptor> = {
  photography: {
    prose: 'Real photography — landscapes, people, or product shots. Use `<img>` elements with descriptive alt text and a gradient placeholder (linear-gradient from secondary-light to primary-light) for any image that has not been supplied. All photos should be set to object-fit: cover in their frames. Aspect ratios: hero 16/9 or 3/2, cards 4/3.',
    placeholder: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)',
  },
  illustration: {
    prose: 'Flat vector illustration style. Characters, objects, and scenes are rendered in simplified geometric shapes using the brand palette. Use inline `<svg>` elements to represent illustrations — simple circles, rectangles, and paths are sufficient as stand-ins. Illustration fills use the primary and secondary colours at various opacities. No photos anywhere.',
    placeholder: 'Inline SVG geometric shapes in primary and secondary colours',
  },
  '3d': {
    prose: '3D-rendered or abstract gradient imagery. Each image placeholder should be a div with a radial or conic gradient using the primary and secondary colours, plus a subtle drop-shadow, to suggest depth and 3D rendering. Blob shapes (border-radius combinations like 60% 40% 70% 30% / 30% 60% 40% 70%) work well as abstract 3D proxies. No flat 2D shapes.',
    placeholder: 'Radial/conic gradient blob with primary→secondary colour and subtle shadow',
  },
  icons: {
    prose: 'Icon-first visual language. Each feature, benefit, or section is anchored by a large icon (32–64px) rather than a photo or illustration. Icons should be inline SVG, stroke-based (not filled), using the primary colour. Icon backgrounds: a soft circle or square in primary-light (10% opacity). Grid layouts are preferred — 3-up or 4-up icon grids with labels below.',
    placeholder: 'Inline SVG icon (24×24 stroke, primary colour) inside a primary-light background circle',
  },
  mixed: {
    prose: 'Mixed media — combine photography placeholders, icons, and abstract shapes in the same layout. Different sections use different visual treatments: the hero uses a photo, a features section uses icons, a testimonials section uses abstract shapes. This creates visual variety and energy across the page scroll. Maintain brand colour consistency across all visual types.',
    placeholder: 'Context-dependent: gradient placeholder for photos, SVG for icons, blobs for abstract sections',
  },
}

// ─── Navigation Style ────────────────────────────────────────────────────────

export const NAVIGATION_STYLE: Record<string, NavDescriptor> = {
  topbar: {
    prose: 'Horizontal top navigation bar. Fixed to the top of the viewport (position: sticky or fixed, z-index 80). Left: logo or wordmark. Centre or right: 4–6 nav links at 14px, spaced 24–32px apart, using the ink colour at 0.75 opacity (active: 1.0 opacity, font-weight 500). Far right: a primary CTA button ("Get started", "Sign up"). On scroll: the bar acquires a white/translucent background with backdrop-filter: blur(12px) and a hairline bottom border. On mobile (below 768px): hide nav links, show a hamburger icon.',
  },
  hamburger: {
    prose: 'Mobile-first hamburger navigation. Desktop still shows a minimal top bar with logo + hamburger (☰). On click: a full-screen or full-height drawer slides in from the right (or fades in as an overlay). Inside: large nav links (24–28px, stacked vertically with generous padding), a CTA button at the bottom, and a close (×) button at top-right. The drawer uses the page surface colour and a heavy drop-shadow on the edge.',
  },
  mega: {
    prose: 'Mega-menu navigation. Top bar with logo, nav links, and CTA. One or more nav links trigger a full-width dropdown panel on hover/click. The panel spans the full browser width, sits below the nav bar (not overlapping), and contains a multi-column grid of links organised into categories with short descriptions. Panel background: white. Close on outside click. On mobile: collapse to an accordion inside a regular hamburger menu.',
  },
  sidebar: {
    prose: 'Sticky left-sidebar navigation. The sidebar is 220–260px wide, fixed to the left edge, full viewport height. Contains the logo at the top, stacked vertical nav links (14–16px, left-padded 20–24px), and a CTA or user avatar at the bottom. Content area fills the remaining viewport width (calc(100% - 240px)). On mobile (below 768px): sidebar collapses to a slide-in drawer triggered by a hamburger icon in a minimal top bar.',
  },
}

// ─── Animation Level ─────────────────────────────────────────────────────────

export const ANIMATION_LEVEL: Record<string, AnimationDescriptor> = {
  none: {
    prose: 'No motion whatsoever. All elements appear instantly — no fade-ins, slide-ins, or hover transitions. Static layout only. Even interactive elements (buttons, links) should avoid transform or opacity transitions. Accessibility-first: this matches prefers-reduced-motion: reduce behaviour.',
    cssTransition: '/* none */',
  },
  subtle: {
    prose: 'Gentle fade-in on scroll. Elements enter with a simple opacity 0→1 transition over 500ms (ease-out). No transform — content appears in place, not sliding. Buttons and links: opacity 0.85 on hover over 200ms. No spring physics, no scale transforms.',
    cssTransition: 'transition: opacity 0.5s ease-out;  /* scroll entry */\ntransition: opacity 0.2s;  /* hover */',
  },
  moderate: {
    prose: 'Scroll-triggered slide-up with spring physics. Elements enter with opacity 0→1 + translateY(16px)→0, using cubic-bezier(0.2,0.7,0.3,1) over 600–700ms, staggered 80–120ms between items. Cards lift 4px on hover with a shadow increase over 300ms. Interactive elements use scale(0.98) on active. Spring feel without overshoot.',
    cssTransition: 'transition: opacity 0.6s cubic-bezier(0.2,0.7,0.3,1), transform 0.6s cubic-bezier(0.2,0.7,0.3,1);\n/* Initial: opacity:0; transform:translateY(16px); */',
  },
  dynamic: {
    prose: 'Full spring physics with overshoot and layered parallax effects. Elements enter with translateY(24px)→0 + opacity 0→1 using a spring (stiffness 400, damping 14) — they overshoot slightly and settle. Cards have a 3D tilt effect on hover (rotateX/Y ±5°, perspective 800px). Background decorative elements move at a reduced scroll speed (parallax factor 0.3–0.5). Sections reveal with staggered children (0.08s delay per item). Use motion purposefully: entrance, hover, and exit all have distinct but coordinated behaviours.',
    cssTransition: '/* Spring physics — use Framer Motion or Web Animations API */\n/* spring: stiffness 400, damping 14, overshoot allowed */',
  },
}

// ─── Color Mode ──────────────────────────────────────────────────────────────

export const COLOR_MODE: Record<string, ColorModeDescriptor> = {
  light: {
    bg: '#FFFFFF',
    surface: '#F6F5F1',
    ink: '#121012',
    inkMuted: 'rgba(18,16,18,0.56)',
    prose: 'Light mode. Primary page background: #FFFFFF. Alternating section background: #F6F5F1 (warm off-white, not cool grey). Text: #121012 (near-black, not pure black). Muted text: rgba(18,16,18,0.56). Brand colours used as accent — primary for CTAs and highlights, secondary for decorative elements and background blobs. Do not use pure white (#FFF) and cool grey (#F1F3F5) together — the warm off-white pair is required.',
  },
  dark: {
    bg: '#0E0E10',
    surface: '#18181C',
    ink: '#E8E6E3',
    inkMuted: 'rgba(232,230,227,0.55)',
    prose: 'Dark mode. Primary page background: #0E0E10 (near-black). Card/surface background: #18181C. Text: #E8E6E3 (warm off-white). Muted text: rgba(232,230,227,0.55). Brand colours glow more vividly against dark backgrounds — use them as accents, glows (blur + opacity on background blobs), and button backgrounds. Hairline borders: rgba(255,255,255,0.10). Do not use stark white (#FFF) on the dark background.',
  },
  both: {
    bg: '#FFFFFF / #0E0E10',
    surface: '#F6F5F1 / #18181C',
    ink: '#121012 / #E8E6E3',
    inkMuted: 'rgba(18,16,18,0.56) / rgba(232,230,227,0.55)',
    prose: 'The client wants to support both light and dark modes. Implement using CSS custom properties inside @media (prefers-color-scheme: dark). Light mode values are the default (see light mode specs). Dark mode overrides all surface, ink, and border colours. Brand accent colours should work in both — the primary colour should be readable against both light (#FFFFFF) and dark (#0E0E10) backgrounds. Check contrast ratios for both modes.',
  },
}
