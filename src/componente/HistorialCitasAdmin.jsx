import React, { useEffect, useState } from 'react';
import '../styles/HistorialCitasAdmin.css';
import logo from '../assets/mundo.ico';
import {
  FaArrowLeft, FaSignOutAlt, FaShieldAlt, FaCalendarCheck,
  FaUser, FaEnvelope, FaCalendarAlt, FaClock, FaTools,
  FaMapMarkerAlt, FaStickyNote, FaCheckCircle,
  FaHourglassHalf, FaTimesCircle
} from 'react-icons/fa';

const statusConfig = {
  reservada:  { label: 'Reservada',  icon: <FaHourglassHalf />, cls: 'hca-badge--pending'   },
  completada: { label: 'Completada', icon: <FaCheckCircle />,   cls: 'hca-badge--done'      },
  cancelada:  { label: 'Cancelada',  icon: <FaTimesCircle />,   cls: 'hca-badge--cancelled' },
};

function HistorialCitasAdmin() {
  const [appointments, setAppointments] = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [message,      setMessage]      = useState('');
  const [msgType,      setMsgType]      = useState('info');

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/agenda/historial-citas`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Error al obtener las citas.');
        setAppointments(data.appointments || []);
        if (!data.appointments?.length) { setMessage('No se encontraron citas registradas.'); setMsgType('info'); }
      } catch (err) { setMessage(err.message); setMsgType('error'); }
      finally { setLoading(false); }
    };
    fetchAppointments();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const handleBack = () => window.history.back();

  return (
    <div className="hca-page">

      <img src={logo} alt="" className="hca-watermark" aria-hidden="true" />
      <div className="hca-blob hca-blob--1" />
      <div className="hca-blob hca-blob--2" />

      {/* Header */}
      <header className="hca-header">
        <div className="hca-brand">
          <FaShieldAlt className="hca-brand-icon" />
          <span>Panel Admin · Citas</span>
        </div>
        <div className="hca-header-actions">
          <button className="hca-btn-header hca-btn-back" onClick={handleBack}>
            <FaArrowLeft /> Volver
          </button>
          <button className="hca-btn-header hca-btn-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hca-hero">
        <h1 className="hca-title">
          Historial de{' '}
          <span className="hca-glow">Citas Agendadas</span>
        </h1>
        <p className="hca-sub">
          Consulta y monitorea todas las citas registradas por los clientes en la plataforma.
        </p>
      </section>

      {/* Stats */}
      {appointments.length > 0 && (
        <div className="hca-stats">
          <div className="hca-stat">
            <FaCalendarCheck />
            <span><strong>{appointments.length}</strong> citas en total</span>
          </div>
          <div className="hca-stat hca-stat--done">
            <FaCheckCircle />
            <span><strong>{appointments.filter(a => a.status === 'completada').length}</strong> completadas</span>
          </div>
          <div className="hca-stat hca-stat--pending">
            <FaHourglassHalf />
            <span><strong>{appointments.filter(a => a.status === 'reservada').length}</strong> pendientes</span>
          </div>
        </div>
      )}

      {/* Mensajes */}
      {loading && <p className="hca-msg hca-msg--info">⏳ Cargando citas...</p>}
      {message && <p className={`hca-msg hca-msg--${msgType}`}>{message}</p>}

      {/* Tabla desktop */}
      {appointments.length > 0 && (
        <div className="hca-table-wrap">
          <table className="hca-table">
            <thead>
              <tr>
                <th><FaUser /> Nombre</th>
                <th><FaEnvelope /> Email</th>
                <th><FaCalendarAlt /> Fecha</th>
                <th><FaClock /> Hora</th>
                <th><FaTools /> Servicio</th>
                <th><FaMapMarkerAlt /> Dirección</th>
                <th><FaStickyNote /> Observación</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((cita, i) => {
                const st = statusConfig[cita.status] || statusConfig.reservada;
                return (
                  <tr key={cita._id} style={{ animationDelay: `${i * 0.04}s` }}>
                    <td className="hca-td-name">{cita.name}</td>
                    <td className="hca-td-email">{cita.email}</td>
                    <td className="hca-td-date">
                      {new Date(cita.date).toLocaleDateString('es-CO', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td>{cita.hora}</td>
                    <td className="hca-td-service">{cita.tipoServicio}</td>
                    <td className="hca-td-addr">{cita.direccion || 'No especificada'}</td>
                    <td className="hca-td-obs">{cita.observacion || '—'}</td>
                    <td>
                      <span className={`hca-badge ${st.cls}`}>
                        {st.icon} {st.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Cards móvil */}
      {appointments.length > 0 && (
        <div className="hca-mobile-cards">
          {appointments.map((cita, i) => {
            const st = statusConfig[cita.status] || statusConfig.reservada;
            return (
              <div key={cita._id} className="hca-mobile-card"
                style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="hca-mobile-head">
                  <span className="hca-td-name">{cita.name}</span>
                  <span className={`hca-badge ${st.cls}`}>{st.icon} {st.label}</span>
                </div>
                <p><FaEnvelope className="hca-row-icon" /> {cita.email}</p>
                <p><FaCalendarAlt className="hca-row-icon" />
                  {new Date(cita.date).toLocaleDateString('es-CO')} · {cita.hora}
                </p>
                <p><FaTools className="hca-row-icon" /> {cita.tipoServicio}</p>
                <p><FaMapMarkerAlt className="hca-row-icon" /> {cita.direccion || 'No especificada'}</p>
                {cita.observacion && (
                  <p><FaStickyNote className="hca-row-icon" /> {cita.observacion}</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="hca-deco-icon" aria-hidden="true"><FaCalendarCheck /></div>
    </div>
  );
}

export default HistorialCitasAdmin;