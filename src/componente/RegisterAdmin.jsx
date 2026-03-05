import React, { useState } from 'react';
import '../styles/RegisterAdmin.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import registerImage from '/public/admin/admin.jpg';

function RegisterAdmin() {
  const [username, setUsername]               = useState('');
  const [email, setEmail]                     = useState('');
  const [password, setPassword]               = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass]               = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);
  const [error, setError]                     = useState(null);
  const [success, setSuccess]                 = useState('');
  const [loading, setLoading]                 = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);

    if (!username || !email || !password) return setError('Todos los campos son obligatorios.');
    if (password !== confirmPassword)      return setError('Las contraseñas no coinciden.');

    setLoading(true);
    try {
      const response = await fetch('https://web-back-1.vercel.app/api/Adminregister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('¡Administrador registrado con éxito!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.message || 'Error al registrar el administrador.');
      }
    } catch {
      setError('Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { id: 'ra-username', label: 'Nombre de usuario', type: 'text',     value: username,         set: setUsername,         icon: <FaUser />,     placeholder: 'Nombre del admin',    autoComplete: 'username' },
    { id: 'ra-email',    label: 'Correo electrónico',type: 'email',    value: email,            set: setEmail,            icon: <FaEnvelope />, placeholder: 'admin@correo.com',    autoComplete: 'email' },
  ];

  return (
    <div className="ra-page">
      {/* Decoración */}
      <div className="ra-blob ra-blob--1" />
      <div className="ra-blob ra-blob--2" />
      <div className="ra-grid-bg" />

      <div className="ra-container">

        {/* Panel izquierdo */}
        <div className="ra-left">
          <div className="ra-brand">
            <div className="ra-brand-icon"><FaShieldAlt /></div>
            <span className="ra-brand-name">El Mundo de la Tecnología</span>
          </div>
          <h2 className="ra-left-title">
            Panel de<br /><span>Administración</span>
          </h2>
          <p className="ra-left-sub">
            Registra nuevos administradores con acceso completo al sistema de gestión.
          </p>
          <div className="ra-img-wrap">
            <img src={registerImage} alt="Admin" className="ra-img" />
          </div>
          <div className="ra-perks">
            {['Acceso completo al panel', 'Gestión de usuarios', 'Control de servicios'].map(p => (
              <div key={p} className="ra-perk">
                <span className="ra-perk-dot" />{p}
              </div>
            ))}
          </div>
        </div>

        {/* Panel derecho */}
        <div className="ra-right">
          <div className="ra-card">

            <div className="ra-card-header">
              <div className="ra-card-icon"><FaShieldAlt /></div>
              <h1 className="ra-title">Registro Admin</h1>
              <p className="ra-subtitle">Crea una cuenta de administrador</p>
            </div>

            <form onSubmit={handleRegister} className="ra-form" noValidate>

              {/* Campos simples */}
              {fields.map(f => (
                <div className="ra-field" key={f.id}>
                  <label htmlFor={f.id} className="ra-label">{f.label}</label>
                  <div className="ra-input-wrap">
                    <span className="ra-input-icon">{f.icon}</span>
                    <input
                      id={f.id}
                      type={f.type}
                      value={f.value}
                      onChange={e => { f.set(e.target.value); setError(null); }}
                      placeholder={f.placeholder}
                      autoComplete={f.autoComplete}
                      className="ra-input"
                    />
                  </div>
                </div>
              ))}

              {/* Contraseña */}
              <div className="ra-field">
                <label htmlFor="ra-password" className="ra-label">Contraseña</label>
                <div className="ra-input-wrap">
                  <span className="ra-input-icon"><FaLock /></span>
                  <input
                    id="ra-password"
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(null); }}
                    placeholder="Mínimo 8 caracteres"
                    autoComplete="new-password"
                    className="ra-input ra-input--pass"
                  />
                  <button type="button" className="ra-toggle" onClick={() => setShowPass(!showPass)} aria-label="Ver contraseña">
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Confirmar contraseña */}
              <div className="ra-field">
                <label htmlFor="ra-confirm" className="ra-label">Confirmar Contraseña</label>
                <div className="ra-input-wrap">
                  <span className="ra-input-icon"><FaLock /></span>
                  <input
                    id="ra-confirm"
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => { setConfirmPassword(e.target.value); setError(null); }}
                    placeholder="Repite tu contraseña"
                    autoComplete="new-password"
                    className="ra-input ra-input--pass"
                  />
                  <button type="button" className="ra-toggle" onClick={() => setShowConfirm(!showConfirm)} aria-label="Ver contraseña">
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Feedback */}
              {error   && <div className="ra-error"><span>⚠</span> {error}</div>}
              {success && <div className="ra-success"><span>✓</span> {success}</div>}

              {/* Submit */}
              <button type="submit" className="ra-submit" disabled={loading || !!success}>
                {loading ? (
                  <span className="ra-loading"><span className="ra-spinner" /> Registrando...</span>
                ) : 'Registrar Administrador'}
              </button>

              {/* Volver */}
              <button type="button" className="ra-back" onClick={() => navigate('/login')}>
                <FaArrowLeft style={{ fontSize: '0.85rem' }} /> Volver al Login
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default RegisterAdmin;
