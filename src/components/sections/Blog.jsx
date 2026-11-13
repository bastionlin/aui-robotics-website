import { ArrowUpRight } from 'lucide-react';
import { posts, sections } from '../../content';
import { assetUrl } from '../../lib/club';
import MarkdownContent from '../ui/MarkdownContent';
import FadeContent from '../ui/FadeContent';
import SectionHeader from '../ui/SectionHeader';

export default function Blog() {
  const content = sections.blog;
  return <section id="blog" tabIndex={-1} className="section tone-light journal" data-pattern="staggered-reveal"><div className="section-inner">
    <SectionHeader number="05" eyebrow={content.eyebrow} />
    <div className="editorial-heading"><h2>{content.title}</h2><MarkdownContent className="lead-copy">{content.body}</MarkdownContent></div>
    <div className="journal-index">{posts.length ? posts.map(post => <FadeContent key={post.slug}><article className="journal-entry">
      <div className="journal-meta"><time dateTime={post.date}>{post.date}</time><span>{post.tags.join(' / ')}</span></div>
      {post.image && <a href={`#blog/${post.slug}`} tabIndex={-1} aria-hidden="true"><img src={assetUrl(post.image.slice(1))} alt="" loading="lazy" /></a>}
      <div><h3><a href={`#blog/${post.slug}`}>{post.title}<ArrowUpRight size={24} aria-hidden="true" /></a></h3><p>{post.summary}</p><span className="journal-author">{post.author}</span></div>
    </article></FadeContent>) : <p className="empty-state">No journal entries published yet.</p>}</div>
  </div></section>;
}
