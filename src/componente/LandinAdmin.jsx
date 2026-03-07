import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandinAdmin.css';
import logo from '../assets/mundo.ico';
import {
  FaSignOutAlt, FaShieldAlt, FaTicketAlt,
  FaCalendarCheck, FaChartBar, FaUserShield
} from 'react-icons/fa';

const panels = [
  {
    icon: <FaTicketAlt />,
    label: 'Historial de Tickets',
    desc: 'Revisa, edita y responde los tickets de soporte generados por usuarios.',
    path: '/home-admin',
    cls: 'la-card--tickets',
  },
  {
    icon: <FaCalendarCheck />,
    label: 'Historial de Citas',
    desc: 'Consulta y gestiona todas las citas agendadas por los clientes.',
    path: '/citas-admin',
    cls: 'la-card--citas',
  },
];

function LandinAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="la-page">

      <img src={logo} alt="" className="la-watermark" aria-hidden="true" />
      <div className="la-blob la-blob--1" />
      <div className="la-blob la-blob--2" />

      {/* Header */}
      <header className="la-header">
        <div className="la-brand">
          <FaShieldAlt className="la-brand-icon" />
          <span>Panel de Administración</span>
        </div>
        <button className="la-logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </header>

      {/* Hero */}
      <section className="la-hero">
        <span className="la-eyebrow">
          <FaUserShield /> Acceso Administrador
        </span>
        <h1 className="la-title">
          Panel de{' '}
          <span className="la-glow">Administración</span>
        </h1>
        <p className="la-desc">
          Gestiona tickets de soporte, citas agendadas y toda la
          actividad de la plataforma desde un solo lugar.
        </p>
      </section>

      {/* Cards */}
      <div className="la-grid">
        {panels.map((p, i) => (
          <div
            key={i}
            className={`la-card ${p.cls}`}
            style={{ animationDelay: `${i * 0.13}s` }}
            onClick={() => navigate(p.path)}
            role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && navigate(p.path)}
          >
            <div className="la-card-icon">{p.icon}</div>
            <h2 className="la-card-label">{p.label}</h2>
            <p className="la-card-desc">{p.desc}</p>
            <span className="la-card-arrow">Ir →</span>
          </div>
        ))}
      </div>

      {/* Stats pills */}
      <div className="la-pills">
        {[
          { icon: <FaShieldAlt />,    text: 'Acceso seguro y autenticado' },
          { icon: <FaChartBar />,     text: 'Gestión centralizada' },
          { icon: <FaCalendarCheck />, text: 'Control en tiempo real' },
        ].map((p, i) => (
          <div key={i} className="la-pill">
            <span className="la-pill-icon">{p.icon}</span>
            <span>{p.text}</span>
          </div>
        ))}
      </div>

      <div className="la-deco-icon" aria-hidden="true"><FaShieldAlt /></div>
    </div>
  );
}

export default LandinAdmin;