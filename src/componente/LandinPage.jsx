import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FaShieldAlt, FaLaptop, FaHeadset, FaFileWord, FaTools,
  FaArrowRight, FaChevronLeft, FaChevronRight, FaDownload,
  FaBars, FaTimes, FaStar, FaCheck,
  FaCode, FaDatabase, FaPalette, FaRocket, FaCogs,
} from "react-icons/fa";
import logo from "../assets/mundo.ico";

/* ─── HOOK IntersectionObserver ─── */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

/* ─── HEADER ─── */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navItems = [
    { path: "/quienes-somos", label: "Quiénes Somos" },
    { path: "/contactenos", label: "Contacto" },
    { path: "/blog", label: "Blog" },
    { path: "/login", label: "Iniciar Sesión" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? "0.75rem 2rem" : "1.2rem 2rem",
      background: scrolled ? "rgba(10,14,27,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(99,202,183,0.15)" : "none",
      transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{
          width: 40, height: 40, borderRadius: "10px",
          background: "linear-gradient(135deg, #63CAB7, #4A90D9)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 20px rgba(99,202,183,0.4)",
        }}>
          <img src={logo} alt="logo" style={{ width: 26, height: 26, objectFit: "contain" }} />
        </div>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "1.15rem", fontWeight: 700, letterSpacing: "0.05em",
          color: "#fff", lineHeight: 1.2,
        }}>
          EL MUNDO DE<br />
          <span style={{ color: "#63CAB7" }}>LA TECNOLOGÍA</span>
        </span>
      </div>

      <nav style={{ display: "flex", gap: "0.25rem", alignItems: "center" }} className="desktop-nav">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} style={{
            padding: "0.5rem 1rem", borderRadius: "8px", color: "rgba(255,255,255,0.8)",
            fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
            transition: "all 0.2s", textDecoration: "none",
          }}
            onMouseEnter={e => { e.target.style.color = "#63CAB7"; e.target.style.background = "rgba(99,202,183,0.08)"; }}
            onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.8)"; e.target.style.background = "transparent"; }}>
            {item.label}
          </Link>
        ))}
        <Link to="/registro" style={{
          marginLeft: "0.5rem", padding: "0.6rem 1.4rem", borderRadius: "8px",
          background: "linear-gradient(135deg, #63CAB7, #4A90D9)",
          color: "#fff", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: "0 4px 15px rgba(99,202,183,0.3)", transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(99,202,183,0.45)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(99,202,183,0.3)"; }}>
          Registrarse
        </Link>
      </nav>

      <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-toggle" style={{
        background: "none", border: "none", color: "#fff", fontSize: "1.4rem",
        cursor: "pointer", display: "none", padding: "0.5rem",
      }}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {menuOpen && (
        <div style={{
          position: "fixed", top: "70px", left: 0, right: 0,
          background: "rgba(10,14,27,0.98)", backdropFilter: "blur(20px)",
          padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "0.5rem",
          borderBottom: "1px solid rgba(99,202,183,0.2)", zIndex: 999,
        }}>
          {[...navItems, { path: "/registro", label: "Registrarse" }].map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setMenuOpen(false)} style={{
              padding: "0.75rem 1rem", borderRadius: "8px", color: "rgba(255,255,255,0.85)",
              fontSize: "1rem", fontFamily: "'DM Sans', sans-serif",
              borderBottom: "1px solid rgba(255,255,255,0.06)", textDecoration: "none",
            }}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

/* ─── IMAGE SLIDER ─── */
const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const galleryImages = [
    { src: "/galeria/mantenimiento.jpg", alt: "Mantenimiento", title: "Mantenimiento de Equipos" },
    { src: "/galeria/tecnolo.jpg", alt: "Instalación", title: "Instalación de Software" },
    { src: "/galeria/soporte.jpg", alt: "Soporte", title: "Soporte Técnico Profesional" },
    { src: "/galeria/reparacion.jpg", alt: "Reparación", title: "Reparación de Computadoras" },
    { src: "/galeria/kevin.jpg", alt: "Feria", title: "Participación Feria Empresarial" },
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % galleryImages.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
      {galleryImages.map((img, i) => (
        <div key={i} style={{ display: i === current ? "block" : "none", position: "relative" }}>
          <img src={img.src} alt={img.alt} style={{ width: "100%", height: "420px", objectFit: "cover", display: "block" }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "linear-gradient(to top, rgba(10,14,27,0.9) 0%, transparent 100%)",
            padding: "3rem 2rem 1.5rem",
          }}>
            <span style={{
              display: "inline-block", padding: "0.3rem 0.9rem", borderRadius: "20px",
              background: "rgba(99,202,183,0.2)", border: "1px solid rgba(99,202,183,0.4)",
              color: "#63CAB7", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600, marginBottom: "0.5rem",
            }}>{img.title}</span>
          </div>
        </div>
      ))}
      {[{ dir: -1, icon: <FaChevronLeft /> }, { dir: 1, icon: <FaChevronRight /> }].map((a, i) => (
        <button key={i} onClick={() => setCurrent(c => (c + a.dir + galleryImages.length) % galleryImages.length)}
          style={{
            position: "absolute", top: "50%", transform: "translateY(-50%)",
            [a.dir === -1 ? "left" : "right"]: "1rem",
            width: 44, height: 44, borderRadius: "50%", border: "none",
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
            color: "#fff", fontSize: "1rem", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#63CAB7"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}>
          {a.icon}
        </button>
      ))}
      <div style={{ position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.4rem" }}>
        {galleryImages.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? 24 : 8, height: 8, borderRadius: "4px", border: "none",
            background: i === current ? "#63CAB7" : "rgba(255,255,255,0.35)",
            cursor: "pointer", transition: "all 0.3s", padding: 0,
          }} />
        ))}
      </div>
    </div>
  );
};

