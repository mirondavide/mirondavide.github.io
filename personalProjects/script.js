window.addEventListener('DOMContentLoaded', () => {
  const actualMode = localStorage.getItem('theme') || 'lightMode';
  const body = document.body;
  const logo = document.getElementById("logo");
  const navbar = document.getElementsByClassName("navbar")[0]; // <-- qui la correzione
  const elements = document.getElementsByClassName("element");
  const calculator = document.getElementById ("calculator");
  const weather = document.getElementById("weather");
  const todo = document.getElementById("todo");
  const button = document.getElementsByClassName("button");

  if (actualMode === 'darkMode') {
    for(let i = 0; i < button.length; i++)
      {
        button[i].style.backgroundColor = "rgba(133, 16, 16, 0.86)"
      }
    todo.src = "img/todoInverted.png";
    calculator.src = "img/calculatorInverted.png";
    weather.src = "img/weatherInverted.png";
    for(let i = 0; i < elements.length; i++)
    {
      elements[i].style.backgroundColor = "rgba(51, 51, 51, 0.86)"
    }
    if (logo) logo.src = "img/logo.jpg.png";
    if (navbar) navbar.style.backgroundColor = "rgba(83, 83, 83, 0.86)";
    body.style.backgroundColor = "black";
  } else {
    if (logo) logo.src = "img/imgLogoInverted.png";
    if (navbar) navbar.style.backgroundColor = "rgba(185, 185, 185, 0.36) ";
    body.style.backgroundColor = "white"; 
  }
});
