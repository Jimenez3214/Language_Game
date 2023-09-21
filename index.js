import questions from './questions.js';

let app = {
  currentPosition: 0,
  score: 0,

  start: function() {
    this.score = 0;
    this.currentPosition = 0;
    this.updateStats();
    this.showQuestion();
  },

  showQuestion: function() {
    let question = questions[this.currentPosition];
    document.getElementById('title').textContent = question.title;
    let alts = document.querySelectorAll('.alternative');
    alts.forEach(function(element, index) {
      element.textContent = question.alternatives[index];
    });
    document.getElementById('questionNumber').textContent = `Question ${this.currentPosition + 1} of ${questions.length}`;
  },

  handleAnswerClick: function(index) {
    this.checkAnswer(index);
  },

  checkAnswer: function(userSelected) {
    let currQuestion = questions[this.currentPosition];
    let correctAnswer = currQuestion.correctAnswer;
    
    if (correctAnswer == userSelected) {
      console.log('Correct');
      this.score++;
    } else {
      console.log('Wrong');
      let resultDiv = document.getElementById('result');
      resultDiv.textContent = `Wrong! Correct answer: ${currQuestion.alternatives[correctAnswer]}`;
    }

    if (this.currentPosition < questions.length - 1) {
      this.currentPosition++;
      this.showQuestion();
    } else {
      this.endGame();
    }
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

// Event listener for answer clicks
let alts = document.querySelectorAll('.alternative');
alts.forEach((element, index) => {
  element.addEventListener('click', () => {
    app.handleAnswerClick(index);
  });
});

app.start();