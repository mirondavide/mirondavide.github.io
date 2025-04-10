let actualMode = "darkMode";

const img = document.getElementById("logo");
const personalProjects = document.getElementById("personalProjects");
const h1 = document.getElementsByTagName("h1");
const p = document.getElementsByTagName("p");
const backCard = document.getElementById("backCard");
const frontCard = document.getElementById("frontCard");
const Button = document.getElementsByTagName("button");
const logo = document.getElementById("logo");

function changeTheme() {
  if (actualMode === "darkMode") {
    for (let i = 0; i < p.length; i++) {
      p[i].style.color = "black";
    }

    for (let i = 0; i < h1.length; i++) {
      h1[i].style.color = "black";
    }

    personalProjects.style.color = "black";
    document.body.style.backgroundColor = "white";
    frontCard.style.backgroundColor = "white";
    backCard.style.backgroundColor = "white";
    logo.src = "imgLogoInverted.png";

    actualMode = "lightMode";
  } else {
    for (let i = 0; i < p.length; i++) {
      p[i].style.color = "white";
    }

    for (let i = 0; i < h1.length; i++) {
      h1[i].style.color = "white";
    }

    personalProjects.style.color = "white";
    document.body.style.backgroundColor = "black";
    frontCard.style.backgroundColor = "black";
    backCard.style.backgroundColor = "black";
    logo.src = "logo.jpg.png";

    actualMode = "darkMode";
  }
}
