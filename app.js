import { data } from './data.js'

let divQuestions = document.getElementById('div-questions')
let form = document.getElementById('form')
let respuestasPrevias = document.getElementById('respuestas-previas')
let btnVerRespuestas = document.getElementById('btn_prev-answers')
let pantallaInicio = document.getElementById('form')
let btnEmpezar = document.getElementById('btn_empezar')
let endScreen = document.getElementById('end-screen')
let btnVolver = document.getElementById('btn-volver')
let btnVolver2 = document.getElementById('btn-volver2')

// Acá almacenaré el usuario actual con el cual se creará el título de una tabla al finalizar la encuesta
let currentUser = ''
// Acá lo mismo pero con las preguntas que son el contenido de la tabla
let arrayQuestions = []
// Y acá las respuestas
let arrayAnswers = []

const onSubmit = e => {
    e.preventDefault()
    currentUser = document.querySelector('#userInput').value
}

window.addEventListener('load', () => {
    form.addEventListener('submit', onSubmit)
})

function Encuesta() {
    
    this.preguntas = []
    this.indexCurrentQuestion = 0

    this.addQuestion = function(question) {
        this.preguntas.push(question)
    }
    
    this.showCurrentQuestion = function() {
        if (this.indexCurrentQuestion < this.preguntas.length) { 
            this.preguntas[this.indexCurrentQuestion].getElement()
        } else {
            divQuestions.style.display = 'none' 
            // Creación de pantalla final con opciones
            endScreen.style.display = 'block'   
        }
    }
}

function Pregunta(title, answers) {
    
    this.title = title
    this.answers = Object.values(answers)

    this.getElement = function() {
        // H3 cuyo contexto es un title y se agrega a un div
        let h3QuestionTitle = document.createElement('h3')
        h3QuestionTitle.textContent = this.title
        divQuestions.append(h3QuestionTitle)

        let ulAnswers = document.createElement('ul')
        ulAnswers.classList.add('ulAnswers')

        // Acá lleno el array de preguntas para llenar la tabla de encuestas previas
        arrayQuestions.push(this.title)

        this.answers.forEach(answerElem => {
            let liAnswer = document.createElement('li')
            liAnswer.classList.add('liAnswer')
            liAnswer.textContent = answerElem
            // Hacer click en la alternativa detona el paso a una nueva pregunta
            liAnswer.addEventListener('click', this.loadQuestion)
            ulAnswers.append(liAnswer)
        }) 
            
        divQuestions.append(ulAnswers)
    }

    this.loadQuestion = (event) => {
        // Se almacena la alternativa seleccionada para poder activar saltos a distintas preguntas
        let answerSelected = event.target
        // Lleno el array de respuestas para la tabla de encuestas previas
        arrayAnswers.push(answerSelected.textContent)
        // Condiciones
        if(answerSelected.textContent == question1.answers[1]) {
            encuesta.indexCurrentQuestion = 6
        }
        if (answerSelected.textContent == question5.answers[1]){
            encuesta.indexCurrentQuestion = 6
        }
        if (answerSelected.textContent == question8.answers[1]){
            encuesta.indexCurrentQuestion = 9
        }
        if (answerSelected.textContent == question11.answers[0]){
            encuesta.indexCurrentQuestion = 11
        }
        divQuestions.textContent = ''
        // Acá aumento la variable que contiene el index actual de preguntas de la encuesta
        encuesta.indexCurrentQuestion++
        encuesta.showCurrentQuestion()
    }
}

// Instanciación preguntas y encuesta
let question1 = new Pregunta(data[0].title, data[0].answers)
let question2 = new Pregunta(data[1].title, data[1].answers)
let question3 = new Pregunta(data[2].title, data[2].answers)
let question4 = new Pregunta(data[3].title, data[3].answers)
let question5 = new Pregunta(data[4].title, data[4].answers)
let question6 = new Pregunta(data[5].title, data[5].answers)
let question7 = new Pregunta(data[6].title, data[6].answers)
let question8 = new Pregunta(data[7].title, data[7].answers)
let question9 = new Pregunta(data[8].title, data[8].answers)
let question10 = new Pregunta(data[9].title, data[9].answers)
let question11 = new Pregunta(data[10].title, data[10].answers)
let question12 = new Pregunta(data[11].title, data[11].answers)
let question13 = new Pregunta(data[12].title, data[12].answers)
let question14 = new Pregunta(data[13].title, data[13].answers)
let question15 = new Pregunta(data[14].title, data[14].answers)
let question16 = new Pregunta(data[15].title, data[15].answers)
let question17 = new Pregunta(data[16].title, data[16].answers)
let question18 = new Pregunta(data[17].title, data[17].answers)
let question19 = new Pregunta(data[18].title, data[18].answers)
let question20 = new Pregunta(data[19].title, data[19].answers)

let questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10,
    question11, question12, question13, question14, question15, question16, question17, question18, question19, question20]
let encuesta = new Encuesta()
window.addEventListener('load', questions.forEach(question => {
    encuesta.addQuestion(question)
}))

// Pasar desde la pantalla de inicio a las preguntas
function seeFirstQuestion() {
    pantallaInicio.style.display = 'none'
    divQuestions.style.display = 'block'
    encuesta.showCurrentQuestion()
}
btnEmpezar.addEventListener('click', seeFirstQuestion)

// Ver pantalla de respuestas previas
let verRespuestas = () => {
    pantallaInicio.style.display = 'none'
    respuestasPrevias.style.display = 'block'
}
btnVerRespuestas.addEventListener('click', verRespuestas)

// Volver a pantalla de inicio luego de terminar encuesta
let volverInicio = () => {
    endScreen.style.display = 'none'
    pantallaInicio.style.display = 'block'
    // Necesito resetar el indexCurrentQuestion, el array de preguntas y el array de respuestas
    encuesta.indexCurrentQuestion = 0
    
    let h3RespuestasDe = document.createElement('h3')
    h3RespuestasDe.textContent = 'Respuestas de ' + currentUser
    respuestasPrevias.append(h3RespuestasDe)

    // Tabla
    let newTable = document.createElement('table')
    newTable.setAttribute('border', '1') 
    let tbody = document.createElement('tbody')
    newTable.append(tbody)
    let tr = document.createElement('tr')
    let tr2 = document.createElement('tr')
    
    arrayQuestions.forEach(question => {
        let td = document.createElement('td')
        td.textContent = question
        tr.append(td)
        tbody.append(tr)
    })

    arrayAnswers.forEach(answer => {
        let td = document.createElement('td')
        td.textContent = answer
        tr2.append(td)
        tbody.append(tr2)
    })
    respuestasPrevias.append(newTable)

    // Necesito resetar el array de preguntas y el array de respuestas 
    arrayQuestions = []
    arrayAnswers = [] 
}
btnVolver.addEventListener('click', volverInicio)

let volverInicio2 = () => {
    respuestasPrevias.style.display = 'none'
    pantallaInicio.style.display = 'block'
}
btnVolver2.addEventListener('click', volverInicio2)