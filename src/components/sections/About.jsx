import { motion, useReducedMotion } from 'framer-motion';
import ImageWithFallback from '../ui/ImageWithFallback';

const stats = [['50+', 'Members'], ['5', 'Projects'], ['3', 'Competition Teams']];

/**
 * Introduces the club, its scale, and its practical mission at AUI.
 * Optional image slots create a photo story when club imagery is supplied.
 */
export default function About() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="about" className="relative overflow-hidden bg-brand-surface py-24 md:py-36">
      <span aria-hidden="true" className="section-number pointer-events-none absolute -right-4 top-0 font-space text-[13rem] font-bold leading-none md:text-[20rem]">01</span>
      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-5"><p className="font-space text-xs font-bold tracking-[0.18em] text-brand-accent">WHO WE ARE</p><h2 className="mt-5 max-w-md font-space text-4xl font-bold leading-tight tracking-[-0.05em] md:text-5xl">A student-led robotics initiative at Al Akhawayn University in Ifrane.</h2></motion.div>
          <div className="lg:col-span-7"><div className="grid grid-cols-3 border-y border-brand-border">{stats.map(([value, label]) => <div key={label} className="p-4 md:p-6"><p className="font-space text-4xl font-bold tracking-[-0.06em] text-brand-muted md:text-6xl">{value}</p><p className="mt-2 max-w-20 text-xs leading-snug text-brand-muted">{label}</p></div>)}</div><p className="mt-8 max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg">The AUI Robotics Club brings together engineers, coders, and designers to push the limits of autonomous systems. We compete internationally, collaborate with industry, and build robots that solve real problems.</p></div>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2"><ImageWithFallback path="about-1.jpg" alt="AUI Robotics members working together" className="aspect-[4/3] w-full rounded-2xl object-cover" /><ImageWithFallback path="about-2.jpg" alt="AUI Robotics Club project session" className="aspect-[4/3] w-full rounded-2xl object-cover" /></div>
      </div>
    </section>
  );
}
