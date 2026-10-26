import { useState } from 'react';
import { Bot } from 'lucide-react';

const assetModules = import.meta.glob('../../assets/images/**/*', { eager: true, query: '?url', import: 'default' });
const resolveAsset = (path) => Object.entries(assetModules).find(([key]) => key.endsWith(`/${path}`))?.[1];

/**
 * Safely displays an image added under src/assets/images, with a labelled fallback.
 * The glob allows optional club photos without breaking Vite when a slot is empty.
 */
export default function ImageWithFallback({ path, alt, className = '', loading = 'lazy', fallback }) {
  const [failed, setFailed] = useState(false);
  const src = path ? resolveAsset(path) : undefined;
  if (!src || failed) return <div role="img" aria-label={`${alt} placeholder`} className={`flex items-center justify-center bg-brand-surface text-brand-muted ${className}`}>{fallback || <><Bot aria-hidden="true" size={34} strokeWidth={1.25} /><span className="sr-only">{alt}</span></>}</div>;
  return <img src={src} alt={alt} loading={loading} className={className} onError={() => setFailed(true)} />;
}
