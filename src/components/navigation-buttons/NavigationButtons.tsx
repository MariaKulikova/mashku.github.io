import React from 'react';
import './navigation-buttons.css';
import OutlinedButton from '../outlined-button/OutlinedButton';

interface NavigationButtonsProps {
  nextProject?: {
    title: string;
    link: string;
  };
}

const BackArrow = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.8333 10H4.16666" stroke="var(--color-gray-headings)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.99999 15.8334L4.16666 10L9.99999 4.16669" stroke="var(--color-gray-headings)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ForwardArrow = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.16666 10H15.8333" stroke="var(--color-gray-headings)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 4.16669L15.8333 10L10 15.8334" stroke="var(--color-gray-headings)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TopNavigation = () => (
  <div className="project-navigation">
    <OutlinedButton to="/" size="small">
      <BackArrow />
      <span>All projects</span>
    </OutlinedButton>
  </div>
);

export const ProjectNavigation: React.FC<NavigationButtonsProps> = ({ nextProject }) => (
  <div className="project-navigation">
    <OutlinedButton to="/" size="small">
      <BackArrow />
      <span>All projects</span>
    </OutlinedButton>
    {nextProject && (
      <OutlinedButton to={nextProject.link} size="small">
        <span>{nextProject.title}</span>
        <ForwardArrow />
      </OutlinedButton>
    )}
  </div>
);

export default { TopNavigation, ProjectNavigation };