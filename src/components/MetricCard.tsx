import React from 'react';
import styles from './MetricCard.module.css';

interface MetricCardProps {
  label: string;
  value: string;
  change?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, change }) => {
  return (
    <div className={styles.card}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      {change && <div className={styles.change}>{change}</div>}
    </div>
  );
};
