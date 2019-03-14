const mysql = require('mysql')
const inquirer = require('inquirer')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 1337,
    user: 'root',
    password: '',
    database: 'bamazon'
})
connection.connect(function(err) {
    if (err) throw err
    console.log(`Connected as: ${connection.threadId}`)
    afterConnection()
}
function afterConnection() {
    connection.query(`SELECT * FROM products`, function(err, res) {
        if (err) throw err
        console.log(res)
        connection.end()
    })
}


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