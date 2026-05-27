'use client';

import { useState, useCallback, useEffect, useRef, Component } from 'react';
// Eager import — eliminates the double lazy-load waterfall.
// The module itself is lazy-loaded by index.tsx; bundling Spline here means
// both chunks download in parallel instead of sequentially.
import Spline from '@splinetool/react-spline';

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

function RobotPlaceholder({ loading = false }: { loading?: boolean }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        background:
          'radial-gradient(ellipse at 50% 55%, rgba(124,58,237,0.30) 0%, rgba(80,20,180,0.10) 45%, rgba(10,5,22,0.90) 75%)',
      }}
    >
      <div
        className={`flex flex-col items-center gap-2 ${loading ? 'animate-pulse' : ''}`}
        style={{ opacity: 0.7 }}
      >
        {/* Robot silhouette */}
        <div className="w-16 h-12 rounded-2xl bg-purple-700/40 border border-purple-500/30" />
        <div className="w-3 h-4 rounded-sm bg-purple-700/30" />
        <div className="w-24 h-20 rounded-2xl bg-purple-700/40 border border-purple-500/30" />
        <div className="w-36 h-8 rounded-xl bg-zinc-800/50 border border-zinc-700/30" />
      </div>
      {loading && (
        <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-4">
          Cargando robot…
        </p>
      )}
    </div>
  );
}

class SplineErrorBoundary extends Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  // Mount <Spline> only once the container enters (or is near) the viewport.
  // For the hero this fires instantly; for below-fold uses it defers until needed.
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLoad = useCallback(() => setLoaded(true), []);

  useEffect(() => {
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
  }, []);

  return (
    <div ref={containerRef} className={className ?? 'w-full h-full min-h-[240px] sm:min-h-[320px]'}>
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        {/* Gradient placeholder — visible until onLoad fires */}
        {!loaded && (
          <div className="absolute inset-0 z-10">
            <RobotPlaceholder loading={inView} />
          </div>
        )}

        {inView && (
          <SplineErrorBoundary
            fallback={
              <div className="absolute inset-0">
                <RobotPlaceholder />
              </div>
            }
          >
            <Spline scene={scene} className="w-full h-full" onLoad={handleLoad} />
          </SplineErrorBoundary>
        )}

        {/* Gradient fade — blends robot bottom into hero background */}
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
        {/* Solid strip — covers the Spline watermark painted on the WebGL canvas */}
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
    </div>
  );
}
