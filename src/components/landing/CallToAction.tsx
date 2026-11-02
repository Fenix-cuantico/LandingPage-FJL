import React from 'react';
import { CTAData } from '../../schemas/sections';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

interface CTAProps {
  data: CTAData;
}

export const CallToAction: React.FC<CTAProps> = ({ data }) => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
      {/* Círculos decorativos ambientales */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-cyan-200 border border-white/20 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Oportunidad de Primera Consulta</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-heading leading-tight max-w-3xl mx-auto">
          {data.title}
        </h2>

        <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
          {data.subtitle}
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href={data.primaryCta.href}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base bg-white text-blue-900 shadow-xl shadow-black/20 hover:bg-blue-50 transition-all hover:scale-105 active:scale-95"
          >
            <span>{data.primaryCta.label}</span>
            <ArrowRight className="w-5 h-5 text-blue-600" />
          </a>

          {data.secondaryCta && (
            <a
              href={data.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-base bg-emerald-600/90 text-white hover:bg-emerald-600 border border-emerald-400/30 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{data.secondaryCta.label}</span>
            </a>
          )}
        </div>

        {data.footnote && (
          <p className="text-xs text-blue-200/80 pt-2 font-medium">
            {data.footnote}
          </p>
        )}
      </div>
    </section>
  );
};

