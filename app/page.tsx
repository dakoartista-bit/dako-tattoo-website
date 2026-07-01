"use client";

import { FormEvent, useState } from "react";

const whatsappNumber = "34643922673";
const instagramUrl = "https://www.instagram.com/dako.tattoo.art?igsh=MTA3NWczMDllemp1ZA%3D%3D&utm_source=qr";
const facebookUrl = "https://www.facebook.com/share/1BNmFXcvEQ/?mibextid=wwXIfr";

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
  "Polynesian / Tribal",
  "Fine Line",
  "Custom Tattoo Design",
];

export default function Home() {
  const [selected, setSelected] = useState<(typeof gallery)[number] | null>(null);

  function sendBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const message = [
      "Hola Dako Tattoo, quiero pedir una cita.",
      "",
      "👤 Nombre:",
      `${data.get("name") || ""}`,
      "",
      "📱 WhatsApp:",
      `${data.get("whatsapp") || ""}`,
      "",
      "📸 Instagram / Facebook:",
      `${data.get("instagram") || ""}`,
      "",
      "📍 Zona del cuerpo:",
      `${data.get("bodyArea") || ""}`,
      "",
      "📏 Tamaño aproximado:",
      `${data.get("size") || ""}`,
      "",
      "🎨 Estilo:",
      `${data.get("style") || ""}`,
      "",
      "📝 Idea del tatuaje:",
      `${data.get("idea") || ""}`,
      "",
      "🖼️ Referencias:",
      "Te enviaré las fotos de referencia por este chat.",
    ].join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <main>
      <section className="hero">
        <nav className="nav">
          <strong>DAKO TATTOO</strong>
          <div>
            <a href="#gallery">Galería</a>
            <a href="#booking">Cita</a>
            <a href="#contact">Contacto</a>
            <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
            <a href={facebookUrl} target="_blank" rel="noreferrer">Facebook</a>
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
            <a className="button" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="button" href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
            <a className="button" href={facebookUrl} target="_blank" rel="noreferrer">Facebook</a>
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
        <form className="form" onSubmit={sendBooking}>
          <input name="name" placeholder="Nombre completo" required />
          <input name="whatsapp" placeholder="WhatsApp" required />
          <input name="instagram" placeholder="Instagram / Facebook" />
          <input name="bodyArea" placeholder="Zona del cuerpo" required />
          <input name="size" placeholder="Tamaño aproximado (ej. 15 cm)" required />
          <select name="style" required defaultValue="">
            <option value="" disabled>Selecciona un estilo</option>
            <option>Black & Grey</option>
            <option>Color</option>
            <option>Fine Line</option>
            <option>Tribal</option>
            <option>Realismo</option>
            <option>Lettering</option>
            <option>Ornamental</option>
            <option>Personalizado</option>
          </select>
          <textarea name="idea" placeholder="Describe tu idea" required />
          <button type="submit">Enviar solicitud por WhatsApp</button>
          <p className="formNote">
            Después de enviar la solicitud, envíame las fotos de referencia por WhatsApp para preparar un diseño personalizado.
          </p>
        </form>
      </section>

      <section id="contact" className="section contact">
        <h2>Contacto</h2>
        <p>Para consultas rápidas, escribe por WhatsApp, Instagram o Facebook.</p>
        <div className="actions" style={{ justifyContent: "center" }}>
          <a className="button primary" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="button" href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          <a className="button" href={facebookUrl} target="_blank" rel="noreferrer">Facebook</a>
        </div>
        <p style={{ marginTop: 24 }}>
          WhatsApp: +34 643 922 673<br />
          Instagram: @dako.tattoo.art<br />
          Facebook: Yordan Georgiev
        </p>
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
