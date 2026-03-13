import "../styles/LandinPage.css";
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

  const handleScrollToSolutions = () => {
    const el = document.getElementById("soluciones-efectivas");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  const navItems = [
    { path: "/quienes-somos", label: "Quiénes Somos" },
    { path: "/contactenos",   label: "Contacto" },
    { path: "/blog",          label: "Blog" },
    { path: "/login",         label: "Iniciar Sesión" },
  ];

  return (
    <header className={`lp-header${scrolled ? " scrolled" : ""}`}>
      <div className="lp-header__brand">
        <div className="lp-header__logo">
          <img src={logo} alt="logo" />
        </div>
        <span className="lp-header__name">
          EL MUNDO DE<br /><span>LA TECNOLOGÍA</span>
        </span>
      </div>

      <nav className="lp-header__nav">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className="lp-nav-link">{item.label}</Link>
        ))}
        <button
          type="button"
          className="lp-nav-link"
          onClick={handleScrollToSolutions}
        >
          Soluciones Efectivas
        </button>
        <Link to="/registro" className="lp-nav-cta">Registrarse</Link>
      </nav>

      <button className="lp-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {menuOpen && (
        <div className="lp-mobile-menu">
          <button type="button" onClick={handleScrollToSolutions}>
            Soluciones Efectivas
          </button>
          {[...navItems, { path: "/registro", label: "Registrarse" }].map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setMenuOpen(false)}>{item.label}</Link>
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
    { src: "/galeria/tecnolo.jpg",       alt: "Instalación",   title: "Instalación de Software" },
    { src: "/galeria/soporte.jpg",       alt: "Soporte",       title: "Soporte Técnico Profesional" },
    { src: "/galeria/reparacion.jpg",    alt: "Reparación",    title: "Reparación de Computadoras" },
    { src: "/galeria/kevin.jpg",         alt: "Feria",         title: "Participación Feria Empresarial" },
  ];
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % galleryImages.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="lp-slider">
      {galleryImages.map((img, i) => i === current && (
        <div key={i} className="lp-slider__slide">
          <img src={img.src} alt={img.alt} className="lp-slider__img" />
          <div className="lp-slider__overlay">
            <span className="lp-slider__label">{img.title}</span>
          </div>
        </div>
      ))}
      <button className="lp-slider__arrow lp-slider__arrow--prev"
        onClick={() => setCurrent(c => (c - 1 + galleryImages.length) % galleryImages.length)}>
        <FaChevronLeft />
      </button>
      <button className="lp-slider__arrow lp-slider__arrow--next"
        onClick={() => setCurrent(c => (c + 1) % galleryImages.length)}>
        <FaChevronRight />
      </button>
      <div className="lp-slider__dots">
        {galleryImages.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`lp-slider__dot${i === current ? " lp-slider__dot--active" : ""}`} />
        ))}
      </div>
    </div>
  );
};

/* ─── HERO ─── */
const HeroSection = () => (
  <section className="lp-hero">
    <div className="lp-hero__blob1" />
    <div className="lp-hero__blob2" />
    <div className="lp-hero__grid-bg" />
    <div className="lp-hero__inner">
      <div>
        <div className="lp-hero__badge">
          <span className="lp-hero__badge-dot" />
          <span className="lp-hero__badge-text">Tecnología · Soporte · Desarrollo</span>
        </div>
        <h1 className="lp-hero__h1">
          Tu aliado en{" "}
          <span>tecnología</span>{" "}
          empresarial
        </h1>
        <p className="lp-hero__sub">
          Soporte técnico, mantenimiento y desarrollo de software a medida para impulsar tu empresa.
        </p>
        <div className="lp-hero__btns">
          <Link to="/registro" className="lp-btn-primary">Comenzar Ahora <FaArrowRight /></Link>
          <Link to="/login"    className="lp-btn-ghost">Ver Servicios</Link>
        </div>
        <div className="lp-hero__stats">
          {[["500+", "Clientes"], ["5★", "Calificación"], ["24h", "Soporte"]].map(([n, l]) => (
            <div key={l}>
              <div className="lp-hero__stat-n">{n}</div>
              <div className="lp-hero__stat-l">{l}</div>
            </div>
          ))}
        </div>
      </div>
      <ImageSlider />
    </div>
  </section>
);

