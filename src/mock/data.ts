// ==============================================================================
// FJL — Datos Mock Multi-Tenant (Arquitectura v1.1 - Dos Clientes Simultáneos)
// Cliente 1: Clínica Odontológica (Dental FJL)
// Cliente 2: Restaurante Gastronómico (Fuego & Brasa FJL)
// ==============================================================================

import { Organization, Site, Page, Domain, FormSubmission, AuditLog } from '../types';
import { THEME_PRESETS } from '../theme/tokens';
import { 
  NavbarData, HeroData, AboutData, ServicesData, FeaturesData, ProductsData, 
  GalleryData, TestimonialsData, PricingData, FAQData, ContactData, CTAData, FooterData 
} from '../schemas/sections';

// ------------------------------------------------------------------------------
// ORGANIZACIONES (Sección 5.1 y 6.1: Aislamiento por Organización)
// ------------------------------------------------------------------------------
export const MOCK_ORGANIZATIONS: Organization[] = [
  {
    id: 'org_01_dental',
    name: 'Dental FJL Especialidades Odontológicas',
    slug: 'dental-fjl',
    status: 'active',
    createdAt: '2026-10-01T10:00:00Z',
  },
  {
    id: 'org_02_restaurante',
    name: 'Fuego & Brasa FJL — Cocina Criolla & Fusión',
    slug: 'fuego-y-brasa',
    status: 'active',
    createdAt: '2026-10-15T14:30:00Z',
  },
];

// ------------------------------------------------------------------------------
// DOMINIOS ASOCIADOS (Sección 7: Resolución de Host)
// ------------------------------------------------------------------------------
export const MOCK_DOMAINS: Domain[] = [
  {
    id: 'dom_01',
    siteId: 'site_dental_01',
    hostname: 'dental.fjl.com',
    isPrimary: true,
    verificationToken: 'v_fjl_token_991823',
    verifiedAt: '2026-10-02T12:00:00Z',
  },
  {
    id: 'dom_02',
    siteId: 'site_restaurant_02',
    hostname: 'restaurante.fjl.com',
    isPrimary: true,
    verificationToken: 'v_fjl_token_991825',
    verifiedAt: '2026-10-16T10:00:00Z',
  },
];

// ==============================================================================
// CLIENTE 1: DENTAL FJL (DATOS COMPLETOS)
// ==============================================================================
const dentalNavbar: NavbarData = {
  schemaVersion: 1,
  brandName: 'Dental FJL',
  brandIcon: 'Sparkles',
  links: [
    { label: 'Inicio', href: '#hero', isExternal: false },
    { label: 'Servicios', href: '#servicios', isExternal: false },
    { label: 'Nosotros', href: '#nosotros', isExternal: false },
    { label: 'Galería', href: '#galeria', isExternal: false },
    { label: 'Planes', href: '#precios', isExternal: false },
    { label: 'Preguntas', href: '#faq', isExternal: false },
    { label: 'Contacto', href: '#contacto', isExternal: false },
  ],
  ctaButton: { label: 'Agendar Cita', href: '#contacto', variant: 'primary', visible: true },
  showContactPhone: true,
  phoneNumber: '+51 (01) 745-9800',
};

const dentalHero: HeroData = {
  schemaVersion: 1,
  badge: 'Tecnología 3D Digital & Sedación Consciente',
  title: 'La Excelencia Odontológica que Devuelve la Confianza a Tu Sonrisa',
  subtitle:
    'Especialistas de primer nivel, diagnóstico por imágenes de alta definición y tratamientos totalmente indoloros para toda la familia en San Borja.',
  primaryCta: { label: 'Agendar Evaluación Gratis', href: '#contacto' },
  secondaryCta: { label: 'Ver Tratamientos y Casos', href: '#servicios' },
  stats: [
    { value: '14+', label: 'Años de Trayectoria' },
    { value: '9,400+', label: 'Pacientes Satisfechos' },
    { value: '99.7%', label: 'Índice de Recomendación' },
    { value: '100%', label: 'Garantía en Implantes' },
  ],
  ratingScore: 4.9,
  ratingCount: 486,
  visualCard: {
    badge: 'Clínica Certificada',
    title: 'Protocolo Clínico Seguro',
    description: 'Tratamientos indoloros con tecnología digital 3D y bioseguridad hospitalaria garantizada.',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    icon: 'ShieldCheck',
    floatingBadge: {
      icon: 'Check',
      tag: 'Garantía FJL',
      text: '100% Sin Costo en Retoques de Ortodoncia',
    },
  },
  sideBanner: {
    enabled: false, // Inactivo por defecto en dental
    position: 'right',
    badge: 'Campaña Dental',
    title: 'Evaluación y Diagnóstico 3D',
    description: 'Diagnóstico radiográfico panorámico gratis este mes.',
    discountChip: '100% Gratis',
    ctaText: 'Solicitar Cita',
    ctaHref: '#contacto',
  },
};

const dentalFeatures: FeaturesData = {
  schemaVersion: 1,
  eyebrow: 'Ventajas Competitivas',
  title: '¿Por Qué Confiar Tu Salud a Dental FJL?',
  subtitle: 'Hemos transformado cada aspecto de la experiencia clínica para brindarte tranquilidad absoluta.',
  items: [
    { icon: 'Cpu', title: 'Tecnología Digital 3D', description: 'Tomografía computarizada cone beam y escáneres iTero para ver tu resultado antes de comenzar.' },
    { icon: 'Award', title: 'Especialistas Certificados', description: 'Todos nuestros doctores cuentan con especialidad registrada en el Colegio Odontológico.' },
    { icon: 'Clock', title: 'Puntualidad Rigurosa', description: 'Respetamos tu tiempo: citas programadas sin salas de espera saturadas ni demoras.' },
    { icon: 'CheckCircle2', title: 'Bioseguridad Hospitalaria', description: 'Autoclaves clase B con trazabilidad verificada en cada instrumental médico.' },
  ],
};

