import { useState } from 'react';
import { assetUrl } from '../../lib/club';

// A decorative, darkened photo behind a dark section. One photo from `images`
// is picked at random on each page load.
export default function ShadedBackdrop({ images = [], className = '', priority = false }) {
  const [choice] = useState(() => images[Math.floor(Math.random() * images.length)]);
  if (!choice) return null;
  const src = assetUrl(choice.file.slice(1));
  return <div className={`shaded-backdrop ${className}`} aria-hidden="true">
    <img src={src} alt="" style={{ objectPosition: choice.position || '50% 50%' }} {...(priority ? { fetchpriority: 'high' } : { loading: 'lazy' })} />
  </div>;
}
