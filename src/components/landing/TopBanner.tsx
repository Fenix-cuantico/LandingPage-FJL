import React, { useState } from 'react';
import { ArrowRight, Sparkles, X } from 'lucide-react';

interface TopBannerProps {
  banner?: {
    enabled: boolean;
    text: string;
    linkText?: string;
    linkUrl?: string;
    bgColor?: string;
    textColor?: string;
  };
}

export const TopBanner: React.FC<TopBannerProps> = ({ banner }) => {
  const [dismissed, setDismissed] = useState(false);

  if (!banner || !banner.enabled || dismissed) return null;

  return (
    <div
      role="banner"
      className="relative z-45 text-xs py-2.5 px-4 text-center font-medium transition-all shadow-xs flex items-center justify-center gap-3"
      style={{
        backgroundColor: banner.bgColor || 'var(--theme-primary)',
        color: banner.textColor || '#ffffff',
      }}
    >
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Sparkles className="w-3.5 h-3.5 shrink-0 opacity-90" />
        <span className="font-semibold">{banner.text}</span>
        {banner.linkText && banner.linkUrl && (
          <a
            href={banner.linkUrl}
            className="inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:opacity-90 ml-1 transition-opacity"
          >
            <span>{banner.linkText}</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        )}
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-black/15 transition-colors opacity-80 hover:opacity-100"
        title="Ocultar anuncio"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

