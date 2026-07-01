"use client";

import { useState } from "react";

const gallery = [
  { src: "/gallery/IMG_3331.jpeg", title: "Japanese Mandala Sleeve", category: "Black & Grey" },
  { src: "/gallery/IMG_3790.jpeg", title: "Eagle Forearm", category: "Black & Grey" },
  { src: "/gallery/IMG_3927.jpeg", title: "Rose Neck Tattoo", category: "Floral" },
  { src: "/gallery/IMG_4085.jpeg", title: "Traditional Eagle Chest", category: "Color" },
  { src: "/gallery/IMG_5072.jpeg", title: "Razor Custom Tattoo", category: "Traditional" },
  { src: "/gallery/IMG_6057.jpeg", title: "Polynesian Tribal Sleeve", category: "Tribal" },
];

const specialties = [
  "Black & Grey Realism",
  "Cover Up",
  "Fine Line",
  "Custom Tattoo Design",
];

export default function Home() {
  const [selected, setSelected] = useState<(typeof gallery)[number] | null>(null);

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

      <section id="gallery" className="section gallerySection">
        <p className="eyebrow">Portfolio</p>
        <h2>Galería de trabajos</h2>
        <p className="sectionIntro">
          Selección de tatuajes realizados por Dako Tattoo: piezas black & grey, floral, traditional, cuello y diseños personalizados.
        </p>
        <div className="masonry">
          {gallery.map((item) => (
            <button className="galleryItem" key={item.src} onClick={() => setSelected(item)}>
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.parentElement?.remove();
                }}
              />
              <span className="galleryOverlay">
                <b>{item.title}</b>
                <small>{item.category}</small>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Especialidades</p>
        <h2>Trabajo a medida</h2>
        <div className="grid">
          {specialties.map((item) => (
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

      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <button className="closeLightbox" type="button" aria-label="Cerrar">×</button>
          <img src={selected.src} alt={selected.title} />
          <div className="lightboxCaption">
            <b>{selected.title}</b>
            <span>{selected.category}</span>
          </div>
        </div>
      )}
    </main>
  );
}
