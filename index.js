// DEPENDENCIES
const UserInput = require("./lib/user-input");

// DATA
const userInput = new UserInput();

async function getUsersChoice() {
  const choice = await userInput.getInput();

  console.log(choice);
}

getUsersChoice();
