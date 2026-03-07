import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HistorialCitasPorUsuario.css';
import logo from '../assets/mundo.ico';
import {
  FaArrowLeft, FaSearch, FaCalendarAlt, FaClock,
  FaTools, FaMapMarkerAlt, FaStickyNote, FaUser,
  FaTimesCircle, FaCheckCircle, FaHourglassHalf, FaEnvelope
} from 'react-icons/fa';

const statusConfig = {
  reservada:  { label: 'Reservada',  icon: <FaHourglassHalf />, cls: 'hc-badge--pending'   },
  cancelada:  { label: 'Cancelada',  icon: <FaTimesCircle />,   cls: 'hc-badge--cancelled' },
  completada: { label: 'Completada', icon: <FaCheckCircle />,   cls: 'hc-badge--done'      },
};

const HistorialCitasPorUsuario = () => {
  const navigate  = useNavigate();
  const [email,   setEmail]   = useState('');
  const [citas,   setCitas]   = useState([]);
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCitas([]); setError(''); setLoading(true);
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/agenda/my-appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Error al obtener las citas.'); return; }
      if (data.citas.length === 0) setError('No se encontraron citas para este correo.');
      else setCitas(data.citas);
    } catch { setError('Error de red al obtener las citas.'); }
    finally { setLoading(false); }
  };

  const handleCancelar = async (id) => {
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/agenda/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ citaId: id }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Error al cancelar la cita.'); return; }
      setCitas(prev => prev.map(c => c._id === id ? { ...c, status: 'cancelada' } : c));
    } catch { setError('Error de red al cancelar la cita.'); }
  };

  return (
    <div className="hcp-page">

      <img src={logo} alt="" className="hcp-watermark" aria-hidden="true" />
      <div className="hcp-blob hcp-blob--1" />
      <div className="hcp-blob hcp-blob--2" />

      {/* Header */}
      <header className="hcp-header">
        <button className="hcp-back" onClick={() => navigate('/agendar-cita')}>
          <FaArrowLeft /> Agendar Cita
        </button>
        <div className="hcp-header-badge">
          <FaCalendarAlt />
          <span>Mis Citas</span>
        </div>
      </header>

      <div className="hcp-content">

        {/* Panel izquierdo */}
        <div className="hcp-info-panel">
          <span className="hcp-eyebrow">✦ Soporte técnico en Cali ✦</span>
          <h1 className="hcp-title">
            Consulta tus{' '}
            <span className="hcp-glow">Citas Agendadas</span>
          </h1>
          <p className="hcp-desc">
            Ingresa tu correo electrónico para ver el historial de todas
            tus citas, su estado actual y cancelarlas si lo necesitas.
          </p>

          <ul className="hcp-tips">
            {[
              'Busca por correo registrado',
              'Cancela citas con estado Reservada',
              'Consulta fecha, hora y servicio',
              'Historial completo disponible',
            ].map((t, i) => (
              <li key={i} className="hcp-tip-item">
                <FaCheckCircle className="hcp-tip-icon" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Panel derecho — blanco */}
        <div className="hcp-right">

          {/* Formulario de búsqueda */}
          <div className="hcp-search-card">
            <h2 className="hcp-card-title">Buscar mis citas</h2>
            <form onSubmit={handleSubmit} className="hcp-form">
              <div className="hcp-field">
                <label htmlFor="hcp-email">
                  <FaEnvelope className="hcp-field-icon" /> Correo electrónico
                </label>
                <input
                  id="hcp-email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="hcp-btn hcp-btn--search" disabled={loading}>
                {loading
                  ? <span className="hcp-spinner" />
                  : <><FaSearch /> Buscar Citas</>}
              </button>
            </form>

            {error && <p className="hcp-error">⚠ {error}</p>}
          </div>

          {/* Lista de citas */}
          {citas.length > 0 && (
            <div className="hcp-list">
              <p className="hcp-list-label">
                {citas.length} cita{citas.length !== 1 ? 's' : ''} encontrada{citas.length !== 1 ? 's' : ''}
              </p>

              {citas.map((cita, i) => {
                const st = statusConfig[cita.status] || statusConfig.reservada;
                return (
                  <div key={cita._id} className="hcp-card"
                    style={{ animationDelay: `${i * 0.07}s` }}>

                    {/* Header de la card */}
                    <div className="hcp-card-head">
                      <div className="hcp-card-date">
                        <FaCalendarAlt className="hcp-ci" />
                        <span>{new Date(cita.date).toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <FaClock className="hcp-ci" />
                        <span>{cita.hora}</span>
                      </div>
                      <span className={`hcp-badge ${st.cls}`}>
                        {st.icon} {st.label}
                      </span>
                    </div>

                    {/* Datos */}
                    <div className="hcp-card-body">
                      <div className="hcp-card-row">
                        <FaUser className="hcp-ci hcp-ci--muted" />
                        <span><strong>Nombre:</strong> {cita.name}</span>
                      </div>
                      <div className="hcp-card-row">
                        <FaTools className="hcp-ci hcp-ci--muted" />
                        <span><strong>Servicio:</strong> {cita.tipoServicio}</span>
                      </div>
                      <div className="hcp-card-row">
                        <FaMapMarkerAlt className="hcp-ci hcp-ci--muted" />
                        <span><strong>Dirección:</strong> {cita.direccion || 'No especificada'}</span>
                      </div>
                      {cita.observacion && (
                        <div className="hcp-card-row">
                          <FaStickyNote className="hcp-ci hcp-ci--muted" />
                          <span><strong>Observación:</strong> {cita.observacion}</span>
                        </div>
                      )}
                    </div>

                    {/* Cancelar */}
                    {cita.status === 'reservada' && (
                      <button className="hcp-cancel-btn"
                        onClick={() => handleCancelar(cita._id)}>
                        <FaTimesCircle /> Cancelar cita
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

      <div className="hcp-deco-icon" aria-hidden="true"><FaCalendarAlt /></div>
    </div>
  );
};

export default HistorialCitasPorUsuario;