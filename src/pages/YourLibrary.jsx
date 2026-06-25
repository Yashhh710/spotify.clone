import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import PlaylistCard from '../componets/PlaylistCard';
import SongCard from '../componets/SongCard';
import { NoteIcon, HeartOutlineIcon, ClockIcon } from '../componets/SvgIcons';

export default function YourLibrary() {
  const { playlists, createPlaylist, deletePlaylist, liked, recent } = usePlayer();
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [tab, setTab] = useState('playlists');

  const handleCreate = () => {
    if (newName.trim()) {
      createPlaylist(newName.trim());
      setNewName('');
      setCreating(false);
    }
  };

  const playlistNames = Object.keys(playlists);

  return (
    <div style={{ padding: 24, color: '#fff', minHeight: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>Your Library</h1>
        <button
          onClick={() => setCreating(v => !v)}
          style={{ background: 'transparent', border: '1px solid #535353', color: '#fff', padding: '8px 18px', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 600, transition: 'border-color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#535353'}
        >+ New Playlist</button>
      </div>

      {creating && (
        <div style={{ background: '#282828', borderRadius: 10, padding: 16, marginBottom: 20, display: 'flex', gap: 10 }}>
          <input
            autoFocus
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') { setCreating(false); setNewName(''); } }}
            placeholder="Playlist name…"
            style={{ flex: 1, background: '#3e3e3e', border: 'none', color: '#fff', padding: '10px 14px', borderRadius: 6, fontSize: 14, outline: 'none' }}
          />
          <button onClick={handleCreate} style={{ background: '#1ed760', border: 'none', color: '#000', padding: '10px 18px', borderRadius: 6, cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>Create</button>
          <button onClick={() => { setCreating(false); setNewName(''); }} style={{ background: 'transparent', border: '1px solid #535353', color: '#fff', padding: '10px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>Cancel</button>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['playlists', 'liked', 'recent'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              background: tab === t ? '#fff' : 'rgba(255,255,255,0.08)',
              color: tab === t ? '#000' : '#fff',
              border: 'none', padding: '6px 16px', borderRadius: 999,
              cursor: 'pointer', fontWeight: 600, fontSize: 13,
              textTransform: 'capitalize', transition: 'all 0.2s'
            }}>
            {t === 'liked' ? 'Liked Songs' : t === 'recent' ? 'Recent' : 'Playlists'}
          </button>
        ))}
      </div>

      {tab === 'playlists' && (
        activePlaylist ? (
          <div>
            <button onClick={() => setActivePlaylist(null)} style={{ background: 'transparent', border: 'none', color: '#b3b3b3', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, fontSize: 14 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
              Back
            </button>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>{activePlaylist}</h2>
              <button onClick={() => { deletePlaylist(activePlaylist); setActivePlaylist(null); }}
                style={{ background: 'transparent', border: '1px solid #e22134', color: '#e22134', padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                Delete Playlist
              </button>
            </div>
            {(playlists[activePlaylist] || []).length === 0 ? (
              <div style={{ color: '#b3b3b3', textAlign: 'center', padding: 32 }}>This playlist is empty. Add songs from the search or home page.</div>
            ) : (
              (playlists[activePlaylist] || []).map((track, i) => <SongCard key={track.id} track={track} index={i} />)
            )}
          </div>
        ) : (
          playlistNames.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#b3b3b3' }}>
              <div style={{ fontSize: 48, marginBottom: 12, color: '#b3b3b3' }}><NoteIcon style={{ width: 48, height: 48 }} /></div>
              <p>Create your first playlist using the button above.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16 }}>
              {playlistNames.map(name => (
                <PlaylistCard key={name} name={name} tracks={playlists[name] || []} onClick={() => setActivePlaylist(name)} />
              ))}
            </div>
          )
        )
      )}

      {tab === 'liked' && (
        liked.length === 0
          ? <div style={{ textAlign: 'center', padding: 40, color: '#b3b3b3' }}><div style={{ fontSize: 40, marginBottom: 10, color: '#b3b3b3' }}><HeartOutlineIcon style={{ width: 40, height: 40 }} /></div><p>Like songs to see them here.</p></div>
          : liked.map((track, i) => <SongCard key={track.id} track={track} index={i} />)
      )}

      {tab === 'recent' && (
        recent.length === 0
          ? <div style={{ textAlign: 'center', padding: 40, color: '#b3b3b3' }}><div style={{ fontSize: 40, marginBottom: 10, color: '#b3b3b3' }}><ClockIcon style={{ width: 40, height: 40 }} /></div><p>Your history will appear here.</p></div>
          : recent.map((track, i) => <SongCard key={track.id + i} track={track} index={i} />)
      )}
    </div>
  );
}
