import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';

import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getAuth, onAuthStateChanged, signInAnonymously } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

const firebaseApp = {
    apiKey: "AIzaSyBR0Q_DlTa8mE8A0pvSruHwgic1kkYX28I",
    authDomain: "fact-frenzy-dc028.firebaseapp.com",
    projectId: "fact-frenzy-dc028",
    storageBucket: "fact-frenzy-dc028.appspot.com",
    messagingSenderId: "633037762269",
    appId: "1:633037762269:web:b78f30625c728d4c62f534",
    measurementId: "G-VTCV9NWF03",
    databaseURL: "https://fact-frenzy-dc028-default-rtdb.europe-west1.firebasedatabase.app/"
};
var questionLength = 21;
var currentQuestion = 0;
var score = 0;
var data = new Array(questionLength);
for (let i = 0; i < questionLength; i++) {
    data[i] = new Array(3);
    data[i][2] = new Array(4);
}
//console.log(data);
var questionIndex = 0;
// Initialize Firebase
const app = initializeApp(firebaseApp);
const auth = getAuth(app);
const database = getDatabase(app);


const referance = ref(database, "questions/");
onValue(referance, (snapshot) => {
    questionIndex = 0;
    snapshot.forEach(question => {
        //console.log(question.key);
        data[questionIndex][0] = question.key;
        question.forEach(info => {
            if (info.key != "Correct") {
                let ansIndex = 0
                info.forEach(ans => {
                    //console.log(ans.key+" "+ans.val());
                    data[questionIndex][2][ansIndex] = ans.val();
                    ansIndex++;
                })
            } else {
                //console.log(info.key+" "+info.val());
                data[questionIndex][1] = info.val();
            }
        })
        questionIndex++

    });
    loadedData = true;
    
});
start();
var usedNumbers = [];
function getNumber() {
    let random = Math.floor(Math.random() * questionLength);
    while (usedNumbers.includes(random)) {
        random = Math.floor(Math.random() * questionLength);
    }
    if (usedNumbers.push(random) > questionLength / 2) {
        usedNumbers.shift();
    }
    return random;
}
var right = $("#1");
var left = $("#2");

// Set the animation iteration count to 2

// Add an animation iteration event listener to the element
var openQuestionBox=false;
right.on("animationend", function () {
    if(openQuestionBox){
        right.removeClass('fluidbox1');
        openQuestionBox =false;
        right.addClass("second1");
        left.removeClass('fluidbox2');
        
        left.addClass("second2");
        changeQuestion();
    }else{
        right.removeClass("second1");
        left.removeClass("second2");
        openQuestionBox=true;
    }
    
    
    
});
/*
var leftBool=true;
left.on("animationend", function () {
    if(rightBool){
        left.removeClass('fluidbox2');
        leftBool =false;
        left.addClass("second2");
    }else{
        left.removeClass("second2");
        leftBool=true;
    }
    
    
    
});
*/

function changeQuestion(){
    
    currentQuestion = getNumber();
    let question = $("#Q");
    question.html(data[currentQuestion][0]);
    Randomise();
}
export function SetQuestion() {
    

    
    right.addClass("fluidbox1");
    left.addClass("fluidbox2");
    //console.log(currentQuestion);
    
    
    

}
function Randomise() {
    let Answers;
    let ansNumber = 0;
    Answers = $(".answer");
  
    let random;
    while (ansNumber < 4) {
        random = Math.floor(Math.random() * Answers.length);
     
        $(Answers[random]).html(data[currentQuestion][2][ansNumber]);
        $(Answers[random]).removeAttr("id");


        $(Answers[random]).attr("id", "A" + (ansNumber + 1));
        Answers.splice(random, 1);

        ansNumber++;
    }



}

export function answer(button) {

    if (button.id == data[currentQuestion][1]) {
        //console.log("yes");
        score++;
        $("#score").html("Score: " + score);
        SetQuestion();
    } else {
        //console.log("no");
        EndGame();
    }

}

function start() {
    $("#gameArea").hide();
    $("#SubmitScore").hide();

}
var loadedData=false;
export function GameStart() {
    if(!loadedData){
        setTimeout(delayGameStart,300);
        loadedData=true;
    }else{
        delayGameStart()
    }
}
function delayGameStart(){
    score = 0;
    $("#SubmitScore").hide();
    openQuestionBox=false;
    
    $("#gameArea").show();
    $("#menu").hide();
    $("#buttons").show();
    right.addClass("second1");
    left.addClass("second2");

    changeQuestion();
    $("#score").html("Score: " + score);
}
function EndGame() {

    
    $("#SubmitScore").show();
    $("#gameArea").hide();
    $("#score").html("Score: " + score);
    $("#menu").show();
    $("#buttons").hide();
}

//AUTH
var uid ;
signInAnonymously(auth)
    .then(() => {
        // Signed in..
    })
    .catch((error) => {
        console.log(rror.code);
        console.log(error.message);
        // ...
    });
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});

export function writeData() {
    const referance = ref(database, "users/" + uid);
    const HighScoreRef = ref(database, "users/"+uid+"/score")
    let HighScore=0;
    onValue(HighScoreRef, (snapshot) => {
        if(snapshot!=null){
            HighScore = snapshot.val();
        }
    });
    console.log(HighScore);
    if(HighScore<score){
        HighScore = score;
    }
    const Name = $("#name").val()
    set(referance, {
        username: Name,
        score: HighScore

    })
}
//writeData("idk");


