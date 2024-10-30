
INSERT INTO department (name) VALUES
('Human Resources'),
('Engineering'),
('Sales'),
('Marketing'),
('Finance');

INSERT INTO role (title, salary, department) VALUES
('HR Manager', 70000.00, 1),
('Software Engineer', 90000.00, 2),
('Sales Associate', 50000.00, 3),
('Marketing Specialist', 60000.00, 4),
('Financial Analyst', 65000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Smith', 1, NULL),
('Bob', 'Johnson', 2, 1),
('Charlie', 'Brown', 3, 1),
('David', 'Wilson', 4, 1),
('Eve', 'Davis', 5, 1),
('Frank', 'Miller', 2, 2), 
('Grace', 'Lee', 3, 2);  
