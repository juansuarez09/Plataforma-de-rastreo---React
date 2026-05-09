import Badge from './Badge';
import { ESTADOS, ESTADO_CONFIG } from '../mockData';
import styles from './EstadoPaquete.module.css';

/** Línea de tiempo de estados del paquete */
const Timeline = ({ estadoActual }) => {
  const currentIndex = ESTADOS.indexOf(estadoActual);

  return (
    <div className={styles.timeline}>
      {ESTADOS.map((estado, i) => {
        const done    = i <= currentIndex;
        const active  = i === currentIndex;
        const cfg     = ESTADO_CONFIG[estado];

        return (
          <div key={estado} className={styles.timelineItem}>
            {/* Línea conectora (antes del punto, excepto primer ítem) */}
            {i > 0 && (
              <div
                className={styles.connector}
                style={{ background: i <= currentIndex ? cfg.dot : '#e5e7eb' }}
              />
            )}

            {/* Punto de estado */}
            <div
              className={`${styles.dot} ${active ? styles.dotActive : ''}`}
              style={{
                background: done ? cfg.dot : '#fff',
                border: `2px solid ${done ? cfg.dot : '#d1d5db'}`,
                boxShadow: active ? `0 0 0 4px ${cfg.dot}33` : 'none',
              }}
            >
              {done && !active && <span className={styles.check}>✓</span>}
            </div>

            <span
              className={styles.timelineLabel}
              style={{ color: active ? cfg.dot : done ? '#374151' : '#9ca3af', fontWeight: active ? 700 : 400 }}
            >
              {estado}
            </span>
          </div>
        );
      })}
    </div>
  );
};

/**
 * Muestra la información completa del paquete rastreado:
 * datos, línea de tiempo de estados y mapa de ubicación.
 */
const EstadoPaquete = ({ paquete, onReset }) => {
  const infoRows = [
    ['Remitente',  paquete.remitente,    '↑'],
    ['Destinatario', paquete.destinatario, '↓'],
    ['Origen',     paquete.origen,       '📍'],
    ['Destino',    paquete.destino,      '🎯'],
    ['Peso',       paquete.peso,         '⚖'],
    ['Fecha',      paquete.fecha,        '📅'],
  ];

  return (
    <div className={styles.wrapper}>
      {/* Encabezado */}
      <div className={styles.header}>
        <div>
          <p className={styles.guiaLabel}>Número de Guía</p>
          <span className={styles.guia}>{paquete.guia}</span>
        </div>
        <Badge estado={paquete.estado} />
      </div>

      {/* Datos del paquete */}
      <div className={styles.grid}>
        {infoRows.map(([label, value, icon]) => (
          <div key={label} className={styles.infoCell}>
            <p className={styles.cellLabel}>{icon} {label}</p>
            <p className={styles.cellValue}>{value}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Seguimiento del Estado</p>
        <Timeline estadoActual={paquete.estado} />
      </div>

      {/* Botón reset */}
      <button className={styles.resetBtn} onClick={onReset}>
        ← Nueva búsqueda
      </button>
    </div>
  );
};

export default EstadoPaquete;
