import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { HeartIcon, HeartOutlineIcon, PlayIcon, PauseIcon } from './SvgIcons';

export default function SongCard({ track, index }) {
  const { playTrack, current, isPlaying, togglePlay, toggleLike, liked, addToQueue } = usePlayer();
  const isActive = current && current.id === track.id;
  const isLiked = liked.find(t => t.id === track.id);

  const fmt = (s) => {
    if (!s) return '--:--';
    const m = Math.floor(s / 60); const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px',
        borderRadius: 6, cursor: 'pointer',
        background: isActive ? 'rgba(30,215,96,0.08)' : 'transparent',
        transition: 'background 0.15s'
      }}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#282828'; }}
      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
      onDoubleClick={() => isActive ? togglePlay() : playTrack(track)}
    >
      {index !== undefined && (
        <div style={{ width: 20, textAlign: 'center', color: isActive ? '#1ed760' : '#b3b3b3', fontSize: 13, flexShrink: 0 }}>
          {isActive && isPlaying
            ? <span style={{ display: 'inline-flex', gap: 2, alignItems: 'flex-end', height: 14 }}>
                <span style={{ width: 3, background: '#1ed760', borderRadius: 1, animation: 'eq1 0.8s ease infinite', height: '100%' }} />
                <span style={{ width: 3, background: '#1ed760', borderRadius: 1, animation: 'eq2 0.8s ease infinite', height: '60%' }} />
                <span style={{ width: 3, background: '#1ed760', borderRadius: 1, animation: 'eq3 0.8s ease infinite', height: '80%' }} />
              </span>
            : index + 1}
        </div>
      )}
      <img src={track.cover} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: isActive ? '#1ed760' : '#fff', fontSize: 14, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.title}</div>
        <div style={{ color: '#b3b3b3', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.artist}</div>
      </div>
      <div style={{ color: '#b3b3b3', fontSize: 12, minWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'none' }} className="album-col">{track.album}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={(e) => { e.stopPropagation(); addToQueue(track); }}
          title="Add to queue"
          style={{ background: 'transparent', border: 'none', color: '#b3b3b3', cursor: 'pointer', fontSize: 11, opacity: 0, transition: 'opacity 0.15s', padding: '2px 6px', borderRadius: 4, border: '1px solid #535353' }}
          className="song-card-btn"
        >+ Queue</button>
        <button
          onClick={(e) => { e.stopPropagation(); toggleLike(track); }}
          style={{ background: 'transparent', border: 'none', color: isLiked ? '#1ed760' : '#b3b3b3', cursor: 'pointer', fontSize: 14, opacity: isLiked ? 1 : 0, transition: 'opacity 0.15s' }}
          className="song-card-btn"
        >{isLiked ? <HeartIcon style={{ width: 16, height: 16 }} /> : <HeartOutlineIcon style={{ width: 16, height: 16 }} />}</button>
        <span style={{ color: '#b3b3b3', fontSize: 12, width: 36, textAlign: 'right' }}>{fmt(track.duration)}</span>
        <button
          onClick={(e) => { e.stopPropagation(); isActive ? togglePlay() : playTrack(track); }}
          style={{ background: 'transparent', border: 'none', color: isActive ? '#1ed760' : '#b3b3b3', cursor: 'pointer', opacity: isActive ? 1 : 0, transition: 'opacity 0.15s' }}
          className="song-card-btn"
        >
          {isActive && isPlaying ? <PauseIcon style={{ width: 16, height: 16 }} /> : <PlayIcon style={{ width: 16, height: 16 }} />}
        </button>
      </div>
      <style>{`
        div:hover .song-card-btn { opacity: 1 !important; }
        @keyframes eq1 { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(0.4)} }
        @keyframes eq2 { 0%,100%{transform:scaleY(0.6)} 50%{transform:scaleY(1)} }
        @keyframes eq3 { 0%,100%{transform:scaleY(0.8)} 50%{transform:scaleY(0.3)} }
      `}</style>
    </div>
  );
}
