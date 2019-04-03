const inquirer = require('inquirer');
const connection = require('./connection');

promptQuestions();
function promptQuestions() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'options',
        message: 'Select a command',
        choices: ['View products sales by department', 'Create new department'],
      },
    ])
    .then(answers => {
      switch (answers.options) {
        case 'View products sales by department':
          viewSalesByDepartment();
          break;
        case 'Create new department':
          createDepartmentPrompt();
          break;
        default:
          break;
      }
    });
}
function viewSalesByDepartment() {
  connection.query(
    `
    SELECT
        departments.department_id AS ID,    
        departments.department_name AS Department,
        CONCAT('$', FORMAT(departments.over_head_costs, 2)) AS 'Overhead Costs',
        CONCAT('$', FORMAT(SUM(products.product_sales), 2)) AS Sales,
        CONCAT('$', FORMAT(departments.over_head_costs - SUM(products.product_sales), 2)) AS 'Total Profit'
    FROM departments
    LEFT JOIN products
    ON departments.department_name = products.department_name
    GROUP BY departments.department_id`,
    [],
    (err, res) => {
      errorHandler(err);
      console.table(res);
      returnToMenu();
    }
  );
}
function errorHandler(err) {
  if (err) {
    console.log('An error occurred while executing the query');
    throw err;
  }
}
function returnToMenu() {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'returnToMenu',
        message: 'Would you like to return to the main menu?',
      },
    ])
    .then(answers => {
      if (answers.returnToMenu === true) {
        promptQuestions();
      } else {
        console.log(`Logging out`);
        connection.end();
      }
    });
}
function createDepartmentPrompt() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department_name',
        message: `Please enter a department name.`,
      },
      {
        type: 'input',
        name: 'over_head_costs',
        message: `Please enter the department's total overhead costs.`,
      },
    ])
    .then(answers => {
      const departmentName = answers.department_name;
      const overheadCosts = answers.over_head_costs;
      addNewDepartment(departmentName, overheadCosts);
    });
}
function addNewDepartment(departmentName, overheadCosts) {
  connection.query(
    `
        INSERT INTO departments 
        SET ?`,
    {
      department_name: departmentName,
      over_head_costs: overheadCosts,
    },
    (err, res) => {
      viewSalesByDepartment();
    }
  );
}
