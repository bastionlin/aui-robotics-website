import { Linkedin } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

/**
 * Renders an AUI Robotics leadership profile with image and social fallback states.
 * Accepts a member object from src/data/team.js.
 */
export default function MemberCard({ member }) {
  const initials = member.name.split(' ').map((word) => word[0]).join('').slice(0, 2);
  return (
    <article className="group overflow-hidden rounded-2xl border border-brand-border bg-brand-bg p-4 transition hover:border-brand-accent">
      <div className="aspect-square overflow-hidden rounded-xl bg-brand-surface">
        <ImageWithFallback path={member.image} alt={member.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" fallback={<span className="flex h-20 w-20 items-center justify-center rounded-full border border-brand-accent font-space text-3xl font-bold text-brand-text">{initials}</span>} />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3"><div><h3 className="font-space text-lg font-bold">{member.name}</h3><p className="mt-1 text-xs text-brand-muted">{member.role}</p></div>{member.linkedin && <a href={member.linkedin} aria-label={`${member.name} on LinkedIn`} className="text-brand-muted hover:text-brand-accent"><Linkedin size={17} /></a>}</div>
    </article>
  );
}
