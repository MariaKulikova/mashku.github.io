import React from 'react';
import OutlinedButton from '../outlined-button/OutlinedButton';
import styles from './team-card.module.css';

interface TeamCardProps {
  title: string;
  description: string;
  caseStudyLink: string;
  tags: string[];
  year: string;
  mainImage: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ title, description, caseStudyLink, tags, year, mainImage }) => {
  return (
    <div className={styles.projectCard}>
      <div className={styles.projectCardContent}>
        <div className={styles.titleRow}>
          <h3 className={styles.projectCardTitle}>{title}</h3>
          <OutlinedButton size="large" className={styles.fullStoryLink} to={caseStudyLink}>
            full story later
          </OutlinedButton>
        </div>
        <p className={styles.projectCardDescription}>{description}</p>
        <div className={styles.projectCardMeta}>
          <div className={styles.projectCardTags}>
            {tags.join(', ')}
          </div>
          <span className={styles.projectCardYear}>{year}</span>
        </div>
      </div>
      <div className={styles.projectCardImages}>
        <img src={mainImage} alt={title} className={styles.projectCardImage} />
      </div>
    </div>
  );
};

export default TeamCard;