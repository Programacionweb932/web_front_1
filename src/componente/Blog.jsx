import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Blog.css';

function Blog() {
  const blogPosts = [
    {
      title: 'Mantenimiento Preventivo de PCs',
      description: 'El mantenimiento preventivo se realiza a equipos en funcionamiento con el fin de prevenir posibles daños causados por uso o desgaste. A diferencia del mantenimiento correctivo, que repara aquellos que dejan de funcionar o están dañados.',
      media: [
        { type: 'image', src: '/image/mantenimiento.jpg', alt: 'PC mantenimiento' },
        { type: 'video', src: '/videos/mantenimiento.mp4' }
      ]
    },
    {
      title: 'Sistemas Operativos',
      description: 'Explora los diferentes sistemas operativos y aprende cómo elegir el adecuado para tus necesidades. Descubre sus ventajas, características y usos.',
      media: [
        { type: 'image', src: '/image/sistemao-video.png', alt: 'Sistema operativo' },
        { type: 'video', src: '/videos/sistema operativo.mp4' } // corregido (quitado /public)
      ]
    },
    {
      title: 'Reparación de Portátiles y PCs',
      description: 'Ofrecemos servicios de reparación para portátiles y PCs de todas las marcas y modelos. Desde problemas de hardware hasta fallos de software, estamos aquí para solucionar cualquier inconveniente.',
      media: [
        { type: 'image', src: '/image/reparacionpc.jpeg', alt: 'Reparación de PC' },
        { type: 'video', src: '/videos/reparacion.mp4' }
      ]
    },
    {
      title: '¿Cómo cuidar mi computadora portátil?',
      description: `
        <ul>
          <li>Limpie su portátil regularmente con un paño suave.</li>
          <li>No lo utilices sobre camas o almohadas para evitar el sobrecalentamiento.</li>
          <li>Actualiza tu sistema operativo y programas con frecuencia.</li>
          <li>Apágalo o reinícialo al menos una vez por semana.</li>
        </ul>
      `,
      media: [{ type: 'video', src: '/videos/consejo.mp4' }]
    },
    {
      title: 'Asistencia Técnica y Remota',
      description: 'Brindamos soporte técnico tanto presencial como remoto. Soluciona problemas técnicos sin moverte de casa con nuestra asistencia remota.',
      media: [
        { type: 'image', src: '/image/asist.png', alt: 'Asistencia técnica' },
        { type: 'video', src: '/videos/asistencia.mp4' }
      ]
    },
    {
      title: 'Instalación de Office',
      description: 'Instalamos y configuramos el paquete de Office para que puedas trabajar sin interrupciones. Incluye Word, Excel, PowerPoint, y más.',
      media: [
        { type: 'image', src: '/image/microsoftoffice.jpg', alt: 'Instalación de Office' },
        { type: 'video', src: '/videos/Office.mp4' }
      ]
    }
  ];

  return (
    <div className="blog-container">
      <header>
        <h1>EL MUNDO DE LA TECNOLOGÍA</h1>
        <div>
          <Link to="/" className="btn-nav">Inicio</Link>
          <Link to="/login" className="btn-nav">Iniciar Sesión</Link>
          <Link to="/registro" className="btn-nav">Registrarse</Link>
        </div>
      </header>

      <h1 className="blog-title">Blog de Tecnología</h1>
      <div className="blog-posts">
        {blogPosts.map((post, index) => (
          <div key={index} className="blog-post">
            <h2>{post.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
            <div className="media-scroll-container">
              {post.media.map((item, idx) => (
                <div key={idx} className="media-item">
                  {item.type === 'image' ? (
                    <>
                      <img src={item.src} alt={item.alt} className="media-image" />
                      <a href={item.src} download className="download-link">Descargar Imagen</a>
                    </>
                  ) : (
                    <>
                      <video controls className="media-video">
                        <source src={item.src} type="video/mp4" />
                        Tu navegador no soporta el formato de video.
                      </video>
                      <a href={item.src} download className="download-link">Descargar Video</a>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
