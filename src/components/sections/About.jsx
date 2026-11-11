import { ArrowDown } from 'lucide-react';
import FadeContent from '../ui/FadeContent';
import SectionHeader from '../ui/SectionHeader';
import rovFinals from '../../assets/images/photos/rov-2018-regional-finals.webp';
import vexTournament from '../../assets/images/photos/vex-tournament.webp';
import rovAward from '../../assets/images/photos/rov-arab-award.webp';

const pillars = [
  ['Learn by making.', 'Workshops, peer mentorship, and time with real hardware turn curiosity into practical skills.'],
  ['Build with purpose.', 'Bring mechanical design, electronics, and software together around a problem worth solving.'],
  ['Put it to the test.', 'Take a prototype beyond the workbench through demos, challenges, and competition.'],
];

const moments = [
  { src: rovFinals, caption: "ROV'18 Regional Finals", alt: 'AUI team members in green club shirts holding certificates and the Moroccan flag on stage at the ROV 2018 Regional Finals' },
  { src: vexTournament, caption: 'VEX Robotics tournament', alt: 'The AUI Mechatronics team in green hoodies posing with their robots, certificates, the AUI banner, and the Moroccan flag' },
  { src: rovAward, caption: 'ROV Arab competition', alt: 'AUI students giving a thumbs up while holding a trophy and the Moroccan flag at the ROV Arab competition' },
];

export default function About() {
  return <section id="about" tabIndex={-1} className="section tone-light about" data-pattern="staggered-reveal">
    <div className="section-inner">
      <SectionHeader number="01" eyebrow="The club" />
      <div className="editorial-heading">
        <FadeContent><h2>Ideas belong<br />off the page.</h2></FadeContent>
        <FadeContent delay={0.08}><p className="lead-copy">We are AUI Robotics Club, a student-led team at Al Akhawayn University. We design, build, and program robots, learning together through the work between an idea and a working system.</p><a href="#projects" className="text-link">See what we're building <ArrowDown size={17} /></a></FadeContent>
      </div>
      <div className="principles">{pillars.map(([title, copy], index) => <FadeContent key={title} delay={index * 0.07}><article><span className="ordinal">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article></FadeContent>)}</div>
      <div className="competition-strip">
        <div className="competition-copy"><p className="small-label">On the competition floor</p><p>Our teams have carried AUI and Morocco to regional and international stages.</p></div>
        <ul className="competition-photos">{moments.map((moment) => <li key={moment.caption}><figure><img src={moment.src} alt={moment.alt} loading="lazy" /><figcaption>{moment.caption}</figcaption></figure></li>)}</ul>
      </div>
    </div>
  </section>;
}
