import { useNavigate, Link } from 'react-router-dom';
import React from 'react';
import "../styles/Nosotros.css";

const Nosotros = () => {
  const navigate = useNavigate();

  return (
    <div className="Nosotros-container">
      {/* HEADER */}
      <header>
        <h1>EL MUNDO DE LA TECNOLOGÍA</h1>
        <div>
          <Link to="/" className="btn-nav">Inicio</Link>
          <Link to="/blog" className="btn-nav">Ver Blog</Link>
          <Link to="/login" className="btn-nav">Iniciar Sesión</Link>
          <Link to="/registro" className="btn-nav">Registrarse</Link>
        </div>
      </header>

      {/* Quiénes Somos */}
      <div className="section-container">
        <div className="text-content">
          <h1 className="nosotros-h1">Quiénes Somos</h1>
          <p className="nosotros-p">
            Somos un equipo de profesionales en el campo de las tecnologías de la información, 
            liderados por Juan Pablo Granja, Kevin Alexis Rivas y Tatiana Montoya, cuyo principal objetivo es ofrecer un excelente servicio a nuestros clientes. 
            Siempre estamos constantemente aprendiendo y buscando nuevas soluciones para enfrentar los desafíos del mercado de sistemas. 
            Nuestra empresa está impulsada por la pasión de crecer y ofrecer el mejor servicio posible, buscando siempre la satisfacción total de nuestros clientes. 
            Estamos comprometidos a mantenernos actualizados y evolucionar constantemente para estar al día con los cambios y demandas del mercado tecnológico.
          </p>
        </div>
        <img className="section-image" src="/image nosotros/quienes somos.jpeg" alt="Quiénes Somos" />
      </div>

      {/* Visión */}
      <div className="section-container reverse">
        <img className="section-image" src="/image nosotros/vision.jpg" alt="Visión" />
        <div className="text-content">
          <h1 className="nosotros-h1">Visión</h1>
          <p className="nosotros-p">
            Ser la empresa líder en soluciones tecnológicas innovadoras, reconocida por la calidad de nuestros servicios y el compromiso con la satisfacción de nuestros clientes. 
            Buscamos transformar la manera en que las personas y empresas interactúan con la tecnología, brindando soluciones eficientes, seguras y adaptadas 
            a las necesidades del mercado en constante evolución.
          </p>
        </div>
      </div>

      {/* Misión */}
      <div className="section-container">
        <div className="text-content">
          <h1 className="nosotros-h1">Misión</h1>
          <p className="nosotros-p">
            Brindar servicios tecnológicos de alta calidad, enfocados en la innovación, la actualización constante y la satisfacción del cliente.
            Nuestro equipo de profesionales trabaja con pasión y compromiso para ofrecer soluciones personalizadas en el área de tecnologías de la información, 
            ayudando a nuestros clientes a optimizar sus procesos y afrontar los desafíos del mundo digital con éxito.
          </p>
        </div>
        <img className="section-image" src="/image nosotros/mision.jpeg" alt="Misión" />
      </div>
    </div>
  );
};

export default Nosotros;
