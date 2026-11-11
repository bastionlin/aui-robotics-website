import { ArrowUp } from 'lucide-react';
import Logo from '../ui/Logo';
import { navigation } from '../../lib/club';

export default function Footer() {
  return <footer className="site-footer tone-dark"><div className="section-inner"><div className="footer-top"><a className="brand-home" href="#top" aria-label="AUI Robotics Club home"><Logo inverse className="brand-lockup--footer" /></a><p>Build. Break. Repeat.</p><a className="back-to-top" href="#top">Back to top <ArrowUp size={17} /></a></div><div className="footer-bottom"><p>Al Akhawayn University / Ifrane, Morocco</p><nav aria-label="Footer navigation">{navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><p>&copy; {new Date().getFullYear()} AUI Robotics Club</p></div></div></footer>;
}
