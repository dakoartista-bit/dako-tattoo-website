"use client";

import { FormEvent, useMemo, useState } from "react";

const whatsappNumber = "34643922673";
const instagramUrl = "https://www.instagram.com/dako.tattoo.art?igsh=MTA3NWczMDllemp1ZA%3D%3D&utm_source=qr";
const facebookUrl = "https://www.facebook.com/share/1BNmFXcvEQ/?mibextid=wwXIfr";

const gallery = [
  { src: "/gallery/cross-lettering-back.jpeg", title: "Cruz y lettering", category: "Blackwork / Lettering" },
  { src: "/gallery/IMG_3331.jpeg", title: "Japanese Mandala Sleeve", category: "Black & Grey" },
  { src: "/gallery/IMG_3790.jpeg", title: "Eagle Forearm", category: "Black & Grey" },
  { src: "/gallery/IMG_3927.jpeg", title: "Rose Neck Tattoo", category: "Floral" },
  { src: "/gallery/IMG_4085.jpeg", title: "Traditional Eagle Chest", category: "Color" },
  { src: "/gallery/IMG_5072.jpeg", title: "Razor Custom Tattoo", category: "Traditional" },
  { src: "/gallery/IMG_6057.jpeg", title: "Polynesian Tribal Sleeve", category: "Tribal" }
];

const acceptedImageTypes = ["image/jpeg", "image/png", "image/webp"];
type GalleryItem = (typeof gallery)[number];

function validateFiles(files: File[]) {
  if (files.length > 3) return "Puedes añadir un máximo de 3 fotos.";
  if (files.some((file) => !acceptedImageTypes.includes(file.type))) return "Las fotos deben ser JPG, PNG o WEBP.";
  if (files.some((file) => file.size > 10 * 1024 * 1024)) return "Cada foto debe ocupar como máximo 10 MB.";
  return "";
}

