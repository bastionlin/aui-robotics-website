import { ArrowDown } from 'lucide-react';
import FadeContent from '../ui/FadeContent';
import SectionHeader from '../ui/SectionHeader';
import rovFinals from '../../assets/images/photos/rov-2018-regional-finals.webp';
import vexTournament from '../../assets/images/photos/vex-tournament.webp';
import rovAward from '../../assets/images/photos/rov-arab-award.webp';
import vexChampion2023 from '../../assets/images/photos/vex-u-tournament-champion-2023.webp';
import vexSkills2022 from '../../assets/images/photos/vex-u-skills-champion-2022.webp';
import vexBooth from '../../assets/images/photos/vex-team-booth.webp';
import arabRovBooth from '../../assets/images/photos/arab-rov-2018-booth.webp';

const pillars = [
  ['Learn by making.', 'Workshops, peer mentorship, and time with real hardware turn curiosity into practical skills.'],
  ['Build with purpose.', 'Bring mechanical design, electronics, and software together around a problem worth solving.'],
  ['Put it to the test.', 'Take a prototype beyond the workbench through demos, challenges, and competition.'],
];

const moments = [
  { src: vexChampion2023, width: 547, height: 306, caption: 'VEX U Tournament Champion, Morocco 2023', alt: 'A large group of AUI students holding the VEX U Tournament Champion banner from the 2023 Morocco National Championship' },
  { src: vexSkills2022, width: 550, height: 357, caption: 'VEX U Robot Skills Champion, Morocco 2022', alt: 'AUI students with certificates and two robots behind the VEX U Robot Skills Champion sign from the 2022 Morocco National Championship' },
  { src: vexBooth, width: 1000, height: 567, caption: 'AUI Mechatronics Team booth', alt: 'The AUI team in yellow shirts standing around their robot at a competition booth decorated with the Moroccan flag and AUI banner' },
  { src: arabRovBooth, width: 486, height: 488, caption: 'ARAB ROV 2018, Alexandria', alt: 'AUI team members in blue shirts posing with their underwater ROV beside the ARAB ROV 2018 Regional Finals banner' },
  { src: rovFinals, width: 1000, height: 667, caption: "ROV'18 Regional Finals", alt: 'AUI team members in green club shirts holding certificates and the Moroccan flag on stage at the ROV 2018 Regional Finals' },
  { src: rovAward, width: 1000, height: 688, caption: 'ROV Arab competition', alt: 'AUI students giving a thumbs up while holding a trophy and the Moroccan flag at the ROV Arab competition' },
  { src: vexTournament, width: 1000, height: 750, caption: 'VEX Robotics tournament', alt: 'The AUI Mechatronics team in green hoodies posing with their robots, certificates, the AUI banner, and the Moroccan flag' },
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
        <div className="competition-copy"><p className="small-label">On the competition floor</p><p>From national VEX U titles to the ARAB ROV finals, our teams have carried AUI and Morocco onto the competition floor.</p></div>
        <ul className="competition-photos">{moments.map((moment) => <li key={moment.caption} style={{ '--ratio': moment.width / moment.height }}><figure><img src={moment.src} alt={moment.alt} width={moment.width} height={moment.height} loading="lazy" /><figcaption>{moment.caption}</figcaption></figure></li>)}</ul>
      </div>
    </div>
  </section>;
}
