
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


const LS_USERS_KEY = 'motiva_usuarios';   
const SS_SESSION_KEY = 'motiva_session';  

function loadUsers(){
  try { return JSON.parse(localStorage.getItem(LS_USERS_KEY)) || {}; }
  catch { return {}; }
}
function saveUsers(users){
  localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
}
function setSession(email, remember){
  const data = JSON.stringify({ email, ts: Date.now() });
  if (remember) localStorage.setItem(SS_SESSION_KEY, data);
  sessionStorage.setItem(SS_SESSION_KEY, data);
}
function clearSession(){
  sessionStorage.removeItem(SS_SESSION_KEY);
  localStorage.removeItem(SS_SESSION_KEY);
}
function getSession(){
  const raw = sessionStorage.getItem(SS_SESSION_KEY) || localStorage.getItem(SS_SESSION_KEY);
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
}


function refreshNavAuth(){
  const logged = !!getSession();
  const navLogin = document.getElementById('nav-login');
  const navLogout = document.getElementById('nav-logout');
  if (navLogin)  navLogin.style.display  = logged ? 'none' : '';
  if (navLogout) navLogout.style.display = logged ? '' : 'none';
}
document.getElementById('nav-logout')?.addEventListener('click', ()=>{
  clearSession();
  refreshNavAuth();
});


(function initAuthPage(){
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegister = document.getElementById('show-register');

  refreshNavAuth();

  if (showRegister){
    showRegister.addEventListener('click', (e)=>{
      e.preventDefault();
      registerForm.style.display = registerForm.style.display === 'none' ? '' : 'none';
    });
  }

  if (loginForm){
    const email = document.getElementById('login-email');
    const pass  = document.getElementById('login-pass');
    const remember = document.getElementById('remember');
    const status = document.getElementById('login-status');

    document.getElementById('login-btn').addEventListener('click', ()=>{
      const users = loadUsers();
      const u = users[(email.value || '').trim().toLowerCase()];
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
        status.textContent = 'Correo inválido.'; return;
      }
      if (!u || u.pass !== pass.value){
        status.textContent = 'Credenciales incorrectas.'; return;
      }
      setSession(email.value.trim().toLowerCase(), remember.checked);
      status.textContent = '✅ Sesión iniciada. Volviendo al inicio...';
      refreshNavAuth();
      setTimeout(()=>{ window.location.href = './index.html'; }, 800);
    });
  }

  if (registerForm){
    const email = document.getElementById('reg-email');
    const pass  = document.getElementById('reg-pass');
    const status = document.getElementById('register-status');

    document.getElementById('register-btn').addEventListener('click', ()=>{
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)){
        status.textContent = 'Correo inválido.'; return;
      }
      if ((pass.value || '').length < 6){
        status.textContent = 'La contraseña debe tener al menos 6 caracteres.'; return;
      }
      const users = loadUsers();
      const key = email.value.trim().toLowerCase();
      if (users[key]){ status.textContent = 'Ese correo ya está registrado.'; return; }
      users[key] = { pass: pass.value };    // ⚠️ demo: sin hash
      saveUsers(users);
      status.textContent = '✅ Cuenta creada. Ya puedes iniciar sesión.';
    });
  }
})();



