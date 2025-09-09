//  FRASES 
const frases = {
  motivacion: [
    "Levántate y brilla, hoy es tu día.",
    "No te rindas, lo mejor está por venir.",
    "La vida es bella, no te rindas.",
    "Levántate de la cama porque tú naciste para sobrevivir.",
    "Cada día es una nueva oportunidad para empezar de nuevo."
  ],
  disciplina: [
    "La disciplina vence al talento cuando el talento no se esfuerza.",
    "Sé constante y lograrás grandes cosas.",
    "El éxito es fruto de la disciplina diaria.",
    "El esfuerzo constante vence al talento intermitente.",
    "La motivación te hace empezar, la disciplina te hace continuar."
  ],
  esfuerzo: [
    "Haz hoy lo que otros no quieren, y mañana vivirás lo que otros no pueden.",
    "Trabaja duro y alcanzarás tus metas.",
    "El esfuerzo de hoy será tu éxito de mañana.",
    "Sin sacrificio no hay victoria.",
    "El esfuerzo constante vence al talento intermitente."
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  //  ELEMENTOS DE FRASES - MODO OSCURO
  const fraseDiv = document.getElementById("frase");
  const boton = document.getElementById("boton");
  const categoriaSelect = document.getElementById("categoria");
  const darkModeBtn = document.getElementById("dark-mode-toggle");

  // Evitar para que no se repita la frase
  const ultimoIndicePorCategoria = { motivacion: -1, disciplina: -1, esfuerzo: -1 };

  if (boton && categoriaSelect && fraseDiv) {
    boton.addEventListener("click", () => {
      const categoria = categoriaSelect.value;
      const lista = frases[categoria] || [];
      if (!lista.length) return;

      let i;
      do {
        i = Math.floor(Math.random() * lista.length);
      } while (i === ultimoIndicePorCategoria[categoria] && lista.length > 1);

      ultimoIndicePorCategoria[categoria] = i;

      fraseDiv.style.opacity = 0;
      setTimeout(() => {
        fraseDiv.textContent = lista[i];
        fraseDiv.style.opacity = 1;
      }, 300);
    });
  }

  if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }

  // formulario de contacto
 
  const form = document.getElementById("contact-form") || document.querySelector(".contact-form");

  if (form) {
    const nombre  = form.querySelector("#nombre")  || form.querySelector('input[name="nombre"]');
    const email   = form.querySelector("#email")   || form.querySelector('input[name="email"]');
    const mensaje = form.querySelector("#mensaje") || form.querySelector('textarea[name="mensaje"]');
    let statusMsg = document.getElementById("form-status") || form.querySelector(".form-status");
    if (!statusMsg) {
      statusMsg = document.createElement("p");
      statusMsg.id = "form-status";
      statusMsg.style.marginTop = "10px";
      statusMsg.style.fontWeight = "bold";
      form.appendChild(statusMsg);
    }
    const emailValido = (val) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const vNombre  = (nombre?.value || "").trim();
      const vEmail   = (email?.value || "").trim();
      const vMensaje = (mensaje?.value || "").trim();

      if (!vNombre) {
        statusMsg.textContent = "Por favor, ingresa tu nombre.";
        statusMsg.style.color = "red";
        nombre?.focus();
        return;
      }
      if (!emailValido(vEmail)) {
        statusMsg.textContent = "Por favor, ingresa un correo válido (ej: hola@correo.com).";
        statusMsg.style.color = "red";
        email?.focus();
        return;
      }
      if (vMensaje.length < 10) {
        statusMsg.textContent = "El mensaje debe tener al menos 10 caracteres.";
        statusMsg.style.color = "red";
        mensaje?.focus();
        return;
      }


      statusMsg.textContent = "¡Gracias! Tu mensaje fue enviado correctamente.";
      statusMsg.style.color = "green";
      form.reset();
    });
  }
});




