/*
PSEUDOCODE:

--- GAMEPLAY ---

START
CALL playGame function
    Play 5 rounds
    Keep track of scores
    Declare overall winner
END


--- COMPUTER CHOICE ---

FUNCTION getComputerChoice()
    GENERATE random number between 1 and 3
    
    IF number is 1 THEN
        RETURN "rock"
    ELSE IF number is 2 THEN
        RETURN "paper"
    ELSE
        RETURN "scissors"
    END IF
END FUNCTION


--- PLAYER CHOICE ---

FUNCTION getHumanChoice()
    PROMPT user "Enter rock, paper, or scissors:"
    STORE user input in variable
    RETURN user input
END FUNCTION


--- SCORES ---

SET humanScore = 0
SET computerScore = 0


--- SINGLE ROUND ---

FUNCTION playRound(humanChoice, computerChoice)
    CONVERT humanChoice to lowercase

    IF humanChoice equals computerChoice THEN
        DISPLAY "It's a tie!"
        // No score change
    
    ELSE IF humanChoice = "rock" AND computerChoice = "scissors" THEN
        DISPLAY "You win! Rock beats Scissors"
        ADD 1 to humanScore
    
    ELSE IF humanChoice = "paper" AND computerChoice = "rock" THEN
        DISPLAY "You win! Paper beats Rock"
        ADD 1 to humanScore
    
    ELSE IF humanChoice = "scissors" AND computerChoice = "paper" THEN
        DISPLAY "You win! Scissors beats Paper"
        ADD 1 to humanScore
    
    ELSE
        // Computer wins
        IF computerChoice = "rock" THEN
            DISPLAY "You lose! Rock beats Scissors"
        ELSE IF computerChoice = "paper" THEN
            DISPLAY "You lose! Paper beats Rock"
        ELSE
            DISPLAY "You lose! Scissors beats Paper"
        END IF
        ADD 1 to computerScore
    END IF
END FUNCTION


--- ENTIRE GAME ---

FUNCTION playGame()
    SET humanScore = 0
    SET computerScore = 0
    
    DISPLAY "Welcome to Rock Paper Scissors!"
    DISPLAY "First to win 3 out of 5 rounds wins!"
    
    // Play 5 rounds
    FOR round 1 to 5
        DISPLAY "Round " + round number
        
        SET humanChoice = CALL getHumanChoice()
        SET computerChoice = CALL getComputerChoice()
        
        DISPLAY "You chose: " + humanChoice
        DISPLAY "Computer chose: " + computerChoice
        
        CALL playRound(humanChoice, computerChoice)
        
        DISPLAY "Current score - You: " + humanScore + ", Computer: " + computerScore
        DISPLAY "---"
    END FOR
    
    // Determine overall winner
    IF humanScore > computerScore THEN
        DISPLAY "You won the game!"
        DISPLAY "Final score - You: " + humanScore + ", Computer: " + computerScore
    ELSE IF computerScore > humanScore THEN
        DISPLAY "Computer wins the game!"
        DISPLAY "Final score - You: " + humanScore + ", Computer: " + computerScore
    ELSE
        DISPLAY "It's a tie!"
        DISPLAY "Final score - You: " + humanScore + ", Computer: " + computerScore
    END IF
END FUNCTION

*/

const getComputerChoice = () => {
  let num = Math.floor(Math.random() * 3) + 1;

  if (num === 1) {
    return "rock";
  } else if (num === 2) {
    return "paper";
  } else {
    return "scissors";
  }
};

const playGame = () => {
  let humanScore = 0;
  let computerScore = 0;
  let currentRound = 1;
  let gameActive = true;

  const resultsDiv = document.getElementById("results");

  const showMessage = (message) => {
    // clear existing content and add new message
    resultsDiv.replaceChildren();
    const paragraph = document.createElement("p");
    paragraph.textContent = message;
    resultsDiv.appendChild(paragraph);
  };

  // create and show a play again button
  const showPlayAgainButton = () => {
    // clear results
    resultsDiv.replaceChildren();

    // final score message
    const finalMessage = document.createElement("p");
    finalMessage.textContent = "Game Over!";
    resultsDiv.appendChild(finalMessage);

    const scoreMessage = document.createElement("p");
    scoreMessage.textContent = `Final Scores - You: ${humanScore}, Computer: ${computerScore}`;
    resultsDiv.appendChild(scoreMessage);

    const resultMessage = document.createElement("p");
    if (humanScore > computerScore) {
      resultMessage.textContent = "Congratulations! You win the game!";
    } else if (computerScore > humanScore) {
      resultMessage.textContent = "Unlucky! The computer wins the game.";
    } else {
      resultMessage.textContent = "It's a draw overall!";
    }
    resultsDiv.appendChild(resultMessage);

    // add play again button
    const playAgainBtn = document.createElement("button");
    playAgainBtn.textContent = "Want to play again?";
    playAgainBtn.addEventListener("click", () => {
      gameActive = true;
      humanScore = 0;
      computerScore = 0;
      currentRound = 1;
      resultsDiv.replaceChildren();
    });
    resultsDiv.appendChild(playAgainBtn);
  };

  // clear the results div to start again
  resultsDiv.replaceChildren();

  const playRound = (humanChoice, computerChoice) => {
    // clear results
    resultsDiv.replaceChildren();

    const messages = [];
    messages.push(`You chose: ${humanChoice}`);
    messages.push(`Computer chose: ${computerChoice}`);

    let roundResult;
    if (humanChoice === computerChoice) {
      roundResult = "It's a tie!";
    } else if (
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "paper" && computerChoice === "rock") ||
      (humanChoice === "scissors" && computerChoice === "paper")
    ) {
      roundResult = `You win this round! ${humanChoice} beats ${computerChoice}`;
      humanScore += 1;
    } else {
      roundResult = `You lose this round! ${computerChoice} beats ${humanChoice}`;
      computerScore += 1;
    }

    messages.push(roundResult);
    messages.push(`Score - You: ${humanScore}, Computer: ${computerScore}`);

    currentRound++;

    // next round message or end game
    if (currentRound <= 5) {
      messages.push(`Ready for Round ${currentRound}? Make your choice!`);
    }

    messages.forEach((message) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = message;
      resultsDiv.appendChild(paragraph);
    });

    // if game is over show results
    if (currentRound > 5) {
      showPlayAgainButton();
    }
  };

  // button listeners
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentRound <= 5 && gameActive) {
        const humanSelection = button.id;
        const computerSelection = getComputerChoice();
        playRound(humanSelection, computerSelection);
      }
    });
  });
};

playGame();