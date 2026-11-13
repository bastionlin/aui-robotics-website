import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import VideoEmbed from './VideoEmbed';
import { assetUrl } from '../../lib/club';

const components = {
  h1: props => <h3>{props.children}</h3>,
  a: ({ href, children }) => <a href={href?.startsWith('/uploads/') ? assetUrl(href.slice(1)) : href} {...(href?.startsWith('https://') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>,
  img: ({ src, alt, title }) => <img src={src?.startsWith('/uploads/') ? assetUrl(src.slice(1)) : src} alt={alt || ''} title={title} loading="lazy" />,
  p: ({ node, children }) => {
    const link = node.children.length === 1 ? node.children[0] : null;
    const label = link?.children?.map(child => child.value || '').join('') || '';
    if (link?.tagName === 'a' && label.startsWith('video:')) return <VideoEmbed key={link.properties.href} url={link.properties.href} title={label.slice(6).trim()} />;
    return <p>{children}</p>;
  },
  table: ({ children }) => <div className="markdown-table"><table>{children}</table></div>,
};

export default function MarkdownContent({ children, className = '' }) {
  return <div className={`markdown-content ${className}`}><ReactMarkdown remarkPlugins={[remarkGfm]} components={components} skipHtml>{children || ''}</ReactMarkdown></div>;
}
