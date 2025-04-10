const img = document.getElementById("logo");
const personalProjects = document.getElementById("personalProjects");
const h1 = document.getElementsByTagName("h1");
const p = document.getElementsByTagName("p");
const backCard = document.getElementById("backCard");
const frontCard = document.getElementById("frontCard");
const Button = document.getElementsByTagName("button");

function changeTheme() {
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
}
