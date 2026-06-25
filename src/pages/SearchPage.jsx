import React, { useState, useEffect, useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';
import SongCard from '../componets/SongCard';
import { FireIcon, SearchIcon, CloseIcon, MicrophoneIcon, NoteIcon, DiscIcon, ClockIcon, PlaylistIcon, HeartIcon, GlobeIcon } from '../componets/SvgIcons';

const TRENDING = ['Shubh', 'MC Stan', 'Yo Yo Honey Singh', 'Sidhu Moose Wala', 'Jagdish Patil', 'Preet Bandre', 'AP Dhillon', 'Diljit Dosanjh', 'Arijit Singh', 'Shreya Ghoshal'];

const CATEGORIES = [
  { name: 'Hip-Hop', color: '#ba5d07', icon: <MicrophoneIcon style={{ width: 28, height: 28 }} /> },
  { name: 'Pop', color: '#1e3264', icon: <NoteIcon style={{ width: 28, height: 28 }} /> },
  { name: 'Indie', color: '#477d95', icon: <PlaylistIcon style={{ width: 28, height: 28 }} /> },
  { name: 'Classical', color: '#503750', icon: <PlaylistIcon style={{ width: 28, height: 28 }} /> },
  { name: 'Electronic', color: '#148a08', icon: <PlaylistIcon style={{ width: 28, height: 28 }} /> },
  { name: 'Devotional', color: '#8d67ab', icon: <HeartIcon style={{ width: 28, height: 28 }} /> },
  { name: 'Punjabi', color: '#e8115b', icon: <NoteIcon style={{ width: 28, height: 28 }} /> },
  { name: 'Marathi', color: '#e91429', icon: <NoteIcon style={{ width: 28, height: 28 }} /> },
  { name: 'Bollywood', color: '#1e3264', icon: <PlaylistIcon style={{ width: 28, height: 28 }} /> },
  { name: 'Lo-fi', color: '#56707f', icon: <SearchIcon style={{ width: 28, height: 28 }} /> },
];

export default function SearchPage() {
  const { search, playTrack, recentSearches, clearRecentSearches, loading } = usePlayer();
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!q.trim()) { setSuggestions([]); setResults([]); setSearched(false); return; }
    // Show live suggestions filtered from trending
    setSuggestions(TRENDING.filter(t => t.toLowerCase().includes(q.toLowerCase())).slice(0, 5));
    debounceRef.current = setTimeout(async () => {
      const r = await search(q, true);
      setResults(r);
      setSearched(true);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [q]);

  const doSearch = async (term) => {
    setQ(term);
    inputRef.current?.focus();
  };

  return (
    <div style={{ padding: 24, color: '#fff', minHeight: '100%' }}>
      {/* Search bar */}
      <div style={{ position: 'relative', maxWidth: 500, marginBottom: 28 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#b3b3b3"
          style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <path d="M10 2a8 8 0 105.293 14.293l4.207 4.207 1.414-1.414-4.207-4.207A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/>
        </svg>
        <input
          ref={inputRef}
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => e.key === 'Escape' && setQ('')}
          placeholder="What do you want to listen to?"
          style={{
            width: '100%', background: '#242424', color: '#fff', border: '2px solid transparent',
            borderRadius: 999, padding: '13px 40px 13px 44px', fontSize: 15, outline: 'none',
            transition: 'border-color 0.2s', boxSizing: 'border-box'
          }}
          onFocus={e => e.target.style.borderColor = '#fff'}
          onBlur={e => e.target.style.borderColor = 'transparent'}
        />
        {q && (
          <button onClick={() => setQ('')}
            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#b3b3b3', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CloseIcon style={{ width: 18, height: 18 }} />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <div style={{ background: '#282828', borderRadius: 8, marginBottom: 24, overflow: 'hidden' }}>
          {suggestions.map(s => (
            <div key={s} onClick={() => doSearch(s)}
              style={{ padding: '12px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#3e3e3e'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#b3b3b3"><path d="M10 2a8 8 0 105.293 14.293l4.207 4.207 1.414-1.414-4.207-4.207A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/></svg>
              <span style={{ color: '#fff', fontSize: 14 }}>{s}</span>
            </div>
          ))}
        </div>
      )}

      {/* No query: show recent + trending + categories */}
      {!q && (
        <>
          {recentSearches.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Recent Searches</h2>
                <button onClick={clearRecentSearches} style={{ background: 'transparent', border: 'none', color: '#b3b3b3', cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}>Clear all</button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {recentSearches.map(s => (
                  <button key={s} onClick={() => doSearch(s)}
                    style={{ background: '#282828', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: 999, cursor: 'pointer', fontSize: 13, transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#3e3e3e'}
                    onMouseLeave={e => e.currentTarget.style.background = '#282828'}
                  >{s}</button>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: 28 }}>
            <h2 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>Trending</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {TRENDING.map(t => (
                <button key={t} onClick={() => doSearch(t)}
                  style={{ background: 'rgba(255,255,255,0.07)', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: 999, cursor: 'pointer', fontSize: 13, transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#282828'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                ><FireIcon style={{ width: 16, height: 16, marginRight: 6 }} />{t}</button>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ margin: '0 0 14px', fontSize: 20, fontWeight: 700 }}>Browse Categories</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
              {CATEGORIES.map(cat => (
                <div key={cat.name} onClick={() => doSearch(cat.name)}
                  style={{ background: cat.color, borderRadius: 10, padding: '20px 16px', cursor: 'pointer', position: 'relative', overflow: 'hidden', minHeight: 90, transition: 'filter 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.15)'}
                  onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
                >
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>{cat.name}</div>
                  <div style={{ position: 'absolute', right: 8, bottom: 8, fontSize: 32 }}>{cat.icon}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Results */}
      {searched && (
        <div>
          {loading ? (
            <div style={{ color: '#b3b3b3', padding: 20 }}>Searching…</div>
          ) : results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#b3b3b3' }}>
              <div style={{ fontSize: 40, marginBottom: 10, color: '#b3b3b3' }}><SearchIcon style={{ width: 40, height: 40 }} /></div>
              <p>No results found for "<strong style={{ color: '#fff' }}>{q}</strong>"</p>
            </div>
          ) : (
            <>
              <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700 }}>Results for "{q}"</h2>
              <div style={{ marginBottom: 8, borderBottom: '1px solid #282828', paddingBottom: 8 }} />
              {results.map((track, i) => <SongCard key={track.id} track={track} index={i} />)}
            </>
          )}
        </div>
      )}
    </div>
  );
}
