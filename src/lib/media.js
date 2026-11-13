const youtubeHosts = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com', 'youtu.be', 'www.youtu.be']);

export function secureUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && !url.port ? url : null;
  } catch { return null; }
}

/** Only known player URLs become frames. Sharing links remain useful external links. */
export function resolveVideo(value) {
  if (/^\/uploads\/[a-zA-Z0-9/_-]+\.(mp4|webm)$/.test(value)) return { provider: 'Video', file: true, src: value, original: value };
  const url = secureUrl(value);
  if (!url) throw new Error('Video URLs must use HTTPS and an approved provider, or /uploads/*.mp4 or *.webm.');
  if (youtubeHosts.has(url.hostname)) {
    const parts = url.pathname.split('/').filter(Boolean);
    const id = url.hostname.endsWith('youtu.be') ? parts[0] : url.pathname === '/watch' ? url.searchParams.get('v') : ['embed', 'shorts', 'live'].includes(parts[0]) ? parts[1] : null;
    if (!/^[\w-]{11}$/.test(id || '')) throw new Error('Use a YouTube watch, share, shorts, live, or embed URL with a valid video ID.');
    const player = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
    const start = url.searchParams.get('start') || url.searchParams.get('t');
    if (start && /^\d{1,6}s?$/.test(start)) player.searchParams.set('start', start.replace(/s$/, ''));
    return { provider: 'YouTube', src: player.href, original: value };
  }
  if (url.hostname === 'onedrive.live.com') {
    if (url.pathname === '/embed' && url.searchParams.has('resid')) {
      url.searchParams.delete('autoplay');
      return { provider: 'OneDrive', src: url.href, original: value };
    }
    return { provider: 'OneDrive', original: value };
  }
  if (url.hostname === '1drv.ms') return { provider: 'OneDrive', original: value };
  if (url.hostname.endsWith('.sharepoint.com')) {
    if (url.pathname.endsWith('/_layouts/15/embed.aspx') && url.searchParams.has('UniqueId')) {
      url.searchParams.delete('autoplay');
      return { provider: 'Microsoft Stream', src: url.href, original: value };
    }
    return { provider: 'Microsoft Stream', original: value };
  }
  throw new Error('Unsupported video provider. Use YouTube, OneDrive, or SharePoint/Stream.');
}
