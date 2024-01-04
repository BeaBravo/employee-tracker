// DEPENDENCIES
// const { addDepartment } = require("./lib/document"); //helper functions
const mysql = require("mysql2");

// DATA

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "MySQLpassword",
    database: "employee_db",
  },
  console.log("connected to employee_db")
);

//shows all departments from database employee_db
db.execute(
  "SELECT department.id, department.name AS departmentName FROM department;",
  function (err, results) {
    if (err) {
      console.error(err);
    }
    console.log(results);
  }
);
