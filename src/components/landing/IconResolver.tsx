// Helper para resolver dinámicamente iconos de Lucide sin romper la aplicación
import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconResolverProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
  size?: number;
}

export const IconResolver: React.FC<IconResolverProps> = ({ name, className = 'w-5 h-5', size = 20, ...props }) => {
  // @ts-ignore
  const IconComponent = LucideIcons[name] || LucideIcons.Sparkles;
  return <IconComponent className={className} size={size} {...props} />;
};

