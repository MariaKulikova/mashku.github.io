import React, { useEffect, useRef, useCallback, useState } from 'react';
import AnimatedEyes from '../animated-eyes/AnimatedEyes';
import styles from './blue-buddy.module.css';

type Edge = 'top' | 'right' | 'bottom' | 'left';

const SIZE = 200;
const HIDDEN_NORMAL = 120;
const LERP = 0.003;
const HIDE_LERP = 0.02;

/**
 * No rotation. The buddy always looks the same (eyes at bottom of circle).
 * It slides along the current edge, and when it needs to change edge:
 * 1. Hides behind current edge (slides out perpendicular)
 * 2. Teleports to target edge position
 * 3. Slides in from behind new edge
 */

function getClosestEdge(cx: number, cy: number, vw: number, vh: number): Edge {
  const d = { top: cy, bottom: vh - cy, left: cx, right: vw - cx };
  let min = Infinity;
  let edge: Edge = 'top';
  for (const [e, v] of Object.entries(d)) {
    if (v < min) { min = v; edge = e as Edge; }
  }
  return edge;
}

function getSlidePos(edge: Edge, cx: number, cy: number, vw: number, vh: number): number {
  const half = SIZE / 2;
  switch (edge) {
    case 'top':
    case 'bottom':
      return Math.max(0, Math.min(cx - half, vw - SIZE));
    case 'left':
    case 'right':
      return Math.max(0, Math.min(cy - half, vh - SIZE));
  }
}

function edgeToXY(edge: Edge, slide: number, hidden: number, vw: number, vh: number) {
  switch (edge) {
    case 'top':
      return { x: slide, y: -hidden };
    case 'bottom':
      return { x: slide, y: vh - SIZE + hidden };
    case 'left':
      return { x: -hidden, y: slide };
    case 'right':
      return { x: vw - SIZE + hidden, y: slide };
  }
}

type Phase = 'visible' | 'hiding' | 'hidden' | 'showing';

export default function BlueBuddy() {
  const elRef = useRef<HTMLDivElement>(null);
  const [visibleEdge, setVisibleEdge] = useState<Edge>('top');

  const currentEdge = useRef<Edge>('top');
  const targetEdge = useRef<Edge>('top');
  const currentSlide = useRef(0);
  const targetSlide = useRef(0);
  const currentHidden = useRef(HIDDEN_NORMAL);
  const targetHidden = useRef(HIDDEN_NORMAL);
  const phase = useRef<Phase>('visible');

  // Where cursor wants to be on the new edge
  const pendingSlide = useRef(0);

  const raf = useRef(0);

  const tick = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    switch (phase.current) {
      case 'visible':
        // Slide along current edge
        currentSlide.current += (targetSlide.current - currentSlide.current) * LERP;
        currentHidden.current += (HIDDEN_NORMAL - currentHidden.current) * HIDE_LERP;

        // Need to change edge?
        if (targetEdge.current !== currentEdge.current) {
          phase.current = 'hiding';
          targetHidden.current = SIZE + 20; // fully hide
        }
        break;

      case 'hiding':
        // Slide out behind edge
        currentHidden.current += (targetHidden.current - currentHidden.current) * HIDE_LERP;
        // Also keep sliding toward cursor along current edge
        currentSlide.current += (targetSlide.current - currentSlide.current) * LERP;

        if (currentHidden.current > SIZE - 5) {
          // Fully hidden — teleport to new edge
          phase.current = 'showing';
          currentEdge.current = targetEdge.current;
          setVisibleEdge(targetEdge.current);
          currentSlide.current = pendingSlide.current;
          currentHidden.current = SIZE + 20;
        }
        break;

      case 'showing':
        // Slide in from behind new edge
        currentHidden.current += (HIDDEN_NORMAL - currentHidden.current) * HIDE_LERP;
        currentSlide.current += (targetSlide.current - currentSlide.current) * LERP;

        if (currentHidden.current < HIDDEN_NORMAL + 2) {
          phase.current = 'visible';
          currentHidden.current = HIDDEN_NORMAL;
        }
        break;
    }

    const { x, y } = edgeToXY(currentEdge.current, currentSlide.current, currentHidden.current, vw, vh);

    if (elRef.current) {
      elRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }

    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const vw = window.innerWidth;
    const startX = vw / 2 - SIZE / 2;
    currentSlide.current = startX;
    targetSlide.current = startX;

    const onMove = (e: MouseEvent) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const newEdge = getClosestEdge(e.clientX, e.clientY, vw, vh);
      const newSlide = getSlidePos(newEdge, e.clientX, e.clientY, vw, vh);

      targetEdge.current = newEdge;

      if (newEdge === currentEdge.current || phase.current === 'visible') {
        targetSlide.current = newSlide;
      }
      // Always update pending slide for when teleport happens
      pendingSlide.current = newSlide;
    };

    window.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [tick]);

  return (
    <div ref={elRef} className={`${styles.buddy} ${styles[visibleEdge] || ''}`}>
      <div className={styles.eyesWrapper}>
        <AnimatedEyes />
      </div>
    </div>
  );
}
