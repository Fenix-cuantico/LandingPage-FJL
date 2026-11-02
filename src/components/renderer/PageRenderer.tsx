// ==============================================================================
// FJL — PageRenderer: Motor de Renderizado Público (Sección 4 del Documento Maestro)
// Cumple con las 8 Reglas Maestras del Renderer de la Arquitectura FJL
// ==============================================================================

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Section, SectionType } from '../../types';
import { validateSectionSafe } from '../../schemas/sections';

// Importación de los 13 componentes de sección del MVP
import { Navbar } from '../landing/Navbar';
import { Hero } from '../landing/Hero';
import { Features } from '../landing/Features';
import { Services } from '../landing/Services';
import { About } from '../landing/About';
import { Products } from '../landing/Products';
import { Gallery } from '../landing/Gallery';
import { Testimonials } from '../landing/Testimonials';
import { Pricing } from '../landing/Pricing';
import { FAQ } from '../landing/FAQ';
import { Contact } from '../landing/Contact';
import { CallToAction } from '../landing/CallToAction';
import { Footer } from '../landing/Footer';

/**
 * REGLA 1: Registro explícito de tipos de sección permitidos.
 * Si un componente no está registrado aquí, nunca se ejecutará.
 */
export const SECTION_REGISTRY: Record<SectionType, React.ComponentType<{ data: any }>> = {
  navbar: Navbar,
  hero: Hero,
  features: Features,
  services: Services,
  about: About,
  products: Products,
  gallery: Gallery,
  testimonials: Testimonials,
  pricing: Pricing,
  faq: FAQ,
  contact: Contact,
  cta: CallToAction,
  footer: Footer,
};

/**
 * REGLA 7: Error Boundary aislado por sección.
 * Si una sección falla al renderizar, se captura el error y se muestra el resto de la página.
 */
interface SectionErrorBoundaryProps {
  sectionType: string;
  sectionId: string;
  children: ReactNode;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class SectionErrorBoundary extends Component<SectionErrorBoundaryProps, SectionErrorBoundaryState> {
  constructor(props: SectionErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): SectionErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // En producción se reporta a Sentry (Sección 11.1)
    console.error(
      `[FJL ErrorBoundary] Error en sección "${this.props.sectionType}" (${this.props.sectionId}):`,
      error,
      errorInfo
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-6 px-4 bg-amber-50/50 border-y border-amber-200 text-center text-xs text-amber-800">
          <p className="font-semibold">
            [FJL Renderer] La sección "{this.props.sectionType}" no se pudo renderizar.
          </p>
          <p className="text-amber-600">El resto de la página continúa disponible sin interrupciones.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

interface PageRendererProps {
  sections: Section[];
  onFormSubmissionSuccess?: (sub: any) => void;
}

/**
 * Motor PageRenderer principal
 */
export const PageRenderer: React.FC<PageRendererProps> = ({ sections, onFormSubmissionSuccess }) => {
  // REGLA 4: Filtrar por enabled y ordenar por position
  const activeSections = [...sections]
    .filter((sec) => sec.enabled)
    .sort((a, b) => a.position - b.position);

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-900 flex flex-col relative z-10">
      {activeSections.map((section) => {
        // REGLA 3: Omitir tipos desconocidos sin romper la página
        const ComponentToRender = SECTION_REGISTRY[section.type];
        if (!ComponentToRender) {
          console.warn(`[FJL Renderer] Tipo de sección no reconocido: "${section.type}". Omitiendo.`);
          return null;
        }

        // REGLA 2 y 5: Validar con Zod antes de renderizar y aplicar defaults seguros
        const validation = validateSectionSafe(section.type as any, section.data);

        return (
          <SectionErrorBoundary
            key={section.id || `${section.type}-${section.position}`}
            sectionType={section.type}
            sectionId={section.id}
          >
            {/* Si es contacto, conectamos el handler para persistencia en memoria */}
            {section.type === 'contact' ? (
              <ComponentToRender
                data={validation.data}
                {...({ onSubmissionSuccess: onFormSubmissionSuccess } as any)}
              />
            ) : (
              <ComponentToRender data={validation.data} />
            )}
          </SectionErrorBoundary>
        );
      })}
    </main>
  );
};

