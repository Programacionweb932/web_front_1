import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeAdmin.css';

function HomeAdmin() {
  const [tickets, setTickets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/login');
    } else {
      fetchTickets();
      fetchAppointments();
    }
  }, [navigate]);

  const handleBack = () => {
    navigate('/panel-admin'); // O usa navigate('/ruta-destino') si quieres una ruta específica
  };

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://web-back-p.vercel.app/api/tickets/all', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al obtener los tickets.');
      setTickets(data.tickets || []);
      setMessage(data.tickets?.length ? '' : 'No se encontraron tickets.');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

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

  const updateTicket = async (ticketId, status, adminDescription) => {
    if (!status && !adminDescription) {
      return setMessage('Debe proporcionar al menos un campo para actualizar.');
    }

    try {
      const response = await fetch('https://web-back-p.vercel.app/api/tickets/actualizar-estado', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ ticketId, status, adminDescription }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al actualizar el ticket.');
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === ticketId
            ? { ...ticket, status: data.ticket.status, adminDescription: data.ticket.adminDescription }
            : ticket
        )
      );
      setMessage(data.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleFieldChange = (ticketId, field, value) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket._id === ticketId ? { ...ticket, [field]: value } : ticket
      )
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="home-admin">
      <h1>Panel de Administración</h1>
      {loading && <p>Cargando información...</p>}
      {message && <p>{message}</p>}

      <section>
        <h2>Lista de Tickets</h2>
        <table className="ticket-table">
          <thead>
            <tr>
              <th># Ticket</th>
              <th>Cliente</th>
              <th>Tema</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Respuesta</th>
              <th>Actualizar</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.ticketNumber}</td>
                <td>{ticket.name}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.description}</td>
                <td>
                  <select
                    value={ticket.status}
                    onChange={(e) => handleFieldChange(ticket._id, 'status', e.target.value)}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Progreso">En Progreso</option>
                    <option value="Cerrado">Cerrado</option>
                  </select>
                </td>
                <td>
                  <textarea
                    rows="2"
                    value={ticket.adminDescription || ''}
                    onChange={(e) => handleFieldChange(ticket._id, 'adminDescription', e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => updateTicket(ticket._id, ticket.status, ticket.adminDescription)}>
                    Actualizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Historial de Citas</h2>
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

      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>

      <button className="logout-button" onClick={handleBack}>
        Volver
      </button>

    </div>
  );
}

export default HomeAdmin;
