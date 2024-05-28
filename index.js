document.addEventListener('DOMContentLoaded', () => {
    const checkButton = document.getElementById('check-answer');
    let selectedOption = null;
    let currentQuestion = 0;
  
    const questions = [
      {
        question: 'What is my color?',
        answers: {
          a: 'Blue',
          b: 'Red',
          c: 'Orange',
          d: 'Yellow'
        },
        correct: 'c'
      },
      {
        question: 'What am I wearing?',
        answers: {
          a: 'Green',
          b: 'Red',
          c: 'Black'
        },
        correct: 'a'
      }
    ];
  
    function loadQuestion(questionIndex) {
      const questionData = questions[questionIndex];
      document.getElementById('question').textContent = questionData.question;
      const optionsContainer = document.querySelector('.options');
      optionsContainer.innerHTML = '';
  
      for (const [key, value] of Object.entries(questionData.answers)) {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.dataset.answer = key;
        optionDiv.textContent = `${key}. ${value}`;
        optionsContainer.appendChild(optionDiv);
      }
  
      selectedOption = null;
  
      const newOptions = document.querySelectorAll('.option');
      newOptions.forEach(option => {
        option.addEventListener('click', () => {
          newOptions.forEach(opt => opt.classList.remove('selected', 'correct', 'incorrect'));
          option.classList.add('selected');
          selectedOption = option;
        });
      });
    }
  
    loadQuestion(currentQuestion);
  
    checkButton.addEventListener('click', () => {
      if (checkButton.textContent === 'Check') {
        if (!selectedOption) return;
  
        const correctAnswer = questions[currentQuestion].correct;
        if (selectedOption.getAttribute('data-answer') === correctAnswer) {
          selectedOption.classList.remove('selected');
          selectedOption.classList.add('correct');
        } else {
          selectedOption.classList.remove('selected');
          selectedOption.classList.add('incorrect');
        }
  
        checkButton.textContent = 'Continue';
      } else if (checkButton.textContent === 'Continue') {
        currentQuestion++;
        if (currentQuestion < questions.length) {
          loadQuestion(currentQuestion);
          checkButton.textContent = 'Check';
        } else {
          alert('No more questions!');
          checkButton.disabled = true;
        }
      }
    });
  });