import { ArrowUpRight, Linkedin } from 'lucide-react';
import { members, sections } from '../../content';
import SectionHeader from '../ui/SectionHeader';
import FadeContent from '../ui/FadeContent';
import MarkdownContent from '../ui/MarkdownContent';
import { mailLink, assetUrl } from '../../lib/club';

const content = sections.team;
const leadership = members.filter(member => member.group === 'leadership');
const advisors = members.filter(member => member.group === 'advisor');
const builders = members.filter(member => member.group === 'member');

function Profile({ member, index }) {
  return <article>
    {member.image ? <img className="member-photo" src={assetUrl(member.image.slice(1))} alt={member.imageAlt} loading="lazy" /> : <span className="ordinal">{String(index + 1).padStart(2, '0')}</span>}
    <div>{!member.placeholder && <p className="small-label team-role">{member.role}</p>}<h3>{member.placeholder ? member.role : member.name}</h3><MarkdownContent>{member.body}</MarkdownContent>{member.linkedin && <a className="member-social" href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`}><Linkedin size={18} /></a>}</div>
  </article>;
}

export default function Team() {
  return <section id="team" tabIndex={-1} className="section tone-light team" data-pattern="staggered-reveal"><div className="section-inner">
    <SectionHeader number="03" eyebrow={content.eyebrow} />
    <div className="team-layout"><FadeContent className="team-intro"><h2>{content.title}</h2><MarkdownContent className="lead-copy">{content.body}</MarkdownContent><a className="text-link" href="#contact">{content.ctaLabel} <ArrowUpRight size={17} /></a></FadeContent><div className="team-roster" aria-label="Executive board">{leadership.map((member, index) => <FadeContent key={member.slug} delay={index * 0.035}><Profile member={member} index={index} /></FadeContent>)}</div></div>
    {advisors.length > 0 && <div className="mentor-strip"><p className="small-label">Faculty advisors</p><div>{advisors.map((member, index) => <Profile key={member.slug} member={member} index={index} />)}</div><a className="text-link" href={mailLink('AUI Robotics - Mentorship')}>Share your experience <ArrowUpRight size={17} /></a></div>}
    {builders.length > 0 && <div className="mentor-strip"><p className="small-label">Our builders</p><div>{builders.map((member, index) => <Profile key={member.slug} member={member} index={index} />)}</div></div>}
  </div></section>;
}
