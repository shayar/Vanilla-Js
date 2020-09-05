const quizData = [
    {
        question: 'Which is the tallest mountain in the world?',
        a: 'K2',
        b: 'Everest',
        c: 'Annapurna',
        d: 'Nilgiri',
        correct: 'b'
    }, {
        question: 'Which is the best programming language in 2020?',
        a: 'Java',
        b: 'C',
        c: 'Python',
        d: 'Javascript',
        correct: 'd'
    }, {
        question: 'Who is the president of Us?',
        a: 'Eminem',
        b: 'Donald Trump',
        c: 'Chester Bennington',
        d: 'KP Oli',
        correct: 'b'
    }, {
        question: 'What does HTML stand for?',
        a: 'Hypertext Markup Language',
        b: 'Cascading Style Sheet',
        c: 'Javascript Object Notation',
        d: 'High Time Minute Learner',
        correct: 'a'
    }, {
        question: 'In which year is Javascript launched?',
        a: '1996',
        b: '1995',
        c: '1994',
        d: 'none of the above',
        correct: 'b'
    }
]
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const answerELs= document.querySelectorAll('.answer');
const quiz = document.getElementById('quiz');
let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerHTML = currentQuizData.question;
    a_text.innerText = currentQuizData.a; 
    b_text.innerText = currentQuizData.b; 
    c_text.innerText = currentQuizData.c; 
    d_text.innerText = currentQuizData.d; 
}

function getSelected() {
    let answer = undefined;
    answerELs.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function deselectAnswers() {
    answerELs.forEach(answerEl => {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct)
        {
            score++;
        }
        currentQuiz++;
        if(currentQuiz < quizData.length) {
            loadQuiz();
        } else {
           quiz.innerHTML = `<h2>You answered correctly at ${score} / ${quizData.length} questions.</h2>
           <button onclick=location.reload()>Reload</button>`;
        }
    }
});