/* ─── SERVICES ─── */
const techServices = [
  { icon: <FaShieldAlt />, title: "Mantenimientos Preventivos",        description: "Automatizamos la asignación y recordatorios de citas para mantener tus equipos en óptimas condiciones.", color: "#63CAB7" },
  { icon: <FaLaptop />,    title: "Instalación de Sistemas Operativos", description: "Instalamos sistemas operativos de forma rápida y segura, con todos los drivers actualizados.",           color: "#4A90D9" },
  { icon: <FaHeadset />,   title: "Asistencia Remota",                  description: "Soporte técnico inmediato con notificaciones en tiempo real sin necesidad de desplazamientos.",            color: "#7B68EE" },
  { icon: <FaFileWord />,  title: "Instalación de Microsoft Office",    description: "Configuración profesional con herramientas personalizadas para pacientes y administradores.",              color: "#63CAB7" },
  { icon: <FaTools />,     title: "Reparación de Portátiles y PC",      description: "Diagnóstico y reparación de hardware y software, incluyendo cambio de piezas y optimización.",             color: "#4A90D9" },
];

const ServiceCard = ({ icon, title, description, color, index }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`lp-card${inView ? " in-view" : ""}`}
      style={{ transitionDelay: `${index * 0.08}s`, borderColor: undefined }}>
      <div className="lp-card__icon"
        style={{ background: `${color}18`, border: `1px solid ${color}40`, color }}>
        {icon}
      </div>
      <h3 className="lp-card__h3">{title}</h3>
      <p className="lp-card__p">{description}</p>
      <Link to="/login" className="lp-card__link" style={{ color }}>
        Más información <FaArrowRight style={{ fontSize: "0.8rem" }} />
      </Link>
    </div>
  );
};

const ServicesSection = () => {
  const [ref, inView] = useInView();
  return (
    <section className="lp-section lp-section--dark">
      <div className="lp-section__inner">
        <div ref={ref} className={`lp-section__head${inView ? " in-view" : ""}`}>
          <span className="lp-eyebrow lp-eyebrow--teal">Soporte Técnico</span>
          <h2 className="lp-section__h2">Todo lo que tu empresa necesita</h2>
          <p className="lp-section__sub">Soluciones integrales de tecnología para mantener tu negocio funcionando sin interrupciones.</p>
        </div>
        <div className="lp-services__grid">
          {techServices.map((s, i) => <ServiceCard key={i} {...s} index={i} />)}
        </div>
      </div>
    </section>
  );
};

/* ─── DEV SECTION ─── */
const devServices = [
  { icon: <FaCode />,     title: "Desarrollo Web",            description: "Creamos sitios y aplicaciones web modernas, rápidas y responsivas con React, Node.js y las últimas tecnologías del mercado.", color: "#63CAB7", tag: "Frontend & Backend" },
  { icon: <FaDatabase />, title: "Bases de Datos & APIs",     description: "Diseño e implementación de bases de datos relacionales y no relacionales, integración de APIs REST y microservicios.",         color: "#7B68EE", tag: "Backend" },
  { icon: <FaPalette />,  title: "Diseño UI/UX",              description: "Interfaces atractivas y funcionales. Prototipado, wireframes y diseño de experiencias digitales que convierten.",               color: "#63CAB7", tag: "Diseño" },
  { icon: <FaRocket />,   title: "Sistemas a Medida",         description: "Desarrollamos software personalizado para tu negocio: CRM, ERP, paneles administrativos y automatizaciones.",                   color: "#4A90D9", tag: "Software" },
  { icon: <FaCogs />,     title: "Mantenimiento de Software", description: "Actualizaciones, corrección de errores, mejoras de rendimiento y escalabilidad para tus proyectos en producción.",              color: "#7B68EE", tag: "DevOps" },
];

