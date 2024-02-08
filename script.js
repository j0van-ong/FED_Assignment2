const APIKEY = '65bb98eaca96575e0b277ca0' //WILL BE USED FOR RESTDB API, available out there as global var

let questions; //make it a global variable first
var currentQuestionIndex = 0; //first question at the start
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
    // Check if the user has given consent
    if (localStorage.getItem('audioConsent') === 'true') {
      element = document.getElementById('music-btn')
      element.style.backgroundColor = 'black';
      document.getElementById('bgAudio').play(); // Start audio playback
    }
    getLeaderboard(); //update at the start, only for leaderboard.html
    getQuestions()  //run when in game.html
    //returns a Promise, i need to handle it asynchronously to deal with the promise resolve value;
    .then(questionArray => {
      console.log(questionArray); //debugging
      questions = questionArray; //asssign to a global variable when done for displayquestion to access later for sub qn
      console.log(questions);
      if (questionArray != null && Array.isArray(questionArray)) { ///shd be a array of object as it is returned from restdb
        displayQuestions(questionArray, currentQuestionIndex); //
        startTimer(); // Start the countdown when the page is fully loaded, when at ingame.html
      }
      else { //this is a null, as indicator cant be found, meaning that our page is not on ingame
      console.error('No questions fetched or invalid page.');
      //above handles the case where questionArray is null or not an array
      }
    })
    .catch(error => {
      //errors that occurred during fetching or processing questions, prompt
      console.error('Error fetching questions:', error);
      alert('Please refresh the page, error getting data');
    });
    displayResult(); //only run for endgame.html
})


//Main BackgroundAudio
function playBgAudio(id) {
  const mainBg = document.getElementById('bgAudio');
  const element = document.getElementById(id);
  
  if (mainBg != null && element.style.backgroundColor !== 'black') { //havent been consented
      mainBg.play(); 
      element.style.backgroundColor = 'black';
  } else { //player want to switch back;
      element.style.backgroundColor = ''; //
      mainBg.pause();
      return;
  }
}


//W3 school script on showing/hiding the accordion, and added my own var to check for is click before
function myFunction(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    isHintClick = true;
    if (isHintClick && hintNotClick){
      console.log("Hint clicked alr")
      //deduction of score
      currentScore = localStorage.getItem('currentScore');
      storedInt = parseInt(currentScore); // Parse string to integer since localstorage stores string
      storedInt = storedInt -5;
      if (storedInt <0){ //no negative balance
        storedInt = 0;
      }
      localStorage.setItem('currentScore', storedInt);

      hintNotClick = false; //can no longer trigger this if function as only once, reset by displayquestions
      alert('Hints used! -5 Points');

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

//change from index.html to ingame.html overall purpose, with validaito
function switchToInGame(e){
  // Prevent the default form submission behavior
  e.preventDefault();

  //Show loading animation when run, id is present as function only available in index.html
  const loadindex = document.getElementById("loading-animation-index");
  loadindex.style.display = 'block';
  
  //Get the username input value from the form
  const playerUser = document.getElementById("username").value;
  const category = document.getElementById("gameCategory").value;

  // Check if the username input is empty
  if (playerUser.trim() === "") {
    // If the username is empty, display an error message and return
    console.log("Username cannot be empty."); //test
    alert("Username cannot be empty.") //PROMPT USER
    return; 
  }
  //handle asynchronous operations, so that it only returns after fetching and not get a value of undefined
  checkUsername(playerUser, category)
  .then(isActionConfirm => {
    console.log("User proceeds on: " + isActionConfirm); //debugging purposes
    if (isActionConfirm) {
      localStorage.setItem("category", category); //confirm the category too, save into storage so that it saves the details
      console.log("Submitted details: ", playerUser, category);
      location.href = "ingame.html";
    } else {
      loadindex.style.display = 'none'; //hide loading
      return; //no further action
    }
  })
  .catch(error => { //incase of any error
    console.error('Error checking username:', error);
    alert('Error checking validity of username with api');
  });
}

//This functions checks for existing user, then prompts to confirm if user has decided. save to local storage. if not, make new using function, 
function checkUsername(playerUser, category) {
  //new Promise with .then() to wait for the questions to be fetched and processed 
  return new Promise((resolve, reject) => { //make 
    const settings = {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY, 
        "Cache-Control": "no-cache"
      },
    };

    fetch("https://emojicharade-161f.restdb.io/rest/leaderboard", settings)
      .then(response => response.json())
      .then(data => {
        var isFound = false;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].username === playerUser) {
            isFound  = true;
            var foundscore = data[i].score;
            var foundId = data[i]._id;
            break;
          }
        }

        if (isFound){
          const msg = `You have selected an existing username.\nUsername: ${playerUser}\nCategory: ${category}\nContinue?`;
          const continueWUser = window.confirm(msg);
          if (continueWUser) {
            localStorage.setItem("username", playerUser);
            localStorage.setItem("_id", foundId);
            localStorage.setItem("highestscore", foundscore);
            resolve(true);
          } 
          else {
            resolve(false);
          }
        }
        else {
          var msg = `You have selected a new unused username.\nUsername: ${playerUser}\nCategory: ${category}\nContinue?`;
          let continueWUser = window.confirm(msg);
          if (continueWUser) {
            MakeNewPlayer(playerUser)
              .then(() => resolve(true))
              .catch(error => reject(error));
          } else {
            resolve(false);
          }
        }

      })
    .catch(error => {
      console.error('Error fetching leaderboard data:', error);
      alert('Error getting api, refresh and make sure connect to wifi')
      reject(error);
    });
  });
}

