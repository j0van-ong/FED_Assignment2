//This functions process ____ when first loaded
document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = '65bb98eaca96575e0b277ca0' //WILL BE USED FOR RESTDB API

    //Start of commands to carry out
    document.getElementById("enter-game-submission").style.display = "none";

    //This function checks if user clicks on the playnow button in index.html, then shows the username input
    var playbutton = document.getElementById("playnow");
    playbutton.addEventListener('click' , function(){
        document.getElementById("enter-game-submission").style.display = "block";
    })

    //This function gets the list of user and its highest score from restdb leaderboard
    function getLeaderboard() {
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
        let content = "";

        for (var i = 0; i < response.length; i++){
          
        }
      });


    }

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

//
let submitBtn = document.getElementById('submit-givenUser');
  submitBtn.addEventListener('click', function (e) {
  e.preventDefault(); //Default deny
  location.href = "ingame.html"
});


