import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import "../styles/Nosotros.css";
import logo from "../assets/mundo.ico";
import juanImg from "../assets/Juan Pablo.png";
import kevinImg from "../assets/Kevin Rivas.png";
import tatianaImg from "../assets/Tatiana.jpeg";
import { FaBars, FaTimes, FaRocket, FaEye, FaBullseye, FaLinkedin, FaGithub } from "react-icons/fa";

/* Hook animación entrada */
const useInView = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.12 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const navItems = [
  { path: "/", label: "Inicio" },
  { path: "/contactenos", label: "Contacto" },
  { path: "/blog", label: "Blog" },
  { path: "/login", label: "Iniciar Sesión" },
];

const sections = [
  {
    icon: <FaRocket />,
    iconColor: "#63CAB7",
    tag: "Equipo",
    title: "Quiénes Somos",
    text: "Somos un equipo de profesionales en el campo de las tecnologías de la información, liderados por Juan Pablo Granja, Kevin Alexis Rivas y Tatiana Montoya. Nuestro principal objetivo es ofrecer un excelente servicio a nuestros clientes. Siempre estamos constantemente aprendiendo y buscando nuevas soluciones para enfrentar los desafíos del mercado de sistemas. Estamos comprometidos a mantenernos actualizados y evolucionar constantemente para estar al día con los cambios y demandas del mercado tecnológico.",
    image: "/image nosotros/quienes somos.jpeg",
    alt: "Quiénes Somos",
    reverse: false,
  },
  {
    icon: <FaEye />,
    iconColor: "#4A90D9",
    tag: "Futuro",
    title: "Visión",
    text: "Ser la empresa líder en soluciones tecnológicas innovadoras, reconocida por la excelencia de nuestros servicios y el compromiso con la experiencia del cliente. Para 2030, aspiramos a transformar la forma en que personas y organizaciones se relacionan con la tecnología, ofreciendo soluciones inteligentes, seguras y sostenibles, adaptadas a un entorno global en constante evolución. Impulsamos el cambio mediante la integración de tecnologías emergentes, fomentando una transformación digital que genere valor, confianza e impacto positivo en la sociedad.",
    image: "/image nosotros/vision.jpg",
    alt: "Visión",
    reverse: true,
  },
  {
    icon: <FaBullseye />,
    iconColor: "#7B68EE",
    tag: "Propósito",
    title: "Misión",
    text: "Brindar servicios tecnológicos de alta calidad, enfocados en la innovación, la actualización constante y la satisfacción del cliente. Nuestro equipo de profesionales trabaja con pasión y compromiso para ofrecer soluciones personalizadas en el área de tecnologías de la información, ayudando a nuestros clientes a optimizar sus procesos y afrontar los desafíos del mundo digital con éxito.",
    image: "/image nosotros/mision.jpeg",
    alt: "Misión",
    reverse: false,
  },
];

const Section = ({
  icon,
  iconColor,
  tag,
  title,
  text,
  image,
  alt,
  reverse,
}) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`n-section ${reverse ? "n-section--reverse" : ""} ${inView ? "n-section--visible" : ""}`}
    >
      {/* Imagen */}
      <div className="n-img-wrap">
        <div
          className="n-img-glow"
          style={{
            background: `radial-gradient(circle, ${iconColor}25 0%, transparent 70%)`,
          }}
        />
        <img src={image} alt={alt} className="n-img" />
        <div
          className="n-img-border"
          style={{ borderColor: `${iconColor}30` }}
        />
      </div>

      {/* Texto */}
      <div className="n-text">
        <div
          className="n-tag"
          style={{
            background: `${iconColor}15`,
            border: `1px solid ${iconColor}40`,
            color: iconColor,
          }}
        >
          <span className="n-tag-icon">{icon}</span>
          {tag}
        </div>
        <h2 className="n-title">{title}</h2>
        <div
          className="n-divider"
          style={{
            background: `linear-gradient(90deg, ${iconColor}, transparent)`,
          }}
        />
        <p className="n-desc">{text}</p>
      </div>
    </div>
  );
};

