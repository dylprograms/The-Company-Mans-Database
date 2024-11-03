import inquirer from 'inquirer';
import pool from './db.js';
async function mainMenu() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]);
    switch (action) {
        case 'View all departments':
            await viewDepartments();
            break;
        case 'View all roles':
            await viewRoles();
            break;
        case 'View all employees':
            await viewEmployees();
            break;
        case 'Add a department':
            await addDepartment();
            break;
        case 'Add a role':
            await addRole();
            break;
        case 'Add an employee':
            await addEmployee();
            break;
        case 'Update an employee role':
            await updateEmployeeRole();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }
    await mainMenu();
}
async function viewDepartments() {
    const result = await pool.query('SELECT id AS "Department ID", name AS "Department Name" FROM department');
    console.table(result);
}
async function viewRoles() {
    const result = await pool.query(`SELECT role.id AS "Role ID", title AS "Job Title", salary AS "Salary", department.name AS "Department"
     FROM role
     JOIN department ON role.department = department.id`);
    console.table(result);
}
async function viewEmployees() {
    const result = await pool.query(`SELECT employee.id AS "Employee ID", 
            employee.first_name AS "First Name", 
            employee.last_name AS "Last Name", 
            role.title AS "Job Title", 
            department.name AS "Department", 
            role.salary AS "Salary",
            CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager"
     FROM employee
     JOIN role ON employee.role_id = role.id
     JOIN department ON role.department = department.id
     LEFT JOIN employee AS manager ON employee.manager_id = manager.id`);
    console.table(result);
}
async function addDepartment() {
    const { name } = await inquirer.prompt([
        { type: 'input', name: 'name', message: 'Enter the name of the department:' }
    ]);
    await pool.query('INSERT INTO department (name) VALUES (?)', [name]);
    console.log(`Added ${name} to the database.`);
}
async function addRole() {
    const { title, salary, departmentId } = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter the role title:' },
        { type: 'input', name: 'salary', message: 'Enter the salary:' },
        { type: 'input', name: 'departmentId', message: 'Enter the department ID:' }
    ]);
    await pool.query('INSERT INTO role (title, salary, department) VALUES (?, ?, ?)', [title, salary, departmentId]);
    console.log(`Added role ${title} to the database.`);
}
async function addEmployee() {
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'Enter the first name:' },
        { type: 'input', name: 'lastName', message: 'Enter the last name:' },
        { type: 'input', name: 'roleId', message: 'Enter the role ID:' },
        { type: 'input', name: 'managerId', message: 'Enter the manager ID (or leave blank for none):' }
    ]);
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [
        firstName,
        lastName,
        roleId,
        managerId || null
    ]);
    console.log(`Added ${firstName} ${lastName} to the database.`);
}
async function updateEmployeeRole() {
    const { employeeId, newRoleId } = await inquirer.prompt([
        { type: 'input', name: 'employeeId', message: 'Enter the ID of the employee to update:' },
        { type: 'input', name: 'newRoleId', message: 'Enter the new role ID:' }
    ]);
    await pool.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
    console.log('Updated employee role.');
}
mainMenu().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
