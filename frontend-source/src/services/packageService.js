import { MOCK_PACKAGES } from '../mockData';

// Simula latencia de red
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Obtiene todos los paquetes.
 * En producción: return axios.get('/api/paquetes')
 */
export const getPackages = async () => {
  await delay(400);
  return [...MOCK_PACKAGES];
};

/**
 * Busca un paquete por número de guía.
 * En producción: return axios.get(`/api/paquetes/${guia}`)
 */
export const getPackageByGuia = async (guia) => {
  await delay(700);
  const found = MOCK_PACKAGES.find(
    (p) => p.guia.toLowerCase() === guia.trim().toLowerCase()
  );
  if (!found) throw new Error('Paquete no encontrado');
  return found;
};

/**
 * Crea un nuevo paquete.
 * En producción: return axios.post('/api/paquetes', data)
 */
export const createPackage = async (data) => {
  await delay(600);
  const guia = 'TP-' + String(Date.now()).slice(-7);
  return {
    ...data,
    id: guia,
    guia,
    fecha: new Date().toISOString().slice(0, 10),
    lat: 4.7 + Math.random() * 0.15,
    lng: -74.07 + Math.random() * 0.15,
  };
};

/**
 * Actualiza el estado de un paquete.
 * En producción: return axios.patch(`/api/paquetes/${id}`, { estado })
 */
export const updatePackageEstado = async (id, estado) => {
  await delay(300);
  return { id, estado };
};
