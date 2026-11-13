import { site } from '../content';
export const clubEmail = site.email;
export const mailLink = (subject) => `mailto:${clubEmail}?subject=${encodeURIComponent(subject)}`;
export const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;
export const navigation = site.navigation.map(({ id, label }) => [id, label]);
