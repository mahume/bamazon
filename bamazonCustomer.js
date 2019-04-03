const inquirer = require('inquirer');
const connection = require('./connection');

connection.connect(err => {
  if (err) {
    console.error('An error occurred while connecting to the database.');
    throw err;
  }
  console.error(`Connected as: ${connection.threadId}`);
  viewAllProducts();
});
function viewAllProducts() {
  connection.query(
    `
        SELECT
            item_id AS ID,
            product_name AS Product,
            department_name AS Department,
            CONCAT('$', FORMAT(product_sales, 2)) AS 'Total Sales',
            CONCAT('$', FORMAT(price, 2)) AS Price,
            stock_quantity AS 'Quantity in stock'
        FROM products`,
    (err, res) => {
      errorHandler(err);
      console.table(res);
      promptPurchaseOrExit();
    }
  );
}
function promptPurchaseOrExit() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'options',
        message: `What would you like to do?`,
        choices: ['Purchase a product', 'Exit'],
      },
    ])
    .then(answers => {
      if (answers.options === 'Purchase a product') {
        promptPurchaseQuestions();
      } else {
        process.exit();
      }
    });
}
function promptPurchaseQuestions() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'item_id',
        message: `What is the ID# of the product that you'd like to buy?`,
      },
      {
        type: 'input',
        name: 'item_qty',
        message: `How many would you like to buy?`,
      },
    ])
    .then(answers => {
      checkQty(answers.item_id, answers.item_qty);
    });
}
function continueShopping() {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'continueShop',
        message: 'Would you like to return to the main menu?',
      },
    ])
    .then(answers => {
      if (answers.continueShop === true) {
        viewAllProducts();
      } else {
        console.log(`Thank's for shopping at Bamazon. Come back soon.`);
        connection.end();
      }
    });
}
function checkQty(id, qty) {
  connection.query(
    `
        SELECT * 
        FROM products 
        WHERE item_id=?`,
    [id],
    (err, res) => {
      errorHandler(err);

      console.log(res[parseInt(id)]);

      if (Number.isNaN(parseInt(id)) || Number.isNaN(parseInt(qty))) {
        console.log('Please enter a valid numerical number.');
        promptQuestions();
      } else if (res[0].stock_quantity < qty) {
        console.log(
          `Uh-oh... Looks like we don't have enough stock to complete your order.`
        );
        promptQuestions();
      } else {
        const qtyRemaining = res[0].stock_quantity - qty;
        console.log(`You're in luck! We've got sufficient stock.`);
        purchaseProduct(id, qty, qtyRemaining);
      }
    }
  );
}
function purchaseProduct(id, qty, qtyRemaining) {
  connection.query(
    `
        UPDATE products 
        SET ? 
        WHERE ?`,
    [
      {
        stock_quantity: qtyRemaining,
      },
      {
        item_id: id,
      },
    ],
    (err, res) => {
      errorHandler(err);
    }
  );
  connection.query(
    `
        SELECT * 
        FROM products 
        WHERE item_id=?`,
    [id],
    (err, res) => {
      errorHandler(err);
      const { price } = res[0];
      const total = price * qty;
      const currentTotalSales = res[0].product_sales;
      const priceStyled = formatNumber(price);
      const totalStyled = formatNumber(total);
      console.log(`
            Receipt:
            Quantity: ${qty}EA 
            Unit Price: $${priceStyled}
            Grand total: $${totalStyled}.
            `);
      increaseProductSales(currentTotalSales, total, id);
    }
  );
}
function formatNumber(number) {
  const numTruncated = number.toFixed(2);
  return numTruncated.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function increaseProductSales(currentTotalSales, thisTotalSale, id) {
  const newTotalSales = currentTotalSales + thisTotalSale;
  const newTotalStyled = formatNumber(newTotalSales);
  connection.query(
    `
        UPDATE products
        SET ?
        WHERE ?`,
    [
      {
        product_sales: newTotalStyled,
      },
      {
        item_id: id,
      },
    ]
  );
  continueShopping();
}
function errorHandler(err) {
  if (err) {
    console.log('An error occurred while executing the query');
    throw err;
  }
}
