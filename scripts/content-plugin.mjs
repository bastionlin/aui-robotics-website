import path from 'node:path';
import { loadContent } from './content-loader.mjs';

export default function contentPlugin() {
  const id = 'virtual:club-content';
  const resolved = '\0' + id;
  let root;
  return {
    name: 'club-markdown-content',
    configResolved(config) { root = config.root; },
    buildStart() { loadContent(root); },
    resolveId(source) { if (source === id) return resolved; },
    load(source) { if (source === resolved) return `export default ${JSON.stringify(loadContent(root))};`; },
    configureServer(server) {
      const contentDir = path.join(root, 'content') + path.sep;
      const uploadsDir = path.join(root, 'public/uploads') + path.sep;
      server.watcher.add([contentDir, uploadsDir]);
      const reload = file => {
        if (!file.startsWith(contentDir) && !file.startsWith(uploadsDir)) return;
        const module = server.moduleGraph.getModuleById(resolved);
        if (module) server.moduleGraph.invalidateModule(module);
        // Add, change and unlink all rebuild the content index, including new files.
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', reload).on('change', reload).on('unlink', reload);
      server.httpServer?.once('close', () => { for (const event of ['add', 'change', 'unlink']) server.watcher.off(event, reload); });
    },
  };
}
