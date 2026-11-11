import { useState } from 'react';

const photos = import.meta.glob('../../assets/images/photos/*', { eager: true, query: '?url', import: 'default' });
const photoUrl = (name) => Object.entries(photos).find(([path]) => path.endsWith(`/${name}`))?.[1];

// A decorative, darkened photo behind a dark section. One photo from `images`
// is picked at random on each page load.
export default function ShadedBackdrop({ images, className = '', priority = false }) {
  const [choice] = useState(() => images[Math.floor(Math.random() * images.length)]);
  const src = photoUrl(choice.file);
  if (!src) return null;
  return <div className={`shaded-backdrop ${className}`} aria-hidden="true">
    <img src={src} alt="" style={{ objectPosition: choice.position || '50% 50%' }} {...(priority ? { fetchpriority: 'high' } : { loading: 'lazy' })} />
  </div>;
}
