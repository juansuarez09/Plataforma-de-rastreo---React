import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon path broken by Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/**
 * Componente de mapa reutilizable basado en Leaflet.
 *
 * @param {Array}  markers  - [{ lat, lng, label, sublabel, color }]
 * @param {string} height   - Altura CSS del contenedor
 * @param {number} zoom     - Zoom inicial
 */
const Map = ({ markers = [], height = '300px', zoom = 12 }) => {
  const containerRef = useRef(null);
  const mapRef       = useRef(null);
  const layerRef     = useRef([]);

  // Inicializa el mapa una sola vez
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const center = markers[0]
      ? [markers[0].lat, markers[0].lng]
      : [4.711, -74.0721]; // Bogotá por defecto

    mapRef.current = L.map(containerRef.current).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []); // eslint-disable-line

  // Actualiza marcadores cuando cambia el prop
  useEffect(() => {
    if (!mapRef.current) return;

    // Elimina marcadores anteriores
    layerRef.current.forEach((m) => m.remove());
    layerRef.current = [];

    markers.forEach((m) => {
      const icon = L.divIcon({
        className: '',
        html: `<div style="
          width:16px; height:16px;
          background:${m.color ?? '#4f46e5'};
          border:2.5px solid #fff;
          border-radius:50%;
          box-shadow:0 0 0 3px ${m.color ?? '#4f46e5'}44;
        "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      const marker = L.marker([m.lat, m.lng], { icon }).addTo(mapRef.current);

      marker.bindPopup(`
        <div style="min-width:130px; font-family:system-ui; font-size:13px;">
          <strong>${m.label}</strong>
          ${m.sublabel ? `<br/><span style="color:#6b7280;font-size:12px">${m.sublabel}</span>` : ''}
        </div>
      `);

      layerRef.current.push(marker);
    });

    if (markers.length === 1) {
      mapRef.current.setView([markers[0].lat, markers[0].lng], zoom);
    }
  }, [markers]); // eslint-disable-line

  return (
    <div
      ref={containerRef}
      style={{ height, width: '100%', borderRadius: 10, zIndex: 0 }}
    />
  );
};

export default Map;
