import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/Formulario.css";

function Formulario({ setUser }) {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);  // Nuevo estado para el token
  const navigate = useNavigate();
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;  // Asegúrate de que esta es la clave del sitio

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario.trim()) return setError("Debes ingresar un usuario.");
    if (!contraseña.trim()) return setError("Debes ingresar una contraseña.");
    if (!captchaToken) return setError("Debes verificar el CAPTCHA.");  // Verificar si se obtuvo el token

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usuario,
          password: contraseña,
          captchaToken,  // Enviar el token CAPTCHA
        }),
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
    <section className="formulario-container">
      <h1>INICIO DE SESIÓN</h1>
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="usuario">Usuario</label>
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="contraseña">Contraseña</label>
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
          />
        </div>

        {/* ReCAPTCHA widget */}
        <ReCAPTCHA
          sitekey={siteKey}
          onChange={(value) => setCaptchaToken(value)}  // Obtener el token al completar el CAPTCHA
        />

        <button type="submit" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </section>
  );
}

export default Formulario;
