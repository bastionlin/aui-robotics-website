import { ArrowUpRight } from 'lucide-react';
import { leadership, advisors } from '../../data/team';
import SectionHeader from '../ui/SectionHeader';
import FadeContent from '../ui/FadeContent';
import { mailLink } from '../../lib/club';

export default function Team() {
  return <section id="team" tabIndex={-1} className="section tone-light team" data-pattern="staggered-reveal">
    <div className="section-inner">
      <SectionHeader number="03" eyebrow="The team" />
      <div className="team-layout"><FadeContent className="team-intro"><h2>Different disciplines.<br />One team.</h2><p className="lead-copy">Good engineering takes more than a single skill. Our student-led structure connects technical work, project delivery, and the people who make it possible.</p><a className="text-link" href="#join">Build with us <ArrowUpRight size={17} /></a></FadeContent><div className="team-roster" aria-label="Executive board">{leadership.map((member, index) => <FadeContent key={member.role} delay={index * 0.035}><article><span className="ordinal">{String(index + 1).padStart(2, '0')}</span><div><p className="small-label team-role">{member.role}</p><h3>{member.name}</h3><p>{member.focus}</p></div></article></FadeContent>)}</div></div>
      <div className="mentor-strip"><p className="small-label">Faculty advisors</p><div>{advisors.map((advisor) => <article key={advisor.name}><h3>{advisor.name}</h3><p>{advisor.focus}</p></article>)}</div><a className="text-link" href={mailLink('AUI Robotics - Mentorship')}>Share your experience <ArrowUpRight size={17} /></a></div>
    </div>
  </section>;
}
