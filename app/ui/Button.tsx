import styles from "./button.module.css";

interface IButtonProps {
  label: string;
  onClick: () => void;
  prefix?: string;
}

export const Button: React.FC<IButtonProps> = ({ label, onClick, prefix }) => {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {prefix} {label}
    </button>
  );
};
