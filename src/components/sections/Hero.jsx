import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import FadeContent from '../ui/FadeContent';
import ShadedBackdrop from '../ui/ShadedBackdrop';
import MarkdownContent from '../ui/MarkdownContent';
import { site } from '../../content';

export default function Hero() {
  return <section id="top" tabIndex={-1} className="hero tone-dark" data-pattern="staggered-reveal">
    <ShadedBackdrop images={site.heroImages} className="hero-media" priority />
    <div className="hero-content">
      <FadeContent><p className="eyebrow">{site.heroEyebrow}</p></FadeContent>
      <h1 className="hero-identity"><Logo inverse className="brand-lockup--hero" /></h1>
      <FadeContent delay={0.12} className="hero-intro">
        <p className="hero-tagline">{site.tagline}</p>
        <MarkdownContent>{site.body}</MarkdownContent>
      </FadeContent>
      <FadeContent delay={0.2} className="hero-actions">
        <Button href="#projects">{site.heroPrimary} <ArrowUpRight size={18} /></Button>
        <a className="text-link" href="#contact">{site.heroSecondary} <ArrowUpRight size={18} /></a>
      </FadeContent>
    </div>
    <div className="hero-footer"><span>{site.heroFooter}</span><a href="#about" aria-label="Explore the club"><ArrowDown size={20} /></a><span>{site.heroSignature}</span></div>
  </section>;
}
