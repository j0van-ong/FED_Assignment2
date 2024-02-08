# Emoji Charades - An interactive emoji puzzle game 
Embark on a cognitive adventure with Emoji Charades, a user-friendly media application tailored to challenge and entertain teenagers, particularly students. This brain-boosting game provides a platform for user to exercise their minds through engaging puzzle games, offering a high-quality digital experience.

## Important Links for Asg Submission
- [Video Submission pitch](https://drive.google.com/file/d/1LiuotwKXBYuRX2BW9ZmCjDuNZYlNWYVn/view?usp=sharing) Link: https://drive.google.com/file/d/1LiuotwKXBYuRX2BW9ZmCjDuNZYlNWYVn/view?usp=sharing
- [GitHub Page Link to Game](https://j0van-ong.github.io/FED_EmojiCharades_website/) Link: https://j0van-ong.github.io/FED_EmojiCharades_website/
- [Figma Link for Wireframe](https://www.figma.com/file/eJyB3E9yVFNVtOFHlYK0xL/FED_Assignment2_wireframe?type=design&node-id=0%3A1&mode=design&t=y7CU3ot0z9ItnRJ7-1) Link: https://www.figma.com/file/eJyB3E9yVFNVtOFHlYK0xL/FED_Assignment2_wireframe?type=design&node-id=0%3A1&mode=design&t=y7CU3ot0z9ItnRJ7-1

## Roles of us
-Jovan Ong: HTML, CSS, Major parts of JS, Lottie, Music and Image research
-Thet Mon Hnin : RESTDB Creation, Fetching of RESTDB API in JS, Generating Questions

## Design Process
### Flexibility
Emoji Charades stands out with its flexibility, offering a diverse range of genres in its puzzles. This unique feature allows players to tailor their gaming experience, fostering skill development across various cognitive aspects. For now, there is a options of up to 3 categories, which can easily be added more if it is well received by consumers.

### Real-time Collaboration
Challenge your friends and peers in real-time by competing on the Emoji Charades leaderboard. Ussers earn points based on their guessing skills, fostering healthy competition and a sense of achievement. Climb the ranks and showcase your emoji deciphering prowess to the world. 
### User Interface
Enjoy a seamless and enjoyable experience with Emoji Charades' user-friendly interface. The design strikes a balance between simplicity and functionality, ensuring that users of all levels can navigate effortlessly through the application's features. The intuitive layout enhances the overall gaming experience. 
### Target Audiences
Our aim is to provide a simple yet engaging quiz game that can be accessed effortlessly. Amidst the challenges of the pandemic and the demands of virtual learning, Emoji Charades offeres a much-needed escape and a source of mental stimulation for teenagers worldwide. Whether seeking a break from the screen fatigue of online classes or looking for a fun way to connect with friend virtually, our game provides a refreshing and engaging eperience.
#### User Stories:
1. As a teenager, I want to have a fun and engaging activity to play during my free time, so that I can relax and unwind form the stresses of school.
2. As a student, I want to exercise my mind with challenging puzzles, so that I can improve my cognitive skills and mental agility.
3. As a teenager, I want to be able to easily access the game on my smartphone or computer, so that I can play it whenever and wherever I want.
4. As a teenager, I want to be able to play the game with my friends, either in person or virtually, so that we can bond and have fun together.
5. As a parent, I want a safe and entertaining game for my teenager to play, so that I can feel confident in their screen time choices.
6. As a teacher, I want to recommend an educational game for my students that will help them develop critical thinking skills, so that they can excel academically.
These user stories highlight the diverse needs and desires of the target audience for Emoji Charades and emphasize on how the game can meet those needs effectively.
7. As a student who is stuck at home during a pandemic, I would like to play games that is not sophisticated and can easily play without the trouble to sign up for a account. I would want to play the game with my friends and challenge each other.


## Features
My wireframe Figma: [My wireframe](https://www.figma.com/file/eJyB3E9yVFNVtOFHlYK0xL/FED_Assignment2_wireframe?type=design&node-id=0%3A1&mode=design&t=y7CU3ot0z9ItnRJ7-1)

### Existing Features
Overall: 
-Music button for those who would like to listen to at the same time in the navigation bar.
-Navigation Bar to easily access different pages.
-Loading Lottie Animation across all website if there is a need to fetch data for users.

index.html HomePage UI
- Input textbox and selection of category to allows users to fill in their username and choose a quiz category that they like
- Validation of the username if its existing or a new one, with confirmation prompt incase user mistype wrongly.

ingame.html Game Process UI 
- Timer, default at 2 minutes 30 seconds users as time limit to submit their answers. It sets a challenge and thrill where users have to compete against the time.
- Answer textbox where users enter their answers, trigerring different animation and audio indicating correctness.
- Hint button for those who are stuck to hopefully solve it after seeing at the cost of deducting 5 points from their score.

endgame.html After Match end UI
- Animation of stars and also displays the username alongside the final score.
- Number of stars obtained corresponds to their score
- FaceBook social media share button, which users might want to flex their score and at the same time boost our popularity, with them gaining +5points too
- Try Again Button to get back in the game immediately, with the same username and category selected previously.

leaderboard.html
- Shows the Top 5 users with the 5 highest score at the most updated time
- Refresh button to demonstrate the use of a API, which is to prevent refreshing the entire page and updates with its latest information fetch.

### Features left to implement
- Originally wanted to play a victory audio after game ends, but difficulty in doing so due to requirement of user needed to interact with the website first. Our idea straightaway redirect to endgame.html
- Lack of time, causing us not to implement a avatar setting where user can customise their profile.

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
- [W3 School](https://www.w3schools.com/) For template codes to easily implement in our website

### RestDB
For this application, we will be dealing with two datasets, 
- Quiz: store quiz relevant informations, such as : questions, answers, hint and quiz category,
- Leaderboard: store user relevant informations, such as : username and score;
## Testing
1. Enabling music
    1. Go to the top right hand corner and enable the music if its off
2. New User gameplay
    1. Enter the username desired and wait for browser to prompt message.
    2. If it replys stating it is existing username, user should pick another username to prevent boosting others profile.
    3. If new username is available, can proceed on.
    4. Type the answer that you think is correct. Complete the game in the desired time given.
    5. Try Again redirects you back to the game with same username and same category choosen previously
3. Sharing to Facebook
    1. Click on the button to get redirected, scores automatically added.
4. Check updated Leaderboard
    1. Refresh entire browser or click refresh button(RECOMMENDED)

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
- Our website is made responsive so that it can work well when the screen sizeor electronic device differs. In mobile view, some of our images are removed where the necessary information remains. It is arranged by moving down a column when our game website has left and right sections distinctly layout. 
### Some bugs
- So far tested no bugs, although user may attempt to refresh the endgame.html to spam points. Intend to redirect them to homepage if refresh but it is inefficent
- Responsive might not be perfect, but it is usable.
- If u open using VS Code, the music will be paused when switching between pages. However, this is not the case on GitHub Live Link, where it will continue playing. You would have to click twice to close if already enabled.

## Justifications
### Usage of advertisment block
As a puzzle game offered free of charge, the integration of an advertisement block serves as a necessary revenue stream to sustain ongiong development efforts and cover operational expenses. We developers do not simply provide a free platform. 
### Usage of own database
The absence of a suitable, cost-free API was not found so the decision was made to establish and employ our own database. This approach affords greater control over data management, customization, and alignment with our specific requirements, hence very flexible
### No implementation of log in/sign up page
This enhance user accessibility and minimizing friction in the user experience journey. By excluding the mandatory account creation processes, we aim to facilitate seamless and immediate access to the game, thereby fostering greater user engagement and satisfaction.
### Added a facebook social media sharing
This can help us to promote our game website by our players who may hopefully come on board and try. While boosting popularity since Facebook is widely used, it also give extra points, which is a win-win situation.

## Credits 
- [Pinterest Dribble Fornite Cover Page Design](https://pin.it/2kGhQBM8T)
- [Pinterest Dribble Mario Leaderboard Design](https://pin.it/3IhPpJtdg)
- [FontMeme.com Fancy Font Generator](https://fontmeme.com/fancy-fonts/)
- [Remove.bg Background Remover](https://www.remove.bg/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [W3 School Accordion Template Code](https://www.w3schools.com/w3css/w3css_accordions.asp)
- [Youtube to MP3 converter](https://mp3-convert.org/youtube-to-mp3-converterss/)
- [LottieFiles.com free to use animation](https://app.lottiefiles.com/)

### Media
- The Emojis used are obtained from:
  1. [Icon Archive](https://www.iconarchive.com/search?q=emoji&page=1)
  2. [Iconduck](https://iconduck.com/search?query=emoji)
  3. [EmojiTerra](https://emojiterra.com/)
  4. [Emojipedia](https://emojipedia.org/)
  5. [FontMeme.com Fancy Font Generator Image](https://fontmeme.com/fancy-fonts/)
  6. [Emoji Charades Logo in Nav Bar](https://th.bing.com/th/id/OIP.wbYXAveutv-TGBArcXFYRAHaJ3?pid=ImgDet&w=474&h=631&rs=1)
  7. [Game Orange Abstract Background](https://www.tanikal.com/wp-content/uploads/2018/01/abstract-orange-shapes-or-1024x576.jpg)
  8. [Emoji LightBulb Image] Unable to find source of author, file deleted online
  9. [Stars rating](https://cdn1.vectorstock.com/i/1000x1000/23/65/game-star-isolated-icon-vector-12612365.jpg)


- The background music used in this project is from:
  1. [Chosic, by Sakura Girl](https://www.chosic.com/download-audio/58136/)
  2. [Chosic, by Kevin Macleod](https://www.chosic.com/download-audio/45420/)
  3. [Youtube](https://www.youtube.com)
      1. [Correct Answer Sound Effect](https://youtu.be/ZvlvhIpcflA?si=I_YF-Ti5awx6Pcwy)
      2. [Wrong Answer Sound Effect](https://youtu.be/ny6qazpJqIw?si=RiLN8N2Ds5RuHYSi)
      3. [Fail Sound Effect](https://youtu.be/RIFDznK3SvY?si=IcZmFj_-XEprmXj3)
### Acknowledgement
- The inspiration for this project is from Dribble Pinterest, as well as popular games like skribbl.io
- Tiktok trends are source of inspirations too
- The music I've obtained is downloaded from Chosic website
- The rest of the audio has been used from Youtube respective publisher, as well as converting it using MP3 Converter.
- Fancy Font images are generated at fontmeme.com
- The various LottieFile animation is taken from respective users that is free to use.
