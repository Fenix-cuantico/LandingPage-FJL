// ==============================================================================
// FJL — Esquemas Zod por Sección con schemaVersion (Sección 4 y 14.1 Regla 15)
// Totalmente parametrizables para cualquier rubro (Salud, Restaurantes, SaaS, etc.)
// ==============================================================================

import { z } from 'zod';

// Validador de URL segura (Sección 6.3: rechaza javascript: y data:)
const safeUrlSchema = z.string().refine(
  (val) => {
    if (!val || val.startsWith('#') || val.startsWith('/')) return true;
    try {
      const parsed = new URL(val);
      return ['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  },
  { message: 'URL no permitida por política de seguridad FJL' }
);

// ------------------------------------------------------------------------------
// 1. NAVBAR SCHEMA
// ------------------------------------------------------------------------------
export const NavbarSchema = z.object({
  schemaVersion: z.literal(1).default(1),
  brandName: z.string().min(1).default('FJL Brand'),
  logoUrl: safeUrlSchema.optional(),
  brandIcon: z.string().optional(),
  links: z
    .array(
      z.object({
        label: z.string().min(1),
        href: safeUrlSchema,
        isExternal: z.boolean().default(false),
      })
    )
    .default([]),
  ctaButton: z
    .object({
      label: z.string().default('Contactar'),
      href: safeUrlSchema.default('#contacto'),
      variant: z.enum(['primary', 'secondary', 'outline']).default('primary'),
      visible: z.boolean().default(true),
    })
    .default({ label: 'Contactar', href: '#contacto', variant: 'primary', visible: true }),
  showContactPhone: z.boolean().default(true),
  phoneNumber: z.string().default('+51 (01) 456-7890'),
});
export type NavbarData = z.infer<typeof NavbarSchema>;

// ------------------------------------------------------------------------------
// 2. HERO SCHEMA (Con tarjeta visual configurable y Banner Lateral opcional)
// ------------------------------------------------------------------------------
export const HeroVisualCardSchema = z.object({
  badge: z.string().default('Garantía y Confianza'),
  title: z.string().default('Excelencia en Cada Detalle'),
  description: z.string().default('Compromiso total con los más altos estándares de calidad.'),
  imageUrl: safeUrlSchema.optional(),
  icon: z.string().default('Sparkles'),
  floatingBadge: z
    .object({
      icon: z.string().default('Check'),
      tag: z.string().default('Destacado'),
      text: z.string().default('Atención preferencial garantizada'),
    })
    .optional(),
});

export const HeroSideBannerSchema = z.object({
  enabled: z.boolean().default(false), // Control con booleano configurable
  position: z.enum(['left', 'right']).default('right'),
  badge: z.string().default('Promocion Exclusiva'),
  title: z.string().default('Oferta Especial de Temporada'),
  description: z.string().default('Aprovecha nuestro beneficio especial al reservar hoy.'),
  discountChip: z.string().optional(),
  ctaText: z.string().default('Aprovechar Promoción'),
  ctaHref: safeUrlSchema.default('#contacto'),
});

export const HeroSchema = z.object({
  schemaVersion: z.literal(1).default(1),
  badge: z.string().default('Atención Personalizada de Alto Nivel'),
  title: z.string().min(1).default('Experiencia y Calidad Garantizada'),
  subtitle: z
    .string()
    .default('Servicios profesionales de primer nivel diseñados para superar todas tus expectativas.'),
  primaryCta: z
    .object({
      label: z.string().default('Solicitar Información'),
      href: safeUrlSchema.default('#contacto'),
    })
    .default({ label: 'Solicitar Información', href: '#contacto' }),
  secondaryCta: z
    .object({
      label: z.string().default('Explorar Servicios'),
      href: safeUrlSchema.default('#servicios'),
    })
    .optional(),
  stats: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .default([
      { value: '10+', label: 'Años de Experiencia' },
      { value: '5,000+', label: 'Clientes Satisfechos' },
      { value: '99%', label: 'Índice de Recomendación' },
    ]),
  imageUrl: safeUrlSchema.optional(),
  ratingScore: z.number().min(0).max(5).default(4.9),
  ratingCount: z.number().default(350),
  alignment: z.enum(['left', 'center']).default('left').optional(),
  visualCard: HeroVisualCardSchema.optional(),
  sideBanner: HeroSideBannerSchema.optional(),
});
export type HeroData = z.infer<typeof HeroSchema>;

// ------------------------------------------------------------------------------
// 3. ABOUT SCHEMA
// ------------------------------------------------------------------------------
export const AboutSchema = z.object({
  schemaVersion: z.literal(1).default(1),
  eyebrow: z.string().default('Nuestra Empresa'),
  title: z.string().min(1).default('Compromiso, Precisión y Cuidado en Cada Detalle'),
  description: z
    .string()
    .default('Años de experiencia brindando soluciones de primer nivel con un equipo humano altamente capacitado.'),
  bulletPoints: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .default([
      { title: 'Tecnología e Innovación', description: 'Metodologías modernas para asegurar los mejores resultados.' },
      { title: 'Equipo Certificado', description: 'Profesionales apasionados por la excelencia y la atención personalizada.' },
      { title: 'Garantía Total', description: 'Transparencia y respaldo continuo en cada experiencia.' },
    ]),
  experienceYears: z.number().default(10),
  experienceLabel: z.string().default('Años de Trayectoria'),
  certificationsCount: z.number().default(20),
  certificationsLabel: z.string().default('Certificaciones & Premios'),
  ctaButtonText: z.string().default('Conoce Más de Nuestra Historia'),
  imageUrl: safeUrlSchema.optional(),
});
export type AboutData = z.infer<typeof AboutSchema>;

// ------------------------------------------------------------------------------
// 4. SERVICES SCHEMA
// ------------------------------------------------------------------------------
export const ServiceItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string().default('Sparkles'),
  badge: z.string().optional(),
  priceFrom: z.string().optional(),
  features: z.array(z.string()).default([]),
});

export const ServicesSchema = z.object({
  schemaVersion: z.literal(1).default(1),
  eyebrow: z.string().default('Nuestros Servicios'),
  title: z.string().default('Soluciones Integrales Diseñadas a tu Medida'),
  subtitle: z.string().default('Descubre nuestra propuesta de valor con los más altos estándares de la industria.'),
  items: z.array(ServiceItemSchema).default([]),
});
export type ServicesData = z.infer<typeof ServicesSchema>;

// ------------------------------------------------------------------------------
// 5. FEATURES SCHEMA
// ------------------------------------------------------------------------------
export const FeaturesSchema = z.object({
  schemaVersion: z.literal(1).default(1),
  eyebrow: z.string().default('¿Por qué elegirnos?'),
  title: z.string().default('La Diferencia FJL: Atención de Nivel Superior'),
  subtitle: z.string().default('Diseñamos cada detalle pensando en tu comodidad, tranquilidad y resultados a largo plazo.'),
  items: z
    .array(
      z.object({
        icon: z.string().default('CheckCircle2'),
        title: z.string(),
        description: z.string(),
      })
    )
    .default([]),
});
export type FeaturesData = z.infer<typeof FeaturesSchema>;

// ------------------------------------------------------------------------------
// 6. PRODUCTS SCHEMA
// ------------------------------------------------------------------------------
export const ProductsSchema = z.object({
  schemaVersion: z.literal(1).default(1),
  eyebrow: z.string().default('Planes y Paquetes'),
  title: z.string().default('Soluciones Integrales Adaptadas a Cada Necesidad'),
  subtitle: z.string().default('Propuestas claras, transparentes y sin sorpresas.'),
  items: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        tag: z.string().optional(),
        price: z.string(),
        billingPeriod: z.string().default('pago único'),
        description: z.string(),
        features: z.array(z.string()),
        isPopular: z.boolean().default(false),
        ctaText: z.string().default('Consultar Opción'),
      })
    )
    .default([]),
});
export type ProductsData = z.infer<typeof ProductsSchema>;