/* ─── HERO ─── */
const HeroSection = () => (
  <section style={{
    minHeight: "100vh", background: "#0A0E1B",
    display: "flex", alignItems: "center", position: "relative", overflow: "hidden",
    paddingTop: "80px",
  }}>
    <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(74,144,217,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
    <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,202,183,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(99,202,183,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,202,183,0.04) 1px, transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none" }} />
    <div style={{
      maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem",
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem",
      alignItems: "center", width: "100%", boxSizing: "border-box",
    }} className="hero-grid">
      <div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          padding: "0.4rem 1rem", borderRadius: "20px",
          border: "1px solid rgba(99,202,183,0.35)", background: "rgba(99,202,183,0.08)",
          marginBottom: "1.5rem",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#63CAB7", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ color: "#63CAB7", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Tecnología · Soporte · Desarrollo
          </span>
        </div>
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 800,
          color: "#fff", lineHeight: 1.1, margin: "0 0 1.5rem",
        }}>
          Tu aliado en{" "}
          <span style={{ background: "linear-gradient(135deg, #63CAB7, #4A90D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            tecnología
          </span>{" "}
          empresarial
        </h1>
        <p style={{
          color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", lineHeight: 1.75,
          fontFamily: "'DM Sans', sans-serif", marginBottom: "2.5rem", maxWidth: "480px",
        }}>
          Soporte técnico, mantenimiento y desarrollo de software a medida para impulsar tu empresa.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/registro" style={{
            padding: "0.85rem 2rem", borderRadius: "10px",
            background: "linear-gradient(135deg, #63CAB7, #4A90D9)",
            color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
            fontSize: "0.95rem", textDecoration: "none",
            boxShadow: "0 8px 30px rgba(99,202,183,0.35)", transition: "all 0.3s",
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(99,202,183,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(99,202,183,0.35)"; }}>
            Comenzar Ahora <FaArrowRight />
          </Link>
          <Link to="/login" style={{
            padding: "0.85rem 2rem", borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)",
            color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
            fontSize: "0.95rem", textDecoration: "none", transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#63CAB7"; e.currentTarget.style.color = "#63CAB7"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#fff"; }}>
            Ver Servicios
          </Link>
        </div>
        <div style={{ display: "flex", gap: "2.5rem", marginTop: "3rem", flexWrap: "wrap" }}>
          {[["500+", "Clientes"], ["5★", "Calificación"], ["24h", "Soporte"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "2rem", fontWeight: 800, color: "#63CAB7" }}>{n}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <ImageSlider />
      </div>
    </div>
  </section>
);

/* ─── SERVICES SECTION (Soporte técnico) ─── */
const techServices = [
  { icon: <FaShieldAlt />, title: "Mantenimientos Preventivos", description: "Automatizamos la asignación y recordatorios de citas para mantener tus equipos en óptimas condiciones.", color: "#63CAB7" },
  { icon: <FaLaptop />, title: "Instalación de Sistemas Operativos", description: "Instalamos sistemas operativos de forma rápida y segura, con todos los drivers actualizados.", color: "#4A90D9" },
  { icon: <FaHeadset />, title: "Asistencia Remota", description: "Soporte técnico inmediato con notificaciones en tiempo real sin necesidad de desplazamientos.", color: "#7B68EE" },
  { icon: <FaFileWord />, title: "Instalación de Microsoft Office", description: "Configuración profesional con herramientas personalizadas para pacientes y administradores.", color: "#63CAB7" },
  { icon: <FaTools />, title: "Reparación de Portátiles y PC", description: "Diagnóstico y reparación de hardware y software, incluyendo cambio de piezas y optimización.", color: "#4A90D9" },
];

const ServiceCard = ({ icon, title, description, color, index }) => {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} style={{
      background: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
      border: `1px solid ${hovered ? color : "rgba(255,255,255,0.08)"}`,
      borderRadius: "16px", padding: "2rem",
      transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
      transform: inView ? "translateY(0)" : "translateY(30px)",
      opacity: inView ? 1 : 0,
      transitionDelay: `${index * 0.08}s`,
      cursor: "default",
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div style={{
        width: 52, height: 52, borderRadius: "12px",
        background: `${color}18`, border: `1px solid ${color}40`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.4rem", color, marginBottom: "1.25rem", transition: "all 0.3s",
        boxShadow: hovered ? `0 0 20px ${color}30` : "none",
      }}>{icon}</div>
      <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#fff", margin: "0 0 0.75rem" }}>{title}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: "0 0 1.25rem" }}>{description}</p>
      <Link to="/login" style={{
        display: "inline-flex", alignItems: "center", gap: "0.4rem",
        color, fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem",
        fontWeight: 600, textDecoration: "none", transition: "gap 0.2s",
      }}
        onMouseEnter={e => { e.currentTarget.style.gap = "0.7rem"; }}
        onMouseLeave={e => { e.currentTarget.style.gap = "0.4rem"; }}>
        Más información <FaArrowRight style={{ fontSize: "0.8rem" }} />
      </Link>
    </div>
  );
};

const ServicesSection = () => {
  const [ref, inView] = useInView();
  return (
    <section style={{ background: "#0D1120", padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={ref} style={{
          textAlign: "center", marginBottom: "4rem",
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.6s",
        }}>
          <span style={{
            display: "inline-block", padding: "0.3rem 1rem", borderRadius: "20px",
            border: "1px solid rgba(99,202,183,0.3)", background: "rgba(99,202,183,0.07)",
            color: "#63CAB7", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem",
          }}>Soporte Técnico</span>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", margin: "0 0 1rem" }}>
            Todo lo que tu empresa necesita
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "1rem", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
            Soluciones integrales de tecnología para mantener tu negocio funcionando sin interrupciones.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {techServices.map((s, i) => <ServiceCard key={i} {...s} index={i} />)}
        </div>
      </div>
    </section>
  );
};

/* ─── DEVELOPMENT SECTION ─── */
const devServices = [
  { icon: <FaCode />, title: "Desarrollo Web", description: "Creamos sitios y aplicaciones web modernas, rápidas y responsivas con React, Node.js y las últimas tecnologías del mercado.", color: "#63CAB7", tag: "Frontend & Backend" },
  { icon: <FaDatabase />, title: "Bases de Datos & APIs", description: "Diseño e implementación de bases de datos relacionales y no relacionales, integración de APIs REST y microservicios.", color: "#7B68EE", tag: "Backend" },
  { icon: <FaPalette />, title: "Diseño UI/UX", description: "Interfaces atractivas y funcionales. Prototipado, wireframes y diseño de experiencias digitales que convierten.", color: "#63CAB7", tag: "Diseño" },
  { icon: <FaRocket />, title: "Sistemas a Medida", description: "Desarrollamos software personalizado para tu negocio: CRM, ERP, paneles administrativos y automatizaciones.", color: "#4A90D9", tag: "Software" },
  { icon: <FaCogs />, title: "Mantenimiento de Software", description: "Actualizaciones, corrección de errores, mejoras de rendimiento y escalabilidad para tus proyectos en producción.", color: "#7B68EE", tag: "DevOps" },
];

const DevCard = ({ icon, title, description, color, tag, index }) => {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} style={{
      background: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
      border: `1px solid ${hovered ? color : "rgba(255,255,255,0.07)"}`,
      borderRadius: "16px", padding: "2rem",
      transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
      transform: inView ? "translateY(0)" : "translateY(30px)",
      opacity: inView ? 1 : 0,
      transitionDelay: `${index * 0.08}s`,
      cursor: "default", position: "relative", overflow: "hidden",
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {/* Glow corner */}
      <div style={{
        position: "absolute", top: -40, right: -40,
        width: 120, height: 120, borderRadius: "50%",
        background: `${color}${hovered ? "18" : "08"}`,
        transition: "all 0.4s", pointerEvents: "none",
      }} />
      {/* Tag */}
      <div style={{
        display: "inline-block", padding: "0.2rem 0.7rem", borderRadius: "20px",
        background: `${color}15`, border: `1px solid ${color}35`,
        color, fontSize: "0.72rem", fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase",
        marginBottom: "1.25rem",
      }}>{tag}</div>
      <div style={{
        width: 52, height: 52, borderRadius: "12px",
        background: `${color}18`, border: `1px solid ${color}40`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.4rem", color, marginBottom: "1.25rem",
        boxShadow: hovered ? `0 0 20px ${color}30` : "none", transition: "all 0.3s",
      }}>{icon}</div>
      <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#fff", margin: "0 0 0.75rem" }}>{title}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: "0 0 1.25rem" }}>{description}</p>
      <Link to="/contactenos" style={{
        display: "inline-flex", alignItems: "center", gap: "0.4rem",
        color, fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem",
        fontWeight: 600, textDecoration: "none", transition: "gap 0.2s",
      }}
        onMouseEnter={e => { e.currentTarget.style.gap = "0.7rem"; }}
        onMouseLeave={e => { e.currentTarget.style.gap = "0.4rem"; }}>
        Solicitar cotización <FaArrowRight style={{ fontSize: "0.8rem" }} />
      </Link>
    </div>
  );
};

const DevSection = () => {
  const [ref, inView] = useInView();
  const techs = ["React", "Node.js", "Python", "MongoDB", "PostgreSQL", "Vite", "Express", "React Native"];
  return (
    <section style={{ background: "#0A0E1B", padding: "6rem 2rem", position: "relative", overflow: "hidden" }}>
      {/* Blob decorativo */}
      <div style={{
        position: "absolute", top: "10%", left: "-5%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,202,183,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "5%", right: "-5%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(74,144,217,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>

        {/* Header */}
        <div ref={ref} style={{
          textAlign: "center", marginBottom: "5rem",
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.6s",
        }}>
          <span style={{
            display: "inline-block", padding: "0.3rem 1rem", borderRadius: "20px",
            border: "1px solid rgba(74,144,217,0.35)", background: "rgba(74,144,217,0.08)",
            color: "#4A90D9", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem",
          }}>Desarrollo de Software</span>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 800, color: "#fff", margin: "0 0 1rem", lineHeight: 1.1,
          }}>
            También somos{" "}
            <span style={{ background: "linear-gradient(135deg, #63CAB7, #4A90D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              desarrolladores
            </span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)",
            fontSize: "1rem", maxWidth: "560px", margin: "0 auto 2.5rem", lineHeight: 1.75,
          }}>
            Más allá del soporte técnico, construimos soluciones digitales a medida: desde sitios web hasta sistemas empresariales completos.
          </p>

          {/* Tech stack pills */}
          <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", flexWrap: "wrap" }}>
            {techs.map(t => (
              <span key={t} style={{
                padding: "0.3rem 0.9rem", borderRadius: "20px",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem", fontWeight: 500,
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {devServices.map((s, i) => <DevCard key={i} {...s} index={i} />)}
        </div>

        {/* CTA banner */}
        <div style={{
          marginTop: "4rem", padding: "2.5rem 2rem",
          background: "linear-gradient(135deg, rgba(99,202,183,0.06), rgba(74,144,217,0.06))",
          border: "1px solid rgba(99,202,183,0.15)", borderRadius: "20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "1.5rem",
        }}>
          <div>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#fff", margin: "0 0 0.4rem" }}>
              ¿Tienes un proyecto en mente?
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", margin: 0 }}>
              Hablemos — te damos una cotización sin compromiso.
            </p>
          </div>
          <Link to="/contactenos" style={{
            padding: "0.85rem 2rem", borderRadius: "10px",
            background: "linear-gradient(135deg, #63CAB7, #4A90D9)",
            color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
            fontSize: "0.95rem", textDecoration: "none",
            boxShadow: "0 8px 25px rgba(99,202,183,0.3)",
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            transition: "all 0.3s", whiteSpace: "nowrap",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}>
            Contactar ahora <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ─── DOWNLOADS ─── */
const downloads = [
  { id: 1, name: "Google Chrome", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/512px-Google_Chrome_icon_%28February_2022%29.svg.png", downloadUrl: "https://dl.google.com/chrome/install/ChromeStandaloneSetup64.exe", description: "Navegador web rápido y seguro" },
  { id: 2, name: "Mozilla Firefox", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/512px-Firefox_logo%2C_2019.svg.png", downloadUrl: "https://download.mozilla.org/?product=firefox-latest&os=win64&lang=es-ES", description: "Navegador de código abierto" },
  { id: 3, name: "Microsoft Edge", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Microsoft_Edge_logo_%282019%29.svg/512px-Microsoft_Edge_logo_%282019%29.svg.png", downloadUrl: "https://go.microsoft.com/fwlink/?linkid=2108834&Channel=Stable&language=es", description: "Navegador moderno de Microsoft" },
  { id: 4, name: "Anydesk", image: "https://softwareforyou.lt/wp-content/uploads/2024/02/AnyDesk-new.png", downloadUrl: "https://anydesk.com/es/downloads/thank-you?dv=win_exe", description: "Escritorio remoto para Windows" },
  { id: 5, name: "Zoom", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Zoom_Communications_Logo.svg/512px-Zoom_Communications_Logo.svg.png", downloadUrl: "https://zoom.us/client/latest/ZoomInstaller.exe", description: "Videoconferencias y reuniones" },
  { id: 6, name: "Adobe Reader", image: "https://www.uab.edu/elearning/images/pictures/academic-technologies/logos/adobe.png", downloadUrl: "https://get.adobe.com/es/reader/", description: "Lector de documentos PDF" },
  { id: 7, name: "WinRAR", image: "https://keyoriginal.com/wp-content/uploads/2023/12/winrar-min.png", downloadUrl: "https://www.win-rar.com/fileadmin/winrar-versions/winrar/winrar-x64-624.exe", description: "Compresor de archivos" },
];

const DownloadCard = ({ name, image, downloadUrl, description, index }) => {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = name.replace(/\s+/g, "_") + ".exe";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => document.body.removeChild(link), 100);
  };
  return (
    <div ref={ref} style={{
      background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
      border: `1px solid ${hovered ? "rgba(99,202,183,0.5)" : "rgba(255,255,255,0.07)"}`,
      borderRadius: "16px", padding: "1.75rem",
      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
      transform: inView ? "translateY(0)" : "translateY(25px)",
      opacity: inView ? 1 : 0, transitionDelay: `${index * 0.06}s`,
    }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{
        width: 80, height: 80, borderRadius: "16px",
        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "1rem", padding: "1rem", boxSizing: "border-box",
        boxShadow: hovered ? "0 0 25px rgba(99,202,183,0.2)" : "none", transition: "all 0.3s",
      }}>
        <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: "contain" }}
          onError={e => { e.target.src = `https://via.placeholder.com/60?text=${name[0]}`; }} />
      </div>
      <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#fff", margin: "0 0 0.4rem" }}>{name}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.84rem", color: "rgba(255,255,255,0.45)", margin: "0 0 1.25rem", lineHeight: 1.6 }}>{description}</p>
      <button onClick={handleDownload} style={{
        padding: "0.65rem 1.5rem", borderRadius: "8px", border: "none",
        background: "linear-gradient(135deg, #63CAB7, #4A90D9)",
        color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
        fontSize: "0.88rem", cursor: "pointer",
        display: "flex", alignItems: "center", gap: "0.4rem",
        boxShadow: hovered ? "0 6px 20px rgba(99,202,183,0.35)" : "none", transition: "all 0.2s",
      }}>
        <FaDownload style={{ fontSize: "0.8rem" }} /> Descargar
      </button>
    </div>
  );
};

const DownloadsSection = () => {
  const [ref, inView] = useInView();
  return (
    <section style={{ background: "#0D1120", padding: "6rem 2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "400px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(74,144,217,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        <div ref={ref} style={{
          textAlign: "center", marginBottom: "4rem",
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.6s",
        }}>
          <span style={{
            display: "inline-block", padding: "0.3rem 1rem", borderRadius: "20px",
            border: "1px solid rgba(74,144,217,0.3)", background: "rgba(74,144,217,0.07)",
            color: "#4A90D9", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem",
          }}>Descargas</span>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", margin: "0 0 1rem" }}>
            Software esencial para tu equipo
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "1rem", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
            Descarga las mejores aplicaciones directamente desde aquí.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
          {downloads.map((d, i) => <DownloadCard key={d.id} {...d} index={i} />)}
        </div>
      </div>
    </section>
  );
};

/* ─── TESTIMONIALS ─── */
const testimonials = [
  { name: "Liseth Mendez", role: "Asesora Televentas", text: "Excelente servicio de mantenimiento preventivo, mis equipos nunca habían funcionado tan bien.", stars: 5 },
  { name: "Karla Noguera", role: "Asesora Comercial", text: "Rápida instalación de mi sistema operativo con todos los programas que necesitaba.", stars: 5 },
  { name: "Mayerlin Villareal", role: "Estudiante y Asesora", text: "La asistencia remota me salvó cuando tenía un trabajo importante que entregar.", stars: 5 },
];

const TestimonialsSection = () => {
  const [ref, inView] = useInView();
  return (
    <section style={{ background: "#0A0E1B", padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: "4rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.6s" }}>
          <span style={{ display: "inline-block", padding: "0.3rem 1rem", borderRadius: "20px", border: "1px solid rgba(123,104,238,0.3)", background: "rgba(123,104,238,0.07)", color: "#7B68EE", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Testimonios</span>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", margin: 0 }}>Lo que dicen nuestros clientes</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {testimonials.map((t, i) => {
            const [cardRef, cardInView] = useInView();
            return (
              <div key={i} ref={cardRef} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "2rem", opacity: cardInView ? 1 : 0, transform: cardInView ? "none" : "translateY(25px)", transition: `all 0.5s ${i * 0.1}s` }}>
                <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                  {Array(t.stars).fill(0).map((_, si) => <FaStar key={si} style={{ color: "#F59E0B", fontSize: "0.9rem" }} />)}
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.96rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, fontStyle: "italic", margin: "0 0 1.5rem" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #63CAB7, #4A90D9)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#fff", fontSize: "1rem" }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#fff", fontSize: "0.92rem" }}>{t.name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─── FINAL CTA ─── */
const FinalCTA = () => {
  const [ref, inView] = useInView();
  return (
    <section style={{ background: "#0D1120", padding: "6rem 2rem" }}>
      <div ref={ref} style={{
        maxWidth: "800px", margin: "0 auto", textAlign: "center",
        background: "linear-gradient(135deg, rgba(99,202,183,0.08), rgba(74,144,217,0.08))",
        border: "1px solid rgba(99,202,183,0.2)", borderRadius: "24px", padding: "4rem 2rem",
        opacity: inView ? 1 : 0, transform: inView ? "none" : "scale(0.97)", transition: "all 0.6s",
      }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🚀</div>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#fff", margin: "0 0 1rem", lineHeight: 1.2 }}>
          ¿Listo para optimizar tu<br />experiencia tecnológica?
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "1rem", maxWidth: "450px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
          Únete a cientos de clientes que ya confían en nosotros para su soporte y desarrollo tecnológico.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/registro" style={{
            padding: "0.9rem 2.5rem", borderRadius: "10px",
            background: "linear-gradient(135deg, #63CAB7, #4A90D9)",
            color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
            fontSize: "1rem", textDecoration: "none",
            boxShadow: "0 8px 30px rgba(99,202,183,0.35)",
            display: "inline-flex", alignItems: "center", gap: "0.5rem", transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}>
            Regístrate Gratis <FaArrowRight />
          </Link>
          <Link to="/contactenos" style={{
            padding: "0.9rem 2rem", borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.2)", background: "transparent",
            color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
            fontSize: "1rem", textDecoration: "none", transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#63CAB7"; e.currentTarget.style.color = "#63CAB7"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#fff"; }}>
            Contáctanos
          </Link>
        </div>
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginTop: "2.5rem", flexWrap: "wrap" }}>
          {["Sin compromisos", "Soporte inmediato", "Precios justos"].map(feat => (
            <div key={feat} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <FaCheck style={{ color: "#63CAB7", fontSize: "0.8rem" }} />
              <span style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem" }}>{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── FOOTER ─── */
const Footer = () => (
  <footer style={{ background: "#060810", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2.5rem 2rem" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: "8px", background: "linear-gradient(135deg, #63CAB7, #4A90D9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={logo} alt="logo" style={{ width: 22, height: 22, objectFit: "contain" }} />
        </div>
        <div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>EL MUNDO DE LA TECNOLOGÍA</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>
            created by: Kevin Rivas · Tatiana Montoya ·{" "}
            <a href="https://mi-cv-juan-granja.vercel.app/" target="_blank" rel="noreferrer" style={{ color: "#63CAB7", textDecoration: "none" }}>Juan Granja</a>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
        {[{ path: "/contactenos", label: "Contacto" }, { path: "/terminos", label: "Términos" }, { path: "/privacidad", label: "Privacidad" }].map(item => (
          <Link key={item.path} to={item.path} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => { e.target.style.color = "#63CAB7"; }}
            onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.4)"; }}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  </footer>
);

/* ─── GLOBAL STYLES + MAIN ─── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root {
      margin: 0 !important; padding: 0 !important;
      background: #0A0E1B !important; color: #fff;
      scroll-behavior: smooth; width: 100%; overflow-x: hidden;
    }
    .landing-container, .hero, .services, .downloads, .testimonials, .final-cta {
      background: transparent; margin: 0 !important;
      padding-left: 0 !important; padding-right: 0 !important;
    }
    #tsparticles { display: none !important; }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.85); }
    }
    @media (max-width: 900px) {
      .hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
      .desktop-nav { display: none !important; }
      .mobile-toggle { display: flex !important; }
    }
    @media (max-width: 600px) {
      section { padding: 4rem 1.25rem !important; }
    }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0A0E1B; }
    ::-webkit-scrollbar-thumb { background: rgba(99,202,183,0.4); border-radius: 3px; }
  `}</style>
);

const LandingPage = () => (
  <>
    <GlobalStyles />
    <div style={{ background: "#0A0E1B" }}>
      <Header />
      <HeroSection />
      <ServicesSection />
      <DevSection />
      <DownloadsSection />
      <TestimonialsSection />
      <FinalCTA />
      <Footer />
    </div>
  </>
);

export default LandingPage;
