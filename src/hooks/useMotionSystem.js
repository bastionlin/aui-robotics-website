import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function useMotionSystem(route = 'home') {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const lenis = new Lenis({ duration: 1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    const context = gsap.context(() => {
      gsap.to('.reading-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
    });
    const navigate = (event) => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      if (!anchor || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = document.getElementById(anchor.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      // Lenis reads the root scroll padding, so the header offset is applied once.
      lenis.scrollTo(target, { onComplete: () => target.focus({ preventScroll: true }) });
      if (location.hash !== anchor.hash) history.pushState(null, '', anchor.hash);
    };
    document.addEventListener('click', navigate);
    let disposed = false;
    document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => {
      disposed = true;
      document.removeEventListener('click', navigate);
      context.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduced, route]);
}
