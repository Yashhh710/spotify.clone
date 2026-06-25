// iTunes Search API wrapper
// Example: https://itunes.apple.com/search?term=ed+sheeran&entity=song

const ITUNES_BASE = 'https://itunes.apple.com/search';

export async function searchTracks(term, limit = 20) {
  if (!term) return [];
  const url = `${ITUNES_BASE}?term=${encodeURIComponent(term)}&entity=song&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`iTunes network error ${res.status}`);
  const data = await res.json();
  if (!data || !data.results) return [];
  return data.results.map(r => ({
    id: r.trackId,
    title: r.trackName,
    artist: r.artistName,
    album: r.collectionName,
    cover: r.artworkUrl100 ? r.artworkUrl100.replace(/100x100bb.jpg$/, '300x300bb.jpg') : '',
    duration: r.trackTimeMillis ? Math.round((r.trackTimeMillis || 0) / 1000) : 0,
    preview: r.previewUrl || ''
  }));
}

export default { searchTracks };
