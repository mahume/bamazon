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
    viewAllProducts()
})
function viewAllProducts() {
    connect.connection.query(`
        SELECT * 
        FROM products`, 
        (err, res) => {
            errorHandler(err)
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
function continueShopping() {
    inquirer
    .prompt([
        {
            type: 'confirm',
            name: 'continueShop',
            message: 'Would you like to continue shopping?'
        }
    ])
    .then(answers => {
        if (answers.continueShop === true) {
            promptQuestions()
        } else {
            console.log(`Thank's for shopping at Bamazon. Come back soon.`)
            connect.connection.end()
        }
    })
}
function checkQty(id, qty) {
    connect.connection.query(`
        SELECT * 
        FROM products 
        WHERE item_id=?`,
        [id], 
        (err, res) => {
            errorHandler(err)
            
            console.log(res[parseInt(id)])

            if (Number.isNaN(parseInt(id)) || Number.isNaN(parseInt(qty))) {
                console.log('Please enter a valid numerical number.')
                promptQuestions()
            } else if (res[0].stock_quantity < qty) {
                console.log(`Uh-oh... Looks like we don't have enough stock to complete your order.`)
                promptQuestions()
            } else {
                const qtyRemaining = res[0].stock_quantity - qty
                console.log(`You're in luck! We've got sufficient stock.`)
                purchaseProduct(id, qty, qtyRemaining)
            }
        }
    )
}
function purchaseProduct(id, qty, qtyRemaining) {
    connect.connection.query(
        `UPDATE products 
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
            errorHandler(err)
        })
    connect.connection.query(
        `SELECT * 
        FROM products 
        WHERE item_id=?`, 
        [id], 
        (err, res) => {
            errorHandler(err)
            const total = res[0].price * qty
            console.log(`
            Receipt:
            ${qty}EA at $${res[0].price}
            Your grand total is $${total}.
            `)
            continueShopping()
        }
    )
}
function errorHandler(err) {
    if (err) {
        console.log('An error occurred while executing the query')
        throw err
    }
}