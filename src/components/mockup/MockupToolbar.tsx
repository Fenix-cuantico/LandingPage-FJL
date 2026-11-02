import React, { useState } from 'react';
import { ThemeTokens, Section, Organization, Site, FormSubmission } from '../../types';
import { THEME_PRESETS } from '../../theme/tokens';
import { 
  Building2,
  Palette, 
  Layers, 
  FileCode, 
  Database, 
  ChevronDown, 
  Check, 
  RotateCcw,
  Globe,
  Sparkles,
  Utensils,
  Stethoscope,
  Tag,
  Move,
  X
} from 'lucide-react';
import { useCanva } from './CanvaDragProvider';

interface MockupToolbarProps {
  activeClient: 'dental' | 'restaurant';
  onClientChange: (client: 'dental' | 'restaurant') => void;
  currentTheme: ThemeTokens;
  onThemeChange: (theme: ThemeTokens) => void;
  sections: Section[];
  onToggleSection: (id: string) => void;
  onResetSections: () => void;
  activeOrg: Organization;
  activeSite: Site;
  formSubmissions: FormSubmission[];
  isSideBannerEnabled?: boolean;
  onToggleSideBanner?: () => void;
  onOpenVisualEditor?: () => void;
}

export const MockupToolbar: React.FC<MockupToolbarProps> = ({
  activeClient,
  onClientChange,
  currentTheme,
  onThemeChange,
  sections,
  onToggleSection,
  onResetSections,
  activeOrg,
  activeSite,
  formSubmissions,
  isSideBannerEnabled = false,
  onToggleSideBanner,
  onOpenVisualEditor,
}) => {
  const [activeModal, setActiveModal] = useState<'none' | 'sections' | 'snapshot' | 'database'>('none');
  const { isCanvaMode, toggleCanvaMode, resetOffsets, offsets } = useCanva();

  const enabledCount = sections.filter((s) => s.enabled).length;
  const filteredSubmissions = formSubmissions.filter((s) => s.siteId === activeSite.id);
  const hasCanvaOffsets = Object.keys(offsets).length > 0;

  return (
    <>
      {/* Barra de Control Flotante Superior */}
      <aside 
        aria-label="Panel Inspector FJL"
        className="sticky top-0 z-50 w-full bg-slate-950 text-white backdrop-blur-md border-b border-slate-800 shadow-2xl transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            
            {/* LADO IZQUIERDO: Identificador de Plataforma Multi-Tenant */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-950/80 border border-blue-800 text-blue-300 font-bold uppercase tracking-wider text-[11px] font-heading">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>FJL Platform v1.1</span>
              </div>

              {/* SELECTOR DE CLIENTE (Multi-tenant Simulator) */}
              <div className="flex items-center bg-slate-900 border border-slate-700/80 p-0.5 rounded-lg shadow-inner">
                <button
                  type="button"
                  onClick={() => onClientChange('dental')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold text-xs transition-all ${
                    activeClient === 'dental'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Cliente 1: Dental FJL</span>
                </button>

                <button
                  type="button"
                  onClick={() => onClientChange('restaurant')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold text-xs transition-all ${
                    activeClient === 'restaurant'
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Cliente 2: Restaurante FJL</span>
                </button>
              </div>

              {/* Indicador de Dominio Simulado */}
              <div className="hidden xl:flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                <Globe className="w-3 h-3 text-slate-500" />
                <span>Host: <strong className="text-slate-200">{activeClient === 'dental' ? 'dental.fjl.com' : 'restaurante.fjl.com'}</strong></span>
              </div>
            </div>

            {/* LADO DERECHO: Controles de Maqueta y Arquitectura */}
            <div className="flex items-center gap-2">
              
              {/* Botón Principal: Modo Editor Visual */}
              {onOpenVisualEditor && (
                <button
                  type="button"
                  onClick={onOpenVisualEditor}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
                  title="Abrir editor visual para ordenar secciones, subir fotos, cambiar colores y fuentes"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span className="hidden sm:inline">Editor Visual</span>
                </button>
              )}

              {/* Botón Aparte: Modo Disposición Libre */}
              <button
                type="button"
                onClick={toggleCanvaMode}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all active:scale-95 ${
                  isCanvaMode
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-2 ring-purple-400'
                    : 'bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-800/80 hover:border-purple-600'
                }`}
                title="Entrar al modo de arrastre libre para tomar el banner y tarjetas y colocarlos donde gustes"
              >
                <Move className="w-3.5 h-3.5" />
                <span>{isCanvaMode ? 'Lienzo Libre (Activo)' : 'Modo Lienzo Libre'}</span>
              </button>

              {/* Botón Reestablecer Posiciones (Solicitud explícita del usuario) */}
              {hasCanvaOffsets && (
                <button
                  type="button"
                  onClick={resetOffsets}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors animate-in fade-in"
                  title="Volver a las posiciones originales antes de mover los elementos"
                >
                  <RotateCcw className="w-3 h-3 text-amber-400" />
                  <span className="hidden md:inline">Reestablecer</span>
                </button>
              )}

              {/* Selector de Temas */}
              <div className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium transition-colors border border-slate-800"
                >
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Tema:</span>
                  <span className="font-semibold text-white">{currentTheme.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                <div className="hidden group-hover:block absolute right-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1 z-50">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
                    Tokens de Diseño (Sección 4)
                  </div>
                  {Object.entries(THEME_PRESETS).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => onThemeChange(theme)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                        currentTheme.name === theme.name
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full shrink-0" 
                          style={{ backgroundColor: theme.colors.primary }} 
                        />
                        <span className="truncate">{theme.name}</span>
                      </div>
                      {currentTheme.name === theme.name && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botón Toggle Banner Lateral (Solicitud específica: Activar con true/false) */}
              {onToggleSideBanner && (
                <button
                  type="button"
                  onClick={onToggleSideBanner}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors border ${
                    isSideBannerEnabled
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800'
                  }`}
                  title="Demuestra la activación con un simple true/false en la configuración del cliente"
                >
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Banner Lateral:</span>
                  <span className="font-bold text-[11px] uppercase">{isSideBannerEnabled ? 'ON (true)' : 'OFF (false)'}</span>
                </button>
              )}

              {/* Botón Gestor de Secciones */}
              <button
                type="button"
                onClick={() => setActiveModal(activeModal === 'sections' ? 'none' : 'sections')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors border ${
                  activeModal === 'sections'
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Secciones</span>
                <span>({enabledCount}/{sections.length})</span>
              </button>

              {/* Botón Ver Snapshot JSON */}
              <button
                type="button"
                onClick={() => setActiveModal(activeModal === 'snapshot' ? 'none' : 'snapshot')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors border ${
                  activeModal === 'snapshot'
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">Snapshot JSON</span>
              </button>

              {/* Botón Base de Datos Mock */}
              <button
                type="button"
                onClick={() => setActiveModal(activeModal === 'database' ? 'none' : 'database')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors border ${
                  activeModal === 'database'
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800'
                }`}
              >
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline">BD Mock</span>
                <span>({filteredSubmissions.length})</span>
              </button>
            </div>

          </div>
        </div>
      </aside>

      {/* MODAL 1: GESTOR DE SECCIONES (Activar/Desactivar bloques) */}
      {activeModal === 'sections' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl text-white shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-400" />
                  <span>Gestor de Secciones — {activeOrg.name}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Regla 4: Respetar posición y estado <code>enabled</code> en tiempo real.
                </p>
              </div>
              <button
                onClick={() => setActiveModal('none')}
                className="text-slate-400 hover:text-white p-1"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-2.5 flex-1">
              {sections.map((sec) => (
                <div
                  key={sec.id}
                  onClick={() => onToggleSection(sec.id)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    sec.enabled
                      ? 'bg-slate-800/80 border-blue-500/50 hover:border-blue-400'
                      : 'bg-slate-950/40 border-slate-800 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-400">
                      {sec.position}
                    </span>
                    <div>
                      <span className="font-bold text-sm block capitalize font-heading">
                        {sec.type}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        schemaVersion: {sec.schemaVersion} • id: {sec.id}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      sec.enabled ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {sec.enabled ? 'Visible' : 'Oculto'}
                    </span>
                    <input
                      type="checkbox"
                      checked={sec.enabled}
                      onChange={() => {}}
                      className="w-4 h-4 text-blue-600 rounded bg-slate-900 border-slate-700 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/60">
              <button
                type="button"
                onClick={onResetSections}
                className="text-xs font-medium text-slate-400 hover:text-slate-200 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar todas las secciones</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500"
              >
                Cerrar y Ver Landing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SNAPSHOT JSON (Sección 8.1 y 14.1 Regla 17) */}
      {activeModal === 'snapshot' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl text-white shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-amber-400" />
                  <span>Snapshot Publicado ({activeOrg.name})</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Regla 17: Nada se publica sin snapshot. El visitante lee esta versión inmutable cacheada con siteId.
                </p>
              </div>
              <button
                onClick={() => setActiveModal('none')}
                className="text-slate-400 hover:text-white p-1"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 font-mono text-xs bg-slate-950 text-slate-300">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(
                  {
                    siteId: activeSite.id,
                    organizationId: activeOrg.id,
                    organizationName: activeOrg.name,
                    hostname: activeClient === 'dental' ? 'dental.fjl.com' : 'restaurante.fjl.com',
                    publishedAt: new Date().toISOString(),
                    version: 1,
                    theme: currentTheme,
                    seo: activeSite.seo,
                    sections: sections.filter((s) => s.enabled),
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            <div className="p-4 border-t border-slate-800 flex items-center justify-end bg-slate-950/60">
              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-700"
              >
                Cerrar Visor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: BASE DE DATOS MOCK & RLS (Sección 5 y 6) */}
      {activeModal === 'database' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl text-white shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-400" />
                  <span>Base de Datos PostgreSQL (Aislamiento RLS Simulado)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Sección 6.1: Cada cliente ve únicamente sus datos gracias al filtro <code>organizationId</code>.
                </p>
              </div>
              <button
                onClick={() => setActiveModal('none')}
                className="text-slate-400 hover:text-white p-1"
                title="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              
              {/* Tabla Form Submissions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold uppercase tracking-wider text-emerald-400 font-heading">
                    Tabla: FormSubmission ({activeOrg.name})
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Total para este cliente: {filteredSubmissions.length} registro(s)
                  </span>
                </div>

                {filteredSubmissions.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-slate-500">
                    No hay solicitudes para este cliente aún. Llena el formulario de la landing para ver el registro aparecer aquí.
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-800 overflow-hidden">
                    <table className="w-full text-left font-mono">
                      <thead className="bg-slate-800/80 text-slate-300">
                        <tr>
                          <th className="p-2.5">ID</th>
                          <th className="p-2.5">Nombre</th>
                          <th className="p-2.5">Contacto</th>
                          <th className="p-2.5">Servicio / Ocasión</th>
                          <th className="p-2.5">Fecha UTC</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-slate-950">
                        {filteredSubmissions.map((sub) => (
                          <tr key={sub.id} className="hover:bg-slate-900/50">
                            <td className="p-2.5 text-blue-400">{sub.id}</td>
                            <td className="p-2.5 font-bold text-white">{sub.formData.fullName}</td>
                            <td className="p-2.5 text-slate-400">
                              {sub.formData.phone} <br />
                              <span className="text-[10px] text-slate-500">{sub.formData.email}</span>
                            </td>
                            <td className="p-2.5 text-emerald-400">{sub.formData.service}</td>
                            <td className="p-2.5 text-slate-500 text-[10px]">{sub.createdAt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Resumen de Tenancy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Organización Activa:</span>
                  <div className="font-bold text-white text-sm">{activeOrg.name}</div>
                  <div className="text-slate-500 font-mono text-[10px]">ID: {activeOrg.id} (slug: {activeOrg.slug})</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Sitio Web & Dominio:</span>
                  <div className="font-bold text-white text-sm">{activeSite.name}</div>
                  <div className="text-slate-500 font-mono text-[10px]">
                    Host: {activeClient === 'dental' ? 'dental.fjl.com' : 'restaurante.fjl.com'}
                  </div>
                </div>
              </div>

            </div>

            <div className="p-4 border-t border-slate-800 flex items-center justify-end bg-slate-950/60">
              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-700"
              >
                Cerrar Visor
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
