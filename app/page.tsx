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

const allowedReferenceTypes = ["image/jpeg", "image/png", "image/webp"];
const maxReferenceSize = 10 * 1024 * 1024;

export default function Home() {
  const [selected, setSelected] = useState<(typeof gallery)[number] | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [photoNames, setPhotoNames] = useState<string[]>([]);

  function validateReferenceFiles(files: File[]) {
    if (files.length > 3) return "Puedes añadir un máximo de 3 fotos.";
    if (files.some((file) => !allowedReferenceTypes.includes(file.type))) {
      return "Las referencias deben ser JPG, PNG o WEBP.";
    }
    if (files.some((file) => file.size > maxReferenceSize)) {
      return "Cada foto debe ocupar como máximo 10 MB.";
    }
    return "";
  }

  async function sendBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const input = form.elements.namedItem("references") as HTMLInputElement | null;
    const files = input?.files ? Array.from(input.files) : [];
    const validationError = validateReferenceFiles(files);

    if (validationError) {
      setPhotoError(validationError);
      return;
    }

    const message = [
      "Hola Dako Tattoo, quiero pedir una cita.",
      "",
      "Nombre:",
      `${data.get("name") || ""}`,
      "",
      "WhatsApp:",
      `${data.get("whatsapp") || ""}`,
      "",
      "Instagram / Facebook:",
      `${data.get("instagram") || ""}`,
      "",
      "Zona del cuerpo:",
      `${data.get("bodyArea") || ""}`,
      "",
      "Tamaño aproximado:",
      `${data.get("size") || ""}`,
      "",
      "Estilo:",
      `${data.get("style") || ""}`,
      "",
      "¿Cómo conociste Dako Tattoo?",
      `${data.get("source") || ""}`,
      "",
      "Idea del tatuaje:",
      `${data.get("idea") || ""}`,
      "",
      "Referencias:",
      files.length > 0 ? `${files.length} foto(s) seleccionada(s) para compartir.` : "Sin fotos adjuntas.",
    ].join("\n");

    if (files.length > 0) {
      const shareData = { text: message, files };
      try {
        if (navigator.canShare?.(shareData)) {
          await navigator.share(shareData);
          return;
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }

      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
      alert("Tu dispositivo no permite adjuntar las fotos automáticamente desde la web. WhatsApp se abrirá con el texto preparado; añade allí las fotos seleccionadas antes de enviarlo.");
      return;
    }

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
            <a href="#retoques">Retoques</a>
            <a href="#cuidados">Cuidados</a>
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
          <select name="source" required defaultValue="">
            <option value="" disabled>¿Cómo conociste Dako Tattoo?</option>
            <option>Instagram</option>
            <option>Facebook</option>
            <option>TikTok</option>
            <option>Google</option>
            <option>Un amigo me recomendó</option>
            <option>Ya soy cliente</option>
            <option>Otro</option>
          </select>
          <textarea name="idea" placeholder="Describe tu idea" required />
          <label style={{ display: "block" }}>
            <span style={{ display: "block", marginBottom: 10 }}>Fotos de referencia (máximo 3)</span>
            <input
              name="references"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(event) => {
                const files = event.currentTarget.files ? Array.from(event.currentTarget.files) : [];
                const error = validateReferenceFiles(files);
                setPhotoError(error);
                setPhotoNames(error ? [] : files.map((file) => file.name));
                if (error) event.currentTarget.value = "";
              }}
            />
          </label>
          {photoNames.length > 0 && (
            <p className="formNote">Seleccionadas: {photoNames.join(", ")}</p>
          )}
          {photoError && (
            <p className="formNote" style={{ color: "#d9a2a2" }}>{photoError}</p>
          )}
          <button type="submit">Enviar solicitud y referencias</button>
          <p className="formNote">
            Si añades fotos, tu teléfono abrirá el menú de compartir con el texto y las imágenes preparados. Selecciona WhatsApp y envíalos a Dako Tattoo. Sin fotos, WhatsApp se abrirá directamente con la solicitud escrita.
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

      <section id="retoques" className="section">
        <p className="eyebrow">Seguimiento</p>
        <h2>Política de retoques</h2>
        <p className="sectionIntro">
          El resultado final de un tatuaje se valora una vez que la piel ha cicatrizado por completo. Para mantener un criterio claro y justo, Dako Tattoo aplica las siguientes condiciones.
        </p>
        <div className="grid">
          <article className="card">
            <span>Retoque pequeño sin coste</span>
            <p>
              Incluye un retoque pequeño dentro de las 8 semanas posteriores a la sesión cuando el tatuaje haya cicatrizado con normalidad, se hayan seguido las instrucciones de cuidado y exista únicamente una pequeña pérdida de pigmento. Será necesario enviar una foto del tatuaje ya cicatrizado antes de reservar el retoque.
            </p>
          </article>
          <article className="card">
            <span>Retoque con coste</span>
            <p>
              El retoque será de pago cuando haya problemas relacionados con cuidados posteriores inadecuados, exposición prematura al sol o piscina, rascado o irritación importante, cuando se soliciten cambios o elementos nuevos en el diseño, o cuando la revisión se pida después del plazo de 8 semanas.
            </p>
          </article>
        </div>
        <p className="sectionIntro" style={{ marginTop: 24 }}>
          Cada caso se revisará individualmente según el estado real de la piel y del tatuaje. El retoque gratuito no cubre cambios de diseño ni ampliaciones.
        </p>
      </section>

      <section id="cuidados" className="section">
        <p className="eyebrow">Aftercare</p>
        <h2>Cuidados después del tatuaje</h2>
        <p className="sectionIntro">
          Un buen cuidado durante la cicatrización ayuda a proteger la piel y a conservar mejor el resultado del tatuaje.
        </p>
        <div className="grid">
          <article className="card">
            <span>Limpieza</span>
            <p>
              Lava el tatuaje con las manos limpias y un jabón suave, sin frotar. Seca la zona con pequeños toques usando papel limpio o una toalla limpia, sin arrastrar sobre la piel.
            </p>
          </article>
          <article className="card">
            <span>Hidratación</span>
            <p>
              Cuando la piel esté seca, aplica una capa fina del producto de cuidado recomendado. Evita dejar una capa gruesa y húmeda sobre el tatuaje.
            </p>
          </article>
          <article className="card">
            <span>Durante la cicatrización</span>
            <p>
              No rasques, no arranques costras ni piel descamada y evita el roce innecesario. No sumerjas el tatuaje en piscina, jacuzzi, bañera o agua compartida hasta que la piel esté completamente cicatrizada.
            </p>
          </article>
          <article className="card">
            <span>Sol y resultado a largo plazo</span>
            <p>
              Evita la exposición directa al sol mientras el tatuaje está cicatrizando. Una vez curado, protege la zona del sol para ayudar a conservar el contraste y el pigmento durante más tiempo.
            </p>
          </article>
        </div>
        <p className="sectionIntro" style={{ marginTop: 24 }}>
          Si el enrojecimiento, el dolor o la hinchazón empeoran en lugar de mejorar, aparece pus, fiebre o cualquier reacción que te preocupe, consulta con un profesional sanitario. Si tienes dudas sobre la cicatrización, envía una foto a Dako Tattoo antes de aplicar productos o hacer cambios en el cuidado.
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
