import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Logo from '../ui/Logo';
import { navigation } from '../../lib/club';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-20% 0px -65% 0px' });
    navigation.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
    };
    const outside = (event) => { if (!headerRef.current?.contains(event.target)) setOpen(false); };
    const desktop = window.matchMedia('(min-width: 1001px)');
    const resize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    desktop.addEventListener('change', resize);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', outside);
      desktop.removeEventListener('change', resize);
    };
  }, [open]);

  return <header ref={headerRef} className="site-header">
    <a href="#top" className="brand-home" aria-label="AUI Robotics Club home" onClick={() => setOpen(false)}><Logo /></a>
    <nav id="primary-navigation" aria-label="Main navigation" className={`primary-nav ${open ? 'is-open' : ''}`}>
      {navigation.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
    <a className="header-contact" href="#contact">Let's talk <ArrowUpRight size={18} aria-hidden="true" /></a>
    <button ref={toggleRef} className="menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-controls="primary-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
      {open ? <X size={23} /> : <Menu size={23} />}
    </button>
    <div className="reading-progress" aria-hidden="true" />
  </header>;
}
