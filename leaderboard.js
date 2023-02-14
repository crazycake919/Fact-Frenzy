import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";


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

const app = initializeApp(firebaseApp);

const database = getDatabase(app);
var data = [];
var NumberOfPlayers = 0;
const referance = ref(database, "users/");
onValue(referance, (snapshot) => {
    let playerNumber = 0;
    data = [];
    snapshot.forEach(user => {
        data.push(new Array(2))
        //console.log(question.key);

        user.forEach(info => {
            if (info.key != "username") {
                data[playerNumber][1] = info.val();
            } else {
                //console.log(info.key+" "+info.val());
                data[playerNumber][0] = info.val();
            }
        })
        playerNumber++

    });
    NumberOfPlayers = playerNumber;
    console.log(data);
    data = sort(data,0,NumberOfPlayers-1);
    console.log(data);
    AddToLeaderBoard();

});
function sort(arr,start,end) {
    
        if (start >= end) {
            return;
        }

        let pivotIndex = start;
        let pivotValue = arr[end];
        let partitionIndex = start;

        for (let i = start; i < end; i++) {
            if (arr[i][1] > pivotValue[1]) {
                swap(arr, i, partitionIndex);
                partitionIndex++;
            }
        }
        swap(arr, partitionIndex, end);

        sort(arr,start, partitionIndex - 1);
        sort(arr,partitionIndex + 1, end);
    



    
    return arr;
}
function swap(arr, i, j) {
    let tempName = arr[i][0];
    let tempscore = arr[i][1];
    arr[i][0] = arr[j][0];
    arr[i][1] = arr[j][1];
    arr[j][0] = tempName;
    arr[j][1] = tempscore;
}

function AddToLeaderBoard() {
    let lb = $("#leaderboard");
    for (let i = 0; i < data.length; i++) {
        lb.append("<tr><th>"+data[i][0]+"</th><th class='score'>"+data[i][1]+"</th></tr>");
        

    }


}