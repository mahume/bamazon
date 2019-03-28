"use strict"

const connect = require('./connect')

const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')

connect.connection.connect(err => {
    if (err) {
        console.log(`An error occured while connecting to the database.`)
        throw err
    }
    console.error(`Connected as: ${connect.connection.threadId}`)
    promptQuestions()
})

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
                'Add new product'
            ]
        }
    ])
    .then(answers => {
        switch (answers.options) {
            case 'View products for sale':
                viewAllProducts()
                break;
            case 'View low inventory':
                viewLowInventory()
                break;
            case 'Add to inventory':
                addInventoryDisplay()
                break;
            case 'Add new product':
                addNewProduct()
                break;
            default:
                break;
        }
    })
}
function returnToMenu() {
    inquirer
    .prompt([
        {
            type: 'confirm',
            name: 'returnToMenu',
            message: 'Would you like to return to the main menu?'
        }
    ])
    .then(answers => {
        if (answers.returnToMenu === true) {
            promptQuestions()
        } else {
            console.log(`Logging out`)
            connect.connection.end()
        }
    })
}
function viewAllProducts() {
    connect.connection.query(`
        SELECT
        item_id AS ID,
        product_name AS Product,
        department_name AS Department,
        CONCAT('$', FORMAT(product_sales, 2)) AS Sales,
        CONCAT('$', FORMAT(price, 2)) AS Price,
        stock_quantity AS 'Quantity in stock'
        FROM products`, 
        (err, res) => {
            errorHandler(err)
            console.table(res)
            returnToMenu()
    })
}
function viewLowInventory() {
    const lowQty = 5
    connect.connection.query(`
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
            errorHandler(err)
            console.table(res)
            returnToMenu()
    })
}
function addInventoryDisplay() {
    connect.connection.query(`
        SELECT
        item_id AS ID,
        product_name AS Product,
        department_name AS Department,
        CONCAT('$', FORMAT(product_sales, 2)) AS Sales,
        CONCAT('$', FORMAT(price, 2)) AS Price,
        stock_quantity AS 'Quantity in stock' 
        FROM products`, 
    (err, res) => {
        errorHandler(err)
        console.table(res)
        addInventoryPrompt()
    })    
}
function addInventoryPrompt(currentQty) {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Which item ID# would you like to add stock quantity to?'
        },
        {
            type: 'input',
            name: 'stock_quantity',
            message: 'How many units would you like to add?'
        }
    ])
    .then(answers => {
        let id = parseInt(answers.item_id)
        let addQty = parseInt(answers.stock_quantity)
        retrieveCurrInventory(id, addQty)
    })
}
function retrieveCurrInventory(id, qty) {
    connect.connection.query(`
        SELECT
        stock_quantity
        FROM products
        WHERE item_id=?`,
        [id],
        (err, res) => {
            let newQty = res[0].stock_quantity + qty
            addInventory(id, newQty)
        })
}
function addInventory(id, qty) {    
    if (Number.isNaN(parseInt(id)) || Number.isNaN(parseInt(qty))) {
        console.log('Please enter a valid numerical number.')
        addInventoryPrompt()
    } else if (parseInt(id) === undefined) {
        console.log(`Please enter a correct ID#.`)
        addInventoryPrompt()
    } else {
        connect.connection.query(`
        UPDATE products
        SET ?
        WHERE ?`,
        [
            {
                stock_quantity: qty
            },
            {
                item_id: id
            }
        ], 
        (err, res) => {
            viewAllProducts()
        })
    }    
}
function addNewProduct() {
}
function errorHandler(err) {
    if (err) {
        console.log('An error occurred while executing the query')
        throw err
    }
}