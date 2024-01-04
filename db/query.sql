-- View all employees
-- SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name,' ',manager.last_name) AS Manager
-- FROM employee 
-- JOIN role ON employee.role_id = role.id
-- JOIN department ON role.department_id = department.id
-- LEFT JOIN employee manager ON employee.manager_id = manager.id;

-- View all departments
-- SELECT * FROM department;

-- View all roles
-- SELECT role.id, role.title, department.name AS department, role.salary
-- FROM role
-- JOIN department ON role.department_id = department.id
-- ORDER BY role.id;

-- Add a department
-- INSERT INTO department (name)
-- VALUES ("Service");
-- SELECT * FROM department;

-- Add a role
-- INSERT INTO role (title, salary, department_id)
-- VALUES ("Sales associate", 75000, 5);
-- SELECT * FROM role;