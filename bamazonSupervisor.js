"use strict"

const connect = require('./connect')

const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')

function promptQuestions() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'options',
            message: 'Select a command',
            choices: [
                'View products sales by department',
                'Create new department'
            ]
        }
    ])
    .then(answers => {
        switch (answers.options) {
            case 'View products sales by department':
                salesByDepartment()
                break;
            case 'Create new department':
                createDepartment()
                break;
            default:
                break;
        }
    })
}
function salesByDepartment() {

}
function createDepartment() {
    
}