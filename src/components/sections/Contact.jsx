import { useState } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { clubEmail } from '../../lib/club';
import SectionHeader from '../ui/SectionHeader';
import FadeContent from '../ui/FadeContent';
import Button from '../ui/Button';
import MarkdownContent from '../ui/MarkdownContent';
import { sections, site } from '../../content';
const content = sections.contact;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', interest: 'Joining the club', message: '' });
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const compose = (event) => {
    event.preventDefault();
    const subject = `AUI Robotics - ${form.interest}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\nInterest: ${form.interest}\n\n${form.message}`;
    window.location.href = `mailto:${clubEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return <section id="contact" tabIndex={-1} className="section tone-light contact" data-pattern="final-reveal">
    <div className="section-inner">
      <SectionHeader number="06" eyebrow={content.eyebrow} />
      <div className="contact-layout"><FadeContent className="contact-copy"><h2>{content.title}</h2><MarkdownContent className="lead-copy">{content.body}</MarkdownContent><a className="contact-email" href={`mailto:${clubEmail}`}>{clubEmail}<ArrowUpRight size={21} /></a><p className="contact-location">{site.location}</p></FadeContent>
        <form className="contact-form" onSubmit={compose}><div className="form-row"><label htmlFor="contact-name">Your name<input id="contact-name" name="name" autoComplete="name" required maxLength={120} value={form.name} onChange={update} /></label><label htmlFor="contact-email">Email address<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={200} value={form.email} onChange={update} /></label></div><label htmlFor="contact-interest">I'm interested in<select id="contact-interest" name="interest" value={form.interest} onChange={update}><option>Joining the club</option><option>A partnership</option><option>Mentoring students</option><option>A project conversation</option><option>Something else</option></select></label><label htmlFor="contact-message">Your message<textarea id="contact-message" name="message" rows={4} maxLength={1500} required value={form.message} onChange={update} /></label><Button type="submit">Compose email <Mail size={18} /></Button></form>
      </div>
    </div>
  </section>;
}
