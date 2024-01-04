// DEPENDENCIES
const UserInput = require("./lib/user-input");
// const { addDepartment } = require("./lib/document"); //helper functions
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
  const choice = await userInput.getInput();

  if (choice == "Add Department") {
    const departmentName = await userInput.addDepartment();
    addDepartment(departmentName);
    return;
  } else if (choice == "View All Departments") {
    viewAllDepartments();
    return;
  }
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

//initialize
getUsersChoice();
