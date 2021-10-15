# Project 1 Documentation 
## by Kenny Nguyen 

## Introduction

My project is a trivia game based upon the popular video game, Minecraft. In this project, I included a culmination of 20 questions relating to Minecraft and four possible answers for each. In addition, there are many elements inspired by Minecraft in the trivia game as well. Users are given the chance to pick their character before they begin the game. Doing so, not only, allows you to have your chosen character at the bottom of your screen at the scoreboard, but also grants special abilities. 

## Technologies Used 

- HTML
- CSS
- JavaScript
- jQuery

# Challenges

### Doing CSS

 - Had some trouble trying to move things exactly where I wanted them while also being completely responsive for smaller screens.

 - Utilizing media queries, I was able to move things where I wanted for one screen size and and one for another. However, most of the things were able to translate and be responsive without needing to make a whole new style for each item. 
 
 - I needed some divs to take up the entire screen for parts of my game like the character selection screen and the end game screen. To do this, you can use z-index or position absolute. I used position absolute as it just seemed to work for me. 

### Doing JavaScript

 - I did not find a lot of struggle in making the trivia game itself work. I had to first grab the elements from the API I created on Contentful and place them into an array where I can grab things and set rules from. Such as what answer matches the correct answer. 

 - I did, however, find some struggle in making the components of the game outside of the trivia game part. My character selection screen was simple as I just had to give the event target to an array that would equate to what each player had chosen. However, making them have the special abilities was much more difficult as I had to create many functions and rules to get them to apply. There were a lot of if statements that were intended to find what character the player was using and how many points they had. This is because the abilities would be unlocked depending on how many points the player had. 

 - Making the game indicate who's turn it was was something I struggled with for much longer than I would have liked. I spend a long time making bunch of functions but I later realized after spending some time off of it that I could just include it into the chooseAnswer function rather than try to create a whole new section. 
```js
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
```

## Media Queries

For my mobile design, I went for a more vertical design with the entire site. Each section: Header, Question, Answers, and Scores, were stacked on top of each other in the mobile version to avoid squishing of words. Each answer was one on top of the other as opposed to the 2x2 design for a desktop site. I made the widths of all the blocks appear to be the same as well so it appears to be more streamline. 

## Animations 

For some of the elements in my project, I applied some animation to them to help defer the clunky and sudden feeling of just clicking something and it instantly changing to something else. I made it so that when you hover over your character you want to select, it does a subtle scaling animation to look larger. This was also applied to each of the possible questions and abilities. 

My code looked like this: 
```css
transition: transform 0.2s;
transform: scale(1.2);
```

## Design 

I went for a very "Minecraft" look for the game. All of the font is in the same font that is from Minecraft itself as well as some of the backgrounds of elements being textures from the game. For example, each of the answers are a wooden plank texture from the game. In addition, the background I chose for the game was a cinematic screen capture from the game. 

### Characters and their Abilities 

| Column1  | Column2                  | Column 3                      | 
|----------|--------------------------|-------------------------------|
| Steve    | Enchanted Diamond Sword  | Removes two points from enemy |
| Alex     | Enchanted Diamond Sword  | Removes two points from enemy |
| Zombie   | Enchanted Iron Shovel    | Steals point from enemy       |
| Enderman | Eye of Ender             | Swaps points with enemy       |

 - All characters besides Enderman require having a multiple of 2 points to activate their abilities. Enderman, however, requires 3. 

 ## Character Selection Screen

 I made the character selection screen take up the entire page and show the four characters in the game. Also, I made it so that the code would detect when the first player had chose and move onto the next player. Then, after 2 characters are chosen, the game's play button appears and the text changes to "Press Play!". Each character has an upscaling animation and a border highlight when hovered on and selected. 

 ## Trivia Game Screen

 Here, the game's layout has four sections. 
  - There is first the header with the title of the game. 
  
  - Then, there is the question that changes upon answering a question. This was done through a randomizer using: 
 ```js
const setBoard = (q) => {
    // Getting a random question 
    const randomIndex = Math.floor(Math.random() * q.length)
    const randomQuestion = q[randomIndex];
 ```
 - This here is grabbing a random number up to the length of the array of questions and answers and placing that number into the index to create a random question to put onto the screen.

 - Next, there are the answers that came along with the random questions from before as they are connected by being an object. Here, the code knows what is the right answer by checking if the event target is the same as the answer in the object. 

 - Lastly, we have the score, character, and special ability. The score is kept by adding one point to the counter each time someone gets the answer right. Also, there is an indicator for who's turn it is by switching turns and changing the name to green.  