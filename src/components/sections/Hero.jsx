import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import ImageWithFallback from '../ui/ImageWithFallback';
import AnimatedContent from '../ui/AnimatedContent';

const words = ['We', 'Build', 'Robots', 'That', 'Think.'];

/**
 * Establishes the club's purpose with an animated, image-ready opening scene.
 * The hero gracefully falls back to the AUI red engineering grid without a photo.
 */
export default function Hero() {
  const reduceMotion = useReducedMotion();
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } } };
  const item = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } } };
  return (
    <section id="top" className="relative isolate flex min-h-[100dvh] items-center overflow-hidden bg-brand-bg pt-20">
      <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-70" />
      <ImageWithFallback path="hero.jpg" alt="AUI Robotics Club hero" loading="eager" className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-screen" />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgb(var(--color-bg) / 0.94) 0%, rgb(var(--color-bg) / 0.80) 44%, rgb(var(--color-bg) / 0.42) 100%)' }} />  
      <AnimatedContent className="relative mx-auto w-full max-w-7xl px-6 md:px-12">
        <motion.div variants={container} initial={reduceMotion ? false : 'hidden'} animate="show">
        <motion.p variants={item} className="font-space text-xs font-bold tracking-[0.18em] text-brand-muted">AUI / IFRANE / MOROCCO</motion.p>
        <h1 className="mt-6 max-w-4xl font-space text-5xl font-bold leading-[0.95] tracking-[-0.07em] text-brand-text sm:text-7xl lg:text-8xl">
          {words.map((word, index) => <motion.span variants={item} key={word} className="mr-[0.22em] inline-block">{word}{index === 2 && <br />}</motion.span>)}
        </h1>
        <motion.p variants={item} className="mt-7 max-w-xl text-base leading-relaxed text-brand-muted md:text-lg">AUI&apos;s student robotics club. We develop autonomous systems, drone navigation, computer vision, and embedded technology.</motion.p>
        <motion.div variants={item} className="mt-9 flex flex-wrap gap-3"><Button href="#projects">EXPLORE OUR WORK <ArrowRight size={16} /></Button><Button href="#contact" variant="ghost">JOIN THE CLUB</Button></motion.div>
        </motion.div>
      </AnimatedContent>
      <a href="#about" aria-label="Go to About section" className="down-arrow absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-muted"><ArrowDown size={22} strokeWidth={1.5} /></a>
    </section>
  );
}
