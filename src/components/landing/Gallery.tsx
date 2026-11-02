import React, { useState } from 'react';
import { GalleryData } from '../../schemas/sections';
import { X, ZoomIn } from 'lucide-react';

interface GalleryProps {
  data: GalleryData;
}

export const Gallery: React.FC<GalleryProps> = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredItems = activeCategory === 'Todos'
    ? data.items
    : data.items.filter((item) => item.category === activeCategory);

  return (
    <section id="galeria" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
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

          {/* Filtros por Categoría */}
          {data.categories && data.categories.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
              {data.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grilla de Imágenes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.imageUrl)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-100 aspect-video"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase tracking-wider font-semibold text-cyan-300 mb-1">
                  {item.category}
                </span>
                <h4 className="text-base font-bold font-heading">{item.title}</h4>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-300">
                  <ZoomIn className="w-4 h-4" />
                  <span>Ampliar fotografía</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedImage}
                alt="Ampliación"
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

