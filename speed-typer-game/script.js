// import { wordsList } from "./wordsList.js";

const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endgameElement = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelection = document.getElementById("difficulty");
const startElement = document.getElementById("start-container");
const startBtn = document.getElementById("start-btn");
const highScoreElement = document.getElementById("high-score");

// Array of words (or fetch from  API)
const wordsList =
  "a ability able about above accept according account across act action activity actually add address administration admit adult affect after again against age agency agent ago agree agreement ahead air all allow almost alone along already also although always American among amount analysis and animal another answer any anyone anything appear apply approach area argue arm around arrive art article artist as ask assume at attack attention attorney audience author authority available avoid away baby back bad bag ball bank bar base be beat beautiful because become bed before begin behavior behind believe benefit best better between beyond big bill billion bit black blood blue board body book born both box boy break bring brother budget build building business but buy by call camera campaign can cancer candidate capital car card care career carry case catch cause cell center central century certain certainly chair challenge chance change character charge check child choice choose church citizen city civil claim class clear clearly close coach cold collection college color come commercial common community company compare computer concern condition conference Congress consider consumer contain continue control cost could country couple course court cover create crime cultural culture cup current customer cut dark data daughter day dead deal death debate decade decide decision deep defense degree Democrat democratic describe design despite detail determine develop development die difference different difficult dinner direction director discover discuss discussion disease do doctor dog door down draw dream drive drop drug during each early east easy eat economic economy edge education effect effort eight either election else employee end energy enjoy enough enter entire environment environmental especially establish even evening event ever every everybody everyone everything evidence exactly example executive exist expect experience expert explain eye face fact factor fail fall family far fast father fear federal feel feeling few field fight figure fill film final finally financial find fine finger finish fire firm first fish five floor fly focus follow food foot for force foreign forget form former forward four free friend from front full fund future game garden gas general generation get girl give glass go goal good government great green ground group grow growth guess gun guy hair half hand hang happen happy hard have he head health hear heart heat heavy help her here herself high him himself his history hit hold home hope hospital hot hotel hour house how however huge human hundred husband I idea identify if ill image imagine impact important improve in include including increase indeed indicate individual industry information inside instead institution interest interesting international interview into investment involve issue it item its itself job join just keep key kid kill kind kitchen know knowledge land language large last late later laugh law lawyer lay lead leader learn least leave left leg legal less let letter level lie life light like likely line list listen little live local long look lose loss lot love low machine magazine main maintain major majority make man manage management manager many market marriage material matter may maybe me mean measure media medical meet meeting member memory mention message method middle might military million mind minute miss mission model modern moment money month more morning most mother mouth move movement movie Mr Mrs much music must my myself name nation national natural nature near nearly necessary need network never new news newspaper next nice night no none nor north not note nothing notice now not number occur of off offer office officer official often oh oil okay old on once one only onto open operation opportunity option or order organization other others our out outside over own owner page pain painting paper parent part participant particular particularly partner party pass past patient pattern pay peace people per perform performance perhaps period person personal phone physical pick picture piece place plan plant play player PM point police policy political politics poor popular population position positive possible power practice prepare present president pressure pretty prevent price private probably problem process produce product production professional professor program project property protect prove provide public pull purpose push put quality question quickly quite race radio raise range rate rather reach read ready real reality realize really reason receive recent recently recognize record red reduce reflect region relate relationship religious remain remember remove report represent Republican require research resource respond response responsibility rest result return reveal rich right rise risk road rock role room rule run safe same save say scene school science scientist score sea season seat second section security see seek seem sell send senior sense series serious serve service set seven several shake share she shoot short shot should shoulder show side sign significant similar simple simply since sing single sister sit site situation six size skill skin small smile so social society soldier some somebody someone something sometimes son song soon sort sound source south southern space speak special specific speech spend sport spring staff stage stand standard star start state statement station stay step still stock stop store story strategy street strong structure student study stuff style subject success successful such suddenly suffer suggest summer support sure surface system table take talk task tax teach teacher team technology television tell ten tend term test than thank that the their them themselves then theory there these they thing think third this those though thought thousand threat three through throughout throw thus time to today together tonight too top total tough toward town trade traditional training travel treat treatment tree trial trip trouble true truth try turn TV two type under understand unit until up upon us use usually value various very victim view violence visit voice vote wait walk wall want war watch water way we weapon wear week weight well west western what whatever when where whether which while white who whole whom whose why wide wife will win wind window wish with within without woman wonder word work worker world worry would write writer wrong yard yeah year yes yet you young your yourself";
const words = wordsList.split(" ");
const wordsLength = words.length;

const lowerCaseWords = words.map((word) => word.toLowerCase());
const lowerCaseWordsLength = lowerCaseWords.length;

const usedWords = [];

// Initial word
let randomWord;

// Define score
let score;

// Define time
let time;

// Define highest score
let highest = localStorage.getItem("highScore");
// show highest score (if applicable) in html
highest
  ? (highScoreElement.innerHTML = `
<h3>Highest Score: ${highest}</h3>
`)
  : (highScoreElement.innerHTML = `
<h3>There is No saved high score on this computer yet!</h3>
`);

// Inital start game
function startGame() {
  startElement.style.opacity = 0;
  startElement.style.zIndex = 0;
  time = 10;
  score = 0;
}

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
  if (difficulty === "easy" && usedWords.length < lowerCaseWordsLength) {
    return lowerCaseWords[Math.floor(Math.random() * lowerCaseWords.length)];
  } else if (difficulty !== "easy" && usedWords.length < wordsLength) {
    return words[Math.floor(Math.random() * words.length)];
  } else {
    gameOver();
  }
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
  usedWords.push(randomWord);

  if (difficulty === "easy") {
    lowerCaseWords.splice(lowerCaseWords.indexOf(randomWord), 1);
    return lowerCaseWords;
  } else {
    words.splice(words.indexOf(randomWord), 1);
    return words;
  }
}

// Update score
function updateScore() {
  // score++;
  if (difficulty === "hard") {
    score += 2;
  } else if (difficulty === "medium") {
    score += 1;
  } else {
    score += 0.5;
  }
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
  if (usedWords.length === wordsLength) {
    endgameElement.innerHTML = `
    <h1>Congratulation!!!</h1>
    <h3>You have successfully completed the challenge of typing ${WordsLength} most common English words!</h3>
    <p>Your final score is ${score}</p>
    <h4>Now go brag to your friends!!!</h4>
    <button onclick="location.reload()">Restart</button>
    `;
  } else {
    endgameElement.innerHTML = `
    <h1>Time is up!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Restart</button>
    `;
  }
  endgameElement.style.display = "flex";
  let highScore = localStorage.getItem("highScore");
  if (highScore === null) {
    localStorage.setItem("highScore", score);
  } else if (highScore <= score) {
    localStorage.setItem("highScore", score);
  } else {
    localStorage.getItem("highScore");
  }
  // localStorage.setItem("highScore", highScore);
}

addWordToDOM();

// -----Event listeners-----

// start game
startBtn.addEventListener("click", startGame);

// typing
text.addEventListener("input", (event) => {
  const insertedText = event.target.value;

  if (insertedText.trim() === randomWord) {
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
