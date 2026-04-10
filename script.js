// ================= QUESTIONS =================

// EASY (10)
const easyQuestions = [
    { img: "images/brgycarpok.jpg", options: ["brgy carpok","brgy Dansal","brgy Mandeg","brgy Tipasan"], answer: "brgy carpok" },
    { img: "images/brgymala.jpg", options: ["khelat","Dungos","Mala","Katibong"], answer: "Mala" },
    { img: "images/bulungisan.jpg", options: ["Bulungisan","dlinaw mensanan","baga","timasek"], answer: "Bulungisan" },
    { img: "images/dumangkilas.jpg", options: ["timasek","Dlinaw mensanan","naga","dumangkilas"], answer: "dumangkilas" },
    { img: "images/dumara elementary school.jpg", options: ["dumara elementary school","dansal elementary school","marwing elementary school","tipasan elementary school"], answer: "dumara elementary school" },
    { img: "images/flyingv.jpg", options: ["sentro","flying V","Purok 4","Dungos"], answer: "flying V" },
    { img: "images/labc.jpg", options: ["labc","alliance","ginghuran bae","ricemill"], answer: "labc" },
    { img: "image/mahalingeb.jpg", options: ["mandeg","dansal","mahalingeb","tabun"], answer: "mahalingeb" },
    { img: "images/lapuyanresort.jpg", options: ["lapuyanresort","ricemill resort","baga resort","galupalop"], answer: "lapuyanresort" },
    { img: "images/marwingfalls.jpg", options: ["mensanan","baga falls","timasek falls","marwingfalls"], answer: "marwingfalls" }
];

// MEDIUM (10)
const mediumQuestions = [
    { img: "images/bulawan gym.jpg", options: ["bulawan gym","old gym","mega gym","elem gym"], answer: "bulawan gym" },
    { img: "images/danganan elem. school.jpg", options: ["tabon elem. school","pingalay elem. school","dansal elem. school","danganan elem. school"], answer: "Norway" },
    { img: "images/kristuhanon.jpg", options: ["kristuhanon","INC","gospel church","baptist church"], answer: "kristuhanon" },
    { img: "images/tiguha1.jpg", options: ["pingalay","tiguha1","dansal","sumenlad"], answer: "tiguha1" },
    { img: "images/download.jpg", options: ["lapuyan falls","marwing mini falls","timasek falls","mensanan"], answer: "lapuyan falls" },
    { img: "images/marwing mini falls.jpg", options: ["timasek falls","rice mill","baga","marwing mini falls"], answer: "marwing mini falls" },
    { img: "images/brgycarpok.jpg", options: ["brgy carpok","brgy Dansal","brgy Mandeg","brgy Tipasan"], answer: "brgy carpok" },
    { img: "images/brgymala.jpg", options: ["khelat","Dungos","Mala","Katibong"], answer: "Mala" },
   { img: "images/tiguhanhs.jpg", options: ["pantad NHS","central","tipasan elem. scholl","tiguha NHS"], answer: "tiguha NHS" },
    { img: "images/bulawan elem school.jpg", options: ["sayug elem school","bulawan elem school","mulom elem school","central elem school"], answer: "New bulawan elem school" }
];

// HARD (10)
const hardQuestions = [
    { img: "images/mati lapuyan church.jpg", options: ["ricemill church","mati lapuyan church","balubu church","talebeb church"], answer: "mati lapuyan church" },
    { img: "images/megagym.jpg", options: ["megagym","old gym","elementary gym","lnhs gym"], answer: "megagym" },
    { img: "images/mvmac.jpg", options: ["mvmac","alliance","INC","born again"], answer: "mvmac" },
    { img: "images/pahut.jpg", options: ["cabug island","pulo bongbong","gunsili","pahut"], answer: "pahut" },
    { img: "images/pulo bongbong.jpg", options: ["pahut","belungisan","pulo bongbong","pampang"], answer: "pulo bongbong" },
    { img: "images/seventhadventischurch.jpg", options: ["seventh adventis church","alliance","kristuhanon","penthicos"], answer: "seventh adventis church" },
    { img: "images/sumenlad.jpg", options: ["carpok","sumenlad","balubu","mala"], answer: "sumenlad" },
    { img: "images/tiguha.jpg", options: ["tiguha","mandeg","dansal","tininghelang"], answer: "tiguha" },
    { img: "images/tiguhanhs.jpg", options: ["pantad NHS","central","tipasan elem. scholl","tiguha NHS"], answer: "tiguha NHS" },
    { img: "images/bulawan elem school.jpg", options: ["sayug elem school","bulawan elem school","mulom elem school","central elem school"], answer: "New bulawan elem school" }
];

