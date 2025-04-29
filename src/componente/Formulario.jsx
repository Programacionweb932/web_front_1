import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/Formulario.css";
import loginImage from "../assets/imglogin.png";

function Formulario({ setUser }) {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario.trim()) return setError("Debes ingresar un usuario.");
    if (!contraseña.trim()) return setError("Debes ingresar una contraseña.");
    if (!captchaToken) return setError("Debes verificar el CAPTCHA.");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usuario, password: contraseña, captchaToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Usuario o contraseña incorrectos");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      navigate(data.user.role === "admin" ? "/home-admin" : "/home");
    } catch (error) {
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-image-side">
        <img src={loginImage} alt="Imagen de inicio de sesión" className="login-image" />
      </div>
      <section className="formulario-container">
        <h1 className="form-title">INICIO DE SESIÓN</h1>
        <form className="formulario" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="usuario" className="form-label">Usuario</label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => {
                setUsuario(e.target.value);
                setError("");
              }}
              placeholder="Ingrese su usuario"
              autoComplete="off"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contraseña" className="form-label">Contraseña</label>
            <input
              id="contraseña"
              type="password"
              value={contraseña}
              onChange={(e) => {
                setContraseña(e.target.value);
                setError("");
              }}
              placeholder="Ingrese su contraseña"
              autoComplete="off"
              className="form-input"
            />
          </div>

          <div className="recaptcha-container">
            <ReCAPTCHA 
              sitekey={siteKey} 
              onChange={(value) => setCaptchaToken(value)} 
              className="recaptcha"
            />
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>
      </section>
    </div>
  );
}

export default Formulario;