let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;
let higScr = 0;



let h2 = document.querySelector("h2");

document.addEventListener("keypress", () => {
    if(started == false){
        // console.log("game is started");
        started = true;

        levelup();
    }
});


function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
};


function btnFlash(btn){
    btn.classList.add("user-flash");
    setTimeout(function(){
        btn.classList.remove("user-flash");
    }, 50);
};


function levelup(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    if(level > higScr){
        higScr = level;
    }
    
    let randomIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randomIdx]; 
    let randbtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
   gameFlash(randbtn);
};

function checkAns(idx){
    if(userseq[idx] == gameseq [idx]){
        if(userseq.length == gameseq.length){
            setTimeout( levelup, 250);
        }
    } else{
        let body = document.querySelector("body");
        body.classList.add("redBg");
        setTimeout(function(){
            body.classList.remove("redBg");
        }, 100)
        h2.innerHTML = `Game Over !! your score was <b> ${level} </b><br> your highest score was <b> ${higScr} </b><br> Press any key to try again. `;
        started = false;
        level = 0;
        gameseq = [];
    }
}

function btnPress(){
    if(started == true){
        let btn = this;
        btnFlash(btn);
        userseq.push(this.getAttribute("id"));
    
        checkAns(userseq.length-1);
    }
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress)
}