import React from 'react';
import Link from '@docusaurus/Link';
import styles from './button.module.css';

interface ButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'outlined' | 'text';
}

export default function Button({ to, children, className, variant = 'outlined' }: ButtonProps) {
  return (
    <Link
      to={to}
      className={`${styles[`button-${variant}`]} ${className || ''}`}
    >
      <span>{children}</span>
    </Link>
  );
}