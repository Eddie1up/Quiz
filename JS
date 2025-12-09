const questions = [
    {
        question: "Was sind die Inhalte des SLA (Service-Level-Agreement) ?",
        answers: [
            { text: "Die Inhalte eines SLAs sind ausschließlich technische Details der zu erbringenden Services", correct: false},
            { text: "SLAs definieren die vertraglich festgehaltenen Vereinbarungen zwischen einem Servicemitarbeiter und seinem Kunden bezüglich der Bereitstellung und Qualität eines Services", correct: true},
            { text: "SLAs sind nur für große Unternehmen und komplexe IT-Services relevant", correct: false},
            { text: "SLAs sind statische Dokumente, die nach ihrer Unterzeichnung nicht mehr verändert werden können", correct: false},
            { text: "Die Einhaltung von SLAs wird ausschließlich durch den Anbieter überwacht", correct: false},
        ]
    },
    {
        question: "Welcher Leistungsstrom beim SLA ist falsch?",
        answers: [
            { text: "IT-Services der IT-Dienstleisters an IT-Kunde", correct: false},
            { text: "Kompensation bei Abweichung von Leistungen an IT-Dienstleister", correct: true},
            { text: "Vorgaben und Anforderungen an IT-Dienstleister", correct: false},
        ]
    }, 
    {
        question: "Welches Gerät verbindet mindestens zwei IP-Netzwerke?",
        answers: [
            { text: "Switch", correct: false},
            { text: "Repeater", correct: false},
            { text: "Router", correct: true},
            { text: "Level-3 Switch", correct: false},
        ]
    },
    {
        question: "Welche folgenden Werte geben eine gültige IPv4 Subnet-Mask an?",
        answers: [
            { text: "255.255.255.0", correct: true},
            { text: "255.0.255.0", correct: false},
            { text: "265.254.0.0", correct: false},
            { text: "128.0.0.1", correct: false},
        ]
    },
    {
        question: "Ein Frame ist ein Produkt welcher OSI-Ebene?",
        answers: [
            { text: "3", correct: false},
            { text: "4", correct: false},
            { text: "2", correct: true},
            { text: "5", correct: false},
        ]
    },
    {
        question: "Die Vermittlungsschicht ist welche Ebene im OSI-Modell?",
        answers: [
            { text: "1", correct: false},
            { text: "3", correct: true},
            { text: "4", correct: false},
            { text: "2", correct: false},
        ]
    },
    {
        question: "Ein Subnetz in einem LAN ist?",
        answers: [
            { text: "Unternetz zum WAN", correct: false},
            { text: "Ein logisch abgetrennter Teil des LAN", correct: true},
            { text: "Subdirektionale Funkverbindung", correct: false},
            { text: "Eine sichere Verbindung in einer unsicheren Umgebung", correct: false},
        ]
    },
    {
        question: "Die TTL informiert mich über?",
        answers: [
            { text: "Lebensdauer der Payload eines Datensegments", correct: false},
            { text: "Geschätzte Ankunft im Ziel", correct: false},
            { text: "Anzahl der Hops, die z.B. ein ICMP-Paket bis zum Ziel benötigt", correct: true},
            { text: "Vernetzte Non Profit Systeme", correct: false},
        ]
    },
    {
        question: "Ein DHCP-Server..?",
        answers: [
            { text: "Vermittelt zwischen Routern", correct: false},
            { text: "Verbindet WANS miteinander", correct: false},
            { text: "Weißt Clients in einem Netzwerk IP-Konfigurationen zu", correct: true},
            { text: "Verbindet dich mit dem Internet", correct: false},
        ]
    },
    {
        question: "Ein Dienst im Internet basiert auf?",
        answers: [
            { text: "Payload, Nutzdaten & Header", correct: false},
            { text: "Port & Protokoll", correct: true},
            { text: "Servicename der PDU-Einheit", correct: false},
        ]
    },
    
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Weiter";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }   
}

function selectAnswer (e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Nochmal";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
