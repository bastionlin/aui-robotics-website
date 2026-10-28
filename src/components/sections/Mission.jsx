import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Cpu, Wrench, Code2, Users } from 'lucide-react';
import { mailLink } from '../../lib/club';
import SectionHeader from '../ui/SectionHeader';
import FadeContent from '../ui/FadeContent';
import Button from '../ui/Button';

const disciplines = [
  { name: 'Mechanical', Icon: Wrench, title: 'Give an idea a physical form.', detail: 'CAD / Fabrication / Prototyping', copy: 'Explore mechanisms, materials, and assembly. Turn a drawing into something you can put on the workbench and test.' },
  { name: 'Embedded', Icon: Cpu, title: 'Connect code to the real world.', detail: 'Electronics / Firmware / Sensors', copy: 'Work with circuits, sensors, and microcontrollers. Build the electronics that help a robot respond to its surroundings.' },
  { name: 'Software & AI', Icon: Code2, title: 'Teach a machine to find its way.', detail: 'Perception / Navigation / Control', copy: 'Explore computer vision, autonomous navigation, and control. Bring software off the screen and into a system that moves.' },
  { name: 'Operations', Icon: Users, title: 'Make the whole team move forward.', detail: 'Partnerships / Events / Documentation', copy: 'Shape partnerships, document builds, and organize experiences. Help the team share its work and bring the next project to life.' },
];

export default function Mission() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const selected = disciplines[active];
  const { Icon } = selected;
  const keyDown = (event, index) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % disciplines.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + disciplines.length) % disciplines.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = disciplines.length - 1;
    if (next === undefined) return;
    event.preventDefault(); setActive(next); document.getElementById(`discipline-${next}`).focus();
  };
  return <section id="join" tabIndex={-1} className="section tone-dark join" data-pattern="reveal-and-tab-transition">
    <div className="section-inner">
      <SectionHeader number="05" eyebrow="For the curious" />
      <FadeContent className="editorial-heading"><h2>Your next idea<br />needs a team.</h2><p className="lead-copy">Bring your curiosity. Find your discipline. There is room for a first circuit, a new skill, and the next ambitious build.</p></FadeContent>
      <div className="discipline-tabs" role="tablist" aria-label="Explore club disciplines">{disciplines.map((discipline, index) => <button type="button" key={discipline.name} id={`discipline-${index}`} role="tab" aria-selected={index === active} aria-controls="discipline-panel" tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => keyDown(event, index)}>{discipline.name}<ArrowUpRight size={17} aria-hidden="true" /></button>)}</div>
      <div className="discipline-panel" id="discipline-panel" role="tabpanel" aria-labelledby={`discipline-${active}`} tabIndex={0}><AnimatePresence mode="wait"><motion.div key={selected.name} className="discipline-content" initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.15 }}><Icon size={66} strokeWidth={1} className="discipline-icon" aria-hidden="true" /><div><p className="small-label">{selected.detail}</p><h3>{selected.title}</h3><p>{selected.copy}</p></div><Button href={mailLink(`Join AUI Robotics - ${selected.name}`)}>Join the club <ArrowUpRight size={18} /></Button></motion.div></AnimatePresence></div>
    </div>
  </section>;
}
