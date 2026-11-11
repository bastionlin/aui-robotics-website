import { ArrowDown } from 'lucide-react';
import FadeContent from '../ui/FadeContent';
import SectionHeader from '../ui/SectionHeader';
import teamAtWork from '../../assets/images/photos/team-at-work.webp';

const pillars = [
  ['Learn by making.', 'Workshops, peer mentorship, and time with real hardware turn curiosity into practical skills.'],
  ['Build with purpose.', 'Bring mechanical design, electronics, and software together around a problem worth solving.'],
  ['Put it to the test.', 'Take a prototype beyond the workbench through demos, challenges, and competition.'],
];

export default function About() {
  return <section id="about" tabIndex={-1} className="section tone-light about" data-pattern="staggered-reveal">
    <div className="section-inner">
      <SectionHeader number="01" eyebrow="The club" />
      <div className="editorial-heading">
        <FadeContent><h2>Ideas belong<br />off the page.</h2></FadeContent>
        <FadeContent delay={0.08}><p className="lead-copy">We are AUI Robotics Club, a student-led team at Al Akhawayn University. We design, build, and program robots, learning together through the work between an idea and a working system.</p><a href="#projects" className="text-link">See what we're building <ArrowDown size={17} /></a></FadeContent>
      </div>
      <FadeContent><figure className="about-photo"><img src={teamAtWork} alt="Club members leaning over a table to adjust a robot arm build while a teammate works at a computer" width="1024" height="682" loading="lazy" /></figure></FadeContent>
      <div className="principles">{pillars.map(([title, copy], index) => <FadeContent key={title} delay={index * 0.07}><article><span className="ordinal">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article></FadeContent>)}</div>
    </div>
  </section>;
}
