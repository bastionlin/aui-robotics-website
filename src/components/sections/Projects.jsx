import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Circle } from 'lucide-react';
import { projects, sections } from '../../content';
import { assetUrl } from '../../lib/club';
import MarkdownContent from '../ui/MarkdownContent';
import SectionHeader from '../ui/SectionHeader';
import FadeContent from '../ui/FadeContent';
import ShadedBackdrop from '../ui/ShadedBackdrop';

const content = sections.projects;
const statusOrder = ['Active', 'Upcoming', 'Paused', 'Completed'];
const filters = ['All', ...statusOrder.filter(status => projects.some(project => project.status === status))];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selectedSlug, setSelectedSlug] = useState(projects[0]?.slug);
  const [horizontal, setHorizontal] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const query = window.matchMedia('(max-width: 700px)');
    const sync = () => setHorizontal(query.matches);
    sync(); query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  const visible = projects.filter(project => filter === 'All' || project.status === filter);
  const selected = visible.find(project => project.slug === selectedSlug) || visible[0];
  const activeIndex = visible.indexOf(selected);
  const keyDown = (event, index) => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % visible.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + visible.length) % visible.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = visible.length - 1;
    if (next === undefined) return;
    event.preventDefault(); setSelectedSlug(visible[next].slug);
    document.getElementById(`project-tab-${projects.indexOf(visible[next])}`).focus();
  };
  return <section id="projects" tabIndex={-1} className="section tone-dark projects" data-pattern="sticky-index">
    <ShadedBackdrop images={content.backdrops} className="projects-backdrop" />
    <div className="section-inner">
      <SectionHeader number="02" eyebrow={content.eyebrow} />
      <FadeContent className="projects-heading"><h2>{content.title}</h2><MarkdownContent className="lead-copy">{content.body}</MarkdownContent></FadeContent>
      <div className="project-toolbar"><span className="small-label">{String(projects.length).padStart(2, '0')} milestones / One shared ambition</span>{filters.length > 2 && <div className="project-filters" role="group" aria-label="Filter projects by status">{filters.map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}<span>{item === 'All' ? projects.length : projects.filter(p => p.status === item).length}</span></button>)}</div>}</div>
      {selected ? <div className="project-explorer">
        <div className="project-index" role="tablist" aria-label="Robotics projects" aria-orientation={horizontal ? 'horizontal' : 'vertical'}>{visible.map((project, index) => {
          const id = projects.indexOf(project);
          return <button key={project.slug} id={`project-tab-${id}`} type="button" role="tab" aria-selected={project === selected} aria-controls="project-detail" tabIndex={project === selected ? 0 : -1} onKeyDown={event => keyDown(event, index)} onClick={() => setSelectedSlug(project.slug)}><span className="project-number">{project.year ?? String(id + 1).padStart(2, '0')}</span><span>{project.title}<small>{project.category}</small></span><ArrowRight size={19} aria-hidden="true" /></button>;
        })}</div>
        <div id="project-detail" className="project-detail" role="tabpanel" aria-labelledby={`project-tab-${projects.indexOf(selected)}`} tabIndex={0}>
          <AnimatePresence mode="wait"><motion.article key={selected.slug} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.15 }}>
            <div className="project-detail-top"><span className="small-label">{[selected.category, selected.year].filter(Boolean).join(' / ')}</span><span className="project-status"><Circle size={6} fill="currentColor" aria-hidden="true" />{selected.status}</span></div>
            <h3>{selected.title}</h3><p className="project-updated">Updated <time dateTime={selected.updated}>{selected.updated}</time></p>
            <MarkdownContent>{selected.body}</MarkdownContent>
            {selected.image && <figure className="project-photo"><img src={assetUrl(selected.image.slice(1))} alt={selected.imageAlt} width={selected.imageWidth} height={selected.imageHeight} loading="lazy" /></figure>}
            {(selected.result || selected.location) && <dl className="project-facts">{selected.result && <div><dt className="small-label">Result</dt><dd>{selected.result}</dd></div>}{selected.location && <div><dt className="small-label">Location</dt><dd>{selected.location}</dd></div>}</dl>}
            {selected.tags.length > 0 && <div className="project-stack"><span className="small-label">Built with</span><ul>{selected.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div>}
            {selected.repository && <a className="text-link" href={selected.repository} target="_blank" rel="noopener noreferrer">Repository <ArrowUpRight size={18} /></a>}
          </motion.article></AnimatePresence>
          <p className="project-position">{String(activeIndex + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}</p>
        </div>
      </div> : <p className="empty-state">No projects in this category yet.</p>}
    </div>
  </section>;
}