// ------------------------------------------------------------------------------
// 7. GALLERY SCHEMA
// ------------------------------------------------------------------------------
export const GallerySchema = z.object({
  schemaVersion: z.literal(1).default(1),
  eyebrow: z.string().default('Nuestra Galería'),
  title: z.string().default('Instalaciones, Productos y Momentos'),
  subtitle: z.string().default('Una muestra visual de nuestra dedicación diaria y calidad.'),
  categories: z.array(z.string()).default(['Todos']),
  items: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        category: z.string(),
        imageUrl: safeUrlSchema,
        aspectRatio: z.enum(['square', 'video', 'portrait']).default('video'),
      })
    )
    .default([]),
});
export type GalleryData = z.infer<typeof GallerySchema>;

// ------------------------------------------------------------------------------
// 8. TESTIMONIALS SCHEMA
// ------------------------------------------------------------------------------
export const TestimonialsSchema = z.object({
  schemaVersion: z.literal(1).default(1),
  eyebrow: z.string().default('Opiniones Reales'),
  title: z.string().default('Lo que Dicen Nuestros Clientes'),
  subtitle: z.string().default('Historias reales de personas que confían en nosotros día a día.'),
  items: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        role: z.string().default('Cliente verificado'),
        comment: z.string(),
        treatment: z.string().default('Servicio General'),
        rating: z.number().min(1).max(5).default(5),
        avatarUrl: safeUrlSchema.optional(),
      })
    )
    .default([]),
});
export type TestimonialsData = z.infer<typeof TestimonialsSchema>;

