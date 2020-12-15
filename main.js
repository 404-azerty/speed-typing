// API -> https://github.com/lukePeavey/quotable

const api = `https://api.quotable.io/random`;
const time = document.querySelector(`#time`);
const score = document.querySelector(`#score`);
const sentenceToWrite = document.querySelector(`#sentenceToWrite`);
const sentenceToTest = document.querySelector(`textarea`);
let timer;

// show time
let timeCurrent = 60;
time.innerText = `Temps restant : ${timeCurrent}s`;

// change time
function changeTime() {
  // update time
  timeCurrent--;
  time.innerText = `Temps restant : ${timeCurrent}s`;

  // end game
  if (timeCurrent === 0) clearInterval(timer);
}

// show score
let point = 0;
score.innerText = `Score : ${point}`;

// search sentence
async function getSentence() {
  const call = await fetch(api);
  const result = await call.json();
  const sentence = result.content;
  showSentence(sentence);
  // start chrono
  if (timeCurrent === 60) timer = setInterval(changeTime, 1000);
}
getSentence();

// show sentence
function showSentence(sentence) {
  // init sentences
  sentenceToWrite.innerText = ``;
  sentenceToTest.value = null;

  // create a letter
  sentence.split(``).forEach((letter) => {
    const letterSpan = document.createElement(`span`);
    letterSpan.innerText = letter;
    sentenceToWrite.appendChild(letterSpan);
  });
}

// listen type
sentenceToTest.addEventListener(`input`, () => {
  // create arrays for compare
  const lettersToWrite = sentenceToWrite.querySelectorAll(`span`);
  const sentenceCurrent = sentenceToTest.value.split(``);
  let goodAnswer = true;

  // manage good/bad response
  lettersToWrite.forEach((letterToWrite, index) => {
    // init response
    let letterToTest = sentenceCurrent[index];

    // manage not response
    if (!letterToTest) {
      letterToWrite.classList.remove(`good`);
      letterToWrite.classList.remove(`bad`);
      goodAnswer = false;
    }
    // manage good response
    else if (letterToTest === letterToWrite.innerText) {
      letterToWrite.classList.add(`good`);
      letterToWrite.classList.remove(`bad`);
    }
    // manage bad response
    else {
      letterToWrite.classList.add(`bad`);
      letterToWrite.classList.remove(`good`);
      goodAnswer = false;
    }
  });

  // check if sentence is finished
  if (goodAnswer) {
    getSentence();
    point += lettersToWrite.length;
    score.innerText = `Score : ${point}`;
  }
});
