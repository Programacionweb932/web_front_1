import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InstalacionOS.css';
import logo from '../assets/mundo.ico';
import { FaArrowLeft, FaCalendarAlt, FaTicketAlt, FaDesktop, FaCheckCircle } from 'react-icons/fa';

const features = [
  'Instalación de Windows 10 / 11 o Linux',
  'Configuración inicial del sistema operativo',
  'Instalación de drivers y controladores',
  'Activación y licenciamiento del SO',
  'Optimización de rendimiento post-instalación',
  'Copia de seguridad de datos antes del proceso',
];

function InstalacionOS({ setView }) {
  const navigate = useNavigate();

  return (
    <div className="ios-page">

      {/* Marca de agua */}
      <img src={logo} alt="" className="ios-watermark" aria-hidden="true" />

      {/* Blobs */}
      <div className="ios-blob ios-blob--1" />
      <div className="ios-blob ios-blob--2" />

      {/* Header */}
      <header className="ios-header">
        <button className="ios-back" onClick={() => navigate('/home')}>
          <FaArrowLeft /> Servicios
        </button>
        <div className="ios-header-badge">
          <FaDesktop />
          <span>Sistemas Operativos</span>
        </div>
      </header>

      {/* Hero */}
      <section className="ios-hero">
        <span className="ios-eyebrow">✦ Soporte técnico en Cali ✦</span>
        <h1 className="ios-title">
          Instalación de{' '}
          <span className="ios-glow">Sistemas Operativos</span>
        </h1>
        <p className="ios-desc">
          Si su computadora funciona con lentitud, actualizaremos y reinstalaremos el sistema
          operativo para resolver los problemas de rendimiento. Desde la instalación y
          configuración hasta la optimización y resolución de problemas.
        </p>
      </section>

      {/* Contenido: imagen + features */}
      <div className="ios-content">

        {/* Imagen */}
        <div className="ios-img-wrap">
          <img src="/image/sistemasOperativos.jpg" alt="Instalación de Sistemas Operativos" className="ios-img" />
          <div className="ios-img-glow" />
        </div>

        {/* Features + botones */}
        <div className="ios-features">
          <p className="ios-features-label">¿Qué incluye el servicio?</p>
          <ul className="ios-list">
            {features.map((f, i) => (
              <li key={i} className="ios-list-item" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
                <FaCheckCircle className="ios-check" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Botones */}
          <div className="ios-btns">
            <button className="ios-btn ios-btn--primary" onClick={() => navigate('/agendar-cita')}>
              <FaCalendarAlt /> Agendar Cita
            </button>
            <button className="ios-btn ios-btn--secondary" onClick={() => navigate('/home-ticket')}>
              <FaTicketAlt /> Gestionar Ticket
            </button>
            <button className="ios-btn ios-btn--outline" onClick={() => navigate('/home')}>
              <FaArrowLeft /> Volver a Servicios
            </button>
          </div>
        </div>

      </div>

      {/* Ícono decorativo */}
      <div className="ios-deco-icon" aria-hidden="true">
        <FaDesktop />
      </div>

    </div>
  );
}

export default InstalacionOS;