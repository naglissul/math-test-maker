document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question: "What is the derivative of \\( f(x) = x^3 \\)?",
      options: ["\\( 3x^2 \\)", "\\( x^2 \\)", "\\( 3x^3 \\)"],
      answer: 0,
    },
    {
      question: "Evaluate \\( \\int x dx \\).",
      options: [
        "\\( \\frac{1}{2}x^2 + C \\)",
        "\\( x + C \\)",
        "\\( x^2 + C \\)",
      ],
      answer: 0,
    },
    {
      question: "What is the solution to \\( x^2 - 4 = 0 \\)?",
      options: ["\\( x = \\pm 2 \\)", "\\( x = 4 \\)", "\\( x = \\pm 4 \\)"],
      answer: 0,
    },
    {
      question: "If \\( f(x) = 2x + 3 \\), find \\( f^{-1}(x) \\).",
      options: [
        "\\( \\frac{x-3}{2} \\)",
        "\\( 2x-3 \\)",
        "\\( \\frac{x+3}{2} \\)",
      ],
      answer: 0,
    },
    {
      question: "What is the area of a circle with radius 3 units?",
      options: [
        "\\( 9\\pi \\) units squared",
        "\\( 6\\pi \\) units squared",
        "\\( 18\\pi \\) units squared",
      ],
      answer: 0,
    },
  ];

  function createQuestionElement(question, index) {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `
            <h3>${question.question}</h3>
            ${question.options
              .map(
                (option, i) => `
                <label>
                    <input type="radio" name="question${index}" value="${i}"> ${option}
                </label>
            `
              )
              .join("")}
            <button class="btn">Check Answer</button>
            <span class="feedback"></span>
        `;

    const btn = div.querySelector(".btn");
    btn.addEventListener("click", function () {
      checkAnswer(index, btn);
    });

    return div;
  }

  function checkAnswer(questionIndex, button) {
    const selected = document.querySelector(
      `input[name="question${questionIndex}"]:checked`
    );
    const feedback = button.nextElementSibling;
    if (selected) {
      const isCorrect = questions[questionIndex].answer == selected.value;
      feedback.textContent = isCorrect ? "Correct!" : "Incorrect!";
      feedback.className = "feedback " + (isCorrect ? "correct" : "incorrect");
    } else {
      feedback.textContent = "Please select an answer.";
      feedback.className = "feedback";
    }
  }

  function updateMathJax() {
    MathJax.typesetPromise()
      .then(() => {
        console.log("MathJax updated!");
      })
      .catch((err) => console.log(err.message));
  }

  const container = document.querySelector(".container");
  questions.forEach((question, index) => {
    container.appendChild(createQuestionElement(question, index));
  });
});
