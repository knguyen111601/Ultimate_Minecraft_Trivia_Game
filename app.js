//////////////////////////////////////////////////////////////////////
// APP STATE
//////////////////////////////////////////////////////////////////////
let characters = []
const state = {
    player1Char: characters[0],
    player2Char: characters[1],
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
            $("#end").append(characters[1])
        } else {
            $("#end").append($("<h1>")).text("It is a tie!").addClass("endText")
            $("#end").append(characters[0])
            $("#end").append(characters[1])
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
    characters.push(event.target)
    $(event.target).css("border", "2px solid white")
    console.log(characters)
    if (characters.length === 2) {
        $("#charSelect").append($("<button>").text("Play!").addClass("play"));
    }
    $(".play").on("click", ()=>{
        $("#player1").append(characters[0]);
        $("#player2").append(characters[1]);
        $(".chars").css("border", "none")
        $("#charSelect").remove();
    })
})

