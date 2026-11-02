// ==============================================================================
// FJL — Motor de Temas y Tokens de Diseño (Sección 4 del Documento Maestro)
// ==============================================================================

import { ThemeTokens } from '../types';

export const THEME_PRESETS: Record<string, ThemeTokens> = {
  // 1. Salud & Clínica (Dental FJL)
  'dental-clinic': {
    name: 'Salud & Clínica (Dental FJL)',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Inter',
    borderRadius: '1rem', // rounded-2xl
    containerWidth: 'normal',
    backgroundPattern: 'dots',
    buttonStyle: 'rounded',
    heroAlignment: 'left',
    cardGlassmorphism: false,
    backgroundOverlayOpacity: 100,
    topBanner: {
      enabled: true,
      text: 'Primera Consulta & Diagnostico Integral con 20% de descuento online',
      linkText: 'Agendar Cita',
      linkUrl: '#contacto',
      bgColor: '#1d4ed8',
      textColor: '#ffffff',
    },
    whatsappWidget: {
      enabled: true,
      phoneNumber: '+51987654321',
      message: '¡Hola! Quisiera agendar una consulta en Dental FJL.',
      position: 'bottom-right',
    },
    colors: {
      primary: '#1d4ed8', // Azul clínico cálido
      primaryForeground: '#ffffff',
      primaryHover: '#1e40af',
      secondary: '#0284c7', // Cyan médico
      secondaryForeground: '#ffffff',
      accent: '#059669', // Verde salud
      accentForeground: '#ffffff',
      background: '#f8fafc',
      surface: '#ffffff',
      surfaceAlt: '#f1f5f9',
      text: '#0f172a',
      textMuted: '#64748b',
      border: '#e2e8f0',
    },
  },

  // 2. Gastronomía & Brasa (Restaurante FJL)
  'restaurant-ember': {
    name: 'Gastronomía & Brasa (Restaurante FJL)',
    fontHeading: 'Outfit',
    fontBody: 'Inter',
    borderRadius: '1.25rem', // rounded-3xl cálido
    containerWidth: 'normal',
    backgroundPattern: 'mesh',
    buttonStyle: 'pill',
    heroAlignment: 'left',
    cardGlassmorphism: false,
    backgroundOverlayOpacity: 100,
    topBanner: {
      enabled: true,
      text: 'Noches de Fuego & Brasa: Copa de vino de reserva de cortesia reservando mesa en salon',
      linkText: 'Reservar Mesa',
      linkUrl: '#contacto',
      bgColor: '#c2410c',
      textColor: '#ffffff',
    },
    whatsappWidget: {
      enabled: true,
      phoneNumber: '+51912345678',
      message: '¡Hola! Quisiera reservar una mesa en Fuego & Brasa FJL.',
      position: 'bottom-right',
    },
    colors: {
      primary: '#c2410c', // Naranja brasa / terracota intenso
      primaryForeground: '#ffffff',
      primaryHover: '#9a3412',
      secondary: '#b45309', // Ámbar dorado / madera
      secondaryForeground: '#ffffff',
      accent: '#15803d', // Verde fresco huerto
      accentForeground: '#ffffff',
      background: '#fcfaf7', // Tono arena / mantel cálido
      surface: '#ffffff',
      surfaceAlt: '#f7f1ea',
      text: '#1c1917', // Tonalidad piedra oscura
      textMuted: '#78716c',
      border: '#e7ded4',
    },
  },

  // 3. SaaS & Tecnología (FJL Platform)
  'tech-saas': {
    name: 'Tech SaaS & Software',
    fontHeading: 'Outfit',
    fontBody: 'Inter',
    borderRadius: '0.75rem', // rounded-xl
    containerWidth: 'wide',
    backgroundPattern: 'grid',
    buttonStyle: 'rounded',
    colors: {
      primary: '#4f46e5', // Indigo eléctrico
      primaryForeground: '#ffffff',
      primaryHover: '#4338ca',
      secondary: '#8b5cf6', // Violeta
      secondaryForeground: '#ffffff',
      accent: '#06b6d4', // Cyan
      accentForeground: '#ffffff',
      background: '#ffffff',
      surface: '#ffffff',
      surfaceAlt: '#f8fafc',
      text: '#0f172a',
      textMuted: '#64748b',
      border: '#e2e8f0',
    },
  },

  // 4. Corporativo & Legal
  'corporate-emerald': {
    name: 'Corporativo & Legal',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Inter',
    borderRadius: '0.5rem', // rounded-lg
    containerWidth: 'normal',
    backgroundPattern: 'solid',
    buttonStyle: 'sharp',
    colors: {
      primary: '#065f46', // Esmeralda institucional
      primaryForeground: '#ffffff',
      primaryHover: '#044e39',
      secondary: '#b45309', // Oro bronce
      secondaryForeground: '#ffffff',
      accent: '#0f766e',
      accentForeground: '#ffffff',
      background: '#fcfdfd',
      surface: '#ffffff',
      surfaceAlt: '#f0fdf4',
      text: '#13211a',
      textMuted: '#52665b',
      border: '#d1fae5',
    },
  },

  // 5. Dark Studio / Gourmet Nocturno
  'dark-obsidian': {
    name: 'Dark Studio (Obsidian)',
    fontHeading: 'Outfit',
    fontBody: 'Plus Jakarta Sans',
    borderRadius: '1rem',
    containerWidth: 'wide',
    backgroundPattern: 'mesh',
    buttonStyle: 'glow',
    colors: {
      primary: '#38bdf8', // Sky neón
      primaryForeground: '#090d16',
      primaryHover: '#7dd3fc',
      secondary: '#a855f7', // Púrpura neón
      secondaryForeground: '#ffffff',
      accent: '#34d399',
      accentForeground: '#090d16',
      background: '#090d16',
      surface: '#111827',
      surfaceAlt: '#1f2937',
      text: '#f8fafc',
      textMuted: '#94a3b8',
      border: '#374151',
    },
  },
};

