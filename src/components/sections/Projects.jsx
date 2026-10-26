import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import ProjectCard from '../ui/ProjectCard';
import FadeContent from '../ui/FadeContent';
import { projects } from '../../data/projects';

/**
 * Shows the active, completed, and planned work maintained by the club.
 * Project content is supplied from the dedicated data module for simple updates.
 */
export default function Projects() {
  const trackRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const scrollProjects = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 16;
    const step = (card?.getBoundingClientRect().width || track.clientWidth * 0.82) + gap;
    track.scrollBy({ left: direction * step, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section id="projects" className="bg-brand-surface py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeContent>
          <SectionHeader number="02" title="What We&apos;re Building Right Now" subtitle="From rapid prototypes to competition-ready machines, our work connects software with the physical world." />
        </FadeContent>
        <div className="mb-5 flex justify-end gap-2">
          <button type="button" aria-label="Scroll projects left" aria-controls="project-carousel" onClick={() => scrollProjects(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-border text-brand-text transition hover:border-brand-accent hover:bg-brand-bg focus-visible:ring-2 focus-visible:ring-brand-accent">
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Scroll projects right" aria-controls="project-carousel" onClick={() => scrollProjects(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-border text-brand-text transition hover:border-brand-accent hover:bg-brand-bg focus-visible:ring-2 focus-visible:ring-brand-accent">
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
        <div id="project-carousel" ref={trackRef} role="region" aria-label="Robotics projects" tabIndex={0} className="project-carousel-track">
          {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
        </div>
      </div>
    </section>
  );
}
