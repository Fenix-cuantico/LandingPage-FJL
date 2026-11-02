import React, { useState, useEffect, useRef } from 'react';
import { ThemeTokens, Section, FormSubmission } from './types';
import { 
  MOCK_ORGANIZATIONS, 
  MOCK_SITE_DENTAL, 
  MOCK_DENTAL_SECTIONS, 
  MOCK_SITE_RESTAURANT,
  MOCK_RESTAURANT_SECTIONS,
  MOCK_FORM_SUBMISSIONS_STORE 
} from './mock/data';
import { THEME_PRESETS, applyThemeVariables } from './theme/tokens';
import { PageRenderer } from './components/renderer/PageRenderer';
import { MockupToolbar } from './components/mockup/MockupToolbar';
import { VisualEditorDrawer } from './components/mockup/VisualEditorDrawer';
import { CanvaDragProvider } from './components/mockup/CanvaDragProvider';
import { TopBanner } from './components/landing/TopBanner';
import { WhatsAppWidget } from './components/landing/WhatsAppWidget';
import { Check, RotateCcw } from 'lucide-react';

export function App() {
  // Selector de Cliente: 'dental' o 'restaurant'
  const [activeClient, setActiveClient] = useState<'dental' | 'restaurant'>('dental');

  // Estado del tema activo
  const [currentTheme, setCurrentTheme] = useState<ThemeTokens>(THEME_PRESETS['dental-clinic']);

  // Estado de las secciones activas
  const [sections, setSections] = useState<Section[]>(MOCK_DENTAL_SECTIONS);

  // Almacén en memoria de envíos de formularios
  const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>(MOCK_FORM_SUBMISSIONS_STORE);

  // Estado del Cajón del Editor Visual en Vivo
  const [isVisualEditorOpen, setIsVisualEditorOpen] = useState(false);

  // Toast de notificación de estado (Guardado / Cancelado)
  const [toastNotification, setToastNotification] = useState<{ message: string; type: 'save' | 'cancel' } | null>(null);

  // Snapshot de Respaldo al abrir el editor (para la opción explícita "No Guardar / Cancelar y Descartar")
  const sessionSnapshot = useRef<{ sections: Section[]; theme: ThemeTokens } | null>(null);

  // Cambio de cliente: cambia organización, sitio, tema y secciones correspondientes
  const handleClientChange = (client: 'dental' | 'restaurant') => {
    setActiveClient(client);
    if (client === 'dental') {
      setCurrentTheme(THEME_PRESETS['dental-clinic']);
      setSections(MOCK_DENTAL_SECTIONS);
    } else {
      setCurrentTheme(THEME_PRESETS['restaurant-ember']);
      setSections(MOCK_RESTAURANT_SECTIONS);
    }
  };

  // Aplica los tokens del tema dinámicamente al DOM cuando cambia
  useEffect(() => {
    applyThemeVariables(currentTheme);
  }, [currentTheme]);

  // Handler para alternar la visibilidad de una sección (Regla 4: enabled)
  const handleToggleSection = (sectionId: string) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === sectionId ? { ...sec, enabled: !sec.enabled } : sec))
    );
  };

  // Handler para reordenar bloques estilo Lego (Drag & drop o ⬆️ ⬇️)
  const handleReorderSections = (newSections: Section[]) => {
    setSections(newSections);
  };

  // Handler para actualizar datos internos de una sección (títulos, fotos subidas, etc.)
  const handleUpdateSectionData = (sectionId: string, newData: any) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === sectionId ? { ...sec, data: newData } : sec))
    );
  };

  // Handler para restaurar todas las secciones del cliente actual
  const handleResetSections = () => {
    if (activeClient === 'dental') {
      setSections(MOCK_DENTAL_SECTIONS);
    } else {
      setSections(MOCK_RESTAURANT_SECTIONS);
    }
  };

  // Handler para cuando un usuario envía el formulario en la maqueta
  const handleFormSubmission = (newSub: FormSubmission) => {
    const customizedSub = {
      ...newSub,
      siteId: activeClient === 'dental' ? 'site_dental_01' : 'site_restaurant_02',
    };
    setFormSubmissions((prev) => [customizedSub, ...prev]);
  };

  // =========================================================================
  // CONTROL DE SESIÓN DE EDICIÓN: GUARDAR VS CANCELAR / DESCARTAR
  // =========================================================================
  const handleOpenVisualEditor = () => {
    // Tomamos snapshot exacto antes de editar para poder descartar si el usuario lo desea
    sessionSnapshot.current = {
      sections: JSON.parse(JSON.stringify(sections)),
      theme: JSON.parse(JSON.stringify(currentTheme)),
    };
    setIsVisualEditorOpen(true);
  };

  const handleCancelAndDiscard = () => {
    if (sessionSnapshot.current) {
      setSections(sessionSnapshot.current.sections);
      setCurrentTheme(sessionSnapshot.current.theme);
      applyThemeVariables(sessionSnapshot.current.theme);
    }
    setIsVisualEditorOpen(false);
    setToastNotification({
      message: 'Cambios descartados. Se restauró el diseño exactamente a su versión anterior.',
      type: 'cancel',
    });
    setTimeout(() => setToastNotification(null), 3500);
  };

  const handleSaveAndCommit = () => {
    // Confirmamos el snapshot como el nuevo estado guardado
    sessionSnapshot.current = {
      sections: JSON.parse(JSON.stringify(sections)),
      theme: JSON.parse(JSON.stringify(currentTheme)),
    };
    setIsVisualEditorOpen(false);
    setToastNotification({
      message: '¡Cambios guardados con éxito en la configuración del cliente!',
      type: 'save',
    });
    setTimeout(() => setToastNotification(null), 3500);
  };

  // Handler para conmutar el Banner Lateral (true / false) como personalización
  const heroSection = sections.find((s) => s.type === 'hero');
  const isSideBannerEnabled = Boolean((heroSection?.data as any)?.sideBanner?.enabled);

  const handleToggleSideBanner = () => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.type === 'hero') {
          const currentEnabled = Boolean((sec.data as any)?.sideBanner?.enabled);
          return {
            ...sec,
            data: {
              ...sec.data,
              sideBanner: {
                ...(sec.data as any)?.sideBanner,
                enabled: !currentEnabled,
              },
            },
          };
        }
        return sec;
      })
    );
  };

  const activeOrg = activeClient === 'dental' ? MOCK_ORGANIZATIONS[0] : MOCK_ORGANIZATIONS[1];
  const activeSite = activeClient === 'dental' ? MOCK_SITE_DENTAL : MOCK_SITE_RESTAURANT;

  return (
    <CanvaDragProvider>
      <div 
        className="min-h-screen flex flex-col relative selection:bg-amber-500 selection:text-white"
        style={{
          backgroundColor: currentTheme.colors.background,
          color: currentTheme.colors.text,
        }}
      >
        {/* =========================================================================
            CAPA DE PATRÓN O TEXTURA DE FONDO GLOBAL
            ========================================================================= */}
        {currentTheme.backgroundPattern && currentTheme.backgroundPattern !== 'solid' && (
          <div
            className="fixed inset-0 pointer-events-none z-0 transition-all duration-300"
            style={{
              backgroundImage: 'var(--theme-bg-pattern-image)',
              backgroundSize: 'var(--theme-bg-pattern-size)',
              backgroundPosition: 'center',
              backgroundRepeat: currentTheme.backgroundPattern === 'custom-image' ? 'no-repeat' : 'repeat',
              backgroundAttachment: 'fixed',
              opacity: (currentTheme.backgroundOverlayOpacity ?? 100) / 100,
            }}
          />
        )}

        {/* =========================================================================
            TOAST FLOTANTE DE NOTIFICACIÓN (Guardado / Cancelado)
            ========================================================================= */}
        {toastNotification && (
          <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
            <div
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-2xl font-bold text-xs border ${
                toastNotification.type === 'save'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-slate-900 text-amber-300 border-amber-500/40'
              }`}
            >
              {toastNotification.type === 'save' ? (
                <Check className="w-4 h-4 shrink-0 text-slate-950" />
              ) : (
                <RotateCcw className="w-4 h-4 shrink-0 text-amber-400" />
              )}
              <span>{toastNotification.message}</span>
            </div>
          </div>
        )}

        {/* Barra de Herramientas del Inspector FJL con simulador de clientes */}
        <MockupToolbar
          activeClient={activeClient}
          onClientChange={handleClientChange}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          sections={sections}
          onToggleSection={handleToggleSection}
          onResetSections={handleResetSections}
          activeOrg={activeOrg}
          activeSite={activeSite}
          formSubmissions={formSubmissions}
          isSideBannerEnabled={isSideBannerEnabled}
          onToggleSideBanner={handleToggleSideBanner}
          onOpenVisualEditor={handleOpenVisualEditor}
        />

        {/* Barra de Anuncio Superior Configurable */}
        <TopBanner banner={currentTheme.topBanner} />

        {/* Cajón Lateral del Editor Visual en Vivo */}
        <VisualEditorDrawer
          isOpen={isVisualEditorOpen}
          onClose={() => setIsVisualEditorOpen(false)}
          onCancelAndDiscard={handleCancelAndDiscard}
          onSaveAndCommit={handleSaveAndCommit}
          sections={sections}
          onReorderSections={handleReorderSections}
          onToggleSection={handleToggleSection}
          onUpdateSectionData={handleUpdateSectionData}
          theme={currentTheme}
          onThemeUpdate={setCurrentTheme}
          activeClient={activeClient}
        />

        {/* Motor de Renderizado Público PageRenderer */}
        <div className="flex-1 w-full relative z-10">
          <PageRenderer
            sections={sections}
            onFormSubmissionSuccess={handleFormSubmission}
          />
        </div>

        {/* Widget Flotante de WhatsApp para Conversión Directa */}
        <WhatsAppWidget widget={currentTheme.whatsappWidget} />
      </div>
    </CanvaDragProvider>
  );
}

export default App;
