const flyingObject = document.getElementById('square');
const buttonOk = document.getElementById('ok');
const infoText = document.getElementById('info-text');
const viewWidth = document.body.clientWidth;
const viewHeight = document.body.clientHeight;
let rezultHuman = 0;
let rezultComputer = 0;
let set = 0;
let round = 1;
let flyinInterval;
let timerInterval;
let winner = '';
let rezults = '';
let timerTime = 300; //0.01/
const changeInterval = 1000; //
let timer = 0;
const timerObject = document.getElementById('timer');
const  soundObject = document.getElementById("myAudio"); 
let overall = [];
let finalist = "";


function playAudio() { 
    soundObject.play(); 
    soundObject.volume = 0.15;
} 

function randomMinMax(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }


function timerOut(){
    rezultComputer++;
    puttFlyingObjectInRandomPlace();
    flyinInterval =  setTimeout(timerOut, 1000);
}

function puttFlyingObjectInRandomPlace(){
    const positionX = randomMinMax(0, (viewWidth-200));
    const positionY = randomMinMax(0, (viewHeight-200));
    square.style.setProperty('--top', positionY + 'px');
    square.style.setProperty('--left', positionX  + 'px');
    square.style.display='block';
}



function roundEnd() {
    if (rezultHuman > rezultComputer){ 
        winner = "Zmogus";
        overall[round-1]=1;
    } else if(rezultHuman == rezultComputer) {
        winner = "Lygiosios";
        overall[round-1]=0;
    } else {
        winner = "Kompiuteris"
        overall[round-1]=-1;
    };

    rezults += `Roundas: ${round} > Zmogus: ${rezultHuman} - Kompiuteris: ${rezultComputer}. NUGALETOJAS: ${winner} \n\r`;
    document.getElementById('info').style.display = 'flex';
    infoText.innerText = rezults;
    rezultComputer = 0;
    rezultHuman = 0;
    if (round >= 3){
        if (overall.reduce((a,b)=>a+b)>0){
            finalist = 'ZMOGUS';
        } else if(overall.reduce((a,b)=>a+b)=0){
            finalist = 'LYGIOSIOS';
        } else {
            finalist = 'KOMPIUTERIS';
        }
        infoText.innerText = rezults + "Žaidimas baigtas. \n\r Matcho nugaletojas: " + finalist ; //suskaiciuoti galutini laimetoja

        round = 1;
        rezults = '';
        overall = [];
        return;
    }
    round++;
    
}
   
function timerF(){
timerObject.innerText = `${Math.floor(timerTime/10)} : ${timerTime%10}`;
timerTime --;
if (timerTime <= 0){
    timerObject.innerText = `0 : 0`;
    clearInterval(timerInterval);
    clearTimeout(flyinInterval);
    square.style.display='none';
    timerTime = 50;
    roundEnd();
}
}


buttonOk.addEventListener("click", ()=>{
    document.getElementById('info').style.display = 'none';
    timerInterval = setInterval(timerF, 100);
    puttFlyingObjectInRandomPlace();
    flyinInterval =  setTimeout(timerOut, changeInterval);
});


flyingObject.addEventListener("click", ()=>{
    playAudio();    
    rezultHuman=rezultHuman+1;
    rezultComputer=rezultComputer;
    clearTimeout(flyinInterval);
    puttFlyingObjectInRandomPlace();
    flyinInterval =  setTimeout(timerOut, 1000);  //
});  


