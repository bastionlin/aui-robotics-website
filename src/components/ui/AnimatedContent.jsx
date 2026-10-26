import { useEffect, useState } from 'react';

/** React Bits-style entrance reveal, kept dependency-free and motion-safe. */
export default function AnimatedContent({ children, className = '' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return undefined;
    }
    const frame = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`${className} transition-[opacity,transform,filter] duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${visible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-6 opacity-0 blur-[3px]'}`}>
      {children}
    </div>
  );
}
