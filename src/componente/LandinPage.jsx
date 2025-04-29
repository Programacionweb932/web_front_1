import { Link } from "react-router-dom";
import "../styles/LandinPage.css";

const LandingPage = () => {
  return (
    <div className="container">
      {/* Barra de navegación */}
      <nav>
        <h1>EL MUNDO DE LA TECNOLOGIA</h1>
        <div>
          <Link to="/quienes-somos" className="btn-nav">Quienes Somos</Link>
          <Link to="/blog" className="btn-nav">Ver Blog</Link>
          <Link to="/login" className="btn-nav">Iniciar Sesión</Link>
          <Link to="/registro" className="btn-nav">Registrarse</Link>
        </div>
      </nav>

      {/* Contenido principal */}
      <main>
        <h2>Bienvenido a El Mundo De La Tecnologia</h2>
        <p>Explora soluciones innovadoras en mantenimiento, instalación y asistencia técnica para optimizar tu experiencia digital.</p>

        {/* Sección de características */}
        <div className="features">
          <Link to="/login" className="feature">
            <h3 className="feature-title">Mantenimientos Preventivos</h3>
            <p className="feature-text">Automatiza la asignación y recordatorios de citas.</p>
          </Link>
          <Link to="/login" className="feature">
            <h3 className="feature-title">Asistencia Remota</h3>
            <p className="feature-text">Evita olvidos con notificaciones en tiempo real.</p>
          </Link>
          <Link to="/login" className="feature">
            <h3 className="feature-title">Instalacion de Microsoft Office</h3>
            <p className="feature-text">Interfaz intuitiva para pacientes y administradores.</p>
          </Link>
          <Link to="/login" className="feature">
            <h3 className="feature-title">Instalacion de Sistemas Operativos</h3>
            <p className="feature-text">Instalamos Sistemas Operativos de forma rápida y segura, con todos los drivers actualizados.</p>
          </Link>
          <Link to="/login" className="feature">
            <h3 className="feature-title">Reparacion de portatiles y PC</h3>
            <p className="feature-text">Diagnóstico y reparación de hardware y software, incluyendo cambio de piezas y optimización del sistema.</p>
          </Link>
          <div className="feature">
            <h3 className="feature-title"></h3>
            <img src="/public/image nosotros/servicios.jpg" alt="Descripción de la imagen" className="feature-image" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
