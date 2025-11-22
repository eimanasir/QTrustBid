import React, { InputHTMLAttributes, forwardRef } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  success,
  helperText,
  icon,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && (
        <label className={styles.label} htmlFor={props.id}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {icon && <span className={styles.iconLeft}>{icon}</span>}
        <input
          ref={ref}
          className={`${styles.input} ${error ? styles.error : ''} ${success ? styles.success : ''} ${icon ? styles.hasIcon : ''}`}
          {...props}
        />
        {error && <AlertCircle className={styles.iconRight} size={20} />}
        {success && <Check className={styles.iconRight} size={20} />}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
      {helperText && !error && <span className={styles.helperText}>{helperText}</span>}
    </div>
  );
});

Input.displayName = 'Input';