// ================= LEVEL MODE =================
let levelMode = localStorage.getItem("levelMode") || 1;

// SELECT QUESTIONS
let questions;
if(levelMode == 1) questions = easyQuestions;
else if(levelMode == 2) questions = mediumQuestions;
else questions = hardQuestions;

// TIMER
let timeLeft = (levelMode == 1) ? 20 : (levelMode == 2 ? 15 : 10);
let timerInterval;

// GAME STATE
let current = 0;
let coins = parseInt(localStorage.getItem("coins")) || 1000;
let level = parseInt(localStorage.getItem("level")) || 1;

// SCORES
let scoreEasy = parseInt(localStorage.getItem("scoreEasy")) || 0;
let scoreMedium = parseInt(localStorage.getItem("scoreMedium")) || 0;
let scoreHard = parseInt(localStorage.getItem("scoreHard")) || 0;

// ================= START =================
loadQuestion();
updateUI();
startTimer();

// LOAD QUESTION
function loadQuestion(){
    let q = questions[current];

    document.getElementById("gameImage").src = q.img;

    let optionsHTML = "";
    q.options.forEach(opt => {
        optionsHTML += `<button onclick="checkAnswer('${opt}')">${opt}</button>`;
    });

    document.getElementById("options").innerHTML = optionsHTML;
    document.getElementById("result").innerText = "";

    // QUESTION TEXT
    document.getElementById("questionText").innerText = "Saan ito?";

    // MODE TEXT
    let mode = (levelMode == 1) ? "EASY" : (levelMode == 2 ? "MEDIUM" : "HARD");
    document.getElementById("modeText").innerText = "Mode: " + mode;
}

// CHECK ANSWER
function checkAnswer(selected){
    let correct = questions[current].answer;

    let history = JSON.parse(localStorage.getItem("history")) || [];

    if(selected === correct){
        document.getElementById("result").innerText = "✅ Correct!";
        coins += 50;
        level++;

        if(levelMode == 1) scoreEasy += 10;
        else if(levelMode == 2) scoreMedium += 10;
        else scoreHard += 10;

        document.getElementById("correctSound").play();
        history.push("✅ Correct - " + correct);

    } else {
        document.getElementById("result").innerText =
            "❌ Wrong! Correct answer: " + correct;

        coins -= 10;

        if(levelMode == 1) scoreEasy -= 5;
        else if(levelMode == 2) scoreMedium -= 5;
        else scoreHard -= 5;

        document.getElementById("wrongSound").play();
        history.push("❌ Wrong - " + correct);
    }

    localStorage.setItem("history", JSON.stringify(history));

    saveGame();
    updateUI();

    setTimeout(nextQuestion, 1500);
}

// NEXT QUESTION
function nextQuestion(){
    current++;
    if(current >= questions.length) current = 0;

    resetTimer();
    loadQuestion();
}

// TIMER
function startTimer(){
    document.getElementById("timer").innerText = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        if(timeLeft <= 0){
            clearInterval(timerInterval);
            timeUp();
        }
    }, 1000);
}

// TIME UP
function timeUp(){
    let correct = questions[current].answer;

    document.getElementById("result").innerText =
        "⏰ Time's Up! Correct answer: " + correct;

    coins -= 15;

    if(levelMode == 1) scoreEasy -= 5;
    else if(levelMode == 2) scoreMedium -= 5;
    else scoreHard -= 5;

    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push("⏰ Time's Up - " + correct);
    localStorage.setItem("history", JSON.stringify(history));

    saveGame();
    updateUI();

    setTimeout(nextQuestion, 1500);
}

// RESET TIMER
function resetTimer(){
    clearInterval(timerInterval);
    timeLeft = (levelMode == 1) ? 20 : (levelMode == 2 ? 15 : 10);
    startTimer();
}

// SAVE
function saveGame(){
    localStorage.setItem("coins", coins);
    localStorage.setItem("level", level);

    localStorage.setItem("scoreEasy", scoreEasy);
    localStorage.setItem("scoreMedium", scoreMedium);
    localStorage.setItem("scoreHard", scoreHard);
}

// UPDATE UI
function updateUI(){
    document.getElementById("coins").innerText = coins;
    document.getElementById("level").innerText = level;

    if(document.getElementById("scoreEasy")){
        document.getElementById("scoreEasy").innerText = scoreEasy;
        document.getElementById("scoreMedium").innerText = scoreMedium;
        document.getElementById("scoreHard").innerText = scoreHard;
    }
}

// DARK MODE
function toggleMode(){
    document.body.classList.toggle("dark");
}

// MUSIC
let music = document.getElementById("bgMusic");
if(music){
    let savedVolume = localStorage.getItem("volume");
    if(savedVolume !== null){
        music.volume = savedVolume;
    }
}