import { useState } from 'react';
import PaqueteForm    from '../components/PaqueteForm';
import PaquetesTable  from '../components/PaquetesTable';
import MapaRepartidores from '../components/MapaRepartidores';
import Card            from '../components/Card';
import { usePackages } from '../hooks/usePackages';
import styles          from './AdminDashboard.module.css';

const StatCard = ({ label, value, icon, color }) => (
  <Card className={styles.statCard}>
    <div className={styles.statIcon} style={{ background: color + '20', color }}>
      {icon}
    </div>
    <div>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue}>{value}</p>
    </div>
  </Card>
);

const AdminDashboard = () => {
  const { packages, loading, error, addPackage, changeEstado } = usePackages();
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('paquetes');

  const stats = {
    total:      packages.length,
    enRuta:     packages.filter((p) => p.estado === 'En ruta').length,
    entregados: packages.filter((p) => p.estado === 'Entregado').length,
    pendientes: packages.filter((p) => p.estado === 'Pendiente').length,
  };

  const handleFormSubmit = async (data) => {
    setFormLoading(true);
    try {
      await addPackage(data);
      setShowForm(false);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return <div className={styles.loading}>Cargando datos…</div>;
  if (error)   return <div className={styles.errorState}>Error: {error}</div>;

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Panel de Administración</h1>
          <p className={styles.pageSubtitle}>Gestión de paquetes y repartidores</p>
        </div>
        <button className={styles.btnNew} onClick={() => setShowForm(true)}>
          ＋ Nuevo Paquete
        </button>
      </div>

      {/* Modal Formulario */}
      {showForm && (
        <div className={styles.modalOverlay} onClick={() => setShowForm(false)}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <PaqueteForm
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
              loading={formLoading}
            />
          </div>
        </div>
      )}

      {/* Stats */}
      <div className={styles.statsGrid}>
        <StatCard label="Total Paquetes" value={stats.total}      icon="📦" color="#4f46e5" />
        <StatCard label="En Ruta"        value={stats.enRuta}     icon="🚚" color="#7c3aed" />
        <StatCard label="Entregados"     value={stats.entregados} icon="✅" color="#059669" />
        <StatCard label="Pendientes"     value={stats.pendientes} icon="⏳" color="#d97706" />
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {[{ k: 'paquetes', l: '📋 Paquetes' }, { k: 'mapa', l: '🗺 Repartidores' }].map(({ k, l }) => (
          <button
            key={k}
            className={`${styles.tab} ${activeTab === k ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(k)}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Content */}
      <Card>
        {activeTab === 'paquetes' ? (
          <PaquetesTable packages={packages} onChangeEstado={changeEstado} />
        ) : (
          <>
            <h2 className={styles.sectionTitle}>Repartidores en tiempo real</h2>
            <MapaRepartidores />
          </>
        )}
      </Card>
    </div>
  );
};

export default AdminDashboard;
