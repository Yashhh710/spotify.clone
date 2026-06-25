import React, { useRef } from 'react';
import { usePlayer } from '../../context/PlayerContext';

export default function ProgressBar({ height = 4, showThumb = true }) {
  const { position, duration, seek } = usePlayer();
  const barRef = useRef(null);
  const pct = duration ? Math.max(0, Math.min(1, position / duration)) * 100 : 0;

  const handleClick = (e) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const p = Math.max(0, Math.min(1, x / rect.width));
    seek(p * (duration || 0));
  };

  const handleMouseMove = (e) => {
    if (e.buttons !== 1) return;
    handleClick(e);
  };

  return (
    <div
      ref={barRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      className="progress-bar-track"
      style={{ height, background: 'rgba(255,255,255,0.1)', borderRadius: height, position: 'relative', cursor: 'pointer', width: '100%' }}
    >
      <div
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: pct + '%', background: '#1ed760', borderRadius: height,
          transition: 'width 0.1s linear'
        }}
      />
      {showThumb && (
        <div
          style={{
            position: 'absolute', top: '50%', left: pct + '%',
            transform: 'translate(-50%, -50%)',
            width: height * 3, height: height * 3,
            background: '#fff', borderRadius: '50%',
            opacity: 0, transition: 'opacity 0.15s',
            pointerEvents: 'none'
          }}
          className="progress-thumb"
        />
      )}
      <style>{`.progress-bar-track:hover .progress-thumb { opacity: 1; }`}</style>
    </div>
  );
}