const dentalServices: ServicesData = {
  schemaVersion: 1,
  eyebrow: 'Nuestras Especialidades',
  title: 'Tratamientos Avanzados con Precisión Médica',
  subtitle: 'Cada tratamiento es planificado por un equipo multidisciplinario con tecnología mínimamente invasiva.',
  items: [
    { id: 'srv-1', title: 'Ortodoncia Invisible', description: 'Alineadores transparentes removibles con seguimiento 3D.', icon: 'Smile', badge: 'Más Solicitado', priceFrom: 'S/ 180 /mes', features: ['Estética 100% discreta', 'Removibles para comer', 'Menor tiempo de consulta'] },
    { id: 'srv-2', title: 'Implantes & Carga Inmediata', description: 'Recupera piezas perdidas en una sola sesión con titanio suizo.', icon: 'ShieldCheck', badge: 'Garantía de por Vida', priceFrom: 'S/ 1,450', features: ['Cirugía guiada 3D', 'Sin dolor postoperatorio', 'Mordida natural'] },
    { id: 'srv-3', title: 'Diseño de Sonrisa & Carillas', description: 'Carillas de porcelana E-Max para perfeccionar simetría y color.', icon: 'Sparkles', priceFrom: 'S/ 650 /pieza', features: ['Mínimo desgaste dental', 'Tonalidad natural', 'Resistencia superior'] },
    { id: 'srv-4', title: 'Blanqueamiento Láser Zoom', description: 'Aclara hasta 6 tonos en una sola sesión clínica de 45 minutos.', icon: 'Zap', priceFrom: 'S/ 390', features: ['Efecto inmediato', 'Protección de encías', 'Kit en casa gratis'] },
    { id: 'srv-5', title: 'Odontopediatría Integral', description: 'Atención lúdica y preventiva para niños en un ambiente sin temores.', icon: 'HeartHandshake', features: ['Enfoque amigable', 'Sellantes y flúor', 'Control maxilar'] },
    { id: 'srv-6', title: 'Endodoncia Microscópica', description: 'Salvamos piezas comprometidas utilizando microscopio óptico.', icon: 'Activity', features: ['En una sola cita', 'Anestesia indolora', 'Conservación de raíz'] },
  ],
};

const dentalAbout: AboutData = {
  schemaVersion: 1,
  eyebrow: 'Sobre Nosotros',
  title: 'Más que una clínica, tu aliado para una salud bucal duradera',
  description: 'Combinamos más de una década de experiencia médica con tecnología digital de vanguardia para diagnósticos exactos y tratamientos indoloros.',
  bulletPoints: [
    { title: 'Diagnóstico 100% Digital', description: 'Escaneo intraoral sin moldes de masilla molestos y simulación 3D inmediata.' },
    { title: 'Tratamientos Sin Dolor', description: 'Anestesia computarizada y opción de sedación consciente con médico anestesiólogo.' },
    { title: 'Financiamiento Directo', description: 'Facilidades de pago en cuotas fijas y convenios corporativos de salud.' },
  ],
  experienceYears: 14,
  experienceLabel: 'Liderazgo Odontológico',
  certificationsCount: 28,
  certificationsLabel: 'Especialistas Certificados',
  ctaButtonText: 'Conoce a Nuestros Especialistas',
  imageUrl: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80',
};

const dentalProducts: ProductsData = {
  schemaVersion: 1,
  eyebrow: 'Paquetes Integrales',
  title: 'Soluciones Diseñadas para Cada Etapa de tu Vida',
  subtitle: 'Planes preventivos y correctivos con precios cerrados y sin costos ocultos.',
  items: [
    { id: 'pkg-1', name: 'Chequeo Preventivo Integral', tag: 'Ideal Primera Visita', price: 'S/ 99', billingPeriod: 'evaluación única', description: 'Revisión exhaustiva con cámara intraoral, limpieza ultrasónica profunda y destartraje.', features: ['Evaluación por especialista', 'Fotografías de diagnóstico', 'Profilaxis ultrasonido', 'Fluorización'], isPopular: false, ctaText: 'Solicitar Chequeo' },
    { id: 'pkg-2', name: 'Pack Sonrisa Perfecta', tag: 'Más Popular', price: 'S/ 580', billingPeriod: 'tratamiento completo', description: 'Limpieza profunda + Blanqueamiento clínico en consultorio + 2 curaciones estéticas de resina.', features: ['Profilaxis diamantada', 'Blanqueamiento Zoom', '2 Curaciones nanoparticuladas', 'Guía estética'], isPopular: true, ctaText: 'Quiero este Pack' },
    { id: 'pkg-3', name: 'Plan Familiar Anual', tag: 'Ahorro Máximo', price: 'S/ 850', billingPeriod: 'anual (hasta 4 personas)', description: 'Cobertura preventiva anual con 2 profilaxis por miembro y 30% de descuento en tratamientos.', features: ['8 Limpiezas al año', 'Urgencias ilimitadas', '30% desc. en implantes', 'Radiografías gratis'], isPopular: false, ctaText: 'Inscribir Familia' },
  ],
};

