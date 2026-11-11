import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import FadeContent from '../ui/FadeContent';

export default function Hero() {
  return <section id="top" tabIndex={-1} className="hero tone-dark" data-pattern="staggered-reveal">
    <div className="hero-content">
      <FadeContent><p className="eyebrow">Al Akhawayn University / Ifrane, Morocco</p></FadeContent>
      <h1 className="hero-identity"><Logo inverse className="brand-lockup--hero" /></h1>
      <FadeContent delay={0.12} className="hero-intro">
        <p className="hero-tagline">Build. Break. Repeat.</p>
        <p>Student curiosity. Real engineering.<br />A team building what comes next.</p>
      </FadeContent>
      <FadeContent delay={0.2} className="hero-actions">
        <Button href="#projects">Explore our work <ArrowUpRight size={18} /></Button>
        <a className="text-link" href="#join">Find your place <ArrowUpRight size={18} /></a>
      </FadeContent>
    </div>
    <div className="hero-footer"><span>Hardware. Software. Together.</span><a href="#about" aria-label="Explore the club"><ArrowDown size={20} /></a><span>Student-led. AUI-built.</span></div>
  </section>;
}
