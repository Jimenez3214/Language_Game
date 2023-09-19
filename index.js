let question = {
  title: 'gato',
  alternatives: ['dog', 'cat', 'bird', 'fish'],
  correctAnswer: 1
};

let questions = [
  {
    title: 'gato',
    alternatives: ['dog', 'cat', 'bird', 'fish'],
    correctAnswer: 1
  },
  {
    title: 'ave',
    alternatives: ['mouse', 'hamster', 'lizard', 'bird'],
    correctAnswer: 3
  },
  {
    title: 'rata',
    alternatives: ['cat', 'fish', 'rat', 'shark'],
    correctAnswer: 2
  },
  {
    title: 'mosca',
    alternatives: ['fly', 'puma', 'fish', 'dog'],
    correctAnswer: 0
  },
  {
      title: 'pescado',
      alternatives: ['dog', 'hamster', 'fish', 'rat'],
      correctAnswer: 2
    },
    {
      title: 'Oveja',
      alternatives: ['Parrot', 'Dove', 'Goose', 'Sheep'],
      correctAnswer: 3
    }
];

let app = {

  currentPosition: 0,
  
  start: function() {
    this.currPosition = 0;
    this.score = 0; 
  
    let alts = document.querySelectorAll('.alternative');
  
    alts.forEach((element, index) => {
            
      element.addEventListener('click', () => {
  
        this.checkAnswer(index);
      });
    });

    this.updateStats();
    
    this.showQuestion(questions[this.currPosition]);
  },
  
  showQuestion: function(q) {

    let titleDiv = document.getElementById('title');
    titleDiv.textContent = q.title; 

    let alts = document.querySelectorAll('.alternative');
  
    alts.forEach(function(element, index){
      element.textContent = q.alternatives[index];
    });

    let questionNumberDiv = document.getElementById('questionNumber');
    questionNumberDiv.textContent = `Question ${this.currPosition + 1} of ${questions.length}`;
  },
  
  checkAnswer: function(userSelected) {
    
    let currQuestion = questions[this.currPosition];
    
    if(currQuestion.correctAnswer == userSelected) {

      console.log('correct');
      this.score++;
      this.showResult(true);
    }
    else {
 
      console.log('wrong');
      this.showResult(false);
    }

    this.updateStats();

    this.increasePosition();

    if (this.currPosition == questions.length) {
      this.endGame();
    } else {

      this.showQuestion(questions[this.currPosition]);
    }

  },
  
  increasePosition: function() {
    this.currPosition++;
    
    if(this.currPosition == questions.length){
      this.currPosition = 0;
    }
  },
  
  updateStats: function() {
    let scoreDiv = document.getElementById('score');
    scoreDiv.textContent = `Your score: ${this.score}`;
  },
  
  showResult: function(isCorrect) {
 
    let resultDiv = document.getElementById('result');
    let result = '';

    if(isCorrect) {
      result = 'Correct Answer!';
    }
    else {
     
      let currQuestion = questions[this.currPosition];
      
      let correctAnswerIndex = currQuestion.correctAnswer;
      
      let correctAnswerText = currQuestion.alternatives[correctAnswerIndex];
      
      result = `Wrong! Correct answer: ${correctAnswerText}`;
    }
    
    resultDiv.textContent = result;
    
  },

  endGame: function () {
      let resultDiv = document.getElementById('result');
      resultDiv.textContent = `Game Over! Your final score: ${this.score} out of ${questions.length}`;
    
      this.currPosition = 0;
      this.score = 0;
    },
  
};

app.start();