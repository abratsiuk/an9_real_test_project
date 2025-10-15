# Test project by Aleksandr Bratsiuk

## Description

Create Web application (Angular + .Net Core):

1. Show the table with the employee’s data: first name, last name, department, manager full name, salary.
2. Implement CRUD (create, update, delete) operations:
   a. Creation of a new employee (including a bundle with a specific department and manager).
   b. Change selected employee data (department, manager, salary, first name, last name).
   c. Removal of an employee (if the employee is a manager - show a message that this employee cannot be deleted).
3. Selection of departments – through a drop-down with all existing departments.
4. Selection of employees – through a drop-down with all existing employees.
5. An employee cannot be a manager of himself.
6. The backend code is written in C# (.NET Core).
7. Client framework: Angular.
8. Based on TestDB (MS SQL Server).

---

## Run Instructions

### Requirements

- **Node.js v14.21.3** (Angular 9 requires Node 14)

### Install Node.js 14.21.3

```bash
nvm install 14.21.3
nvm use 14.21.3
node -v
v14.21.3
```

### Steps

```bash
npm install
npm start
```

Then open:

```
http://localhost:4200
```

---

## Notes

- Tested with Angular CLI 9.1.4 and Node 14.21.3.
- Backend: ASP.NET Core + MS SQL (TestDB).
- Frontend: Angular 9 + Angular Material.
