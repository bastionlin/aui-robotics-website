import { useEffect, useState } from 'react';
import {
  Navbar, Hero, About, Mission, Projects, Team, Sponsors, Contact, Footer,
} from './components/sections';

const getInitialTheme = () => {
  try {
    return window.localStorage.getItem('aui-theme') === 'light' ? 'light' : 'dark';
  } catch {
    return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
  }
};

/**
 * Composes the AUI Robotics Club single-page experience.
 * Each content block is independently maintained in the sections directory.
 */
export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem('aui-theme', theme);
    } catch {
      // The selected theme still applies for this visit if storage is unavailable.
    }
  }, [theme]);

  return (
    <div className="min-h-screen overflow-x-clip bg-brand-bg text-brand-text">
      <Navbar theme={theme} onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} />
      <main>
        <Hero />
        <About />
        <Mission />
        <Projects />
        <Team />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
