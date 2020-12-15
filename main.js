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

  //update score
  // score.innerText = `Score : ${point}`;

  // end game
  if (timeCurrent === 0) {
    clearInterval(timer);
  }
}

// show score
let point = 0;
score.innerText = `Score : ${point}`;

// search sentence
async function getSentence() {
  const call = await fetch(api);
  const result = await call.json();
  const sentence = result.content;
  timer = setInterval(changeTime, 1000);
  showSentence(sentence);
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
