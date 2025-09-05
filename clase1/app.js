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



