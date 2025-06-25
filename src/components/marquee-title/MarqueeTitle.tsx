import React from 'react';
import styles from './marquee-title.module.css';

interface MarqueeTitleProps {
  children: string;
}

const MarqueeTitle: React.FC<MarqueeTitleProps> = ({ children }) => {
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeContent} data-text={children}>
        <h2>{children}</h2>
      </div>
    </div>
  );
};

export default MarqueeTitle;