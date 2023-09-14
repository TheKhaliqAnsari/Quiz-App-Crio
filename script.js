let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerListElement = document.getElementById("answer-list");
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next");

function showQuestion(questionIndex) {
  const question = questions[questionIndex];
  questionElement.textContent = question.text;
  answerListElement.innerHTML = "";

  for (let i = 0; i < question.options.length; i++) {
    const option = question.options[i];
    const listItem = document.createElement("li");
    const radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.name = "answer";
    radioButton.value = i;
    listItem.appendChild(radioButton);
    listItem.appendChild(document.createTextNode(option));
    answerListElement.appendChild(listItem);
  }

  submitButton.style.display = "block";
  nextButton.style.display = "none";
}

function checkAnswer() {
  const selectedOption = document.querySelector(
    'input[name="answer"]:checked'
  );

  if (selectedOption) {
    const selectedAnswerIndex = parseInt(selectedOption.value);
    const currentQuestionData = questions[currentQuestion];

    if (selectedAnswerIndex === currentQuestionData.correct) {
      score++;
    }

    answerListElement.children[
      currentQuestionData.correct
    ].style.backgroundColor = "lightgreen";
    submitButton.style.display = "none";
    nextButton.style.display = "block";
  } else {
    alert("Please select an answer!");
  }
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion);
  } else {
    alert(`Quiz ended! Your score: ${score}/${questions.length}`);
  }
}

answerListElement.addEventListener("click", function (event) {
  if (event.target.nodeName === "LI") {
    const radioInput = event.target.querySelector("input[type='radio']");
    if (radioInput) {
      radioInput.checked = true;
    }
  }
});

submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);

showQuestion(currentQuestion);
