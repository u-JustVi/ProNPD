// Quiz questions and answers
const quizQuestions = [
  {
    question: "Какой у вас возраст?",
    options: ["18-25 лет", "26-30 лет", "31-35 лет", "35+ лет"]
  },
  {
    question: "Чем вы занимаетесь?",
    options: ["Дизайн и творчество", "Копирайтинг и тексты", "Фриланс и услуги", "Другое"]
  },
  {
    question: "Сколько вы тратите на покупки в месяц?",
    options: ["До 10 000 ₽", "10 000 - 30 000 ₽", "30 000 - 50 000 ₽", "Более 50 000 ₽"]
  },
  {
    question: "Что для вас важнее всего при выборе банковской карты?",
    options: ["Кэшбэк и бонусы", "Безопасность", "Простота использования", "Низкие комиссии"]
  },
  {
    question: "Готовы ли вы зарегистрироваться как ИП для получения 10% кэшбэка?",
    options: ["Да, готов(а)", "Нужно подумать", "Уже есть ИП", "Не уверен(а)"]
  }
];

// Quiz state
let currentQuestion = 0;
let answers = [];

// DOM elements
const quizModal = document.getElementById('quizModal');
const quizBody = document.getElementById('quizBody');
const quizProgress = document.getElementById('quizProgress');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const quizTitle = document.getElementById('quizTitle');

// Open quiz modal
function openQuiz() {
  quizModal.hidden = false;
  document.body.style.overflow = 'hidden';
  currentQuestion = 0;
  answers = [];
  showQuestion();
}

// Close quiz modal
function closeQuiz() {
  quizModal.hidden = true;
  document.body.style.overflow = '';
  currentQuestion = 0;
  answers = [];
}

// Show current question
function showQuestion() {
  const question = quizQuestions[currentQuestion];
  
  // Update progress
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  quizProgress.style.width = progress + '%';
  
  // Update title
  quizTitle.textContent = `Вопрос ${currentQuestion + 1} из ${quizQuestions.length}`;
  
  // Build question HTML
  let html = `
    <div class="quiz-question">
      <h4>${question.question}</h4>
      <div class="quiz-options">
  `;
  
  question.options.forEach((option, index) => {
    const isSelected = answers[currentQuestion] === index;
    html += `
      <div class="quiz-option ${isSelected ? 'selected' : ''}" 
           data-index="${index}" 
           tabindex="0" 
           role="button" 
           aria-pressed="${isSelected}">
        ${option}
      </div>
    `;
  });
  
  html += '</div></div>';
  quizBody.innerHTML = html;
  
  // Update buttons
  btnPrev.disabled = currentQuestion === 0;
  btnNext.textContent = currentQuestion === quizQuestions.length - 1 ? 'Завершить' : 'Далее';
  
  // Add event listeners to options
  const options = quizBody.querySelectorAll('.quiz-option');
  options.forEach(option => {
    option.addEventListener('click', selectOption);
    option.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectOption.call(option);
      }
    });
  });
}

// Select an option
function selectOption() {
  const index = parseInt(this.dataset.index);
  answers[currentQuestion] = index;
  
  // Update visual state
  const options = quizBody.querySelectorAll('.quiz-option');
  options.forEach(option => {
    option.classList.remove('selected');
    option.setAttribute('aria-pressed', 'false');
  });
  this.classList.add('selected');
  this.setAttribute('aria-pressed', 'true');
  
  // Enable next button
  btnNext.disabled = false;
}

// Navigate to previous question
function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

// Navigate to next question or finish quiz
function nextQuestion() {
  if (answers[currentQuestion] === undefined) {
    return; // No option selected
  }
  
  if (currentQuestion < quizQuestions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    // Quiz completed
    showResults();
  }
}

// Show quiz results
function showResults() {
  const totalQuestions = quizQuestions.length;
  const answeredQuestions = answers.filter(answer => answer !== undefined).length;
  
  let html = `
    <div class="quiz-question">
      <h4>Отлично! Вы ответили на ${answeredQuestions} из ${totalQuestions} вопросов</h4>
      <p>На основе ваших ответов рекомендуем открыть ИП на НПД в Альфа-банке:</p>
      <ul style="margin: 1rem 0; padding-left: 1.5rem;">
        <li>10% кэшбэк на все покупки по бизнес-карте</li>
        <li>Бонус 3-5К ₽ по программе лояльности</li>
        <li>Уникальные предложения ИП на НПД</li>
        <li>Полностью онлайн регистрация</li>
      </ul>
      <p style="font-weight: 600; color: #2563eb; margin-top: 1rem;">
        Готовы открыть счёт и получить бонусы?
      </p>
    </div>
  `;
  
  quizBody.innerHTML = html;
  btnNext.textContent = 'Открыть счёт';
  btnNext.onclick = () => {
    closeQuiz();
    window.open('https://t.fincpanetwork.ru/click/89957/337/?erid=2W5zFJerRPE&sub1=test', '_blank');
  };
  btnPrev.style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Quiz modal open buttons
  const quizButtons = document.querySelectorAll('.js-open-quiz');
  quizButtons.forEach(button => {
    button.addEventListener('click', openQuiz);
  });
  
  // Quiz modal close buttons
  const closeButtons = document.querySelectorAll('.js-close-quiz');
  closeButtons.forEach(button => {
    button.addEventListener('click', closeQuiz);
  });
  
  // Quiz navigation
  btnPrev.addEventListener('click', prevQuestion);
  btnNext.addEventListener('click', nextQuestion);
  
  // Close modal on backdrop click
  const backdrop = document.querySelector('.modal-backdrop');
  backdrop.addEventListener('click', closeQuiz);
  
  // Close modal on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !quizModal.hidden) {
      closeQuiz();
    }
  });
  
  // Initialize quiz
  showQuestion();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Track quiz completion for analytics (if needed)
function trackQuizCompletion() {
  // This function can be used to track quiz completion
  // Implementation depends on your analytics setup
  console.log('Quiz completed with answers:', answers);
}

// Add loading states to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function() {
    if (this.classList.contains('btn-primary') || this.classList.contains('btn-dark')) {
      this.style.opacity = '0.8';
      setTimeout(() => {
        this.style.opacity = '';
      }, 200);
    }
  });
});

// Intersection Observer for animations (optional)
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe cards and steps for subtle animations
  document.querySelectorAll('.card, .steps-list li').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}
