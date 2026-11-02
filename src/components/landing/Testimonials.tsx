import React from 'react';
import { TestimonialsData } from '../../schemas/sections';
import { Star, Quote, CheckCircle } from 'lucide-react';

interface TestimonialsProps {
  data: TestimonialsData;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
  return (
    <section className="py-20 bg-slate-50/70 border-t border-slate-100">
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

        {/* Tarjetas de Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.items.map((test) => (
            <div
              key={test.id}
              className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-blue-100 absolute top-6 right-6 pointer-events-none group-hover:text-blue-200 transition-colors" />

              <div>
                {/* Estrellas */}
                <div className="flex items-center gap-1 text-amber-400 mb-5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-6">
                  "{test.comment}"
                </p>
              </div>

              {/* Perfil del paciente */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                <img
                  src={test.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"}
                  alt={test.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-sm font-heading">{test.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="text-xs text-slate-500">{test.role}</div>
                  <div className="text-xs font-semibold text-blue-700 mt-0.5">
                    Tratamiento: {test.treatment}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