// ------------------------------------------------------------------------------
// 9. PRICING SCHEMA
// ------------------------------------------------------------------------------
export const PricingSchema = z.object({
  schemaVersion: z.literal(1).default(1),
  eyebrow: z.string().default('Inversión Transparente'),
  title: z.string().default('Precios Claros y Facilidades'),
  subtitle: z.string().default('Membresías y planes pensados para ofrecerte el máximo valor.'),
  annualDiscountLabel: z.string().default('Ahorra 20% al contratar anualmente'),
  plans: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        badge: z.string().optional(),
        monthlyPrice: z.number(),
        annualPrice: z.number(),
        currency: z.string().default('S/'),
        description: z.string(),
        isPopular: z.boolean().default(false),
        features: z.array(z.string()),
        ctaText: z.string().default('Seleccionar Plan'),
      })
    )
    .default([]),
});
export type PricingData = z.infer<typeof PricingSchema>;

// ------------------------------------------------------------------------------
// 10. FAQ SCHEMA
// ------------------------------------------------------------------------------
export const FAQSchema = z.object({
  schemaVersion: z.literal(1).default(1),
  eyebrow: z.string().default('Dudas Frecuentes'),
  title: z.string().default('Preguntas Frecuentes'),
  subtitle: z.string().default('Respuestas inmediatas a las consultas más habituales.'),
  items: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
        category: z.string().default('General'),
      })
    )
    .default([]),
});
export type FAQData = z.infer<typeof FAQSchema>;

// ------------------------------------------------------------------------------
// 11. CONTACT SCHEMA (Con Honeypot y Consentimiento Legal Sección 9)
// ------------------------------------------------------------------------------
export const ContactSchema = z.object({
  schemaVersion: z.literal(1).default(1),
  eyebrow: z.string().default('Comunícate con Nosotros'),
  title: z.string().default('Ponte en Contacto o Haz Tu Reserva'),
  subtitle: z.string().default('Respuesta rápida y asesoría personalizada.'),
  address: z.string().default('Av. Principal 123, Lima'),
  phone: z.string().default('+51 (01) 456-7890'),
  email: z.string().default('contacto@empresa.com'),
  workingHours: z.string().default('Lunes a Sábado: 9:00 AM - 7:00 PM'),
  availableServices: z.array(z.string()).default(['Consulta General', 'Atención Personalizada']),
  privacyNoticeText: z
    .string()
    .default(
      'Sus datos serán tratados conforme a la Ley N.º 29733 de Protección de Datos Personales únicamente para atender su consulta y contactarlo.'
    ),
  enableHoneypot: z.boolean().default(true),
});
export type ContactData = z.infer<typeof ContactSchema>;

