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
                viewProducts()
                break;
            case 'Add to inventory':
                viewProducts()
                break;
            case 'Add new product':
                viewProducts()
                break;
            default:
                break;
        }
    })
}
function viewAllProducts() {
    connect.connection.query(`SELECT * FROM products`, (err, res) => {
        errorHandler(err)
        console.table(res)
    })
}
function viewLowInventory() {
    connect.connection.query(`SELECT * FROM products WHERE ?`, [], (err, res) => {
        errorHandler(err)
        // Show products with a qty lower than 5
    })
}
function addInventory() {
    // Displays prompt to add more of any product in the store
}
function addNewProduct() {
}
function errorHandler(err) {
    if (err) {
        console.log('An error occurred while executing the query')
        throw err
    }
}