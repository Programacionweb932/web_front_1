import React, { useState, useEffect } from 'react';
import '../styles/Registro.css';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaCity, FaGlobe, FaLock, FaUserPlus } from "react-icons/fa";
import registroImage from '../assets/imgregitro2.png';

function Registro() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';
    return () => { if (header) header.style.display = 'block'; };
  }, []);

  const isPasswordSecure = (pw) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pw);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username) return setError('Debes ingresar un usuario.');
    if (/\s/.test(username)) return setError('El usuario no debe contener espacios.');
    if (!email) return setError('Debes ingresar un correo.');
    if (!phone) return setError('Debes ingresar un número de teléfono.');
    if (!/^\d{7,15}$/.test(phone)) return setError('El número de teléfono no es válido.');
    if (!city) return setError('Debes ingresar una ciudad.');
    if (!country) return setError('Debes ingresar un país.');
    if (!password) return setError('Debes ingresar una contraseña.');
    if (!isPasswordSecure(password)) return setError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
    if (password !== confirmPassword) return setError('Las contraseñas no coinciden.');
    setError(null);

    try {
      const response = await fetch('https://web-back-1.vercel.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, phone, city, country, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('¡Registro exitoso! Redirigiendo...');
        setError(null);
        setUsername(''); setEmail(''); setPhone('');
        setCity(''); setCountry(''); setPassword(''); setConfirmPassword('');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(data.message || 'Error al registrar el usuario.');
      }
    } catch {
      setError('Error al conectar con el servidor.');
    }
  };

  const fields = [
    { id: 'username',        label: 'Nombre de Usuario', type: 'text',     value: username,         set: setUsername,         icon: <FaUser />,     placeholder: 'Tu usuario',           autoComplete: 'username' },
    { id: 'email',           label: 'Correo Electrónico',type: 'email',    value: email,            set: setEmail,            icon: <FaEnvelope />, placeholder: 'tu@correo.com',        autoComplete: 'email' },
    { id: 'phone',           label: 'Teléfono',          type: 'tel',      value: phone,            set: setPhone,            icon: <FaPhone />,    placeholder: 'Ej: 3001234567',       autoComplete: 'tel' },
    { id: 'city',            label: 'Ciudad',            type: 'text',     value: city,             set: setCity,             icon: <FaCity />,     placeholder: 'Tu ciudad',            autoComplete: 'address-level2' },
    { id: 'country',         label: 'País',              type: 'text',     value: country,          set: setCountry,          icon: <FaGlobe />,    placeholder: 'Tu país',              autoComplete: 'country-name' },
  ];

  return (
    <div className="rg-page">
      {/* Decoración */}
      <div className="rg-blob rg-blob--1" />
      <div className="rg-blob rg-blob--2" />
      <div className="rg-grid" />

      <div className="rg-container">

        {/* Panel izquierdo — imagen / branding */}
        <div className="rg-left">
          <div className="rg-brand">
            <div className="rg-brand-icon"><FaUserPlus /></div>
            <span className="rg-brand-name">El Mundo de la Tecnología</span>
          </div>
          <h2 className="rg-left-title">
            Crea tu<br /><span>cuenta</span>
          </h2>
          <p className="rg-left-sub">
            Únete a cientos de usuarios que gestionan sus servicios tecnológicos con nosotros.
          </p>
          <div className="rg-img-wrap">
            <img src={registroImage} alt="Registro" className="rg-img" />
          </div>
          <div className="rg-perks">
            {['Acceso a soporte técnico', 'Seguimiento de solicitudes', 'Panel personalizado'].map(p => (
              <div key={p} className="rg-perk">
                <span className="rg-perk-dot" />{p}
              </div>
            ))}
          </div>
        </div>

        {/* Panel derecho — formulario */}
        <div className="rg-right">
          <div className="rg-card">

            <div className="rg-card-header">
              <div className="rg-card-icon"><FaUserPlus /></div>
              <h1 className="rg-title">Registro</h1>
              <p className="rg-subtitle">Completa los datos para crear tu cuenta</p>
            </div>

            <form onSubmit={handleSubmit} className="rg-form" noValidate>
              <div className="rg-grid-fields">

                {/* Campos generales */}
                {fields.map(f => (
                  <div className="rg-field" key={f.id}>
                    <label htmlFor={f.id} className="rg-label">{f.label}</label>
                    <div className="rg-input-wrap">
                      <span className="rg-input-icon">{f.icon}</span>
                      <input
                        id={f.id}
                        type={f.type}
                        value={f.value}
                        onChange={e => { f.set(e.target.value); setError(null); }}
                        placeholder={f.placeholder}
                        autoComplete={f.autoComplete}
                        className="rg-input"
                      />
                    </div>
                  </div>
                ))}

                {/* Contraseña */}
                <div className="rg-field">
                  <label htmlFor="password" className="rg-label">Contraseña</label>
                  <div className="rg-input-wrap">
                    <span className="rg-input-icon"><FaLock /></span>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => { setPassword(e.target.value); setError(null); }}
                      placeholder="Mínimo 8 caracteres"
                      autoComplete="new-password"
                      className="rg-input rg-input--pass"
                    />
                    <button type="button" className="rg-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Ver contraseña">
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Confirmar contraseña */}
                <div className="rg-field">
                  <label htmlFor="confirmPassword" className="rg-label">Confirmar Contraseña</label>
                  <div className="rg-input-wrap">
                    <span className="rg-input-icon"><FaLock /></span>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => { setConfirmPassword(e.target.value); setError(null); }}
                      placeholder="Repite tu contraseña"
                      autoComplete="new-password"
                      className="rg-input rg-input--pass"
                    />
                    <button type="button" className="rg-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label="Ver contraseña">
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

              </div>{/* /rg-grid-fields */}

              {/* Feedback */}
              {error && <div className="rg-error"><span>⚠</span> {error}</div>}
              {successMessage && <div className="rg-success"><span>✓</span> {successMessage}</div>}

              {/* Submit */}
              <button type="submit" className="rg-submit" disabled={!!successMessage}>
                Crear Cuenta
              </button>

              {/* Links */}
              <div className="rg-links">
                <p>¿Ya tienes cuenta? <a href="/login" className="rg-link">Iniciar sesión</a></p>
                <p>¿Volver al inicio? <a href="/" className="rg-link">Página principal</a></p>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Registro;
