import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import Button from '../ui/Button';

const initialForm = { name: '', email: '', major: '', message: '' };
const fields = [
  ['name', 'Full Name', 'text'], ['email', 'AUI Email', 'email'], ['major', 'Major / Year', 'text'],
];

/**
 * Invites students to connect through accessible contact details and an interest form.
 * Submission is client-side only and confirms success before clearing local state.
 */
export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = (event) => { event.preventDefault(); setSubmitted(true); setForm(initialForm); window.setTimeout(() => setSubmitted(false), 4200); };
  return <section id="contact" className="bg-brand-bg py-24 md:py-36"><div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-12 lg:grid-cols-2 lg:gap-24"><div><span className="font-space text-sm font-bold tracking-[0.18em] text-brand-accent">05</span><h2 className="mt-5 max-w-lg font-space text-5xl font-bold leading-[0.95] tracking-[-0.06em] md:text-6xl">Shape the future of robotics at AUI.</h2><div className="mt-10 space-y-5 text-brand-muted"><a href="mailto:robotics@aui.ma" className="flex items-center gap-3 transition hover:text-brand-text"><Mail size={19} className="text-brand-muted" />robotics@aui.ma</a><p className="flex items-start gap-3"><MapPin size={19} className="mt-0.5 shrink-0 text-brand-muted" />Al Akhawayn University, Ifrane, Morocco</p></div><div className="mt-10 flex gap-3"><a href="#contact" aria-label="AUI Robotics on GitHub" className="rounded-xl border border-brand-border p-3 text-brand-muted transition hover:border-brand-accent hover:text-brand-text"><Github size={19} /></a><a href="#contact" aria-label="AUI Robotics on Instagram" className="rounded-xl border border-brand-border p-3 text-brand-muted transition hover:border-brand-accent hover:text-brand-text"><Instagram size={19} /></a><a href="#contact" aria-label="AUI Robotics on LinkedIn" className="rounded-xl border border-brand-border p-3 text-brand-muted transition hover:border-brand-accent hover:text-brand-text"><Linkedin size={19} /></a></div></div><form onSubmit={submit} className="rounded-2xl border border-brand-border bg-brand-surface p-6 md:p-8"><div className="grid gap-5">{fields.map(([name, label, type]) => <label key={name} className="grid gap-2 font-space text-xs font-bold tracking-[0.1em] text-brand-text">{label}<input required type={type} name={name} value={form[name]} onChange={updateField} className="min-h-12 rounded-xl border border-brand-border bg-brand-bg px-4 font-inter text-sm font-normal tracking-normal text-brand-text placeholder:text-brand-muted focus:border-brand-accent" /></label>)}<label className="grid gap-2 font-space text-xs font-bold tracking-[0.1em] text-brand-text">WHY DO YOU WANT TO JOIN?<textarea required name="message" value={form.message} onChange={updateField} rows="5" className="resize-y rounded-xl border border-brand-border bg-brand-bg px-4 py-3 font-inter text-sm font-normal tracking-normal text-brand-text placeholder:text-brand-muted focus:border-brand-accent" /></label><Button type="submit" className="mt-2 w-full">SUBMIT INTEREST</Button></div></form></div><AnimatePresence>{submitted && <motion.div role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} className="fixed bottom-6 right-6 z-40 rounded-2xl border border-brand-accent bg-brand-surface px-5 py-4 text-sm text-brand-text shadow-2xl">Thanks! We&apos;ll reach out soon.</motion.div>}</AnimatePresence></section>;
}
