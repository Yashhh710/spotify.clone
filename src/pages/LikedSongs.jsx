import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import SongCard from '../componets/SongCard';
import { HeartIcon, HeartOutlineIcon, PlayIcon } from '../componets/SvgIcons';

export default function LikedSongs() {
  const { liked, playTrack, toggleLike } = usePlayer();

  return (
    <div style={{ padding: 24, color: '#fff', minHeight: '100%' }}>
      {/* Header gradient */}
      <div style={{
        background: 'linear-gradient(135deg, #450af5, #8e8ee5)',
        borderRadius: 12, padding: '32px 24px', marginBottom: 24, display: 'flex', alignItems: 'flex-end', gap: 20
      }}>
        <div style={{ width: 80, height: 80, background: 'rgba(255,255,255,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><HeartIcon style={{ width: 36, height: 36 }} /></div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Playlist</div>
          <h1 style={{ margin: '4px 0', fontSize: 32, fontWeight: 900 }}>Liked Songs</h1>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{liked.length} songs</div>
        </div>
      </div>

      {liked.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#b3b3b3' }}>
          <div style={{ fontSize: 48, marginBottom: 12, color: '#b3b3b3' }}><HeartOutlineIcon style={{ width: 48, height: 48 }} /></div>
          <p>Songs you like will appear here.</p>
          <p style={{ fontSize: 13 }}>Save songs by pressing the heart icon.</p>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <button
              onClick={() => liked.length && playTrack(liked[0])}
              style={{
                width: 52, height: 52, borderRadius: '50%', background: '#1ed760',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.15s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <div style={{ borderBottom: '1px solid #282828', marginBottom: 8 }} />
          {liked.map((track, i) => <SongCard key={track.id} track={track} index={i} />)}
        </div>
      )}
    </div>
  );
}
