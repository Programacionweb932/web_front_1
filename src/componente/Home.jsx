import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/mundo.ico';

const services = [
  { name: 'Mantenimiento Preventivo y Correctivo',    path: '/mantenimiento',      img: '/image/mantenimiento.jpg', num: '01' },
  { name: 'Instalación de Sistemas Operativos',       path: '/instalacion-os',     img: '/image/sistemaO.png',      num: '02' },
  { name: 'Reparación de Portátiles y PC',            path: '/reparacion',         img: '/image/reparacion.png',    num: '03' },
  { name: 'Asistencia Técnica y Remota',              path: '/asistencia-tecnica', img: '/image/asistencia.png',    num: '04' },
  { name: 'Instalación de Paquetes Microsoft Office', path: '/instalacion-office', img: '/image/office.webp',       num: '05' },
];

function Home({ user, setUser, setView }) {
  const navigate = useNavigate();

  return (
    <div className="hc-wrap">

      {/* Logo marca de agua */}
      <img src={logo} alt="" className="hc-watermark" aria-hidden="true" />

      {/* Topbar */}
      <div className="hc-topbar">
        <div className="hc-brand">
          <img src={logo} alt="logo" className="hc-brand-logo" />
          <span>El Mundo de la Tecnología</span>
        </div>
        <button className="hc-logout" onClick={() => navigate('/')}>
          Cerrar Sesión
        </button>
      </div>

      {/* Hero — sin bordes ni fondos */}
      <div className="hc-hero">
        <span className="hc-tag">✦ Soporte técnico en Cali ✦</span>
        <h1 className="hc-title">
          Bienvenido al
          <br />
          <span className="hc-glow">Mundo de la Tecnología</span>
        </h1>
        <p className="hc-sub">¿Qué servicio deseas hoy?</p>
      </div>

      {/* Grid servicios */}
      <div className="hc-grid">
        {services.map((svc, i) => (
          <div
            key={i}
            className="hc-card"
            style={{ animationDelay: `${i * 0.1}s` }}
            onClick={() => navigate(svc.path)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && navigate(svc.path)}
            aria-label={svc.name}
          >
            {/* Número */}
            <span className="hc-card-num">{svc.num}</span>

            {/* Imagen siempre visible */}
            <div className="hc-img-box">
              <img
                src={svc.img}
                alt={svc.name}
                className="hc-img"
                loading="eager"
              />
              <div className="hc-img-fade" />
            </div>

            {/* Info */}
            <div className="hc-info">
              <p className="hc-name">{svc.name}</p>
              <div className="hc-arrow">
                <span>Ver servicio</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;