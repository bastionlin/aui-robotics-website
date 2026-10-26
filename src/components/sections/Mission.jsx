import { motion, useReducedMotion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';

const pillars = [
  ['01', 'Educate', 'We make technical learning practical through workshops, peer mentorship, and time with real hardware.'],
  ['02', 'Build', 'We take ambitious ideas from prototype to test bench, blending software, electronics, and mechanical design.'],
  ['03', 'Compete', 'We challenge our teams in competitions that reward resilience, engineering discipline, and creative problem-solving.'],
];

/**
 * Explains the three pillars that guide every AUI Robotics Club activity.
 * Each pillar enters in sequence when it becomes relevant in the reader's flow.
 */
export default function Mission() {
  const reduceMotion = useReducedMotion();
  return <section id="mission" className="bg-brand-bg py-24 md:py-36"><div className="mx-auto max-w-7xl px-6 md:px-12"><SectionHeader title="Three Pillars Driving Us Forward" subtitle="Our mission is to turn curiosity into capable robotics teams." centered /><div className="grid gap-4 md:grid-cols-3">{pillars.map(([number, title, body], index) => <motion.article key={title} initial={reduceMotion ? false : { opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55, delay: index * 0.15 }} whileHover={reduceMotion ? {} : { y: -4, borderColor: '#E5E5E5' }} className="group rounded-2xl border border-brand-border bg-brand-surface p-7 transition-colors duration-300 md:p-8"><span className="font-space text-sm font-bold text-brand-accent">{number}</span><h3 className="mt-14 font-space text-3xl font-bold tracking-[-0.05em]">{title}</h3><p className="mt-5 text-sm leading-relaxed text-brand-muted">{body}</p><div className="mt-12 h-px w-full bg-brand-border transition-colors group-hover:bg-brand-accent" /></motion.article>)}</div></div></section>;
}
