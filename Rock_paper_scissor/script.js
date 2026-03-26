let userScore = 0;
let compScore = 0;
 
let userScorePara = document.querySelector("#user-score");
let compScorePara = document.querySelector("#comp-score");

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const genCompChoice = () =>{
   // rock,paper,scissor
   const options =["rock","paper","scissor"];
   const ranInd = Math.floor(Math.random()*3);
   return options[ranInd];
}

const drawGame =()=>{
    // console.log("Game is drawn");
    msg.innerText = "Game was drawn.Play Again";
    msg.style.backgroundColor = "#081b31";
}

const showWinner = (userWin,userChoice,compChoice) =>{
    if(userWin)
    {
        // console.log("You win");
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }
    else{
        // console.log("You lose");
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lose!  ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}

const playGame = (userChoice) =>{
  
    // console.log("user choice  =",userChoice);

    const compChoice = genCompChoice();
    // console.log("Computer choice  =",compChoice);

    if(userChoice === compChoice)
    {
        drawGame();     
    }
    else
    {
        let userWin = true;
        if(userChoice === "rock")
        {
            userWin = compChoice === "paper" ? false:true;
        }
        else if(userChoice === "paper")
        {
            userWin = compChoice === "scissor" ? false:true;
        }
        else{
            userWin = compChoice === "rock" ? false:true;
        }
        
      showWinner(userWin,userChoice,compChoice);
    }
};

 
choices.forEach((choice) => {
    // console.log(choice);
    choice.addEventListener("click", () => {

        const userChoice = choice.getAttribute("id");
        // console.log("Choice was clicked",userChoice);
        playGame(userChoice);
    });
})