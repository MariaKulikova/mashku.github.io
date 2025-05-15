import React from 'react';
import styles from './stacked-images.module.css';

interface ImageProps {
  src: string;
  alt: string;
}

interface StackedImagesProps {
  images: ImageProps[];
}

const StackedImages: React.FC<StackedImagesProps & { type?: 'aiuc' | 'marquiz' | 'selectel' }> = ({ images, type }) => {
  return (
    <div className={styles.container}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          className={`${styles.image} ${type ? styles[type] : ''}`}
        />
      ))}
    </div>
  );
};

export default StackedImages;