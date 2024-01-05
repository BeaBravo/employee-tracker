// DEPENDENCIES
const inquirer = require("inquirer");
const mysql = require("mysql2");

// DATA

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  // MySQL username,
  user: "root",
  // MySQL password
  password: "MySQLpassword",
  database: "employee_db",
});

function getUsersChoice() {
  //getUsersChoice is to prompt the option menu
  const options = [
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
  ];
  return inquirer.prompt(options);
}

async function addDepartment() {
  //addDepartment adds the department the user wants to add using db.query and prompt to get more info from the user
  //get name of the department with a prompt
  const getDepartment = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the department?",
      name: "name",
    },
  ]);

  const department = getDepartment.name;
  db.query(
    "INSERT INTO department (name) VALUES (?);",
    department,
    (err, results) => {
      if (err) {
        console.error(err);
      }
    }
  );
  init(); //runs the prompt again
}

function viewAllDepartments() {
  console.log("want to view all departments");
  //shows all departments from database employee_db
  //   db.query(
  //     "SELECT department.id, department.name AS department_name FROM department;",
  //     function (err, results) {
  //       if (err) {
  //         console.error(err);
  //       }
  //       console.table(results);
  //     }
  //   );
}

function addRole() {
  //prompts to ask the name of the role
  //asks for salary of the role
  //asks which department the role belongs to?
  //will need to call viewAllDepartments to get the most updated list
  console.log("want to add role");
}

function addEmployee() {
  console.log("want to add an employee");
  //asks for first name
  //asks for last name
  //asks for the role
  //asks for the employees manager
}

function viewAllEmployees() {
  console.log("want to view all employees");
  init();
}

function viewAllRoles() {
  console.log("want to view all roles");
}

function updateEmployeeRole() {
  //asks for the employees name from a list
  //asks for the role from a list
  console.log("want to update employee role");
}

async function init() {
  const usersChoice = await getUsersChoice();
  const choice = usersChoice.input; //to handle the object the function returns
  handleUserChoice(choice);
}

function handleUserChoice(choice) {
  if (choice === "Add Department") {
    addDepartment();
  } else if (choice === "View All Departments") {
    viewAllDepartments();
  } else if (choice === "View All Employees") {
    viewAllEmployees();
  } else if (choice === "View All Roles") {
    viewAllRoles();
  } else if (choice === "Add Employee") {
    addEmployee();
  } else if (choice === "Add Role") {
    addRole();
  } else if (choice === "Update Employee Role") {
    updateEmployeeRole();
  } else {
    console.log("I want to quit");
  }
}
//initialize
init();
