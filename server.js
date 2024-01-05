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
