import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CanvaDraggable } from '../mockup/CanvaDragProvider';

interface WhatsAppWidgetProps {
  widget?: {
    enabled: boolean;
    phoneNumber: string;
    message: string;
    position?: 'bottom-right' | 'bottom-left';
  };
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ widget }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!widget || !widget.enabled) return null;

  const cleanPhone = widget.phoneNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(widget.message);
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  const positionClasses = widget.position === 'bottom-left' 
    ? 'bottom-6 left-6' 
    : 'bottom-6 left-6 sm:bottom-8 sm:left-8';

  return (
    <aside
      aria-label="Botón de contacto WhatsApp"
      className={`fixed ${positionClasses} z-45 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300`}
    >
      <CanvaDraggable id="whatsapp-floating-widget">
        <div className="relative group">
          {/* Tooltip flotante */}
          <div className="absolute bottom-full left-0 mb-2.5 hidden sm:group-hover:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 text-white text-xs font-semibold shadow-xl border border-slate-800 whitespace-nowrap animate-in fade-in">
            <span>¿Tienes dudas? Escríbenos directamente</span>
            <div className="w-2 h-2 bg-slate-950 rotate-45 absolute -bottom-1 left-6 border-r border-b border-slate-800" />
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all"
            title="Chatear por WhatsApp"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-100 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="text-xs tracking-wide">WhatsApp</span>
          </a>
        </div>
      </CanvaDraggable>
    </aside>
  );
};

