const questions = [
    { question: "평소보다 숨쉬기가 더 힘들어짐", id: "q1", oScore: 1 },
    { question: "앉아 있거나 누워 있을 때도 숨이 참", id: "q2", oScore: 3 },
    { question: "2~3일 내에 체중이 2Kg이상 증가함", id: "q3", oScore: 2 },
    { question: "일주일내에 체중이 2Kg 증가함", id: "q4", oScore: 1 },
    { question: "발, 발목, 다리, 복부의 부종이 증가함", id: "q5", oScore: 1 },
    { question: "일상생활중 비정상적인 피로나 약함을 느낌", id: "q6", oScore: 1 },
    { question: "기침이 계속됨", id: "q7", oScore: 1 },
    { question: "어지러움", id: "q8", oScore: 1 },
    { question: "가슴 두근거림", id: "q9", oScore: 1 },
    { question: "가슴 통증", id: "q10", oScore: 3 },
];

const additionalQuestions = [
    { question: "7g/일이하 소금 섭취하셨나요?", id: "aq1", oScore: 0 },
    { question: "물 종류 1.5~2L/일이하로 드셨나요?", id: "aq2", oScore: 0 },
    { question: "오늘 약을 복용하셨나요?", id: "aq3", oScore: 0 },
];

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submitButton");
const resultElement = document.getElementById("result");
let additionalQuestionsDisplayed = false;

questions.forEach(question => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionTextDiv = document.createElement("div");
    questionTextDiv.classList.add("question-text");
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionTextDiv.appendChild(questionText);
    questionDiv.appendChild(questionTextDiv);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    const oButton = document.createElement("button");
    oButton.textContent = "O";
    oButton.value = "O";
    oButton.name = question.id;
    oButton.addEventListener("click", () => handleButtonClick(question.id, "O"));
    buttonsDiv.appendChild(oButton);

    const xButton = document.createElement("button");
    xButton.textContent = "X";
    xButton.value = "X";
    xButton.name = question.id;
    xButton.addEventListener("click", () => handleButtonClick(question.id, "X"));
    buttonsDiv.appendChild(xButton);

    questionDiv.appendChild(buttonsDiv);
    questionsElement.appendChild(questionDiv);
});

function handleButtonClick(questionId, selectedValue) {
    const allButtons = document.querySelectorAll(`.question button[name="${questionId}"]`);
    allButtons.forEach(button => {
        button.classList.remove("selected");
        button.classList.remove("o-button"); // O 버튼 클래스 제거
        button.classList.remove("x-button"); // X 버튼 클래스 제거
    });

    const currentButton = document.querySelector(`.question button[name="${questionId}"][value="${selectedValue}"]`);
    currentButton.classList.add("selected");
    currentButton.classList.add(selectedValue === "O" ? "o-button" : "x-button"); // 선택된 값에 따라 O/X 클래스 추가
}
submitButton.addEventListener("click", () => {
    let totalScore = 0;
    const answers = {};
    let allAnswered = true; 
    const imageContainer = document.getElementById("imageContainer");
    const resultImage = document.getElementById("resultImage");

    questions.forEach(question => {
        const selectedButton = document.querySelector(`.question button[name="${question.id}"].selected`);
        answers[question.id] = selectedButton ? selectedButton.value : null;
        if (selectedButton && selectedButton.value === "O") {
            totalScore += question.oScore;
        }
        if (!selectedButton) { // 선택된 버튼이 없으면
            allAnswered = false; // 모든 질문에 답변하지 않은 것으로 판단
        }
    });

    if (!allAnswered) {
        alert("모든 질문에 답변해주세요.");
        return; 
    }

    if (totalScore < 5) { // 초록불
        if (additionalQuestionsDisplayed == false) {
            additionalQuestionsDisplayed = true;
            displayAdditionalQuestions();
        }
        resultImage.src = "img/green.jpg";
        imageContainer.style.display = "block";
        resultElement.textContent = '정상';
    }
    else if (totalScore < 10) {// 노란불
        if (additionalQuestionsDisplayed == false){
            additionalQuestionsDisplayed = true;
            displayAdditionalQuestions();
        }
        resultImage.src = "img/yellow.jpg";
        imageContainer.style.display = "block";
        resultElement.textContent = '주의';
    }
    else if (totalScore >= 10 ) { // 빨간불
        if (additionalQuestionsDisplayed == true) {
            additionalQuestionsDisplayed = false;
            clearAdditionalQuestions();
        }
        resultImage.src = "img/red.jpg";
        imageContainer.style.display = "block";
        resultElement.textContent = '위험';
    }
});

function displayAdditionalQuestions() {
    const additionalQuestionsElement = document.getElementById("additionalQuestions");
    additionalQuestionsElement.style.display = "block";

    additionalQuestions.forEach(question => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionTextDiv = document.createElement("div");
        questionTextDiv.classList.add("question-text");
        const questionText = document.createElement("p");
        questionText.textContent = question.question;
        questionTextDiv.appendChild(questionText);
        questionDiv.appendChild(questionTextDiv);

        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("buttons");

        const oButton = document.createElement("button");
        oButton.textContent = "O";
        oButton.value = "O";
        oButton.name = question.id;
        oButton.addEventListener("click", () => handleButtonClick(question.id, "O"));
        buttonsDiv.appendChild(oButton);

        const xButton = document.createElement("button");
        xButton.textContent = "X";
        xButton.value = "X";
        xButton.name = question.id;
        xButton.addEventListener("click", () => handleButtonClick(question.id, "X"));
        buttonsDiv.appendChild(xButton);

        questionDiv.appendChild(buttonsDiv);
        additionalQuestionsElement.appendChild(questionDiv);
    });
}

function clearAdditionalQuestions() {
    const additionalQuestionsElement = document.getElementById("additionalQuestions");
    additionalQuestionsElement.style.display = "none";
    additionalQuestionsElement.innerHTML = "";
}