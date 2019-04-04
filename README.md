# Bamazon

## About
CLI application that acts as an online storefront for purchasing products. 

## Getting Started
Choose how you would like to use the app:
-   [Customer](#customer):
    -   Purchase items
-   [Manager](#manager):
    -   Maintain inventory / Add products
-   [Supervisor](#supervisor):
    -   Maintain departments / View profits

___
### <a name="customer"></a> Customer
Type the following code into the command line:
```
node bamazonCustomer.js
```
*A list of actionable options will be provided.*
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

___
### <a name="manager"></a> Manager
Type the following code into the command line:
```
node bamazonManager.js
```
*A list of actionable options will be provided.*
![](gifs/manager.gif)

#### View products for sale
![](gifs/manager-view-products.gif)

#### View low inventory
*Products with a stock quantity below 5 will be shown.*
![](gifs/manager-low-inventory.gif)

#### Add to inventory
1.  Enter the ID# of the product to which you would like to add stock.
2.  Enter the quantity.

![](gifs/manager-add-inventory.gif)

#### Add new product
1.  Enter the product name.
2.  Enter the department name.
3.  Enter the product's price per unit.
4.  Enter the quantity of stock to add.

![](gifs/manager-add-product.gif)

#### Exit
-   A goodbye message will be shown and the app will exit.

___
### <a name="supervisor"></a> Supervisor
Type the following code into the command line:
```
node bamazonSupervisor.js
```
*A list of actionable options will be provided.*
![](gifs/supervisor.gif)

#### View products for sale by department.

![](gifs/supervisor-view-products.gif)

#### Add new product
1.  Enter the product name.
2.  Enter the department name.
3.  Enter the product's price per unit.
4.  Enter the quantity of stock to add.

![](gifs/manager-add-product.gif)

#### Exit
-   A goodbye message will be shown and the app will exit.


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
