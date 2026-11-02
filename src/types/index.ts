// ==============================================================================
// FJL — Tipos del Modelo de Datos (Documento Maestro v1.1 - Sección 5)
// ==============================================================================

export type Role = 'superadmin' | 'admin' | 'editor' | 'viewer';

export type SiteStatus = 'draft' | 'published' | 'archived';
export type PageStatus = 'draft' | 'published' | 'archived';
export type OrgStatus = 'active' | 'suspended' | 'archived';

/**
 * 5.1 Entidad Organization: Cliente o emprendimiento
 */
export interface Organization {
  id: string; // UUIDv7
  name: string;
  slug: string;
  status: OrgStatus;
  createdAt: string;
  deletedAt?: string | null;
}

/**
 * 5.1 Entidad User: Cuenta de acceso
 */
export interface User {
  id: string; // UUIDv7
  name: string;
  email: string;
  emailVerifiedAt?: string | null;
  avatarUrl?: string;
}

/**
 * 5.1 Entidad Membership: Relación usuario-organización con rol
 */
export interface Membership {
  userId: string;
  organizationId: string;
  role: Role;
}

/**
 * Tokens de diseño visual del tema (Sección 4 y 5.1)
 */
export interface ThemeTokens {
  name: string;
  fontHeading: string;
  fontBody: string;
  borderRadius: string; // 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  containerWidth: 'compact' | 'normal' | 'wide';
  colors: {
    primary: string;
    primaryForeground: string;
    primaryHover: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    background: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textMuted: string;
    border: string;
  };
  // Personalizaciones avanzadas de fondo y estilo (100% configurables)
  backgroundPattern?: 'solid' | 'dots' | 'grid' | 'mesh' | 'radial' | 'custom-image';
  backgroundImageUrl?: string;
  backgroundOverlayOpacity?: number; // 0 a 100
  buttonStyle?: 'rounded' | 'pill' | 'sharp' | 'glow';
  heroAlignment?: 'left' | 'center';
  cardGlassmorphism?: boolean;
  topBanner?: {
    enabled: boolean;
    text: string;
    linkText?: string;
    linkUrl?: string;
    bgColor?: string;
    textColor?: string;
  };
  whatsappWidget?: {
    enabled: boolean;
    phoneNumber: string;
    message: string;
    position?: 'bottom-right' | 'bottom-left';
  };
}

/**
 * Configuración de SEO y redes sociales
 */
export interface SeoSettings {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  favicon?: string;
  keywords?: string[];
  allowRobotsIndex: boolean;
}

/**
 * 5.1 Entidad Site: Sitio de una organización
 */
export interface Site {
  id: string; // UUIDv7
  organizationId: string;
  name: string;
  status: SiteStatus;
  theme: ThemeTokens;
  seo: SeoSettings;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 5.1 Entidad Domain: Dominio o subdominio
 */
export interface Domain {
  id: string;
  siteId: string;
  hostname: string;
  isPrimary: boolean;
  verificationToken: string;
  verifiedAt?: string | null;
}

/**
 * Tipos de sección soportados en el MVP (Sección 4)
 */
export type SectionType =
  | 'navbar'
  | 'hero'
  | 'about'
  | 'services'
  | 'features'
  | 'products'
  | 'gallery'
  | 'testimonials'
  | 'pricing'
  | 'faq'
  | 'contact'
  | 'cta'
  | 'footer';

/**
 * 5.1 Entidad Section: Bloque editable de una página
 */
export interface Section<TData = Record<string, any>> {
  id: string;
  pageId: string;
  type: SectionType;
  schemaVersion: number; // Sección 1.1: permite migrar esquemas
  position: number; // Orden de aparición
  enabled: boolean; // Visibilidad
  data: TData;
}

/**
 * 5.1 y 8.1 Snapshot publicado en Page.publishedSnapshot
 */
export interface PublishedSnapshot {
  siteId: string;
  pageId: string;
  publishedAt: string;
  version: number;
  theme: ThemeTokens;
  seo: SeoSettings;
  sections: Section[];
}

/**
 * 5.1 Entidad Page: Página dentro de un sitio
 */
export interface Page {
  id: string;
  siteId: string;
  title: string;
  slug: string;
  status: PageStatus;
  publishedSnapshot: PublishedSnapshot | null;
  publishedAt?: string | null;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 5.1 Entidad Template: Plantilla disponible inicial
 */
export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'Salud y Clínica' | 'Tecnología y SaaS' | 'Servicios Profesionales' | 'Comercio';
  previewBadge: string;
  configuration: {
    theme: ThemeTokens;
    seo: SeoSettings;
    sections: Array<Omit<Section, 'pageId'>>;
  };
}

/**
 * 5.1 Entidad FormSubmission: Contacto recibido
 */
export interface FormSubmission {
  id: string;
  siteId: string;
  formData: {
    fullName: string;
    email: string;
    phone?: string;
    service?: string;
    message: string;
    privacyAccepted: boolean;
    honeypot?: string;
    submittedAt: string;
  };
  createdAt: string;
  deletedAt?: string | null;
}

/**
 * 5.1 Entidad AuditLog: Acciones administrativas
 */
export interface AuditLog {
  id: string;
  organizationId: string;
  userId: string;
  action: string;
  target: string;
  createdAt: string;
}

