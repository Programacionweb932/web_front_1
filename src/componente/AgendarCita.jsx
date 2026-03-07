import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AgendarCita.css';
import logo from '../assets/mundo.ico';
import {
  FaArrowLeft, FaCalendarAlt, FaHistory,
  FaUser, FaEnvelope, FaClock, FaTools,
  FaMapMarkerAlt, FaStickyNote, FaCheckCircle
} from 'react-icons/fa';

const servicios = [
  'Mantenimiento Preventivo y Correctivo',
  'Instalación de Sistemas Operativos',
  'Reparación de Portátiles y PC',
  'Asistencia Técnica y Remota',
  'Instalación de Paquetes Microsoft Office',
  'Otro',
];

const festivos = ['2025-05-01', '2025-12-25'];

function getDayFromDateString(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day).getDay();
}

function filterHoursForSaturday(hours) {
  return hours.filter(h => parseInt(h.split(':')[0], 10) < 12);
}

function hasTimePassed(selectedDate, selectedTime) {
  const now = new Date();
  const [year, month, day] = selectedDate.split('-').map(Number);
  const [hour, minute] = selectedTime.split(':').map(Number);
  return new Date(year, month - 1, day, hour, minute) <= now;
}

const AgendarCita = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', date: '', hora: '',
    tipoServicio: '', direccion: '', observacion: '',
  });
  const [availableHours, setAvailableHours] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const fetchBookedHours = async (date) => {
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/agenda?date=${date}`);
      const data = await res.json();
      return data.map(c => c.hora);
    } catch { return []; }
  };

  const fetchAvailableHours = async (date) => {
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/agenda/hours?date=${date}`);
      const data = await res.json();
      const booked = await fetchBookedHours(date);
      let filtered = data.availableHours.filter(h => !booked.includes(h));
      if (getDayFromDateString(date) === 6) filtered = filterHoursForSaturday(filtered);
      setAvailableHours(filtered);
    } catch { setAvailableHours([]); }
  };

  const handleDateChange = (e) => {
    const selected = e.target.value;
    setForm(f => ({ ...f, date: selected, hora: '' }));
    setError(''); setMessage(''); setAvailableHours([]);
    if (!selected) return;

    const day = getDayFromDateString(selected);
    if (day === 0)                return setError('No se pueden generar citas los domingos.');
    if (festivos.includes(selected)) return setError('No se pueden generar citas en días festivos.');

    const today = new Date(); today.setHours(0,0,0,0);
    const [y,m,d] = selected.split('-').map(Number);
    if (new Date(y,m-1,d) < today) return setError('No se pueden agendar citas en fechas anteriores.');

    setError('');
    fetchAvailableHours(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, date, hora, tipoServicio, direccion, observacion } = form;
    if (!name || !email || !date || !hora || !tipoServicio || !direccion)
      return setError('Todos los campos excepto observación son obligatorios.');
    const todayStr = new Date().toISOString().split('T')[0];
    if (date === todayStr && hasTimePassed(date, hora))
      return setError('La hora seleccionada ya pasó para el día de hoy.');

    setError(''); setLoading(true);
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/agenda`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, hora, email, name, tipoServicio, direccion, observacion }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else {
        setMessage(data.message);
        setSuccess(true);
        setForm({ name:'', email:'', date:'', hora:'', tipoServicio:'', direccion:'', observacion:'' });
        setAvailableHours([]);
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch { setError('Error al agendar la cita'); }
    finally { setLoading(false); }
  };

  return (
    <div className="ac-page">

      {/* Marca de agua */}
      <img src={logo} alt="" className="ac-watermark" aria-hidden="true" />
      <div className="ac-blob ac-blob--1" />
      <div className="ac-blob ac-blob--2" />

      {/* Header */}
      <header className="ac-header">
        <button className="ac-back" onClick={() => navigate('/home')}>
          <FaArrowLeft /> Servicios
        </button>
        <div className="ac-header-badge">
          <FaCalendarAlt />
          <span>Agendar Cita</span>
        </div>
      </header>

      {/* Contenido */}
      <div className="ac-content">

        {/* Panel izquierdo — info */}
        <div className="ac-info-panel">
          <span className="ac-eyebrow">✦ Soporte técnico en Cali ✦</span>
          <h1 className="ac-title">
            Agenda tu{' '}
            <span className="ac-glow">Cita de Servicio</span>
          </h1>
          <p className="ac-desc">
            Programa una visita con nuestros técnicos. Selecciona la fecha, hora
            y tipo de servicio que necesitas y nosotros nos encargamos del resto.
          </p>

          <ul className="ac-tips">
            {[
              'Atención de lunes a sábado',
              'Sábados solo hasta las 12:00 m',
              'Sin servicio en domingos y festivos',
              'Confirmación por correo electrónico',
            ].map((tip, i) => (
              <li key={i} className="ac-tip-item">
                <FaCheckCircle className="ac-tip-icon" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Formulario */}
        <div className="ac-form-card">
          <form onSubmit={handleSubmit} noValidate>

            <div className="ac-fields-grid">

              {/* Nombre */}
              <div className="ac-field">
                <label htmlFor="ac-name"><FaUser className="ac-field-icon" /> Nombre</label>
                <input id="ac-name" type="text" value={form.name}
                  onChange={set('name')} placeholder="Tu nombre completo" required />
              </div>

              {/* Email */}
              <div className="ac-field">
                <label htmlFor="ac-email"><FaEnvelope className="ac-field-icon" /> Email</label>
                <input id="ac-email" type="email" value={form.email}
                  onChange={set('email')} placeholder="correo@ejemplo.com" required />
              </div>

              {/* Fecha */}
              <div className="ac-field">
                <label htmlFor="ac-date"><FaCalendarAlt className="ac-field-icon" /> Fecha</label>
                <input id="ac-date" type="date" value={form.date}
                  onChange={handleDateChange} required />
              </div>

              {/* Hora */}
              <div className="ac-field">
                <label htmlFor="ac-hora"><FaClock className="ac-field-icon" /> Hora</label>
                <select id="ac-hora" value={form.hora} onChange={set('hora')}
                  disabled={!form.date || availableHours.length === 0} required>
                  <option value="">
                    {!form.date ? 'Selecciona una fecha primero'
                      : availableHours.length === 0 ? 'Sin horas disponibles'
                      : 'Seleccione una hora'}
                  </option>
                  {availableHours.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              {/* Tipo de servicio — ancho completo */}
              <div className="ac-field ac-field--full">
                <label htmlFor="ac-servicio"><FaTools className="ac-field-icon" /> Tipo de Servicio</label>
                <select id="ac-servicio" value={form.tipoServicio}
                  onChange={set('tipoServicio')} required>
                  <option value="">Seleccione un servicio</option>
                  {servicios.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Dirección — ancho completo */}
              <div className="ac-field ac-field--full">
                <label htmlFor="ac-dir"><FaMapMarkerAlt className="ac-field-icon" /> Dirección</label>
                <input id="ac-dir" type="text" value={form.direccion}
                  onChange={set('direccion')} placeholder="Calle, barrio, ciudad" required />
              </div>

              {/* Observación — ancho completo */}
              <div className="ac-field ac-field--full">
                <label htmlFor="ac-obs"><FaStickyNote className="ac-field-icon" /> Observación <span className="ac-optional">(Opcional)</span></label>
                <textarea id="ac-obs" value={form.observacion}
                  onChange={set('observacion')} rows={3}
                  placeholder="Describe brevemente el problema..." />
              </div>

            </div>

            {/* Errores y éxito */}
            {error   && <p className="ac-error">⚠ {error}</p>}
            {message && <p className="ac-success">✓ {message}</p>}

            {/* Botones */}
            <div className="ac-form-btns">
              <button type="submit" className="ac-btn ac-btn--submit"
                disabled={!form.hora || loading}>
                {loading
                  ? <span className="ac-spinner" />
                  : <><FaCalendarAlt /> Generar Cita</>}
              </button>
              <button type="button" className="ac-btn ac-btn--history"
                onClick={() => navigate('/mis-citas')}>
                <FaHistory /> Mis Citas
              </button>
              <button type="button" className="ac-btn ac-btn--outline"
                onClick={() => navigate('/home')}>
                <FaArrowLeft /> Volver
              </button>
            </div>

          </form>
        </div>

      </div>

      <div className="ac-deco-icon" aria-hidden="true"><FaCalendarAlt /></div>
    </div>
  );
};

export default AgendarCita;