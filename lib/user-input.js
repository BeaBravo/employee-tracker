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
            "View All Departments",
            "Add Department",
            "Quit",
          ],
        },
      ])
      .then(({ input }) => input);
  }
  addDepartment() {
    return inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the department?",
          name: "departmentName",
        },
      ])
      .then(({ departmentName }) => departmentName);
  }
  addRole() {
    return inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the role?",
          name: "roleName",
        },
      ])
      .then(({ roleName }) => roleName);
  }
  addSalary() {
    return inquirer
      .prompt([
        {
          type: "input",
          message: "What is the salary of the role?",
          name: "salary",
        },
      ])
      .then(({ salary }) => salary);
  }
  addDepartmentToRole() {}
}

module.exports = TrackerInput;
