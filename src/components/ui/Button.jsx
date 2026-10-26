/**
 * Renders a high-contrast link or button in filled and ghost variants.
 * Pass href for anchor behaviour, otherwise standard button props are supported.
 */
export default function Button({ variant = 'filled', className = '', href, children, ...props }) {
  const styles = variant === 'filled'
    ? 'bg-brand-accent text-brand-bg hover:bg-brand-accent/90'
    : 'border border-brand-border text-brand-text hover:border-brand-accent hover:text-white';
  const base = `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 font-space text-xs font-bold tracking-[0.12em] transition duration-300 active:translate-y-px whitespace-nowrap ${styles} ${className}`;
  if (href) return <a className={base} href={href} {...props}>{children}</a>;
  return <button className={base} {...props}>{children}</button>;
}
