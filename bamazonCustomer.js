"use strict"

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
        SELECT
        item_id AS ID,
        product_name AS Product,
        department_name AS Department,
        product_sales AS Sales,
        CONCAT('$', FORMAT(price, 2)) AS Price,
        stock_quantity AS 'Quantity in stock'
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
            viewAllProducts()
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
                stock_quantity: qtyRemaining
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
            let price = res[0].price
            let total = price * qty
            let priceStyled = formatNumber(price)
            let totalStyled = formatNumber(total)
            console.log(`
            Receipt:
            Quantity: ${qty}EA 
            Unit Price: $${priceStyled}
            Grand total: $${totalStyled}.
            `)
            continueShopping()
        }
    )
}
function formatNumber(number) {
    const numTruncated = number.toFixed(2)
    return numTruncated.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function errorHandler(err) {
    if (err) {
        console.log('An error occurred while executing the query')
        throw err
    }
}