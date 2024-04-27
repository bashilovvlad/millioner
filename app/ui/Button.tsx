import styles from "./button.module.css";

import Link from "next/link";

import { clsx } from "clsx";

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

export const Button: React.FC<IButtonProps> = ({ onClick, label }) => {
  return (
    <button type="button" onClick={onClick} className={styles.baseButton}>
      {label}
    </button>
  );
};

export const AnswerButton: React.FC<IAnswerButtonProps> = ({
  label,
  onClick,
  prefix,
  selected,
  correct,
  incorrect,
}) => {
  return (
    <div
      className={clsx(
        styles.button,
        selected && styles.selected,
        correct && styles.correct,
        incorrect && styles.incorrect
      )}
      onClick={onClick}
    >
      <div className={styles.button_texHolder}>
        <span className={styles.button_prefix}>{prefix}</span>
        <span className={styles.button_label}>{label}</span>
      </div>
      <span className={styles.button_line}></span>
    </div>
  );
};

export const ButtonLink: React.FC<IButtonLinkProps> = ({ href, label }) => {
  return (
    <Link href={href} className={styles.baseButton}>
      {label}
    </Link>
  );
};
