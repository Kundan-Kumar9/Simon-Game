let gameSeq = [];
let userSeq = [];

// console.log(highScore);

let started = false;
let level = 0;
let btns = ["yellow", "red", "green", "purple"];
let isNameSet = true;

let h2 = document.querySelector("h2");

document.addEventListener("click", () => {
    if (started == false) {
        console.log("Game is started");
        started = true;

        levelUp();
    }
})

function levelUp() {
    userSeq = [];
    level++;
    setHighScore(level);
    // let highScore = gameSeq.length;
    // console.log(highScore);
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randomBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randomBtn);

}

function setHighScore(level) {
    // localStorage.clear()
    const highScore = localStorage.getItem("highScore");
    // console.log(user)
    if (highScore == null || level > highScore) {
        let inp;
        if (isNameSet) {
            inp = prompt("Congrats! You break High Score, Enter Your name");
            isNameSet = false;
            localStorage.setItem("Name", inp);
        }
        localStorage.setItem("highScore", level);
    }
}

function checkAns(idx) {
    // console.log(`Current level is: ${level}`);

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 170);
        }
    } else {
        document.body.style.backgroundColor = "red"
        setTimeout(function () {
            document.body.style.backgroundColor = "white";
        }, 200);

        const highScore = localStorage.getItem("highScore");
        const Name = localStorage.getItem("Name");
        h2.innerHTML = `Game Over! Your score was <b>${level}<b> <br> High Score is ${highScore} <br>Created by ${Name} <br>Press Any Key to Start.`;
        reset();
    }
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 170);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 170);
}

function btnPress() {
    let btn = this;
    // console.log(this);
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    gameSeq = [];
    userSeq = [];

    started = false;
    level = 0;
    isNameSet = true;
}