# Plataforma-de-rastreo---React
# TrackPack — Frontend

## Estructura de carpetas

```
/frontend
├── index.html
├── package.json
├── vite.config.js
└── /src
    ├── main.jsx                        ← Punto de entrada
    ├── App.jsx                         ← Router + Navbar
    ├── mockData.js                     ← Datos de prueba y constantes
    │
    ├── /components
    │   ├── Badge.jsx / .module.css     ← Indicador de estado visual
    │   ├── Card.jsx / .module.css      ← Contenedor de sección
    │   ├── Map.jsx                     ← Mapa Leaflet reutilizable
    │   ├── PaqueteForm.jsx             ← Formulario de registro
    │   ├── PaquetesTable.jsx           ← Tabla con búsqueda y filtros
    │   ├── MapaRepartidores.jsx        ← Mapa + lista de repartidores
    │   ├── FormularioRastreo.jsx       ← Campo de búsqueda por guía
    │   ├── EstadoPaquete.jsx           ← Info + timeline de estado
    │   └── MapaRastreo.jsx             ← Mapa ubicación del paquete
    │
    ├── /pages
    │   ├── AdminDashboard.jsx          ← Panel de administración
    │   └── PaginaRastreo.jsx           ← Página pública de rastreo
    │
    ├── /services
    │   └── packageService.js           ← Capa de acceso a la API (mock)
    │
    └── /hooks
        └── usePackages.js              ← Custom hook de estado global
```

## Instalación y desarrollo

```bash
# 1. Descomprimir el zip y entrar a la carpeta
cd frontend-source

# 2. Instalar dependencias
npm install

# 3. Correr en modo desarrollo
npm run dev

# 4. Construir para producción
npm run build
```

## Despliegue en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desde la carpeta del proyecto
vercel
```

O simplemente conecta el repositorio en https://vercel.com/new

## Despliegue en Netlify

Arrastra la carpeta `dist/` (después de `npm run build`) en:
https://app.netlify.com/drop

## Rutas

| Ruta     | Descripción                        |
|----------|------------------------------------|
| `/`      | Página pública de rastreo          |
| `/admin` | Panel de administración            |