//Make new player function, only called if DeterminePlayer cant find the user. new promise is needed so that the function waits for it
function MakeNewPlayer(playerUser){
  return new Promise((resolve, reject) => {
    //create json object format to post
    var jsonData = {
      "username": playerUser,
      "score": 0,
    };

    //[STEP 4]: Create AJAX settings
    let settings = {
      method: "POST", //we will use post to send info
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(jsonData),
    };

    //Send our AJAX request over to the DB
    fetch("https://emojicharade-161f.restdb.io/rest/leaderboard", settings)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("username", playerUser);
        localStorage.setItem("_id", data._id);
        localStorage.setItem("highestscore", data.score);
        resolve(data); // Resolve with the response data
      })
      .catch(error => {
        console.error('Error creating new player:', error);
        reject(error);
      });
  });
}

//The button automatically gets the updated data without refreshing entire page
function refreshLeaderboard(){
  console.log("Buttonclicked"); // test to see if runs
  getLeaderboard();
}

//call last, begins running after everything is done.
function startTimer(){
  //test this, whether at right page, if not at right page return null;
  let timer = document.getElementById("timer");
  if (timer == null){
    return;
  }
  let timeInSeconds = 150; //60*2 + 30 (2 minutes 30s)

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
      location.href = "endgame.html"; //switch page
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

    //Take top 5 entries
    top5 = scoresAndUsernames.slice(0, 5);

    //Loop through the top 5 entries and insert data into HTML using data attributes
    const leaderboardItems = document.querySelectorAll(".leaderboard-item"); //all of the elements with the class leaderboard-item.

    leaderboardItems.forEach((item, index) => {
      const gameName = item.querySelector(".game-name" + (index + 1)); // Access using dynamic string
      const score = item.querySelector(".score" + (index + 1)); // Access using dynamic string

      if (gameName && score) { // Check if elements exist, should exist
        gameName.textContent = top5[index].username;
        score.textContent = top5[index].score;
      }
    });

    //Hide loading animation after data is fetched and processed
    indicator.style.display = "none";
  })
  .catch(error => {
    //Handle any errors that occurred during the fetch
    console.error('Error fetching leaderboard data:', error);
    alert('Cant get the api')
    //Hide loading animation in case of error
    indicator.style.display = "none";
  });
}

function getQuestions() {
  //Show loading animation
  const indicator = document.getElementById("loading-animation-ingame"); //check whether in-game

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

            //Extract questions, answer, hint only, unwanted _id
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

            //Take top 8 entries as our 8 questions only
            const first8Qn = shuffledQnArray.slice(0, 8);
            console.log(first8Qn); //debugging to show

            //Hide loading animation
            indicator.style.display = "none";

            resolve(first8Qn); // Resolve the promise with the fetched questions
        })
        .catch(error => {
            console.error("Error fetching questions:", error);
            alert('Error in fetching.')
            indicator.style.display = "none"; // Hide loading animation to prevent further loading
            reject(error); // Reject promise with error
        });
});
}

//This function is called on default on first time, it needs to pass in index and array
function displayQuestions(questionArray, currentQuestionIndex){
    if (currentQuestionIndex == 0){
      localStorage.setItem('currentScore', 0); //at the very start, define first to be 0
      localStorage.setItem('isFBclick', false);
      localStorage.setItem('notFBClick', true);
    }
    console.log('displaying questions...');
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

      //increment of score
      currentScore = localStorage.getItem('currentScore');
      storedInt = parseInt(currentScore); // Parse string to integer since localstorage stores string
      storedInt = storedInt + 10;
      localStorage.setItem('currentScore', storedInt);

      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
          displayQuestions(questions, currentQuestionIndex);
          showAnimationCW(correctAns);
          //Play Audio
          const correctAudio = document.getElementById('correctAudio');
          correctAudio.play();
          formclass = document.querySelector('.enter-ans-form');
          formclass.reset(); //clear the form so that its blank again

          //This closes the w3 accordion to hide the answer in case user did not close it
          Demo1.className = Demo1.className.replace(" w3-show", "");
      } else {
        location.href = "endgame.html";
      }
  } else {
      //Incorrect answer
      //Play Audio
      const wrongAudio = document.getElementById('wrongAudio');
      wrongAudio.play();
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
    //Hide animation after 2.5 seconds
    setTimeout(function() {
      animationDiv.style.display = 'none';
    }, 2500); //2.5 seconds
  }
  else {
    const animationDiv = document.getElementById('wrong-ans');
    animationDiv.style.display = 'block';
    //Hide animation after 2.5 seconds
    setTimeout(function() {
      animationDiv.style.display = 'none';
    }, 2500); //2.5 seconds
  }

}

