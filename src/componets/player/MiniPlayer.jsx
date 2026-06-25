import React, { useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import ProgressBar from './ProgressBar';
import VolumeSlider from './VolumeSlider';
import { HeartIcon, HeartOutlineIcon, ShuffleIcon, PrevIcon, NextIcon, RepeatIcon, RepeatOneIcon, QueueIcon, LyricsIcon, ExpandIcon } from '../SvgIcons';

const fmt = (s) => {
  if (!s && s !== 0) return '--:--';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
};

export default function MiniPlayer() {
  const {
    current, isPlaying, togglePlay, position, duration,
    playNext, playPrev, toggleLike, liked, buffering,
    setShowFullPlayer, setShowQueue, setShowLyrics,
    shuffle, toggleShuffle, repeat, cycleRepeat, showQueue, showLyrics
  } = usePlayer();

  if (!current) return null;

  const isLiked = current && liked.find(t => t.id === current.id);

  return (
    <div style={{
      position: 'fixed', left: 0, right: 0, bottom: 0,
      height: 90, background: '#0b0b0b',
      borderTop: '1px solid #282828',
      display: 'flex', alignItems: 'center',
      padding: '0 16px', gap: 16, zIndex: 70,
      boxShadow: '0 -4px 20px rgba(0,0,0,0.5)'
    }}>
      {/* Track info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: '0 0 30%', minWidth: 0, cursor: 'pointer' }}
           onClick={() => setShowFullPlayer(true)}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <img src={current.cover} alt="cover"
            style={{
              width: 56, height: 56, objectFit: 'cover', borderRadius: 4,
              animation: isPlaying ? 'none' : 'none',
              boxShadow: isPlaying ? '0 0 12px rgba(30,215,96,0.3)' : 'none'
            }}
          />
          {buffering && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
              <div style={{ width: 16, height: 16, border: '2px solid #1ed760', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            </div>
          )}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{current.title}</div>
          <div style={{ color: '#b3b3b3', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{current.artist}</div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); toggleLike(current); }}
          title="L = like"
          style={{ background: 'transparent', border: 'none', color: isLiked ? '#1ed760' : '#b3b3b3', cursor: 'pointer', fontSize: 16, flexShrink: 0, transition: 'color 0.2s, transform 0.15s' }}
        >{isLiked ? <HeartIcon style={{ width: 16, height: 16 }} /> : <HeartOutlineIcon style={{ width: 16, height: 16 }} />}</button>
      </div>

      {/* Center controls */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, maxWidth: 520 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={toggleShuffle} title="Shuffle"
            style={{ background: 'transparent', border: 'none', color: shuffle ? '#1ed760' : '#b3b3b3', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShuffleIcon style={{ width: 18, height: 18 }} /></button>
          <button onClick={playPrev} title="Previous"
            style={{ background: 'transparent', border: 'none', color: '#b3b3b3', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PrevIcon style={{ width: 18, height: 18 }} /></button>
          <button onClick={togglePlay}
            style={{
              width: 36, height: 36, borderRadius: '50%', background: '#fff',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform 0.1s', fontSize: 14
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {isPlaying
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="black"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="black" style={{ marginLeft: 2 }}><path d="M8 5v14l11-7z"/></svg>
            }
          </button>
          <button onClick={playNext} title="Next"
            style={{ background: 'transparent', border: 'none', color: '#b3b3b3', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><NextIcon style={{ width: 18, height: 18 }} /></button>
          <button onClick={cycleRepeat} title="Repeat"
            style={{ background: 'transparent', border: 'none', color: repeat !== 'none' ? '#1ed760' : '#b3b3b3', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {repeat === 'one' ? <RepeatOneIcon style={{ width: 18, height: 18 }} /> : <RepeatIcon style={{ width: 18, height: 18 }} />}
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
          <span style={{ color: '#b3b3b3', fontSize: 11, width: 36, textAlign: 'right', flexShrink: 0 }}>{fmt(position)}</span>
          <ProgressBar height={4} showThumb={true} />
          <span style={{ color: '#b3b3b3', fontSize: 11, width: 36, flexShrink: 0 }}>{fmt(duration)}</span>
        </div>
      </div>

      {/* Right controls */}
      <div style={{ flex: '0 0 30%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
        <button onClick={() => { setShowLyrics(v => !v); if (!showLyrics && showQueue) setShowQueue(false); }}
          title="Lyrics" style={{ background: 'transparent', border: 'none', color: showLyrics ? '#1ed760' : '#b3b3b3', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
        </button>
        <button onClick={() => { setShowQueue(v => !v); if (!showQueue && showLyrics) setShowLyrics(false); }}
          title="Q = queue" style={{ background: 'transparent', border: 'none', color: showQueue ? '#1ed760' : '#b3b3b3', cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
        </button>
        <VolumeSlider width={80} />
        <button onClick={() => setShowFullPlayer(true)}
          title="Expand player" style={{ background: 'transparent', border: 'none', color: '#b3b3b3', cursor: 'pointer', fontSize: 14 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
        </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
