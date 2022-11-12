// Main divs

let mainPage = document.querySelector(".main-page");
let mainDiv = document.getElementById("main-div");

// Response elements after clicking a number in the bored scale

let responseDiv = document.getElementById("main-responses");
let firstResponse = document.querySelector(".response-1");
let acceptedResDiv = document.getElementById("accepted-response");
let acceptedRes = document.querySelector(".response-2");
let suggestActivity = document.querySelector(".activity-response");
let typeActivity = document.querySelector(".type-response");
let refreshActivity = document.querySelector(".arrow-wrapper");

// Initialize circle array

let circleWrapper = document.createElement("div");
circleWrapper.classList.add("circleWrapper");
let circleArr = [1, 2, 3, 4, 5];

// Map array into dom elements

circleArr.map((circle) => {
  let circleNumber = 0;
  circleNumber = circle;
  circle = document.createElement("div");
  circle.classList.add("circle");
  circle.innerText = circleNumber;
  circleWrapper.appendChild(circle);

  // Circle mousedown event

  circle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    console.log(e, parseInt(circle.innerText));

    //handle response if boredness scale is less than 3

    if (e && parseInt(circle.innerText) < 3) {
      firstResponse.textContent += "You don't need me right now.";
      mainDiv.style.display = "none";

      //handle response if boredness scale is more than 2
    } else {
      mainDiv.style.display = "none";
      refreshActivity.style.display = "flex";
      comments.style.display = "none";
      handleActivity();
    }
  });
});

function handleActivity() {
  fetch("http://localhost:3000/activities")
    .then((res) => res.json())
    .then((data) => activityData(data));
}

function activityData(data) {
  acceptedResDiv.style.opacity = "1";
  acceptedResDiv.style.display = "flex";
  acceptedRes.textContent += "Okay, here are some activities";

  // Initialize random activity when page loads
  let randomItem = data[Math.floor(Math.random() * data.length)];
  suggestActivity.textContent += randomItem.activity;
  typeActivity.textContent += randomItem.type.toUpperCase();

  refreshActivity.addEventListener("click", (e) => {
    e.preventDefault();

    // Change random activity by using a different variable

    let randomAct = data[Math.floor(Math.random() * data.length)];

    suggestActivity.textContent = "";
    typeActivity.textContent = "";

    // Set new activity to the new random variable
    
    suggestActivity.textContent += randomAct.activity;
    typeActivity.textContent += randomAct.type.toUpperCase();
  });
}

//append circles to circleWrapper

mainDiv.append(circleWrapper);

//Initialize comment form and add submit event

let form = document.querySelector("#comment-form");

// Comment elements

let comments = document.querySelector(".comments-wrapper");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.querySelector("input#comment-input");

  const comment = {
    // set comment key to whatever was put in input (input.value)

    comment: input.value,
  };
  if (input.value !== "") {
    fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
  }
});

// Get comment data from db.json

function getComments() {
  fetch("http://localhost:3000/comments")
    .then((res) => res.json())
    .then((comments) => displayComments(comments));
}
getComments();

// Display data to the DOM derived from function getComments

function displayComments(comments) {
  comments.map((comment) => {
    let comments = document.querySelector(".comment-section");
    let showComment = document.createElement("div");
    let commentText = document.createElement("h4");

    commentText.textContent += comment.comment;
    showComment.appendChild(commentText);

    comments.appendChild(showComment);
  });
}

// Initialize dark mode icon
let halfCircle = document.querySelector(".fa-circle-half-stroke");

// Set an event listener for the dark mode icon "click"

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
