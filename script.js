let questions = [
    {
        question: "С какого до какого длилась ВОВ?",
        type: "options",
        options: ["1936-1944", "1942-1947", "1901-1932", "1941-1945"],
        correctAnswer: "1941-1945"
    },
    {
        question: "Как назывался план вторжения в СССР?",
        type: "input",
        correctAnswer: "Барбаросса"
    },
    {
        question: "Сколько дней длилась блокада Ленинграда?",
        type: "options",
        options: ["683", "872", "978", "459"],
        correctAnswer: "872"
    },
    {
        question: "Какого дня празднуют День Победы во Франции?",
        type: "options",
        options: ["9 мая", "30 апреля", "8 мая", "29 апреля"],
        correctAnswer: "8 мая"
    },
    {
        question: "В каком городе происходил суд над бывшими руководителями Германией",
        type: "input",
        correctAnswer: "Нюренбург"
    },
    {
        question: "Какие войска участвовали в высадке в Нормандии?",
        type: "options",
        options: ["Итальянские", "Бразильские", "Канадские", "Данские"],
        correctAnswer: "Канадские"
    },
    {
        question: "Где был зажжён первый вечный огонь?",
        type: "options",
        options: ["Марсовское поле", "На Кладбище", "У кремлёвской стены", "Малаховый Курган"],
        correctAnswer: "Марсовское поле"
    },
    {
        question: "Как называлось крупнейшее танковое сражение?",
        type: "input",
        correctAnswer: "Битва на курской дуге"
    },

]

let st = 0
let curQuestion = 0
let corAnswers = 0

let readyBtn = document.getElementById('ready')
let inputName = document.getElementById('inputName')
let username = 'N/A'

function displayQuestion() {
    let questionEl = document.getElementById('question')
    let inputParent = document.querySelector('.inputDiv')
    let inputText = document.getElementById('inputText')
    let submit = document.getElementById('submit')
    questionEl.textContent = `Вопрос ${curQuestion + 1}: ${questions[curQuestion].question}`
    let optionsEl = document.getElementById('options')
    optionsEl.innerHTML = ""
    inputText.value = ""
    inputParent.style.display = "none"
    let optionsArray = questions[curQuestion].options

    if (questions[curQuestion].type == "options") {
        optionsArray.forEach((option) => {
            let button = document.createElement('button')
            optionsEl.append(button)
            button.classList.add("option")
            button.textContent = option
        })
        optionsEl.addEventListener('click', (e) => {
            let target = e.target
            nextQuestion(target.textContent.toLowerCase())
        }, { once: true })
    } else {
        inputParent.style.display = "block"
        submit.addEventListener('click', (e) => {
            nextQuestion(inputText.value.toLowerCase())
        }, { once: true })
    }
}

function nextQuestion(answer) {
    if (answer === questions[curQuestion].correctAnswer.toLowerCase()) {
        corAnswers++
    }
    curQuestion++
    if (curQuestion == questions.length) {
        displayResult()
    } else {
        displayQuestion()
    }
}



function displayResult() {
    let questionEl = document.getElementById('question')
    let optionsEl = document.getElementById('options')
    let inputParent = document.querySelector('.inputDiv')
    let resultEl = document.getElementById('result')
    questionEl.style.display = 'none'
    optionsEl.style.display = 'none'
    inputParent.style.display = "none"
    let grade = 2
    let calc = (corAnswers / questions.length) * 100
    calc = (calc + 0.5) - (calc + 0.5) % 1
    if (calc > 30 && calc < 50) {
        grade = 3
    } else if (calc > 50 && calc < 80) {
        grade = 4
    } else if (calc > 80) {
        grade = 5
    }
    resultEl.textContent = `Правильных Ответов ${corAnswers} из ${questions.length} (${calc}%), ${username}, Ваша оценка ${grade}`
}

readyBtn.addEventListener('click', (e) => {
    username = inputName.value
    inputName.style.display = 'none'
    readyBtn.style.display = 'none'
    displayQuestion()
})