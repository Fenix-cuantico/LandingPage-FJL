import React from 'react';
import { ProductsData } from '../../schemas/sections';
import { Check, Sparkles } from 'lucide-react';

interface ProductsProps {
  data: ProductsData;
}

export const Products: React.FC<ProductsProps> = ({ data }) => {
  return (
    <section className="py-20 bg-slate-50/60 border-t border-slate-200/80">
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

        {/* Grilla de Paquetes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {data.items.map((pkg) => (
            <div
              key={pkg.id}
              className={`flex flex-col justify-between p-8 rounded-3xl transition-all relative ${
                pkg.isPopular
                  ? 'bg-white border-2 border-blue-600 shadow-xl shadow-blue-500/10 scale-105 z-10'
                  : 'bg-white border border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600 text-white shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Más Popular</span>
                </div>
              )}

              <div>
                {pkg.tag && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-2">
                    {pkg.tag}
                  </span>
                )}
                <h3 className="text-2xl font-bold text-slate-900 font-heading mb-3">
                  {pkg.name}
                </h3>
                <p className="text-sm text-slate-600 mb-6 min-h-[40px]">
                  {pkg.description}
                </p>

                {/* Precio */}
                <div className="pb-6 mb-6 border-b border-slate-100">
                  <span className="text-4xl font-black text-slate-900 font-heading">
                    {pkg.price}
                  </span>
                  <span className="text-xs text-slate-500 ml-2">/ {pkg.billingPeriod}</span>
                </div>

                {/* Lista de prestaciones */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <div className="p-0.5 rounded-full bg-blue-100 text-blue-600 shrink-0 mt-0.5">
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
                  pkg.isPopular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                {pkg.ctaText}
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

