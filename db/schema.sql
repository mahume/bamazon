DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products
(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    product_sales FLOAT(10,2) NOT NULL,
    price FLOAT(10,2) NOT NULL,
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

CREATE TABLE departments
(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs FLOAT(10, 2) NOT NULL,
    PRIMARY KEY (department_id)
);