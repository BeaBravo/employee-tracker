const allDepartments = [
  { id: 1, department_name: "Engineering" },
  { id: 2, department_name: "Finance" },
  { id: 3, department_name: "Legal" },
  { id: 4, department_name: "Sales" },
  { id: 5, department_name: "Service" },
  { id: 6, department_name: "Human Resources" },
];

// let formattedDepartments = [];
// for (let i = 0; i < allDepartments.length; i++) {
//   formattedDepartments[i] = allDepartments[i].department_name;
// }
// console.log(formattedDepartments);

var roleId = 0;
for (let i = 0; i < allDepartments.length; i++) {
  if ("Human Resources" === allDepartments[i].department_name) {
    roleId = allDepartments[i].id;
  }
}
console.log(roleId);

const allRoles = [
  { id: 1, title: "Sales Lead", department: "Sales", salary: "100000" },
  { id: 2, title: "Salesperson", department: "Sales", salary: "80000" },
  {
    id: 3,
    title: "Lead Engineer",
    department: "Engineering",
    salary: "150000",
  },
  {
    id: 4,
    title: "Software Engineer",
    department: "Engineering",
    salary: "125000",
  },
  {
    id: 5,
    title: "Account Manager",
    department: "Finance",
    salary: "160000",
  },
  {
    id: 6,
    title: "Accountant",
    department: "Finance",
    salary: "125000",
  },
  {
    id: 7,
    title: "Legal Team Lead",
    department: "Legal",
    salary: "250000",
  },
  { id: 8, title: "Lawyer", department: "Legal", salary: "190000" },
  {
    id: 9,
    title: "HR associate",
    department: "Human Resources",
    salary: "130000",
  },
];
