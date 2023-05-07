import { randomMinMax } from "./js/random-number.js";
import { playAudio } from "./js/play-audio.js";

const flyingObject = document.getElementById('square');
const buttonOk = document.getElementById('ok');
const infoText = document.getElementById('info-text');
let rezultHuman = 0;
let rezultComputer = 0;
let set = 0;
let round = 1;
let flyinInterval;
let timerInterval;
let winner = '';
let rezults = '';
let timerTime = 200;
let roundTime = 200;
let roundsCount = 5;
let rooster_Size = 50;
const changeInterval = 1000; //
// let timer = 0;
const timerObject = document.getElementById('timer');
let overall = [];
let finalist = "";
let isItend = false;



function timerRunOut(){
    rezultComputer++;
    puttFlyingObjectInRandomPlace();
    flyinInterval =  setTimeout(timerRunOut, 1000);
}

function puttFlyingObjectInRandomPlace(){
    const viewWidth = document.body.clientWidth;
    const viewHeight = document.body.clientHeight;
    const positionX = randomMinMax(0, (viewWidth-rooster_Size));
    const positionY = randomMinMax(0, (viewHeight-rooster_Size));
    square.style.setProperty('--top', positionY + 'px');
    square.style.setProperty('--left', positionX  + 'px');
    square.style.display='block';
}



function roundEnd() {
    
    if (rezultHuman > rezultComputer){ 
        overall[round-1]=1;
        winner = "Zmogus -> "  + overall.filter(x => x===1).length + " Laimejimu";
    } else if(rezultHuman == rezultComputer) {
        overall[round-1]=0;
        winner = "Lygiosios -> "+ overall.filter(x => x===0).length + " Lygiuju";
    } else {
        overall[round-1]=-1;
        winner = "Kompiuteris -> " + overall.filter(x => x===-1).length + " Laimejimu";
    };
    rezults += `Roundas: ${round} > Zmg: ${rezultHuman} - PC: ${rezultComputer}. NUGALETOJAS: ${winner} \n\r`;
    document.getElementById('info-wrapper').style.display = 'flex';
    infoText.innerText = rezults;
    rezultComputer = 0;
    rezultHuman = 0;

    if (round >= roundsCount){
        if (overall.reduce((a,b)=>a+b)>0){
            finalist = 'ZMOGUS';
        } else if(overall.reduce((a,b)=>a+b)===0){
            finalist = 'LYGIOSIOS';
        } else {
            finalist = 'KOMPIUTERIS';
        }
        infoText.innerText = rezults + "Žaidimas baigtas. \n\r Matcho nugaletojas: " + finalist ; 
        round = 1;
        rezults = '';
        overall = [];
        isItend = true;
        return;
    }
    round++;
    
}
   
function timeDownCounter(){
timerObject.innerHTML = `<span style="font-size:20px; display:inline-block">Roundas ${round}</span> <br> ${Math.floor(timerTime/10)} : ${timerTime%10} <br> <span style="font-size:20px; display:inline-block"> Žmg: ${rezultHuman} / PC: ${rezultComputer}</span> <br>`;
timerTime --;
if (timerTime <= 0){
    timerObject.innerHTML = `<span style="font-size:20px; display:inline-block">Roundas ${round}</span> <br> 0 : 0 <br> <span style="font-size:20px; display:inline-block"> Žmg: ${rezultHuman} / PC: ${rezultComputer}</span> <br>`;
    clearInterval(timerInterval);
    clearTimeout(flyinInterval);
    square.style.display='none';
    timerTime = roundTime;
    roundEnd();
}
}  

function buttonOkClicked() {
    if (isItend){
        isItend = false;
        document.getElementById("start-wrapper").style.display = 'flex';
        document.getElementById('info-wrapper').style.display = 'none';
        timerObject.style.display = 'none';

    } else {
    timerObject.style.display = 'block';
    document.getElementById("start-wrapper").style.display = 'none';
    document.getElementById('info-wrapper').style.display = 'none';
    timerInterval = setInterval(timeDownCounter, 100);
    puttFlyingObjectInRandomPlace();
    flyinInterval =  setTimeout(timerRunOut, changeInterval);
    timerTime = roundTime;
    }
};

buttonOk.addEventListener("click", buttonOkClicked);

function theTargetWasClicked() {
    playAudio();    
    rezultHuman=rezultHuman+1;
    rezultComputer=rezultComputer;
    clearTimeout(flyinInterval);
    puttFlyingObjectInRandomPlace();
    flyinInterval =  setTimeout(timerRunOut, 1000);

};

flyingObject.addEventListener("click", theTargetWasClicked);

function roosterSize(){
    rooster_Size = document.getElementById("rooster-size").value * 1.2 +30;
    document.documentElement.style.setProperty('--rooster-size', rooster_Size + "px");
}

document.getElementById('rooster-size').addEventListener('input', roosterSize);

function roundInterval() {
    roundTime = document.getElementById("round-time").value*10;
}

document.getElementById('round-time').addEventListener('input', roundInterval);

function howManyRound(){
    roundsCount = document.getElementById("rounds-count").value;
}

document.getElementById('rounds-count').addEventListener('input', howManyRound);

const btnStart=document.getElementById('btn-start');
btnStart.addEventListener("click", buttonOkClicked);