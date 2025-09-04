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

const fraseDiv = document.getElementById("frase");
const boton = document.getElementById("boton");
const categoriaSelect = document.getElementById("categoria");

// Cambiar frases con animación
boton.addEventListener("click", () => {
    const categoria = categoriaSelect.value;
    const arrayFrases = frases[categoria];
    const randomIndex = Math.floor(Math.random() * arrayFrases.length);

    fraseDiv.classList.remove("fade-in");
    fraseDiv.classList.add("fade-out");

    setTimeout(() => {
        fraseDiv.textContent = arrayFrases[randomIndex];
        fraseDiv.classList.remove("fade-out");
        fraseDiv.classList.add("fade-in");
    }, 300);
});

// Dark mode
const toggleDark = document.getElementById("dark-mode-toggle");
toggleDark.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Botón flotante para volver arriba
const btnUp = document.querySelector('.btn-up');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnUp.classList.add('show');
    } else {
        btnUp.classList.remove('show');
    }
});

