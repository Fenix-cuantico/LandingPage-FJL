import React from 'react';
import { FeaturesData } from '../../schemas/sections';
import { IconResolver } from './IconResolver';

interface FeaturesProps {
  data: FeaturesData;
}

export const Features: React.FC<FeaturesProps> = ({ data }) => {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          {data.eyebrow && (
            <span 
              className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50"
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

        {/* Grilla de Ventajas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 shadow-xs"
                style={{
                  backgroundColor: 'var(--theme-surface)',
                  color: 'var(--theme-primary)',
                  border: '1px solid var(--theme-border)',
                }}
              >
                <IconResolver name={item.icon} className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-heading">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

