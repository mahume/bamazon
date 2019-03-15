require('dotenv').config()
const mysql = require('mysql')
const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASS,
    database: 'bamazon'
}
const connection = mysql.createConnection(options)
connection.connect(err => {
    if (err) {
        console.error('An error occurred while connecting to the DB')
        throw err
    } 
    console.error(`Connected as: ${connection.threadId}`)
    selectAll()
})
function selectAll() {
    connection.query(`SELECT * FROM products`, (err, res) => {
        if (err) {
            console.error('An error occurred while executing the query')
            throw err
        }
        console.table(res)
        questions()
    })
}
function questions() {
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
        productCheck(answers.item_id, answers.item_qty)
    })
}


function productCheck(id, qty) {
    const query = connection.query(`SELECT * FROM products WHERE item_id=?`, [id], (err, res) => {
        const item_id = parseInt(id, 10)
        const quantity = parseInt(qty, 10)

        if (res[0].stock_quantity >= quantity) {
            console.log('Sufficient stock')
        } else {
            console.log('Insufficient Qty')
        }
    })
}


// connection.end()