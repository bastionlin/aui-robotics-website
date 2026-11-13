import { loadContent } from './content-loader.mjs';
try {
  const content = loadContent();
  console.log(`Content valid: ${Object.keys(content.sections).length} sections, ${content.projects.length} projects, ${content.members.length} members, ${content.sponsors.length} partners, ${content.posts.length} published posts.`);
} catch (error) { console.error(error.message); process.exitCode = 1; }
