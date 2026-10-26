import { motion, useReducedMotion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import MemberCard from '../ui/MemberCard';
import ImageWithFallback from '../ui/ImageWithFallback';
import { advisors, leadership } from '../../data/team';

/**
 * Presents student leadership and the advisors supporting the club.
 * Team and advisor content is maintained in src/data/team.js.
 */
export default function Team() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="team" className="bg-brand-bg py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeader number="03" title="Driven by Curiosity, Built on Collaboration" subtitle="A multidisciplinary team that learns together and builds with purpose." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{leadership.map((member) => <MemberCard key={member.role} member={member} />)}</div>
        <div className="mt-20">
          <p className="font-space text-xs font-bold tracking-[0.18em] text-brand-accent">EXPERT ADVISORS</p>
          <h3 className="mt-4 font-space text-3xl font-bold tracking-[-0.05em] md:text-4xl">Guided by experience</h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-brand-muted">Faculty and mentors help our members grow their technical skills and bring projects to life.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {advisors.map((advisor, index) => (
              <motion.article key={advisor.role} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }} className="flex min-h-48 items-start gap-5 rounded-2xl border border-brand-border bg-brand-surface p-6">
                <ImageWithFallback path={advisor.image} alt={`${advisor.name} profile`} className="h-14 w-14 shrink-0 rounded-full border border-brand-accent object-cover" fallback={<span className="font-space text-sm font-bold text-brand-text">{advisor.initials}</span>} />
                <div><h4 className="font-space text-xl font-bold">{advisor.name}</h4><p className="mt-1 text-sm text-brand-muted">{advisor.role}</p><p className="mt-4 text-sm leading-relaxed text-brand-muted">{advisor.focus}</p></div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
