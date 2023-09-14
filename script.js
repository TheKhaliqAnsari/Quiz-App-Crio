const questions = [
    {
        text: "Which language is primarily used for web app development?",
        options: ["C#", "Python", "JavaScript", "Swift"],
        correct: 2
    },
    {
        text: "Which of the following is a relational database management system?",
        options: ["Oracle", "Scala", "Perl", "Java"],
        correct: 0
    },
    {
        text: "In which language is memory management provided by JVM?",
        options: ["Java", "C", "C++", "Python"],
        correct: 0
    },
    {
        text: "What does HTML stand for?",
        options: ["Hyperlink and Text Markup Language", "High Technology Modern Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
        correct: 2
    }
];

const quizContainer = document.querySelector(".quiz-container");
const questionElement = document.getElementById("question");
const answerList = document.getElementById("answer-list");
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;

function showQuestion(index) {
    const question = questions[index];
    questionElement.textContent = question.text;
    answerList.innerHTML = '';

    question.options.forEach((option, idx) => {
        const li = document.createElement("li");
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "answer";
        radioInput.id = `option-${idx}`;
        radioInput.value = idx;

        const label = document.createElement("label");
        label.textContent = option;
        label.htmlFor = `option-${idx}`;

        li.appendChild(radioInput);
        li.appendChild(label);

        answerList.appendChild(li);
    });

    submitButton.style.display = "block";
    nextButton.style.display = "none";
}

function checkAnswer(index, selectedOption) {
    const question = questions[index];
    const correctIndex = question.correct;

    if (selectedOption === correctIndex) {
        answerList.querySelector(`#option-${correctIndex} + label`).style.backgroundColor = "lightgreen";
        score++;
    } else {
        answerList.querySelector(`#option-${correctIndex} + label`).style.backgroundColor = "lightgreen";
        answerList.querySelector(`#option-${selectedOption} + label`).style.backgroundColor = "red";
    }

    submitButton.style.display = "none";
    nextButton.style.display = "block";
}

submitButton.addEventListener("click", () => {
    const selectedOption = Array.from(answerList.querySelectorAll("input[type=radio]:checked")).map((radio) => parseInt(radio.value));

    if (selectedOption.length === 0) {
        alert("Please select an answer!");
    } else {
        checkAnswer(currentQuestionIndex, selectedOption[0]);
    }
});

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        alert(`Quiz completed! Your score is ${score} out of ${questions.length}`);
    }
});

showQuestion(currentQuestionIndex);
