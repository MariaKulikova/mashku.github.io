import React, { useState, useCallback } from 'react';
import styles from './sound-toggle.module.css';

const SoundOnIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const SoundOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(true);

  const toggle = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return (
    <button
      className={styles.button}
      onClick={toggle}
      aria-label={isMuted ? 'Turn sound on' : 'Turn sound off'}
      title={isMuted ? 'Sound on' : 'Sound off'}
    >
      {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
    </button>
  );
}
