// Deezer API wrapper with multiple CORS proxy fallbacks and robust response handling
const API_BASE = 'https://api.deezer.com';
const PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://thingproxy.freeboard.io/fetch/',
];

async function fetchViaProxy(proxy, path) {
  const url = proxy + encodeURIComponent(API_BASE + path);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Network error ${res.status}`);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    // Received non-JSON (likely an HTML error page). Throw to allow fallback to next proxy.
    throw new Error('Non-JSON response from proxy');
  }
}

async function fetchDeezer(path) {
  let lastErr = null;
  for (const proxy of PROXIES) {
    try {
      const data = await fetchViaProxy(proxy, path);
      return data;
    } catch (err) {
      lastErr = err;
      // try next proxy
    }
  }
  throw lastErr || new Error('All proxies failed');
}

export async function searchTracks(query, limit = 12) {
  if (!query) return [];
  const data = await fetchDeezer(`/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  if (!data || !data.data) return [];
  return data.data.map(t => ({
    id: t.id,
    title: t.title,
    artist: t.artist && t.artist.name,
    album: t.album && t.album.title,
    cover: (t.album && (t.album.cover_medium || t.album.cover)) || '',
    duration: t.duration || 0,
    preview: t.preview || '' // 30s preview mp3 if available
  }));
}

export async function getTrack(id) {
  const t = await fetchDeezer(`/track/${id}`);
  return t;
}

export default { searchTracks, getTrack };
