const square = document.getElementById('square');
const viewWidth = document.body.clientWidth;
const viewHeight = document.body.clientHeight;
let rezHuman = 0;
let rezComputer = 0;
let set =0;
let round = 0;
let intervalas=[];
let timerInterval=[];
let winner = '';
let rezults = '';
const timerTime = 50;
let timer = 0;
const timeris = document.getElementById('timer');
const  sound = document.getElementById("myAudio"); 
const daznis = 1000;


function randomMinMax(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }


function game(){
    // // set++;
    // if(timer<=0){
    //     roundEnd();
    //     return;
    // }
    const positionX = randomMinMax(0, (viewWidth-200));
    const positionY = randomMinMax(0, (viewHeight-200));
    square.style.setProperty('--top', positionY + 'px');
    square.style.setProperty('--left', positionX  + 'px');
    square.style.display='block';
    // square.style.backgroundColor = (`rgb(${randomMinMax(100,200)}, ${randomMinMax(100,200)}, ${randomMinMax(100,200)})`);
    
    rezComputer = rezComputer + 1;
    console.log("Z: "+ rezHuman + " Com: "+ rezComputer);
}



function roundEnd() {
    for (let i of intervalas){
        clearInterval(i);
    };

    for (let x of timerInterval){
        clearInterval(x);
    };

    square.style.display='none';

    if(rezHuman > rezComputer){
        winner = "Zmogus";
    } else if(rezComputer === rezHuman){
        winner = "Lygiosios";
    } else {
        winner = "Kompiuteris";};

    round++;
    rezults += `Raundas ${round}, zmogus: ${rezHuman}, Kompiuters: ${rezComputer}, nugalėtojas-> ${winner} \n\r`; 
    // round === 3 && gameEnd();

    if(round === 3){ 
        gameEnd();
        return;
    }

    timer=timerTime;
    window.alert('Zmogus: '+ rezHuman + '\n\r' + 'Kompiuteris: '+ rezComputer);
    intervalas.push(setInterval(game, daznis));
    timerInterval.push(setInterval(timerF, 100));
    rezHuman = 0;
    rezComputer =0;
}

function gameEnd(){
    for (let i of intervalas){
        clearInterval(i);
    };
    window.alert(rezults);
    rezHuman = 0;
    rezComputer =0;
    set=0;
    round=0;
    rezults = '';
    gameStart();
    
}

function gameStart() {
    set=0;
    round = 0;
    // game();
    timer = timerTime;
    timerInterval.push(setInterval(timerF, 100));
    intervalas.push(setInterval(game, daznis));
}
    


function timerF(){
    timeris.innerText = Math.floor(timer/10) + "s :" + timer%10;
    timer = timer - 1; 
    if (timer <=0){
        console.log('viskas');
        timeris.innerText = '0s :0'
        for (let i of intervalas){
            clearInterval(i);
        };
    
        for (let x of timerInterval){
            clearInterval(x);
        };
        roundEnd();
    }

}

function playAudio() { 
    sound.play(); 
    sound.volume = 0.02;
  } 

gameStart();  //

square.addEventListener("click", ()=>{
    playAudio();

    for (let i of intervalas){
    clearInterval(i);
    };
    
    rezHuman=rezHuman+1;
    rezComputer=rezComputer - 1;
   
    intervalas.push(setInterval(game, daznis));
    game();
});  


//reiki pataisyti -> taska kompas gauna tik pasileisu taimerio funkcijai
// pirma karta gaidy sugeneruoja root kodas