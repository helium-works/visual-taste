export type Language = 'en' | 'es'

export interface Translations {
  // Welcome
  welcomeGreeting: string
  welcomeSubtext: string
  welcomeEnglish: string
  welcomeSpanish: string
  welcomeSelectLang: string

  // Step labels
  stepOf: string
  back: string
  next: string
  skip: string

  // Step 2 - Personality
  personalityTitle: string
  personalitySubtext: string
  personalityCount: string
  personalityCountOf: string
  personality_minimalist: string
  personality_bold: string
  personality_playful: string
  personality_elegant: string
  personality_corporate: string
  personality_artistic: string
  personality_techy: string
  personality_warm: string

  // Step 3 - Corner Radius
  cornerTitle: string
  cornerSubtext: string
  corner_sharp: string
  corner_sharp_sub: string
  corner_soft: string
  corner_soft_sub: string
  corner_rounded: string
  corner_rounded_sub: string
  corner_pill: string
  corner_pill_sub: string

  // Step 4 - Shadow
  shadowTitle: string
  shadowSubtext: string
  shadow_none: string
  shadow_none_sub: string
  shadow_subtle: string
  shadow_subtle_sub: string
  shadow_medium: string
  shadow_medium_sub: string
  shadow_dramatic: string
  shadow_dramatic_sub: string

  // Step 5 - Button Style
  buttonTitle: string
  buttonSubtext: string
  button_solid: string
  button_outlined: string
  button_ghost: string
  button_solidIcon: string
  buttonCTA: string

  // Step 6 - Layout Density
  densityTitle: string
  densitySubtext: string
  density_spacious: string
  density_balanced: string
  density_dense: string
  densityPreviewHeading: string
  densityPreviewBody: string
  densityPreviewButton: string

  // Step 7 - Hero Style
  heroTitle: string
  heroSubtext: string
  hero_fullscreen: string
  hero_fullscreen_sub: string
  hero_video: string
  hero_video_sub: string
  hero_typography: string
  hero_typography_sub: string
  hero_illustrated: string
  hero_illustrated_sub: string
  hero_split: string
  hero_split_sub: string

  // Step 8 - Imagery
  imageryTitle: string
  imagerySubtext: string
  imagery_photography: string
  imagery_illustration: string
  imagery_3d: string
  imagery_icons: string
  imagery_mixed: string

  // Step 9 - Navigation
  navTitle: string
  navSubtext: string
  nav_topbar: string
  nav_hamburger: string
  nav_mega: string
  nav_sidebar: string

  // Step 10 - Animation
  animTitle: string
  animSubtext: string
  anim_none: string
  anim_none_sub: string
  anim_subtle: string
  anim_subtle_sub: string
  anim_moderate: string
  anim_moderate_sub: string
  anim_dynamic: string
  anim_dynamic_sub: string
  animPreviewTitle: string
  animPreviewBody: string

  // Step 11 - Color Mode
  colorModeTitle: string
  colorModeSubtext: string
  colorMode_light: string
  colorMode_dark: string
  colorMode_both: string
  colorMode_both_sub: string

  // Step 12 - Websites Admire
  admireTitle: string
  admireSubtext: string
  admirePlaceholder: string
  admireNotePlaceholder: string

  // Step 13 - Websites Dislike
  dislikeTitle: string
  dislikeSubtext: string
  dislikeHint: string
  dislikePlaceholder: string
  dislikeNotePlaceholder: string

  // Step 14 - Notes
  notesTitle: string
  notesSubtext: string
  notesPlaceholder: string

  // Step 15 - Review
  reviewTitle: string
  reviewSubtext: string
  reviewEdit: string
  submitButton: string
  submitting: string

  // Review section labels
  reviewPersonality: string
  reviewCorner: string
  reviewShadow: string
  reviewButton: string
  reviewDensity: string
  reviewHero: string
  reviewImagery: string
  reviewNavigation: string
  reviewAnimation: string
  reviewColorMode: string
  reviewAdmire: string
  reviewDislike: string
  reviewNotes: string
  reviewNone: string
  reviewSkipped: string

  // Success / Error
  successTitle: string
  successSubtext: string
  errorTitle: string
  errorSubtext: string
  errorRetry: string
  errorCopy: string
  errorCopied: string

