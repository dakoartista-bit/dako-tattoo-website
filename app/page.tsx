const portfolio = [
  'Black & Grey Realism',
  'Cover Up',
  'Fine Line',
  'Custom Tattoo Design',
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <nav className="nav">
          <strong>DAKO TATTOO</strong>
          <div>
            <a href="#gallery">Galería</a>
            <a href="#booking">Cita</a>
            <a href="#contact">Contacto</a>
          </div>
        </nav>

        <div className="heroContent">
          <p className="eyebrow">Calatorao / Zaragoza</p>
          <h1>Black & Grey Tattoo Studio</h1>
          <p className="lead">
            Diseños personalizados, composición adaptada al cuerpo y tatuajes pensados para verse bien hoy y en el futuro.
          </p>
          <div className="actions">
            <a className="button primary" href="#booking">Reservar consulta</a>
            <a className="button" href="https://wa.me/34600000000">WhatsApp</a>
          </div>
        </div>
      </section>

      <section id="gallery" className="section">
        <p className="eyebrow">Portfolio</p>
        <h2>Especialidades</h2>
        <div className="grid">
          {portfolio.map((item) => (
            <article className="card" key={item}>
              <span>{item}</span>
              <p>Composición limpia, contraste fuerte y lectura clara sobre piel.</p>
            </article>
          ))}
        </div>
      </section>

      <section id="booking" className="section split">
        <div>
          <p className="eyebrow">Reserva</p>
          <h2>Solicitud de cita</h2>
          <p>
            Envíame tu idea, zona del cuerpo, tamaño aproximado y referencias. Te responderé con una propuesta profesional.
          </p>
        </div>
        <form className="form">
          <input placeholder="Nombre completo" />
          <input placeholder="WhatsApp" />
          <input placeholder="Instagram" />
          <input placeholder="Zona del cuerpo" />
          <textarea placeholder="Describe tu idea" />
          <button type="button">Enviar solicitud</button>
        </form>
      </section>

      <section id="contact" className="section contact">
        <h2>Contacto</h2>
        <p>Para consultas rápidas, escribe por WhatsApp o Instagram.</p>
        <a className="button primary" href="https://wa.me/34600000000">Abrir WhatsApp</a>
      </section>
    </main>
  );
}
