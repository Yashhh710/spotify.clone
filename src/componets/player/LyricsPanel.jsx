import React, { useState, useEffect } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { CloseIcon } from '../SvgIcons';

// Placeholder lyrics generator based on track info
const generateLyrics = (track) => {
  if (!track) return [];
  return [
    { time: 0, text: `${track.title}` },
    { time: 5, text: '' },
    { time: 8, text: `by ${track.artist}` },
    { time: 12, text: '' },
    { time: 15, text: 'Full lyrics are not available' },
    { time: 18, text: 'for preview tracks.' },
    { time: 22, text: '' },
    { time: 25, text: 'Connect to a lyrics API' },
    { time: 28, text: 'for real-time lyrics.' },
  ];
};

export default function LyricsPanel() {
  const { current, position, setShowLyrics } = usePlayer();
  const [lyrics, setLyrics] = useState([]);
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    setLyrics(generateLyrics(current));
    setActiveLine(0);
  }, [current]);

  useEffect(() => {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (position >= lyrics[i].time) { setActiveLine(i); break; }
    }
  }, [position, lyrics]);

  return (
    <div style={{
      position: 'fixed', right: 0, top: 0, bottom: 0, width: 320,
      background: '#121212', borderLeft: '1px solid #282828',
      zIndex: 80, display: 'flex', flexDirection: 'column',
      animation: 'slideInRight 0.25s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 16px', borderBottom: '1px solid #282828' }}>
        <h3 style={{ color: '#fff', fontWeight: 700, margin: 0, fontSize: 16 }}>Lyrics</h3>
        <button onClick={() => setShowLyrics(false)} style={{ background: 'transparent', border: 'none', color: '#b3b3b3', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28 }}><CloseIcon style={{ width: 18, height: 18 }} /></button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', justifyContent: 'center' }}>
        {!current ? (
          <div style={{ color: '#b3b3b3', textAlign: 'center' }}>Play a song to see lyrics</div>
        ) : (
          lyrics.map((line, i) => (
            <p key={i} style={{
              color: i === activeLine ? '#fff' : 'rgba(255,255,255,0.3)',
              fontSize: i === activeLine ? 20 : 16,
              fontWeight: i === activeLine ? 700 : 400,
              textAlign: 'center',
              margin: 0,
              transition: 'all 0.3s ease',
              lineHeight: 1.5,
              minHeight: line.text ? 'auto' : 12
            }}>{line.text}</p>
          ))
        )}
      </div>
    </div>
  );
}
