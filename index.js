// DEPENDENCIES
const inquirer = require("inquirer");
const mysql = require("mysql2");

// DATA
const userInput = new UserInput();

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  // MySQL username,
  user: "root",
  // MySQL password
  password: "MySQLpassword",
  database: "employee_db",
});

async function getUsersChoice() {
  //getUsersChoice is to prompt the option menu
}

function addDepartment(department) {
  //addDepartment adds the department the user wants to add using db.query
  db.query(
    "INSERT INTO department (name) VALUES (?);",
    department,
    (err, results) => {
      if (err) {
        console.error(err);
      }
    }
  );
}

function viewAllDepartments() {
  //shows all departments from database employee_db
  db.query(
    "SELECT department.id, department.name AS department_name FROM department;",
    function (err, results) {
      if (err) {
        console.error(err);
      }
      console.table(results);
    }
  );
}

function addRole() {
  //prompts to ask the name of the role
  //asks for salary of the role
  //asks which department the role belongs to?
  //will need to call viewAllDepartments to get the most updated list
}

function addEmployee() {
  //asks for first name
  //asks for last name
  //asks for the role
  //asks for the employees manager
}

function viewAllEmployees() {}

function viewAllRoles() {}

function updateEmployeeRole() {
  //asks for the employees name from a list
  //asks for the role from a list
}

async function init() {
  // const choice;

  if (choice == "Add Department") {
    const departmentName = await userInput.addDepartment();
    addDepartment(departmentName);
    return;
  } else if (choice == "View All Departments") {
    viewAllDepartments();
    return;
  }
}

//initialize
init();
