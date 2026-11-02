import React, { useState } from 'react';
import { PricingData } from '../../schemas/sections';
import { Check, Sparkles } from 'lucide-react';
import { CanvaDraggable } from '../mockup/CanvaDragProvider';

interface PricingProps {
  data: PricingData;
}

export const Pricing: React.FC<PricingProps> = ({ data }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="precios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          {data.eyebrow && (
            <span 
              className="text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-blue-50"
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

          {/* Toggle Mensual / Anual */}
          <div className="flex items-center justify-center gap-3 pt-6">
            <span className={`text-sm font-semibold ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              Facturación Mensual
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 transition-colors duration-200 ease-in-out focus:outline-hidden"
              style={{ backgroundColor: isAnnual ? 'var(--theme-primary)' : '#cbd5e1' }}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              <span>Facturación Anual</span>
              <span className="text-xs font-bold uppercase py-0.5 px-2 rounded-full bg-emerald-100 text-emerald-800">
                -20% dto.
              </span>
            </span>
          </div>
        </div>

        {/* Planes (Canva Draggable) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {data.plans.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const period = isAnnual ? '/ año' : '/ mes';

            return (
              <CanvaDraggable key={plan.id} id={`pricing-${plan.id}`}>
                <div
                  className={`flex flex-col justify-between p-8 rounded-3xl transition-all relative h-full ${
                    plan.isPopular
                      ? 'bg-gradient-to-b from-blue-50/50 to-white border-2 border-blue-600 shadow-xl shadow-blue-500/10 scale-105 z-10'
                      : 'bg-white border border-slate-200 shadow-xs hover:border-slate-300'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600 text-white shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Recomendado</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-slate-900 font-heading">
                        {plan.name}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-600 mb-6 min-h-[40px]">
                      {plan.description}
                    </p>

                    <div className="pb-6 mb-6 border-b border-slate-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-900">{plan.currency}</span>
                        <span className="text-5xl font-black text-slate-900 font-heading tracking-tight">
                          {price}
                        </span>
                        <span className="text-xs text-slate-500 font-medium ml-1">{period}</span>
                      </div>
                      {isAnnual && (
                        <span className="text-xs text-emerald-600 font-semibold block mt-1">
                          Equivalente a {plan.currency} {Math.round(plan.annualPrice / 12)} / mes
                        </span>
                      )}
                    </div>

                    <ul className="space-y-3.5 mb-8">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                          <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#contacto"
                    className={`w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all ${
                      plan.isPopular
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {plan.ctaText}
                  </a>
                </div>
              </CanvaDraggable>
            );
          })}
        </div>

      </div>
    </section>
  );
};

