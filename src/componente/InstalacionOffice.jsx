import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InstalacionOffice.css';
import logo from '../assets/mundo.ico';
import { FaArrowLeft, FaCalendarAlt, FaTicketAlt, FaFileWord, FaCheckCircle } from 'react-icons/fa';

const features = [
  'Instalación de Word, Excel y PowerPoint',
  'Configuración de cuenta Microsoft 365',
  'Activación y licenciamiento oficial',
  'Instalación de Outlook y Teams',
  'Sincronización con OneDrive',
  'Capacitación básica de uso incluida',
];

function InstalacionOffice({ setView }) {
  const navigate = useNavigate();

  return (
    <div className="off-page">

      {/* Marca de agua */}
      <img src={logo} alt="" className="off-watermark" aria-hidden="true" />

      {/* Blobs */}
      <div className="off-blob off-blob--1" />
      <div className="off-blob off-blob--2" />

      {/* Header */}
      <header className="off-header">
        <button className="off-back" onClick={() => navigate('/home')}>
          <FaArrowLeft /> Servicios
        </button>
        <div className="off-header-badge">
          <FaFileWord />
          <span>Microsoft Office</span>
        </div>
      </header>

      {/* Hero */}
      <section className="off-hero">
        <span className="off-eyebrow">✦ Soporte técnico en Cali ✦</span>
        <h1 className="off-title">
          Instalación de{' '}
          <span className="off-glow">Paquetes Microsoft Office</span>
        </h1>
        <p className="off-desc">
          Instalamos la mejor aplicación de productividad diaria que te ayuda a crear,
          editar y compartir mientras viajas con Word, Excel y PowerPoint.
        </p>
      </section>

      {/* Contenido: imagen + features */}
      <div className="off-content">

        {/* Imagen */}
        <div className="off-img-wrap">
          <img src="/image adentro/office.png" alt="Instalación Microsoft Office" className="off-img" />
          <div className="off-img-glow" />
        </div>

        {/* Features + botones */}
        <div className="off-features">
          <p className="off-features-label">¿Qué incluye el servicio?</p>
          <ul className="off-list">
            {features.map((f, i) => (
              <li key={i} className="off-list-item" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
                <FaCheckCircle className="off-check" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Botones */}
          <div className="off-btns">
            <button className="off-btn off-btn--primary" onClick={() => navigate('/agendar-cita')}>
              <FaCalendarAlt /> Agendar Cita
            </button>
            <button className="off-btn off-btn--secondary" onClick={() => navigate('/home-ticket')}>
              <FaTicketAlt /> Gestionar Ticket
            </button>
            <button className="off-btn off-btn--outline" onClick={() => navigate('/home')}>
              <FaArrowLeft /> Volver a Servicios
            </button>
          </div>
        </div>

      </div>

      {/* Ícono decorativo */}
      <div className="off-deco-icon" aria-hidden="true">
        <FaFileWord />
      </div>

    </div>
  );
}

export default InstalacionOffice;