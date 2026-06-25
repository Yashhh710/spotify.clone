import React from 'react';

const SvgIcon = ({ width = 20, height = 20, children, style, ...props }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" style={style} {...props}>
    {children}
  </svg>
);

export const HomeIcon = (props) => (
  <SvgIcon {...props}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></SvgIcon>
);

export const SearchIcon = (props) => (
  <SvgIcon {...props}><path d="M10 2a8 8 0 105.293 14.293l4.207 4.207 1.414-1.414-4.207-4.207A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/></SvgIcon>
);

export const LibraryIcon = (props) => (
  <SvgIcon {...props}><path d="M3 6h18v2H3V6zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"/></SvgIcon>
);

export const HeartIcon = (props) => (
  <SvgIcon {...props}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></SvgIcon>
);

export const HeartOutlineIcon = (props) => (
  <SvgIcon {...props}><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 2.89-3.14 5.74-7.9 10.05z"/></SvgIcon>
);

export const ClockIcon = (props) => (
  <SvgIcon {...props}><path d="M12 20c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8zm.5-13h-1v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></SvgIcon>
);

export const MicrophoneIcon = (props) => (
  <SvgIcon {...props}><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm4.3-3c0 2.39-1.71 4.38-4 4.83V18h2v2H9v-2h2.7v-2.17c-2.29-.45-4-2.44-4-4.83H6c0 3.07 2.13 5.64 5 6.32V21h2v-3.68c2.87-.68 5-3.25 5-6.32h-1.7z"/></SvgIcon>
);

export const DiscIcon = (props) => (
  <SvgIcon {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6.5c-.83 0-1.5.67-1.5 1.5S11.17 12.5 12 12.5 13.5 11.83 13.5 11 12.83 9.5 12 9.5z"/></SvgIcon>
);

export const NoteIcon = (props) => (
  <SvgIcon {...props}><path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z"/></SvgIcon>
);

export const PlaylistIcon = (props) => (
  <SvgIcon {...props}><path d="M3 10h14v2H3zm0-4h14v2H3zm0 8h10v2H3zm16 0h2v6h-2zm0-8h2v4h-2z"/></SvgIcon>
);

export const GlobeIcon = (props) => (
  <SvgIcon {...props}><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.9 14.2c-.16.54-.36 1.07-.6 1.57-1.37-.89-2.76-1.5-4.3-1.6V11h4.9c.03.53.03 1.07 0 1.6-.02.53-.06 1.06-.1 1.6zm-4.9-12.2c1.63.1 3.17.7 4.5 1.6-.24.5-.44 1.03-.6 1.57-.04.54-.08 1.07-.1 1.6H8.7c-.02-.53-.06-1.06-.1-1.6-.16-.54-.36-1.07-.6-1.57 1.33-.9 2.87-1.5 4.5-1.6zM6.8 16.2c.24-.5.44-1.03.6-1.57.04-.54.08-1.07.1-1.6H4.2c-.03-.53-.03-1.07 0-1.6.02-.53.06-1.06.1-1.6-.16-.54-.36-1.07-.6-1.57-.86 1.65-.86 3.65 0 5.3zM12 4.5c-1.29.1-2.51.46-3.6 1.03.24.5.44 1.03.6 1.57.35 1.2.56 2.47.7 3.72h5.2c.14-1.25.35-2.52.7-3.72.16-.54.36-1.07.6-1.57-1.1-.57-2.31-.93-3.6-1.03z"/></SvgIcon>
);

export const CloseIcon = (props) => (
  <SvgIcon {...props}><path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L12 13.41l-6.29 6.3-1.42-1.42L10.59 12 4.29 5.71 5.71 4.29 12 10.59l6.29-6.3 1.41 1.42z"/></SvgIcon>
);

export const FireIcon = (props) => (
  <SvgIcon {...props}><path d="M12 2s-4 4.9-4 8.5a4 4 0 008 0C16 6.9 12 2 12 2zm0 18.5c-3.04 0-5.5-2.46-5.5-5.5 0-2.9 2.08-5.31 4.84-5.47.11 1.71.66 3.35 1.58 4.77.91 1.39 1.42 2.93 1.42 4.48 0 3.04-2.46 5.5-5.5 5.5z"/></SvgIcon>
);

export const PrevIcon = (props) => (
  <SvgIcon {...props}><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></SvgIcon>
);

export const NextIcon = (props) => (
  <SvgIcon {...props}><path d="M6 18l8.5-6L6 6v12zm10-12v12h2V6h-2z"/></SvgIcon>
);

export const PlayIcon = (props) => (
  <SvgIcon {...props}><path d="M8 5v14l11-7z"/></SvgIcon>
);

export const PauseIcon = (props) => (
  <SvgIcon {...props}><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></SvgIcon>
);

export const RepeatIcon = (props) => (
  <SvgIcon {...props}><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></SvgIcon>
);

export const RepeatOneIcon = (props) => (
  <SvgIcon {...props}><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"/></SvgIcon>
);

export const ShuffleIcon = (props) => (
  <SvgIcon {...props}><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zm1.42 1.41l1.59 1.59 3.06 3.06V11h2v7.99l-3.06-3.06-1.59-1.59-1.41 1.41L15.59 20H10v-2h4.59l-4.58-4.59 1.41-1.41z"/></SvgIcon>
);

export const QueueIcon = (props) => (
  <SvgIcon {...props}><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></SvgIcon>
);

export const LyricsIcon = (props) => (
  <SvgIcon {...props}><path d="M5 4h14v2H5zm0 5h14v2H5zm0 5h10v2H5zm0 5h6v2H5z"/></SvgIcon>
);

export const ExpandIcon = (props) => (
  <SvgIcon {...props}><path d="M7 16H5v5h5v-2H7v-3zm0-8h2V5h3V3H5v5zm12 8h-3v2h5v-5h-2v3zm-2-8V5h-2v5h5V8h-3z"/></SvgIcon>
);

export const BackIcon = (props) => (
  <SvgIcon {...props}><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></SvgIcon>
);
