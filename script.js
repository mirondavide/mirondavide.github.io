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
  canvas: document.getElementById("canvas"),
  autoplay: true,
  stateMachines: "Light/Dark Mode Button",
  onLoad: () => {
    console.log("Rive file loaded successfully!");
    r.resizeDrawingSurfaceToCanvas();

    // Quando il file Rive è caricato, ripristina il tema
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

  for (let i = 0; i < p.length; i++) {
    p[i].style.color = isDark ? "black" : "white";
  }

  for (let i = 0; i < h1.length; i++) {
    h1[i].style.color = isDark ? "black" : "white";
  }

  personalProjects.style.color = isDark ? "black" : "white";
  document.body.style.backgroundColor = isDark ? "white" : "black";
  frontCard.style.backgroundColor = isDark ? "white" : "black";
  backCard.style.backgroundColor = isDark ? "white" : "black";
  logo.src = isDark ? "imgLogoInverted.png" : "logo.jpg.png";


  actualMode = isDark ? "lightMode" : "darkMode";
  localStorage.setItem('theme', actualMode);

  console.log("Hai premuto il canvas!");


  const stateMachine = r.stateMachines["State Machine 1"]; 
  if (!stateMachine) {
    console.error("State machine 'State Machine 1' non trovata");
    return;
  }

  stateMachine.play("NewState");
  console.log("Animazione cambiata!");
}

curriculum.addEventListener('click', () => {
  console.log("Curriculum cliccato!");
});
