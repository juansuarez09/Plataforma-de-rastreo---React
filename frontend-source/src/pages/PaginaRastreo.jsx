import { useState } from 'react';
import FormularioRastreo from '../components/FormularioRastreo';
import EstadoPaquete     from '../components/EstadoPaquete';
import MapaRastreo       from '../components/MapaRastreo';
import Card              from '../components/Card';
import { getPackageByGuia } from '../services/packageService';
import styles from './PaginaRastreo.module.css';

/**
 * Página pública de rastreo.
 *
 * Flujo:
 *   1. Muestra solo FormularioRastreo
 *   2. Al buscar con éxito → muestra EstadoPaquete + MapaRastreo
 *   3. "Nueva búsqueda" → regresa al paso 1
 */
const PaginaRastreo = () => {
  const [paquete, setPaquete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleBuscar = async (guia) => {
    setLoading(true);
    setError('');
    setPaquete(null);
    try {
      const data = await getPackageByGuia(guia);
      setPaquete(data);
    } catch {
      setError('No encontramos ningún paquete con ese número de guía. Verifica e intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPaquete(null);
    setError('');
  };

  return (
    <div className={styles.page}>
      <Card className={styles.card}>
        <FormularioRastreo
          onBuscar={handleBuscar}
          loading={loading}
          error={error}
        />
      </Card>

      {paquete && (
        <div className={styles.resultSection}>
          <Card>
            <EstadoPaquete paquete={paquete} onReset={handleReset} />
          </Card>
          <MapaRastreo paquete={paquete} />
        </div>
      )}
    </div>
  );
};

export default PaginaRastreo;
