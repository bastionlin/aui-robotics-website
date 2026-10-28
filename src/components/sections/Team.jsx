import { ArrowUpRight } from 'lucide-react';
import { leadership, advisors } from '../../data/team';
import SectionHeader from '../ui/SectionHeader';
import FadeContent from '../ui/FadeContent';
import { mailLink } from '../../lib/club';

const responsibilities = {
  President: 'Direction, community, and the work that connects the whole club.',
  'VP Technology': 'Technical learning, engineering decisions, and shared tools.',
  'VP Projects': 'Project coordination, milestones, and getting builds over the line.',
  'VP Events': 'Workshops, demonstrations, and competition experiences.',
  'VP Media': 'The stories, documentation, and visuals behind our work.',
  'VP Finance': 'Budgets, resources, and sustainable support for the team.',
};

export default function Team() {
  return <section id="team" tabIndex={-1} className="section tone-light team" data-pattern="staggered-reveal">
    <div className="section-inner">
      <SectionHeader number="03" eyebrow="The team" />
      <div className="team-layout"><FadeContent className="team-intro"><h2>Different disciplines.<br />One team.</h2><p className="lead-copy">Good engineering takes more than a single skill. Our student-led structure connects technical work, project delivery, and the people who make it possible.</p><a className="text-link" href="#join">Build with us <ArrowUpRight size={17} /></a></FadeContent><div className="team-roster" aria-label="Club leadership roles">{leadership.map((member, index) => <FadeContent key={member.role} delay={index * 0.035}><article><span className="ordinal">{String(index + 1).padStart(2, '0')}</span><div><h3>{member.role}</h3><p>{responsibilities[member.role] || member.role}</p></div></article></FadeContent>)}</div></div>
      <div className="mentor-strip"><p className="small-label">Guided by experience</p><div>{advisors.map((advisor) => <article key={advisor.role}><h3>{advisor.role}</h3><p>{advisor.focus}</p></article>)}</div><a className="text-link" href={mailLink('AUI Robotics - Mentorship')}>Share your experience <ArrowUpRight size={17} /></a></div>
    </div>
  </section>;
}
