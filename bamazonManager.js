const inquirer = require('inquirer');
const connection = require('./connection');

connection.connect(err => {
  if (err) {
    console.log(`An error occured while connecting to the database.`);
    throw err;
  }
  console.error(`Connected as: ${connection.threadId}`);
  promptQuestions();
});

function promptQuestions() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'options',
        message: 'Select a command',
        choices: [
          'View products for sale',
          'View low inventory',
          'Add to inventory',
          'Add new product',
          'Exit',
        ],
      },
    ])
    .then(answers => {
      switch (answers.options) {
        case 'View products for sale':
          viewAllProducts();
          break;
        case 'View low inventory':
          viewLowInventory();
          break;
        case 'Add to inventory':
          addInventoryDisplay();
          break;
        case 'Add new product':
          addNewProductPrompt();
          break;
        case 'Exit':
          console.log('Goodbye');
          process.exit();
          break;
        default:
          break;
      }
    });
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
function viewAllProducts() {
  connection.query(
    `
        SELECT
            item_id AS ID,
            product_name AS Product,
            department_name AS Department,
            CONCAT('$', FORMAT(product_sales, 2)) AS Sales,
            CONCAT('$', FORMAT(price, 2)) AS Price,
            stock_quantity AS 'Quantity in stock'
        FROM products`,
    (err, res) => {
      errorHandler(err);
      console.table(res);
      returnToMenu();
    }
  );
}
function viewLowInventory() {
  const lowQty = 5;
  connection.query(
    `
        SELECT
            item_id AS ID,
            product_name AS Product,
            department_name AS Department,
            CONCAT('$', FORMAT(product_sales, 2)) AS Sales,
            CONCAT('$', FORMAT(price, 2)) AS Price,
            stock_quantity AS 'Quantity in stock' 
        FROM products 
        WHERE stock_quantity<?`,
    [lowQty],
    (err, res) => {
      errorHandler(err);
      console.table(res);
      returnToMenu();
    }
  );
}
function addInventoryDisplay() {
  connection.query(
    `
        SELECT
            item_id AS ID,
            product_name AS Product,
            department_name AS Department,
            CONCAT('$', FORMAT(product_sales, 2)) AS Sales,
            CONCAT('$', FORMAT(price, 2)) AS Price,
            stock_quantity AS 'Quantity in stock' 
        FROM products`,
    (err, res) => {
      errorHandler(err);
      console.table(res);
      addInventoryPrompt();
    }
  );
}
function addInventoryPrompt(currentQty) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'item_id',
        message: 'Which item ID# would you like to add stock quantity to?',
      },
      {
        type: 'input',
        name: 'stock_quantity',
        message: 'How many units would you like to add?',
      },
    ])
    .then(answers => {
      const id = parseInt(answers.item_id);
      const addQty = parseInt(answers.stock_quantity);
      retrieveCurrInventory(id, addQty);
    });
}
function retrieveCurrInventory(id, qty) {
  connection.query(
    `
        SELECT
            stock_quantity
        FROM products
        WHERE item_id=?`,
    [id],
    (err, res) => {
      const newQty = res[0].stock_quantity + qty;
      addInventory(id, newQty);
    }
  );
}
function addInventory(id, qty) {
  if (Number.isNaN(parseInt(id)) || Number.isNaN(parseInt(qty))) {
    console.log('Please enter a valid numerical number.');
    addInventoryPrompt();
  } else if (parseInt(id) === undefined) {
    console.log(`Please enter a correct ID#.`);
    addInventoryPrompt();
  } else {
    connection.query(
      `
        UPDATE products
        SET ?
        WHERE ?`,
      [
        {
          stock_quantity: qty,
        },
        {
          item_id: id,
        },
      ],
      (err, res) => {
        viewAllProducts();
      }
    );
  }
}
function addNewProductPrompt() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'product_name',
        message: `Please enter a product name.`,
      },
      {
        type: 'input',
        name: 'department_name',
        message: `Please enter a department name.`,
      },
      {
        type: 'input',
        name: 'unit_price',
        message: `Please enter the product's price per unit.`,
      },
      {
        type: 'input',
        name: 'stock_quantity',
        message: `Please enter the stock quantity to create.`,
      },
    ])
    .then(answers => {
      const productName = answers.product_name;
      const departmentName = answers.department_name;
      const unitPrice = answers.unit_price;
      const stockQty = answers.stock_quantity;
      addNewProduct(productName, departmentName, unitPrice, stockQty);
    });
}
function addNewProduct(product, department, price, qty) {
  connection.query(
    `
        INSERT INTO products 
        SET ?`,
    {
      product_name: product,
      department_name: department,
      product_sales: 0.0,
      price,
      stock_quantity: qty,
    },
    (err, res) => {
      viewAllProducts();
    }
  );
}
function errorHandler(err) {
  if (err) {
    console.log('An error occurred while executing the query');
    throw err;
  }
}
