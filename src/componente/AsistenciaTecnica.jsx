import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AsistenciaTecnica.css';
import logo from '../assets/mundo.ico';
import { FaArrowLeft, FaCalendarAlt, FaTicketAlt, FaHeadset, FaCheckCircle } from 'react-icons/fa';

const features = [
  'Soporte remoto vía software especializado',
  'Asistencia telefónica y videollamada',
  'Resolución de problemas sin desplazamiento',
  'Configuración y ajuste remoto del sistema',
  'Atención rápida en horario extendido',
  'Seguimiento y cierre de incidencias',
];

function AsistenciaTecnica({ setView }) {
  const navigate = useNavigate();

  return (
    <div className="ast-page">

      {/* Marca de agua */}
      <img src={logo} alt="" className="ast-watermark" aria-hidden="true" />

      {/* Blobs */}
      <div className="ast-blob ast-blob--1" />
      <div className="ast-blob ast-blob--2" />

      {/* Header */}
      <header className="ast-header">
        <button className="ast-back" onClick={() => navigate('/home')}>
          <FaArrowLeft /> Servicios
        </button>
        <div className="ast-header-badge">
          <FaHeadset />
          <span>Asistencia Remota</span>
        </div>
      </header>

      {/* Hero */}
      <section className="ast-hero">
        <span className="ast-eyebrow">✦ Soporte técnico en Cali ✦</span>
        <h1 className="ast-title">
          Asistencia{' '}
          <span className="ast-glow">Técnica y Remota</span>
        </h1>
        <p className="ast-desc">
          Es un servicio que brindamos al usuario con el fin de dar soporte o asesorar mediante
          vía telefónica o software sin importar la distancia que se encuentre.
        </p>
      </section>

      {/* Contenido: imagen + features */}
      <div className="ast-content">

        {/* Imagen */}
        <div className="ast-img-wrap">
          <img src="/image adentro/asistencia.png" alt="Asistencia Técnica y Remota" className="ast-img" />
          <div className="ast-img-glow" />
        </div>

        {/* Features + botones */}
        <div className="ast-features">
          <p className="ast-features-label">¿Qué incluye el servicio?</p>
          <ul className="ast-list">
            {features.map((f, i) => (
              <li key={i} className="ast-list-item" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
                <FaCheckCircle className="ast-check" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Botones */}
          <div className="ast-btns">
            <button className="ast-btn ast-btn--primary" onClick={() => navigate('/agendar-cita')}>
              <FaCalendarAlt /> Agendar Cita
            </button>
            <button className="ast-btn ast-btn--secondary" onClick={() => navigate('/home-ticket')}>
              <FaTicketAlt /> Gestionar Ticket
            </button>
            <button className="ast-btn ast-btn--outline" onClick={() => navigate('/home')}>
              <FaArrowLeft /> Volver a Servicios
            </button>
          </div>
        </div>

      </div>

      {/* Ícono decorativo */}
      <div className="ast-deco-icon" aria-hidden="true">
        <FaHeadset />
      </div>

    </div>
  );
}

export default AsistenciaTecnica;