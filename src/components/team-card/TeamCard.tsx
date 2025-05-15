import React from 'react';
import Button from '../button/Button';
import StackedImages from '../stacked-images/StackedImages';
import styles from './team-card.module.css';

interface TeamCardProps {
  type: "aiuc" | "marquiz" | "selectel";
  title: string;
  description: string;
  caseStudyLink: string;
  images: { src: string; alt: string }[];
}

const TeamCard: React.FC<TeamCardProps> = ({ type, title, description, caseStudyLink, images }) => {
  return (
    <div className={styles.projectCard}>
      <div className={styles.projectCardContent}>
        <div>
          <h3>{title}</h3>
          <p className={styles.projectCardDescription}>{description}</p>
          <Button variant="text" className="button-text" to={caseStudyLink}>Read case study</Button>
        </div>
      </div>
      <div className={styles.projectCardImages}>
        <StackedImages type={type} images={images} />
      </div>
    </div>
  );
};

export default TeamCard;