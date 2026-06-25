import React from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { CloseIcon, NoteIcon } from '../SvgIcons';

export default function QueuePanel() {
  const { queue, current, removeFromQueue, clearQueue, playTrack, setShowQueue } = usePlayer();

  return (
    <div style={{
      position: 'fixed', right: 0, top: 0, bottom: 0, width: 320,
      background: '#121212', borderLeft: '1px solid #282828',
      zIndex: 80, display: 'flex', flexDirection: 'column',
      animation: 'slideInRight 0.25s ease'
    }}>
      <style>{`@keyframes slideInRight { from { transform: translateX(100%) } to { transform: translateX(0) } }`}</style>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 16px', borderBottom: '1px solid #282828' }}>
        <h3 style={{ color: '#fff', fontWeight: 700, margin: 0, fontSize: 16 }}>Queue</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          {queue.length > 0 && (
            <button onClick={clearQueue} style={{ background: 'transparent', border: '1px solid #535353', color: '#b3b3b3', padding: '4px 12px', borderRadius: 999, cursor: 'pointer', fontSize: 12 }}>
              Clear
            </button>
          )}
          <button onClick={() => setShowQueue(false)} style={{ background: 'transparent', border: 'none', color: '#b3b3b3', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28 }}><CloseIcon style={{ width: 18, height: 18 }} /></button>
        </div>
      </div>

      {current && (
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #282828' }}>
          <div style={{ color: '#b3b3b3', fontSize: 12, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Now Playing</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={current.cover} alt="" style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }} />
            <div>
              <div style={{ color: '#1ed760', fontSize: 14, fontWeight: 600 }}>{current.title}</div>
              <div style={{ color: '#b3b3b3', fontSize: 12 }}>{current.artist}</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {queue.length === 0 ? (
          <div style={{ padding: 24, color: '#b3b3b3', textAlign: 'center', fontSize: 14 }}>
            <div style={{ fontSize: 32, marginBottom: 8, color: '#b3b3b3' }}><NoteIcon style={{ width: 32, height: 32 }} /></div>
            Queue is empty
          </div>
        ) : (
          <>
            <div style={{ color: '#b3b3b3', fontSize: 12, fontWeight: 700, padding: '8px 16px', textTransform: 'uppercase', letterSpacing: 1 }}>Next Up</div>
            {queue.map((track, i) => (
              <div
                key={track.id + '-' + i}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px',
                  cursor: 'pointer', transition: 'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#282828'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                onClick={() => playTrack(track, { addToQueue: false })}
              >
                <img src={track.cover} alt="" style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.title}</div>
                  <div style={{ color: '#b3b3b3', fontSize: 12 }}>{track.artist}</div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeFromQueue(i); }}
                  style={{ background: 'transparent', border: 'none', color: '#b3b3b3', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                ><CloseIcon style={{ width: 16, height: 16 }} /></button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