  // Missing params
  missingTitle: string
  missingSubtext: string
  missingParams: string

  // Language toggle
  langToggle: string
}

const en: Translations = {
  // Welcome
  welcomeGreeting: 'Hi, {name}',
  welcomeSubtext: "Let's discover the visual personality of your website",
  welcomeEnglish: 'English',
  welcomeSpanish: 'Español',
  welcomeSelectLang: 'Choose your language',

  // Step labels
  stepOf: 'of',
  back: '← Back',
  next: 'Next →',
  skip: 'Skip this step',

  // Step 2 - Personality
  personalityTitle: 'What is your brand personality?',
  personalitySubtext: 'Pick exactly 2 that feel most like you',
  personalityCount: 'selected',
  personalityCountOf: '/2',
  personality_minimalist: 'Minimalist',
  personality_bold: 'Bold',
  personality_playful: 'Playful',
  personality_elegant: 'Elegant',
  personality_corporate: 'Corporate',
  personality_artistic: 'Artistic',
  personality_techy: 'Techy',
  personality_warm: 'Warm',

  // Step 3 - Corner Radius
  cornerTitle: 'How do your corners feel?',
  cornerSubtext: 'This shapes every card, button, and container',
  corner_sharp: 'Sharp',
  corner_sharp_sub: 'Angular / Precise',
  corner_soft: 'Slightly Rounded',
  corner_soft_sub: 'Soft / Gentle',
  corner_rounded: 'Rounded',
  corner_rounded_sub: 'Rounded / Balanced',
  corner_pill: 'Pill',
  corner_pill_sub: 'Pill / Fluid',

  // Step 4 - Shadow
  shadowTitle: 'How much depth do you want?',
  shadowSubtext: 'Shadows create a sense of elevation and dimension',
  shadow_none: 'Flat',
  shadow_none_sub: 'No shadows — fully flat',
  shadow_subtle: 'Subtle',
  shadow_subtle_sub: 'Barely-there lift',
  shadow_medium: 'Medium',
  shadow_medium_sub: 'Clear depth, grounded',
  shadow_dramatic: 'Dramatic',
  shadow_dramatic_sub: 'Strong presence, floating',

  // Step 5 - Button Style
  buttonTitle: 'How do your call-to-action buttons look?',
  buttonSubtext: 'Interact with each to feel the difference',
  button_solid: 'Solid',
  button_outlined: 'Outlined',
  button_ghost: 'Ghost',
  button_solidIcon: 'Solid + Icon',
  buttonCTA: 'Get started',

  // Step 6 - Layout Density
  densityTitle: 'How much breathing room do you want?',
  densitySubtext: 'Drag to find your ideal spacing',
  density_spacious: 'Spacious',
  density_balanced: 'Balanced',
  density_dense: 'Dense',
  densityPreviewHeading: 'Your website headline',
  densityPreviewBody: 'This is how body text will feel with this spacing. Comfortable, clear, and easy to read.',
  densityPreviewButton: 'Learn more →',

  // Step 7 - Hero Style
  heroTitle: 'What does your hero section look like?',
  heroSubtext: 'The first thing visitors see when they land',
  hero_fullscreen: 'Full-screen photo',
  hero_fullscreen_sub: 'Immersive image fills the viewport',
  hero_video: 'Video background',
  hero_video_sub: 'Atmospheric motion behind your message',
  hero_typography: 'Typography-focused',
  hero_typography_sub: 'Headline takes center stage',
  hero_illustrated: 'Illustrated',
  hero_illustrated_sub: 'Abstract shapes & brand illustration',
  hero_split: 'Split layout',
  hero_split_sub: 'Text left, visual right — classic',

  // Step 8 - Imagery
  imageryTitle: 'What kind of visuals represent you?',
  imagerySubtext: 'Choose the imagery style that resonates most',
  imagery_photography: 'Photography',
  imagery_illustration: 'Illustrations',
  imagery_3d: '3D / Abstract',
  imagery_icons: 'Icon-heavy',
  imagery_mixed: 'Mixed',

  // Step 9 - Navigation
  navTitle: 'How do visitors navigate your site?',
  navSubtext: 'Pick the navigation style that fits your content',
  nav_topbar: 'Simple top bar',
  nav_hamburger: 'Hamburger',
  nav_mega: 'Mega menu',
  nav_sidebar: 'Sticky sidebar',

  // Step 10 - Animation
  animTitle: 'How much should things move?',
  animSubtext: 'Tap each option — the preview will show you',
  anim_none: 'None',
  anim_none_sub: 'Static, no movement',
  anim_subtle: 'Subtle',
  anim_subtle_sub: 'Gentle fades',
  anim_moderate: 'Moderate',
  anim_moderate_sub: 'Slides with spring',
  anim_dynamic: 'Dynamic',
  anim_dynamic_sub: 'Layered motion',
  animPreviewTitle: 'Preview',
  animPreviewBody: 'This shows how content enters the page.',

  // Step 11 - Color Mode
  colorModeTitle: 'Light mode or dark mode?',
  colorModeSubtext: 'This sets the overall tone of your site',
  colorMode_light: 'Light mode',
  colorMode_dark: 'Dark mode',
  colorMode_both: 'You decide',
  colorMode_both_sub: 'Let visitors choose',

  // Step 12 - Websites Admire
  admireTitle: 'Share up to 3 websites whose design you love',
  admireSubtext: "These help us understand what feels right to you",
  admirePlaceholder: 'https://example.com',
  admireNotePlaceholder: 'What you love about it (hero, typography, animations…)',

  // Step 13 - Websites Dislike
  dislikeTitle: "Are there any websites whose design you don't like?",
  dislikeSubtext: 'Optional — skip if nothing comes to mind',
  dislikeHint: 'This helps us know what to avoid',
  dislikePlaceholder: 'https://example.com',
  dislikeNotePlaceholder: "What doesn't work (clutter, motion, colors…)",

  // Step 14 - Notes
  notesTitle: 'Anything else we should know?',
  notesSubtext: 'Any thoughts, references, or feelings about your brand',
  notesPlaceholder: 'Feel free to share anything — colors you love or hate, brands you admire, vibes you want to capture...',

  // Step 15 - Review
  reviewTitle: 'Here\'s your design vision',
  reviewSubtext: 'Review everything below and hit submit when you\'re ready',
  reviewEdit: 'Edit',
  submitButton: 'Submit my preferences →',
  submitting: 'Sending...',

  // Review labels
  reviewPersonality: 'Brand personality',
  reviewCorner: 'Corner radius',
  reviewShadow: 'Shadow depth',
  reviewButton: 'Button style',
  reviewDensity: 'Layout density',
  reviewHero: 'Hero section',
  reviewImagery: 'Imagery style',
  reviewNavigation: 'Navigation',
  reviewAnimation: 'Animation level',
  reviewColorMode: 'Color mode',
  reviewAdmire: 'Sites I love',
  reviewDislike: 'Sites to avoid',
  reviewNotes: 'Additional notes',
  reviewNone: 'None provided',
  reviewSkipped: 'Skipped',

  // Success / Error
  successTitle: 'Thank you, {name}!',
  successSubtext: "We've received your design preferences. We'll reach out soon to share what we're envisioning for your site.",
  errorTitle: 'Something went wrong',
  errorSubtext: "Your responses didn't send — please try again, or copy them below.",
  errorRetry: 'Try again',
  errorCopy: 'Copy my responses',
  errorCopied: 'Copied ✓',

  // Missing params
  missingTitle: 'This link is incomplete',
  missingSubtext: 'This URL is missing some required parameters. Please contact us for a fresh link.',
  missingParams: 'Missing:',

  // Lang toggle
  langToggle: 'EN',
}

