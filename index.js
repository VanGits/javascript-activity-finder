// DOM Manipulation
let mainPage = document.querySelector(".main-page");
let div = document.getElementById("main-div");
let responseDiv = document.getElementById("main-responses");
let circleWrapper = document.createElement("div");
let firstResponse = document.querySelector(".response-1");
let refreshActivity = document.querySelector(".arrow-wrapper");
let comments = document.querySelector(".comment-section");

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
      refreshActivity.style.display = "flex";
      handleActivity();
    }
  });
});

div.append(circleWrapper);

// FUNCTIONS



let form = document.querySelector(".comment-form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
 
  e.preventDefault()
  const input = document.querySelector("input#comment-input");

  const comment = {
    comment: input.value,
  };
  if (input.value !== "") {
    
    postComments(comment);
  }
  
}

function postComments(commentObj) {
  fetch("http://localhost:3000/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentObj),
  })

 
}
function getComments(){
  fetch("http://localhost:3000/comments")
  .then(res => res.json())
  .then(comments => displayComments(comments))

}
getComments()

function displayComments(comments){
  comments.map(comment => {
    let comments = document.querySelector(".comment-section");
    let showComment = document.createElement("div")
    let commentText = document.createElement("h4")

    commentText.textContent += comment.comment
    showComment.appendChild(commentText)

    comments.appendChild(showComment)
  })
}



function handleActivity() {
  fetch("http://localhost:3000/activities")
    .then((res) => res.json())
    .then((data) => activityData(data));
}

function activityData(data) {
  let acceptedResDiv = document.getElementById("accepted-response");
  let acceptedRes = document.querySelector(".response-2");
  let suggestActivity = document.querySelector(".activity-response");
  let typeActivity = document.querySelector(".type-response");


  acceptedResDiv.style.opacity = "1";
  acceptedResDiv.style.display = "flex";
  acceptedRes.textContent += "Okay, here are some activities";
  comments.style.display += "flex";
  let randomItem = data[Math.floor(Math.random() * data.length)];
  suggestActivity.textContent += randomItem.activity;
  typeActivity.textContent += randomItem.type.toUpperCase();

  refreshActivity.addEventListener("click", (e) => {
    e.preventDefault();
    let randomAct = data[Math.floor(Math.random() * data.length)];

    suggestActivity.textContent = "";
    typeActivity.textContent = "";
    suggestActivity.textContent += randomAct.activity;
    typeActivity.textContent += randomAct.type.toUpperCase();
  });
}

let halfCircle = document.querySelector(".fa-circle-half-stroke");

halfCircle.addEventListener("click", toggleDarkMode);

function toggleDarkMode(e) {
  e.preventDefault();
  document.body.classList.add("body-darkMode");
  document.querySelector(".main-h2").classList.add("darkMode");

  if (halfCircle.classList.contains("lightMode")) {
    halfCircle.classList.replace("lightMode", "darkMode");
  } else {
    halfCircle.classList.replace("darkMode", "lightMode");
    document.body.classList.remove("body-darkMode");
    document.querySelector(".main-h2").classList.remove("darkMode");
  }
}
