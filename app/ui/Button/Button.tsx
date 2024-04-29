import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import styles from './button.module.css';

interface IAnswerButtonProps {
  label: string;
  onClick: () => void;
  prefix?: string;
  selected?: boolean;
  correct?: boolean;
  incorrect?: boolean;
}

interface IButtonLinkProps {
  label: string;
  href: string;
}

interface IButtonProps {
  label: string;
  onClick: () => void;
}

export const Button: React.FC<IButtonProps> = ({ onClick, label }) => (
  <button type="button" onClick={onClick} className={styles.baseButton}>
    {label}
  </button>
);

export const AnswerButton: React.FC<IAnswerButtonProps> = ({
  label,
  onClick,
  prefix,
  selected,
  correct,
  incorrect,
}) => (
  <button
    type="button"
    className={clsx(
      styles.button,
      // eslint-disable-next-line
      selected && styles.selected,
      // eslint-disable-next-line
      correct && styles.correct,
      // eslint-disable-next-line
      incorrect && styles.incorrect
    )}
    onClick={onClick}
  >
    <div className={styles.button_texHolder}>
      <span className={styles.button_prefix}>{prefix}</span>
      <span className={styles.button_label}>{label}</span>
    </div>
    <span className={styles.button_line} />
  </button>
);

export const ButtonLink: React.FC<IButtonLinkProps> = ({ href, label }) => (
  <Link href={href} className={styles.baseButton}>
    {label}
  </Link>
);
