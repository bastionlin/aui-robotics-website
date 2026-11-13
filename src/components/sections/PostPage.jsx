import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { posts } from '../../content';
import { assetUrl } from '../../lib/club';
import MarkdownContent from '../ui/MarkdownContent';

export default function PostPage({ slug }) {
  const post = posts.find(entry => entry.slug === slug);
  const index = posts.indexOf(post);
  const next = posts[index + 1];
  if (!post) return <section className="section tone-light post-page"><div className="section-inner"><a className="text-link" href="#blog"><ArrowLeft size={18} />Back to journal</a><h1>Entry not found.</h1><p>This entry may be unpublished or its address may have changed.</p></div></section>;
  return <article className="section tone-light post-page"><div className="post-inner">
    <a className="text-link" href="#blog"><ArrowLeft size={18} />Back to journal</a>
    <header className="post-header"><p className="small-label">{post.tags.join(' / ') || 'Journal'}</p><h1>{post.title}</h1><p className="post-summary">{post.summary}</p><div className="post-meta"><span>{post.author}</span><time dateTime={post.date}>{post.date}</time>{post.updated && <span>Updated <time dateTime={post.updated}>{post.updated}</time></span>}</div></header>
    {post.image && <img className="post-cover" src={assetUrl(post.image.slice(1))} alt={post.imageAlt} />}
    <MarkdownContent>{post.body}</MarkdownContent>
    {next && <a className="post-next text-link" href={`#blog/${next.slug}`}>{next.title}<ArrowUpRight size={18} /></a>}
  </div></article>;
}
