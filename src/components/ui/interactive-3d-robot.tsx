'use client';

import { Suspense, lazy, useState, useCallback, Component } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

function RobotPlaceholder({ loading = false }: { loading?: boolean }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at 50% 60%, rgba(124,58,237,0.28) 0%, rgba(10,5,22,0.85) 70%)',
      }}
    >
      <div className={`flex flex-col items-center gap-2 ${loading ? 'animate-pulse' : ''}`} style={{ opacity: 0.65 }}>
        <div className="w-16 h-12 rounded-2xl bg-purple-700/40 border border-purple-500/30" />
        <div className="w-3 h-4 rounded-sm bg-purple-700/30" />
        <div className="w-24 h-20 rounded-2xl bg-purple-700/40 border border-purple-500/30" />
        <div className="w-32 h-8 rounded-xl bg-zinc-800/50 border border-zinc-700/30" />
      </div>
      {loading && (
        <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-3">Cargando robot…</p>
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
  const [loaded, setLoaded] = useState(false);
  const handleLoad = useCallback(() => setLoaded(true), []);

  return (
    <div className={className ?? 'w-full h-full min-h-[350px] sm:min-h-[480px]'}>
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        {/* Gradient placeholder visible until Spline finishes loading */}
        {!loaded && (
          <div className="absolute inset-0 z-10">
            <RobotPlaceholder loading />
          </div>
        )}

        <SplineErrorBoundary fallback={<div className="absolute inset-0"><RobotPlaceholder /></div>}>
          <Suspense fallback={null}>
            <Spline
              scene={scene}
              className="w-full h-full"
              onLoad={handleLoad}
            />
          </Suspense>
        </SplineErrorBoundary>

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
