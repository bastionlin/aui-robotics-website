export { sponsors } from '../content';

// Preserve the optical sizing of the approved partner marks.
export const LOGO_AREA = 5200;
export const LOGO_MAX_WIDTH = 170;
export const LOGO_MAX_HEIGHT = 80;
export function logoSize(bounds, optical = 1) {
  const ratio = bounds[2] / bounds[3];
  let width = Math.min(LOGO_MAX_WIDTH, Math.sqrt(LOGO_AREA * ratio) * optical);
  if (width / ratio > LOGO_MAX_HEIGHT) width = LOGO_MAX_HEIGHT * ratio;
  return { width: Math.round(width), ratio };
}
