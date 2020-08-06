const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endgameElement = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelection = document.getElementById("difficulty");

// Array of words (or fetch from  API)
const words = ["sigh", "tense", "steer"];

// function fetchRandomWord() {
//   fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
//     method: "GET",
//     headers: {
//       "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
//       "x-rapidapi-key": "4bbcd50389mshff3a4a393acb3bep14a5f2jsnf6a5fde81e04",
//     },
//   })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
// fetchRandomWord();

// Initial word
let randomWord;

// Initial score
let score = 0;

// Initial time
let time = 10;

// Set difficulty to value in localstorage or default to easy
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "easy";

// Set difficulty selection value
difficultySelection.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "easy";

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Get random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreElement.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeElement.innerHTML = time + " second";

  if (time === 0) {
    clearInterval(timeInterval);

    // end game
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endgameElement.innerHTML = `
    <h1>Time is up!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
  endgameElement.style.display = "flex";
}

addWordToDOM();

// -----Event listeners-----

// typing
text.addEventListener("input", (event) => {
  const insertedText = event.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // CLear input
    event.target.value = "";
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Settings select
settingsForm.addEventListener("change", (event) => {
  difficulty = event.target.value;
  localStorage.setItem("difficulty", difficulty);
});
