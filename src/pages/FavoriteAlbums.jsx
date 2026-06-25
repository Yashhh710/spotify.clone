import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import spotifyData from '../deta/img.json';
import { DiscIcon, HeartIcon, HeartOutlineIcon } from '../componets/SvgIcons';

export default function FavoriteAlbums() {
  const { favoriteAlbums, toggleFavoriteAlbum, search, playTrack } = usePlayer();

  const handlePlay = async (album) => {
    const results = await search(album.name);
    if (results.length) playTrack(results[0]);
  };

  return (
    <div style={{ padding: 24, color: '#fff' }}>
      <div style={{ background: 'linear-gradient(135deg, #477d95, #1e3264)', borderRadius: 12, padding: '32px 24px', marginBottom: 24, display: 'flex', alignItems: 'flex-end', gap: 20 }}>
        <div style={{ width: 80, height: 80, background: 'rgba(255,255,255,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DiscIcon style={{ width: 36, height: 36 }} /></div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Collection</div>
          <h1 style={{ margin: '4px 0', fontSize: 32, fontWeight: 900 }}>Favorite Albums</h1>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{favoriteAlbums.length} albums saved</div>
        </div>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#b3b3b3' }}>All Albums</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16, marginBottom: 32 }}>
        {spotifyData.albums.map(album => {
          const isFav = favoriteAlbums.find(a => a.name === album.name);
          return (
            <div key={album.name} style={{ padding: 12, borderRadius: 10, cursor: 'pointer', transition: 'background 0.2s', position: 'relative' }}
              onMouseEnter={e => e.currentTarget.style.background = '#282828'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ position: 'relative', marginBottom: 10 }}>
                <img src={album.src} alt={album.name} onClick={() => handlePlay(album)} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 6 }} />
                <button onClick={() => toggleFavoriteAlbum(album)}
                  style={{
                    position: 'absolute', top: 6, right: 6, width: 28, height: 28,
                    borderRadius: '50%', background: isFav ? '#1ed760' : 'rgba(0,0,0,0.7)',
                    border: 'none', cursor: 'pointer', color: isFav ? '#000' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14
                  }}>
                  {isFav ? <HeartIcon style={{ width: 14, height: 14 }} /> : <HeartOutlineIcon style={{ width: 14, height: 14 }} />}
                </button>
              </div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{album.name}</div>
              <div style={{ color: '#b3b3b3', fontSize: 12 }}>{album.desc}</div>
            </div>
          );
        })}
      </div>

      {favoriteAlbums.length > 0 && (
        <>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Saved Albums</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16 }}>
            {favoriteAlbums.map(album => (
              <div key={album.name} style={{ padding: 12, borderRadius: 10, cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#282828'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                onClick={() => handlePlay(album)}
              >
                <img src={album.src} alt={album.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 6, marginBottom: 8 }} />
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{album.name}</div>
                <div style={{ color: '#b3b3b3', fontSize: 12 }}>{album.desc}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
