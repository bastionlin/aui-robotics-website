/**
 * Provides a consistent numbered heading treatment for major content sections.
 * The number is decorative, while the heading preserves document hierarchy.
 */
export default function SectionHeader({ number, title, subtitle, centered = false }) {
  return (
    <header className={`relative mb-14 ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
      {number && <span aria-hidden="true" className="mb-5 block font-space text-sm font-bold tracking-[0.18em] text-brand-accent">{number}</span>}
      <h2 className="font-space text-4xl font-bold tracking-[-0.05em] text-brand-text md:text-6xl">{title}</h2>
      {subtitle && <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg">{subtitle}</p>}
    </header>
  );
}
