// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer.
const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Madrid", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Scripts", correct: false },
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style Syntax", correct: false },
    ],
  },
  {
    question: "In which part of Africa is Zimbabwe?",
    answers: [
      { text: "West Africa", correct: false },
      { text: "East Africa", correct: false },
      { text: "Central Africa", correct: false },
      { text: "Southern Africa", correct: true },
    ],
  },
];

// 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html?
// They're specified in the opening tag eg <div id="question">
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const hintButton = document.getElementById("hint-btn");

let currentQuestionIndex = 0;
let score = 0;
let hintsRemaining = 2;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
    // Because the question presented to the user changes each time they respond and whether the answer is correct or not also differs based on their response. JavaScript allow us to have this responsiveness that HTML doesn't offer
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    // 4. What is the line below doing?
    // It's adding an extra element (button) to the answerButtonsElement. This button shows an answer option to the current question displayed
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  hintButton.style.display = "block";
  answerButtonsElement.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    hintButton.disabled = true;
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  if (hintsRemaining === 0) {
    Array.from(answerButtonsElement.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
  }


  // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
  // This makes the Next button visible after a user selects a response. It gives the button a width and height
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
  nextButton.textContent = "Restart";
  nextButton.style.display = "block";  
  hintButton.style.display = "none";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();

  }

  hintButton.disabled = false;
  hintsRemaining = 2;
  hintButton.textContent = `Hint x${hintsRemaining}`
}

function handleHint() {
  hintsRemaining--;
  let hintIndex = Math.floor(Math.random() * 4);
  let optionsButtonsList = Array.from(answerButtonsElement.children);

  while (optionsButtonsList[hintIndex].dataset.correct === "true" ||  optionsButtonsList[hintIndex].classList.contains("wrong")) {
    hintIndex = Math.floor(Math.random() * 4);
  }

  optionsButtonsList[hintIndex].classList.add("wrong");
  hintButton.textContent = `Hint x${hintsRemaining}` 
  
  if (hintsRemaining <= 0) {
      hintButton.disabled = true
  }
}

// 6. Summarize in your own words what you think this block of code is doing.
// After the person clicks the Next button, it this code block calls a function that shows the next question if the person is not done answering all the questions or the score if they've just finished the last question. If the person is done answering all questions, this code allows the score to be reset and the quiz to start again
nextButton.addEventListener("click", () => {

  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

hintButton.addEventListener("click", () => {
  handleHint()
});

startQuiz();
