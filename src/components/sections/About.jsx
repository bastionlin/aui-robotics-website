import { ArrowDown } from 'lucide-react';
import FadeContent from '../ui/FadeContent';
import SectionHeader from '../ui/SectionHeader';
import { assetUrl } from '../../lib/club';

import MarkdownContent from '../ui/MarkdownContent';
import { sections } from '../../content';
const content = sections.about;

export default function About() {
  return <section id="about" tabIndex={-1} className="section tone-light about" data-pattern="staggered-reveal">
    <div className="section-inner">
      <SectionHeader number="01" eyebrow={content.eyebrow} />
      <div className="editorial-heading">
        <FadeContent><h2>{content.title}</h2></FadeContent>
        <FadeContent delay={0.08}><MarkdownContent className="lead-copy">{content.body}</MarkdownContent><a href="#projects" className="text-link">{content.ctaLabel} <ArrowDown size={17} /></a></FadeContent>
      </div>
      <div className="principles">{content.items.map(({title, body}, index) => <FadeContent key={title} delay={index * 0.07}><article><span className="ordinal">0{index + 1}</span><h3>{title}</h3><MarkdownContent>{body}</MarkdownContent></article></FadeContent>)}</div>
      {content.gallery?.length > 0 && <div className="competition-strip">
        <div className="competition-copy"><p className="small-label">{content.galleryLabel}</p><MarkdownContent>{content.galleryBody}</MarkdownContent></div>
        <ul className="competition-photos">{content.gallery.map(moment => <li key={moment.image} style={{ '--ratio': moment.width / moment.height }}><figure><img src={assetUrl(moment.image.slice(1))} alt={moment.imageAlt} width={moment.width} height={moment.height} loading="lazy" /><figcaption>{moment.caption}</figcaption></figure></li>)}</ul>
      </div>}
    </div>
  </section>;
}
