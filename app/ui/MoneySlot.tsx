import styles from "./moneySlot.module.css";
import { clsx } from "clsx";

interface IMoneySlotProps {
  label: number;
  active: boolean;
  passed: boolean;
}
export const MoneySlot: React.FC<IMoneySlotProps> = ({
  label,
  active,
  passed,
}) => {
  return (
    <div
      className={clsx(
        styles.moneyItem,
        active && styles.activeMoneyItem,
        passed && styles.passedMoneyItem
      )}
    >
      <div className={styles.moneyItem_texHolder}>${label}</div>
      <span className={styles.moneyItem_line}></span>
    </div>
  );
};
