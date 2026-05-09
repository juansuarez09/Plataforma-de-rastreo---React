import { useState } from 'react';
import { ESTADOS } from '../mockData';
import styles from './PaqueteForm.module.css';

const EMPTY = {
  remitente: '',
  destinatario: '',
  origen: '',
  destino: '',
  peso: '',
  dimensiones: '',
  descripcion: '',
  estado: 'Pendiente',
};

const REQUIRED = ['remitente', 'destinatario', 'origen', 'destino', 'peso'];

/**
 * Formulario para registrar un nuevo paquete.
 * Llama a onSubmit(data) cuando el formulario es válido.
 */
const PaqueteForm = ({ onSubmit, onCancel, loading = false }) => {
  const [form, setForm]     = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    REQUIRED.forEach((k) => {
      if (!form[k].trim()) e[k] = 'Este campo es requerido';
    });
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSubmit(form);
  };

  const field = (key, label, placeholder = '') => (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input
        className={`${styles.input} ${errors[key] ? styles.inputError : ''}`}
        value={form[key]}
        placeholder={placeholder}
        onChange={(e) => set(key, e.target.value)}
      />
      {errors[key] && <span className={styles.error}>{errors[key]}</span>}
    </div>
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.title}>Registrar Nuevo Paquete</h2>

      <div className={styles.grid}>
        {field('remitente',   'Remitente',        'Nombre completo')}
        {field('destinatario','Destinatario',      'Nombre completo')}
        {field('origen',      'Ciudad de Origen',  'Ej: Bogotá')}
        {field('destino',     'Ciudad de Destino', 'Ej: Medellín')}
        {field('peso',        'Peso',              'Ej: 2.5kg')}
        {field('dimensiones', 'Dimensiones',       'Ej: 30x20x15cm')}

        <div className={`${styles.field} ${styles.fullCol}`}>
          <label className={styles.label}>Descripción</label>
          <input
            className={styles.input}
            value={form.descripcion}
            placeholder="¿Qué contiene el paquete?"
            onChange={(e) => set('descripcion', e.target.value)}
          />
        </div>

        <div className={`${styles.field} ${styles.fullCol}`}>
          <label className={styles.label}>Estado Inicial</label>
          <select
            className={styles.input}
            value={form.estado}
            onChange={(e) => set('estado', e.target.value)}
          >
            {ESTADOS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className={styles.btnPrimary}
          disabled={loading}
        >
          {loading ? 'Guardando…' : '✦ Registrar Paquete'}
        </button>
      </div>
    </form>
  );
};

export default PaqueteForm;
