import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeTicket.css';
import logo from '../assets/mundo.ico';
import { FaArrowLeft, FaPlus, FaHistory, FaTicketAlt, FaShieldAlt, FaClock, FaCheckCircle } from 'react-icons/fa';

const options = [
  {
    icon: <FaPlus />,
    label: 'Crear Ticket',
    desc: 'Reporta un nuevo problema o solicitud de soporte técnico.',
    path: '/ticket',
    cls: 'ht-card--create',
  },
  {
    icon: <FaHistory />,
    label: 'Ver Historial',
    desc: 'Consulta el estado y seguimiento de tus tickets anteriores.',
    path: '/historial-ticket',
    cls: 'ht-card--history',
  },
];

function HomeTicket() {
  const navigate = useNavigate();

  return (
    <div className="ht-page">

      <img src={logo} alt="" className="ht-watermark" aria-hidden="true" />
      <div className="ht-blob ht-blob--1" />
      <div className="ht-blob ht-blob--2" />

      {/* Header */}
      <header className="ht-header">
        <button className="ht-back" onClick={() => navigate('/home')}>
          <FaArrowLeft /> Servicios
        </button>
        <div className="ht-header-badge">
          <FaTicketAlt />
          <span>Gestión de Tickets</span>
        </div>
      </header>

      {/* Hero */}
      <section className="ht-hero">
        <span className="ht-eyebrow">✦ Soporte técnico en Cali ✦</span>
        <h1 className="ht-title">
          Gestión de{' '}
          <span className="ht-glow">Tickets de Soporte</span>
        </h1>
        <p className="ht-desc">
          Crea un nuevo ticket de soporte o consulta el historial
          de tus solicitudes anteriores.
        </p>
      </section>

      {/* Opciones */}
      <div className="ht-grid">
        {options.map((opt, i) => (
          <div
            key={i}
            className={`ht-card ${opt.cls}`}
            style={{ animationDelay: `${i * 0.12}s` }}
            onClick={() => navigate(opt.path)}
            role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && navigate(opt.path)}
          >
            <div className="ht-card-icon">{opt.icon}</div>
            <h2 className="ht-card-label">{opt.label}</h2>
            <p className="ht-card-desc">{opt.desc}</p>
            <span className="ht-card-arrow">Ir →</span>
          </div>
        ))}
      </div>

      {/* Info pills */}
      <div className="ht-pills">
        {[
          { icon: <FaShieldAlt />,   text: 'Soporte seguro y confiable' },
          { icon: <FaClock />,       text: 'Respuesta en menos de 24h' },
          { icon: <FaCheckCircle />, text: 'Seguimiento en tiempo real' },
        ].map((p, i) => (
          <div key={i} className="ht-pill">
            <span className="ht-pill-icon">{p.icon}</span>
            <span>{p.text}</span>
          </div>
        ))}
      </div>

      <div className="ht-deco-icon" aria-hidden="true"><FaTicketAlt /></div>
    </div>
  );
}

export default HomeTicket;