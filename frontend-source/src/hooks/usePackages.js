import { useState, useEffect, useCallback } from 'react';
import {
  getPackages,
  createPackage,
  updatePackageEstado,
} from '../services/packageService';

/**
 * Custom hook que encapsula toda la lógica de estado para paquetes.
 * Los componentes solo llaman addPackage / changeEstado sin preocuparse
 * por cómo se almacenan o se obtienen los datos.
 */
export const usePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // Carga inicial
  useEffect(() => {
    (async () => {
      try {
        const data = await getPackages();
        setPackages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addPackage = useCallback(async (formData) => {
    const newPkg = await createPackage(formData);
    setPackages((prev) => [newPkg, ...prev]);
    return newPkg;
  }, []);

  const changeEstado = useCallback(async (id, estado) => {
    await updatePackageEstado(id, estado);
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado } : p))
    );
  }, []);

  return { packages, loading, error, addPackage, changeEstado };
};
