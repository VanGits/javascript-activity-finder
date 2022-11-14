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
let clearActivity = document.querySelector(".arrow-wrapper");


// Initialize circle array

let circleWrapper = document.createElement("div");
circleWrapper.classList.add("circleWrapper");
let circleArr = [1, 2, 3, 4, 5];

// Change array into dom elements

circleArr.forEach((circle) => {
  // Set a variable to store the array's numbers to put inside the circle
  let circleNumber = 0;
  circleNumber = circle;

  // Create circle
  circle = document.createElement("div");
  circle.classList.add("circle");
  circle.innerText = circleNumber;
  circleWrapper.appendChild(circle);
  //append circles to circleWrapper

  mainDiv.append(circleWrapper);

  // Circle mousedown event

  circle.addEventListener("mousedown", (e) => {
    //handle response if boredness scale is less than 3

    if (e && parseInt(circle.innerText) < 3) {
      firstResponse.textContent += "You don't need me right now.";
      mainDiv.style.display = "none";

      //handle response if boredness scale is more or equal to 3
    } else {
      mainDiv.style.display = "none";
      clearActivity.style.display = "flex";
     
      handleActivity();
    }
  });
});

// Retrieve activity data

function handleActivity() {
  fetch("http://localhost:3000/activities")
    .then((res) => res.json())
    .then((data) => {
      activityData(data);
    });
}

function activityData(data) {
  acceptedResDiv.style.opacity = "1";
  acceptedResDiv.style.display = "flex";
  acceptedRes.textContent += "Okay, here are some activities";

  // Initialize random activity when page loads
  let randomItem = data[Math.floor(Math.random() * data.length)];
  suggestActivity.textContent += randomItem.activity;
  typeActivity.textContent += randomItem.type.toUpperCase();

  clearActivity.addEventListener("click", () => {
    // Change random activity by using a different variable

    let randomAct = data[Math.floor(Math.random() * data.length)];

    suggestActivity.textContent = "";
    typeActivity.textContent = "";

    // Set new activity to the new random variable

    suggestActivity.textContent += randomAct.activity;
    typeActivity.textContent += randomAct.type.toUpperCase();
  });
}
// Comment elements

let commentsWrapper = document.querySelector(".comments-wrapper");

//Initialize comment form and add submit event

let form = document.querySelector("#comment-form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const input = document.querySelector("input#comment-input");
  const comments = {
    // set comment key to whatever was put in input (input.value)

    commentInput: input.value,
  };
  if (input.value !== "") {
    displayComments(comments);
    postComment(comments);
  }
}

// Fetch comments data

function getComments() {
  fetch("http://localhost:3000/comments")
    .then((res) => res.json())
    .then((data) => data.forEach((comment) => displayComments(comment)));
}
getComments();

// Use post method to bring new data to the database
function postComment(commentsObj) {
  fetch("http://localhost:3000/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentsObj),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function displayComments(comment) {
  let commentsDiv = document.querySelector(".comment-section");
  let showComment = document.createElement("div");
  let commentText = document.createElement("h4");

  // Add db.json's comment object to h4 text content
  console.log(comment);
  commentText.textContent += comment.commentInput;
  showComment.appendChild(commentText);

  commentsDiv.appendChild(showComment);
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

// Add back arrow and event

let backArrow = document.querySelector(".fa-circle-arrow-left")

backArrow.addEventListener("click", handleBack)

function handleBack(){
  acceptedRes.textContent = ""
  mainDiv.style.display = "flex"
  commentsWrapper.style.display = "flex";
  clearActivity.style.display = "none";
  acceptedResDiv.style.opacity = "0"
  acceptedResDiv.style.display = "none"
  firstResponse.textContent = ""
  suggestActivity.textContent = ""
  typeActivity.textContent = ""

}
