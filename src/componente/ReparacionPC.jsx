import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ReparacionPC.css';
import logo from '../assets/mundo.ico';
import { FaArrowLeft, FaCalendarAlt, FaTicketAlt, FaLaptop, FaCheckCircle } from 'react-icons/fa';

const features = [
  'Diagnóstico completo de hardware y software',
  'Verificación y reemplazo de piezas dañadas',
  'Reparación de pantallas y teclados',
  'Limpieza y mantenimiento interno',
  'Recuperación de datos en casos críticos',
  'Garantía en todos los trabajos realizados',
];

function ReparacionPC() {
  const navigate = useNavigate();

  return (
    <div className="rep-page">

      {/* Marca de agua */}
      <img src={logo} alt="" className="rep-watermark" aria-hidden="true" />

      {/* Blobs */}
      <div className="rep-blob rep-blob--1" />
      <div className="rep-blob rep-blob--2" />

      {/* Header */}
      <header className="rep-header">
        <button className="rep-back" onClick={() => navigate('/home')}>
          <FaArrowLeft /> Servicios
        </button>
        <div className="rep-header-badge">
          <FaLaptop />
          <span>Reparación</span>
        </div>
      </header>

      {/* Hero */}
      <section className="rep-hero">
        <span className="rep-eyebrow">✦ Soporte técnico en Cali ✦</span>
        <h1 className="rep-title">
          Reparación de{' '}
          <span className="rep-glow">Portátiles y PC</span>
        </h1>
        <p className="rep-desc">
          Realizamos una variedad de tareas y procedimientos, incluida la verificación de anomalías,
          la limpieza y el reemplazo de piezas y materiales, que ayudan a evitar el mal funcionamiento
          de los equipos informáticos y a mantenerlos funcionando según sus capacidades.
        </p>
      </section>

      {/* Contenido: imagen + features */}
      <div className="rep-content">

        {/* Imagen */}
        <div className="rep-img-wrap">
          <img src="/image adentro/reparacion.png" alt="Reparación de Portátiles y PC" className="rep-img" />
          <div className="rep-img-glow" />
        </div>

        {/* Features + botones */}
        <div className="rep-features">
          <p className="rep-features-label">¿Qué incluye el servicio?</p>
          <ul className="rep-list">
            {features.map((f, i) => (
              <li key={i} className="rep-list-item" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
                <FaCheckCircle className="rep-check" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Botones */}
          <div className="rep-btns">
            <button className="rep-btn rep-btn--primary" onClick={() => navigate('/agendar-cita')}>
              <FaCalendarAlt /> Agendar Cita
            </button>
            <button className="rep-btn rep-btn--secondary" onClick={() => navigate('/home-ticket')}>
              <FaTicketAlt /> Gestionar Ticket
            </button>
            <button className="rep-btn rep-btn--outline" onClick={() => navigate('/home')}>
              <FaArrowLeft /> Volver a Servicios
            </button>
          </div>
        </div>

      </div>

      {/* Ícono decorativo */}
      <div className="rep-deco-icon" aria-hidden="true">
        <FaLaptop />
      </div>

    </div>
  );
}

export default ReparacionPC;