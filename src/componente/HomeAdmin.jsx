import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeAdmin.css';
import HistorialTicketAdmin from './HistorialTicketAdmin';
import HistorialCitasAdmin from './HistorialCitasAdmin';

function HomeAdmin() {
  const navigate = useNavigate();
  const [view, setView] = useState('');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="home-admin">
      <h1>Panel de Administración</h1>
      <div className="admin-buttons">
        <button onClick={() => setView('ticket-admin')}>Ver Historial de Tickets</button>
        <button onClick={() => setView('citas-admin')}>Ver Historial de Citas</button>
      </div>

      {view === 'ticket-admin' && <HistorialTicketAdmin />}
      {view === 'citas-admin' && <HistorialCitasAdmin/>}

      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default HomeAdmin;
