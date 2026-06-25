import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import './css/right-panel.css';
import spotifyData from '../../deta/img.json';
import RecommendationSection from '../RecommendationSection';

// Lazy-loaded pages
const SearchPage = lazy(() => import('../../pages/SearchPage'));
const LikedSongs = lazy(() => import('../../pages/LikedSongs'));
const RecentlyPlayed = lazy(() => import('../../pages/RecentlyPlayed'));
const YourLibrary = lazy(() => import('../../pages/YourLibrary'));
const FavoriteArtists = lazy(() => import('../../pages/FavoriteArtists'));
const FavoriteAlbums = lazy(() => import('../../pages/FavoriteAlbums'));

const Spinner = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
    <div style={{ width: 36, height: 36, border: '3px solid #1ed760', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const RightPanel = () => {
  return (
    <div className="right-panel-container">
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/liked" element={<LikedSongs />} />
          <Route path="/recent" element={<RecentlyPlayed />} />
          <Route path="/library" element={<YourLibrary />} />
          <Route path="/artists" element={<FavoriteArtists />} />
          <Route path="/albums" element={<FavoriteAlbums />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default RightPanel;

// ── Home page (preserved original design + recommendations) ──
function HomePage() {
  return (
    <div className="main-section">
      <SpotifySection title="Trending Songs" data={spotifyData.trending} />
      <SpotifySection title="Popular Artists" data={spotifyData.artists} isArtist={true} />
      <SpotifySection title="Popular Albums" data={spotifyData.albums} />
      <SpotifySection title="Popular Radio" data={spotifyData.radio} />
      <RecommendationSection />

      <footer className="footer-container">
        <div className="footer-bottom">
          <div style={{ display: 'flex', gap: '15px' }}>
            <span>Legal</span><span>Privacy Center</span><span>Privacy Policy</span>
            <span>Cookies</span><span>About Ads</span>
          </div>
          <span>© 2026 Spotify AB</span>
        </div>
      </footer>
    </div>
  );
}

const SpotifySection = ({ title, data, isArtist }) => (
  <div className="section-group">
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <span className="show-all">Show all</span>
    </div>
    <div className="spotify-grid">
      {data && data.map((item, idx) => (
        <div key={idx} className="spotify-card">
          <div className="image-container">
            <img src={item.src} className={`card-image ${isArtist ? 'artist-img' : ''}`} alt={item.name} loading="lazy" />
            <PlayButton item={item} />
          </div>
          <h4 className="card-title">{item.name}</h4>
          <p className="card-desc">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

function PlayButton({ item }) {
  const { search, playTrack, current, isPlaying, togglePlay, activeCard, addToQueue } = usePlayer();

  const onClick = async (e) => {
    e.preventDefault();
    try {
      const results = await search(item.name);
      if (results && results.length) playTrack(results[0], { addToQueue: true, sourceName: item.name });
      else alert('No matching preview found for "' + item.name + '"');
    } catch (err) { console.error(err); }
  };

  const isActive = activeCard && String(activeCard).toLowerCase() === String(item.name || '').toLowerCase();

  return (
    <>
      <button className="play-button" onClick={onClick} title={`Play ${item.name}`}>
        <div className="play-icon" />
      </button>
      {isActive && isPlaying && (
        <div className="big-play-overlay" onClick={(e) => { e.stopPropagation(); togglePlay(); }}>
          <div className="big-play-circle">
            <div className="big-play-icon" />
          </div>
        </div>
      )}
    </>
  );
}
