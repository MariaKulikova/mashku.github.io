import React from 'react';
import Link from '@docusaurus/Link';
import styles from './outlined-button.module.css';

interface OutlinedButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export default function OutlinedButton({ 
  to, 
  children, 
  className, 
  size = 'medium',
  disabled = false
}: OutlinedButtonProps) {
  const classNames = [
    styles.outlinedButton,
    styles[`size-${size}`],
    disabled && styles.disabled,
    className
  ].filter(Boolean).join(' ');

  if (disabled) {
    return (
      <span className={classNames}>
        {children}
      </span>
    );
  }

  return (
    <Link
      to={to}
      className={classNames}
    >
      {children}
    </Link>
  );
}