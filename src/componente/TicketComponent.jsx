import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TicketComponent.css';
import logo from '../assets/mundo.ico';
import {
  FaArrowLeft, FaTicketAlt, FaUser, FaEnvelope,
  FaTags, FaAlignLeft, FaPaperPlane, FaCheckCircle,
  FaShieldAlt, FaClock, FaBell
} from 'react-icons/fa';

const temas = [
  'Consulta sobre el uso',
  'Problema técnico',
  'Otro',
];

const TicketComponent = ({ setView }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', subject: '', description: '' });
  const [formErrors, setFormErrors] = useState({});
  const [ticket, setTicket]   = useState(null);
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setFormErrors(fe => ({ ...fe, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name)        errs.name        = 'El nombre es obligatorio';
    if (!form.email)       errs.email       = 'El correo es obligatorio';
    if (!form.subject)     errs.subject     = 'El tema es obligatorio';
    if (!form.description) errs.description = 'La descripción es obligatoria';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true); setError(null);
    try {
      const res  = await fetch('https://web-back-1.vercel.app/api/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al generar el ticket');
      setTicket(data.ticket);
      setForm({ name: '', email: '', subject: '', description: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tc-page">

      <img src={logo} alt="" className="tc-watermark" aria-hidden="true" />
      <div className="tc-blob tc-blob--1" />
      <div className="tc-blob tc-blob--2" />

      {/* Header */}
      <header className="tc-header">
        <button className="tc-back" onClick={() => navigate('/home-ticket')}>
          <FaArrowLeft /> Gestión de Tickets
        </button>
        <div className="tc-header-badge">
          <FaTicketAlt />
          <span>Nuevo Ticket</span>
        </div>
      </header>

      {/* Contenido */}
      <div className="tc-content">

        {/* Panel izquierdo */}
        <div className="tc-info-panel">
          <span className="tc-eyebrow">✦ Soporte técnico en Cali ✦</span>
          <h1 className="tc-title">
            Crear Ticket de{' '}
            <span className="tc-glow">Soporte</span>
          </h1>
          <p className="tc-desc">
            Completa el formulario y nuestro equipo técnico atenderá
            tu solicitud lo antes posible.
          </p>

          <ul className="tc-tips">
            {[
              { icon: <FaShieldAlt />, text: 'Tu solicitud es confidencial' },
              { icon: <FaClock />,     text: 'Respuesta en menos de 24 horas' },
              { icon: <FaBell />,      text: 'Notificación por correo al resolverse' },
              { icon: <FaCheckCircle />, text: 'Seguimiento en tiempo real' },
            ].map((t, i) => (
              <li key={i} className="tc-tip-item">
                <span className="tc-tip-icon">{t.icon}</span>
                <span>{t.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Formulario — card blanca */}
        <div className="tc-form-card">

          {/* Éxito */}
          {ticket && (
            <div className="tc-success-banner">
              <FaCheckCircle className="tc-success-icon" />
              <div>
                <p className="tc-success-title">¡Ticket generado exitosamente!</p>
                <p className="tc-success-sub">Recibirás una respuesta en tu correo pronto.</p>
              </div>
            </div>
          )}

          <h2 className="tc-card-title">Datos del ticket</h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="tc-fields-grid">

              {/* Nombre */}
              <div className={`tc-field ${formErrors.name ? 'tc-field--error' : ''}`}>
                <label htmlFor="tc-name">
                  <FaUser className="tc-field-icon" /> Nombre
                </label>
                <input id="tc-name" type="text" value={form.name}
                  onChange={set('name')} placeholder="Tu nombre completo" />
                {formErrors.name && <span className="tc-error-text">{formErrors.name}</span>}
              </div>

              {/* Email */}
              <div className={`tc-field ${formErrors.email ? 'tc-field--error' : ''}`}>
                <label htmlFor="tc-email">
                  <FaEnvelope className="tc-field-icon" /> Correo electrónico
                </label>
                <input id="tc-email" type="email" value={form.email}
                  onChange={set('email')} placeholder="correo@ejemplo.com" />
                {formErrors.email && <span className="tc-error-text">{formErrors.email}</span>}
              </div>

              {/* Tema — ancho completo */}
              <div className={`tc-field tc-field--full ${formErrors.subject ? 'tc-field--error' : ''}`}>
                <label htmlFor="tc-subject">
                  <FaTags className="tc-field-icon" /> Tema
                </label>
                <select id="tc-subject" value={form.subject} onChange={set('subject')}>
                  <option value="">Selecciona un tema</option>
                  {temas.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                {formErrors.subject && <span className="tc-error-text">{formErrors.subject}</span>}
              </div>

              {/* Descripción — ancho completo */}
              <div className={`tc-field tc-field--full ${formErrors.description ? 'tc-field--error' : ''}`}>
                <label htmlFor="tc-desc">
                  <FaAlignLeft className="tc-field-icon" /> Descripción
                </label>
                <textarea id="tc-desc" value={form.description}
                  onChange={set('description')} rows={5}
                  placeholder="Describe detalladamente tu problema o consulta..." />
                {formErrors.description && <span className="tc-error-text">{formErrors.description}</span>}
              </div>

            </div>

            {error && <p className="tc-error-msg">⚠ {error}</p>}

            <div className="tc-btns">
              <button type="submit" className="tc-btn tc-btn--submit" disabled={loading}>
                {loading ? <span className="tc-spinner" /> : <><FaPaperPlane /> Enviar Ticket</>}
              </button>
              <button type="button" className="tc-btn tc-btn--outline"
                onClick={() => navigate('/home-ticket')}>
                <FaArrowLeft /> Volver
              </button>
            </div>

          </form>
        </div>

      </div>

      <div className="tc-deco-icon" aria-hidden="true"><FaTicketAlt /></div>
    </div>
  );
};

export default TicketComponent;