import Map from './Map';
import { MOCK_REPARTIDORES } from '../mockData';
import styles from './MapaRepartidores.module.css';

/**
 * Mapa con marcadores de todos los repartidores activos.
 * Usa datos de prueba (mockRepartidores) hasta integración con la API.
 */
const MapaRepartidores = () => {
  const markers = MOCK_REPARTIDORES.map((r) => ({
    lat: r.lat,
    lng: r.lng,
    label: r.nombre,
    sublabel: `${r.vehiculo} · ${r.paquetes} paquetes · ${r.estado}`,
    color: r.estado === 'Activo' ? '#10b981' : '#f59e0b',
  }));

  return (
    <div>
      <Map markers={markers} height="320px" zoom={13} />

      <div className={styles.list}>
        {MOCK_REPARTIDORES.map((r) => (
          <div key={r.id} className={styles.item}>
            <span
              className={styles.dot}
              style={{
                background: r.estado === 'Activo' ? '#10b981' : '#f59e0b',
                boxShadow: `0 0 6px ${r.estado === 'Activo' ? '#10b981' : '#f59e0b'}99`,
              }}
            />
            <div>
              <p className={styles.nombre}>{r.nombre}</p>
              <p className={styles.sub}>
                {r.vehiculo} · {r.paquetes} paquetes
              </p>
            </div>
            <span
              className={styles.estadoBadge}
              style={{
                color: r.estado === 'Activo' ? '#065f46' : '#92400e',
                background: r.estado === 'Activo' ? '#d1fae5' : '#fef3c7',
              }}
            >
              {r.estado}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapaRepartidores;
