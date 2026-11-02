import React from 'react';
import { AboutData } from '../../schemas/sections';
import { CheckCircle2, Award, Users } from 'lucide-react';
import { CanvaDraggable } from '../mockup/CanvaDragProvider';

interface AboutProps {
  data: AboutData;
}

export const About: React.FC<AboutProps> = ({ data }) => {
  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Columna Izquierda: Imagen y Badges Flotantes (Canva Draggable) */}
          <div className="lg:col-span-5 relative">
            <CanvaDraggable id="about-card" className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-200">
              <img
                src={data.imageUrl || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"}
                alt={data.title}
                className="w-full h-[460px] object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              {/* Badge superpuesto experiencia parametrizable */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--theme-surface-alt)', color: 'var(--theme-primary)' }}
                  >
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900 font-heading">{data.experienceYears} Años</div>
                    <div className="text-xs text-slate-600 font-medium">{data.experienceLabel || 'Trayectoria'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900 font-heading">+{data.certificationsCount}</div>
                    <div className="text-xs text-slate-600 font-medium">{data.certificationsLabel || 'Reconocimientos'}</div>
                  </div>
                </div>
              </div>
            </CanvaDraggable>
          </div>

          {/* Columna Derecha: Contenido y Filosofía */}
          <div className="lg:col-span-7 space-y-6">
            {data.eyebrow && (
              <span 
                className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{ backgroundColor: 'var(--theme-surface-alt)', color: 'var(--theme-primary)' }}
              >
                {data.eyebrow}
              </span>
            )}

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
              {data.title}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {data.description}
            </p>

            {/* Bullets estructurados */}
            <div className="space-y-4 pt-2">
              {data.bulletPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <div 
                    className="p-2 rounded-xl shrink-0 mt-0.5"
                    style={{ backgroundColor: 'var(--theme-surface-alt)', color: 'var(--theme-primary)' }}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 font-heading">{point.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-xs hover:opacity-95"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: 'var(--theme-primary-fg)',
                }}
              >
                {data.ctaButtonText || 'Conoce Más Sobre Nosotros'}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
