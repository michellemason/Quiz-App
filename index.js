// when the start button is clicked
function startQuiz() {
    $('#start').on('click', function(event){
        renderQuestion();  
    }
    );
}

// displays quesstion number and score so far
function updateQuestionAndScore() {
    const html = $(`<ul>
        <li id="js-answered">Question Number: ${STORE.currentQuestion + 1}/${STORE.questions.length}</li>
        <li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li>
      </ul>`);
    $(".question-and-score").html(html);
  }

// displays the current options for the current question
function currentOptions() {
    let question = STORE.questions[STORE.currentQuestion];
    for (let i = 0; i < question.options.length; i++) {
        $('.js-options').append(`
        <input type="radio" name="options" id="options${i+1}"
        value= "${question.options[i]}" tabindex="${i+1}">
        <label for="options${i+1}"> ${question.options[i]}
        </label>
         <br/>
        <span id="js-r${i+1}"></span>
    `);
    }
}

// displays the current question
function renderQuestion() {
    let question = STORE.questions[STORE.currentQuestion];
    updateQuestionAndScore();
    const questionForm = $(`
    <div>
        <form id="js-questions" class="question-form">
        <fieldset>
            <div class="container question">
                <div class="box">
                    <legend>${question.question}</lengend>
                </div>
            </div>

            <div class="container options">
                <div class="box">
                    <div class="js-options"> </div>
                </div>
            </div>

            <div class="container">
                <div class="box">
                    <button type = "submit" id="answer" tabindex="5">Submit</button>
                    <button type = "button" id="next-question" tabindex="6">Next</button>
                </div>
            </div>
        </fieldset>
        </form>
    </div>`);
$("main").html(questionForm);
currentOptions();
$("#next-question").hide();
}

// displays results and start over button
function displayResults() {
    let resultsForm = $(`
    <div class="results">
    <form id="js-restart">
        <fieldset>
            <div class="container">
                <div class="box">
                    <legend>Current Score: ${STORE.score}/${STORE.questions.length}</legend>
                </div>
            </div>

            <div class="container">
                <div class="box>
                    <button type="button" id="restart">Restart Quiz</button>
                </div>
            </div>
        </fieldset>
    </form>
    </div>`);
    STORE.currentQuestion = 0;
    STORE.score = 0;
$("main").html(resultsForm);
}

// checks if at end of questions
function handleQuestions() {
    $('body').on('click', '#next-question', (event) => {
        STORE.currentQuestion === STORE.questions.length?displayResults() : renderQuestion();
    });
}

// checks if answer is right or wrong and displays corresponding message
function handleSelected() {
    $('body').on("submit", '#js-questions', function(event) {
        event.preventDefault();
        let currentQ = STORE.questions[STORE.currentQuestion];
        let selected = $("input[name=options]:checked").val();
        if (!selected) {
            alert("Choose a city");
            return;
        }
        let id_num = currentQ.options.findIndex(i => i === selected);
        let id = "#js-r" + ++id_num;
        $('span').removeClass("right-answer wrong-answer");
        if (selected === currentQ.answer) {
            STORE.score++;
            $(`${id}`).append(`Bravo! You're making Yankee Doodle proud!<br/>`);
            $(`${id}`).addClass("right-answer");
        } else {
            $(`${id}`).append(`You got it wrong. Are you a tourist? <br/> The correct answer is 
            ${currentQ.answer}<br/>`);
            $(`${id}`).addClass("wrong-answer");
        }

        STORE.currentQuestion++;
        $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
        $('#answer').hide();
        $("input[type=radio]").attr('disabled', true);
        $('#next-question').show();
    });
}

function restartQuiz() {
    $('body').on('click', '#restart', (event) => {
        renderQuestion();
    });
}

function handleQuiz() {
    startQuiz();
    handleQuestions();
    handleSelected();
    restartQuiz();
    //updateQuestionAndScore();
    currentOptions();

}

$(handleQuiz);