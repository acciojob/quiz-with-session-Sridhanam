const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];
let userAnswers = [];
function loadAnswerFromSessionStorage(){
  const savedAnswer = sessionStorage.getItem('userAnswers');
  if(savedAnswer){
    userAnswers = JSON.parse(savedAnswer);
  }
}

function savedAnswersToSessionStorage(){
  sessionStorage.setItem('userAnswers',JSON.stringify(userAnswers));
}
// Display the quiz questions and choices
function renderQuestions() {
    const questionsElement = document.getElementById('questions');
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(document.createElement("br"));
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);

      choiceElement.addEventListener('change',function(){
        userAnswers[i] = choice;
        savedAnswersToSessionStorage();
      })
    }

    questionsElement.appendChild(questionElement);
    questionElement.appendChild(document.createElement("br"));
    questionElement.appendChild(document.createElement("br"));

  }
}
loadAnswerFromSessionStorage();
renderQuestions();
const btn = document.getElementById('submit');
btn.addEventListener('click',function(){
  const res = document.getElementById('score');
  let count=0;
  for(let i=0;i<questions.length;i++){
    if(questions[i].answer == userAnswers[i]){
      count++;
    }
  }
  localStorage.setItem("score",count);
  res.textContent = `Your score is ${count} out of 5.`;
})