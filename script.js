document.addEventListener("DOMContentLoaded", function () {

    const quizForm = document.getElementById("quiz-form");
    const questions = document.querySelectorAll(".quiz-question");

    const nextButton = document.getElementById("quiz-next");
    const backButton = document.getElementById("quiz-back");

    const currentQuestionText = document.getElementById("current-question");
    const progressBar = document.getElementById("quiz-progress-bar");
    const errorMessage = document.getElementById("quiz-error");

    const quizProgress = document.querySelector(".quiz-progress");
    const contactSection = document.getElementById("quiz-contact");
    const contactForm = document.getElementById("quiz-contact-form");
    const resultSection = document.getElementById("quiz-result");

    let currentQuestion = 0;

    function showQuestion(index) {

        questions.forEach(function (question) {
            question.classList.remove("active");
        });

        questions[index].classList.add("active");

        currentQuestionText.textContent = index + 1;
        progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;

        backButton.disabled = index === 0;

        if (index === questions.length - 1) {
            nextButton.textContent = "See My Result";
        } else {
            nextButton.textContent = "Next Question";
        }

        errorMessage.classList.remove("visible");
    }

    function hasSelectedAnswer() {

        const activeQuestion = questions[currentQuestion];

        return activeQuestion.querySelector(
            'input[type="radio"]:checked'
        ) !== null;
    }

    nextButton.addEventListener("click", function () {

        if (!hasSelectedAnswer()) {
            errorMessage.classList.add("visible");
            return;
        }

        if (currentQuestion < questions.length - 1) {

            currentQuestion += 1;
            showQuestion(currentQuestion);

            return;
        }

        quizForm.style.display = "none";
        quizProgress.style.display = "none";
        contactSection.classList.add("active");
    });

    backButton.addEventListener("click", function () {

        if (currentQuestion > 0) {
            currentQuestion -= 1;
            showQuestion(currentQuestion);
        }

    });

    questions.forEach(function (question) {

        const options = question.querySelectorAll(
            'input[type="radio"]'
        );

        options.forEach(function (option) {

            option.addEventListener("change", function () {
                errorMessage.classList.remove("visible");
            });

        });

    });

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const nameInput = document.getElementById("quiz-name");
        const emailInput = document.getElementById("quiz-email");

        if (!nameInput.value.trim() || !emailInput.value.trim()) {
            return;
        }

        contactSection.classList.remove("active");
        resultSection.classList.add("active");

    });

    showQuestion(currentQuestion);

});