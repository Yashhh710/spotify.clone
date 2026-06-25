import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import itunes from '../services/itunes';
import audius from '../services/audius';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(null);
  const [queue, setQueue] = useState([]);
  const [history, setHistory] = useState([]);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('none'); // 'none' | 'all' | 'one'
  const [liked, setLiked] = useState(() => JSON.parse(localStorage.getItem('liked') || '[]'));
  const [playlists, setPlaylists] = useState(() => JSON.parse(localStorage.getItem('playlists') || '{}'));
  const [recent, setRecent] = useState(() => JSON.parse(localStorage.getItem('recent') || '[]'));
  const [favoriteArtists, setFavoriteArtists] = useState(() => JSON.parse(localStorage.getItem('favoriteArtists') || '[]'));
  const [favoriteAlbums, setFavoriteAlbums] = useState(() => JSON.parse(localStorage.getItem('favoriteAlbums') || '[]'));
  const [lastError, setLastError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [trendingTracks, setTrendingTracks] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => JSON.parse(localStorage.getItem('recentSearches') || '[]'));

  // Persist to localStorage
  useEffect(() => localStorage.setItem('liked', JSON.stringify(liked)), [liked]);
  useEffect(() => localStorage.setItem('playlists', JSON.stringify(playlists)), [playlists]);
  useEffect(() => localStorage.setItem('recent', JSON.stringify(recent.slice(0, 50))), [recent]);
  useEffect(() => localStorage.setItem('favoriteArtists', JSON.stringify(favoriteArtists)), [favoriteArtists]);
  useEffect(() => localStorage.setItem('favoriteAlbums', JSON.stringify(favoriteAlbums)), [favoriteAlbums]);
  useEffect(() => localStorage.setItem('recentSearches', JSON.stringify(recentSearches.slice(0, 10))), [recentSearches]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    const onTime = () => setPosition(audio.currentTime);
    const onDuration = () => setDuration(audio.duration || 0);
    const onEnded = () => playNext();
    const onWaiting = () => setBuffering(true);
    const onCanPlay = () => setBuffering(false);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onDuration);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('canplay', onCanPlay);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onDuration);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('canplay', onCanPlay);
    };
  }, []);

  useEffect(() => {
    audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  const playTrack = useCallback((track, opts = { addToQueue: true }) => {
    if (!track) { setLastError('No track provided'); return; }
    if (!track.preview) { setLastError('Track has no preview URL'); return; }
    setLastError(null);
    setLoading(true);
    const audio = audioRef.current;
    // Save current to history
    if (current) setHistory(h => [current, ...h.slice(0, 49)]);
    audio.src = track.preview;
    audio.play()
      .then(() => setIsPlaying(true))
      .catch((err) => { setIsPlaying(false); setLastError(err?.message || String(err)); })
      .finally(() => setLoading(false));
    setCurrent(track);
    setDuration(track.duration || 0);
    if (opts.addToQueue) setQueue(q => [track, ...q]);
    setRecent(r => [track, ...r.filter(x => x.id !== track.id)]);
    if (opts.sourceName) setActiveCard(opts.sourceName);
    else setActiveCard(track.id || null);
  }, [current]);

  const playNext = useCallback(() => {
    const audio = audioRef.current;
    if (repeat === 'one') {
      audio.currentTime = 0;
      audio.play().then(() => setIsPlaying(true));
      return;
    }
    if (queue.length > 1) {
      const nextIdx = shuffle ? Math.floor(Math.random() * queue.length) : 1;
      const next = queue[nextIdx];
      const newQueue = queue.filter((_, i) => i !== nextIdx);
      setQueue(newQueue);
      playTrack(next, { addToQueue: false });
    } else if (repeat === 'all' && history.length) {
      playTrack(history[history.length - 1], { addToQueue: false });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [queue, history, repeat, shuffle, playTrack]);

  const playPrev = useCallback(() => {
    const audio = audioRef.current;
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    if (history.length > 0) {
      const [prev, ...rest] = history;
      setHistory(rest);
      playTrack(prev, { addToQueue: false });
    }
  }, [history, playTrack]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (audio.paused) audio.play().then(() => setIsPlaying(true));
    else { audio.pause(); setIsPlaying(false); }
  }, []);

  const seek = (time) => { audioRef.current.currentTime = time; };

  const setVol = (v) => { setVolume(v); if (v > 0) setMuted(false); };

  const toggleMute = () => setMuted(m => !m);

  const toggleLike = (track) => {
    setLiked(l => {
      const exists = l.find(t => t.id === track.id);
      if (exists) return l.filter(t => t.id !== track.id);
      return [track, ...l];
    });
  };

  const toggleFavoriteArtist = (artist) => {
    setFavoriteArtists(arr => {
      const exists = arr.find(a => a.name === artist.name);
      if (exists) return arr.filter(a => a.name !== artist.name);
      return [artist, ...arr];
    });
  };

  const toggleFavoriteAlbum = (album) => {
    setFavoriteAlbums(arr => {
      const exists = arr.find(a => a.name === album.name);
      if (exists) return arr.filter(a => a.name !== album.name);
      return [album, ...arr];
    });
  };

  const addToPlaylist = (name, track) => {
    setPlaylists(p => ({ ...p, [name]: [...(p[name] || []).filter(t => t.id !== track.id), track] }));
  };

  const removeFromPlaylist = (name, trackId) => {
    setPlaylists(p => ({ ...p, [name]: (p[name] || []).filter(t => t.id !== trackId) }));
  };

  const createPlaylist = (name) => {
    if (!name) return;
    setPlaylists(p => ({ ...p, [name]: p[name] || [] }));
  };

  const deletePlaylist = (name) => {
    setPlaylists(p => { const n = { ...p }; delete n[name]; return n; });
  };

  const addToQueue = (track) => {
    setQueue(q => [...q, track]);
  };

  const removeFromQueue = (idx) => {
    setQueue(q => q.filter((_, i) => i !== idx));
  };

  const clearQueue = () => setQueue([]);

  const toggleShuffle = () => setShuffle(s => !s);
  const cycleRepeat = () => setRepeat(r => r === 'none' ? 'all' : r === 'all' ? 'one' : 'none');

  const search = async (q, saveToRecent = false) => {
    setLastError(null);
    setLoading(true);
    try {
      const results = await itunes.searchTracks(q, 24);
      if (saveToRecent && q.trim()) {
        setRecentSearches(r => [q.trim(), ...r.filter(x => x !== q.trim())]);
      }
      return results;
    } catch (e) {
      console.error('Search error', e);
      setLastError(e?.message || String(e));
      return [];
    } finally {
      setLoading(false);
    }
  };

  const loadTrendingTracks = useCallback(async () => {
    setLastError(null);
    setLoading(true);
    try {
      const results = await audius.getTrendingTracks(24);
      setTrendingTracks(results);
      return results;
    } catch (e) {
      console.error('Audius trending error', e);
      setLastError(e?.message || String(e));
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const clearRecentSearches = () => setRecentSearches([]);

  useEffect(() => {
    loadTrendingTracks();
  }, [loadTrendingTracks]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
      if (e.key === 'ArrowRight') seek(Math.min((audioRef.current.currentTime || 0) + 5, audioRef.current.duration || 0));
      if (e.key === 'ArrowLeft') seek(Math.max((audioRef.current.currentTime || 0) - 5, 0));
      if (e.key === 'm' || e.key === 'M') toggleMute();
      if (e.key === 'l' || e.key === 'L') { if (current) toggleLike(current); }
      if (e.key === 'q' || e.key === 'Q') setShowQueue(v => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePlay, current]);

  const value = {
    audioRef, isPlaying, current, queue, history, position, duration,
    volume, muted, shuffle, repeat, liked, playlists, recent,
    favoriteArtists, favoriteAlbums, lastError, loading, buffering,
    activeCard, showFullPlayer, showQueue, showLyrics, recentSearches,
    playTrack, playNext, playPrev, togglePlay, seek, setVol, toggleMute,
    toggleLike, toggleFavoriteArtist, toggleFavoriteAlbum,
    addToPlaylist, removeFromPlaylist, createPlaylist, deletePlaylist,
    addToQueue, removeFromQueue, clearQueue,
    toggleShuffle, cycleRepeat, search, loadTrendingTracks, trendingTracks, clearRecentSearches,
    setShowFullPlayer, setShowQueue, setShowLyrics,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export const usePlayer = () => useContext(PlayerContext);
export default PlayerContext;
