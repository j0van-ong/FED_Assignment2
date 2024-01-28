//This functions process ____ when first loaded
document.addEventListener("DOMContentLoaded", function () {
    //Start of commands to carry out
    document.getElementById("enter-game-submission").style.display = "none";

    //This function checks if user clicks on the playnow button in index.html, then shows the username input
    var playbutton = document.getElementById("playnow");
    playbutton.addEventListener('click' , function(){
        document.getElementById("enter-game-submission").style.display = "block";
    })
})

function myFunction(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}
