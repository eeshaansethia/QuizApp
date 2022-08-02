const continue_btn = document.getElementById('continue');
const info_box = document.getElementById('info-box');
const quit_btn = document.getElementById('quit-btn1');
const quiz_box = document.getElementById('quiz-box');
const option_list = document.querySelector('.option-list');
const option = option_list.getElementsByClassName('option');
const timeCount = quiz_box.querySelector('.timer .timer-sec');
const next_btn = document.getElementById('next-btn');
const result_box = document.getElementById('result-box');
const quit_btn2 = document.getElementById('quit-btn2');

let ques_count = 0;
let counter;
let userScore = 0;

quit_btn.addEventListener("click", () => {
    close();
});

quit_btn2.addEventListener("click", () => {
    window.location.reload();
});

continue_btn.addEventListener("click", () => {
    info_box.classList.add('inactive');
    quiz_box.classList.add('activeQuiz');
    showQuestions(0);
    quesCounter(1);
    startTimer(14);
});


next_btn.addEventListener("click", () => {
    if (ques_count < questions.length - 1) {
        ques_count++;
        showQuestions(ques_count);
        quesCounter(ques_count + 1);
        clearInterval(counter);
        startTimer(15);
        next_btn.style.display = "none";
    }
    else {
        console.log("Question Completed");
        showResultBox();
    }
});

function showQuestions(index) {
    const ques_text = document.getElementById('ques-text');

    let ques_tag = '<span>' + questions[index].numb + '. ' + questions[index].question + '</span>';
    ques_text.innerHTML = ques_tag;

    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[1] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[2] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[3] + '</span></div>';

    option_list.innerHTML = option_tag;


    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function quesCounter(index) {
    const ques_counter = document.querySelector('.total-ques');
    let totalQuestionsTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p>Questions</span>';
    ques_counter.innerHTML = totalQuestionsTag;
}

function optionSelected(answer) {
    clearInterval(counter);
    let userAns = answer.textContent;
    let correctAns = questions[ques_count].answer;
    let allOptions = option_list.children.length;

    if (userAns == correctAns) {
        console.log("Correct Answer");
        answer.classList.add('correct');
        userScore++;
    }

    else {
        console.log("Incorrect Answer");
        answer.classList.add('wrong');
        for (let k = 0; k < allOptions; k++) {
            if (option_list.children[k].textContent == correctAns) {
                option[k].setAttribute("class", "option correct");
            }
        }
    }

    for (let j = 0; j < allOptions; j++) {
        option_list.children[j].classList.add("disabled");
    }

    next_btn.style.display = "block";
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {

        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            for (let j = 0; j < 4; j++) {
                option_list.children[j].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }
}

function showResultBox() {
    quiz_box.classList.remove('activeQuiz');
    result_box.classList.add('activeResult');
    const scoreText = result_box.querySelector('.score-text');
    let scoreTag = '<span>Your score is <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>'
    scoreText.innerHTML = scoreTag;
}