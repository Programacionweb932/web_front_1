import React, { useState, useEffect } from 'react';
import '../styles/AgendarCita.css';
import { useNavigate } from 'react-router-dom';

const AgendarCita = ({ setView }) => {
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [hora, setHora] = useState('');
  const [tipoServicio, setTipoServicio] = useState('');
  const [availableHours, setAvailableHours] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Opciones de tipos de servicio
  const servicios = [
    'Mantenimiento Preventivo y Correctivo',
    'Instalación de Sistemas Operativos',
    'Reparación de Portátiles y PC',
    'Asistencia Técnica y Remota',
    'Instalación de Paquetes Microsoft Office',
    'Otro',
  ];

  // Función para obtener las horas disponibles
  const fetchAvailableHours = async (selectedDate) => {
    try {
      const response = await fetch(`https://web-back-p.vercel.app/api/agenda/hours`);
      if (!response.ok) {
        throw new Error('Error al obtener las horas disponibles');
      }
      const data = await response.json();
      setAvailableHours(data.availableHours);
    } catch (error) {
      console.error(error.message);
      setAvailableHours([]);
    }
  };

  // Manejar el cambio de fecha y actualizar las horas disponibles
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setHora('');
    fetchAvailableHours(selectedDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!name || !email || !date || !hora || !tipoServicio) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Validación de fecha no menor a la actual
    const currentDate = new Date();
    const selectedDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0); // Ignorar horas para la validación

    if (selectedDate < currentDate) {
      setError('La fecha de la cita no puede ser anterior a la fecha actual.');
      return;
    }

    // Validación para no permitir domingos
    const dayOfWeek = selectedDate.getDay(); // 0 es domingo
    if (dayOfWeek === 0) {
      setError('No se pueden generar citas los domingos.');
      return;
    }

    // Si todas las validaciones pasan
    setError('');
    try {
      const response = await fetch('https://web-back-p.vercel.app/api/agenda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          hora,
          email,
          name,
          tipoServicio,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al agendar la cita');
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage(error.message || 'Error al agendar la cita');
    }
  };

  return (
    <div className="agendar-cita-container">
      <h2>Agendar Cita</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group-cita">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group-cita">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group-cita">
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>
        <div className="form-group-cita">
          <label htmlFor="hora">Hora:</label>
          <select
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
            disabled={!date || availableHours.length === 0}
          >
            <option value="">Seleccione una hora</option>
            {availableHours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group-cita">
          <label htmlFor="tipoServicio">Tipo de Servicio:</label>
          <select
            id="tipoServicio"
            value={tipoServicio}
            onChange={(e) => setTipoServicio(e.target.value)}
            required
          >
            <option value="">Seleccione un servicio</option>
            {servicios.map((servicio) => (
              <option key={servicio} value={servicio}>
                {servicio}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={!hora}>
          Generar Cita
        </button>
      </form>

      {error && <p className="error-message">{error}</p>} {/* Mostrar mensajes de error */}
      {message && <p>{message}</p>} {/* Mostrar mensajes de éxito */}

      {/* Botón para regresar */}
      <button className="go-home-button" onClick={() => navigate('/home')}>
        Volver
      </button>
    </div>
  );
};

export default AgendarCita;
