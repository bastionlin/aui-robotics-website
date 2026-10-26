const links = [['About', 'about'], ['Projects', 'projects'], ['Team', 'team'], ['Sponsors', 'sponsors'], ['Contact', 'contact']];

/**
 * Closes the page with university context, navigation, and copyright details.
 * Its anchor list repeats the primary navigation for convenient end-of-page use.
 */
export default function Footer() {
  return <footer className="border-t border-brand-border bg-brand-surface"><div className="mx-auto max-w-7xl px-6 py-12 md:px-12"><div className="flex flex-col justify-between gap-10 md:flex-row md:items-start"><div><p className="font-space text-xl font-bold tracking-[-0.05em]">AUI ROBOTICS CLUB</p><p className="mt-2 text-sm text-brand-muted">Al Akhawayn University, Ifrane, Morocco</p></div><nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3">{links.map(([label, id]) => <a key={id} href={`#${id}`} className="text-sm text-brand-muted transition hover:text-brand-accent">{label}</a>)}</nav></div><p className="mt-12 text-xs text-brand-muted">© 2025 AUI Robotics Club. All rights reserved.</p></div></footer>;
}
