import { useState } from 'react';
import Badge from './Badge';
import { ESTADOS } from '../mockData';
import styles from './PaquetesTable.module.css';

/**
 * Tabla principal de paquetes con búsqueda, filtro y cambio de estado inline.
 */
const PaquetesTable = ({ packages, onChangeEstado }) => {
  const [search,       setSearch]       = useState('');
  const [filterEstado, setFilterEstado] = useState('Todos');
  const [editingId,    setEditingId]    = useState(null);

  const filtered = packages.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      [p.guia, p.remitente, p.destinatario, p.origen, p.destino].some((v) =>
        v.toLowerCase().includes(q)
      );
    const matchEstado =
      filterEstado === 'Todos' || p.estado === filterEstado;
    return matchSearch && matchEstado;
  });

  const handleEstadoChange = (id, newEstado) => {
    onChangeEstado(id, newEstado);
    setEditingId(null);
  };

  return (
    <div>
      {/* Controles */}
      <div className={styles.controls}>
        <input
          className={styles.searchInput}
          placeholder="🔍  Buscar por guía, remitente, destino…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={styles.filterSelect}
          value={filterEstado}
          onChange={(e) => setFilterEstado(e.target.value)}
        >
          {['Todos', ...ESTADOS].map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
      </div>

      {/* Tabla */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {['N° Guía', 'Remitente', 'Destinatario', 'Ruta', 'Peso', 'Estado', 'Acciones'].map((h) => (
                <th key={h} className={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className={styles.empty}>
                  No se encontraron paquetes con ese criterio.
                </td>
              </tr>
            )}
            {filtered.map((p) => (
              <tr key={p.id} className={styles.row}>
                <td className={styles.td}>
                  <span className={styles.guia}>{p.guia}</span>
                </td>
                <td className={styles.td}>{p.remitente}</td>
                <td className={styles.td}>{p.destinatario}</td>
                <td className={`${styles.td} ${styles.ruta}`}>
                  {p.origen} → {p.destino}
                </td>
                <td className={styles.td}>{p.peso}</td>
                <td className={styles.td}>
                  {editingId === p.id ? (
                    <select
                      className={styles.estadoSelect}
                      value={p.estado}
                      autoFocus
                      onChange={(e) => handleEstadoChange(p.id, e.target.value)}
                      onBlur={() => setEditingId(null)}
                    >
                      {ESTADOS.map((e) => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </select>
                  ) : (
                    <Badge estado={p.estado} />
                  )}
                </td>
                <td className={styles.td}>
                  <button
                    className={styles.actionBtn}
                    onClick={() =>
                      setEditingId(editingId === p.id ? null : p.id)
                    }
                  >
                    ✎ Estado
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={styles.count}>
        Mostrando {filtered.length} de {packages.length} paquetes
      </p>
    </div>
  );
};

export default PaquetesTable;
