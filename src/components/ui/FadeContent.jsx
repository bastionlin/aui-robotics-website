import { useEffect, useRef, useState } from 'react';

/** React Bits-style viewport fade using IntersectionObserver and CSS transitions. */
export default function FadeContent({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(node);
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} transition-[opacity,transform,filter] duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${visible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-5 opacity-0 blur-[2px]'}`}>
      {children}
    </div>
  );
}
