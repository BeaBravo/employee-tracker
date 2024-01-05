// DEPENDENCIES
const inquirer = require("inquirer");
const mysql = require("mysql2");

// DATA
let allDepartments = [];

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
  // viewAllDepartments shows all departments from database employee_db

  db.query(
    "SELECT department.id, department.name AS department_name FROM department;",
    function (err, results) {
      if (err) {
        console.error(err);
      } else {
        console.table(results);
        saveAllDepartments(results);
      }
    }
  );

  init(); //runs the prompt again
}

function saveAllDepartments(departments) {
  //assigns departments to global variable. This is used in the viewAllDepartments() function
  allDepartments = departments;
}

async function addRole() {
  //manipulate allDepartment array to get choices for the prompt
  let departmentChoices = [];
  for (let i = 0; i < allDepartments.length; i++) {
    departmentChoices[i] = allDepartments[i].department_name;
  }
  //prompt the user for more info on the role
  const role = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the role?",
      name: "name",
    },
    {
      type: "input",
      message: "What is the salary of the role?",
      name: "salary",
    },
    {
      type: "list",
      message: "Which department does the role belong to?",
      name: "department",
      choices: departmentChoices,
    },
  ]);

  //grab the role id depending on the userschoice of department
  var roleId;
  for (let i = 0; i < allDepartments.length; i++) {
    if (role.department === allDepartments[i].department_name) {
      roleId = allDepartments[i].id;
    }
  }

  //db.query to add the role to the db
  db.query(
    "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);",
    [role.name, role.salary, roleId],
    (err, results) => {
      if (err) {
        console.error(err);
      }
    }
  );
  init(); //runs the prompt again
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
