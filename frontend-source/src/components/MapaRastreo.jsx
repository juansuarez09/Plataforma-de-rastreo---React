import Map from './Map';
import { ESTADO_CONFIG } from '../mockData';
import styles from './MapaRastreo.module.css';

/**
 * Mapa que muestra la última ubicación registrada de un paquete.
 */
const MapaRastreo = ({ paquete }) => {
  const cfg = ESTADO_CONFIG[paquete.estado] ?? {};

  const markers = [
    {
      lat:      paquete.lat,
      lng:      paquete.lng,
      label:    `Paquete ${paquete.guia}`,
      sublabel: `Último reporte · ${paquete.destino}`,
      color:    cfg.dot ?? '#4f46e5',
    },
  ];

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Última Ubicación Registrada</p>
      <Map markers={markers} height="220px" zoom={13} />
      <p className={styles.note}>
        📡 Última actualización: hace 5 minutos · Destino: {paquete.destino}
      </p>
    </div>
  );
};

export default MapaRastreo;
