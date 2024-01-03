// DEPENDENCIES
const inquirer = require("inquirer");

//user input is a class to make it interactive
class TrackerInput {
  constructor() {}
  getInput() {
    return inquirer
      .prompt([
        {
          type: "list",
          message: "What would you like to do?",
          name: "input",
          choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Department",
            "Add Department",
            "Quit",
          ],
        },
      ])
      .then(({ input }) => input);
  }
}

module.exports = TrackerInput;
