import styles from '../App.module.css';

const AcercaProyecto = () => (
  <main className={styles.page}>
    <section className={styles.card}>
      <h1>Acerca del sistema</h1>

      <p>
        TrackPack es una plataforma web para la gestión y rastreo de envíos.
        Permite consultar el estado de un paquete y administrar información
        relacionada con entregas registradas en el sistema.
      </p>

      <h2>Objetivo del proyecto</h2>
      <p>
        El objetivo principal es ofrecer una interfaz sencilla para que los
        usuarios puedan rastrear paquetes y para que el área administrativa
        pueda gestionar la información de los envíos.
      </p>

      <h2>Funcionalidades principales</h2>
      <ul>
        <li>Consulta de paquetes mediante número de guía.</li>
        <li>Panel administrativo para visualizar información de envíos.</li>
        <li>Uso de rutas internas con React Router.</li>
        <li>Interfaz desarrollada con React y Vite.</li>
      </ul>

      <h2>Tecnologías utilizadas</h2>
      <ul>
        <li>React</li>
        <li>Vite</li>
        <li>React Router DOM</li>
        <li>CSS Modules</li>
      </ul>
    </section>
  </main>
);

export default AcercaProyecto;