/**
 * Inyecta las variables CSS en el DOM
 */
export function applyThemeVariables(theme: ThemeTokens, targetElement?: HTMLElement | null) {
  const root = targetElement || document.documentElement;

  root.style.setProperty('--font-heading', `"${theme.fontHeading}", sans-serif`);
  root.style.setProperty('--font-body', `"${theme.fontBody}", sans-serif`);
  root.style.setProperty('--theme-radius', theme.borderRadius);

  // Colores
  root.style.setProperty('--theme-primary', theme.colors.primary);
  root.style.setProperty('--theme-primary-fg', theme.colors.primaryForeground);
  root.style.setProperty('--theme-primary-hover', theme.colors.primaryHover);
  root.style.setProperty('--theme-secondary', theme.colors.secondary);
  root.style.setProperty('--theme-secondary-fg', theme.colors.secondaryForeground);
  root.style.setProperty('--theme-accent', theme.colors.accent);
  root.style.setProperty('--theme-accent-fg', theme.colors.accentForeground);
  root.style.setProperty('--theme-bg', theme.colors.background);
  root.style.setProperty('--theme-surface', theme.colors.surface);
  root.style.setProperty('--theme-surface-alt', theme.colors.surfaceAlt);
  root.style.setProperty('--theme-text', theme.colors.text);
  root.style.setProperty('--theme-text-muted', theme.colors.textMuted);
  root.style.setProperty('--theme-border', theme.colors.border);

  // Estilos de Botón
  if (theme.buttonStyle === 'pill') {
    root.style.setProperty('--theme-btn-radius', '9999px');
  } else if (theme.buttonStyle === 'sharp') {
    root.style.setProperty('--theme-btn-radius', '4px');
  } else if (theme.buttonStyle === 'glow') {
    root.style.setProperty('--theme-btn-radius', '14px');
  } else {
    root.style.setProperty('--theme-btn-radius', theme.borderRadius);
  }

  // Alineación de Layout y Card Glassmorphism
  root.style.setProperty('--theme-hero-align', theme.heroAlignment || 'left');
  if (theme.cardGlassmorphism) {
    root.style.setProperty('--theme-card-bg', 'rgba(255, 255, 255, 0.75)');
    root.style.setProperty('--theme-card-backdrop', 'blur(16px)');
  } else {
    root.style.setProperty('--theme-card-bg', theme.colors.surface);
    root.style.setProperty('--theme-card-backdrop', 'none');
  }

  // Fondos y Texturas Configurables
  const pattern = theme.backgroundPattern || 'solid';
  const overlayOpacity = theme.backgroundOverlayOpacity !== undefined ? theme.backgroundOverlayOpacity / 100 : 1;
  root.style.setProperty('--theme-bg-opacity', String(overlayOpacity));

  if (pattern === 'dots') {
    root.style.setProperty(
      '--theme-bg-pattern-image',
      `radial-gradient(${theme.colors.border} 1.5px, transparent 1.5px)`
    );
    root.style.setProperty('--theme-bg-pattern-size', '24px 24px');
  } else if (pattern === 'grid') {
    root.style.setProperty(
      '--theme-bg-pattern-image',
      `linear-gradient(to right, ${theme.colors.border} 1px, transparent 1px), linear-gradient(to bottom, ${theme.colors.border} 1px, transparent 1px)`
    );
    root.style.setProperty('--theme-bg-pattern-size', '36px 36px');
  } else if (pattern === 'mesh') {
    root.style.setProperty(
      '--theme-bg-pattern-image',
      `radial-gradient(at 0% 0%, ${theme.colors.primary}20 0px, transparent 55%), radial-gradient(at 100% 100%, ${theme.colors.secondary}18 0px, transparent 55%)`
    );
    root.style.setProperty('--theme-bg-pattern-size', '100% 100%');
  } else if (pattern === 'radial') {
    root.style.setProperty(
      '--theme-bg-pattern-image',
      `radial-gradient(circle at 50% 25%, ${theme.colors.primary}22 0%, transparent 70%)`
    );
    root.style.setProperty('--theme-bg-pattern-size', '100% 100%');
  } else if (pattern === 'custom-image' && theme.backgroundImageUrl) {
    root.style.setProperty('--theme-bg-pattern-image', `url("${theme.backgroundImageUrl}")`);
    root.style.setProperty('--theme-bg-pattern-size', 'cover');
  } else {
    root.style.setProperty('--theme-bg-pattern-image', 'none');
    root.style.setProperty('--theme-bg-pattern-size', 'auto');
  }
}
