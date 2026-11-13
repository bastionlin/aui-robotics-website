import { ArrowUpRight } from 'lucide-react';
import { sponsors, logoSize } from '../../data/sponsors';
import { mailLink, assetUrl } from '../../lib/club';
import { sections } from '../../content';
import MarkdownContent from '../ui/MarkdownContent';
import SectionHeader from '../ui/SectionHeader';
import FadeContent from '../ui/FadeContent';
import Button from '../ui/Button';

const content = sections.sponsors;

export default function Sponsors() {
  return <section id="sponsors" tabIndex={-1} className="section tone-grey sponsors" data-pattern="staggered-reveal">
    <div className="section-inner">
      <SectionHeader number="04" eyebrow={content.eyebrow} />
      <div className="editorial-heading"><FadeContent><h2>{content.title}</h2></FadeContent><FadeContent delay={0.08}><MarkdownContent className="lead-copy">{content.body}</MarkdownContent><Button href={mailLink('AUI Robotics - Partnership inquiry')}>{content.ctaLabel} <ArrowUpRight size={18} /></Button></FadeContent></div>
      <div className="sponsor-wall" aria-label="Club sponsors and partners">{sponsors.map((sponsor) => {
        const src = sponsor.logo ? assetUrl(sponsor.logo.slice(1)) : null;
        const bounds = sponsor.bounds;
        const size = bounds ? logoSize(bounds, sponsor.optical) : null;
        const content = <><span className="sponsor-logo-frame">{src && bounds ? (
          <svg viewBox={bounds.slice(0, 4).join(' ')} style={{ '--logo-w': `${size.width}px`, aspectRatio: size.ratio }} role="img" aria-label={`${sponsor.name} logo`} className={`sponsor-logo ${sponsor.monochrome ? 'partner-logo--monochrome' : ''}`}>
            <image href={src} width={bounds[4]} height={bounds[5]} />
          </svg>
        ) : src ? <img src={src} alt={sponsor.name} loading="lazy" className="sponsor-logo" /> : <span className="sponsor-name">{sponsor.name}</span>}</span>{sponsor.descriptor && <span className="sponsor-descriptor">{sponsor.descriptor}</span>}</>;
        return sponsor.href ? <a key={sponsor.name} className="sponsor-mark" href={sponsor.href} target="_blank" rel="noreferrer" aria-label={`${sponsor.name} website (opens in a new tab)`}>{content}</a> : <div key={sponsor.name} className="sponsor-mark">{content}</div>;
      })}</div>
      <div className="partner-benefits">{content.items.map(({title, body}, index) => <FadeContent key={title} delay={index * 0.07}><article><div><span className="ordinal">0{index + 1}</span><ArrowUpRight size={20} aria-hidden="true" /></div><h3>{title}</h3><MarkdownContent>{body}</MarkdownContent></article></FadeContent>)}</div>
    </div>
  </section>;
}
