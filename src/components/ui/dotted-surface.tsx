'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;

    const init = (width: number, height: number) => {
      if (disposed || sceneRef.current) return;

      // Fewer points on mobile → less CPU per frame
      const mobile = width < 768;
      const AMOUNTX = mobile ? 22 : 38;
      const AMOUNTY = mobile ? 18 : 30;
      const SEPARATION = 100;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(0, 250, 800);

      // No antialias on mobile — big GPU win with no visible difference on small screens
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile });
      // Cap pixel ratio: 1 on mobile, 1.5 on desktop (was 2 — halves fill-rate cost)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 1.5));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const positions: number[] = [];
      const colors: number[] = [];
      const geometry = new THREE.BufferGeometry();

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          positions.push(
            ix * SEPARATION - (AMOUNTX * SEPARATION) / 2,
            0,
            iy * SEPARATION - (AMOUNTY * SEPARATION) / 2,
          );
          colors.push(0.55 + (ix / AMOUNTX) * 0.3, 0.2, 0.9 - (iy / AMOUNTY) * 0.4);
        }
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: mobile ? 5 : 6,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      let count = 0;
      let animationId: number;
      // Target 30fps — halves CPU/GPU work vs the previous uncapped 60fps loop
      const TARGET_MS = 1000 / 30;
      let lastFrameTime = 0;

      const animate = (now: number) => {
        animationId = requestAnimationFrame(animate);

        // Skip frame if we're ahead of the 30fps budget
        if (now - lastFrameTime < TARGET_MS) return;
        lastFrameTime = now;

        const posAttr = geometry.attributes.position;
        const arr = posAttr.array as Float32Array;
        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            arr[i * 3 + 1] =
              Math.sin((ix + count) * 0.3) * 40 +
              Math.sin((iy + count) * 0.5) * 40;
            i++;
          }
        }
        posAttr.needsUpdate = true;
        renderer.render(scene, camera);
        // Slightly faster wave speed compensates for fewer frames so motion stays fluid
        count += 0.05;
      };

      animationId = requestAnimationFrame(animate);
      sceneRef.current = { renderer, animationId };

      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    };

    let cleanup: (() => void) | undefined;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          observer.disconnect();
          cleanup = init(width, height) ?? undefined;
          break;
        }
      }
    });
    observer.observe(container);

    return () => {
      disposed = true;
      observer.disconnect();
      cleanup?.();
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.renderer.dispose();
        if (container.contains(sceneRef.current.renderer.domElement)) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }
        sceneRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 w-full h-full overflow-hidden', className)}
      {...props}
    />
  );
}
