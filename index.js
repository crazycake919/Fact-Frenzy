import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';

import { getDatabase, ref,set ,onValue} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import {getAuth, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

const firebaseApp = {
    apiKey: "AIzaSyBR0Q_DlTa8mE8A0pvSruHwgic1kkYX28I",
    authDomain: "fact-frenzy-dc028.firebaseapp.com",
    projectId: "fact-frenzy-dc028",
    storageBucket: "fact-frenzy-dc028.appspot.com",
    messagingSenderId: "633037762269",
    appId: "1:633037762269:web:b78f30625c728d4c62f534",
    measurementId: "G-VTCV9NWF03",
    databaseURL:"https://fact-frenzy-dc028-default-rtdb.europe-west1.firebasedatabase.app/"
};
var questionLength = 21;
var currentQuestion=0;
var score = 0;
var data = new Array(questionLength);
for(let i = 0;i<questionLength;i++){
    data[i] = new Array(3);
    data[i][2]= new Array(4);
}
//console.log(data);
var questionIndex=0;
// Initialize Firebase
const app = initializeApp(firebaseApp);
const auth = getAuth(app);
const database = getDatabase(app);

function writeData(smthing){
    const referance = ref(database,"users/"+smthing);

    set(referance, {
        username:"cum"

    })
}
const referance = ref(database,"questions/");
onValue(referance, (snapshot)=>{
    questionIndex = 0;
    snapshot.forEach(question => {
        //console.log(question.key);
        data[questionIndex][0]=question.key;
        question.forEach(info=>{
            if(info.key!="Correct"){
                let ansIndex =0
                info.forEach(ans=>{
                    //console.log(ans.key+" "+ans.val());
                    data[questionIndex][2][ansIndex]= ans.val();
                    ansIndex++;
                })
            }else{
                //console.log(info.key+" "+info.val());
                data[questionIndex][1]= info.val();
            }
        })
        questionIndex++
        
    });
   console.log(data);
    SetQuestion();
});
var usedNumbers=[];
function getNumber(){
    let random = Math.floor(Math.random()*questionLength);
    while(usedNumbers.includes(random)){
        random = Math.floor(Math.random()*questionLength);
    }
    if(usedNumbers.push(random)>questionLength/2){
        usedNumbers.shift();
    }
    return random;
}
export function SetQuestion(){
    currentQuestion=getNumber();
    
    let question = $("#Q");
 
    //console.log(currentQuestion);
    question.html(data[currentQuestion][0])
    Randomise();
    
}
function Randomise(){
    let Answers;
    let ansNumber = 0;
    Answers = $(".answer");
    console.log(Answers);
    console.log($("#A1"));
    let random;
    while(ansNumber<4){
        random = Math.floor(Math.random()*Answers.length);
        console.log(random);
        console.log(Answers[0]);
        console.log(data[currentQuestion][2][ansNumber]);
        $(Answers[random]).html(data[currentQuestion][2][ansNumber]);
        $(Answers[random]).removeAttr("id");
 
        
        $(Answers[random]).attr("id", "A"+(ansNumber+1));
        Answers.splice(random,1);
        
        ansNumber++;
    }
   
    

}
export function answer(button){
    if(button.id == data[currentQuestion][1]){
        console.log("yes");
        score++;
        $("#score").html("Score: "+score);
        SetQuestion();
    }else{
        console.log("no");
        EndGame();
    }
 
}
function start(){
    $("#gameArea").hide();
    
}
export function GameStart(){
    score = 0;
    SetQuestion();
    $("#gameArea").show();
    $("#menu").hide();
    $("#buttons").show();
    $("#score").html("Score: "+score);
}
function EndGame(){
    
    $("#Q").html("Try Again");
    $("#score").html("Score: "+score);
    $("#menu").show();
    $("#buttons").hide();
}
start();
//writeData("idk");
onAuthStateChanged(auth, user =>{
    if(user != null){
        console.log("logged in");
    }else 
    {
        console.log("no");
    }

});

