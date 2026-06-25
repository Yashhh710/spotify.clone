import React, { useEffect, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';

export default function RecommendationSection() {
  const { current, search, playTrack, recent } = usePlayer();
  const [recs, setRecs] = useState([]);
  const [label, setLabel] = useState('Recommended');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const source = current || recent[0];
    if (!source) return;
    setLoading(true);
    const q = source.artist || source.title;
    setLabel(`Because you listened to ${source.title}`);
    search(q).then(r => {
      setRecs(r.filter(t => t.id !== source.id).slice(0, 6));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [current?.id]);

  if (!recs.length && !loading) return null;

  return (
    <div style={{ marginTop: 32 }}>
      <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{label}</h2>
      {loading ? (
        <div style={{ color: '#b3b3b3' }}>Loading recommendations…</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16 }}>
          {recs.map(track => (
            <div key={track.id}
              onClick={() => playTrack(track)}
              style={{ cursor: 'pointer', borderRadius: 8, padding: 8, background: 'rgba(255,255,255,0.04)', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#282828'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
            >
              <img src={track.cover} alt="" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 6 }} />
              <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginTop: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.title}</div>
              <div style={{ color: '#b3b3b3', fontSize: 12 }}>{track.artist}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
