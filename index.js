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
var questionLength = 2
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

export function SetQuestion(){
    let random = Math.floor(Math.random()*questionLength);
    let question = $("#Q");
    let Answer1 = $("#A1");
    let Answer2 = $("#A2");
    
    let Answer3 = $("#A3");
    let Answer4 = $("#A4");
    console.log(random);
    question.html(data[random][0])
    Answer1.html(data[random][2][0]);
    Answer2.html(data[random][2][1]);
    Answer3.html(data[random][2][2]);
    Answer4.html(data[random][2][3]);
    
}

//writeData("idk");
onAuthStateChanged(auth, user =>{
    if(user != null){
        console.log("logged in");
    }else 
    {
        console.log("no");
    }

});

