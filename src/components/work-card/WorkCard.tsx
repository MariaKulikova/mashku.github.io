import React from 'react';
import Link from '@docusaurus/Link';
import buttonStyles from '../button/button.module.css';
import styles from './work-card.module.css';

interface WorkCardProps {
  company: string;
  companyUrl?: string;
  title: string;
  description: string;
  caseStudyLink?: string;
  buttonText?: string;
}

export default function WorkCard({
  company,
  companyUrl,
  title,
  description,
  caseStudyLink,
  buttonText = 'Case Study',
}: WorkCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.actions}>
        {companyUrl && (
          <a href={companyUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles['button-text']}>
            <span>{company}</span>
          </a>
        )}
        {caseStudyLink && (
          <Link className={buttonStyles['button-text']} to={caseStudyLink}>
            <span>{buttonText}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
