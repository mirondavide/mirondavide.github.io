window.addEventListener('DOMContentLoaded', () => {
  const actualMode = localStorage.getItem('theme') || 'lightMode';
const sottoTitolo = document.getElementById("sottotitolo");
const personalProjects = document.getElementById("personalProjects");
const h1 = document.getElementsByTagName("h1");
const p = document.getElementsByTagName("p");
const backCard = document.getElementById("backCard");
const frontCard = document.getElementById("frontCard");
const logo = document.getElementById("logo");
const curriculum = document.getElementById("curriculum");
const projects = document.getElementById("projects");
const canvas = document.getElementById("canvas");
const email = document.getElementById("email");

if (window.innerWidth <= 768) {
  email.href = "mailto:davidemiron30@gmail.com";
  sottoTitolo.textContent = "CLICK FOR DETAILS!";
}



// Funzione unica per gestire click/touch
function handleInteraction(event) {
  event.preventDefault(); // fondamentale su mobile
  change();
}

canvas.addEventListener("click", handleInteraction);
canvas.addEventListener("touchend", handleInteraction);

// Inizializza Rive con il file .riv
const r = new rive.Rive({
  src: "davide.riv",  
  canvas: canvas,
  autoplay: true,
  stateMachines: "Light/Dark Mode Button",
  onLoad: () => {
    console.log("Rive file loaded successfully!");
    r.resizeDrawingSurfaceToCanvas();

    // Quando il file Rive è caricato, ripristina il tema salvato
    const savedTheme = localStorage.getItem('theme') || 'lightMode';
    if (savedTheme === 'darkMode') {
      actualMode = 'darkMode';
      triggerRiveAnimation();
    }
  },
});

function change() {
  setTimeout(triggerRiveAnimation, 200);
}

function triggerRiveAnimation() {

  const isDark = actualMode === "darkMode";

  // Cambia colori del testo
  for (let i = 0; i < p.length; i++) {
    p[i].style.color = isDark ? "black" : "white";
  }

  for (let i = 0; i < h1.length; i++) {
    h1[i].style.color = isDark ? "black" : "white";
  }

  if (personalProjects) personalProjects.style.color = isDark ? "black" : "white";
  if (frontCard) frontCard.style.backgroundColor = isDark ? "white" : "black";
  if (backCard) backCard.style.backgroundColor = isDark ? "white" : "black";
  if (logo) logo.src = isDark ? "imgLogoInverted.png" : "logo.jpg.png";
  document.body.style.backgroundColor = isDark ? "white" : "black";

  // Aggiorna modalità e salva in localStorage
  actualMode = isDark ? "lightMode" : "darkMode";
  localStorage.setItem('theme', actualMode);

  console.log("Hai premuto il canvas!");

  // Attiva il trigger 'toggle' nella state machine
  const input = r.stateMachineInputs("Light/Dark Mode Button").find(i => i.name === "toggle");
  if (input) {
    input.fire(); // trigger
    console.log("Animazione cambiata!");
  } else {
    console.error("Input 'toggle' non trovato");
  }
}

if (curriculum) {
  curriculum.addEventListener('click', () => {
    console.log("Curriculum cliccato!");
  });
}
});
