import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Contacto.css";
import logo from "../assets/mundo.ico";
import {
  FaFacebook, FaInstagram, FaWhatsapp, FaTiktok,
  FaBars, FaTimes, FaMapMarkerAlt, FaEnvelope, FaPhone,
} from "react-icons/fa";

const Contacto = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Inicio" },
    { path: "/blog", label: "Blog" },
    { path: "/quienes-somos", label: "Quiénes Somos" },
    { path: "/login", label: "Iniciar Sesión" },
  ];

  const infoCards = [
    {
      icon: <FaMapMarkerAlt />,
      color: "#63CAB7",
      label: "Dirección",
      value: "Diagonal 28d # t33g40 B/ El Paraíso\nCali, Valle del Cauca, Colombia",
    },
    {
      icon: <FaEnvelope />,
      color: "#4A90D9",
      label: "Correo Electrónico",
      value: "mundodelatecnologia05@gmail.com",
    },
    {
      icon: <FaPhone />,
      color: "#7B68EE",
      label: "Teléfono",
      value: "305 293 2750",
    },
  ];

  const socials = [
    { icon: <FaFacebook />, label: "Facebook", cls: "fb", href: "https://www.facebook.com/profile.php?id=100078258196205&sk=about" },
    { icon: <FaInstagram />, label: "Instagram", cls: "ig", href: "https://www.instagram.com/elmundo_de_la_tecnologia_/" },
    { icon: <FaWhatsapp />, label: "WhatsApp", cls: "wa", href: "https://wa.me/573052939750" },
    { icon: <FaTiktok />, label: "TikTok", cls: "tt", href: "https://www.tiktok.com/@elmundodelatecnologia52" },
  ];

  return (
    <div className="contacto-page">

      {/* HEADER */}
      <header className="c-header">
        <Link to="/" className="c-logo">
          <div className="c-logo-icon">
            <img src={logo} alt="logo" />
          </div>
          <div className="c-logo-text">
            EL MUNDO DE<br /><span>LA TECNOLOGÍA</span>
          </div>
        </Link>

        <nav className="c-desktop-nav">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className="c-nav-link">{item.label}</Link>
          ))}
          <Link to="/registro" className="c-nav-btn">Registrarse</Link>
        </nav>

        <button className="c-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`c-mobile-nav ${menuOpen ? "open" : ""}`}>
          {[...navItems, { path: "/registro", label: "Registrarse" }].map(item => (
            <Link key={item.path} to={item.path} className="c-nav-link" onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      {/* HERO */}
      <section className="c-hero">
        <div className="c-hero-badge">
          <div className="c-hero-badge-dot" />
          <span>Estamos para ayudarte</span>
        </div>
        <h1>
          Ponte en <span>contacto</span><br />con nosotros
        </h1>
        <p>Cuéntanos lo que necesitas — respondemos rápido y con la mejor solución para tu equipo.</p>
      </section>

      {/* GRID PRINCIPAL */}
      <div className="c-grid">

        {/* Columna izquierda — Info + Redes */}
        <div className="c-info-stack">
          {infoCards.map((card, i) => (
            <div className="c-info-card" key={i}>
              <div
                className="c-info-icon"
                style={{
                  background: `${card.color}15`,
                  border: `1px solid ${card.color}35`,
                  color: card.color,
                }}
              >
                {card.icon}
              </div>
              <div>
                <div className="c-info-label">{card.label}</div>
                <div className="c-info-value">{card.value}</div>
              </div>
            </div>
          ))}

          {/* Redes sociales */}
          <div className="c-social-card">
            <div className="c-social-title">Redes Sociales</div>
            <div className="c-social-grid">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`c-social-btn ${s.cls}`}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha — Mapa */}
        <div className="c-map-card">
          <div className="c-map-header">
            <div className="c-map-dot" />
            <span>Nuestra Ubicación</span>
          </div>
          <iframe
            title="Ubicación El Mundo de la Tecnología"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.8788264432737!2d-76.53087922583765!3d3.4348206965187175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6c8b0ab52b7%3A0xd5bb69e02b0a2e39!2sCalle%2054a%20%2335-33%2C%20Comuna%2015%2C%20Cali%2C%20Valle%20del%20Cauca!5e0!3m2!1ses!2sco!4v1715049412735!5m2!1ses!2sco"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>

      </div>

      {/* FOOTER */}
      <footer className="c-footer">
        <div className="c-footer-inner">
          <p className="c-footer-credits">
            created by: Kevin Rivas · Tatiana Montoya ·{" "}
            <a href="https://mi-cv-juan-granja.vercel.app/" target="_blank" rel="noreferrer">
              Juan Granja
            </a>
          </p>
          <div className="c-footer-links">
            <Link to="/terminos">Términos</Link>
            <Link to="/privacidad">Privacidad</Link>
            <Link to="/">Inicio</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Contacto;