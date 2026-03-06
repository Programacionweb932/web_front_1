import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Mantenimiento.css';
import logo from '../assets/mundo.ico';
import { FaArrowLeft, FaCalendarAlt, FaTicketAlt, FaShieldAlt, FaWrench, FaCheckCircle } from 'react-icons/fa';

const features = [
  'Limpieza interna de polvo y residuos',
  'Revisión de temperatura y ventilación',
  'Actualización de drivers y sistema operativo',
  'Diagnóstico completo de hardware',
  'Optimización de rendimiento',
  'Reporte detallado del estado del equipo',
];

function Mantenimiento() {
  const navigate = useNavigate();

  return (
    <div className="mnt-page">

      {/* Marca de agua logo */}
      <img src={logo} alt="" className="mnt-watermark" aria-hidden="true" />

      {/* Blobs */}
      <div className="mnt-blob mnt-blob--1" />
      <div className="mnt-blob mnt-blob--2" />

      {/* Topbar */}
      <header className="mnt-header">
        <button className="mnt-back" onClick={() => navigate('/home')}>
          <FaArrowLeft /> Servicios
        </button>
        <div className="mnt-header-badge">
          <FaShieldAlt />
          <span>Mantenimiento</span>
        </div>
      </header>

      {/* Hero */}
      <section className="mnt-hero">
        <span className="mnt-eyebrow">✦ Soporte técnico en Cali ✦</span>
        <h1 className="mnt-title">
          Mantenimiento{' '}
          <span className="mnt-glow">Preventivo y Correctivo</span>
        </h1>
        <p className="mnt-desc">
          El mantenimiento preventivo se realiza a equipos en funcionamiento con el fin de prevenir
          posibles daños causados por uso o desgaste, a diferencia del mantenimiento correctivo que
          repara aquellos que dejan de funcionar o están dañados.
        </p>
      </section>

      {/* Contenido principal: imagen + features */}
      <div className="mnt-content">

        {/* Imagen */}
        <div className="mnt-img-wrap">
          <img src="/image/img1.png" alt="Mantenimiento de equipos" className="mnt-img" />
          <div className="mnt-img-glow" />
        </div>

        {/* Features */}
        <div className="mnt-features">
          <p className="mnt-features-label">¿Qué incluye el servicio?</p>
          <ul className="mnt-list">
            {features.map((f, i) => (
              <li key={i} className="mnt-list-item" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
                <FaCheckCircle className="mnt-check" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Botones */}
          <div className="mnt-btns">
            <button className="mnt-btn mnt-btn--primary" onClick={() => navigate('/agendar-cita')}>
              <FaCalendarAlt /> Agendar Cita
            </button>
            <button className="mnt-btn mnt-btn--secondary" onClick={() => navigate('/home-ticket')}>
              <FaTicketAlt /> Gestionar Ticket
            </button>
            <button className="mnt-btn mnt-btn--outline" onClick={() => navigate('/home')}>
              <FaArrowLeft /> Volver a Servicios
            </button>
          </div>
        </div>

      </div>

      {/* Ícono decorativo grande */}
      <div className="mnt-deco-icon" aria-hidden="true">
        <FaWrench />
      </div>

    </div>
  );
}

export default Mantenimiento;