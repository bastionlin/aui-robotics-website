// Logo files are local copies of official organization marks.
export const sponsors = [
  { name: 'BMCE', logo: 'bank-of-africa.png', href: 'https://www.bankofafrica.ma/' },
  { name: 'CIH Bank', logo: 'cih-bank.png', href: 'https://www.cihbank.ma/' },
  { name: 'HPS', logo: 'hps.png', optical: 0.82, href: 'https://www.hps-worldwide.com/' },
  { name: 'HPS Foundation', logo: 'hps-foundation.png', monochrome: true, optical: 0.82, descriptor: 'FOUNDATION', href: 'https://www.hps-worldwide.com/' },
  { name: 'SSE', logo: 'sse.png', optical: 1.3, href: 'https://aui.ma/school-of-science-and-engineering' },
  { name: 'SBA', logo: 'sba.png', optical: 1.3, href: 'https://aui.ma/school-of-business-administration' },
  { name: 'Menasteel', logo: 'menasteel.jpg' },
  { name: 'Lumières et technologies', logo: 'lumieres-et-technologie.png', href: 'https://www.lt.ma/' },
  { name: 'CITI Association', logo: 'citi-association.png', href: 'https://citiassociation.ma/' },
  { name: 'Neoncity', logo: 'neoncity.png', optical: 0.92, href: 'https://www.neoncity.ma/collections/night-lamps-2025-collection' },
];

// Every logo is sized to roughly the same visual area so wide wordmarks and
// stacked crests carry equal weight. `optical` nudges marks whose ink density
// makes them read heavier (>1 enlarges thin marks, <1 shrinks bold ones).
export const LOGO_AREA = 5200;
export const LOGO_MAX_WIDTH = 170;
export const LOGO_MAX_HEIGHT = 80;

export function logoSize(bounds, optical = 1) {
  const ratio = bounds[2] / bounds[3];
  let width = Math.min(LOGO_MAX_WIDTH, Math.sqrt(LOGO_AREA * ratio) * optical);
  if (width / ratio > LOGO_MAX_HEIGHT) width = LOGO_MAX_HEIGHT * ratio;
  return { width: Math.round(width), ratio };
}

// Visible artwork bounds followed by original image dimensions. SVG viewports
// remove baked-in whitespace without altering or stretching the source logos.
export const logoBounds = {
  'bank-of-africa.png': [126, 54, 1800, 339, 2048, 448],
  'cih-bank.png': [0, 0, 244, 70, 244, 70],
  'hps.png': [0, 0, 646, 168, 646, 168],
  'hps-foundation.png': [0, 0, 646, 168, 646, 168],
  'sse.png': [218, 229, 2925, 2057, 3508, 2480],
  'sba.png': [339, 254, 2863, 1910, 3508, 2480],
  'menasteel.jpg': [6, 73, 187, 54, 200, 200],
  'lumieres-et-technologie.png': [0, 3, 160, 41, 160, 47],
  'citi-association.png': [10, 0, 179, 38, 199, 40],
  'neoncity.png': [111, 52, 822, 413, 1047, 519],
};
