import React from 'react';
import { NoteIcon } from './SvgIcons';

export default function PlaylistCard({ name, tracks = [], onClick }) {
  const cover = tracks[0]?.cover;
  return (
    <div
      onClick={onClick}
      style={{
        padding: 12, borderRadius: 8, cursor: 'pointer',
        background: 'rgba(255,255,255,0.04)',
        transition: 'background 0.2s',
        display: 'flex', flexDirection: 'column', gap: 8
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#282828'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
    >
      <div style={{ width: '100%', aspectRatio: '1', borderRadius: 6, overflow: 'hidden', background: '#333', position: 'relative' }}>
        {cover
          ? <img src={cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b3b3b3' }}>
              <NoteIcon style={{ width: 36, height: 36 }} />
            </div>
          )
        }
      </div>
      <div>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
        <div style={{ color: '#b3b3b3', fontSize: 12 }}>{tracks.length} songs</div>
      </div>
    </div>
  );
}
