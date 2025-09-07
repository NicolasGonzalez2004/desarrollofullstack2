// Array de frases por categoría
const frases = {
    motivacion: [
        "Levántate y brilla, hoy es tu día.",
        "No te rindas, lo mejor está por venir.",
        "La vida es bella, no te rindas."
    ],
    disciplina: [
        "La disciplina vence al talento cuando el talento no se esfuerza.",
        "Sé constante y lograrás grandes cosas.",
        "El éxito es fruto de la disciplina diaria."
    ],
    esfuerzo: [
        "Haz hoy lo que otros no quieren, y mañana vivirás lo que otros no pueden.",
        "Trabaja duro y alcanzarás tus metas.",
        "El esfuerzo de hoy será tu éxito de mañana."
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    const fraseDiv = document.getElementById("frase");
    const boton = document.getElementById("boton");
    const categoriaSelect = document.getElementById("categoria");
    const darkModeBtn = document.getElementById("dark-mode-toggle");

    // Generador de frases
    boton.addEventListener("click", () => {
        const categoria = categoriaSelect.value;
        const arrayFrases = frases[categoria];
        const randomIndex = Math.floor(Math.random() * arrayFrases.length);

        fraseDiv.style.opacity = 0;
        setTimeout(() => {
            fraseDiv.textContent = arrayFrases[randomIndex];
            fraseDiv.style.opacity = 1;
        }, 300);
    });

    // Modo oscuro
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});

const form = document.getElementById('form');
const nombre = document.getElementById('nombre');
const email  = document.getElementById('email');
const mensaje= document.getElementById('mensaje');
const status = document.getElementById('status');

function tip(input, texto){
  input.setCustomValidity(texto || '');
  input.reportValidity();
  if(texto) input.focus();
}

form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  if(!nombre.value.trim()) return tip(nombre, 'Por favor, escribe tu nombre.');
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) return tip(email, 'Escribe un correo válido (ej: hola@correo.com).');
  if(mensaje.value.trim().length < 10) return tip(mensaje, 'Cuéntanos un poco más (mínimo 10 caracteres).');

  tip(nombre); tip(email); tip(mensaje);
  status.textContent = '¡Gracias! Te responderemos pronto.';
  form.reset();
});



