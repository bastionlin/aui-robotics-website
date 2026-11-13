import { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { resolveVideo } from '../../lib/media';
import { assetUrl } from '../../lib/club';

export default function VideoEmbed({ url, title }) {
  const [loaded, setLoaded] = useState(false);
  let video;
  try { video = resolveVideo(url); } catch { return <p>Video unavailable.</p>; }
  const src = video.file ? assetUrl(video.src.slice(1)) : video.src;
  return <figure className="video-embed">
    {src && <div className="video-player">{loaded ? video.file ? <video controls preload="metadata" src={src} aria-label={title}>Your browser does not support this video.</video> : <iframe src={src} title={title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="fullscreen; picture-in-picture; encrypted-media" sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-forms" allowFullScreen /> : <button type="button" className="video-load" onClick={() => setLoaded(true)} aria-label={`Load video: ${title}`}><Play size={32} aria-hidden="true" /><strong>{title}</strong><span>{video.provider}</span></button>}</div>}
    <figcaption><span>{title}</span><a href={video.file ? assetUrl(video.original.slice(1)) : video.original} target="_blank" rel="noopener noreferrer">Open video <ArrowUpRight size={16} aria-hidden="true" /></a></figcaption>
  </figure>;
}
