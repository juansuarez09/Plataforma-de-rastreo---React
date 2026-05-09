import { useState } from 'react';
import styles from './FormularioRastreo.module.css';

/**
 * Formulario público de búsqueda por número de guía.
 * Llama a onBuscar(guia) cuando el usuario envía el formulario.
 */
const FormularioRastreo = ({ onBuscar, loading = false, error = '' }) => {
  const [guia, setGuia] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guia.trim()) onBuscar(guia.trim());
  };

  const tryGuia = (g) => {
    setGuia(g);
    onBuscar(g);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <div className={styles.icon}>📦</div>
        <h1 className={styles.title}>
          Rastrear mi Paquete
        </h1>
        <p className={styles.subtitle}>
          Ingresa tu número de guía para conocer el estado y la ubicación
          actual de tu envío.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.inputRow}>
          <input
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            value={guia}
            onChange={(e) => setGuia(e.target.value)}
            placeholder="Ej: TP-20240001"
            autoComplete="off"
            autoFocus
          />
          <button
            type="submit"
            className={styles.btn}
            disabled={loading || !guia.trim()}
          >
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              'Rastrear →'
            )}
          </button>
        </div>

        {error && (
          <p className={styles.errorMsg}>⚠ {error}</p>
        )}
      </form>

      <p className={styles.hint}>
        Prueba con:{' '}
        {['TP-20240001', 'TP-20240003', 'TP-20240005'].map((g) => (
          <button
            key={g}
            type="button"
            className={styles.hintBtn}
            onClick={() => tryGuia(g)}
          >
            {g}
          </button>
        ))}
      </p>
    </div>
  );
};

export default FormularioRastreo;
