import React, { useState } from 'react';
import { NavbarData } from '../../schemas/sections';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { IconResolver } from './IconResolver';

interface NavbarProps {
  data: NavbarData;
}

export const Navbar: React.FC<NavbarProps> = ({ data }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Marca */}
          <div className="flex items-center gap-3">
            <a href="#hero" className="flex items-center gap-2.5 group">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform"
                style={{ backgroundColor: 'var(--theme-primary)' }}
              >
                <IconResolver name={data.brandIcon || 'Sparkles'} className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 font-heading">
                {data.brandName}
              </span>
            </a>
          </div>

          {/* Enlaces de escritorio */}
          <nav className="hidden md:flex items-center gap-7">
            {data.links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Acciones de escritorio */}
          <div className="hidden lg:flex items-center gap-4">
            {data.showContactPhone && (
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100/90 py-2 px-3.5 rounded-full border border-slate-200">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>{data.phoneNumber}</span>
              </div>
            )}

            {data.ctaButton?.visible && (
              <a
                href={data.ctaButton.href}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition-all hover:opacity-95 active:scale-95"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: 'var(--theme-primary-fg)',
                }}
              >
                <span>{data.ctaButton.label}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Botón hamburguesa móvil */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-2">
            {data.links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
            {data.showContactPhone && (
              <div className="flex items-center gap-2 text-sm text-slate-600 px-3">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>{data.phoneNumber}</span>
              </div>
            )}
            {data.ctaButton?.visible && (
              <a
                href={data.ctaButton.href}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl font-semibold text-sm shadow transition-all"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: 'var(--theme-primary-fg)',
                }}
              >
                {data.ctaButton.label}
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

