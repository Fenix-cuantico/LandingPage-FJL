import React from 'react';
import { ServicesData } from '../../schemas/sections';
import { IconResolver } from './IconResolver';
import { Check, ArrowRight } from 'lucide-react';
import { CanvaDraggable } from '../mockup/CanvaDragProvider';

interface ServicesProps {
  data: ServicesData;
}

export const Services: React.FC<ServicesProps> = ({ data }) => {
  return (
    <section id="servicios" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          {data.eyebrow && (
            <span 
              className="text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-blue-100/70"
              style={{ color: 'var(--theme-primary)' }}
            >
              {data.eyebrow}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            {data.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {data.subtitle}
          </p>
        </div>

        {/* Grilla de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((service) => (
            <CanvaDraggable key={service.id} id={`service-${service.id}`}>
              <div
                className="flex flex-col justify-between p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:shadow-blue-600/5 hover:border-blue-400/50 transition-all group h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md shadow-blue-500/10 group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: 'var(--theme-primary)' }}
                    >
                      <IconResolver name={service.icon} className="w-7 h-7 text-white" />
                    </div>
                    {service.badge && (
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-heading">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features del servicio */}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2.5 mb-6 pt-4 border-t border-slate-100">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Pie de tarjeta con precio o acción */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  {service.priceFrom ? (
                    <div>
                      <span className="text-xs text-slate-500 block">Desde</span>
                      <span className="text-base font-bold text-slate-900">{service.priceFrom}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500">Evaluación inicial gratuita</span>
                  )}

                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors group-hover:translate-x-1"
                  >
                    <span>Reservar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </CanvaDraggable>
          ))}
        </div>

      </div>
    </section>
  );
};

