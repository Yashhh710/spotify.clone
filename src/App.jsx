import React from 'react';
import './App.css';
import Logo from './componets/header/logo.jsx';
import Searchbox from './componets/header/searchbox.jsx';
import RightHeader from './componets/header/rightheder.jsx';
import SidebarLibrary from './componets/body/left-panel.jsx';
import RightPanel from './componets/body/right-panel.jsx';
import MiniPlayer from './componets/player/MiniPlayer';
import MusicPlayer from './componets/player/MusicPlayer';
import QueuePanel from './componets/player/QueuePanel';
import LyricsPanel from './componets/player/LyricsPanel';
import { usePlayer } from './context/PlayerContext';

function App() {
  const { showFullPlayer, showQueue, showLyrics, current } = usePlayer();

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">

      {/* Header */}
      <div className="header flex items-center justify-between bg-black px-6 py-3" style={{ flexShrink: 0 }}>
        <div className="flex items-center gap-4 flex-1">
          <Logo />
          <Searchbox />
        </div>
        <RightHeader />
      </div>

      {/* Body */}
      <MainContent />

      {/* Mini player */}
      <MiniPlayer />

      {/* Full-screen player overlay */}
      {showFullPlayer && current && <MusicPlayer />}

      {/* Side panels */}
      {showQueue && <QueuePanel />}
      {showLyrics && <LyricsPanel />}
    </div>
  );
}

function MainContent() {
  const { current } = usePlayer();
  const bottomPad = current ? 90 : 0;
  return (
    <div className="flex flex-1 overflow-hidden p-2 gap-2" style={{ paddingBottom: bottomPad }}>
      <SidebarLibrary />
      <RightPanel />
    </div>
  );
}

export default App;
