import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Blog.css';
import logo from '../assets/mundo.ico';
import { FaBars, FaTimes, FaDownload } from 'react-icons/fa';

const blogPosts = [
  {
    tag: 'Mantenimiento',
    tagColor: '#63CAB7',
    title: 'Mantenimiento Preventivo de PCs',
    description: 'El mantenimiento preventivo se realiza a equipos en funcionamiento con el fin de prevenir posibles daños causados por uso o desgaste. A diferencia del mantenimiento correctivo, que repara aquellos que dejan de funcionar o están dañados.',
    media: [
      { type: 'image', src: '/image/mantenimiento.jpg', alt: 'PC mantenimiento' },
      { type: 'video', src: '/videos/mantenimiento.mp4' }
    ]
  },
  {
    tag: 'Software',
    tagColor: '#4A90D9',
    title: 'Sistemas Operativos',
    description: 'Explora los diferentes sistemas operativos y aprende cómo elegir el adecuado para tus necesidades. Descubre sus ventajas, características y usos.',
    media: [
      { type: 'image', src: '/image/sistemao-video.png', alt: 'Sistema operativo' },
      { type: 'video', src: '/videos/sistema-operativo.mp4' }
    ]
  },
  {
    tag: 'Reparación',
    tagColor: '#7B68EE',
    title: 'Reparación de Portátiles y PCs',
    description: 'Ofrecemos servicios de reparación para portátiles y PCs de todas las marcas y modelos. Desde problemas de hardware hasta fallos de software, estamos aquí para solucionar cualquier inconveniente.',
    media: [
      { type: 'image', src: '/image/reparacionpc.jpeg', alt: 'Reparación de PC' },
      { type: 'video', src: '/videos/reparacion.mp4' }
    ]
  },
  {
    tag: 'Consejos',
    tagColor: '#63CAB7',
    title: '¿Cómo cuidar mi computadora portátil?',
    descriptionHtml: `<ul class="blog-list">
      <li>Limpie su portátil regularmente con un paño suave.</li>
      <li>No lo utilices sobre camas o almohadas para evitar el sobrecalentamiento.</li>
      <li>Actualiza tu sistema operativo y programas con frecuencia.</li>
      <li>Apágalo o reinícialo al menos una vez por semana.</li>
    </ul>`,
    media: [{ type: 'video', src: '/videos/consejo.mp4' }]
  },
  {
    tag: 'Hardware',
    tagColor: '#4A90D9',
    title: 'Cambio de Disco Duro SSD',
    description: 'Servicio especializado de instalación y configuración de discos de estado sólido Kingston. Incluye formateo, optimización del sistema y verificación de rendimiento para garantizar mayor velocidad y eficiencia.',
    media: [
      { type: 'image', src: '/image/discoduro.jpg', alt: 'Instalación de Disco Duro' },
      { type: 'video', src: '/videos/disco.mp4' }
    ]
  },
  {
    tag: 'Soporte',
    tagColor: '#7B68EE',
    title: 'Asistencia Técnica y Remota',
    description: 'Brindamos soporte técnico tanto presencial como remoto. Soluciona problemas técnicos sin moverte de casa con nuestra asistencia remota personalizada.',
    media: [
      { type: 'image', src: '/image/asist.png', alt: 'Asistencia técnica' },
      { type: 'video', src: '/videos/asistencia.mp4' }
    ]
  },
  {
    tag: 'Software',
    tagColor: '#63CAB7',
    title: 'Instalación de Office',
    description: 'Instalamos y configuramos el paquete de Office para que puedas trabajar sin interrupciones. Incluye Word, Excel, PowerPoint, y más herramientas de productividad.',
    media: [
      { type: 'image', src: '/image/microsoftoffice.jpg', alt: 'Instalación de Office' },
      { type: 'video', src: '/videos/Office.mp4' }
    ]
  }
];

const navItems = [
  { path: '/', label: 'Inicio' },
  { path: '/quienes-somos', label: 'Quiénes Somos' },
  { path: '/contactenos', label: 'Contacto' },
  { path: '/login', label: 'Iniciar Sesión' },
];

