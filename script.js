const continue_btn = document.getElementById('continue');
const info_box = document.getElementById('info-box');
const quit_btn = document.getElementById('quit-btn1');
const quiz_box = document.getElementById('quiz-box');
const option_list = document.querySelector('.option-list');
const option = option_list.getElementsByClassName('option');


quit_btn.addEventListener("click", ()=> {
    close();
});

continue_btn.addEventListener("click", () => {
    info_box.classList.add('inactive');
    quiz_box.classList.add('activeQuiz');
    showQuestions(0);
    quesCounter(1);
});

let ques_count = 0;
const next_btn = document.getElementById('next-btn');

next_btn.addEventListener("click", ()=> {
    if (ques_count < questions.length - 1) {
        ques_count++;
        showQuestions(ques_count);
        quesCounter(ques_count + 1);
    }
    else {
        console.log("Question Completed");
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
    let userAns = answer.textContent;
    let correctAns = questions[ques_count].answer;
    let allOptions = option_list.children.length;

    if (userAns == correctAns) {
        console.log("Correct Answer");
        answer.classList.add('correct');
    }

    else {
        console.log("Incorrect Answer");
        answer.classList.add('wrong');
        for (let k = 0; k < allOptions; k++) {
            if(option_list.children[k].textContent == correctAns){
                option[k].setAttribute("class", "option correct");
            }
        }
    }

    for(let j = 0; j < allOptions; j++){
        option_list.children[j].classList.add("disabled");
    }
}