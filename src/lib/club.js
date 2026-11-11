export const clubEmail = 'auirobotics@aui.ma';
export const mailLink = (subject) => `mailto:${clubEmail}?subject=${encodeURIComponent(subject)}`;
export const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;
export const navigation = [
  ['about', 'The club'],
  ['projects', 'Projects'],
  ['team', 'The team'],
  ['sponsors', 'Partners'],
  ['contact', 'Join us'],
];
