let actualMode = "darkMode";

const personalProjects = document.getElementById("personalProjects");
const h1 = document.getElementsByTagName("h1");
const p = document.getElementsByTagName("p");
const backCard = document.getElementById("backCard");
const frontCard = document.getElementById("frontCard");
const logo = document.getElementById("logo");
const curriculum = document.getElementById("curriculum");

function changeTheme() {
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

 if(actualMode == "lightMode")
  {
    curriculum.addEventListener('mouseover',() =>{
    curriculum.style.backgroundColor = "#424442";    
    });
  }
}
