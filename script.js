const APIKEY = '65bb98eaca96575e0b277ca0' //WILL BE USED FOR RESTDB API, available out there as global var

window.onload = function(){
  let hideForm  = document.getElementById("enter-game-submission");
  if (hideForm != null){
    hideForm.style.display = "none";
  }

}

//This functions process this block when first loaded, 
document.addEventListener("DOMContentLoaded", function () {
    //Start of commands to carry out
    getLeaderboard(); //update at the start
    startTimer(); // Start the countdown when the page is fully loaded, when at ingame.html
})

//W3 school script on showing/hiding the accordion
function myFunction(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}

//This function checks if user clicks on the playnow button in index.html, then shows the username input
function playnow(){
  document.getElementById("enter-game-submission").style.display = "block";
}

//change from index.html to ingame.html 
function switchToInGame(e){
  // Prevent the default form submission behavior
  e.preventDefault();
  //Get the username input value from the form
  const playerUser = document.getElementById("username").value;

  // Check if the username input is empty
  if (playerUser.trim() === "") {
    // If the username is empty, display an error message and return
    console.log("Username cannot be empty."); //test
    alert("Username cannot be empty.") //PROMPT USER
    return; 
  }

  //Save the username for later use
  localStorage.setItem("username", playerUser);

  //Displaying message and redirect the user
  console.log("Username submitted:", playerUser);
  location.href = "ingame.html"
}



//The button automatically gets the updated data without refreshing entire page
function refreshLeaderboard(){
  console.log("Buttonclicked"); // test
  getLeaderboard();
}

function startTimer(){
  //test this, whether at right page
  let timer = document.getElementById("timer");
  if (timer == null){
    return;
  }
  let timeInSeconds = 150; // 2 minutes 30 seconds

  // Update the timer every second
  const timerInterval = setInterval(function() {
    // Convert time to hours, minutes, and seconds with some math calculation
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    // Display the timer in the "HH:MM:SS" format
    timer.textContent = `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    timeInSeconds--; 

    // If time reaches 0, clear the interval
    if (timeInSeconds < 0) {
      clearInterval(timerInterval);
      // You can add any action you want to perform when the timer reaches 0
      alert("Time's up!");
    }
  }, 1000); // Run every second
}

//This function gets the list of user and its highest score from restdb leaderboard
function getLeaderboard() {

   // Show loading animation
   const indicator = document.getElementById("loading-animation-leaderboard");

   if (indicator == null){
    return; //end this method, cant find at it is not at the correct html page.
   }
   indicator.style.display = "block";


  //Create our AJAX settings
  let settings = {
    method: "GET", //we will use GET to retrieve info
    headers: {
      "Content-Type": "application/json",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache"
    },
  }

  fetch("https://emojicharade-161f.restdb.io/rest/leaderboard", settings)
  .then(response => response.json())
  .then(response => {
    console.log(response); //test output

    // Extract scores and usernames only
    scoresAndUsernames = response.map(data => ({ score: data.score, username: data.username }));

    //SORTING IN DESCENDING, it subtracts a.score from b.score,  negative, b comes before a, resulting in descending order.
    //If the result is positive, a comes before b, resulting in ascending order.
    scoresAndUsernames.sort((a, b) => b.score - a.score);

    // Take top 5 entries
    top5 = scoresAndUsernames.slice(0, 5);
    console.log(top5)//testoutput

    // Loop through the top 5 entries and insert data into HTML using data attributes
    const leaderboardItems = document.querySelectorAll(".leaderboard-item"); //all of the elements with the class leaderboard-item.

    leaderboardItems.forEach((item, index) => {
      const gameName = item.querySelector(".game-name" + (index + 1)); // Access using dynamic string
      const score = item.querySelector(".score" + (index + 1)); // Access using dynamic string

      if (gameName && score) { // Check if elements exist, should exist
        gameName.textContent = top5[index].username;
        score.textContent = top5[index].score;
      }
    });

    // Hide loading animation after data is fetched and processed
    indicator.style.display = "none";
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Error fetching leaderboard data:', error);
    // Hide loading animation in case of error
    indicator.style.display = "none";
  });
}

//this opens up a new tab to facebook
var isFBclick = false;
var notFBClick = true;
function newtabFb(){
  window.open("https://www.facebook.com/login.php/")
}