function displayResult(){
  const indicatorLoader = document.getElementById('loading-animation-endgame');
  if (indicatorLoader == null){
    return; //not at the right page
  }
  indicatorLoader.style.display = 'block';

  //Gets the variable needed to display by retrieving from local storage
  let displayUser = localStorage.getItem("username");
  let displayScore = localStorage.getItem('currentScore'); 
  let highestScore = localStorage.getItem('highestscore');

  //convert score into an integer
  displayScore = parseInt(displayScore);

  //convert highest score into an integer
  highestScore = parseInt(highestScore);
 
  //Select the html element to insert in
  const playerNameElement = document.getElementById("player-name");
  const playerScoreElement = document.getElementById("player-score");

  //See how many stars according to the score
  const star1 = document.getElementById("star1");
  const star2 = document.getElementById("star2");
  const star3 = document.getElementById("star3");

  //Set the image based on the player's score, total score is 80 in this case
  if (displayScore >= 65) {
      star1.innerHTML = '<img src="./Picture/game-star-isolated-removebg-preview.png">';
      star2.innerHTML = '<img src="./Picture/game-star-isolated-removebg-preview.png">';
      star3.innerHTML = '<img src="./Picture/game-star-isolated-removebg-preview.png">';
  } else if (displayScore >= 45) {
      star1.innerHTML = '<img src="./Picture/game-star-isolated-removebg-preview.png">';
      star2.innerHTML = '<img src="./Picture/game-star-isolated-removebg-preview.png">';
      star3.innerHTML = '<img src="./Picture/game-star-isolated-removebg-preview (1).png">';
  } else if (displayScore >= 25) {
      star1.innerHTML = '<img src="./Picture/game-star-isolated-removebg-preview.png">';
      star2.innerHTML = '<img src="./Picture/game-star-isolated-removebg-preview (1).png">';
      star3.innerHTML = '<img src="./Picture/game-star-isolated-removebg-preview (1).png">';
  } else {
      star1.innerHTML = '<img src="./Picture/game-star-isolated-removebg-preview (1).png">';
      star2.innerHTML = '<img src="./Picture/game-star-isolated-removebg-preview (1).png">';
      star3.innerHTML = '<img src="./Picture/game-star-isolated-removebg-preview (1).png">';
  }
  indicatorLoader.style.display = 'none';

  //Set the text content of each element to the corresponding value
  playerNameElement.textContent = "Name: " + displayUser;
  playerScoreElement.textContent = "Score: " + displayScore;
  const starRatingContainer = document.getElementById('star-rating');
  // Make the star rating container visible, which apply the zoom in effect
  starRatingContainer.style.display = 'flex';

  // Apply the zoom-in effect after a short delay
  setTimeout(function() {
      starRatingContainer.classList.add('zoom-in');
  }, 100); // Adjust the delay as needed
  
  if (displayScore > highestScore){  //current score is more than highest set
    console.log('updating leaderboard...')
    console.log('Displayscore:' + displayScore);
    updateLeaderboard(displayScore, displayUser);
  }
}

//Last function to call after at endgame.html, to update result or by sharing to Facebook
function updateLeaderboard(receivescore, name){
  playerId = localStorage.getItem("_id");

  var updatedJsonData = {
    "_id": playerId,
    "username": name,
    "score": receivescore
  };

  let settings = {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json", 
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache"
    }, 
    body: JSON.stringify(updatedJsonData)
  }
  fetch(`https://emojicharade-161f.restdb.io/rest/leaderboard/${playerId}`, settings)
    .then(response => response.json())
    .then(data => {
      console.log("score updated successfully:", data); //test
    })
    .catch(error => console.log(error));
  
}

//this opens up a new tab to facebook
function newtabFb(){
  isFBclick = localStorage.getItem('isFBclick'); //false default
  notFBClick = localStorage.getItem('notFBClick'); //true default
  isFBclick = true;
  localStorage.setItem('isFBclick', true);
  if (isFBclick && notFBClick){
    window.open("https://www.facebook.com/login.php/");
    //change to false, so no longer activateable unless restart the game, in the displayQn. Ensures no refresh to spam points
    localStorage.setItem('notFBClick', false);
    nowScore = localStorage.getItem('currentScore');
    higestObtain = localStorage.getItem('highestscore');

    nowScore = parseInt(nowScore);
    higestObtain = parseInt(higestObtain);
    nowScore = nowScore + 5; ///current bonus
    if (nowScore > higestObtain){
      whichUser = localStorage.getItem("username");
      updateLeaderboard(nowScore, whichUser);
    } 
    const shownewScore = document.getElementById("player-score");
    shownewScore.textContent = "Score: " + nowScore;
  }
}

function tryAgain(){
  location.href = "ingame.html"; //only if users want the same category again, will reset
}