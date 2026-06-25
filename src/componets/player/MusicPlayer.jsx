import React, { useState, useEffect, useRef } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import ProgressBar from './ProgressBar';
import VolumeSlider from './VolumeSlider';
import { HeartIcon, HeartOutlineIcon } from '../SvgIcons';

const fmt = (s) => {
  if (!s && s !== 0) return '--:--';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
};

function extractColor(imgSrc) {
  // Return a default gradient based on src hash for dynamic background effect
  const colors = [
    ['#1a1a2e','#16213e'],['#0d0d0d','#1a0a2e'],['#0a1628','#0d2137'],
    ['#1a0a0a','#2e1a0a'],['#0a1a0a','#0d2e0d'],['#1a1a0a','#2e2a0a'],
    ['#1a0a1a','#2e0a2e'],['#0a1a1a','#0a2e2e'],
  ];
  let h = 0;
  for (let c of (imgSrc||'')) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return colors[h % colors.length];
}

export default function MusicPlayer() {
  const {
    current, isPlaying, togglePlay, position, duration,
    playNext, playPrev, toggleLike, liked, buffering,
    shuffle, toggleShuffle, repeat, cycleRepeat,
    setShowFullPlayer, setShowQueue, setShowLyrics,
    showQueue, showLyrics, addToQueue
  } = usePlayer();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const isLiked = current && liked.find(t => t.id === current.id);
  const [bgColors, setBgColors] = useState(['#121212', '#121212']);

  useEffect(() => {
    if (current?.cover) setBgColors(extractColor(current.cover));
  }, [current?.cover]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  if (!current) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 90,
        background: `linear-gradient(135deg, ${bgColors[0]} 0%, ${bgColors[1]} 60%, #000 100%)`,
        display: 'flex', flexDirection: 'column',
        animation: 'fadeIn 0.35s ease',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{transform:scale(1)}50%{transform:scale(1.04)} }
      `}</style>

      {/* Blurred bg art */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url(${current.cover})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(80px) saturate(1.4)', opacity: 0.18,
        transform: 'scale(1.2)'
      }} />

      {/* Header bar */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px' }}>
        <button onClick={() => setShowFullPlayer(false)}
          style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, opacity: 0.8 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          Now Playing
        </button>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{current.album || ''}</div>
        <button onClick={toggleFullscreen}
          style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            {isFullscreen
              ? <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
              : <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            }
          </svg>
        </button>
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px', gap: 60 }}>
        {/* Album art */}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            position: 'relative',
            animation: isPlaying ? 'pulse 3s ease-in-out infinite' : 'none'
          }}>
            <img
              src={current.cover}
              alt={current.title}
              style={{
                width: 'min(300px, 40vw)', height: 'min(300px, 40vw)',
                objectFit: 'cover', borderRadius: 12,
                boxShadow: isPlaying ? '0 24px 64px rgba(0,0,0,0.7), 0 0 40px rgba(30,215,96,0.15)' : '0 24px 64px rgba(0,0,0,0.7)'
              }}
            />
            {buffering && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', borderRadius: 12 }}>
                <div style={{ width: 40, height: 40, border: '3px solid #1ed760', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              </div>
            )}
          </div>
        </div>

        {/* Track info + controls */}
        <div style={{ flex: 1, maxWidth: 480, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Title & like */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: '#fff', fontSize: 28, fontWeight: 800, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 380 }}>
                {current.title}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginTop: 4 }}>{current.artist}</div>
            </div>
            <button
              onClick={() => toggleLike(current)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: isLiked ? '#1ed760' : 'rgba(255,255,255,0.5)', transition: 'color 0.2s, transform 0.15s', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              title="L = like"
            >{isLiked ? <HeartIcon style={{ width: 24, height: 24 }} /> : <HeartOutlineIcon style={{ width: 24, height: 24 }} />}</button>
          </div>

          {/* Progress */}
          <div>
            <ProgressBar height={5} showThumb={true} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{fmt(position)}</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{fmt(duration)}</span>
            </div>
          </div>

          {/* Playback controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={toggleShuffle} title="Shuffle"
              style={{ background: 'transparent', border: 'none', color: shuffle ? '#1ed760' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.2s' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>
            </button>
            <button onClick={playPrev} title="Previous"
              style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
            </button>
            <button onClick={togglePlay}
              style={{
                width: 64, height: 64, borderRadius: '50%', background: '#fff',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)', transition: 'transform 0.15s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {isPlaying
                ? <svg width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                : <svg width="24" height="24" viewBox="0 0 24 24" fill="black" style={{ marginLeft: 3 }}><path d="M8 5v14l11-7z"/></svg>
              }
            </button>
            <button onClick={playNext} title="Next"
              style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
            </button>
            <button onClick={cycleRepeat} title="Repeat"
              style={{ background: 'transparent', border: 'none', color: repeat !== 'none' ? '#1ed760' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.2s', position: 'relative' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                {repeat === 'one'
                  ? <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"/>
                  : <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
                }
              </svg>
            </button>
          </div>

          {/* Volume + extras */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <VolumeSlider width={120} />
            <div style={{ display: 'flex', gap: 16 }}>
              <button onClick={() => { setShowQueue(v => !v); setShowLyrics(false); }}
                title="Queue" style={{ background: 'transparent', border: 'none', color: showQueue ? '#1ed760' : 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
              </button>
              <button onClick={() => { setShowLyrics(v => !v); setShowQueue(false); }}
                title="Lyrics" style={{ background: 'transparent', border: 'none', color: showLyrics ? '#1ed760' : 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
              </button>
              <button onClick={() => addToQueue(current)}
                title="Add to queue" style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>
                + Queue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
