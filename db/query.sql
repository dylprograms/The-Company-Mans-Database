SELECT id AS "Department ID", name AS "Department Name"
FROM department;

SELECT role.id AS "Role ID", title AS "Job Title", salary AS "Salary", department.name AS "Department"
FROM role
JOIN department ON role.department = department.id;

SELECT employee.id AS "Employee ID", 
       first_name AS "First Name", 
       last_name AS "Last Name", 
       role.title AS "Job Title", 
       department.name AS "Department", 
       role.salary AS "Salary",
       manager.first_name || ' ' || manager.last_name AS "Manager"
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department = department.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id;


