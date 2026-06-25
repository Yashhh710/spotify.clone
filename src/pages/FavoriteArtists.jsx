import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import spotifyData from '../deta/img.json';
import { MicrophoneIcon, HeartIcon, HeartOutlineIcon } from '../componets/SvgIcons';

export default function FavoriteArtists() {
  const { favoriteArtists, toggleFavoriteArtist, search, playTrack } = usePlayer();

  const handlePlay = async (artist) => {
    const results = await search(artist.name);
    if (results.length) playTrack(results[0]);
  };

  return (
    <div style={{ padding: 24, color: '#fff' }}>
      <div style={{ background: 'linear-gradient(135deg, #e8115b, #ba0e4a)', borderRadius: 12, padding: '32px 24px', marginBottom: 24, display: 'flex', alignItems: 'flex-end', gap: 20 }}>
        <div style={{ width: 80, height: 80, background: 'rgba(255,255,255,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MicrophoneIcon style={{ width: 36, height: 36 }} /></div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Collection</div>
          <h1 style={{ margin: '4px 0', fontSize: 32, fontWeight: 900 }}>Favorite Artists</h1>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{favoriteArtists.length} artists</div>
        </div>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#b3b3b3' }}>All Artists</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16, marginBottom: 32 }}>
        {spotifyData.artists.map(artist => {
          const isFav = favoriteArtists.find(a => a.name === artist.name);
          return (
            <div key={artist.name} style={{ textAlign: 'center', cursor: 'pointer', padding: 12, borderRadius: 10, transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#282828'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ position: 'relative', marginBottom: 10 }}>
                <img src={artist.src} alt={artist.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '50%' }} />
                <button onClick={() => toggleFavoriteArtist(artist)}
                  style={{
                    position: 'absolute', top: 4, right: 4, width: 28, height: 28,
                    borderRadius: '50%', background: isFav ? '#1ed760' : 'rgba(0,0,0,0.6)',
                    border: 'none', cursor: 'pointer', color: isFav ? '#000' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14
                  }}>
                  {isFav ? <HeartIcon style={{ width: 14, height: 14 }} /> : <HeartOutlineIcon style={{ width: 14, height: 14 }} />}
                </button>
              </div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }} onClick={() => handlePlay(artist)}>{artist.name}</div>
              <div style={{ color: '#b3b3b3', fontSize: 12 }}>Artist</div>
            </div>
          );
        })}
      </div>

      {favoriteArtists.length > 0 && (
        <>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Your Favorites</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16 }}>
            {favoriteArtists.map(artist => (
              <div key={artist.name} style={{ textAlign: 'center', cursor: 'pointer', padding: 12, borderRadius: 10, transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#282828'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                onClick={() => handlePlay(artist)}
              >
                <img src={artist.src} alt={artist.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '50%', marginBottom: 8 }} />
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{artist.name}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