export default function Home() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingFiles, setBookingFiles] = useState<File[]>([]);
  const [bookingFileNames, setBookingFileNames] = useState<string[]>([]);
  const [bookingError, setBookingError] = useState("");
  const [bookingSent, setBookingSent] = useState(false);
  const [healingFiles, setHealingFiles] = useState<File[]>([]);
  const [healingFileNames, setHealingFileNames] = useState<string[]>([]);
  const [healingError, setHealingError] = useState("");

  const progress = useMemo(() => bookingStep + "/5", [bookingStep]);

  function validateStep(step: number) {
    const container = document.querySelector('[data-booking-step="' + step + '"]');
    if (!container) return true;
    const required = Array.from(container.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("[required]"));
    for (const field of required) {
      if (!field.checkValidity()) {
        field.reportValidity();
        field.focus();
        return false;
      }
    }
    if (step === 4 && bookingFiles.length === 0) {
      setBookingError("Añade al menos una foto clara de la zona del cuerpo o una referencia.");
      return false;
    }
    return true;
  }

  function nextStep() {
    setBookingError("");
    if (!validateStep(bookingStep)) return;
    setBookingStep((step) => Math.min(5, step + 1));
    setTimeout(() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  function previousStep() {
    setBookingError("");
    setBookingStep((step) => Math.max(1, step - 1));
    setTimeout(() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateStep(5)) return;

    const data = new FormData(event.currentTarget);
    const message = [
      "Hola Dako Tattoo, quiero empezar un proyecto.",
      "",
      "Nombre: " + (data.get("name") || ""),
      "WhatsApp: " + (data.get("whatsapp") || ""),
      "Instagram / Facebook: " + (data.get("instagram") || "No indicado"),
      "",
      "Tipo de proyecto: " + (data.get("projectType") || ""),
      "Zona del cuerpo: " + (data.get("bodyArea") || ""),
      "Tamaño aproximado: " + (data.get("size") || ""),
      "Estilo: " + (data.get("style") || ""),
      "",
      "Idea: " + (data.get("idea") || ""),
      "Lo más importante para mí: " + (data.get("priority") || ""),
      "Quiero evitar: " + (data.get("avoid") || "Nada específico"),
      "",
      "Cuándo me gustaría empezar: " + (data.get("timing") || ""),
      "Disponibilidad: " + (data.get("availability") || ""),
      "Presupuesto aproximado: " + (data.get("budget") || "Prefiero hablarlo contigo"),
      "Cómo conocí Dako Tattoo: " + (data.get("source") || ""),
      "",
      "Fotos seleccionadas: " + bookingFiles.length + " archivo(s)."
    ].join("\n");

    const shareData = { text: message, files: bookingFiles };
    try {
      if (bookingFiles.length > 0 && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
        setBookingSent(true);
        return;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }

    window.open("https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message), "_blank");
    if (bookingFiles.length > 0) {
      setBookingError("WhatsApp se ha abierto con el mensaje preparado. Añade allí las fotos seleccionadas antes de enviarlo.");
    }
    setBookingSent(true);
  }

  async function submitHealing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (healingFiles.length === 0) {
      setHealingError("Añade al menos una foto clara del tatuaje.");
      return;
    }
    const fileError = validateFiles(healingFiles);
    if (fileError) {
      setHealingError(fileError);
      return;
    }

    const message = [
      "Hola Dako Tattoo, te envío el seguimiento de cicatrización.",
      "",
      "Nombre: " + (data.get("healingName") || ""),
      "Fecha de la sesión: " + (data.get("sessionDate") || ""),
      "Zona tatuada: " + (data.get("tattooArea") || ""),
      "Control: " + (data.get("healingDay") || ""),
      "Observaciones: " + (data.get("healingNotes") || "Sin observaciones."),
      "Fotos adjuntas: " + healingFiles.length + " archivo(s)."
    ].join("\n");

    const shareData = { text: message, files: healingFiles };
    try {
      if (navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
        return;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }

    window.open("https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message), "_blank");
    setHealingError("WhatsApp se ha abierto con el mensaje preparado. Añade allí las fotos seleccionadas antes de enviarlo.");
  }

  return (
    <main>
      <section className="hero">
        <nav className="nav shell">
          <a className="brand" href="#top">DAKO TATTOO</a>
          <div className="navLinks">
            <a href="#gallery">Trabajos</a>
            <a href="#process">Cómo funciona</a>
            <a href="#booking">Reservar</a>
            <a href="#seguimiento">Seguimiento</a>
          </div>
        </nav>

        <div id="top" className="heroGrid shell">
          <div className="heroCopy">
            <p className="eyebrow">Calatorao · Zaragoza</p>
            <h1>Tu idea, convertida en un tatuaje que funcione en tu cuerpo.</h1>
            <p className="lead">
              Diseño personalizado, composición adaptada a la anatomía y una consulta clara antes de reservar.
              Envíame tu idea, la zona y referencias. Te diré cómo la trabajaría y qué opción tiene más sentido para ti.
            </p>
            <div className="heroActions">
              <a className="button primary" href="#booking">Empezar mi proyecto</a>
              <a className="button ghost" href="#gallery">Ver trabajos</a>
            </div>
            <div className="heroTrust">
              <span>Black & Grey</span>
              <span>Diseño personalizado</span>
              <span>Seguimiento de cicatrización</span>
            </div>
          </div>

          <aside className="credentialPanel">
            <p className="credentialEyebrow">Formación certificada</p>
            <div className="certificateCard">
              <img src="/vicman-certificate.svg" alt="Certificado de diseño y composición del tatuaje" />
              <div><b>Diseño y Composición del Tatuaje</b><small>Vicman Tattoo · 2026</small></div>
            </div>
            <div className="sanitaryBadge">
              <span className="credentialSeal">✓</span>
              <div><b>Formación Higiénico-Sanitaria</b><small>56 h · Homologado por EVES</small></div>
            </div>
          </aside>
        </div>
      </section>

      <section id="process" className="section shell processSection">
        <p className="eyebrow">Sin vueltas</p>
        <h2>Así empieza tu tatuaje</h2>
        <p className="sectionIntro">Antes de hablar de una fecha, necesito entender bien el proyecto. Así puedo recomendarte un tamaño, composición y plan de sesiones que tengan sentido.</p>
        <div className="processGrid">
          <article><span>01</span><b>Cuéntame tu idea</b><p>Qué quieres representar, qué estilo buscas y qué es lo más importante para ti.</p></article>
          <article><span>02</span><b>Vemos zona y tamaño</b><p>Una foto clara del cuerpo me ayuda a valorar anatomía, flow y proporción.</p></article>
          <article><span>03</span><b>Recibes propuesta y precio</b><p>Te explico cómo lo trabajaría, el tamaño recomendado y si conviene dividirlo en sesiones.</p></article>
          <article><span>04</span><b>Elegimos fecha</b><p>Cuando todo está claro, acordamos el día. La cita queda confirmada con la reserva.</p></article>
        </div>
      </section>

      <section id="gallery" className="section gallerySection">
        <div className="shell">
          <p className="eyebrow">Portfolio</p>
          <div className="sectionHeadingRow">
            <h2>Trabajos realizados</h2>
            <a className="textLink" href="#booking">Quiero algo personalizado →</a>
          </div>
          <p className="sectionIntro">Una selección de proyectos reales. El diseño final siempre se adapta a la anatomía, tamaño y objetivo de cada cliente.</p>
          <div className="masonry">
            {gallery.map((item) => (
              <button className="galleryItem" type="button" key={item.src} onClick={() => setSelected(item)}>
                <img src={item.src} alt={item.title} loading="lazy" />
                <span className="galleryOverlay"><b>{item.title}</b><small>{item.category}</small></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell whySection">
        <p className="eyebrow">La diferencia está en el diseño</p>
        <h2>No es solo “hacer el dibujo”.</h2>
        <div className="whyGrid">
          <article><b>Adaptado a tu anatomía</b><p>El diseño se construye para seguir la forma del cuerpo y no quedarse plano sobre la piel.</p></article>
          <article><b>Contraste y lectura</b><p>Se decide dónde poner negro, luz y espacio negativo para que el tatuaje se entienda también a distancia.</p></article>
          <article><b>Pensado para envejecer</b><p>No fuerzo microdetalle cuando el tamaño no lo permite. Prefiero un resultado que siga funcionando con los años.</p></article>
          <article><b>Seguimiento real</b><p>Después de la sesión revisamos la cicatrización y el resultado final antes de valorar cualquier retoque.</p></article>
        </div>
      </section>

      <section className="section shell claritySection">
        <div className="clarityCard">
          <div><p className="eyebrow">Antes de reservar</p><h2>Precio claro, proyecto claro.</h2></div>
          <div className="clarityCopy">
            <p>El precio depende de tamaño, zona, nivel de detalle y número de sesiones. Primero definimos bien el proyecto y después te doy una propuesta concreta.</p>
            <p><b>Proyectos grandes:</b> pueden dividirse en varias sesiones para que el proceso sea más cómodo y cada parte se pueda trabajar con tiempo.</p>
          </div>
        </div>
      </section>

      <section id="booking" className="section shell bookingSection">
        <div className="bookingIntro">
          <p className="eyebrow">Solicitud de proyecto</p>
          <h2>Empezamos por entender tu idea.</h2>
          <p>Son 5 pasos cortos. Al final se prepara un mensaje con toda la información para enviarlo por WhatsApp.</p>
          <div className="bookingProgress" aria-label={"Paso " + progress}>
            {[1,2,3,4,5].map((step) => <span key={step} className={step <= bookingStep ? "active" : ""}>{step}</span>)}
          </div>
          <div className="bookingSideNote"><b>Qué necesito para darte una buena respuesta</b><p>Idea + zona del cuerpo + tamaño aproximado + foto clara + 1–2 referencias si las tienes.</p></div>
        </div>

        <form className="form bookingForm" onSubmit={submitBooking}>
          <div data-booking-step="1" hidden={bookingStep !== 1}>
            <span className="formStep">Paso 1 · El proyecto</span>
            <h3>¿Qué quieres hacerte?</h3>
            <select name="projectType" required defaultValue=""><option value="" disabled>Tipo de proyecto</option><option>Tatuaje nuevo</option><option>Cover-up / tapar tatuaje</option><option>Continuar una pieza existente</option><option>Retoque / revisión</option></select>
            <select name="style" required defaultValue=""><option value="" disabled>Estilo</option><option>Black & Grey</option><option>Realismo</option><option>Fine Line</option><option>Lettering</option><option>Tribal</option><option>Ornamental</option><option>Color</option><option>No estoy seguro</option></select>
            <textarea name="idea" placeholder="Cuéntame la idea con tus palabras" required />
            <textarea name="priority" placeholder="¿Qué es lo más importante para ti en este tatuaje?" required />
            <textarea name="avoid" placeholder="¿Hay algo que no quieres que tenga? (opcional)" />
          </div>

          <div data-booking-step="2" hidden={bookingStep !== 2}>
            <span className="formStep">Paso 2 · Zona y tamaño</span>
            <h3>¿Dónde va y qué tamaño imaginas?</h3>
            <input name="bodyArea" placeholder="Zona del cuerpo (ej. antebrazo exterior)" required />
            <input name="size" placeholder="Tamaño aproximado (ej. 15–20 cm)" required />
            <p className="formHint">Si no sabes el tamaño exacto, pon una aproximación. Después te recomendaré el tamaño que mejor funcione para el diseño y la anatomía.</p>
          </div>

          <div data-booking-step="3" hidden={bookingStep !== 3}>
            <span className="formStep">Paso 3 · Momento y disponibilidad</span>
            <h3>¿Cuándo te gustaría empezar?</h3>
            <select name="timing" required defaultValue=""><option value="" disabled>Cuándo te gustaría hacerlo</option><option>Lo antes posible</option><option>Durante este mes</option><option>En 1–2 meses</option><option>Más adelante, todavía estoy mirando ideas</option></select>
            <select name="availability" required defaultValue=""><option value="" disabled>Qué horario te viene mejor</option><option>Entre semana por la mañana</option><option>Entre semana por la tarde</option><option>Fin de semana</option><option>Soy flexible</option></select>
            <input name="budget" placeholder="Presupuesto aproximado (opcional)" />
            <p className="formHint">El presupuesto es opcional. Sirve para saber si conviene ajustar tamaño, detalle o dividir el proyecto en varias sesiones.</p>
          </div>

          <div data-booking-step="4" hidden={bookingStep !== 4}>
            <span className="formStep">Paso 4 · Fotos</span>
            <h3>Enséñame la zona y tus referencias.</h3>
            <label className="bookingPhotoUpload">
              <span className="bookingPhotoTitle"><b>Añade hasta 3 fotos</b><small>Ideal: 1 foto clara de la zona del cuerpo + 1–2 referencias. Sin filtros y con buena luz.</small></span>
              <input name="references" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => {
                const files = event.currentTarget.files ? Array.from(event.currentTarget.files) : [];
                const error = validateFiles(files);
                setBookingError(error);
                setBookingFiles(error ? [] : files);
                setBookingFileNames(error ? [] : files.map((file) => file.name));
                if (error) event.currentTarget.value = "";
              }} />
            </label>
            {bookingFileNames.length > 0 && <p className="formNote">Seleccionadas: {bookingFileNames.join(", ")}</p>}
          </div>

          <div data-booking-step="5" hidden={bookingStep !== 5}>
            <span className="formStep">Paso 5 · Contacto</span>
            <h3>¿Dónde te respondo?</h3>
            <input name="name" placeholder="Nombre completo" required />
            <input name="whatsapp" placeholder="WhatsApp" required />
            <input name="instagram" placeholder="Instagram / Facebook (opcional)" />
            <select name="source" required defaultValue=""><option value="" disabled>¿Cómo conociste Dako Tattoo?</option><option>Instagram</option><option>Facebook</option><option>TikTok</option><option>Google</option><option>Un amigo me recomendó</option><option>Ya soy cliente</option><option>Otro</option></select>
            <div className="whatNext">
              <b>Qué pasa después</b>
              <ol><li>Reviso idea, zona, tamaño y referencias.</li><li>Te explico cómo lo trabajaría y te doy el precio.</li><li>Si todo encaja, elegimos fecha.</li><li>La cita queda confirmada con la reserva.</li></ol>
            </div>
            <button className="bookingSubmit" type="submit">Enviar solicitud por WhatsApp</button>
            <p className="formNote">Tus datos se utilizan únicamente para responder a esta solicitud y organizar tu cita.</p>
            {bookingSent && <p className="successNote">Solicitud preparada. Si WhatsApp ya se abrió, revisa el mensaje, añade las fotos si hace falta y envíalo.</p>}
          </div>

          {bookingError && <p className="formError">{bookingError}</p>}
          <div className="formNavigation">
            {bookingStep > 1 && <button className="button ghost" type="button" onClick={previousStep}>Atrás</button>}
            {bookingStep < 5 && <button className="button primary" type="button" onClick={nextStep}>Continuar</button>}
          </div>
        </form>
      </section>

      <section className="section shell faqSection">
        <p className="eyebrow">Preguntas habituales</p>
        <h2>Antes de escribir, esto te interesa.</h2>
        <div className="faqGrid">
          <details><summary>¿Cuánto cuesta un tatuaje?</summary><p>Depende de tamaño, zona, detalle y tiempo de trabajo. Con la información del formulario puedo darte una propuesta mucho más precisa.</p></details>
          <details><summary>¿Puedo hacer un proyecto grande por partes?</summary><p>Sí. En proyectos grandes podemos planificar varias sesiones y construir el tatuaje paso a paso sin tener que hacerlo todo en un solo día.</p></details>
          <details><summary>¿Tengo que traer el diseño terminado?</summary><p>No. Puedes venir con una idea o referencias. La composición final se adapta a tu cuerpo y al tamaño real que vaya a tener.</p></details>
          <details><summary>¿Y si todavía no sé exactamente lo que quiero?</summary><p>No pasa nada. Indica qué elementos te gustan, la zona y el estilo. La consulta sirve precisamente para ordenar la idea antes de tatuar.</p></details>
        </div>
      </section>

      <section id="seguimiento" className="section shell healingSection">
        <div className="healingIntro">
          <p className="eyebrow">Cicatrización controlada</p>
          <h2>Tu tatuaje no termina al salir.</h2>
          <p className="sectionIntro">Envíame una foto clara los días 3, 7, 14 y 30. Así puedo comprobar la evolución y valorar el resultado una vez cicatrizado.</p>
          <div className="healingDays"><span><b>03</b><small>Primer control</small></span><span><b>07</b><small>Evolución</small></span><span><b>14</b><small>Cicatrización</small></span><span><b>30</b><small>Resultado</small></span></div>
        </div>

        <form className="form healingForm" onSubmit={submitHealing}>
          <span className="formStep">Seguimiento</span>
          <h3>Enviar fotos de cicatrización</h3>
          <input placeholder="Nombre completo" required name="healingName" />
          <label><span>Fecha de la sesión</span><input type="date" required name="sessionDate" /></label>
          <input placeholder="Zona tatuada" required name="tattooArea" />
          <select name="healingDay" required defaultValue=""><option value="" disabled>Selecciona el control</option><option>Día 3</option><option>Día 7</option><option>Día 14</option><option>Día 30</option><option>Otra revisión</option></select>
          <textarea name="healingNotes" placeholder="Cuéntame si notas irritación, dolor, pérdida de pigmento u otra cosa" />
          <label className="healingPhotoUpload">
            <span className="bookingPhotoTitle"><b>Fotos del tatuaje</b><small>Añade de 1 a 3 fotos claras, con buena luz y sin filtros.</small></span>
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple required name="healingPhotos" onChange={(event) => {
              const files = event.currentTarget.files ? Array.from(event.currentTarget.files) : [];
              const error = validateFiles(files);
              setHealingError(error);
              setHealingFiles(error ? [] : files);
              setHealingFileNames(error ? [] : files.map((file) => file.name));
              if (error) event.currentTarget.value = "";
            }} />
          </label>
          {healingFileNames.length > 0 && <p className="formNote">Seleccionadas: {healingFileNames.join(", ")}</p>}
          {healingError && <p className="formError">{healingError}</p>}
          <button className="bookingSubmit" type="submit">Enviar seguimiento por WhatsApp</button>
        </form>
      </section>

      <section id="retoques" className="section shell">
        <p className="eyebrow">Condiciones claras</p><h2>Política de retoques</h2>
        <div className="whyGrid retouchGrid">
          <article><b>Retoque pequeño gratuito</b><p>Dentro de las primeras 8 semanas cuando el tatuaje ha cicatrizado con normalidad, se han seguido los cuidados y se ha realizado el seguimiento.</p></article>
          <article><b>Cuidados inadecuados</b><p>Si la pérdida de pigmento está relacionada con rascado, sol, piscina, exceso de crema u otras indicaciones no respetadas, el retoque tendrá coste.</p></article>
          <article><b>No incluye cambios</b><p>Un retoque no cubre modificaciones del diseño, elementos nuevos, ampliaciones o cambios solicitados después de la cicatrización.</p></article>
          <article><b>Valoración final</b><p>La necesidad real de retoque se decide cuando la piel está completamente cicatrizada y se puede ver el resultado estable.</p></article>
        </div>
      </section>

      <section id="cuidados" className="section shell">
        <p className="eyebrow">Aftercare</p><h2>Cuidados después del tatuaje</h2>
        <div className="whyGrid">
          <article><b>Limpieza</b><p>Lava la zona con las manos limpias y jabón suave, sin frotar. Seca con pequeños toques.</p></article>
          <article><b>Hidratación</b><p>Aplica una capa fina del producto recomendado. Evita dejar la piel cubierta por una capa gruesa de crema.</p></article>
          <article><b>Durante la cicatrización</b><p>No rasques ni arranques piel. Evita piscina, jacuzzi, baños largos y roce innecesario hasta que esté cicatrizado.</p></article>
          <article><b>Sol</b><p>Evita exposición directa durante la curación. Una vez cicatrizado, protege la zona para conservar mejor el pigmento y contraste.</p></article>
        </div>
      </section>

      <section id="contact" className="section shell contactSection">
        <p className="eyebrow">Contacto</p><h2>¿Tienes una duda rápida?</h2>
        <p>Para una consulta completa usa el formulario de proyecto. Para algo puntual, escríbeme directamente.</p>
        <div className="heroActions centerActions">
          <a className="button primary" href={"https://wa.me/" + whatsappNumber} target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="button ghost" href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          <a className="button ghost" href={facebookUrl} target="_blank" rel="noreferrer">Facebook</a>
        </div>
      </section>

      <a className="mobileBookingCta" href="#booking">Empezar mi proyecto</a>

      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <button className="closeLightbox" type="button" aria-label="Cerrar">×</button>
          <img src={selected.src} alt={selected.title} />
          <div className="lightboxCaption"><b>{selected.title}</b><span>{selected.category}</span></div>
        </div>
      )}
    </main>
  );
}
