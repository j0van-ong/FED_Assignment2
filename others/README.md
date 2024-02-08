# Emoji Charades - An interactive emoji puzzle game 
Embark on a cognitive adventure with Emoji Charades, a user-friendly media application tailored to challenge and entertain teenagers, particularly students. This brain-boosting game provides a platform for user to exercise their minds through engaging puzzle games, offering a high-quality digital experience.
## Design Process
### Flexibility
Emoji Charades stands out with its flexibility, offering a diverse range of genres in its puzzles. This unique feature allows players to tailor their gaming experience, fostering skill development across various cognitive aspects.
### Real-time Collaboration
Challenge your friends and peers in real-time by competing on the Emoji Charades leaderboard. Ussers earn points based on their guessing skills, fostering healthy competition and a sense of achievement. Climb the ranks and showcase your emoji deciphering prowess to the world. 
### User Interface
Enjoy a seamless and enjoyable experience with Emoji Charades' user-friendly interface. The design strikes a balance between simplicity and functionality, ensuring that users of all levels can navigate effortlessly through the application's features. The intuitive layout enhances the overall gaming experience. 
### Target Audiences
Our aim is to provide a simple yet engaging quiz game that can be accessed effortlessly. Amidst the challenges of the pandemic and the demands of virtual learning, Emoji Charades offeres a much-needed escape and a source of mental stimulation for teenagers worldwide. Whether seeking a break from the screen fatigue of online classes or looking for a fun way to connect with friend virtually, our game provides a refreshing and engaging eperience.
#### User Stories:
1. As a teenager, I want to have a fun and engaging activity to play during my free time, so that I can relax and unwind form the stresses of school and the pandemic.
2. As a student, I want to exercise my mind with challenging puzzles, so that I can improve my cognitive skills and mental agility.
3. As a teenager, I want to be able to easily access the game on my smartphone or computer, so that I can play it whenever and wherever I want.
4. As a teenager, I want to be able to play the game with my friends, either in person or virtually, so that we can bond and have fun together.
5. As a parent, I want a safe and entertaining game for my teenager to play, so that I can feel confident in their screen time choices.
6. As a teacher, I want to recommend an educational game for my students that will help them develop critical thinking skills, so that they can excel academically.
These user stories highlight the diverse needs and desires of the target audience for Emoji Charades and emphasize on how the game can meet those needs effectively.
## Features
### Existing Features
- Index page - allows users to fill in their username and choose a quiz category that they like
- Timer - users are alloted a specific time limit to submit their answers.
- Answer box - users enter their answers, trigerring an animation indicating correctness.
- Hint button - allows users to access hints at the cost of deducting 5 points from their score.
- Conslusion page - displays the username alongside the final score.
- Leaderboard - shows the top 5 users with the 5 highest score
## Technologies Used
- [HTML](https://html.spec.whatwg.org/) For the structure of website
- [CSS](https://www.w3.org/Style/CSS/Overview.en.html) For the styling of website
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/javascript) For creating meaningful interactions and validating
- [RestDB](https://restdb.io/) For storing our data which can later be fetched 
- [Google fonts](https://fonts.google.com/) For the font style of selected texts or paragraph
- [GitHub](https://github.com/) For tracking past codes and allow efficient pairwork 
- [VSCode](https://code.visualstudio.com/) For writing all the codes need and testing of website
- [BootStrap](https://getbootstrap.com/) For implementing responsive design and easily creating a visually appealing layout for the website.
- [LottieFiles](https://lottiefiles.com/) For integrating high-quality animations
- [Figma](https://www.figma.com/) For creating and collaborating on our website wireframes and prototypes, allowing efficient visualization.
### RestDB
For this application, we will be dealing with two datasets, 
- Quiz: store quiz relevant informations, such as : questions, answers, hint and quiz category,
- Leaderboard: store user relevant informations, such as : username and score;
## Testing
### Home Page
- This is where the user inputs username and selects the category of the puzzle they wishes to play in
  1. Try clicking on the music button to start/stop playing the background music.
  2. Try entering a username by clicking on the username textbox.
  3. Try selecting a category by clicking on the dropdown list given.
  4. Try clicking on the 'Go!' button to submit the username and the category.
  5. An alert box appear whether the username is existing in the database or new username has been entered.
  6. If satisfied, then click on 'OK' button to move on to the ingame page. If not, click on the 'Cancel' button to enter another username or category.
### Ingame Page
- This is where puzzle guessing take place
  1. As soon as user enters this page, the question image is shown as well as the timer started.
  2. Try clicking on the music button to start/stop playing the background music.
  3. Try answering each emoji quiz and click submit or enter.
  4. If the answer is correct, then a lottie animation of success is shown, while another lottie animation shows relevant animation when the answer is wrong.
  5. Try clicking on the hint button, this will give a hint of the current question where in exchange, 5 points is being deducted.
### Endgame
- This is a summarization page for the score of the quiz, showing the numbers of stars, player's name and the score.
- The numbers of stars highlighted depends on the score that the player gains.
  1. Try clicking on the music button to start/stop playing the background music.
  2. Try clicking on 'Try Again', this will leads back to ingame page where the player can try another round of game with the same category. The user will be able to change the category of the game back at the home page so they can simply do this by clicking on the home button.
  3. Try clicking on the 'Facebook' button, which allows player to share their result on facebook. They will receive 5 points on doing so.
### Leaderboard
- This page allows real-time collaborations between users around the world. It helps keep track of the top 5 highest scores and the relevant usernames.
  1. Try clicking on the music button to start/stop playing the background music.
  2. Try clicking on the 'Refresh' button where the leaderboard will refresh without refreshing the whole page.
### Different screen sizes
- Our website is made responsive so that it can work well when the screen sizeor electronic device differs.
### Some bugs
- 
## Justifications
### Usage of advertisment block
As a puzzle game offered free of charge, the integration of an advertisement block serves as a necessary revenue stream to sustain ongiong development efforts and cover operational expenses.
### Usage of own database
The absence of a suitable, cost-free API was not found so the decision was made to establish and employ our own database. This approach affords greater control over data management, customization, and alignment with our specific requirements. 
### No implementation of log in/sign up page
This enhance user accessibility and minimizing friction in the user experience journey. By excluding the mandatory account creation processes, we aim to facilitate seamless and immediate access to the game, thereby fostering greater user engagement and satisfaction.
## Credits 
### Media
- The Emojis used are obtained from:
  1. [Icon Archive](https://www.iconarchive.com/search?q=emoji&page=1)
  2. [Iconduck](https://iconduck.com/search?query=emoji)
  3. [EmojiTerra](https://emojiterra.com/)
  4. [Emojipedia](https://emojipedia.org/)
- The background music used in this project is from:
  1. 
### Acknowledgement
- The inspiration for this project is from 
