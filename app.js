
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What is Mr. Krabs’ full name?',
      answers: [
        'Eugene H. Krabs',
        'Eugene D. Krabs',
        'Karl Krabs',
        'Karlton H. Krabs'
      ],
      correctAnswer: 'Eugene H. Krabs'
    },
    {
      question: 'What does the U in FUN stand for?',
      answers: [
        'Umbrellas and Rainboots',
        'Uranium, bombs, etc',
        'Under the Sea',
        'U and Me'
      ],
      correctAnswer: 'U and Me'
    },
    {
      question: 'How many times has Spongebob failed the boating exam?',
      answers: [
        '1,258,058',
        '45',
        '274',
        '13'
      ],
      correctAnswer: '1,258,058'
    },
    {
      question: 'What was Spongebob’s favorite cousin’s name?',
      answers: [
        'Stanley',
        'Steven',
        'Charlie',
        'James'
      ],
      correctAnswer: 'Stanley'
    },
    {
      question: 'What was Patrick’s pet rock’s name?',
      answers: [
        'Simon',
        'Rocky',
        'Phillip',
        'Squiddy'
      ],
      correctAnswer: 'Rocky'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

let questionNumber = 1
//keeps track of which question to load by index, different use than the store's version of the same variable.


/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function generateQuiz() {
  //generates an HTML template for the quiz start page.
  //includes h2 are you ready, and a start button.
  return `
  <div class='group'>
  <button class='js-start-button'>Start</button>
  </div>`
}

function quizQuestion() {
  //generates a quiz question HTML template based on the STORE, complete with question and answers
  //answer
  
  return `
  <h3>${store.questions[store.questionNumber].question}</h3>
  
  <form id='js-quiz-question' >
  <section class='container'>
  <div class='group'>
    <div class='item'><input type="radio" name="answer" id="answer1"  value="${store.questions[store.questionNumber].answers[0]}" required>
    <label for="answer1">${store.questions[store.questionNumber].answers[0]}</label></div>
  
    <div class='item'><input type="radio" name="answer" id="answer2" value="${store.questions[store.questionNumber].answers[1]}" required>
    <label for="answer2">${store.questions[store.questionNumber].answers[1]}</label></div>

    <div class='item'><input type="radio" name="answer" id="answer3" value="${store.questions[store.questionNumber].answers[2]}" required>
    <label for="answer3">${store.questions[store.questionNumber].answers[2]}</label></div>
    
    <div class='item'><input type="radio" name="answer" id="answer4" value="${store.questions[store.questionNumber].answers[3]}" required>
    <label for="answer4">${store.questions[store.questionNumber].answers[3]}</label></div>     
  </div>
    <div class='group'>
    <button class="submit" type="submit">Submit</button>
    </div>
    </section>
  </form>
  
  
  <footer><small>${questionNumber} of 5 Questions | Score: ${store.score}</small></footer>`
}

function generateQuestionResult(bool) {
  //generates the results
  let result
  if (bool === true) {
    result = "Right!"
  } else {result = "WRONG :("}
  return `
  <div class='group '>
  <div class='item coloredbackground'><h2>You Got It ${result}</h2>
<p class="results ">The answer is:</p>
<p class="results ">${store.questions[store.questionNumber - 1].correctAnswer}</p></div>
</div>
<div class='group'><button class="js-next-question-button">Continue</button></div>
  `
}

function generateQuizResultsPage() {
  //generates an HTML template for the quiz results page.
  let feedback
  if(store.score >= 3) {
    feedback = "Not too shabby!"
  } else {
    feedback = "Do you even SPONGE?? Try again..."
  }
return `
<div class='results'>
<h2>You Finished!</h2>
<p>You scored ${store.score} out of ${store.questions.length}. ${feedback}</p>
</div>
<div class='group'><button class="js-restart-button">Play Again?</button></div>
`
}


/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render(html) {
  //renders the quiz inside of the .container class.
  $('.js-quiz-container').html(html)
  
}
/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleQuizStart() {
//handles the user clicking "start" button

$('main').on('click',  '.js-start-button', function(event){
  event.preventDefault()
  render(quizQuestion())
  store.questionNumber += 1
  store.quizStarted = true
  
})
}

function handleQuestionAnswered() {
  //handles the user clicking "submit" on a question, then either shows the next question or ends the quiz
 
  $('main').on('submit', '#js-quiz-question', function(event){
    event.preventDefault()
    const answers = document.querySelectorAll('input[name="answer"]')
    //the next 8 lines of code (up to 175) assign the value of the user's selected answer to the variable selectedAnswer.
    let selectedAnswer
    //this is a boolean value that determines whether the user go the question wrong or right
    for (const answer of answers) {
      if (answer.checked) {
        selectedAnswer = answer.value
        break
      }
    }
    questionNumber += 1
    
    checkAnswer(selectedAnswer)
    
  })
}

function handleNextQuestionClicked() {
  //responsible for either displaying the next question or the quiz ending screen
  $('main').on('click', '.js-next-question-button', (function(event){
    event.preventDefault()
    if (store.questionNumber === store.questions.length) {
      render(generateQuizResultsPage())
      store.quizStarted = false
      store.score = 0
      store.questionNumber = 0

    } else {
      render(quizQuestion(questionNumber))
      store.questionNumber += 1
    }
    
  }))
}

function handleQuizRestart() {
  //handles the user clicking "restart" button
  console.log('we bout to restart dis quiz!')
  $('main').on('click', '.js-restart-button', function(event){
    event.preventDefault()
    console.log('we done restarted the quiz!')
    
    store.quizStarted = true
    render(generateQuiz())
  })
}

function checkAnswer(answer) {
  //this function checks the user's answer against the store's correct answer, then calls render to display the question results screen.
  let rightOrWrong
  if (answer === store.questions[store.questionNumber - 1].correctAnswer){
   rightOrWrong = true
   store.score += 1
 } else {rightOrWrong = false }
  render(generateQuestionResult(rightOrWrong))
}

function handleQuiz() {
  //handles the damn thang!
  render(generateQuiz())
  handleQuizStart()
  handleQuestionAnswered()
  handleNextQuestionClicked()
  handleQuizRestart()
}

$(handleQuiz)