function Blog() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleImgError = (e) => {
    e.target.style.display = 'none';
    const wrap = e.target.closest('.b-media-img-wrap');
    if (wrap) {
      wrap.style.display = 'flex';
      wrap.style.alignItems = 'center';
      wrap.style.justifyContent = 'center';
      wrap.style.height = '220px';
      wrap.style.color = 'rgba(255,255,255,0.3)';
      wrap.style.fontSize = '0.85rem';
      wrap.innerHTML = '⚠️ Imagen no encontrada';
    }
  };

  return (
    <div className="blog-page">

      {/* HEADER */}
      <header className="b-header">
        <Link to="/" className="b-logo">
          <div className="b-logo-icon">
            <img src={logo} alt="logo" />
          </div>
          <div className="b-logo-text">
            EL MUNDO DE<br /><span>LA TECNOLOGÍA</span>
          </div>
        </Link>

        <nav className="b-desktop-nav">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className="b-nav-link">{item.label}</Link>
          ))}
          <Link to="/registro" className="b-nav-btn">Registrarse</Link>
        </nav>

        <button className="b-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`b-mobile-nav ${menuOpen ? 'open' : ''}`}>
          {[...navItems, { path: '/registro', label: 'Registrarse' }].map(item => (
            <Link key={item.path} to={item.path} className="b-nav-link" onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      {/* HERO */}
      <section className="b-hero">
        <div className="b-hero-blob" />
        <div className="b-hero-badge">
          <span className="b-hero-dot" />
          <span>Actualizado regularmente</span>
        </div>
        <h1>Blog de <span>Tecnología</span></h1>
        <p>Guías, consejos y tutoriales para mantener tu equipo al máximo rendimiento.</p>
      </section>

      {/* POSTS */}
      <main className="b-main">
        <div className="b-posts-grid">
          {blogPosts.map((post, index) => (
            <article key={index} className="b-post-card">

              {/* Tag */}
              <div
                className="b-post-tag"
                style={{
                  background: `${post.tagColor}18`,
                  border: `1px solid ${post.tagColor}40`,
                  color: post.tagColor
                }}
              >
                {post.tag}
              </div>

              {/* Título */}
              <h2 className="b-post-title">{post.title}</h2>

              {/* Descripción */}
              {post.descriptionHtml
                ? <div className="b-post-desc" dangerouslySetInnerHTML={{ __html: post.descriptionHtml }} />
                : <p className="b-post-desc">{post.description}</p>
              }

              {/* Media */}
              <div className="b-media-row">
                {post.media.map((item, idx) => (
                  <div key={idx} className="b-media-item">
                    {item.type === 'image' ? (
                      <>
                        <div className="b-media-img-wrap">
                          <img
                            src={item.src}
                            alt={item.alt}
                            loading="lazy"
                            className="b-media-img"
                            onError={handleImgError}
                          />
                        </div>
                        <a href={item.src} download className="b-dl-btn">
                          <FaDownload /> Descargar imagen
                        </a>
                      </>
                    ) : (
                      <>
                        <div className="b-media-video-wrap">
                          <video
                            controls
                            className="b-media-video"
                            aria-label={`Video sobre ${post.title}`}
                          >
                            <source src={item.src} type="video/mp4" />
                            Tu navegador no soporta el video.
                          </video>
                        </div>
                        <a href={item.src} download className="b-dl-btn b-dl-video">
                          <FaDownload /> Descargar video
                        </a>
                      </>
                    )}
                  </div>
                ))}
              </div>

            </article>
          ))}
        </div>

        {/* Credits */}
        <p className="b-credits">
          Created by: Leidy Montoya · Kevin Rivas ·{' '}
          <a href="https://mi-cv-juan-granja.vercel.app/" target="_blank" rel="noreferrer">Juan Granja</a>
        </p>
      </main>

    </div>
  );
}

export default Blog;