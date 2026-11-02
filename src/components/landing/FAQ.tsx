import React, { useState } from 'react';
import { FAQData } from '../../schemas/sections';
import { ChevronDown } from 'lucide-react';

interface FAQProps {
  data: FAQData;
}

export const FAQ: React.FC<FAQProps> = ({ data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50/60 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
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

        {/* Acordeón Interactivo */}
        <div className="space-y-4">
          {data.items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-2xs transition-all hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 focus:outline-hidden"
                >
                  <span className="text-base sm:text-lg font-heading">{item.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in slide-in-from-top-1">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

