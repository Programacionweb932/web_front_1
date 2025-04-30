import React, { useEffect, useState } from 'react';
import '../styles/HistorialCitasAdmin.css';

function HistorialCitasAdmin() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/agenda/historial-citas`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al obtener las citas.');
        setAppointments(data.appointments || []);
        setMessage(data.appointments?.length ? '' : 'No se encontraron citas.');
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <section>
      <h2>Historial de Citas</h2>
      {loading && <p>Cargando citas...</p>}
      {message && <p>{message}</p>}
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Servicio</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((cita) => (
            <tr key={cita._id}>
              <td>{cita.name}</td>
              <td>{cita.email}</td>
              <td>{cita.date}</td>
              <td>{cita.hora}</td>
              <td>{cita.tipoServicio}</td>
              <td>{cita.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default HistorialCitasAdmin;
