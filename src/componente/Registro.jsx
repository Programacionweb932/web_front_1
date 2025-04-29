import React, { useState } from 'react';
import '../styles/Registro.css';

function Registro() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username === '') {
      setError('Debes ingresar un usuario.');
      return;
    }
    if (email === '') {
      setError('Debes ingresar un correo.');
      return;
    }
    if (password === '') {
      setError('Debes ingresar una contraseña.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('https://web-back-p.vercel.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registro exitoso');
        setError(null);
        // Limpia los campos
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || 'Error al registrar el usuario.');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setError('Error al registrar el usuario.');
    }
  };

  return (
    <div className="registro-container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="username">Nombre de Usuario</label>
          <input 
            id="username"
            type="text" 
            value={username} 
            onChange={event => setUsername(event.target.value)}
            placeholder='Ingrese su usuario'
          />
        </div>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input 
            id="email"
            type="email" 
            value={email} 
            onChange={event => setEmail(event.target.value)} 
            placeholder='Ingrese su correo'
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Contraseña</label>
          <input 
            id="password"
            type="password" 
            value={password} 
            onChange={event => setPassword(event.target.value)} 
            placeholder='Ingrese su contraseña'
          />
        </div>
        <div className="input-field">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input 
            id="confirmPassword"
            type="password" 
            value={confirmPassword} 
            onChange={event => setConfirmPassword(event.target.value)} 
            placeholder='Confirme su contraseña'
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-button">Registrarme</button>
      </form>
    </div>
  );
}

export default Registro;
