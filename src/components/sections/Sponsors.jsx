import { ArrowUpRight } from 'lucide-react';
import { sponsors, logoBounds } from '../../data/sponsors';
import { mailLink } from '../../lib/club';
import SectionHeader from '../ui/SectionHeader';
import FadeContent from '../ui/FadeContent';
import Button from '../ui/Button';

const marks = import.meta.glob('../../assets/images/sponsors/*', { eager: true, query: '?url', import: 'default' });
const findMark = (name) => Object.entries(marks).find(([path]) => path.endsWith(`/${name}`))?.[1];
const benefits = [
  ['Support a build', 'Equipment, materials, and funding move an ambitious idea toward a working prototype.'],
  ['Share expertise', 'Mentor a team, lead a workshop, or bring a technical challenge to the table.'],
  ['Connect with talent', 'Meet students through engineering projects, demonstrations, and shared work.'],
];

export default function Sponsors() {
  return <section id="sponsors" tabIndex={-1} className="section tone-grey sponsors" data-pattern="staggered-reveal">
    <div className="section-inner">
      <SectionHeader number="04" eyebrow="Our partners" />
      <div className="editorial-heading"><FadeContent><h2>Behind the machines,<br />people who believe.</h2></FadeContent><FadeContent delay={0.08}><p className="lead-copy">The organizations supporting our club help students build with ambition. Join them in making practical engineering experiences possible.</p><Button href={mailLink('AUI Robotics - Partnership inquiry')}>Become a partner <ArrowUpRight size={18} /></Button></FadeContent></div>
      <div className="sponsor-wall" aria-label="Club sponsors and partners">{sponsors.map((sponsor) => {
        const src = sponsor.logo ? findMark(sponsor.logo) : null;
        const bounds = logoBounds[sponsor.logo];
        const content = <><span className="sponsor-logo-frame">{src && bounds ? (
          <svg viewBox={bounds.slice(0, 4).join(' ')} role="img" aria-label={`${sponsor.name} logo`} className={`sponsor-logo ${sponsor.monochrome ? 'partner-logo--monochrome' : ''}`}>
            <image href={src} width={bounds[4]} height={bounds[5]} />
          </svg>
        ) : src ? <img src={src} alt={sponsor.name} loading="lazy" className="sponsor-logo" /> : <span className="sponsor-name">{sponsor.name}</span>}</span><span className="sponsor-descriptor">{sponsor.descriptor || '\u00a0'}</span></>;
        return sponsor.href ? <a key={sponsor.name} className="sponsor-mark" href={sponsor.href} target="_blank" rel="noreferrer" aria-label={`${sponsor.name} website (opens in a new tab)`}>{content}</a> : <div key={sponsor.name} className="sponsor-mark">{content}</div>;
      })}</div>
      <div className="partner-benefits">{benefits.map(([title, copy], index) => <FadeContent key={title} delay={index * 0.07}><article><div><span className="ordinal">0{index + 1}</span><ArrowUpRight size={20} aria-hidden="true" /></div><h3>{title}</h3><p>{copy}</p></article></FadeContent>)}</div>
    </div>
  </section>;
}