const es: Translations = {
  // Welcome
  welcomeGreeting: 'Hola, {name}',
  welcomeSubtext: 'Vamos a descubrir la personalidad visual de tu sitio web',
  welcomeEnglish: 'English',
  welcomeSpanish: 'Español',
  welcomeSelectLang: 'Elige tu idioma',

  // Step labels
  stepOf: 'de',
  back: '← Atrás',
  next: 'Siguiente →',
  skip: 'Saltar este paso',

  // Step 2 - Personality
  personalityTitle: '¿Cuál es la personalidad de tu marca?',
  personalitySubtext: 'Elige exactamente 2 que más te representen',
  personalityCount: 'seleccionado',
  personalityCountOf: '/2',
  personality_minimalist: 'Minimalista',
  personality_bold: 'Audaz',
  personality_playful: 'Juguetón',
  personality_elegant: 'Elegante',
  personality_corporate: 'Corporativo',
  personality_artistic: 'Artístico',
  personality_techy: 'Tecnológico',
  personality_warm: 'Cálido',

  // Step 3 - Corner Radius
  cornerTitle: '¿Cómo se sienten tus esquinas?',
  cornerSubtext: 'Esto define cada tarjeta, botón y contenedor',
  corner_sharp: 'Angular',
  corner_sharp_sub: 'Angular / Preciso',
  corner_soft: 'Ligeramente redondeado',
  corner_soft_sub: 'Soft / Suave',
  corner_rounded: 'Redondeado',
  corner_rounded_sub: 'Rounded / Redondeado',
  corner_pill: 'Píldora',
  corner_pill_sub: 'Pill / Píldora',

  // Step 4 - Shadow
  shadowTitle: '¿Cuánta profundidad quieres?',
  shadowSubtext: 'Las sombras crean sensación de elevación',
  shadow_none: 'Plano',
  shadow_none_sub: 'Sin sombras — completamente plano',
  shadow_subtle: 'Sutil',
  shadow_subtle_sub: 'Elevación casi imperceptible',
  shadow_medium: 'Medio',
  shadow_medium_sub: 'Profundidad clara, anclado',
  shadow_dramatic: 'Dramático',
  shadow_dramatic_sub: 'Presencia fuerte, flotante',

  // Step 5 - Button Style
  buttonTitle: '¿Cómo se ven tus botones de llamada a la acción?',
  buttonSubtext: 'Interactúa con cada uno para sentir la diferencia',
  button_solid: 'Sólido',
  button_outlined: 'Contorno',
  button_ghost: 'Fantasma',
  button_solidIcon: 'Sólido + Ícono',
  buttonCTA: 'Comenzar',

  // Step 6 - Layout Density
  densityTitle: '¿Cuánto espacio quieres?',
  densitySubtext: 'Desliza para encontrar el espaciado ideal',
  density_spacious: 'Espacioso',
  density_balanced: 'Equilibrado',
  density_dense: 'Compacto',
  densityPreviewHeading: 'El titular de tu sitio',
  densityPreviewBody: 'Así se verá el texto con este espaciado. Cómodo, claro y fácil de leer.',
  densityPreviewButton: 'Saber más →',

  // Step 7 - Hero Style
  heroTitle: '¿Cómo se ve tu sección principal?',
  heroSubtext: 'Lo primero que ven los visitantes al llegar',
  hero_fullscreen: 'Foto a pantalla completa',
  hero_fullscreen_sub: 'Imagen inmersiva que llena la pantalla',
  hero_video: 'Fondo de video',
  hero_video_sub: 'Movimiento atmosférico detrás del mensaje',
  hero_typography: 'Tipografía protagonista',
  hero_typography_sub: 'El titular ocupa todo el espacio',
  hero_illustrated: 'Ilustrado',
  hero_illustrated_sub: 'Formas abstractas e ilustración de marca',
  hero_split: 'Diseño dividido',
  hero_split_sub: 'Texto izquierda, visual derecha',

  // Step 8 - Imagery
  imageryTitle: '¿Qué tipo de visuales te representan?',
  imagerySubtext: 'Elige el estilo de imágenes que más resuena',
  imagery_photography: 'Fotografía',
  imagery_illustration: 'Ilustraciones',
  imagery_3d: '3D / Abstracto',
  imagery_icons: 'Íconos',
  imagery_mixed: 'Mixto',

  // Step 9 - Navigation
  navTitle: '¿Cómo navegan los visitantes por tu sitio?',
  navSubtext: 'Elige el estilo de navegación que se adapte a tu contenido',
  nav_topbar: 'Barra superior simple',
  nav_hamburger: 'Hamburguesa',
  nav_mega: 'Menú mega',
  nav_sidebar: 'Barra lateral fija',

  // Step 10 - Animation
  animTitle: '¿Cuánto deben moverse las cosas?',
  animSubtext: 'Toca cada opción — la vista previa te lo mostrará',
  anim_none: 'Ninguna',
  anim_none_sub: 'Estático, sin movimiento',
  anim_subtle: 'Sutil',
  anim_subtle_sub: 'Apariciones suaves',
  anim_moderate: 'Moderado',
  anim_moderate_sub: 'Deslizamientos con resorte',
  anim_dynamic: 'Dinámico',
  anim_dynamic_sub: 'Movimiento en capas',
  animPreviewTitle: 'Vista previa',
  animPreviewBody: 'Así es como el contenido entra a la página.',

  // Step 11 - Color Mode
  colorModeTitle: '¿Modo claro u oscuro?',
  colorModeSubtext: 'Esto define el tono general de tu sitio',
  colorMode_light: 'Modo claro',
  colorMode_dark: 'Modo oscuro',
  colorMode_both: 'Tú decides',
  colorMode_both_sub: 'Dejar que los visitantes elijan',

  // Step 12 - Websites Admire
  admireTitle: 'Comparte hasta 3 sitios web cuyo diseño te encante',
  admireSubtext: 'Nos ayudan a entender qué se siente bien para ti',
  admirePlaceholder: 'https://ejemplo.com',
  admireNotePlaceholder: 'Qué te gusta (hero, tipografía, animaciones…)',

  // Step 13 - Websites Dislike
  dislikeTitle: '¿Hay algún sitio web cuyo diseño NO te guste?',
  dislikeSubtext: 'Opcional — salta si no se te ocurre nada',
  dislikeHint: 'Esto nos ayuda a saber qué evitar',
  dislikePlaceholder: 'https://ejemplo.com',
  dislikeNotePlaceholder: 'Qué no funciona (saturación, movimiento, colores…)',

  // Step 14 - Notes
  notesTitle: '¿Algo más que debamos saber?',
  notesSubtext: 'Cualquier pensamiento, referencia o sentimiento sobre tu marca',
  notesPlaceholder: 'Siéntete libre de compartir — colores que amas o detestas, marcas que admiras, sensaciones que quieres capturar...',

  // Step 15 - Review
  reviewTitle: 'Aquí está tu visión de diseño',
  reviewSubtext: 'Revisa todo a continuación y envía cuando estés listo',
  reviewEdit: 'Editar',
  submitButton: 'Enviar mis preferencias →',
  submitting: 'Enviando...',

  // Review labels
  reviewPersonality: 'Personalidad de marca',
  reviewCorner: 'Radio de esquinas',
  reviewShadow: 'Profundidad de sombra',
  reviewButton: 'Estilo de botones',
  reviewDensity: 'Densidad de layout',
  reviewHero: 'Sección principal',
  reviewImagery: 'Estilo de imágenes',
  reviewNavigation: 'Navegación',
  reviewAnimation: 'Nivel de animación',
  reviewColorMode: 'Modo de color',
  reviewAdmire: 'Sitios que me encantan',
  reviewDislike: 'Sitios a evitar',
  reviewNotes: 'Notas adicionales',
  reviewNone: 'No proporcionado',
  reviewSkipped: 'Omitido',

  // Success / Error
  successTitle: '¡Gracias, {name}!',
  successSubtext: 'Hemos recibido tus preferencias de diseño. Nos pondremos en contacto pronto para compartir lo que estamos imaginando para tu sitio.',
  errorTitle: 'Algo salió mal',
  errorSubtext: 'Tus respuestas no se enviaron. Por favor intenta de nuevo o cópialas abajo.',
  errorRetry: 'Intentar de nuevo',
  errorCopy: 'Copiar mis respuestas',
  errorCopied: 'Copiado ✓',

  // Missing params
  missingTitle: 'Este enlace está incompleto',
  missingSubtext: 'Esta URL no tiene los parámetros necesarios. Contáctanos para obtener un enlace nuevo.',
  missingParams: 'Falta:',

  // Lang toggle
  langToggle: 'ES',
}

export const translations = { en, es }

export function t(lang: Language, key: keyof Translations, vars?: Record<string, string>): string {
  let str = translations[lang][key] as string
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      str = str.replace(`{${k}}`, v)
    })
  }
  return str
}
