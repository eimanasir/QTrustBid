import React from 'react';
import { Shield, Sparkles } from 'lucide-react';
import styles from './Badge.module.css';

interface BadgeProps {
  variant: 'quantum' | 'ai' | 'success' | 'error' | 'warning' | 'info';
  children: React.ReactNode;
  icon?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ variant, children, icon = true }) => {
  const getIcon = () => {
    if (!icon) return null;
    switch (variant) {
      case 'quantum':
        return <Shield size={14} />;
      case 'ai':
        return <Sparkles size={14} />;
      default:
        return null;
    }
  };

  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {getIcon()}
      {children}
    </span>
  );
};
