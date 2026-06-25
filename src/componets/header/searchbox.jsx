import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import { SearchIcon, CloseIcon } from '../SvgIcons';

function SearchBox() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const { search, playTrack, loading, lastError } = usePlayer();
  const timer = useRef(null);
  const rootRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onDoc = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const doSearch = (v) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      if (!v) { setResults([]); setOpen(false); return; }
      const r = await search(v);
      setResults(r);
      setActive(0);
      setOpen(true);
    }, 250);
  };

  const onChange = (e) => {
    const v = e.target.value;
    setQ(v);
    doSearch(v);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (results[active]) playAndClose(results[active]);
      else { navigate('/search'); setOpen(false); }
    }
    if (e.key === 'Escape') setOpen(false);
  };

  const playAndClose = (item) => {
    playTrack(item);
    setOpen(false);
    setQ('');
    setResults([]);
  };

  const fmt = (s) => {
    if (!s) return '';
    const m = Math.floor(s / 60); const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <div className="search-box" style={{ position: 'relative' }} ref={rootRef}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 2a8 8 0 105.293 14.293l4.207 4.207 1.414-1.414-4.207-4.207A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
      </svg>
      <input
        type="text"
        placeholder="Search songs, artists, albums…"
        value={q}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={() => { if (results.length) setOpen(true); else navigate('/search'); }}
        style={{ outline: 'none' }}
      />
      {q && (
        <button onClick={() => { setQ(''); setResults([]); setOpen(false); }}
          style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#b3b3b3', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CloseIcon style={{ width: 16, height: 16 }} />
        </button>
      )}

      {open && (
        <div style={{ position: 'absolute', top: '48px', left: 0, right: 0, background: '#282828', zIndex: 60, maxHeight: '60vh', overflow: 'auto', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}>
          {loading && <div style={{ padding: '12px 16px', color: '#b3b3b3', fontSize: 13 }}>Searching…</div>}
          {lastError && <div style={{ padding: '12px 16px', color: '#ff6b6b', fontSize: 13 }}>Error: {lastError}</div>}
          {!loading && results.length === 0 && q && (
            <div style={{ padding: '12px 16px', color: '#b3b3b3', fontSize: 13 }}>No results for "{q}"</div>
          )}
          {results.map((r, i) => (
            <div key={r.id}
              onMouseEnter={() => setActive(i)}
              onClick={() => playAndClose(r)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', cursor: 'pointer',
                background: i === active ? 'rgba(255,255,255,0.08)' : 'transparent',
                borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.1s'
              }}
            >
              <img src={r.cover} alt="" style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</div>
                <div style={{ color: '#b3b3b3', fontSize: 12 }}>{r.artist} · {r.album}</div>
              </div>
              <span style={{ color: '#b3b3b3', fontSize: 12, flexShrink: 0 }}>{fmt(r.duration)}</span>
            </div>
          ))}
          {results.length > 0 && (
            <div onClick={() => { navigate('/search'); setOpen(false); }}
              style={{ padding: '10px 14px', color: '#b3b3b3', fontSize: 13, cursor: 'pointer', textAlign: 'center', borderTop: '1px solid #3e3e3e', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = '#b3b3b3'}
            >See all results for "{q}"</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