// ------------------------------------------------------------------------------
// 12. CALL TO ACTION (CTA) SCHEMA
// ------------------------------------------------------------------------------
export const CTASchema = z.object({
  schemaVersion: z.literal(1).default(1),
  title: z.string().default('¿Listo para dar el siguiente paso?'),
  subtitle: z.string().default('Contáctanos hoy mismo y recibe una atención preferencial.'),
  primaryCta: z
    .object({
      label: z.string().default('Contactar Ahora'),
      href: safeUrlSchema.default('#contacto'),
    })
    .default({ label: 'Contactar Ahora', href: '#contacto' }),
  secondaryCta: z
    .object({
      label: z.string().default('Escribir por WhatsApp'),
      href: safeUrlSchema.default('https://wa.me/51987654321'),
    })
    .optional(),
  footnote: z.string().default('Sin compromiso • Atención inmediata'),
});
export type CTAData = z.infer<typeof CTASchema>;

// ------------------------------------------------------------------------------
// 13. FOOTER SCHEMA
// ------------------------------------------------------------------------------
export const FooterSchema = z.object({
  schemaVersion: z.literal(1).default(1),
  brandName: z.string().default('FJL Brand'),
  tagline: z.string().default('Compromiso, calidad y servicio excepcional.'),
  columns: z
    .array(
      z.object({
        title: z.string(),
        links: z.array(
          z.object({
            label: z.string(),
            href: safeUrlSchema,
          })
        ),
      })
    )
    .default([]),
  socialLinks: z
    .array(
      z.object({
        platform: z.enum(['facebook', 'instagram', 'whatsapp', 'linkedin', 'tiktok', 'youtube']),
        url: safeUrlSchema,
      })
    )
    .default([]),
  legalCopyright: z.string().default('© 2026 FJL Platform. Todos los derechos reservados.'),
  legalLinks: z
    .array(
      z.object({
        label: z.string(),
        href: safeUrlSchema,
      })
    )
    .default([
      { label: 'Términos del Servicio', href: '#terminos' },
      { label: 'Política de Privacidad', href: '#privacidad' },
      { label: 'Libro de Reclamaciones', href: '#reclamaciones' },
    ]),
});
export type FooterData = z.infer<typeof FooterSchema>;

// ------------------------------------------------------------------------------
// MAPA DE VALIDADORES POR TIPO DE SECCIÓN (Regla 1 y 2 del Renderer)
// ------------------------------------------------------------------------------
export const SectionSchemaMap = {
  navbar: NavbarSchema,
  hero: HeroSchema,
  about: AboutSchema,
  services: ServicesSchema,
  features: FeaturesSchema,
  products: ProductsSchema,
  gallery: GallerySchema,
  testimonials: TestimonialsSchema,
  pricing: PricingSchema,
  faq: FAQSchema,
  contact: ContactSchema,
  cta: CTASchema,
  footer: FooterSchema,
} as const;

/**
 * Validador seguro que nunca rompe la página (Regla 2, 5 y 7 del Renderer)
 */
export function validateSectionSafe<T = any>(
  type: keyof typeof SectionSchemaMap,
  rawData: unknown
): { valid: boolean; data: T; error?: string } {
  const schema = SectionSchemaMap[type];
  if (!schema) {
    return {
      valid: false,
      data: {} as T,
      error: `Tipo de sección desconocido: "${type}" (Regla 3: Omitir sin romper)`,
    };
  }

  const result = schema.safeParse(rawData);
  if (result.success) {
    return { valid: true, data: result.data as T };
  } else {
    console.warn(`[FJL Renderer] Falló validación Zod en sección "${type}". Usando defaults seguros:`, result.error.format());
    const fallback = schema.parse({});
    return {
      valid: true,
      data: fallback as T,
      error: 'Se cargaron valores por defecto seguros debido a errores de validación',
    };
  }
}
