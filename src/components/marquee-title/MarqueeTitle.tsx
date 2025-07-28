import React from 'react';
import styles from './marquee-title.module.css';

interface MarqueeTitleProps {
  children: string;
}

const MarqueeTitle: React.FC<MarqueeTitleProps> = ({ children }) => {
  // Создаем два набора элементов для бесшовной анимации
  const items = [...Array(20)].map((_, index) => (
    <h2 key={index}>{children}</h2>
  ));
  
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeContent}>
        {items}
      </div>
      <div className={styles.marqueeContent} aria-hidden="true">
        {items}
      </div>
    </div>
  );
};

export default MarqueeTitle;