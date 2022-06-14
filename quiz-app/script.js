const quizData = [
    {
        question:'Largest Mammal?',
        a:'Elephant',
        b:'Blue Whale',
        c:'Giraffe',
        d:'Hippopotamus',
        answer:'b'
    },
    {
        question:'Hero in Top Gun?',
        a:'Tom Hanks',
        b:'Tom Brady',
        c:'Tom Holland',
        d:'Tom Cruize',
        answer: 'd'
    },
    {
        question:'Number of continents?',
        a:25,
        b:10,
        c:7,
        d:45,
        answer: 'c'
    },
    {
        question:'Which of this is not vegetable?',
        a:'tomato',
        b:'potato',
        c:'sweet potato',
        d:'carrot',
        answer: 'a'
    },
]
let currentQuestion = 0;
let score = 0;
const quiz = document.getElementById('quiz');
const question = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const answerElements = document.querySelectorAll('.answer');    
const submitButton =  document.getElementById('submit');
loadQuiz();
function loadQuiz(){    
    question.innerHTML = quizData[currentQuestion]['question'];
    a_text.innerHTML = quizData[currentQuestion]['a'];
    b_text.innerHTML = quizData[currentQuestion]['b'];
    c_text.innerHTML = quizData[currentQuestion]['c'];
    d_text.innerHTML = quizData[currentQuestion]['d'];
        
}
function deSelect(){
    answerElements.forEach((answerEl)=>{
        answerEl.checked = false;
    });
    
}

function getSelected(){
    let answer = undefined;
    answerElements.forEach((answerEl)=>{    
        if (answerEl.checked){
            answer =  answerEl.id;
        }
    });
    return answer;
}
submitButton.addEventListener('click', ()=>{
    const answerSelected = getSelected();
    const correctAnswer = quizData[currentQuestion]['answer'];
      
    if (answerSelected){
        
        if (answerSelected == correctAnswer){
            score++;
        } 
        currentQuestion++;   
        if (currentQuestion < quizData.length){
            deSelect();        
            loadQuiz();                 
        }
        else{
            quiz.innerHTML = `<h2>Your score is ${score}</h2>
            <button onclick="location.reload()">Reload Quiz</button>`;
        } 
    }else{
        alert("You need to select an option");
    }});