const dentalGallery: GalleryData = {
  schemaVersion: 1,
  eyebrow: 'Nuestras Instalaciones',
  title: 'Ambientes Pensados en Tu Máximo Confort',
  subtitle: 'Un espacio cálido, libre del olor y sonido tradicional de consultorio.',
  categories: ['Todos', 'Clínica', 'Tecnología', 'Sonrisas'],
  items: [
    { id: 'gal-1', title: 'Sala Quirúrgica Digital con Microscopio', category: 'Clínica', imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80', aspectRatio: 'video' },
    { id: 'gal-2', title: 'Escaneo Intraoral 3D en Tiempo Real', category: 'Tecnología', imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80', aspectRatio: 'video' },
    { id: 'gal-3', title: 'Resultado de Ortodoncia Invisible (Caso 12 meses)', category: 'Sonrisas', imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80', aspectRatio: 'video' },
    { id: 'gal-4', title: 'Sala de Espera Lounge y Zona de Café', category: 'Clínica', imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80', aspectRatio: 'video' },
    { id: 'gal-5', title: 'Tomógrafo Computarizado Cone Beam 3D', category: 'Tecnología', imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80', aspectRatio: 'video' },
    { id: 'gal-6', title: 'Transformación con Carillas de Porcelana', category: 'Sonrisas', imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80', aspectRatio: 'video' },
  ],
};

const dentalTestimonials: TestimonialsData = {
  schemaVersion: 1,
  eyebrow: 'Casos Reales',
  title: 'Testimonios de Pacientes que Volvieron a Sonreír',
  subtitle: 'La satisfacción de nuestros pacientes es nuestro mayor orgullo y respaldo.',
  items: [
    { id: 'test-1', name: 'Mariana Alarcón', role: 'Ejecutiva de Marketing', treatment: 'Alineadores Invisibles', rating: 5, comment: 'Tenía pánico de ponerme brackets tradicionales por mi trabajo con clientes. Los alineadores en Dental FJL fueron casi imperceptibles y en 9 meses mis dientes quedaron perfectos.', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
    { id: 'test-2', name: 'Carlos Benavides', role: 'Ingeniero de Sistemas', treatment: 'Implante Dental Inmediato', rating: 5, comment: 'Perdí un molar en un accidente deportivo. El Dr. Farfán me colocó el implante con guía 3D y no sentí ningún dolor. Al día siguiente ya estaba trabajando normalmente.', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
    { id: 'test-3', name: 'Patricia Valdivia', role: 'Docente Universitaria', treatment: 'Diseño de Sonrisa & Carillas', rating: 5, comment: 'Llevaba años acomplejada al sonreír en fotos. Me hicieron una simulación digital antes de tocar una sola pieza dental. El resultado superó todas mis expectativas.', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
  ],
};

const dentalPricing: PricingData = {
  schemaVersion: 1,
  eyebrow: 'Opciones de Financiamiento',
  title: 'Planes Dentales Familiares e Individuales',
  subtitle: 'Paga mes a mes o ahorra un 20% con el pago anual. Todos los planes incluyen urgencias 24/7.',
  annualDiscountLabel: 'Ahorra 20% al afiliarte anualmente',
  plans: [
    { id: 'plan-basic', name: 'Plan Preventivo Personal', badge: 'Básico', monthlyPrice: 45, annualPrice: 432, currency: 'S/', description: 'Para mantener una higiene impecable y prevenir caries.', isPopular: false, features: ['2 Profilaxis anuales', 'Diagnóstico con cámara', '1 Radiografía panorámica', '20% desc. en resinas'], ctaText: 'Afiliarme al Plan' },
    { id: 'plan-pro', name: 'Plan Sonrisa Premium', badge: 'Más Elegido', monthlyPrice: 95, annualPrice: 912, currency: 'S/', description: 'El plan más completo con estética, ortodoncia y urgencias prioritarias.', isPopular: true, features: ['3 Profilaxis anuales', '1 Blanqueamiento incluido', 'Radiografías ilimitadas', '35% desc. en ortodoncia', 'Urgencias 24/7'], ctaText: 'Elegir Plan Premium' },
    { id: 'plan-family', name: 'Plan Dental Familiar', badge: 'Hasta 4 Miembros', monthlyPrice: 160, annualPrice: 1536, currency: 'S/', description: 'Protege a toda tu familia con revisiones pediátricas y descuentos.', isPopular: false, features: ['Cobertura 2 adultos + 2 niños', 'Sellantes trimestrales', '40% desc. pediatría', '30% desc. en todas las áreas'], ctaText: 'Afiliar a Mi Familia' },
  ],
};

const dentalFAQ: FAQData = {
  schemaVersion: 1,
  eyebrow: 'Despejamos tus Dudas',
  title: 'Preguntas Frecuentes',
  subtitle: 'Conoce cómo trabajamos, facilidades de pago y tiempos de tratamiento.',
  items: [
    { question: '¿La primera cita de evaluación tiene algún costo o compromiso?', answer: 'No. Durante este mes, la consulta diagnóstica de 45 minutos y radiografías básicas son 100% gratuitas y sin compromiso.', category: 'Citas' },
    { question: '¿Qué formas de pago y cuotas aceptan?', answer: 'Aceptamos tarjetas de crédito/débito, Yape, Plin y financiamiento en hasta 12 cuotas sin intereses con bancos afiliados.', category: 'Pagos' },
    { question: '¿Los tratamientos dentales son dolorosos?', answer: 'En lo absoluto. Aplicamos anestesia computarizada indolora y servicio de sedación consciente para pacientes nerviosos.', category: 'Tratamientos' },
    { question: '¿Qué garantía tienen los implantes dentales?', answer: 'Nuestros implantes de titanio grado suizo cuentan con garantía de por vida contra rechazo biológico con mantenimientos al día.', category: 'Implantes' },
  ],
};

const dentalContact: ContactData = {
  schemaVersion: 1,
  eyebrow: 'Estamos Listos para Atenderte',
  title: 'Agenda Tu Cita Médica',
  subtitle: 'Completa el formulario y nuestra coordinadora de citas te confirmará el horario en breve.',
  address: 'Av. Javier Prado Este 2450, Piso 4, San Borja (Frente a La Rambla)',
  phone: '+51 (01) 745-9800 / +51 987 654 321',
  email: 'citas@dentalfjl.com',
  workingHours: 'Lunes a Viernes: 8:00 AM - 8:30 PM | Sábados: 9:00 AM - 6:00 PM',
  availableServices: ['Evaluación Diagnóstica Inicial (Gratis)', 'Ortodoncia Invisible', 'Implantes Dentales & Prótesis', 'Diseño de Sonrisa & Carillas', 'Blanqueamiento Zoom', 'Urgencia Dental'],
  privacyNoticeText: 'Sus datos personales serán tratados conforme a la Ley N.º 29733 (Ley de Protección de Datos Personales del Perú) únicamente para agendar su cita y contactarlo.',
  enableHoneypot: true,
};

const dentalCTA: CTAData = {
  schemaVersion: 1,
  title: 'Tu Mejor Sonrisa Comienza con una Decisión Hoy',
  subtitle: 'Reserva tu evaluación sin costo este mes y accede a un plan de tratamiento 3D personalizado con facilidades de pago.',
  primaryCta: { label: 'Reservar Mi Cita Ahora', href: '#contacto' },
  secondaryCta: { label: 'Hablar con Asistente por WhatsApp', href: 'https://wa.me/51987654321' },
  footnote: 'Horarios flexibles de lunes a sábado • Estacionamiento privado vigilado sin costo',
};

const dentalFooter: FooterData = {
  schemaVersion: 1,
  brandName: 'Dental FJL',
  tagline: 'Clínica Odontológica de Especialidades y Cirugía Maxilofacial Avanzada.',
  columns: [
    { title: 'Especialidades', links: [{ label: 'Ortodoncia Invisible', href: '#servicios' }, { label: 'Implantes Dentales', href: '#servicios' }, { label: 'Diseño de Sonrisa', href: '#servicios' }, { label: 'Blanqueamiento Zoom', href: '#servicios' }] },
    { title: 'Información', links: [{ label: 'Sobre Nosotros', href: '#nosotros' }, { label: 'Instalaciones', href: '#galeria' }, { label: 'Preguntas Frecuentes', href: '#faq' }, { label: 'Agendar Cita', href: '#contacto' }] },
    { title: 'Legal & Calidad', links: [{ label: 'Términos del Servicio', href: '#terminos' }, { label: 'Política de Privacidad (Ley 29733)', href: '#privacidad' }, { label: 'Libro de Reclamaciones', href: '#reclamaciones' }] },
  ],
  socialLinks: [
    { platform: 'whatsapp', url: 'https://wa.me/51987654321' },
    { platform: 'instagram', url: 'https://instagram.com/dentalfjl' },
    { platform: 'facebook', url: 'https://facebook.com/dentalfjl' },
  ],
  legalCopyright: '© 2026 Dental FJL Especialidades Odontológicas S.A.C. RUC 20608974512.',
  legalLinks: [
    { label: 'Términos y Condiciones', href: '#terminos' },
    { label: 'Privacidad y Protección de Datos', href: '#privacidad' },
    { label: 'Libro de Reclamaciones Virtual', href: '#reclamaciones' },
  ],
};

export const MOCK_DENTAL_SECTIONS = [
  { id: 'd-nav', pageId: 'page_dental_home', type: 'navbar' as const, schemaVersion: 1, position: 1, enabled: true, data: dentalNavbar },
  { id: 'd-hero', pageId: 'page_dental_home', type: 'hero' as const, schemaVersion: 1, position: 2, enabled: true, data: dentalHero },
  { id: 'd-features', pageId: 'page_dental_home', type: 'features' as const, schemaVersion: 1, position: 3, enabled: true, data: dentalFeatures },
  { id: 'd-services', pageId: 'page_dental_home', type: 'services' as const, schemaVersion: 1, position: 4, enabled: true, data: dentalServices },
  { id: 'd-about', pageId: 'page_dental_home', type: 'about' as const, schemaVersion: 1, position: 5, enabled: true, data: dentalAbout },
  { id: 'd-products', pageId: 'page_dental_home', type: 'products' as const, schemaVersion: 1, position: 6, enabled: true, data: dentalProducts },
  { id: 'd-gallery', pageId: 'page_dental_home', type: 'gallery' as const, schemaVersion: 1, position: 7, enabled: true, data: dentalGallery },
  { id: 'd-testimonials', pageId: 'page_dental_home', type: 'testimonials' as const, schemaVersion: 1, position: 8, enabled: true, data: dentalTestimonials },
  { id: 'd-pricing', pageId: 'page_dental_home', type: 'pricing' as const, schemaVersion: 1, position: 9, enabled: true, data: dentalPricing },
  { id: 'd-faq', pageId: 'page_dental_home', type: 'faq' as const, schemaVersion: 1, position: 10, enabled: true, data: dentalFAQ },
  { id: 'd-contact', pageId: 'page_dental_home', type: 'contact' as const, schemaVersion: 1, position: 11, enabled: true, data: dentalContact },
  { id: 'd-cta', pageId: 'page_dental_home', type: 'cta' as const, schemaVersion: 1, position: 12, enabled: true, data: dentalCTA },
  { id: 'd-footer', pageId: 'page_dental_home', type: 'footer' as const, schemaVersion: 1, position: 13, enabled: true, data: dentalFooter },
];

export const MOCK_SITE_DENTAL: Site = {
  id: 'site_dental_01',
  organizationId: 'org_01_dental',
  name: 'Dental FJL — Web Oficial',
  status: 'published',
  theme: THEME_PRESETS['dental-clinic'],
  seo: {
    title: 'Dental FJL — Clínica Odontológica Especializada en San Borja',
    description: 'Tratamientos odontológicos avanzados, ortodoncia invisible e implantes 3D en Lima.',
    keywords: ['dentista san borja', 'ortodoncia invisible lima', 'implantes dentales fjl'],
    allowRobotsIndex: true,
  },
  createdBy: 'user_admin_01',
  updatedBy: 'user_admin_01',
  createdAt: '2026-10-01T10:00:00Z',
  updatedAt: '2026-10-30T18:00:00Z',
};

// ==============================================================================
// CLIENTE 2: RESTAURANTE FUEGO & BRASA FJL (DATOS COMPLETOS)
// ==============================================================================
const restaurantNavbar: NavbarData = {
  schemaVersion: 1,
  brandName: 'Fuego & Brasa FJL',
  brandIcon: 'Flame',
  links: [
    { label: 'Inicio', href: '#hero', isExternal: false },
    { label: 'La Carta', href: '#servicios', isExternal: false },
    { label: 'Historia', href: '#nosotros', isExternal: false },
    { label: 'Platos & Cava', href: '#galeria', isExternal: false },
    { label: 'Experiencias', href: '#precios', isExternal: false },
    { label: 'Preguntas', href: '#faq', isExternal: false },
    { label: 'Reservas', href: '#contacto', isExternal: false },
  ],
  ctaButton: { label: 'Reservar Mesa', href: '#contacto', variant: 'primary', visible: true },
  showContactPhone: true,
  phoneNumber: '+51 (01) 480-1234',
};

const restaurantHero: HeroData = {
  schemaVersion: 1,
  badge: 'Cocina Criolla a la Leña & Cortes Angus Seleccionados',
  title: 'El Arte del Fuego, Sabor de Tradición y Experiencia Gourmet',
  subtitle:
    'Carnes maduradas al carbón de quebracho, pesca fresca del día y coctelería de autor en una casona rústica y elegante en el corazón de Miraflores.',
  primaryCta: { label: 'Reservar Mesa en Salón', href: '#contacto' },
  secondaryCta: { label: 'Explorar Nuestra Carta', href: '#servicios' },
  stats: [
    { value: '16+', label: 'Años de Cocina' },
    { value: '140k+', label: 'Comensales Felices' },
    { value: '4.9', label: 'Guía Gastronómica' },
    { value: '100%', label: 'Insumos de Origen Local' },
  ],
  ratingScore: 4.9,
  ratingCount: 890,
  visualCard: {
    badge: 'Selección del Chef Ejecutivo',
    title: 'Cortes Madurados al Quebracho',
    description: 'Maduración en seco Dry-Aged de 28 días con leña de quebracho para un aroma ahumado incomparable.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    icon: 'Flame',
    floatingBadge: {
      icon: 'Wine',
      tag: 'Cortesía de Bienvenida',
      text: 'Pisco Sour Catedral incluido con tu reserva web',
    },
  },
  sideBanner: {
    enabled: true, // <--- Activo para Restaurante: muestra el banner lateral promocional
    position: 'right',
    badge: 'Festival de Brasas & Cava',
    title: 'Noches Gourmet de Fin de Semana',
    description: 'Reserva para este fin de semana y disfruta de 2 copas de bienvenida de la cava + 15% de descuento en botellas seleccionadas.',
    discountChip: '15% OFF en Vinos',
    ctaText: 'Reservar con Promoción',
    ctaHref: '#contacto',
  },
};

const restaurantFeatures: FeaturesData = {
  schemaVersion: 1,
  eyebrow: 'La Experiencia Fuego & Brasa',
  title: 'Pasión por el Detalle en Cada Bocado',
  subtitle: 'Combinamos técnicas ancestrales a la brasa con la sofisticación culinaria contemporánea peruana.',
  items: [
    { icon: 'Flame', title: 'Brasas al Quebracho & Algarrobo', description: 'Ahumado sutil con leñas seleccionadas para sellar jugos y realzar el sabor auténtico de cada corte.' },
    { icon: 'Utensils', title: 'Pesca Artesanal del Día', description: 'Corvina, mero y mariscos provistos cada mañana directamente por caletas de pescadores del sur.' },
    { icon: 'Wine', title: 'Cava con +90 Etiquetas', description: 'Selección exclusiva de bodegas boutique sudamericanas y europeas curadas por nuestro Sommelier.' },
    { icon: 'Sparkles', title: 'Salones Privados & Terraza', description: 'Ambientes cálidos con música acústica en vivo los fines de semana y terraza pet-friendly.' },
  ],
};

const restaurantServices: ServicesData = {
  schemaVersion: 1,
  eyebrow: 'Nuestras Especialidades',
  title: 'Platos Insignia de Nuestra Cocina',
  subtitle: 'Cada creación celebra la riqueza de la gastronomía peruana llevada a su máxima expresión.',
  items: [
    { id: 'plato-1', title: 'Bife Angosto Angus a la Brasa', description: 'Corte madurado 28 días con costra de sal marina, acompañado de papas nativas doradas y chimichurri rústico.', icon: 'Flame', badge: 'Especialidad', priceFrom: 'S/ 98', features: ['Punto de cocción garantizado', 'Mantequilla de romero y ajo confitado', 'Guarnición a elección'] },
    { id: 'plato-2', title: 'Ceviche Fuego & Mar de Corvina', description: 'Pesca fresca en leche de tigre al ají limo ahumado, con chicharrón de calamar crocante y camote glaseado.', icon: 'Sparkles', badge: 'Favorito', priceFrom: 'S/ 64', features: ['Pesca del día certificada', 'Leche de tigre ahumada', 'Choclo chullpi crujiente'] },
    { id: 'plato-3', title: 'Lomo Saltado al Wok de Quebracho', description: 'Tiras de lomo fino salteadas al fuego vivo con cebolla morada, tomate de huerto y reducción de pisco quebranta.', icon: 'Flame', priceFrom: 'S/ 72', features: ['Flambeado al pisco', 'Papas amarillas crocantes', 'Arroz con choclo desgranado'] },
    { id: 'plato-4', title: 'Arroz con Pato Norteño a la Leña', description: 'Confit de pato tierno cocido lentamente con cerveza negra, culantro silvestre y ají amarillo de Casma.', icon: 'Utensils', priceFrom: 'S/ 68', features: ['Cocción lenta de 4 horas', 'Sarsa criolla de rabanito', 'Arroz graneado en paila'] },
    { id: 'plato-5', title: 'Barra & Coctelería de Autor', description: 'Macerados de hierbas andinas, Chilcanos premium, Pisco Sour Catedral y cócteles de autor ahumados en mesa.', icon: 'Wine', features: ['Piscos de uva Italia y Quebranta', 'Mixología en vivo', 'Opciones sin alcohol botánicas'] },
    { id: 'plato-6', title: 'Catering & Cenas Privadas', description: 'Llevamos nuestro equipo de parrilleros y sommelier a tu evento privado o corporativo con menú cerrado.', icon: 'Coffee', features: ['Para grupos de 20 a 150 personas', 'Montaje completo de brasas', 'Atención personalizada de salón'] },
  ],
};

const restaurantAbout: AboutData = {
  schemaVersion: 1,
  eyebrow: 'Nuestra Historia',
  title: 'Honrando la Herencia Culinaria Peruana desde el Fuego',
  description: 'Nacimos en 2010 como un homenaje a las fogatas familiares en el campo y la riqueza infinita de nuestras costas y valles. En Fuego & Brasa, cada plato cuenta una historia de respeto al agricultor, al pescador artesanal y al comensal que nos confía sus momentos más especiales.',
  bulletPoints: [
    { title: 'Trazabilidad y Respeto al Origen', description: 'Trabajamos con más de 25 pequeños agricultores de Oxapampa, Huaral y Cusco para traer papas nativas e insumos agroecológicos.' },
    { title: 'Maduración Propia de Carnes', description: 'Cámara de maduración en seco (Dry Aged) a la vista en salón con control milimétrico de humedad y temperatura.' },
    { title: 'Hospitalidad de Corazón', description: 'Un equipo de anfitriones y sommeliers formados para que cada visita se sienta como en casa.' },
  ],
  experienceYears: 16,
  experienceLabel: 'Años de Fuego y Tradición',
  certificationsCount: 34,
  certificationsLabel: 'Premios Gastronómicos',
  ctaButtonText: 'Conoce Nuestra Filosofía',
  imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
};

const restaurantProducts: ProductsData = {
  schemaVersion: 1,
  eyebrow: 'Menús & Experiencias',
  title: 'Experiencias Diseñadas para Celebrar',
  subtitle: 'Disfruta de menús degustación cerrados con maridaje para ocasiones inolvidables.',
  items: [
    { id: 'exp-1', name: 'Almuerzo Ejecutivo de Brasa', tag: 'Lunes a Viernes', price: 'S/ 55', billingPeriod: 'por comensal', description: 'Entrada criolla + Plato de fondo a la leña + Postre del día + Bebida natural de estación.', features: ['Servicio rápido en 30 minutos', '3 opciones de fondo para elegir', 'Postre artesanal incluido', 'Café espresso de cortesía'], isPopular: false, ctaText: 'Reservar Almuerzo' },
    { id: 'exp-2', name: 'Experiencia Fuego & Mar (Dúo)', tag: 'Más Elegida', price: 'S/ 240', billingPeriod: 'para 2 personas', description: 'Degustación de 4 tiempos: Tiradito clásico + Anticuchos Angus + Corte Tomahawk 800g + Fondue de chocolate cusqueño.', features: ['4 tiempos completos', 'Botella de vino tinto Malbec incluida', 'Mesa preferencial con vista al fuego', 'Chupitos digestivos de cortesía'], isPopular: true, ctaText: 'Reservar Experiencia Dúo' },
    { id: 'exp-3', name: 'Mesa del Sommelier & Chef', tag: 'Alta Gastronomía', price: 'S/ 195', billingPeriod: 'por persona (mín. 4)', description: 'Recorrido sensorial de 7 tiempos guiado personalmente por nuestro Chef Ejecutivo y Sommelier en cava privada.', features: ['7 tiempos con maridaje completo', 'Cortes Dry Aged exclusivos', 'Salón privado con anfitrión', 'Visita guiada a la cocina'], isPopular: false, ctaText: 'Consultar Disponibilidad' },
  ],
};

const restaurantGallery: GalleryData = {
  schemaVersion: 1,
  eyebrow: 'Nuestra Mesa',
  title: 'Una Mirada a Nuestros Platos y Ambientes',
  subtitle: 'Cada detalle visual refleja el cariño y el arte que ponemos en los fogones.',
  categories: ['Todos', 'Parrilla', 'Mar', 'Cava & Bar', 'Ambiente'],
  items: [
    { id: 'rgal-1', title: 'Corte Tomahawk sellado al carbón de quebracho', category: 'Parrilla', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', aspectRatio: 'video' },
    { id: 'rgal-2', title: 'Tiradito de Corvina en leche de tigre de ají amarillo', category: 'Mar', imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80', aspectRatio: 'video' },
    { id: 'rgal-3', title: 'Cava subterránea con selección internacional', category: 'Cava & Bar', imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80', aspectRatio: 'video' },
    { id: 'rgal-4', title: 'Salón principal con vigas de roble y luz cálida', category: 'Ambiente', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', aspectRatio: 'video' },
    { id: 'rgal-5', title: 'Pisco Sour Catedral con espuma de angostura', category: 'Cava & Bar', imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80', aspectRatio: 'video' },
    { id: 'rgal-6', title: 'Bife de chorizo madurado con romero silvestre', category: 'Parrilla', imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80', aspectRatio: 'video' },
  ],
};

const restaurantTestimonials: TestimonialsData = {
  schemaVersion: 1,
  eyebrow: 'Opiniones de Comensales',
  title: 'Historias Alrededor de Nuestras Mesas',
  subtitle: 'La felicidad de quienes comparten momentos especiales con nosotros.',
  items: [
    { id: 'rtest-1', name: 'Rodrigo Mendoza', role: 'Guía Gastronómica Lima Gourmet', treatment: 'Experiencia Fuego & Mar', rating: 5, comment: 'Sin duda uno de los 5 mejores restaurantes de carnes y cocina peruana contemporánea de la capital. El bife angosto tiene un ahumado sublime y el ceviche es pura frescura.', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' },
    { id: 'rtest-2', name: 'Camila & Fernando', role: 'Celebración de Aniversario', treatment: 'Cena Maridaje 7 Tiempos', rating: 5, comment: 'Celebramos nuestro décimo aniversario en el salón privado. La atención de Luis, el sommelier, fue impecable: cada copa potenció el sabor del plato. Volveremos cada año.', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
    { id: 'rtest-3', name: 'Gonzalo Riva-Agüero', role: 'Director Comercial en TechLatam', treatment: 'Almuerzo Corporativo (18 pax)', rating: 5, comment: 'Llevé a mis clientes internacionales y quedaron fascinados con los anticuchos y el lomo al wok. La puntualidad y servicio para grupos ejecutivos fue de nivel 10/10.', avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80' },
  ],
};

const restaurantPricing: PricingData = {
  schemaVersion: 1,
  eyebrow: 'Membresías & Reservas',
  title: 'Experiencias de Mesa & Club Gourmet',
  subtitle: 'Acceso prioritario a eventos de cata, mesas preferenciales de fin de semana y beneficios exclusivos.',
  annualDiscountLabel: 'Ahorra 20% al reservar con membresía anual',
  plans: [
    { id: 'rplan-1', name: 'Mesa Gourmet Ocasional', badge: 'Parejas & Amigos', monthlyPrice: 80, annualPrice: 768, currency: 'S/', description: 'Ideal para quienes disfrutan de salir a cenar y buscan mesa garantizada sin colas.', isPopular: false, features: ['Reserva prioritaria los fines de semana', 'Cóctel de bienvenida de cortesía para la mesa', '10% de descuento en botellas de vino de la cava', 'Degustación de postres por cumpleaños'], ctaText: 'Afiliarme al Club' },
    { id: 'rplan-2', name: 'Club de Catas & Fuego', badge: 'Más Deseado', monthlyPrice: 150, annualPrice: 1440, currency: 'S/', description: 'Para apasionados del vino y la alta gastronomía que buscan experiencias únicas.', isPopular: true, features: ['1 Cena degustación bimestral para 2 personas', 'Acceso exclusivo a catas privadas con enólogos', 'Descorche libre sin costo (hasta 2 botellas por visita)', '20% desc. en eventos y salones privados', 'Atención directa vía Concierge WhatsApp'], ctaText: 'Unirme al Club de Catas' },
    { id: 'rplan-3', name: 'Membresía Corporativa', badge: 'Empresas', monthlyPrice: 280, annualPrice: 2688, currency: 'S/', description: 'Solución para empresas que organizan almuerzos y cenas de negocios continuas.', isPopular: false, features: ['Uso del salón privado para reuniones (hasta 20 pax)', 'Línea de crédito mensual y facturación consolidada', 'Menús corporativos personalizados por el Chef', 'Estacionamiento y valet parking reservado'], ctaText: 'Solicitar Plan Empresa' },
  ],
};

const restaurantFAQ: FAQData = {
  schemaVersion: 1,
  eyebrow: 'Preguntas Frecuentes',
  title: 'Todo lo que Necesitas Saber para tu Visita',
  subtitle: 'Queremos que tu experiencia en Fuego & Brasa sea perfecta desde el momento de reservar.',
  items: [
    { question: '¿Con cuánta anticipación recomiendan reservar?', answer: 'Para viernes y sábados por la noche recomendamos reservar con al menos 24 a 48 horas de anticipación. Para almuerzos de lunes a jueves aceptamos reservas el mismo día o ingreso según disponibilidad en puerta.', category: 'Reservas' },
    { question: '¿Cuentan con opciones vegetarianas o sin gluten?', answer: 'Sí. Contamos con una sección dedicada en carta que incluye risottos de hongos silvestres, verduras orgánicas asadas al rescoldo, ceviche de alcachofas y pastas artesanales libres de gluten.', category: 'Menú' },
    { question: '¿Disponen de estacionamiento o servicio de Valet Parking?', answer: 'Sí, contamos con servicio privado de Valet Parking en la puerta del restaurante sin costo adicional para comensales, así como convenio con estacionamiento vigilado a 30 metros.', category: 'Instalaciones' },
    { question: '¿Cuál es la política para ingreso de vinos propios (Descorche)?', answer: 'El descorche tiene un valor de S/ 45 por botella estándar de 750ml (máximo 2 botellas por mesa). En días martes el descorche es 100% libre para botellas de vino tinto.', category: 'Cava' },
    { question: '¿Aceptan mascotas en la terraza (Pet Friendly)?', answer: 'Sí, nuestra terraza exterior techada y calefaccionada es 100% pet-friendly. Le brindamos a tu mascota bebedero de agua fresca a su llegada.', category: 'Ambiente' },
  ],
};

const restaurantContact: ContactData = {
  schemaVersion: 1,
  eyebrow: 'Reserva Tu Experiencia',
  title: 'Reserva Tu Mesa en Salón o Terraza',
  subtitle: 'Completa los datos y nuestro Capitán de Salón confirmará tu reserva por WhatsApp de forma inmediata.',
  address: 'Av. Mariscal La Mar 1280, Miraflores, Lima (Zona Gastronómica)',
  phone: '+51 (01) 480-1234 / +51 981 234 567',
  email: 'reservas@fuegoybrasa.pe',
  workingHours: 'Lunes a Sábado: 12:30 PM - 11:30 PM | Domingos: 12:00 PM - 6:00 PM',
  availableServices: [
    'Mesa en Salón Principal (2 a 4 personas)',
    'Mesa en Terraza al Aire Libre',
    'Cena Romántica / Aniversario',
    'Almuerzo Familiar de Fin de Semana (5+ pax)',
    'Reunión Corporativa / Salón Privado',
    'Celebración de Cumpleaños',
  ],
  privacyNoticeText: 'Sus datos de contacto serán tratados exclusivamente por Fuego & Brasa FJL para gestionar su reserva y confirmar su asistencia conforme a la Ley N.º 29733.',
  enableHoneypot: true,
};

const restaurantCTA: CTAData = {
  schemaVersion: 1,
  title: 'El Aroma de la Leña y la Buena Mesa Te Esperan',
  subtitle: 'Asegura tu mesa hoy y disfruta de un brindis de cortesía con cóctel de autor en reservas nocturnas.',
  primaryCta: { label: 'Reservar Mi Mesa Hoy', href: '#contacto' },
  secondaryCta: { label: 'Consultar Carta por WhatsApp', href: 'https://wa.me/51981234567' },
  footnote: 'Se respetan 15 minutos de tolerancia tras la hora de reserva • Código de vestimenta: Casual elegante',
};

const restaurantFooter: FooterData = {
  schemaVersion: 1,
  brandName: 'Fuego & Brasa FJL',
  tagline: 'Restaurante & Bar de Cocina Criolla a la Brasa, Cortes Madurados y Coctelería de Autor.',
  columns: [
    { title: 'Nuestra Carta', links: [{ label: 'Parrilla & Cortes Angus', href: '#servicios' }, { label: 'Barra Marina & Tiraditos', href: '#servicios' }, { label: 'Cava & Vinos', href: '#galeria' }, { label: 'Menú Degustación', href: '#precios' }] },
    { title: 'El Restaurante', links: [{ label: 'Nuestra Historia', href: '#nosotros' }, { label: 'Salones & Terraza', href: '#galeria' }, { label: 'Preguntas Frecuentes', href: '#faq' }, { label: 'Reservar Mesa', href: '#contacto' }] },
    { title: 'Información Legal', links: [{ label: 'Términos de Reserva', href: '#terminos' }, { label: 'Política de Privacidad (Ley 29733)', href: '#privacidad' }, { label: 'Libro de Reclamaciones Virtual', href: '#reclamaciones' }] },
  ],
  socialLinks: [
    { platform: 'whatsapp', url: 'https://wa.me/51981234567' },
    { platform: 'instagram', url: 'https://instagram.com/fuegoybrasa_fjl' },
    { platform: 'facebook', url: 'https://facebook.com/fuegoybrasa_fjl' },
  ],
  legalCopyright: '© 2026 Inversiones Gastronómicas FJL S.A.C. RUC 20609871234.',
  legalLinks: [
    { label: 'Términos y Condiciones de Reserva', href: '#terminos' },
    { label: 'Protección de Datos Personales', href: '#privacidad' },
    { label: 'Libro de Reclamaciones', href: '#reclamaciones' },
  ],
};

export const MOCK_RESTAURANT_SECTIONS = [
  { id: 'r-nav', pageId: 'page_rest_home', type: 'navbar' as const, schemaVersion: 1, position: 1, enabled: true, data: restaurantNavbar },
  { id: 'r-hero', pageId: 'page_rest_home', type: 'hero' as const, schemaVersion: 1, position: 2, enabled: true, data: restaurantHero },
  { id: 'r-features', pageId: 'page_rest_home', type: 'features' as const, schemaVersion: 1, position: 3, enabled: true, data: restaurantFeatures },
  { id: 'r-services', pageId: 'page_rest_home', type: 'services' as const, schemaVersion: 1, position: 4, enabled: true, data: restaurantServices },
  { id: 'r-about', pageId: 'page_rest_home', type: 'about' as const, schemaVersion: 1, position: 5, enabled: true, data: restaurantAbout },
  { id: 'r-products', pageId: 'page_rest_home', type: 'products' as const, schemaVersion: 1, position: 6, enabled: true, data: restaurantProducts },
  { id: 'r-gallery', pageId: 'page_rest_home', type: 'gallery' as const, schemaVersion: 1, position: 7, enabled: true, data: restaurantGallery },
  { id: 'r-testimonials', pageId: 'page_rest_home', type: 'testimonials' as const, schemaVersion: 1, position: 8, enabled: true, data: restaurantTestimonials },
  { id: 'r-pricing', pageId: 'page_rest_home', type: 'pricing' as const, schemaVersion: 1, position: 9, enabled: true, data: restaurantPricing },
  { id: 'r-faq', pageId: 'page_rest_home', type: 'faq' as const, schemaVersion: 1, position: 10, enabled: true, data: restaurantFAQ },
  { id: 'r-contact', pageId: 'page_rest_home', type: 'contact' as const, schemaVersion: 1, position: 11, enabled: true, data: restaurantContact },
  { id: 'r-cta', pageId: 'page_rest_home', type: 'cta' as const, schemaVersion: 1, position: 12, enabled: true, data: restaurantCTA },
  { id: 'r-footer', pageId: 'page_rest_home', type: 'footer' as const, schemaVersion: 1, position: 13, enabled: true, data: restaurantFooter },
];

export const MOCK_SITE_RESTAURANT: Site = {
  id: 'site_restaurant_02',
  organizationId: 'org_02_restaurante',
  name: 'Fuego & Brasa FJL — Web Oficial',
  status: 'published',
  theme: THEME_PRESETS['restaurant-ember'],
  seo: {
    title: 'Fuego & Brasa FJL — Carnes a la Leña y Cocina Criolla en Miraflores',
    description: 'Parrilla criolla de autor, cortes Angus al quebracho y pesca fresca del día en Miraflores.',
    keywords: ['restaurante miraflores', 'parrilla criolla lima', 'carnes a la brasa fjl'],
    allowRobotsIndex: true,
  },
  createdBy: 'user_admin_02',
  updatedBy: 'user_admin_02',
  createdAt: '2026-10-15T14:30:00Z',
  updatedAt: '2026-10-30T19:00:00Z',
};

// ==============================================================================
// REGISTROS EN MEMORIA DE FORMULARIOS (Simulación de Contactos y Reservas)
// ==============================================================================
export const MOCK_FORM_SUBMISSIONS_STORE: FormSubmission[] = [
  {
    id: 'sub_001',
    siteId: 'site_dental_01',
    formData: {
      fullName: 'Sofía Mendívil',
      email: 'sofia.mendivil@gmail.com',
      phone: '+51 993 112 456',
      service: 'Ortodoncia Invisible',
      message: 'Buenas tardes, quisiera saber si tienen disponibilidad para evaluación el sábado en la mañana.',
      privacyAccepted: true,
      submittedAt: '2026-10-31T11:20:00Z',
    },
    createdAt: '2026-10-31T11:20:00Z',
  },
  {
    id: 'sub_002',
    siteId: 'site_restaurant_02',
    formData: {
      fullName: 'Carlos Arismendi',
      email: 'carlos.arismendi@empresa.pe',
      phone: '+51 981 445 789',
      service: 'Cena Romántica / Aniversario',
      message: 'Buenas noches, desearía reservar una mesa en terraza para 2 personas este viernes a las 8:30 PM.',
      privacyAccepted: true,
      submittedAt: '2026-10-31T14:10:00Z',
    },
    createdAt: '2026-10-31T14:10:00Z',
  },
];
