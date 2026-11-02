import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { Sparkles, RotateCcw, Check, Move, X } from 'lucide-react';

interface Offset {
  x: number;
  y: number;
}

interface CanvaContextType {
  isCanvaMode: boolean;
  setCanvaMode: (active: boolean) => void;
  toggleCanvaMode: () => void;
  offsets: Record<string, Offset>;
  setOffset: (id: string, offset: Offset) => void;
  resetOffsets: () => void;
}

const CanvaContext = createContext<CanvaContextType | undefined>(undefined);

export const CanvaDragProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCanvaMode, setIsCanvaMode] = useState(false);
  const [offsets, setOffsets] = useState<Record<string, Offset>>({});

  const toggleCanvaMode = () => setIsCanvaMode((prev) => !prev);

  const setOffset = (id: string, offset: Offset) => {
    setOffsets((prev) => ({ ...prev, [id]: offset }));
  };

  const resetOffsets = () => {
    setOffsets({});
  };

  return (
    <CanvaContext.Provider
      value={{
        isCanvaMode,
        setCanvaMode: setIsCanvaMode,
        toggleCanvaMode,
        offsets,
        setOffset,
        resetOffsets,
      }}
    >
      {children}
      {/* Barra de Controles flotante cuando el Modo Canva está activo */}
      {isCanvaMode && <CanvaFloatingControlBar />}
    </CanvaContext.Provider>
  );
};

export const useCanva = () => {
  const context = useContext(CanvaContext);
  if (!context) {
    throw new Error('useCanva debe ser utilizado dentro de CanvaDragProvider');
  }
  return context;
};

// ------------------------------------------------------------------------------
// COMPONENTE: CONTENEDOR ARRASTRABLE LIBRE EN PANTALLA (CANVA DRAGGABLE)
// ------------------------------------------------------------------------------
interface CanvaDraggableProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const CanvaDraggable: React.FC<CanvaDraggableProps> = ({ id, children, className = '' }) => {
  const { isCanvaMode, offsets, setOffset } = useCanva();
  const currentOffset = offsets[id] || { x: 0, y: 0 };

  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number }>({
    mouseX: 0,
    mouseY: 0,
    startX: 0,
    startY: 0,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isCanvaMode) return;
    // Solo arrastrar con clic izquierdo
    if (e.button !== 0) return;

    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
    dragStartPos.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: currentOffset.x,
      startY: currentOffset.y,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartPos.current.mouseX;
      const deltaY = e.clientY - dragStartPos.current.mouseY;

      setOffset(id, {
        x: dragStartPos.current.startX + deltaX,
        y: dragStartPos.current.startY + deltaY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, id, setOffset]);

  const hasOffset = currentOffset.x !== 0 || currentOffset.y !== 0;

  return (
    <div
      onMouseDown={isCanvaMode ? handleMouseDown : undefined}
      style={{
        transform: hasOffset ? `translate3d(${currentOffset.x}px, ${currentOffset.y}px, 0)` : undefined,
        zIndex: isDragging ? 999 : hasOffset ? 50 : undefined,
        position: hasOffset ? 'relative' : undefined,
      }}
      className={`transition-shadow ${className} ${
        isCanvaMode
          ? `cursor-move select-none relative group ring-2 ring-purple-500/60 ring-offset-2 rounded-2xl ${
              isDragging ? 'shadow-2xl opacity-90 scale-[1.02]' : 'hover:ring-purple-400'
            }`
          : ''
      }`}
    >
      {/* Badge flotante indicativo en Modo Canva */}
      {isCanvaMode && (
        <div className="absolute -top-3 -right-2 z-50 pointer-events-none opacity-90 group-hover:opacity-100 flex items-center gap-1 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
          <Move className="w-2.5 h-2.5" />
          <span>Mover libre</span>
        </div>
      )}

      {children}
    </div>
  );
};

// ------------------------------------------------------------------------------
// BARRA FLOTANTE DE CONTROL EN MODO CANVA
// ------------------------------------------------------------------------------
const CanvaFloatingControlBar: React.FC = () => {
  const { setCanvaMode, resetOffsets, offsets } = useCanva();
  const movedCount = Object.keys(offsets).length;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[95%] sm:w-auto animate-in slide-in-from-top-4 duration-300">
      <div className="bg-slate-950/95 text-white border-2 border-purple-500/80 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
          <div>
            <div className="font-bold text-xs text-purple-300 font-heading flex items-center gap-1.5">
              <span>Modo Disposicion Libre Activo</span>
              {movedCount > 0 && (
                <span className="text-[10px] font-mono bg-purple-900/80 text-purple-200 px-1.5 py-0.2 rounded border border-purple-700">
                  {movedCount} elemento(s) movidos
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400">
              Arrastra el banner lateral o cualquier tarjeta y colócala donde gustes.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* BOTÓN REESTABLECER A POSICIÓN ORIGINAL */}
          <button
            type="button"
            onClick={resetOffsets}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-slate-600 transition-all active:scale-95"
            title="Volver a la disposición original antes de los movimientos"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Reestablecer</span>
          </button>

          {/* BOTÓN SALIR / LISTO */}
          <button
            type="button"
            onClick={() => setCanvaMode(false)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Listo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

