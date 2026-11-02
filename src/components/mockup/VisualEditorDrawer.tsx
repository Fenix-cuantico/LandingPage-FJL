import React, { useState, useRef } from 'react';
import { Section, ThemeTokens } from '../../types';
import { 
  X, 
  Layers, 
  Palette, 
  Type, 
  Upload, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  GripVertical, 
  RotateCcw, 
  Sparkles,
  Save,
  Sliders,
  Plus,
  Trash2,
  Megaphone,
  MessageCircle,
  Download,
  Copy,
  Paintbrush
} from 'lucide-react';

interface VisualEditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCancelAndDiscard: () => void;
  onSaveAndCommit: () => void;
  sections: Section[];
  onReorderSections: (newSections: Section[]) => void;
  onToggleSection: (id: string) => void;
  onUpdateSectionData: (sectionId: string, newData: any) => void;
  theme: ThemeTokens;
  onThemeUpdate: (updatedTheme: ThemeTokens) => void;
  activeClient: 'dental' | 'restaurant';
}

export const VisualEditorDrawer: React.FC<VisualEditorDrawerProps> = ({
  isOpen,
  onClose,
  onCancelAndDiscard,
  onSaveAndCommit,
  sections,
  onReorderSections,
  onToggleSection,
  onUpdateSectionData,
  theme,
  onThemeUpdate,
  activeClient,
}) => {
  const [activeTab, setActiveTab] = useState<'lego' | 'background' | 'styles' | 'media' | 'content' | 'extras'>('background');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Referencias para carga de archivos desde la computadora
  const heroFileRef = useRef<HTMLInputElement>(null);
  const aboutFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);
  const bgFileRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // ----------------------------------------------------------------------------
  // FUNCIONES PARA REORDENAMIENTO LEGO (Drag & Drop y Botones ⬆️ ⬇️)
  // ----------------------------------------------------------------------------
  const moveSection = (currentIndex: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const [moved] = newSections.splice(currentIndex, 1);
    newSections.splice(targetIndex, 0, moved);

    const reindexed = newSections.map((s, idx) => ({ ...s, position: idx + 1 }));
    onReorderSections(reindexed);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newSections = [...sections];
    const [moved] = newSections.splice(draggedIndex, 1);
    newSections.splice(index, 0, moved);

    const reindexed = newSections.map((s, idx) => ({ ...s, position: idx + 1 }));
    onReorderSections(reindexed);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // ----------------------------------------------------------------------------
  // SUBIDA DE ARCHIVOS LOCALES (Blob URLs en memoria)
  // ----------------------------------------------------------------------------
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'hero' | 'about' | 'gallery' | 'background'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);

    if (target === 'background') {
      onThemeUpdate({
        ...theme,
        backgroundPattern: 'custom-image',
        backgroundImageUrl: localUrl,
      });
    } else if (target === 'hero') {
      const heroSec = sections.find((s) => s.type === 'hero');
      if (heroSec) {
        onUpdateSectionData(heroSec.id, {
          ...heroSec.data,
          visualCard: {
            ...heroSec.data.visualCard,
            imageUrl: localUrl,
          },
        });
      }
    } else if (target === 'about') {
      const aboutSec = sections.find((s) => s.type === 'about');
      if (aboutSec) {
        onUpdateSectionData(aboutSec.id, {
          ...aboutSec.data,
          imageUrl: localUrl,
        });
      }
    } else if (target === 'gallery') {
      const gallerySec = sections.find((s) => s.type === 'gallery');
      if (gallerySec && gallerySec.data.items?.length > 0) {
        const newItems = [...gallerySec.data.items];
        newItems[0] = { ...newItems[0], imageUrl: localUrl, title: `Foto Subida: ${file.name}` };
        onUpdateSectionData(gallerySec.id, {
          ...gallerySec.data,
          items: newItems,
        });
      }
    }
  };

  // ----------------------------------------------------------------------------
  // MANEJADORES DE ESTILOS Y COLORES
  // ----------------------------------------------------------------------------
  const handleColorChange = (key: keyof ThemeTokens['colors'], value: string) => {
    onThemeUpdate({
      ...theme,
      colors: {
        ...theme.colors,
        [key]: value,
      },
    });
  };

  const handleFontChange = (fontHeading: string) => {
    onThemeUpdate({
      ...theme,
      fontHeading,
    });
  };

  const handleRadiusChange = (borderRadius: string) => {
    onThemeUpdate({
      ...theme,
      borderRadius,
    });
  };

  // ----------------------------------------------------------------------------
  // GESTOR DINÁMICO DE TARJETAS DE SERVICIOS / MENÚ
  // ----------------------------------------------------------------------------
  const servicesSec = sections.find((s) => s.type === 'services');

  const handleAddServiceCard = () => {
    if (!servicesSec) return;
    const currentItems = servicesSec.data.items || [];
    const newId = `item_custom_${Date.now()}`;
    const newItem = {
      id: newId,
      title: activeClient === 'dental' ? 'Nuevo Tratamiento Especializado' : 'Nuevo Plato de Autor / Maridaje',
      description: activeClient === 'dental' 
        ? 'Evaluación diagnóstica con tecnología 3D y garantía de satisfacción.' 
        : 'Cocción lenta a fuego de leña con guarnición rústica y reducción artesanal.',
      icon: 'Sparkles',
      badge: 'Novedad',
      priceFrom: activeClient === 'dental' ? 'Desde S/ 150' : 'S/ 68.00',
      features: ['Atención personalizada', 'Insumos de primera calidad', '100% Garantizado'],
    };

    onUpdateSectionData(servicesSec.id, {
      ...servicesSec.data,
      items: [newItem, ...currentItems],
    });
  };

  const handleDeleteServiceCard = (idToDelete: string) => {
    if (!servicesSec) return;
    const filtered = (servicesSec.data.items || []).filter((item: any) => item.id !== idToDelete);
    onUpdateSectionData(servicesSec.id, {
      ...servicesSec.data,
      items: filtered,
    });
  };

  // ----------------------------------------------------------------------------
  // EXPORTAR E IMPORTAR CONFIGURACIÓN (.json)
  // ----------------------------------------------------------------------------
  const handleExportJson = () => {
    const configSnapshot = {
      timestamp: new Date().toISOString(),
      client: activeClient,
      theme,
      sections,
    };
    const jsonStr = JSON.stringify(configSnapshot, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fjl-${activeClient}-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyJson = () => {
    const configSnapshot = {
      timestamp: new Date().toISOString(),
      client: activeClient,
      theme,
      sections,
    };
    navigator.clipboard.writeText(JSON.stringify(configSnapshot, null, 2));
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const heroSec = sections.find((s) => s.type === 'hero');
  const navbarSec = sections.find((s) => s.type === 'navbar');

  return (
    <aside
      aria-label="Editor visual en vivo FJL"
      className="fixed inset-y-0 right-0 z-50 w-full max-w-md sm:max-w-lg bg-slate-950 text-white shadow-2xl border-l border-slate-800 flex flex-col animate-in slide-in-from-right duration-300"
    >
      {/* =========================================================================
          CABECERA DEL EDITOR
          ========================================================================= */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-inner">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold font-heading text-white flex items-center gap-2">
              <span>Personalizador FJL</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700">
                100% Configurable
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Personaliza fondo, bloques, fotos, tarjetas y tipografías en tiempo real.
            </p>
          </div>
        </div>

        <button
          onClick={onCancelAndDiscard}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Cerrar y descartar cambios"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* =========================================================================
          BARRA DE PESTAÑAS (6 PESTAÑAS COMPLETAS)
          ========================================================================= */}
      <div className="grid grid-cols-6 border-b border-slate-800 bg-slate-900 text-[11px] font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('background')}
          className={`py-3 px-1 flex flex-col items-center justify-center gap-1 border-b-2 transition-all ${
            activeTab === 'background'
              ? 'border-amber-400 text-amber-400 bg-slate-800/60'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
          title="Opciones de Fondo y Texturas"
        >
          <Paintbrush className="w-3.5 h-3.5" />
          <span className="truncate">Fondo</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('lego')}
          className={`py-3 px-1 flex flex-col items-center justify-center gap-1 border-b-2 transition-all ${
            activeTab === 'lego'
              ? 'border-amber-400 text-amber-400 bg-slate-800/60'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
          title="Reordenar Bloques Lego"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="truncate">Bloques</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('styles')}
          className={`py-3 px-1 flex flex-col items-center justify-center gap-1 border-b-2 transition-all ${
            activeTab === 'styles'
              ? 'border-amber-400 text-amber-400 bg-slate-800/60'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
          title="Estilos, Colores y Tipografías"
        >
          <Palette className="w-3.5 h-3.5" />
          <span className="truncate">Estilos</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('media')}
          className={`py-3 px-1 flex flex-col items-center justify-center gap-1 border-b-2 transition-all ${
            activeTab === 'media'
              ? 'border-amber-400 text-amber-400 bg-slate-800/60'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
          title="Subir Fotos desde tu PC"
        >
          <Upload className="w-3.5 h-3.5" />
          <span className="truncate">Fotos</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`py-3 px-1 flex flex-col items-center justify-center gap-1 border-b-2 transition-all ${
            activeTab === 'content'
              ? 'border-amber-400 text-amber-400 bg-slate-800/60'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
          title="Textos y Gestor de Tarjetas"
        >
          <Type className="w-3.5 h-3.5" />
          <span className="truncate">Tarjetas</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('extras')}
          className={`py-3 px-1 flex flex-col items-center justify-center gap-1 border-b-2 transition-all ${
            activeTab === 'extras'
              ? 'border-amber-400 text-amber-400 bg-slate-800/60'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
          title="Anuncios, WhatsApp y Exportar"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="truncate">Extras</span>
        </button>
      </div>

      {/* =========================================================================
          CUERPO DEL PANEL
          ========================================================================= */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs">
        
        {/* =====================================================================
            TAB 1: OPCIONES DE FONDO & TEXTURAS (Solicitud directa del usuario)
            ===================================================================== */}
        {activeTab === 'background' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 text-slate-300">
              <span className="font-bold text-amber-400 block mb-1">
                Personalizacion de Fondo:
              </span>
              <span>
                Elige patrones de diseno geometricos, colores personalizados o sube una imagen o textura directamente desde tu computadora.
              </span>
            </div>

            {/* Selector de Patrones de Fondo */}
            <div className="space-y-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <label className="font-bold text-slate-200 block text-xs">
                Patron o Textura del Fondo Global:
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'solid', label: 'Color Solido' },
                  { id: 'dots', label: 'Puntos Sutiles' },
                  { id: 'grid', label: 'Cuadricula' },
                  { id: 'mesh', label: 'Degradado Suave' },
                  { id: 'radial', label: 'Foco Central' },
                  { id: 'custom-image', label: 'Imagen / Textura' },
                ].map((pat) => (
                  <button
                    key={pat.id}
                    type="button"
                    onClick={() => onThemeUpdate({ ...theme, backgroundPattern: pat.id as any })}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      (theme.backgroundPattern || 'solid') === pat.id
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[11px] font-semibold">{pat.label}</span>
                  </button>
                ))}
              </div>

              {/* Botón para subir textura/foto personalizada si se selecciona 'custom-image' */}
              {theme.backgroundPattern === 'custom-image' && (
                <div className="pt-3 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-200 block text-xs">
                        Subir Fondo desde tu PC:
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Acepta JPG, PNG, WebP o SVG
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => bgFileRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Elegir archivo</span>
                    </button>
                    <input
                      ref={bgFileRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'background')}
                      className="hidden"
                    />
                  </div>

                  {theme.backgroundImageUrl && (
                    <div className="relative rounded-xl overflow-hidden aspect-video border border-slate-700">
                      <img
                        src={theme.backgroundImageUrl}
                        alt="Fondo cargado"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => onThemeUpdate({ ...theme, backgroundImageUrl: undefined, backgroundPattern: 'solid' })}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white shadow"
                        title="Quitar fondo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Texturas Rápidas Pre-configuradas */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-semibold text-slate-400 block">
                      O elige una textura lista:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { 
                          name: 'Pared Rústica / Piedra', 
                          url: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=1200&q=80' 
                        },
                        { 
                          name: 'Madera Cálida Gourmet', 
                          url: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1200&q=80' 
                        },
                        { 
                          name: 'Mármol Blanco Minimal', 
                          url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80' 
                        },
                        { 
                          name: 'Pizarra Negra Studio', 
                          url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80' 
                        },
                      ].map((tex) => (
                        <button
                          key={tex.name}
                          type="button"
                          onClick={() => onThemeUpdate({
                            ...theme,
                            backgroundPattern: 'custom-image',
                            backgroundImageUrl: tex.url,
                          })}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 hover:border-amber-500/50 text-left truncate"
                        >
                          {tex.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Selector de Color de Fondo */}
            <div className="space-y-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <label className="font-bold text-slate-200 block text-xs">
                Color Base de Fondo de la Web:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.colors.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer border border-slate-700 bg-transparent p-0"
                />
                <input
                  type="text"
                  value={theme.colors.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white flex-1"
                />
              </div>

              {/* Presets de Color de Fondo */}
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {[
                  { name: 'Blanco Puro', color: '#ffffff' },
                  { name: 'Blanco Frío (Salud)', color: '#f8fafc' },
                  { name: 'Arena Cálido (Gourmet)', color: '#fcfaf7' },
                  { name: 'Gris Pizarra', color: '#f1f5f9' },
                  { name: 'Dark Obsidian', color: '#090d16' },
                  { name: 'Carbón Profundo', color: '#121212' },
                ].map((bg) => (
                  <button
                    key={bg.color}
                    type="button"
                    onClick={() => handleColorChange('background', bg.color)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-slate-300 hover:border-slate-700 truncate"
                  >
                    <span className="w-2.5 h-2.5 rounded-full border border-slate-600 shrink-0" style={{ backgroundColor: bg.color }} />
                    <span className="truncate">{bg.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider de Opacidad de Overlay */}
            <div className="space-y-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-200 block text-xs">
                  Intensidad / Opacidad del Patrón de Fondo:
                </label>
                <span className="font-mono text-amber-400 font-bold">
                  {theme.backgroundOverlayOpacity ?? 100}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={theme.backgroundOverlayOpacity ?? 100}
                onChange={(e) => onThemeUpdate({ ...theme, backgroundOverlayOpacity: Number(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">
                Ajusta la intensidad visual para garantizar máximo contraste y legibilidad en todos los dispositivos.
              </p>
            </div>

            {/* Efecto Glassmorphism / Tarjetas Translúcidas */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200 block text-xs">
                  Efecto Vidrio Esmerilado (Glassmorphism):
                </span>
                <span className="text-[11px] text-slate-400">
                  Hace que las tarjetas sean translúcidas para dejar lucir el fondo.
                </span>
              </div>
              <button
                type="button"
                onClick={() => onThemeUpdate({ ...theme, cardGlassmorphism: !theme.cardGlassmorphism })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  theme.cardGlassmorphism ? 'bg-amber-500' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    theme.cardGlassmorphism ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

          </div>
        )}

        {/* =====================================================================
            TAB 2: BLOQUES LEGO Y REORDENAMIENTO IMANIZADO
            ===================================================================== */}
        {activeTab === 'lego' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 text-slate-300">
              <span className="font-bold text-amber-400 block mb-1">
                Reordenamiento Modular de Secciones:
              </span>
              <span>
                Arrastra las secciones o pulsa los botones de subir y bajar para cambiar la posicion de cualquier bloque. La pagina se reordena de forma instantanea.
              </span>
            </div>

            <div className="space-y-2">
              {sections.map((sec, idx) => {
                const isDragging = draggedIndex === idx;
                const isOver = dragOverIndex === idx;

                return (
                  <div
                    key={sec.id}
                    draggable
                    onDragStart={() => handleDragStart(idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDrop={() => handleDrop(idx)}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                      isDragging
                        ? 'opacity-40 border-amber-500 bg-slate-800 scale-95'
                        : isOver
                        ? 'border-amber-400 bg-amber-500/10'
                        : 'bg-slate-900 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-amber-400">
                        <GripVertical className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs text-slate-400 w-5">
                        #{idx + 1}
                      </span>
                      <div>
                        <div className="font-semibold text-slate-200 flex items-center gap-2 text-xs">
                          <span className="capitalize">{sec.type}</span>
                          {!sec.enabled && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-950 text-red-400 border border-red-800">
                              Oculto
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 block truncate max-w-[170px]">
                          {(sec.data as any)?.title || (sec.data as any)?.eyebrow || 'Bloque estándar'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveSection(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        title="Subir posición"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSection(idx, 'down')}
                        disabled={idx === sections.length - 1}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        title="Bajar posición"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleSection(sec.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          sec.enabled
                            ? 'text-emerald-400 hover:bg-emerald-950/50'
                            : 'text-slate-500 hover:bg-slate-800'
                        }`}
                        title={sec.enabled ? 'Ocultar sección' : 'Mostrar sección'}
                      >
                        {sec.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 3: ESTILOS, COLORES, BOTONES Y TIPOGRAFÍAS
            ===================================================================== */}
        {activeTab === 'styles' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Color Primario / Marca */}
            <div className="space-y-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <label className="font-bold text-slate-200 block text-xs">
                Color Principal de Marca (Botones, Acentos, Badges):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer border border-slate-700 bg-transparent p-0"
                />
                <input
                  type="text"
                  value={theme.colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white flex-1"
                />
              </div>

              {/* Presets rápidos de color */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { name: 'Terracota Brasa', color: '#c2410c' },
                  { name: 'Ámbar Dorado', color: '#d97706' },
                  { name: 'Azul Clínico', color: '#1d4ed8' },
                  { name: 'Cyan Médico', color: '#0284c7' },
                  { name: 'Esmeralda', color: '#059669' },
                  { name: 'Indigo SaaS', color: '#4f46e5' },
                  { name: 'Negro Obsidian', color: '#0f172a' },
                ].map((preset) => (
                  <button
                    key={preset.color}
                    type="button"
                    onClick={() => handleColorChange('primary', preset.color)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 hover:border-slate-700"
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.color }} />
                    <span>{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Estilo de Botones y Componentes */}
            <div className="space-y-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <label className="font-bold text-slate-200 block text-xs">
                Estilo de Forma de Botones:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'pill', label: 'Cápsula (Pill)' },
                  { id: 'rounded', label: 'Suave' },
                  { id: 'sharp', label: 'Recto (Sharp)' },
                  { id: 'glow', label: 'Glow Neón' },
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => onThemeUpdate({ ...theme, buttonStyle: b.id as any })}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      (theme.buttonStyle || 'rounded') === b.id
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[11px] block">{b.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Alineación del Hero (Layout Freedom) */}
            <div className="space-y-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <label className="font-bold text-slate-200 block text-xs">
                Distribución de Contenido del Hero:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onThemeUpdate({ ...theme, heroAlignment: 'left' });
                    if (heroSec) {
                      onUpdateSectionData(heroSec.id, { ...heroSec.data, alignment: 'left' });
                    }
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    (heroSec?.data?.alignment || theme.heroAlignment || 'left') === 'left'
                      ? 'bg-blue-600 text-white font-bold border-blue-500'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="block text-xs">Dividido (2 Columnas)</span>
                  <span className="text-[10px] opacity-75 font-normal">Texto + Tarjeta a los lados</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onThemeUpdate({ ...theme, heroAlignment: 'center' });
                    if (heroSec) {
                      onUpdateSectionData(heroSec.id, { ...heroSec.data, alignment: 'center' });
                    }
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    (heroSec?.data?.alignment || theme.heroAlignment) === 'center'
                      ? 'bg-blue-600 text-white font-bold border-blue-500'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="block text-xs">Centrado Moderno</span>
                  <span className="text-[10px] opacity-75 font-normal">Estilo Apple / SaaS Tech</span>
                </button>
              </div>
            </div>

            {/* Selector de Tipografías */}
            <div className="space-y-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <label className="font-bold text-slate-200 block text-xs">
                Familia Tipográfica para Títulos (Google Fonts):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Plus Jakarta Sans', font: 'Plus Jakarta Sans', tag: 'Moderno / Clínico' },
                  { label: 'Playfair Display', font: 'Playfair Display', tag: 'Gourmet / Elegante' },
                  { label: 'Outfit', font: 'Outfit', tag: 'Vanguardista / Tech' },
                  { label: 'Inter', font: 'Inter', tag: 'Neutral & Legible' },
                ].map((item) => (
                  <button
                    key={item.font}
                    type="button"
                    onClick={() => handleFontChange(item.font)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      theme.fontHeading === item.font
                        ? 'bg-blue-600 text-white border-blue-500'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold block text-sm" style={{ fontFamily: item.font }}>{item.label}</span>
                    <span className="text-[10px] text-slate-400">{item.tag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Redondeo de Bordes */}
            <div className="space-y-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <label className="font-bold text-slate-200 block text-xs">
                Radio de Bordes Global de Tarjetas:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Recto', val: '0.25rem' },
                  { label: 'Suave', val: '0.75rem' },
                  { label: 'Redondo', val: '1.25rem' },
                  { label: 'Cápsula', val: '2rem' },
                ].map((r) => (
                  <button
                    key={r.val}
                    type="button"
                    onClick={() => handleRadiusChange(r.val)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      theme.borderRadius === r.val
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* =====================================================================
            TAB 4: SUBIR FOTOS DESDE LA COMPUTADORA
            ===================================================================== */}
        {activeTab === 'media' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 text-slate-300">
              <span className="font-bold text-amber-400 block mb-1">
                Subida de Archivos en Tiempo Real:
              </span>
              <span>
                Selecciona cualquier imagen desde tu computadora para sustituir las fotos de la maqueta instantaneamente sin recargar la pagina.
              </span>
            </div>

            {/* Subir foto para Hero */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-200">Foto Principal del Hero</h4>
                  <p className="text-[11px] text-slate-400">Imagen central o tarjeta visual</p>
                </div>
                <button
                  type="button"
                  onClick={() => heroFileRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Subir foto</span>
                </button>
                <input
                  ref={heroFileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'hero')}
                  className="hidden"
                />
              </div>

              {heroSec?.data?.visualCard?.imageUrl && (
                <div className="relative rounded-xl overflow-hidden aspect-video border border-slate-800">
                  <img
                    src={heroSec.data.visualCard.imageUrl}
                    alt="Hero actual"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] text-amber-300">
                    Imagen activa
                  </div>
                </div>
              )}
            </div>

            {/* Subir foto para About */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-200">Foto de Sobre Nosotros / Historia</h4>
                  <p className="text-[11px] text-slate-400">Instalaciones, cocina o equipo</p>
                </div>
                <button
                  type="button"
                  onClick={() => aboutFileRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Subir foto</span>
                </button>
                <input
                  ref={aboutFileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'about')}
                  className="hidden"
                />
              </div>
            </div>

            {/* Subir foto para Galería */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-200">Foto de Galería</h4>
                  <p className="text-[11px] text-slate-400">Reemplaza el primer elemento de la galería</p>
                </div>
                <button
                  type="button"
                  onClick={() => galleryFileRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Subir foto</span>
                </button>
                <input
                  ref={galleryFileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'gallery')}
                  className="hidden"
                />
              </div>
            </div>

          </div>
        )}

        {/* =====================================================================
            TAB 5: CONTENIDOS, TEXTOS Y GESTOR DE TARJETAS
            ===================================================================== */}
        {activeTab === 'content' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Gestor Dinámico de Tarjetas de Servicios / Menú */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-200 text-xs">
                    Catálogo de Tarjetas ({servicesSec?.data?.items?.length || 0} ítems)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Añade o elimina servicios, platos o productos
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddServiceCard}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Tarjeta</span>
                </button>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {(servicesSec?.data?.items || []).map((item: any, i: number) => (
                  <div
                    key={item.id || i}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                  >
                    <div className="flex-1 truncate pr-2">
                      <span className="font-semibold text-slate-200 block truncate">{item.title}</span>
                      <span className="text-[10px] text-slate-400">{item.priceFrom || item.badge || 'Elemento activo'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteServiceCard(item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                      title="Eliminar tarjeta"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Nombre de la Marca */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <label className="font-bold text-slate-200 block text-xs">
                Nombre de la Empresa o Marca:
              </label>
              <input
                type="text"
                value={navbarSec?.data?.brandName || ''}
                onChange={(e) => {
                  if (navbarSec) {
                    onUpdateSectionData(navbarSec.id, {
                      ...navbarSec.data,
                      brandName: e.target.value,
                    });
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            {/* Titular Principal Hero */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <label className="font-bold text-slate-200 block text-xs">
                Titular Principal (Hero):
              </label>
              <textarea
                rows={2}
                value={heroSec?.data?.title || ''}
                onChange={(e) => {
                  if (heroSec) {
                    onUpdateSectionData(heroSec.id, {
                      ...heroSec.data,
                      title: e.target.value,
                    });
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            {/* Subtítulo Hero */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <label className="font-bold text-slate-200 block text-xs">
                Subtítulo Descriptivo:
              </label>
              <textarea
                rows={3}
                value={heroSec?.data?.subtitle || ''}
                onChange={(e) => {
                  if (heroSec) {
                    onUpdateSectionData(heroSec.id, {
                      ...heroSec.data,
                      subtitle: e.target.value,
                    });
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            {/* Botón Principal CTA */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <label className="font-bold text-slate-200 block text-xs">
                Texto del Botón Principal (CTA):
              </label>
              <input
                type="text"
                value={heroSec?.data?.primaryCta?.label || ''}
                onChange={(e) => {
                  if (heroSec) {
                    onUpdateSectionData(heroSec.id, {
                      ...heroSec.data,
                      primaryCta: {
                        ...heroSec.data.primaryCta,
                        label: e.target.value,
                      },
                    });
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

          </div>
        )}

        {/* =====================================================================
            TAB 6: EXTRAS, ANUNCIOS, WHATSAPP Y EXPORTAR
            ===================================================================== */}
        {activeTab === 'extras' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Barra de Anuncio Superior */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-slate-200 text-xs">
                    Barra de Anuncios Superior
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onThemeUpdate({
                    ...theme,
                    topBanner: {
                      enabled: !theme.topBanner?.enabled,
                      text: theme.topBanner?.text || 'Promocion especial exclusiva disponible este mes',
                      linkText: theme.topBanner?.linkText || 'Ver Oferta',
                      linkUrl: theme.topBanner?.linkUrl || '#contacto',
                      bgColor: theme.topBanner?.bgColor || theme.colors.primary,
                      textColor: theme.topBanner?.textColor || '#ffffff',
                    },
                  })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    theme.topBanner?.enabled ? 'bg-emerald-500' : 'bg-slate-800'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      theme.topBanner?.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {theme.topBanner?.enabled && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="text-[11px] text-slate-400 block">Texto del anuncio:</label>
                  <input
                    type="text"
                    value={theme.topBanner.text}
                    onChange={(e) => onThemeUpdate({
                      ...theme,
                      topBanner: { ...theme.topBanner!, text: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Color de Fondo:</label>
                      <input
                        type="color"
                        value={theme.topBanner.bgColor || theme.colors.primary}
                        onChange={(e) => onThemeUpdate({
                          ...theme,
                          topBanner: { ...theme.topBanner!, bgColor: e.target.value }
                        })}
                        className="w-full h-8 rounded-lg cursor-pointer bg-slate-950 border border-slate-800"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Texto del Enlace:</label>
                      <input
                        type="text"
                        value={theme.topBanner.linkText || ''}
                        onChange={(e) => onThemeUpdate({
                          ...theme,
                          topBanner: { ...theme.topBanner!, linkText: e.target.value }
                        })}
                        className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Widget Flotante de WhatsApp */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-slate-200 text-xs">
                    Widget Flotante de WhatsApp
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onThemeUpdate({
                    ...theme,
                    whatsappWidget: {
                      enabled: !theme.whatsappWidget?.enabled,
                      phoneNumber: theme.whatsappWidget?.phoneNumber || '+51987654321',
                      message: theme.whatsappWidget?.message || '¡Hola! Quisiera solicitar información personalizada.',
                      position: 'bottom-right',
                    },
                  })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    theme.whatsappWidget?.enabled ? 'bg-emerald-500' : 'bg-slate-800'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      theme.whatsappWidget?.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {theme.whatsappWidget?.enabled && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="text-[11px] text-slate-400 block">Número de WhatsApp (con código de país):</label>
                  <input
                    type="text"
                    value={theme.whatsappWidget.phoneNumber}
                    onChange={(e) => onThemeUpdate({
                      ...theme,
                      whatsappWidget: { ...theme.whatsappWidget!, phoneNumber: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                  />
                  <label className="text-[11px] text-slate-400 block pt-1">Mensaje Inicial Automático:</label>
                  <input
                    type="text"
                    value={theme.whatsappWidget.message}
                    onChange={(e) => onThemeUpdate({
                      ...theme,
                      whatsappWidget: { ...theme.whatsappWidget!, message: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              )}
            </div>

            {/* Exportar / Guardar Configuración */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="font-bold text-slate-200 block text-xs">
                Exportar o Copiar Configuración del Cliente:
              </span>
              <p className="text-[11px] text-slate-400">
                Descarga la estructura completa en formato JSON para respaldarla o pasarla a producción.
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar .json</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                  title="Copiar JSON al portapapeles"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copySuccess ? '¡Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* =========================================================================
          PIE DEL PANEL CON ACCIONES: CANCELAR Y DESCARTAR / GUARDAR CAMBIOS
          ========================================================================= */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/95 flex items-center justify-between gap-3">
        {/* BOTÓN NO GUARDAR / CANCELAR Y DESCARTAR */}
        <button
          type="button"
          onClick={onCancelAndDiscard}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-red-950/80 hover:text-red-300 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 hover:border-red-800 transition-all active:scale-95"
          title="Descartar todos los cambios hechos durante esta sesión y volver a como estaba"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-300" />
          <span>Cancelar y Descartar</span>
        </button>

        {/* BOTÓN GUARDAR CAMBIOS */}
        <button
          type="button"
          onClick={onSaveAndCommit}
          className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-95"
          title="Guardar y aplicar definitivamente los cambios al sitio del cliente"
        >
          <Save className="w-4 h-4" />
          <span>Guardar Cambios</span>
        </button>
      </div>
    </aside>
  );
};
