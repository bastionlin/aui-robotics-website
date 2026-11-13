import { useEffect, useState } from 'react';
import { Navbar, Hero, About, Projects, Team, Sponsors, Contact, Footer, Blog, PostPage } from './components/sections';
import { posts, site } from './content';
import useMotionSystem from './hooks/useMotionSystem';

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const postSlug = hash.startsWith('#blog/') ? hash.slice(6) : null;
  const route = postSlug === null ? 'home' : `post:${postSlug}`;
  useMotionSystem(route);
  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => { window.removeEventListener('hashchange', sync); window.removeEventListener('popstate', sync); };
  }, []);
  useEffect(() => {
    document.title = postSlug === null ? `${site.name} | ${site.tagline}` : `${posts.find(post => post.slug === postSlug)?.title || 'Entry not found'} | ${site.name}`;
    const frame = requestAnimationFrame(() => {
      if (postSlug !== null) { window.scrollTo(0, 0); document.getElementById('main')?.focus({ preventScroll: true }); }
      else if (window.location.hash) document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [route]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar key={route} />
    <main id="main" tabIndex={-1}>
      {postSlug !== null ? <PostPage key={postSlug} slug={postSlug} /> : <><Hero />
      <About />
      <Projects />
      <Team />
      <Sponsors />
      <Blog />
      <Contact /></>}
    </main>
    <Footer />
  </>;
}
