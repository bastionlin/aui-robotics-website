import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import ImageWithFallback from '../ui/ImageWithFallback';

const links = [
  ['01', 'ABOUT', 'about'], ['02', 'PROJECTS', 'projects'], ['03', 'TEAM', 'team'], ['04', 'SPONSORS', 'sponsors'], ['05', 'CONTACT', 'contact'],
];

/**
 * Provides the fixed navigation, active-section tracking, and mobile menu.
 * Navigation anchors target the single-page section IDs without a router.
 */
export default function Navbar({ theme, onToggleTheme }) {
  const [active, setActive] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 80));
  const themeToggle = (
    <button type="button" role="switch" aria-checked={theme === 'light'} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={onToggleTheme} className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-border text-brand-text transition hover:border-brand-accent hover:bg-brand-surface focus-visible:ring-2 focus-visible:ring-brand-accent">
      {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    links.forEach(([, , id]) => document.getElementById(id) && observer.observe(document.getElementById(id)));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-30 transition duration-300 ${scrolled || menuOpen ? 'border-b border-brand-border bg-brand-bg/95 backdrop-blur' : 'bg-transparent'}`}>
      <nav aria-label="Main navigation" className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        <a href="#top" aria-label="AUI Robotics home" className="relative z-40 flex h-12 items-center">
          <ImageWithFallback path="logo.png" alt="AUI Robotics Club logo" loading="eager" className="brand-logo h-12 w-48 object-contain object-left" fallback={<span className="font-space text-sm font-bold tracking-[0.08em] text-brand-text">AUI ROBOTICS CLUB</span>} />
          <span className="sr-only">AUI Robotics Club</span>
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          {links.map(([number, label, id]) => <a key={id} href={`#${id}`} className={`font-space text-[11px] font-bold tracking-[0.12em] transition hover:text-brand-accent ${active === id ? 'text-brand-accent' : 'text-brand-muted'}`}><span className="mr-1.5 text-brand-muted">{number}</span>{label}</a>)}
          {themeToggle}
        </div>
        <div className="relative z-40 flex items-center gap-2 lg:hidden">
          {themeToggle}
          <button type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="rounded-xl p-2 text-brand-text">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {menuOpen && <div className="fixed inset-0 flex min-h-[100dvh] flex-col justify-center bg-brand-bg px-8 pt-20 lg:hidden">
        {links.map(([number, label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className={`border-b border-brand-border py-5 font-space text-3xl font-bold ${active === id ? 'text-brand-accent' : 'text-brand-text'}`}><span className="mr-3 text-sm text-brand-muted">{number}</span>{label}</a>)}
      </div>}
    </header>
  );
}
