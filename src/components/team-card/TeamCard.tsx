import React, { useRef, useEffect } from 'react';
import OutlinedButton from '../outlined-button/OutlinedButton';
import styles from './team-card.module.css';

interface TeamCardProps {
  title: string;
  description: string;
  caseStudyLink: string;
  tags: string[];
  year?: string;
  mainImage: string;
  buttonText?: string;
  buttonDisabled?: boolean;
  isBlurred?: boolean;
}

const TeamCard: React.FC<TeamCardProps> = ({ title, description, caseStudyLink, tags, year, mainImage, buttonText = "Read Case Study", buttonDisabled = false, isBlurred = false }) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const clearImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isBlurred || !imageRef.current || !clearImageRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = imageRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      clearImageRef.current!.style.setProperty('--mouse-x', `${x}px`);
      clearImageRef.current!.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleMouseEnter = () => {
      clearImageRef.current!.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      clearImageRef.current!.style.opacity = '0';
    };

    const imageElement = imageRef.current;
    imageElement.addEventListener('mousemove', handleMouseMove);
    imageElement.addEventListener('mouseenter', handleMouseEnter);
    imageElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      imageElement.removeEventListener('mousemove', handleMouseMove);
      imageElement.removeEventListener('mouseenter', handleMouseEnter);
      imageElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isBlurred]);

  return (
    <div className={styles.projectCard}>
      <div className={styles.projectCardContent}>
        <div className={styles.projectCardColumns}>
          <div className={styles.projectCardInfo}>
            <h3 className={styles.projectCardTitle}>{title}</h3>
            <p className={styles.projectCardDescription}>{description}</p>
          </div>
          <div className={styles.projectCardButton}>
            <OutlinedButton 
              size="large" 
              className={styles.fullStoryLink} 
              to={caseStudyLink}
              disabled={buttonDisabled}
            >
              {buttonText}
            </OutlinedButton>
          </div>
        </div>
      </div>
      <div className={`${styles.projectCardImages} ${isBlurred ? styles.blurredImageContainer : ''}`} ref={imageRef}>
        <img src={mainImage} alt={title} className={`${styles.projectCardImage} ${isBlurred ? styles.blurredImage : ''}`} />
        {isBlurred && (
          <>
            <img src={mainImage} alt={title} className={styles.clearImage} ref={clearImageRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default TeamCard;