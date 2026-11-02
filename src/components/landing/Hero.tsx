import React, { useState } from 'react';
import { HeroData } from '../../schemas/sections';
import { Star, Sparkles, ArrowRight, X, ChevronRight, Tag } from 'lucide-react';
import { IconResolver } from './IconResolver';
import { CanvaDraggable } from '../mockup/CanvaDragProvider';

interface HeroProps {
  data: HeroData;
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  // Estado para colapsar/expandir el Banner Lateral (si está habilitado con true)
  const [sideBannerDismissed, setSideBannerDismissed] = useState(false);
  const [sideBannerCollapsed, setSideBannerCollapsed] = useState(false);

  const showSideBanner = data.sideBanner?.enabled && !sideBannerDismissed;
  const isCentered = (data as any).alignment === 'center';

  return (
    <section id="hero" className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Fondo degradado ambiental sutil con variables de tema */}
      <div 
        className="absolute inset-0 -z-10 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 10%, var(--theme-primary) 0%, transparent 70%)'
        }}
      />

      {/* =========================================================================
          BANNER LATERAL FLOTANTE PROMICIONAL (Habilitado con 'enabled: true')
          Sección 4: Personalizaciones de alto impacto por cliente (Modo Canva Mover Libre)
          ========================================================================= */}
      {showSideBanner && data.sideBanner && (
        <aside
          aria-label="Promoción especial lateral"
          className={`fixed bottom-6 right-6 z-40 max-w-sm transition-all duration-300 animate-in slide-in-from-right-5 ${
            sideBannerCollapsed ? 'translate-x-[calc(100%-48px)]' : 'translate-x-0'
          }`}
        >
          <CanvaDraggable id="hero-side-banner">
            <div className="relative rounded-2xl bg-slate-950/95 text-white p-5 border border-amber-500/30 shadow-2xl backdrop-blur-md">
              
              {/* Botón para colapsar/expandir en el borde */}
              <button
                onClick={() => setSideBannerCollapsed(!sideBannerCollapsed)}
                className="absolute -left-3.5 top-6 w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md hover:bg-amber-400 transition-colors"
                title={sideBannerCollapsed ? 'Expandir promoción' : 'Ocultar'}
              >
                <ChevronRight className={`w-4 h-4 transition-transform ${sideBannerCollapsed ? 'rotate-180' : ''}`} />
              </button>

              {/* Cabecera del Banner Lateral */}
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Tag className="w-3 h-3" />
                  <span>{data.sideBanner.badge}</span>
                </span>

                <button
                  onClick={() => setSideBannerDismissed(true)}
                  className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                  title="Cerrar banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Contenido del Banner */}
              <h4 className="text-base font-bold text-white font-heading leading-tight mb-1">
                {data.sideBanner.title}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {data.sideBanner.description}
              </p>

              {/* Chip de Descuento si existe */}
              {data.sideBanner.discountChip && (
                <div className="mb-3 inline-block px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold font-mono">
                  {data.sideBanner.discountChip}
                </div>
              )}

              {/* Botón de Acción del Banner */}
              <a
                href={data.sideBanner.ctaHref}
                onClick={() => setSideBannerCollapsed(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 transition-all hover:opacity-95 shadow-md"
                style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-primary-fg)' }}
              >
                <span>{data.sideBanner.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </CanvaDraggable>
        </aside>
      )}

      {/* =========================================================================
          CONTENIDO PRINCIPAL DEL HERO (Conmutador Dividido vs Centrado)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={isCentered 
          ? "flex flex-col items-center text-center max-w-4xl mx-auto space-y-8" 
          : "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        }>
          
          {/* Columna Izquierda / Bloque Central de Textos y Acciones */}
          <div className={isCentered 
            ? "w-full max-w-3xl space-y-6 flex flex-col items-center text-center" 
            : "lg:col-span-7 space-y-6"
          }>
            {/* Badge superior */}
            {data.badge && (
              <div 
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs"
                style={{
                  backgroundColor: 'var(--theme-surface-alt)',
                  color: 'var(--theme-primary)',
                  border: '1px solid var(--theme-border)',
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{data.badge}</span>
              </div>
            )}

            {/* Título Principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] font-heading">
              {data.title}
            </h1>

            {/* Subtítulo */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
              {data.subtitle}
            </p>

            {/* Botones de Acción */}
            <div className={`flex flex-col sm:flex-row gap-4 pt-2 ${isCentered ? 'justify-center' : ''}`}>
              <a
                href={data.primaryCta.href}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-base shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: 'var(--theme-primary-fg)',
                }}
              >
                <span>{data.primaryCta.label}</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              {data.secondaryCta && (
                <a
                  href={data.secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-base text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all"
                >
                  <span>{data.secondaryCta.label}</span>
                </a>
              )}
            </div>

            {/* Calificación Social */}
            <div className={`pt-4 flex items-center gap-4 text-sm text-slate-600 ${isCentered ? 'justify-center' : ''}`}>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-900">{data.ratingScore} / 5.0</span>
              <span className="text-slate-400">•</span>
              <span>Más de {data.ratingCount} opiniones verificadas</span>
            </div>
          </div>

          {/* Columna Derecha / Bloque Inferior: Tarjeta Visual Parametrizable */}
          <div className={isCentered ? "w-full max-w-xl mx-auto relative pt-4" : "lg:col-span-5 relative"}>
            <CanvaDraggable id="hero-visual-card" className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Tarjeta Visual: Si tiene imagen, se muestra con estética premium */}
              {data.visualCard?.imageUrl ? (
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 aspect-4/5 sm:aspect-square lg:aspect-4/5 group">
                  <img
                    src={data.visualCard.imageUrl}
                    alt={data.visualCard.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Contenido superpuesto dinámico */}
                  <div className="absolute inset-0 p-7 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-bold py-1 px-3 bg-white/20 rounded-full backdrop-blur-md">
                        {data.visualCard.badge}
                      </span>

                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white backdrop-blur-md"
                        style={{ backgroundColor: 'var(--theme-primary)' }}
                      >
                        <IconResolver name={data.visualCard.icon || 'Sparkles'} className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold font-heading text-white">
                          {data.visualCard.title}
                        </h3>
                        <p className="text-sm text-slate-200 mt-1 leading-relaxed">
                          {data.visualCard.description}
                        </p>
                      </div>

                      {/* Estadísticas en cuadrícula */}
                      {data.stats && data.stats.length > 0 && (
                        <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-white/20">
                          {data.stats.slice(0, 4).map((stat, idx) => (
                            <div key={idx} className="bg-black/40 rounded-xl p-2.5 backdrop-blur-md border border-white/10">
                              <div className="text-lg font-black text-amber-300">{stat.value}</div>
                              <div className="text-[11px] text-slate-200 font-medium truncate">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Badge flotante inferior */}
                      {data.visualCard.floatingBadge && (
                        <div className="bg-white/95 text-slate-900 p-3.5 rounded-2xl flex items-center gap-3 shadow-xl backdrop-blur-md">
                          <div 
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: 'var(--theme-surface-alt)', color: 'var(--theme-primary)' }}
                          >
                            <IconResolver name={data.visualCard.floatingBadge.icon} className="w-5 h-5" />
                          </div>
                          <div>
                            <div 
                              className="text-[10px] font-bold uppercase tracking-wider"
                              style={{ color: 'var(--theme-primary)' }}
                            >
                              {data.visualCard.floatingBadge.tag}
                            </div>
                            <div className="text-xs font-semibold text-slate-800">
                              {data.visualCard.floatingBadge.text}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Fallback estilizado con el color primario de la marca */
                <div 
                  className="relative rounded-3xl overflow-hidden p-8 text-white shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, var(--theme-primary) 0%, #0f172a 100%)'
                  }}
                >
                  <div className="space-y-6">
                    <span className="text-xs uppercase tracking-wider font-semibold py-1 px-3 bg-white/15 rounded-full backdrop-blur-sm">
                      {data.visualCard?.badge || 'Garantía FJL'}
                    </span>
                    <h3 className="text-2xl font-bold font-heading">
                      {data.visualCard?.title || data.title}
                    </h3>
                    <p className="text-sm text-slate-100">
                      {data.visualCard?.description || data.subtitle}
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/15">
                      {data.stats.slice(0, 4).map((stat, idx) => (
                        <div key={idx} className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                          <div className="text-xl font-black text-amber-200">{stat.value}</div>
                          <div className="text-xs text-slate-200">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </CanvaDraggable>
          </div>

        </div>
      </div>
    </section>
  );
};
