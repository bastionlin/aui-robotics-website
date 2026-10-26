import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Bot } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

const statusStyles = { Active: 'bg-brand-surface text-brand-text', Completed: 'bg-brand-muted/20 text-brand-muted', Upcoming: 'bg-brand-border text-brand-text' };

/**
 * Displays one current or planned robotics project with its stack and status.
 * Accepts the project object exported from src/data/projects.js.
 */
export default function ProjectCard({ project }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article initial={reduceMotion ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} whileHover={reduceMotion ? {} : { y: -4, borderColor: '#E5E5E5' }} transition={{ duration: 0.55, type: 'spring', stiffness: 230, damping: 25 }} className="group overflow-hidden rounded-2xl border border-brand-border bg-brand-bg">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-brand-border">
        {project.image ? <ImageWithFallback path={project.image} alt={`${project.title} project`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" /> : <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,_#888888,_#222222)]"><Bot size={56} strokeWidth={1} className="text-brand-muted" aria-hidden="true" /></div>}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4"><p className="text-xs font-semibold tracking-[0.1em] text-brand-muted">{project.category}</p><span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${statusStyles[project.status]}`}>{project.status}</span></div>
        <h3 className="mt-3 font-space text-2xl font-bold tracking-[-0.04em]">{project.title}</h3>
        <p className="mt-3 min-h-20 text-sm leading-relaxed text-brand-muted">{project.description}</p>
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-brand-border pt-4"><div className="flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="text-[11px] text-brand-muted">{tag}</span>)}</div><ArrowUpRight size={18} aria-hidden="true" className="shrink-0 text-brand-accent" /></div>
      </div>
    </motion.article>
  );
}