const DevCard = ({ icon, title, description, color, tag, index }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`lp-dev-card${inView ? " in-view" : ""}`}
      style={{ transitionDelay: `${index * 0.08}s` }}>
      <div className="lp-dev-card__glow" style={{ background: color }} />
      <span className="lp-dev-card__tag"
        style={{ background: `${color}15`, border: `1px solid ${color}35`, color }}>
        {tag}
      </span>
      <div className="lp-dev-card__icon"
        style={{ background: `${color}18`, border: `1px solid ${color}40`, color }}>
        {icon}
      </div>
      <h3 className="lp-card__h3">{title}</h3>
      <p className="lp-card__p">{description}</p>
      <Link to="/contactenos" className="lp-card__link" style={{ color }}>
        Solicitar cotización <FaArrowRight style={{ fontSize: "0.8rem" }} />
      </Link>
    </div>
  );
};

const DevSection = () => {
  const [ref, inView] = useInView();
  const techs = ["React", "Node.js", "Python", "MongoDB", "PostgreSQL", "Vite", "Express", "React Native"];
  return (
    <section className="lp-section lp-section--darker lp-dev">
      <div className="lp-dev__blob1" />
      <div className="lp-dev__blob2" />
      <div className="lp-section__inner">
        <div ref={ref} className={`lp-section__head lp-dev__head${inView ? " in-view" : ""}`}>
          <span className="lp-eyebrow lp-eyebrow--blue">Desarrollo de Software</span>
          <h2 className="lp-dev__h2 lp-section__h2">
            También somos{" "}<span>desarrolladores</span>
          </h2>
          <p className="lp-section__sub lp-dev__sub">
            Más allá del soporte técnico, construimos soluciones digitales a medida: desde sitios web hasta sistemas empresariales completos.
          </p>
          <div className="lp-dev__techs">
            {techs.map(t => <span key={t} className="lp-dev__tech">{t}</span>)}
          </div>
        </div>
        <div className="lp-dev__grid">
          {devServices.map((s, i) => <DevCard key={i} {...s} index={i} />)}
        </div>
        <div className="lp-dev__cta-banner">
          <div>
            <h3 className="lp-dev__cta-h3">¿Tienes un proyecto en mente?</h3>
            <p className="lp-dev__cta-sub">Hablemos — te damos una cotización sin compromiso.</p>
          </div>
          <Link to="/contactenos" className="lp-btn-primary--sm">
            Contactar ahora <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ─── CASE STUDY SECTION ─── */
const caseProjects = [
  {
    tab:      "Gestor de Tareas",
    url:      "gestor.elmundodelatecnologia.com",
    accent:   "#7B68EE",
    badge:    "En producción · Funcionando al 100%",
    title:    <>Gestor de Tareas<br /><span>Colaborativo a Medida</span></>,
    desc:     "Un sistema completo para gestionar el trabajo interno del equipo: creación de tareas, asignación de responsables, seguimiento de estados y métricas de productividad. Diseñado, desarrollado y entregado en tiempo récord.",
    features: [
      "Panel de métricas: Completadas, Pendientes y Total",
      "Creación y asignación de tareas a técnicos",
      "Estados en tiempo real: Pendiente · En Proceso · Completada",
      "Historial completo con fechas y registro de ediciones",
      "Sistema de notas, observaciones y comentarios",
      "Interfaz responsiva, rápida e intuitiva",
    ],
    slides: [
      { src: "/cases/gestor-login.png",    alt: "Login",    label: "Acceso seguro",        caption: "Autenticación personalizada con fondo temático e interfaz limpia y moderna." },
      { src: "/cases/gestor-form.png",     alt: "Tareas",   label: "Creación de tareas",   caption: "Panel de estadísticas en tiempo real y formulario intuitivo con asignación de técnico." },
      { src: "/cases/gestor-tablero.png",  alt: "Tablero",  label: "Tablero colaborativo", caption: "Vista de tarjetas con estados, historial de ediciones y seguimiento por responsable." },
    ],
  },
  {
    tab:      "Tienda Virtual",
    url:      "tienda.elmundodelatecnologia.com",
    accent:   "#63CAB7",
    badge:    "En producción · Funcionando al 100%",
    title:    <>Tienda Virtual<br /><span style={{ color: "#63CAB7" }}>de Ropa a Medida</span></>,
    desc:     "E-commerce completo con catálogo de productos, carrito de compras y panel de administración para gestionar el inventario. El administrador puede agregar, editar y eliminar productos en tiempo real.",
    features: [
      "Catálogo de productos con filtros y búsqueda",
      "Carrito de compras con gestión de cantidades",
      "Panel admin: agregar, editar y eliminar productos",
      "Subida de imágenes y gestión de inventario",
      "Diseño atractivo y experiencia de compra fluida",
      "Interfaz responsiva optimizada para móviles",
    ],
    slides: [
      { src: "/cases/tienda-catalogo.png", alt: "Catálogo", label: "Catálogo",    caption: "Vitrina de productos con tarjetas visuales, filtros y búsqueda en tiempo real." },
      { src: "/cases/tienda-carrito.png",  alt: "Carrito",  label: "Carrito",     caption: "Gestión de compras con control de cantidades y resumen del pedido al instante." },
      { src: "/cases/tienda-admin.png",    alt: "Admin",    label: "Panel Admin", caption: "Panel privado para agregar, editar y eliminar productos con subida de imágenes." },
    ],
  },
  {
    tab:      "Gestor Documental",
    url:      "docs.elmundodelatecnologia.com",
    accent:   "#4A90D9",
    badge:    "En producción · Funcionando al 100%",
    title:    <>Gestor Documental<br /><span style={{ color: "#4A90D9" }}>con Firma Digital</span></>,
    desc:     "Sistema de gestión documental que automatiza el diligenciamiento de formatos PDF personalizados: listas de asistencia, entrega de dotación y cualquier formato de la compañía. Incluye firma digital, panel de administrador y registro de usuarios.",
    features: [
      "Diligenciamiento automático de formatos PDF a medida",
      "Firma digital integrada directamente en el documento",
      "Biblioteca de formatos: dotación, asistencia y más",
      "Panel de administrador: registro y gestión de usuarios",
      "Cambio de contraseña y control de accesos por rol",
      "Descarga del PDF diligenciado al instante",
    ],
    slides: [
      { src: "/cases/docs-panel.png",    alt: "Panel usuario",   label: "Panel de documentos", caption: "Vista principal del usuario con todos los formatos disponibles de la compañía." },
      { src: "/cases/docs-creacion.png", alt: "Crear documento", label: "Creación y firma",    caption: "Formulario inteligente con firma digital para diligenciar el formato en línea." },
      { src: "/cases/docs-pdf.png",      alt: "PDF final",       label: "Documento final",     caption: "Resultado: el formato queda completamente diligenciado y listo para descargar." },
    ],
  },
];

const CaseStudySection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [current, setCurrent]     = useState(0);
  const [paused, setPaused]       = useState(false);
  const [ref, inView]             = useInView();

  const project = caseProjects[activeTab];

  // Reset slide when switching tabs
  const switchTab = (i) => { setActiveTab(i); setCurrent(0); };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % project.slides.length), 5000);
    return () => clearInterval(t);
  }, [paused, activeTab, project.slides.length]);

  return (
    <section
      id="soluciones-efectivas"
      className="lp-section lp-section--dark lp-case"
    >
      <div className="lp-case__blob1" />
      <div className="lp-case__blob2" />
      <div className="lp-section__inner">

        {/* Encabezado */}
        <div ref={ref} className={`lp-section__head lp-case__head${inView ? " in-view" : ""}`}>
          <span className="lp-eyebrow lp-eyebrow--violet">✦ Soluciones Efectivas · Casos Reales ✦</span>
          <h2 className="lp-section__h2" style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}>
            Software que ya está{" "}
            <span className="grad-teal-violet">transformando negocios</span>
          </h2>
          <p className="lp-section__sub lp-case__sub">
            Proyectos reales, entregados y funcionando. Cada solución fue construida
            a medida para las necesidades específicas del cliente.
          </p>

          {/* Tabs selector */}
          <div className="lp-case__tabs">
            {caseProjects.map((p, i) => (
              <button key={i} onClick={() => switchTab(i)}
                className={`lp-case__tab${activeTab === i ? " lp-case__tab--active" : ""}`}
                style={{ "--tab-accent": p.accent }}>
                {p.tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="lp-case__grid">

          {/* Carrusel */}
          <div className="lp-case__carousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}>

            <div className="lp-case__frame" style={{ borderColor: `${project.accent}40` }}>
              <div className="lp-case__winbar">
                <div className="lp-case__dot lp-case__dot--red" />
                <div className="lp-case__dot lp-case__dot--yellow" />
                <div className="lp-case__dot lp-case__dot--green" />
                <span className="lp-case__url">{project.url}</span>
              </div>

              <div className="lp-case__slides">
                {project.slides.map((s, i) => (
                  <div key={i} className={`lp-case__slide${i === current ? " lp-case__slide--active" : ""}`}>
                    <img src={s.src} alt={s.alt} />
                  </div>
                ))}
                <div className="lp-case__caption">
                  <span className="lp-case__caption-badge"
                    style={{ background: `${project.accent}25`, borderColor: `${project.accent}55`, color: project.accent }}>
                    {project.slides[current].label}
                  </span>
                  <p className="lp-case__caption-text">{project.slides[current].caption}</p>
                </div>
              </div>
            </div>

            {/* Controles */}
            <div className="lp-case__controls">
              <button className="lp-case__arrow"
                style={{ borderColor: `${project.accent}40`, color: project.accent }}
                onClick={() => setCurrent(c => (c - 1 + project.slides.length) % project.slides.length)}>
                <FaChevronLeft />
              </button>
              <button className="lp-case__arrow"
                style={{ borderColor: `${project.accent}40`, color: project.accent }}
                onClick={() => setCurrent(c => (c + 1) % project.slides.length)}>
                <FaChevronRight />
              </button>
              <div className="lp-case__pips">
                {project.slides.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)}
                    className={`lp-case__pip${i === current ? " lp-case__pip--active" : ""}`}
                    style={i === current ? { background: project.accent } : {}} />
                ))}
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="lp-case__text">
            <div>
              <div className="lp-case__live-badge">
                <span className="lp-case__live-dot" />
                <span className="lp-case__live-label">{project.badge}</span>
              </div>
              <h3 className="lp-case__h3">{project.title}</h3>
              <p className="lp-case__desc">{project.desc}</p>
            </div>

            <ul className="lp-case__features">
              {project.features.map((f, i) => (
                <li key={i} className="lp-case__feat">
                  <FaCheck className="lp-case__feat-icon" style={{ color: project.accent }} />
                  {f}
                </li>
              ))}
            </ul>

            <div className="lp-case__footer">
              <Link to="/contactenos" className="lp-btn-violet"
                style={{ background: `linear-gradient(135deg, ${project.accent}, #4A90D9)` }}>
                Quiero algo así <FaArrowRight style={{ fontSize: "0.8rem" }} />
              </Link>
              <span className="lp-case__no-commit">Sin compromiso</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── DOWNLOADS ─── */
