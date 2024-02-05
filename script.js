const APIKEY = '65bb98eaca96575e0b277ca0' //WILL BE USED FOR RESTDB API, available out there as global var

let questions; //make it a global variable first
var currentQuestionIndex = 0; //first question at the start
let score = 0; //total score by player
let hintNotClick;
let isHintClick;

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
    getQuestions()  
    //returns a Promise, i need to handle it asynchronously to deal with the promise resolve value;
    .then(questionArray => {
      console.log(questionArray); //debugging
      questions = questionArray; //asssign to a global variable when done for displayquestion to access later for sub qn
      console.log(questions);
      if (questionArray != null && Array.isArray(questionArray)) { ///shd be a array of object
        displayQuestions(questionArray, currentQuestionIndex); //
        startTimer(); // Start the countdown when the page is fully loaded, when at ingame.html
      }
      else { //this is a null, as indicator cant be found, meaning that our page is not on ingame
      console.error('No questions fetched or invalid page.');
      // Handle the case where questionArray is null or not an array
      }
    })
    .catch(error => {
      //errors that occurred during fetching or processing questions
      console.error('Error fetching questions:', error);
      alert('Please refresh the page, error getting data');
    });

})

//W3 school script on showing/hiding the accordion, and added my own var to check for is click before
function myFunction(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    isHintClick = true;
    if (isHintClick && hintNotClick){
      console.log("Hint clicked alr")
      score = score - 5;
      hintNotClick = false; //can no longer trigger this if function as only once, reset by displayquestions
      alert('Hints used! -5 Points');
      if (score <0){ //no negative balance
        score = 0;
      }
    }
  } 
  else { 
    x.className = x.className.replace(" w3-show", "");
  }
}

//This function checks if user clicks on the playnow button in index.html, then shows the username input block
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
  //Get the category where user chooses and store it too
  const category = document.getElementById("gameCategory").value;
  localStorage.setItem("category", category);
  //Displaying message and redirect the user
  console.log("Submitted details: ", playerUser, category);
  location.href = "ingame.html"
}


//The button automatically gets the updated data without refreshing entire page
function refreshLeaderboard(){
  console.log("Buttonclicked"); // test to see if runs
  getLeaderboard();
}

function startTimer(){
  //test this, whether at right page
  let timer = document.getElementById("timer");
  if (timer == null){
    return;
  }
  let timeInSeconds = 180; //60*3 (3 minutes)

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
      clearInterval(timerInterval); //stop the set interval function
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

function getQuestions() {
  // Show loading animation
  const indicator = document.getElementById("loading-animation-ingame");

  if (indicator == null) {
    return Promise.resolve(null); // Resolve with null if indicator element is not found
  }
  indicator.style.display = "block";

  //new Promise with .then() to wait for the questions to be fetched and processed 
  return new Promise((resolve, reject) => {
    // Create our AJAX settings
    let settings = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
    };

    // Fetch the data from RESTDB
    fetch("https://emojicharade-161f.restdb.io/rest/quiz", settings)
        .then(response => response.json())
        .then(response => {
            selectedCategory = localStorage.getItem("category") || 'Song'; // Set default category to 'Song', if get item is NULL
            console.log("Selected category:", selectedCategory); //debugging purposes

            //Filter the response array based on the selected category
            const filteredArray = response.filter(item => item.category === selectedCategory);
            console.log(filteredArray); //test

            //Extract questions, answer, hint only
            const questionInfo = filteredArray.map(data => ({
                question: data.question,
                answers: data.answers,
                hint: data.hint
            }));

            //Shuffle JSON array
            const shuffledQnArray = shuffleArray(questionInfo);
            //Function to shuffle
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }

            //Take top 5 entries as 5 questions only
            const first5Qn = shuffledQnArray.slice(0, 5);
            console.log(first5Qn); //debugging to show

            //Hide loading animation
            indicator.style.display = "none";

            resolve(first5Qn); // Resolve the promise with the fetched questions
        })
        .catch(error => {
            console.error("Error fetching questions:", error);
            indicator.style.display = "none"; // Hide loading animation to prevent further loading
            reject(error); // Reject promise with error
        });
});
}

//This function is called on default on first time, it needs to pass in index and array
function displayQuestions(questionArray, currentQuestionIndex){
    console.log('displaying questions');
    var currentQuestion = questionArray[currentQuestionIndex];
    isHintClick = false; //both var to hold the conditions for checking hint used
    hintNotClick = true;
    document.getElementById('qn-img').innerHTML = '<img src="' + currentQuestion.question + '" alt="Question Image">';
    document.getElementById('hinttext').innerText = currentQuestion.hint;
    document.getElementById('progress').innerText = (currentQuestionIndex +1) + '/' + questionArray.length; //show progress bar
}

//This button checks for answers given, and proceeds with next question if correct
function CheckAnswer(e){
  e.preventDefault(); // Prevent form submission
  var answer = document.getElementById('answer').value;
  // Check if the answer input is empty
  if (answer.trim() === "") {
    //display error message and return
    alert("Answers cannot be blank!") //PROMPT USER
    return; 
  }
  var currentQuestion = questions[currentQuestionIndex]; //gets the object at the specific index
  console.log("Given: " + answer);
  console.log("Answer: " + currentQuestion.answers);
  if (answer.toLowerCase() === currentQuestion.answers.toLowerCase()) { //to verify w all lower case as default
      //Correct answer
      var correctAns= true;
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
          displayQuestions(questions, currentQuestionIndex);
          showAnimationCW(correctAns);
          formclass = document.querySelector('.enter-ans-form');
          formclass.reset(); //clear the form so that its blank again
      } else {
          alert('Finish');
      }
  } else {
      //Incorrect answer
      var correctAns = false;
      showAnimationCW(correctAns);
      formclass = document.querySelector('.enter-ans-form');
      formclass.reset(); //clear the form so that its blank again
  }

}

function showAnimationCW(rightOrWrong) {
  if (rightOrWrong) {
    const animationDiv = document.getElementById('celebrate-correct-ans');
    animationDiv.style.display = 'block';
    //Hide animation after 2 seconds
    setTimeout(function() {
      animationDiv.style.display = 'none';
    }, 3000); //3 seconds
  }
  else {
    const animationDiv = document.getElementById('wrong-ans');
    animationDiv.style.display = 'block';
    //Hide animation after 2 seconds
    setTimeout(function() {
      animationDiv.style.display = 'none';
    }, 3000); //3 seconds
  }

}


//this opens up a new tab to facebook
var isFBclick = false;
var notFBClick = true;
function newtabFb(){
  window.open("https://www.facebook.com/login.php/")
}