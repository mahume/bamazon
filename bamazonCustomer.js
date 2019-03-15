const connect = require('./connect')

const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')

connect.connection.connect(err => {
    if (err) {
        console.error('An error occurred while connecting to the database.')
        throw err
    } 
    console.error(`Connected as: ${connect.connection.threadId}`)
    showAllProducts()
})
function showAllProducts() {
    connect.connection.query(`SELECT * FROM products`, (err, res) => {
        if (err) {
            console.error('An error occurred while executing the query')
            throw err
        }
        console.table(res)
        promptQuestions()
    })
}
function promptQuestions() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'item_id',
            message: `What is the ID# of the product that you'd like to buy?`
        },
        {
            type: 'input',
            name: 'item_qty',
            message: `How many would you like to buy?`
        }
    ])
    .then(answers => {
        checkQty(answers.item_id, answers.item_qty)
    })
}
function checkQty(id, qty) {
    connect.connection.query(`SELECT * FROM products WHERE item_id=?`, [id], (err, res) => {
        const item_id = parseInt(id, 10)
        const quantity = parseInt(qty, 10)

        if (res[0].stock_quantity >= quantity) {
            console.log('Sufficient stock')
            purchaseProduct(item_id, quantity)
        } else {
            console.log('Insufficient Qty')
            promptQuestions()
        }
    })
}
function purchaseProduct(id, qty) {
    connect.connection.query(
        `UPDATE products SET ? WHERE ?`,
        [
            {
                quantity: qty
            },
            {
                item_id: id
            }
        ],
        (err, res) => {
            console.log('Updated')
        })
}
// connection.end()