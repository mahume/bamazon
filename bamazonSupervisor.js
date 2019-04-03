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
          createDepartment();
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
    }
  );
}
function createDepartment() {}
function errorHandler(err) {
  if (err) {
    console.log('An error occurred while executing the query');
    throw err;
  }
}

// product_sales AS Sales,
// total_profit AS Profit
