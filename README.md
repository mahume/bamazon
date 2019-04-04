# Bamazon
CLI application that acts as an online storefront for purchasing products. 

## Getting Started
Through which of the following roles you would like to use the app:
-   [Customer](#customer):      Purchase items
-   [Manager](#manager):        Maintain inventory / Add products
-   [Supervisor](#supervisor):  Maintain departments / View profits

### <a name="customer"></a> Customer
1. Type the following code into the command line:
```
node bamazonCustomer.js
```
*A table of all current products is displayed. With the option to 'Purchase a product' or 'Exit'.*
![](gifs/customer.gif)


2. Purchase a product
-   Enter the item's ID# which you would like to purchase.
-   Select the quantity
*A receipt of purchase will be displayed and the grand total will be added to the 'Total Sales' column.*
![](gifs/purchase.gif)

*If there is insufficient quantity in stock.*
![](gifs/insufficient-qty.gif)

*If either entry is not a numerical value the app will notify you.*
![](gifs/invalid-num.gif)



4. If not errors are found and there is sufficient stock, you will receive a receipt. 

![](gifs/success.gif)


5. You are then able to exit the app

![](gifs/stop-shop.gif)

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
