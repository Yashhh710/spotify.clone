const AUDIOUS_TRENDING_URL = 'https://api.audius.co/v1/tracks/trending';

export async function getTrendingTracks(limit = 24) {
  const res = await fetch(AUDIOUS_TRENDING_URL);
  if (!res.ok) throw new Error(`Audius network error ${res.status}`);
  const data = await res.json();
  if (!data || !Array.isArray(data.data)) return [];

  return data.data.slice(0, limit).map(track => {
    const cover = track.artwork?.['1000x1000'] || track.artwork?.['480x480'] || '';
    const artistName = track.user?.name || track.user?.handle || 'Unknown artist';
    const description = track.genre || artistName || '';

    return {
      id: String(track.id || track.track_id || `${track.title}-${track.user?.id || ''}`),
      title: track.title || 'Unknown title',
      artist: artistName,
      album: track.genre || track.description || '',
      cover,
      src: cover,
      desc: description,
      duration: track.duration || 0,
      preview: track.stream?.url || track.preview || null,
      source: 'Audius',
    };
  });
}

export default { getTrendingTracks };