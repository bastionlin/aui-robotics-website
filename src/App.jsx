import { Navbar, Hero, About, Projects, Team, Sponsors, Contact, Footer } from './components/sections';
import useMotionSystem from './hooks/useMotionSystem';

export default function App() {
  useMotionSystem();
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar />
    <main id="main" tabIndex={-1}>
      <Hero />
      <About />
      <Projects />
      <Team />
      <Sponsors />
      <Contact />
    </main>
    <Footer />
  </>;
}
