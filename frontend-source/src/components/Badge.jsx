import { ESTADO_CONFIG } from '../mockData';
import styles from './Badge.module.css';

const Badge = ({ estado }) => {
  const cfg = ESTADO_CONFIG[estado] ?? {
    bg: '#f3f4f6',
    color: '#374151',
    dot: '#9ca3af',
    border: '#d1d5db',
  };

  return (
    <span
      className={styles.badge}
      style={{
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
      }}
    >
      <span
        className={styles.dot}
        style={{ background: cfg.dot }}
      />
      {estado}
    </span>
  );
};

export default Badge;