const Nosotros = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="nosotros-page">
      {/* HEADER */}
      <header className="n-header">
        <Link to="/" className="n-logo">
          <div className="n-logo-icon">
            <img src={logo} alt="logo" />
          </div>
          <div className="n-logo-text">
            EL MUNDO DE
            <br />
            <span>LA TECNOLOGÍA</span>
          </div>
        </Link>

        <nav className="n-desktop-nav">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="n-nav-link">
              {item.label}
            </Link>
          ))}
          <Link to="/registro" className="n-nav-btn">
            Registrarse
          </Link>
        </nav>

        <button
          className="n-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`n-mobile-nav ${menuOpen ? "open" : ""}`}>
          {[...navItems, { path: "/registro", label: "Registrarse" }].map(
            (item) => (
              <Link
                key={item.path}
                to={item.path}
                className="n-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="n-hero">
        <div className="n-hero-blob" />
        <div className="n-hero-badge">
          <span className="n-hero-dot" />
          <span>Conoce nuestro equipo</span>
        </div>
        <h1>
          Somos <span>El Mundo de</span>
          <br />
          la Tecnología
        </h1>
        <p>
          Profesionales apasionados por ofrecer soluciones tecnológicas de
          calidad en Cali, Colombia.
        </p>

        {/* Stats */}
        <div className="n-stats">
          {[
            ["500+", "Clientes"],
            ["3", "Expertos"],
            ["5★", "Calificación"],
            ["2+", "Años"],
          ].map(([n, l]) => (
            <div key={l} className="n-stat">
              <span className="n-stat-num">{n}</span>
              <span className="n-stat-label">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIONES */}
      <main className="n-main">
        {sections.map((s, i) => (
          <Section key={i} {...s} />
        ))}
      </main>

{/* EQUIPO */}
<section className="n-team">
  <h2 className="n-team-title">Conoce nuestro equipo</h2>
  <div className="n-team-grid">
    {[
      {
        name: "Juan Pablo Granja",
        role: "Tecnólogo en Desarrollo de Software",
        bio: "Apasionado por el desarrollo frontend y la experiencia de usuario.",
        img: juanImg,
        linkedin: "https://www.linkedin.com/in/juan-pablo-granja-628063358/",
        github: "https://github.com/JuanG202",
      },
      {
        name: "Leidy Tatiana Montoya",
        role: "Tecnóloga en Desarrollo de Software",
        bio: "Enfocada en backend, bases de datos y control de calidad.",
        img: tatianaImg,
        linkedin: "https://www.linkedin.com/in/tatiana-montoya-49a2b3280/",
        github: "https://github.com/tmontoya428",
      },
      {
        name: "Kevin Alexis Rivas",
        role: "Tecnólogo en Desarrollo de Software",
        bio: "Especializado en integración de sistemas, backend y arquitectura de soluciones. ",
        img: kevinImg,
        linkedin: "https://www.linkedin.com/in/kevin-rivas-70149737a/",
        github: "https://github.com/kevinrivas07",
      },
    ].map((m) => (
      <div key={m.name} className="n-team-card">
        <img src={m.img} alt={m.name} className="n-team-img" />
        <h3 className="n-team-name">{m.name}</h3>
        <span className="n-team-role">{m.role}</span>
        <p className="n-team-bio">{m.bio}</p>
        <div className="n-team-social">
          <a href={m.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /></a>
          <a href={m.github} target="_blank" rel="noreferrer"><FaGithub /></a>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* FOOTER */}
      <footer className="n-footer">
        <div className="n-footer-inner">
          <p className="n-footer-credits">
            created by: Kevin Rivas · Tatiana Montoya ·{" "}
            <a
              href="https://mi-cv-juan-granja.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              Juan Granja
            </a>
          </p>
          <div className="n-footer-links">
            <Link to="/contactenos">Contacto</Link>
            <Link to="/terminos">Términos</Link>
            <Link to="/">Inicio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Nosotros;
