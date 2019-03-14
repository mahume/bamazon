require('dotenv').config()
const mysql = require('mysql')
const inquirer = require('inquirer')

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
        console.log(res)
        connection.end()
    })
}

/*
inquirer
.prompt([
    {
        type: 'input',
        name: 'item',
        message: 'Enter the ID# of the item you would you like to buy.',
        choices: [

        ]
    },
    {
        type: 'input',
        name: 'quantity',
        message: 'How many would you like to buy?',
        default: 1
    }
])
.then(answers => {

})
*/