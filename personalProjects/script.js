window.addEventListener('DOMContentLoaded', () => {
  const actualMode = localStorage.getItem('theme') || 'lightMode';

  const body = document.body;
  const logo = document.getElementById("logo");
  const navbar = document.querySelector(".navbar");
  const elements = document.querySelectorAll(".element");
  const calculator = document.getElementById("calculator");
  const weather = document.getElementById("weather");
  const todo = document.getElementById("todo");
  const buttons = document.querySelectorAll(".button");

  if (actualMode === 'darkMode') {
    buttons.forEach(btn => {
      btn.style.backgroundColor = "rgba(133, 16, 16, 0.86)";
    });

    if (todo) todo.src = "img/todoInverted.png";
    if (calculator) calculator.src = "img/calculatorInverted.png";
    if (weather) weather.src = "img/weatherInverted.png";

    elements.forEach(el => {
      el.style.backgroundColor = "rgba(51, 51, 51, 0.86)";
    });

    if (logo) logo.src = "img/logo.jpg.png";
    if (navbar) navbar.style.backgroundColor = "rgba(83, 83, 83, 0.86)";
    body.style.backgroundColor = "black";
  } else {
    if (logo) logo.src = "img/imgLogoInverted.png";
    if (navbar) navbar.style.backgroundColor = "rgba(185, 185, 185, 0.36)";
    body.style.backgroundColor = "white";
  }
});
