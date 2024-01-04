// DEPENDENCIES
const UserInput = require("./lib/user-input");
const { addDepartment } = require("./lib/document"); //helper functions

// DATA
const userInput = new UserInput();

async function getUsersChoice() {
  const choice = await userInput.getInput();

  if (choice == "Add Department") {
    const departmentName = await userInput.addDepartment();
    console.log(departmentName);
  }
}

getUsersChoice();
