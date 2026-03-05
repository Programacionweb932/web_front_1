import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { FaEye, FaEyeSlash, FaLock, FaUser, FaShieldAlt } from "react-icons/fa";
import "../styles/Formulario.css";
import loginImage from "../assets/imglogin.png";

function Formulario({ setUser }) {
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) header.style.display = "none";
    return () => { if (header) header.style.display = "block"; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario.trim()) return setError("Debes ingresar un usuario.");
    if (!contraseña.trim()) return setError("Debes ingresar una contraseña.");
    if (!captchaToken) return setError("Debes verificar el CAPTCHA.");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: usuario, password: contraseña, captchaToken }),
        }
      );
      const data = await response.json();
      if (!response.ok) { setError(data.msg || "Usuario o contraseña incorrectos"); return; }
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigate(data.user.role === "admin" ? "/panel-admin" : "/home");
    } catch {
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fl-page">
      {/* Blobs de fondo */}
      <div className="fl-blob fl-blob--1" />
      <div className="fl-blob fl-blob--2" />
      {/* Grid decorativo */}
      <div className="fl-grid" />

      <div className="fl-container">

        {/* Panel izquierdo — imagen / branding */}
        <div className="fl-left">
          <div className="fl-brand">
            <div className="fl-brand-icon">
              <FaShieldAlt />
            </div>
            <span className="fl-brand-name">El Mundo de la Tecnología</span>
          </div>
          <h2 className="fl-left-title">
            Bienvenido de<br />
            <span>vuelta</span>
          </h2>
          <p className="fl-left-sub">
            Accede a tu cuenta para gestionar servicios, solicitudes y mucho más.
          </p>
          <div className="fl-img-wrap">
            <img src={loginImage} alt="Login" className="fl-img" />
          </div>
          <div className="fl-features">
            {['Soporte técnico 24h', 'Panel personalizado', 'Acceso seguro'].map(f => (
              <div key={f} className="fl-feature">
                <span className="fl-feature-dot" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Panel derecho — formulario */}
        <div className="fl-right">
          <div className="fl-form-card">
            {/* Cabecera */}
            <div className="fl-form-header">
              <div className="fl-form-icon">
                <FaLock />
              </div>
              <h1 className="fl-form-title">Iniciar Sesión</h1>
              <p className="fl-form-sub">Ingresa tus credenciales para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="fl-form" noValidate>

              {/* Usuario */}
              <div className="fl-field">
                <label htmlFor="usuario" className="fl-label">Usuario</label>
                <div className="fl-input-wrap">
                  <span className="fl-input-icon"><FaUser /></span>
                  <input
                    id="usuario"
                    type="text"
                    value={usuario}
                    onChange={(e) => { setUsuario(e.target.value); setError(""); }}
                    placeholder="Ingresa tu usuario"
                    autoComplete="username"
                    className="fl-input"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div className="fl-field">
                <label htmlFor="contrasena" className="fl-label">Contraseña</label>
                <div className="fl-input-wrap">
                  <span className="fl-input-icon"><FaLock /></span>
                  <input
                    id="contrasena"
                    type={showPassword ? "text" : "password"}
                    value={contraseña}
                    onChange={(e) => { setContraseña(e.target.value); setError(""); }}
                    placeholder="Ingresa tu contraseña"
                    autoComplete="current-password"
                    className="fl-input fl-input--pass"
                  />
                  <button
                    type="button"
                    className="fl-toggle-pass"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Mostrar contraseña"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* CAPTCHA */}
              <div className="fl-captcha">
                <ReCAPTCHA
                  sitekey={siteKey}
                  onChange={(value) => setCaptchaToken(value)}
                  theme="dark"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="fl-error">
                  <span>⚠</span> {error}
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={loading} className="fl-submit">
                {loading ? (
                  <span className="fl-loading">
                    <span className="fl-spinner" /> Iniciando sesión...
                  </span>
                ) : "Iniciar Sesión"}
              </button>

              {/* Links */}
              <div className="fl-links">
                <p>¿No tienes cuenta? <a href="/registro" className="fl-link">Regístrate aquí</a></p>
                <p>¿Volver al inicio? <a href="/" className="fl-link">Página principal</a></p>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Formulario;
