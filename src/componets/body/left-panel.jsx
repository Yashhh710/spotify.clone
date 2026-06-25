import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import { HomeIcon, SearchIcon, LibraryIcon, HeartIcon, ClockIcon, MicrophoneIcon, DiscIcon, NoteIcon, GlobeIcon } from '../SvgIcons';
import './css/left-panel.css';

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    style={({ isActive }) => ({
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '10px 12px', borderRadius: 6, textDecoration: 'none',
      color: isActive ? '#fff' : '#b3b3b3',
      background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
      fontWeight: isActive ? 700 : 500,
      fontSize: 14, transition: 'all 0.15s'
    })}
    onMouseEnter={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.color = '#fff'; }}
    onMouseLeave={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.color = '#b3b3b3'; }}
  >
    <span style={{ width: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</span>
    {label}
  </NavLink>
);

const SidebarLibrary = () => {
  const { playlists, liked, recent, createPlaylist } = usePlayer();
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    if (newName.trim()) {
      createPlaylist(newName.trim());
      setNewName('');
      setCreating(false);
    }
  };

  const playlistNames = Object.keys(playlists);

  return (
    <div className="sidebar-container" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* Main nav */}
      <div style={{ padding: '8px 12px 16px' }}>
        <NavItem to="/" icon={<HomeIcon />} label="Home" />
        <NavItem to="/search" icon={<SearchIcon />} label="Search" />
      </div>

      <div style={{ borderTop: '1px solid #282828', margin: '0 12px' }} />

      {/* Library section */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px 4px' }}>
          <NavLink to="/library" style={{ color: '#b3b3b3', textDecoration: 'none', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, letterSpacing: 0.5 }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#b3b3b3'}
          >
            <LibraryIcon style={{ width: 16, height: 16 }} /> Your Library
          </NavLink>
          <button
            onClick={() => setCreating(v => !v)}
            title="Create playlist"
            style={{ background: 'transparent', border: 'none', color: '#b3b3b3', cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: 2, transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#b3b3b3'}
          >+</button>
        </div>

        {creating && (
          <div style={{ padding: '8px 12px' }}>
            <input
              autoFocus
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') { setCreating(false); setNewName(''); } }}
              placeholder="Playlist name…"
              style={{ width: '100%', background: '#3e3e3e', border: 'none', color: '#fff', padding: '8px 10px', borderRadius: 6, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        )}

        {/* Quick links */}
        <div style={{ padding: '4px 0' }}>
          <NavItem to="/liked" icon={<HeartIcon />} label={`Liked Songs (${liked.length})`} />
          <NavItem to="/recent" icon={<ClockIcon />} label="Recently Played" />
          <NavItem to="/artists" icon={<MicrophoneIcon />} label="Favorite Artists" />
          <NavItem to="/albums" icon={<DiscIcon />} label="Favorite Albums" />
        </div>

        {playlistNames.length > 0 && (
          <div style={{ padding: '4px 0', marginTop: 4 }}>
            <div style={{ color: '#b3b3b3', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, padding: '8px 14px 4px' }}>Playlists</div>
            {playlistNames.map(name => (
              <div key={name}
                onClick={() => navigate('/library')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px',
                  cursor: 'pointer', borderRadius: 6, transition: 'background 0.15s', color: '#b3b3b3', fontSize: 13
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#282828'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#b3b3b3'; }}
              >
                <div style={{ width: 32, height: 32, background: '#333', borderRadius: 4, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, overflow: 'hidden' }}>
                  {playlists[name]?.[0]?.cover
                    ? <img src={playlists[name][0].cover} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <NoteIcon style={{ width: 18, height: 18 }} />}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
                  <div style={{ fontSize: 11, color: '#b3b3b3' }}>Playlist · {(playlists[name] || []).length} songs</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {playlistNames.length === 0 && liked.length === 0 && (
          <div style={{ margin: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 14 }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Create your first playlist</div>
            <div style={{ color: '#b3b3b3', fontSize: 12, marginBottom: 10 }}>It's easy, we'll help you</div>
            <button onClick={() => setCreating(true)}
              style={{ background: '#fff', border: 'none', color: '#000', padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 12, transition: 'transform 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >Create playlist</button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="sidebar-footer" style={{ padding: '12px', borderTop: '1px solid #282828' }}>
        <div className="footer-links" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 10px', marginBottom: 8 }}>
          {['Legal', 'Privacy', 'Cookies', 'About Ads'].map(l => (
            <a key={l} href="#" style={{ color: '#b3b3b3', fontSize: 11, textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = '#b3b3b3'}
            >{l}</a>
          ))}
        </div>
        <button className="lang-button" style={{ background: 'transparent', border: '1px solid #535353', color: '#fff', padding: '5px 12px', borderRadius: 999, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <GlobeIcon style={{ width: 16, height: 16 }} /> English
        </button>
      </div>
    </div>
  );
};

export default SidebarLibrary;
