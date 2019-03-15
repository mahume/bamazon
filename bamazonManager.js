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
            type: 'list'
            name: ''
        }
    ])
    .then(answers => {

    })
}