//////////////////////////////////////////////////////////////////////
// APP STATE
//////////////////////////////////////////////////////////////////////
let characters = []
const state = {
    player1Char: characters[0],
    player2Char: characters[2],
    player1: 0,
    player2: 0,
    which: true,
    winner: ""
}

let questions = [];

//////////////////////////////////////////////////////////////////////
// Main DOM Elements
//////////////////////////////////////////////////////////////////////
const $question = $("#question")
const $a = $("#a")
const $b = $("#b")
const $c = $("#c")
const $d = $("#d")
const $p1score = $("#player1 h4")
const $p2score = $("#player2 h4")

//////////////////////////////////////////////////////////////////////
// Main App Logic
//////////////////////////////////////////////////////////////////////
const chooseAnswer = (event, question) => {
    console.log(event)
    if(event.target.innerText === question.answer){
        console.log("correct")
        if (state.which) {
            state.player1++
            state.which = !state.which
            $("#player1 h3").css("color", "black")
            $("#player2 h3").css("color", "green")
        } else {
            state.player2++
            state.which = !state.which
            $("#player2 h3").css("color", "black")
            $("#player1 h3").css("color", "green")
        }
        setBoard(questions)
    } else {
        console.log("incorrect")
        if (state.which) {
            $("#player1 h3").css("color", "black")
            $("#player2 h3").css("color", "green")
        } else {
            $("#player2 h3").css("color", "black")
            $("#player1 h3").css("color", "green")
        }
        setBoard(questions)
        state.which = !state.which
    }
}

const setBoard = (q) => {
    // Getting a random question 
    const randomIndex = Math.floor(Math.random() * q.length)
    const randomQuestion = q[randomIndex];
    
    // Remove the question to avoid repeats and end the game
    q.splice(randomIndex, 1);
    console.log(q)
    if (q.length === 0) {
        $("#end").css("visibility", "unset")
        if (state.player1 > state.player2) {
            $("#end").append($("<h1>")).text("Player 1 Wins!").addClass("endText")
            $("#end").append(characters[0])
        } else if (state.player2 > state.player1) {
            $("#end").append($("<h1>")).text("Player 2 Wins!").addClass("endText")
            $("#end").append(characters[2])
        } else {
            $("#end").append($("<h1>")).text("It is a tie!").addClass("endText")
            $("#end").append(characters[0])
            $("#end").append(characters[2])
        }
    } 

// Special Ability Logic
useAbil = () => {
    if (state.player1 > 0 && state.player1 % 2 === 0) {
        p1Abil();
    }
    if (state.player2 > 0 && state.player2 % 2 === 0) {
        p2Abil();
    }
    if (state.player1 > 0 && state.player1 % 3 === 0) {
        p1Ender();
    }
    if (state.player2 > 0 && state.player2 % 3 === 0) {
        p2Ender();
    }
}

    // Update the question 
    $question.text(randomQuestion.question)
    $a.text(randomQuestion.a)
    $b.text(randomQuestion.b)
    $c.text(randomQuestion.c)
    $d.text(randomQuestion.d)

    // Update player scores
    $p1score.text(state.player1) 
    $p2score.text(state.player2)

    $("li").off();
    $("li").on("click", (event)=>{
        chooseAnswer(event, randomQuestion)
        useAbil();
    });
}

//////////////////////////////////////////////////////////////////////
// Main App Logic
//////////////////////////////////////////////////////////////////////

const url = "https://cdn.contentful.com/spaces/ttpo79qriuq4/environments/master/entries?access_token=woXHQFPShx4D-VNlQ-z0riXrLbsrPhhFiyDz1ipbBXI&content_type=triviaq"
        $.ajax(url)
        .then((data)=>{
            questions = data.items.map((q) => q.fields)
            console.log(data)
            console.log(questions)
            setBoard(questions);
        })    

//////////////////////////////////////////////////////////////////////
// Character Selection
//////////////////////////////////////////////////////////////////////

$(".chars").on("click", (event)=>{
    console.log(event)
    characters.push(event.target)
    characters.push(event.target.classList[1])
    $(event.target).css("border", "2px solid white")
    $(".whoChoose").text("Player 2 Choose!")
    console.log(characters)
    if (characters.length === 4) {
        $("#charSelect").append($("<button>").text("Play!").addClass("play"));
        $(".whoChoose").text("Press Play!");
    }
    $(".play").on("click", ()=>{
        $(".charImg").append(characters[0]);
        console.log($(characters[0]))
        $(".charImg2").append(characters[2]);
        $(".chars").css("border", "none")
        $("#charSelect").remove();
    })
})

//////////////////////////////////////////////////////////////////////
// Special Abilities Functions
//////////////////////////////////////////////////////////////////////

const p1Abil = () => {
    if (characters[1] === "steve" || characters[1] === "alex") {
        $(".abil").css("visibility", "unset")
    } else if (characters[1] === "zomb") {
        $(".zombAbil").css("visibility", "unset")
    } 
}

const p1Ender = () => {
    if (characters[1] === "ender") {
        $(".enderAbil").css("visibility", "unset")
    }
}

const p2Ender = () => {
    if (characters[3] === "ender") {
        $(".enderAbil2").css("visibility", "unset")
    }
}

const p2Abil = () => {
    if (characters[3] === "steve" || characters[3] === "alex" ) {
        $(".abil2").css("visibility", "unset")
    } else if (characters[3] === "zomb") {
        $(".zombAbil2").css("visibility", "unset")
    } 
}

$(".abil").on("click", ()=>{
    state.player2 = state.player2 -2
    $p2score.text(state.player2)
    $(".abil").css("visibility", "hidden")
})

$(".abil2").on("click", ()=>{
    state.player1 = state.player1 -2
    $p1score.text(state.player1)
    $(".abil2").css("visibility", "hidden")
})

$(".zombAbil").on("click", ()=>{
    state.player2 = state.player2 - 1
    $p2score.text(state.player2)
    state.player1 = state.player1 + 1
    $p1score.text(state.player1)
    $(".zombAbil").css("visibility", "hidden")
})

$(".zombAbil2").on("click", ()=>{
    state.player1 = state.player1 - 1
    $p1score.text(state.player1)
    state.player2 = state.player2 + 1
    $p2score.text(state.player2)
    $(".zombAbil2").css("visibility", "hidden")
})

$(".enderAbil").on("click", ()=> {
    const changed = state.player1
    state.player1 = state.player2
    $p1score.text(state.player1)
    state.player2 = changed
    $p2score.text(state.player2)
    $(".enderAbil").css("visibility", "hidden")
})

$(".enderAbil2").on("click", ()=> {
    const changed = state.player2
    state.player2 = state.player1
    $p2score.text(state.player2)
    state.player1 = changed
    $p1score.text(state.player1)
    $(".enderAbil2").css("visibility", "hidden")
})