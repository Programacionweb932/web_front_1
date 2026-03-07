import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeAdmin.css';
import logo from '../assets/mundo.ico';
import {
  FaArrowLeft, FaSignOutAlt, FaTicketAlt, FaEdit,
  FaSave, FaCheckCircle, FaHourglassHalf, FaTimesCircle,
  FaInfoCircle, FaShieldAlt
} from 'react-icons/fa';

const statusConfig = {
  'Pendiente':   { cls: 'ha-badge--pending',     icon: <FaHourglassHalf /> },
  'En Progreso': { cls: 'ha-badge--in-progress',  icon: <FaInfoCircle />   },
  'Cerrado':     { cls: 'ha-badge--closed',        icon: <FaTimesCircle />  },
  'Resuelto':    { cls: 'ha-badge--resolved',      icon: <FaCheckCircle />  },
};

function HomeAdmin() {
  const navigate = useNavigate();
  const [tickets,          setTickets]          = useState([]);
  const [appointments,     setAppointments]     = useState([]);
  const [loading,          setLoading]          = useState(false);
  const [message,          setMessage]          = useState('');
  const [msgType,          setMsgType]          = useState('info');
  const [editingTicketIds, setEditingTicketIds] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/login');
    } else {
      fetchTickets();
      fetchAppointments();
    }
  }, [navigate]);

  const showMsg = (text, type = 'info') => { setMessage(text); setMsgType(type); };

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://web-back-1.vercel.app/api/tickets/all', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      if (!res.ok) throw new Error('Error al obtener los tickets.');
      const data = await res.json();
      setTickets(data.tickets || []);
      if (!data.tickets?.length) showMsg('No se encontraron tickets.', 'info');
    } catch (err) { showMsg(err.message, 'error'); setTickets([]); }
    finally { setLoading(false); }
  };

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/agenda/historial-citas`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      if (res.status === 401) throw new Error('No autorizado.');
      if (res.status === 404) throw new Error('No se encontraron citas.');
      if (!res.ok)            throw new Error('Error inesperado al obtener las citas.');
      const data = await res.json();
      setAppointments(data.appointments || []);
    } catch { setAppointments([]); }
  };

  const updateTicket = async (ticketId, status, adminDescription) => {
    if (!status && !adminDescription) { showMsg('Proporciona al menos un campo para actualizar.', 'error'); return; }
    setMessage('');
    try {
      const res = await fetch('https://web-back-1.vercel.app/api/tickets/update-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ ticketId, status, adminDescription }),
      });
      if (!res.ok) throw new Error('Error al actualizar el ticket.');
      const data = await res.json();
      setTickets(prev => prev.map(t =>
        t._id === ticketId
          ? { ...t, status: data.ticket.status, adminDescription: data.ticket.adminDescription }
          : t
      ));
      showMsg(data.message || 'Ticket actualizado correctamente.', 'success');
    } catch (err) { showMsg(err.message, 'error'); }
  };

  const handleFieldChange = (id, field, val) =>
    setTickets(prev => prev.map(t => t._id === id ? { ...t, [field]: val } : t));

  const handleEditClick   = (id) => setEditingTicketIds(prev => [...new Set([...prev, id])]);
  const handleUpdateClick = (id, status, adminDescription) => {
    updateTicket(id, status, adminDescription);
    setEditingTicketIds(prev => prev.filter(x => x !== id));
  };

  const confirmAndNavigate = async (destination) => {
    if (editingTicketIds.length > 0) {
      const ok = window.confirm('Tienes cambios pendientes. ¿Deseas guardarlos antes de continuar?');
      if (ok) {
        await Promise.all(editingTicketIds.map(id => {
          const t = tickets.find(x => x._id === id);
          return updateTicket(id, t.status, t.adminDescription);
        }));
        setEditingTicketIds([]);
      } else return;
    }
    if (destination === 'logout') {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      navigate('/login');
    } else {
      navigate(destination);
    }
  };

  return (
    <div className="ha-page">

      <img src={logo} alt="" className="ha-watermark" aria-hidden="true" />
      <div className="ha-blob ha-blob--1" />
      <div className="ha-blob ha-blob--2" />

      {/* Header */}
      <header className="ha-header">
        <div className="ha-brand">
          <FaShieldAlt className="ha-brand-icon" />
          <span>Panel Admin · Tickets</span>
        </div>
        <div className="ha-header-actions">
          <button className="ha-btn-header ha-btn-back" onClick={() => confirmAndNavigate('/panel-admin')}>
            <FaArrowLeft /> Volver
          </button>
          <button className="ha-btn-header ha-btn-logout" onClick={() => confirmAndNavigate('logout')}>
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="ha-hero">
        <h1 className="ha-title">
          Administración de{' '}
          <span className="ha-glow">Tickets de Soporte</span>
        </h1>
        <p className="ha-sub">Gestiona, edita y responde los tickets generados por los usuarios.</p>
      </section>

      {/* Stats */}
      <div className="ha-stats">
        <div className="ha-stat">
          <FaTicketAlt />
          <span><strong>{tickets.length}</strong> tickets en total</span>
        </div>
        {editingTicketIds.length > 0 && (
          <div className="ha-stat ha-stat--editing">
            <FaEdit />
            <span><strong>{editingTicketIds.length}</strong> en edición</span>
          </div>
        )}
      </div>

      {loading && <p className="ha-msg ha-msg--info">⏳ Cargando tickets...</p>}
      {message && <p className={`ha-msg ha-msg--${msgType}`}>{message}</p>}

      {/* Tabla desktop */}
      {tickets.length > 0 && (
        <div className="ha-table-wrap">
          <table className="ha-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Tema</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Respuesta Admin</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => {
                const isEditing = editingTicketIds.includes(ticket._id);
                const st = statusConfig[ticket.status] || statusConfig['Pendiente'];
                return (
                  <tr key={ticket._id} className={isEditing ? 'ha-tr--editing' : ''}>
                    <td className="ha-td-num">#{ticket.ticketNumber}</td>
                    <td className="ha-td-name">{ticket.name}</td>
                    <td>{ticket.subject}</td>
                    <td className="ha-td-desc">{ticket.description}</td>
                    <td>
                      {isEditing ? (
                        <select className="ha-select" value={ticket.status}
                          onChange={e => handleFieldChange(ticket._id, 'status', e.target.value)}>
                          <option value="Pendiente">Pendiente</option>
                          <option value="En Progreso">En Progreso</option>
                          <option value="Resuelto">Resuelto</option>
                          <option value="Cerrado">Cerrado</option>
                        </select>
                      ) : (
                        <span className={`ha-badge ${st.cls}`}>{st.icon} {ticket.status}</span>
                      )}
                    </td>
                    <td>
                      <textarea
                        className={`ha-textarea ${isEditing ? 'ha-textarea--active' : ''}`}
                        value={ticket.adminDescription || ''}
                        disabled={!isEditing}
                        onChange={e => handleFieldChange(ticket._id, 'adminDescription', e.target.value)}
                        placeholder="Escribe una respuesta..."
                        rows={3}
                      />
                    </td>
                    <td>
                      {!isEditing ? (
                        <button className="ha-action-btn ha-action-btn--edit"
                          onClick={() => handleEditClick(ticket._id)}>
                          <FaEdit /> Editar
                        </button>
                      ) : (
                        <button className="ha-action-btn ha-action-btn--save"
                          onClick={() => handleUpdateClick(ticket._id, ticket.status, ticket.adminDescription)}>
                          <FaSave /> Guardar
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Cards móvil */}
      {tickets.length > 0 && (
        <div className="ha-mobile-cards">
          {tickets.map((ticket) => {
            const isEditing = editingTicketIds.includes(ticket._id);
            const st = statusConfig[ticket.status] || statusConfig['Pendiente'];
            return (
              <div key={ticket._id}
                className={`ha-mobile-card ${isEditing ? 'ha-mobile-card--editing' : ''}`}>
                <div className="ha-mobile-head">
                  <span className="ha-td-num">#{ticket.ticketNumber}</span>
                  {isEditing ? (
                    <select className="ha-select" value={ticket.status}
                      onChange={e => handleFieldChange(ticket._id, 'status', e.target.value)}>
                      <option value="Pendiente">Pendiente</option>
                      <option value="En Progreso">En Progreso</option>
                      <option value="Resuelto">Resuelto</option>
                      <option value="Cerrado">Cerrado</option>
                    </select>
                  ) : (
                    <span className={`ha-badge ${st.cls}`}>{st.icon} {ticket.status}</span>
                  )}
                </div>
                <p><strong>Cliente:</strong> {ticket.name}</p>
                <p><strong>Tema:</strong> {ticket.subject}</p>
                <p><strong>Descripción:</strong> {ticket.description}</p>
                <textarea
                  className={`ha-textarea ${isEditing ? 'ha-textarea--active' : ''}`}
                  value={ticket.adminDescription || ''}
                  disabled={!isEditing}
                  onChange={e => handleFieldChange(ticket._id, 'adminDescription', e.target.value)}
                  placeholder="Respuesta del administrador..."
                  rows={3}
                />
                {!isEditing ? (
                  <button className="ha-action-btn ha-action-btn--edit"
                    onClick={() => handleEditClick(ticket._id)}>
                    <FaEdit /> Editar
                  </button>
                ) : (
                  <button className="ha-action-btn ha-action-btn--save"
                    onClick={() => handleUpdateClick(ticket._id, ticket.status, ticket.adminDescription)}>
                    <FaSave /> Guardar
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="ha-deco-icon" aria-hidden="true"><FaTicketAlt /></div>
    </div>
  );
}

export default HomeAdmin;