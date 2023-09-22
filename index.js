import questions from './questions.js';

let app = {
  currentPosition: 0,
  score: 0,
  answerSelected: false,

  start: function() {
    this.score = 0;
    this.currentPosition = 0;
    this.shuffleQuestions();
    this.updateStats();
    this.showQuestion();

  },

  shuffleQuestions: function() {
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
  },

  showQuestion: function() {
    let question = questions[this.currentPosition];
    document.getElementById('title').textContent = question.title;
    let resultDiv = document.getElementById('result');
    resultDiv.textContent = ''; 
    this.answerSelected = false;
    let alts = document.querySelectorAll('.alternative');
    alts.forEach(function(element, index) {
      element.textContent = question.alternatives[index];
      element.disabled = false;
      
    });
    document.getElementById('questionNumber').textContent = `Question ${this.currentPosition + 1} of ${questions.length}`;
    this.answerSelected = false;
  },

  nextQuestion: function() {
    if (this.currentPosition < questions.length - 1) {
      this.currentPosition++;
      this.showQuestion();
      this.answerSelected = false; 
      document.getElementById('nextButton').disabled = true;
    } else {
      this.endGame();
    }
    this.updateStats();
  },
  


  handleAnswerClick: function(index) {
    if (!this.answerSelected) {
      this.answerSelected = true;
      this.checkAnswer(index);
      let alts = document.querySelectorAll('.alternative');
      alts.forEach((element) => {
        element.disabled = true; 
      });
    }
  },

  checkAnswer: function(userSelected) {
    let currQuestion = questions[this.currentPosition];
    let correctAnswer = currQuestion.correctAnswer;
  
    if (correctAnswer == userSelected) {
      console.log('Correct');
      let resultDiv = document.getElementById('result');
      resultDiv.textContent = 'Correct! ';
      this.score++;
    } else {
      console.log('Wrong');
      let resultDiv = document.getElementById('result');
      resultDiv.textContent = `Wrong! Correct answer: ${currQuestion.alternatives[correctAnswer]}`;
    }
  
    document.getElementById('nextButton').disabled = false;
  
    this.updateStats();
  },
  

  updateStats: function() {
    let scoreDiv = document.getElementById('score');
    scoreDiv.textContent = `Your score: ${this.score}`;
  },

  endGame: function() {
    let modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `Game Over! Your final score: ${this.score} out of ${questions.length}`;
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'block';

    let modalRestart = document.getElementById('modal-restart');
    modalRestart.textContent = 'Restart';
    modalRestart.addEventListener('click', () => {
      overlay.style.display = 'none';
      this.start();
    });
  }
};

let alts = document.querySelectorAll('.alternative');
alts.forEach((element, index) => {
  element.addEventListener('click', () => {
    app.handleAnswerClick(index);
  });
});

let nextButton = document.getElementById('nextButton');
nextButton.addEventListener('click', () => {
  app.nextQuestion();
});


app.start();