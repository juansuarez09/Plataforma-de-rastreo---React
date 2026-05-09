import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import PaginaRastreo  from './pages/PaginaRastreo';
import AdminDashboard from './pages/AdminDashboard';
import styles from './App.module.css';

const Navbar = () => (
  <nav className={styles.navbar}>
    <span className={styles.brand}>
      <span className={styles.brandAccent}>Track</span>Pack
    </span>
    <div className={styles.links}>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.linkActive : ''}`
        }
      >
        🔍 Rastrear
      </NavLink>
      <NavLink
        to="/admin"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.linkActive : ''}`
        }
      >
        ⚙ Admin
      </NavLink>
    </div>
  </nav>
);

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/"      element={<PaginaRastreo />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  </BrowserRouter>
);

export default App;
