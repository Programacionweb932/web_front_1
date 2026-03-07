import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HistorialTicket.css';
import logo from '../assets/mundo.ico';
import {
  FaArrowLeft, FaSearch, FaTicketAlt, FaEnvelope,
  FaHashtag, FaClipboardList, FaAlignLeft,
  FaCalendarAlt, FaCommentAlt, FaCheckCircle,
  FaHourglassHalf, FaTimesCircle, FaInfoCircle
} from 'react-icons/fa';

const statusConfig = {
  abierto:    { label: 'Abierto',     icon: <FaHourglassHalf />, cls: 'htk-badge--open'       },
  en_proceso: { label: 'En Proceso',  icon: <FaInfoCircle />,    cls: 'htk-badge--in-progress' },
  resuelto:   { label: 'Resuelto',    icon: <FaCheckCircle />,   cls: 'htk-badge--resolved'    },
  cerrado:    { label: 'Cerrado',     icon: <FaTimesCircle />,   cls: 'htk-badge--closed'      },
};

const HistorialTicket = () => {
  const navigate = useNavigate();
  const [email,   setEmail]   = useState('');
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('userEmail');
    if (saved) setEmail(saved);
  }, []);

  const fetchHistorial = async () => {
    if (!email) { setMessage('El email es obligatorio.'); return; }
    setLoading(true); setMessage(''); setTickets([]);
    try {
      const res = await fetch('https://web-back-1.vercel.app/api/tickets/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al obtener historial');
      if (data.tickets?.length > 0) setTickets(data.tickets);
      else setMessage('No se encontraron tickets para este correo.');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => { e.preventDefault(); fetchHistorial(); };

  return (
    <div className="htk-page">

      <img src={logo} alt="" className="htk-watermark" aria-hidden="true" />
      <div className="htk-blob htk-blob--1" />
      <div className="htk-blob htk-blob--2" />

      {/* Header */}
      <header className="htk-header">
        <button className="htk-back" onClick={() => navigate('/home-ticket')}>
          <FaArrowLeft /> Gestión de Tickets
        </button>
        <div className="htk-header-badge">
          <FaTicketAlt />
          <span>Historial de Tickets</span>
        </div>
      </header>

      {/* Hero */}
      <section className="htk-hero">
        <span className="htk-eyebrow">✦ Soporte técnico en Cali ✦</span>
        <h1 className="htk-title">
          Historial de{' '}
          <span className="htk-glow">Tickets Generados</span>
        </h1>
        <p className="htk-desc">
          Ingresa tu correo para consultar todos los tickets de soporte
          que has generado y su estado actual.
        </p>
      </section>

      {/* Contenido */}
      <div className="htk-content">

        {/* Formulario — card blanca */}
        <div className="htk-search-card">
          <h2 className="htk-card-title">Buscar mis tickets</h2>
          <form onSubmit={handleSubmit} className="htk-form">
            <div className="htk-field">
              <label htmlFor="htk-email">
                <FaEnvelope className="htk-field-icon" /> Correo electrónico
              </label>
              <input
                id="htk-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
            <button type="submit" className="htk-btn htk-btn--search" disabled={loading}>
              {loading ? <span className="htk-spinner" /> : <><FaSearch /> Ver Historial</>}
            </button>
          </form>

          {message && (
            <p className={tickets.length === 0 ? 'htk-error' : 'htk-success'}>
              {tickets.length === 0 ? '⚠ ' : '✓ '}{message}
            </p>
          )}
        </div>

        {/* Tabla de tickets */}
        {tickets.length > 0 && (
          <div className="htk-results">
            <p className="htk-results-label">
              {tickets.length} ticket{tickets.length !== 1 ? 's' : ''} encontrado{tickets.length !== 1 ? 's' : ''}
            </p>

            {/* Tabla desktop */}
            <div className="htk-table-wrap">
              <table className="htk-table">
                <thead>
                  <tr>
                    <th><FaHashtag /> N° Ticket</th>
                    <th><FaClipboardList /> Asunto</th>
                    <th><FaAlignLeft /> Descripción</th>
                    <th>Estado</th>
                    <th><FaCalendarAlt /> Fecha</th>
                    <th><FaCommentAlt /> Respuesta</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((t, i) => {
                    const st = statusConfig[t.status] || statusConfig.abierto;
                    return (
                      <tr key={t._id} style={{ animationDelay: `${i * 0.06}s` }}>
                        <td className="htk-td-num">#{t.ticketNumber}</td>
                        <td className="htk-td-subject">{t.subject}</td>
                        <td className="htk-td-desc">{t.description}</td>
                        <td>
                          <span className={`htk-badge ${st.cls}`}>
                            {st.icon} {st.label}
                          </span>
                        </td>
                        <td>{new Date(t.date).toLocaleDateString('es-CO', { day:'numeric', month:'short', year:'numeric' })}</td>
                        <td className="htk-td-resp">{t.adminDescription || 'Sin respuesta aún'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Cards móvil */}
            <div className="htk-mobile-cards">
              {tickets.map((t, i) => {
                const st = statusConfig[t.status] || statusConfig.abierto;
                return (
                  <div key={t._id} className="htk-mobile-card" style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="htk-mobile-head">
                      <span className="htk-mobile-num">#{t.ticketNumber}</span>
                      <span className={`htk-badge ${st.cls}`}>{st.icon} {st.label}</span>
                    </div>
                    <p><strong>Asunto:</strong> {t.subject}</p>
                    <p><strong>Descripción:</strong> {t.description}</p>
                    <p><strong>Fecha:</strong> {new Date(t.date).toLocaleDateString('es-CO')}</p>
                    <p><strong>Respuesta:</strong> {t.adminDescription || 'Sin respuesta aún'}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      <div className="htk-deco-icon" aria-hidden="true"><FaTicketAlt /></div>
    </div>
  );
};

export default HistorialTicket;