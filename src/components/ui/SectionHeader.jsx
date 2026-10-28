export default function SectionHeader({ number, eyebrow, title, subtitle, className = '' }) {
  return <header className={`section-heading ${className}`}>
    <p className="section-label"><span>{number}</span>{eyebrow}</p>
    {title && <h2>{title}</h2>}
    {subtitle && <p className="section-description">{subtitle}</p>}
  </header>;
}
