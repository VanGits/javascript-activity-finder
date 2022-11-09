// DOM Manipulation
let mainPage = document.querySelector(".main-page");
let div = document.getElementById("main-div");
let responseDiv = document.getElementById("main-responses");
let circleWrapper = document.createElement("div");
let firstResponse = document.querySelector(".response-1");
circleWrapper.classList.add("circleWrapper");
let circleArr = [1, 2, 3, 4, 5];



circleArr.map((circle) => {
  let circleNumber = 0;

  circleNumber = circle;

  circle = document.createElement("div");
  circle.classList.add("circle");
  circle.innerText = circleNumber;
  circleWrapper.appendChild(circle);

  // event for circles
  circle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    console.log(e, parseInt(circle.innerText));
    if (e && parseInt(circle.innerText) < 3) {
      firstResponse.textContent += "You don't need me right now.";
      div.style.display = "none";
    } else {
      div.style.display = "none";
      handleActivity(circle);
    }
  });
});

div.append(circleWrapper);

// FUNCTIONS

window.addEventListener("DOMContentLoaded", () => {
  testFetch();
});

function testFetch() {
  fetch("http://localhost:3000/activities")
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function handleActivity(circle) {
  console.log("n");
}

let halfCircle = document.querySelector(".fa-circle-half-stroke");

halfCircle.addEventListener("click", toggleDarkMode);

function toggleDarkMode(e) {
  e.preventDefault();
  document.body.classList.add("body-darkMode")
  document.querySelector(".main-h2").classList.add("darkMode")
  

  if (halfCircle.classList.contains("lightMode")){
    halfCircle.classList.replace("lightMode", "darkMode")
   

  } else {
    halfCircle.classList.replace("darkMode", "lightMode")
    document.body.classList.remove("body-darkMode")
    document.querySelector(".main-h2").classList.remove("darkMode")
    
  }

  
  
}
