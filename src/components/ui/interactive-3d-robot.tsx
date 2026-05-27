'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

function MobilePlaceholder() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-4"
      style={{
        background:
          'radial-gradient(ellipse at 50% 40%, rgba(124,58,237,0.22) 0%, rgba(10,5,22,0) 70%)',
      }}
    >
      {/* Pulsing orb */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-28 h-28 rounded-full bg-purple-600/10 animate-ping" style={{ animationDuration: '2.5s' }} />
        <div className="absolute w-20 h-20 rounded-full bg-purple-600/15 animate-pulse" />
        <div
          className="relative w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(109,40,217,0.2) 100%)',
            boxShadow: '0 0 32px rgba(168,85,247,0.35)',
            border: '1px solid rgba(168,85,247,0.35)',
          }}
        >
          {/* Bot icon paths */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(216,180,254,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="8" width="18" height="12" rx="2" />
            <path d="M12 8V5" />
            <circle cx="12" cy="4" r="1" />
            <path d="M8 13h.01M16 13h.01" strokeWidth="2.5" />
            <path d="M9 17h6" />
          </svg>
        </div>
      </div>
      {/* Label */}
      <div className="text-center space-y-1">
        <p className="text-[11px] font-bold text-purple-300/70 uppercase tracking-[0.2em]">Agente IA</p>
        <p className="text-[9px] text-zinc-600 uppercase tracking-widest">Whobee · Interactivo en desktop</p>
      </div>
    </div>
  );
}

function RobotPlaceholder() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        background:
          'radial-gradient(ellipse at 50% 55%, rgba(124,58,237,0.30) 0%, rgba(80,20,180,0.10) 45%, rgba(10,5,22,0.90) 75%)',
      }}
    >
      <div className="flex flex-col items-center gap-2 animate-pulse" style={{ opacity: 0.7 }}>
        <div className="w-16 h-12 rounded-2xl bg-purple-700/40 border border-purple-500/30" />
        <div className="w-3 h-4 rounded-sm bg-purple-700/30" />
        <div className="w-24 h-20 rounded-2xl bg-purple-700/40 border border-purple-500/30" />
        <div className="w-36 h-8 rounded-xl bg-zinc-800/50 border border-zinc-700/30" />
      </div>
    </div>
  );
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLoad = useCallback(() => setLoaded(true), []);

  // Detect mobile on mount and on resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Mount Spline only when the container enters the viewport (fires immediately for hero)
  useEffect(() => {
    if (isMobile) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div ref={containerRef} className={className ?? 'w-full h-full min-h-[150px] sm:min-h-[280px]'}>
      {isMobile ? (
        <MobilePlaceholder />
      ) : (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
          {!loaded && (
            <div className="absolute inset-0 z-10">
              <RobotPlaceholder />
            </div>
          )}
          {inView && <Spline scene={scene} className="w-full h-full" onLoad={handleLoad} />}

          {/* Gradient fade */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '80px',
              background: 'linear-gradient(to top, rgb(10,5,22) 40%, transparent 100%)',
              zIndex: 50,
              pointerEvents: 'none',
            }}
          />
          {/* Solid strip — covers the Spline watermark */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '48px',
              background: 'rgb(10,5,22)',
              zIndex: 51,
              pointerEvents: 'none',
            }}
          />
        </div>
      )}
    </div>
  );
}
