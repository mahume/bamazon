# Bamazon
CLI application that acts as an online storefront for purchasing products. 

## Getting Started
Choose how you would like to use the app:
-   [Customer](#customer):
    -   Purchase items
-   [Manager](#manager):
    -   Maintain inventory / Add products
-   [Supervisor](#supervisor):
    -   Maintain departments / View profits

### <a name="customer"></a> Customer
Type the following code into the command line:
```
node bamazonCustomer.js
```
*A table of all current products is displayed with the option to 'Purchase a product' or 'Exit'.*
![](gifs/customer.gif)


#### Purchase a product
1.  Enter the ID# of the product which you would like to purchase.
2.  Select the quantity.

*A receipt of purchase will be displayed and the grand total will be added to the 'Total Sales' column.*
![](gifs/purchase.gif)

3. Errors:
*If there is insufficient stock, you will be notified and prompted again.*
![](gifs/insufficient-qty.gif)
*If the value is not numerical, you will be prompted to re-enter your data.*
![](gifs/invalid-num.gif)

#### Exit
-   A goodbye message will be shown and the app will exit.

### <a name="manager"></a> Manager
1. Type the following code into the command line:
```
node bamazonManager.js
```



### <a name="supervisor"></a> Supervisor
1. Type the following code into the command line:
```
node bamazonSupervisor.js
```


## Built With
* Node.js
* MySQL
* npm
    * [inquirer](https://www.npmjs.com/package/inquirer)
    * [mysql](https://www.npmjs.com/package/mysql)
    * [chalk](https://www.npmjs.com/package/chalk)
    * [dotenv](https://www.npmjs.com/package/dotenv)

## Author
Mike Hume
