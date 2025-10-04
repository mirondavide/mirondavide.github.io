let actualMode = "lightMode"; 
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
const cur = document.getElementById("sottotitolo");

if (innerWidth <= 768) {
  email.href = "mailto:davidemiron30@gmail.com";
  cur.textContent = "CLICK FOR DETAILS!";
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
  if (frontCard) frontCard.style.backgroundColor = isDark ? "none" : "none";
  if (backCard) backCard.style.backgroundColor = isDark ? "none" : "none";
  if (logo) logo.src = isDark ? "imgLogoInverted.png" : "logo.jpg.png";
  
  // Applicazione del background
  if (isDark){
    document.body.style.backgroundImage = `
      radial-gradient(circle at 30% 30%, rgb(255, 255, 255), transparent 50%),
      radial-gradient(circle at 70% 70%, rgb(175, 175, 175), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(49, 48, 48, 0.801), transparent 60%)`;
    document.body.style.backgroundColor = "#5e5e5e"; // colore di sfondo di base
  } else {
    document.body.style.backgroundImage = `
      radial-gradient(circle at 30% 30%, rgb(66, 66, 66), transparent 50%),
      radial-gradient(circle at 70% 70%, rgb(97, 97, 97), transparent 50%),
      radial-gradient(circle at 50% 50%, rgb(20, 20, 20), transparent 60%)`;
    document.body.style.backgroundColor = "black"; // Rimuove il colore di fondo grigio
  }

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