const downloads = [
  { id: 1, name: "Google Chrome",  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/512px-Google_Chrome_icon_%28February_2022%29.svg.png", downloadUrl: "https://dl.google.com/chrome/install/ChromeStandaloneSetup64.exe",                  description: "Navegador web rápido y seguro" },
  { id: 2, name: "Mozilla Firefox", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/512px-Firefox_logo%2C_2019.svg.png",                                     downloadUrl: "https://download.mozilla.org/?product=firefox-latest&os=win64&lang=es-ES",         description: "Navegador de código abierto" },
  { id: 3, name: "Microsoft Edge",  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Microsoft_Edge_logo_%282019%29.svg/512px-Microsoft_Edge_logo_%282019%29.svg.png",                   downloadUrl: "https://go.microsoft.com/fwlink/?linkid=2108834&Channel=Stable&language=es",       description: "Navegador moderno de Microsoft" },
  { id: 4, name: "Anydesk",         image: "https://softwareforyou.lt/wp-content/uploads/2024/02/AnyDesk-new.png",                                                                                       downloadUrl: "https://anydesk.com/es/downloads/thank-you?dv=win_exe",                           description: "Escritorio remoto para Windows" },
  { id: 5, name: "Zoom",            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Zoom_Communications_Logo.svg/512px-Zoom_Communications_Logo.svg.png",                              downloadUrl: "https://zoom.us/client/latest/ZoomInstaller.exe",                                  description: "Videoconferencias y reuniones" },
  { id: 6, name: "Adobe Reader",    image: "https://www.uab.edu/elearning/images/pictures/academic-technologies/logos/adobe.png",                                                                         downloadUrl: "https://get.adobe.com/es/reader/",                                                 description: "Lector de documentos PDF" },
  { id: 7, name: "WinRAR",          image: "https://keyoriginal.com/wp-content/uploads/2023/12/winrar-min.png",                                                                                           downloadUrl: "https://www.win-rar.com/fileadmin/winrar-versions/winrar/winrar-x64-624.exe",       description: "Compresor de archivos" },
];

const DownloadCard = ({ name, image, downloadUrl, description, index }) => {
  const [ref, inView] = useInView();
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = name.replace(/\s+/g, "_") + ".exe";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => document.body.removeChild(link), 100);
  };
  return (
    <div ref={ref} className={`lp-dl-card${inView ? " in-view" : ""}`}
      style={{ transitionDelay: `${index * 0.06}s` }}>
      <div className="lp-dl-card__img-wrap">
        <img src={image} alt={name} onError={e => { e.target.src = `https://via.placeholder.com/60?text=${name[0]}`; }} />
      </div>
      <h3 className="lp-dl-card__name">{name}</h3>
      <p className="lp-dl-card__desc">{description}</p>
      <button onClick={handleDownload} className="lp-dl-card__btn">
        <FaDownload style={{ fontSize: "0.8rem" }} /> Descargar
      </button>
    </div>
  );
};

const DownloadsSection = () => {
  const [ref, inView] = useInView();
  return (
    <section className="lp-section lp-section--dark lp-dl">
      <div className="lp-dl__blob" />
      <div className="lp-section__inner">
        <div ref={ref} className={`lp-section__head${inView ? " in-view" : ""}`}>
          <span className="lp-eyebrow lp-eyebrow--blue2">Descargas</span>
          <h2 className="lp-section__h2">Software esencial para tu equipo</h2>
          <p className="lp-section__sub lp-dl__sub">Descarga las mejores aplicaciones directamente desde aquí.</p>
        </div>
        <div className="lp-dl__grid">
          {downloads.map((d, i) => <DownloadCard key={d.id} {...d} index={i} />)}
        </div>
      </div>
    </section>
  );
};

/* ─── TESTIMONIALS ─── */
const testimonials = [
  { name: "Liseth Mendez",    role: "Asesora Televentas",    text: "Excelente servicio de mantenimiento preventivo, mis equipos nunca habían funcionado tan bien.", stars: 5 },
  { name: "Karla Noguera",    role: "Asesora Comercial",     text: "Rápida instalación de mi sistema operativo con todos los programas que necesitaba.",            stars: 5 },
  { name: "Mayerlin Villareal", role: "Estudiante y Asesora", text: "La asistencia remota me salvó cuando tenía un trabajo importante que entregar.",               stars: 5 },
];

const TestimonialsSection = () => {
  const [ref, inView] = useInView();
  return (
    <section className="lp-section lp-section--darker">
      <div className="lp-section__inner">
        <div ref={ref} className={`lp-section__head${inView ? " in-view" : ""}`}>
          <span className="lp-eyebrow lp-eyebrow--purple">Testimonios</span>
          <h2 className="lp-section__h2">Lo que dicen nuestros clientes</h2>
        </div>
        <div className="lp-test__grid">
          {testimonials.map((t, i) => {
            const [cardRef, cardInView] = useInView();
            return (
              <div key={i} ref={cardRef}
                className={`lp-test-card${cardInView ? " in-view" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="lp-test-card__stars">
                  {Array(t.stars).fill(0).map((_, si) => <FaStar key={si} className="lp-test-card__star" />)}
                </div>
                <p className="lp-test-card__quote">"{t.text}"</p>
                <div className="lp-test-card__author">
                  <div className="lp-test-card__avatar">{t.name[0]}</div>
                  <div>
                    <div className="lp-test-card__name">{t.name}</div>
                    <div className="lp-test-card__role">{t.role}</div>
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
    <section className="lp-section lp-section--dark">
      <div ref={ref} className={`lp-cta__box${inView ? " in-view" : ""}`}>
        <div className="lp-cta__icon">🚀</div>
        <h2 className="lp-cta__h2">¿Listo para optimizar tu<br />experiencia tecnológica?</h2>
        <p className="lp-cta__sub">
          Únete a cientos de clientes que ya confían en nosotros para su soporte y desarrollo tecnológico.
        </p>
        <div className="lp-cta__btns">
          <Link to="/registro"   className="lp-btn-primary-lg">Regístrate Gratis <FaArrowRight /></Link>
          <Link to="/contactenos" className="lp-btn-ghost-lg">Contáctanos</Link>
        </div>
        <div className="lp-cta__perks">
          {["Sin compromisos", "Soporte inmediato", "Precios justos"].map(f => (
            <div key={f} className="lp-cta__perk">
              <FaCheck className="lp-cta__perk-icon" />
              <span className="lp-cta__perk-text">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── FOOTER ─── */
const Footer = () => (
  <footer className="lp-footer">
    <div className="lp-footer__inner">
      <div className="lp-footer__brand">
        <div className="lp-footer__logo">
          <img src={logo} alt="logo" />
        </div>
        <div>
          <div className="lp-footer__name">EL MUNDO DE LA TECNOLOGÍA</div>
          <div className="lp-footer__credits">
            created by: Kevin Rivas · Tatiana Montoya ·{" "}
            <a href="https://mi-cv-juan-granja.vercel.app/" target="_blank" rel="noreferrer">Juan Granja</a>
          </div>
        </div>
      </div>
      <div className="lp-footer__links">
        {[{ path: "/contactenos", label: "Contacto" }, { path: "/terminos", label: "Términos" }, { path: "/privacidad", label: "Privacidad" }].map(item => (
          <Link key={item.path} to={item.path} className="lp-footer__link">{item.label}</Link>
        ))}
      </div>
    </div>
  </footer>
);

/* ─── MAIN ─── */
const LandingPage = () => (
  <div className="lp-wrap">
    <Header />
    <HeroSection />
    <ServicesSection />
    <DevSection />
    <CaseStudySection />
    <DownloadsSection />
    <TestimonialsSection />
    <FinalCTA />
    <Footer />
  </div>
);

export default LandingPage;