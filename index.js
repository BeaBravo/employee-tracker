// DEPENDENCIES
const inquirer = require("inquirer");
const mysql = require("mysql2");

// DATA
let allDepartments = [];
let allRoles = [];
let allEmployees = [];

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

function viewAllRoles() {
  //viewAllRoles shows all roles from database employee_db

  db.query(
    `SELECT role.id, role.title, department.name AS department, role.salary
  FROM role
  JOIN department ON role.department_id = department.id
  ORDER BY role.id;`,
    function (err, results) {
      if (err) {
        console.error(err);
      } else {
        console.table(results);
        saveAllRoles(results);
      }
    }
  );
  init(); //runs the prompt again
}

function saveAllRoles(roles) {
  allRoles = roles;
  //   console.log(allRoles);
}

async function addEmployee() {
  //manipulate choices for the options
  let roleChoices = [];
  for (let i = 0; i < allRoles.length; i++) {
    roleChoices[i] = allRoles[i].title;
  }

  let managerChoices = ["none"];
  for (let i = 0; i < allEmployees.length; i++) {
    managerChoices.push(
      allEmployees[i].first_name + " " + allEmployees[i].last_name
    );
  }

  //prompt the user for the necessary info
  const employeeInfo = await inquirer.prompt([
    {
      type: "input",
      message: "What is the employee's first name?",
      name: "firstName",
    },
    {
      type: "input",
      message: "What is the employee's last name?",
      name: "lastName",
    },
    {
      type: "list",
      message: "What is the employee's role?",
      name: "role",
      choices: roleChoices,
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      name: "manager",
      choices: managerChoices,
    },
  ]);
  // console.log(employeeInfo);

  //find the role_id that the user chose
  var roleId;
  for (let i = 0; i < allRoles.length; i++) {
    if (employeeInfo.role === allRoles[i].title) {
      roleId = allRoles[i].id;
    }
  }

  //find the manager the user chose
  var managerId;
  for (let i = 0; i < allEmployees.length; i++) {
    const managerName =
      allEmployees[i].first_name + " " + allEmployees[i].last_name;
    if (employeeInfo.manager === managerName) {
      managerId = allEmployees[i].id;
    }
  }

  //add new employee to db
  db.query(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?);",
    [employeeInfo.firstName, employeeInfo.lastName, roleId, managerId],
    (err, results) => {
      if (err) {
        console.error(err);
      }
    }
  );
  init();
}

function viewAllEmployees() {
  //displays all employees

  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name,' ',manager.last_name) AS Manager
  FROM employee 
  JOIN role ON employee.role_id = role.id
  JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager ON employee.manager_id = manager.id;`,
    function (err, results) {
      if (err) {
        console.error(err);
      } else {
        console.table(results);
        saveAllEmployees(results);
      }
    }
  );
  init();
}

function saveAllEmployees(employeesList) {
  allEmployees = employeesList;
  //   console.log(allEmployees);
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
