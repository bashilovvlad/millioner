import React from 'react';
import { clsx } from 'clsx';
import styles from './moneySlot.module.css';

interface IMoneySlotProps {
  label: number;
  active: boolean;
  passed: boolean;
}
export const MoneySlot: React.FC<IMoneySlotProps> = ({
  label,
  active,
  passed,
}) => (
  <div
    className={clsx(
      styles.moneyItem,
      active && styles.activeMoneyItem,
      passed && styles.passedMoneyItem,
    )}
  >
    <div className={styles.moneyItem_texHolder}>
      $
      {label.toLocaleString()}
    </div>
    <span className={styles.moneyItem_line} />
  </div>
);
