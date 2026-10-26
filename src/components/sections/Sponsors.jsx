import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import ImageWithFallback from '../ui/ImageWithFallback';
import { sponsors } from '../../data/sponsors';

/**
 * Presents confirmed partners as a logo wall on white tiles.
 * Sponsor names, links, and optional logo paths are maintained in src/data/sponsors.js.
 */
export default function Sponsors() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="sponsors" className="bg-brand-surface py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeader number="04" title="Our Sponsors" subtitle="Partners help our students turn robotics ideas into working systems." />
        {sponsors.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 border-y border-brand-border py-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {sponsors.map((sponsor, index) => {
              const mark = sponsor.logo ? (
                <span className="flex flex-col items-center gap-1.5">
                  <ImageWithFallback path={`sponsors/${sponsor.logo}`} alt={`${sponsor.name} logo`} className={`max-h-16 max-w-full object-contain ${sponsor.monochrome ? 'brightness-0' : ''}`} fallback={<span className="font-space text-center text-base font-semibold text-neutral-900">{sponsor.name}</span>} />
                  {sponsor.descriptor && <span className="font-space text-[10px] font-bold tracking-[0.16em] text-neutral-800">{sponsor.descriptor}</span>}
                </span>
              ) : (
                <span className="font-space text-center text-base font-semibold tracking-[-0.03em] text-neutral-900 sm:text-lg">{sponsor.name}</span>
              );

              return (
                <motion.div key={sponsor.name} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.06 }} className="flex min-h-28 items-center justify-center rounded-2xl border border-brand-border bg-white p-5 sm:min-h-32 sm:p-6">
                  {sponsor.href ? <a href={sponsor.href} target="_blank" rel="noreferrer" aria-label={`${sponsor.name} website (opens in a new tab)`} className="flex h-full w-full items-center justify-center">{mark}</a> : mark}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="grid gap-8 border-y border-brand-border py-10 md:grid-cols-[1.3fr_1fr] md:items-end md:py-14">
            <div>
              <p className="font-space text-3xl font-semibold tracking-[-0.04em] text-brand-text md:text-4xl">Support the next generation of robotics talent.</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-brand-muted">We welcome partners who can support student projects, technical workshops, and competition teams.</p>
            </div>
            <a href="mailto:robotics@aui.ma?subject=AUI%20Robotics%20sponsorship" className="inline-flex min-h-12 w-fit items-center gap-3 rounded-xl border border-brand-accent px-5 font-space text-xs font-bold tracking-[0.12em] text-brand-text transition hover:bg-brand-accent hover:text-brand-bg active:translate-y-px">
              BECOME A SPONSOR <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
