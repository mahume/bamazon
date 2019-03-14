DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products
(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price FLOAT(7,2) NOT NULL,
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Pillow', 'Home', 13.00, 15),
        ('USB Drive', 'Electronics', 9.99, 60),
        ('Rug', 'Home', 79.99, 3),
        ('Pens', 'Office', 11.25, 40),
        ('Wine Glass', 'Kitchen', 8.00, 20),
        ('Television', 'Electronics', 598.00, 10),
        ('Paper Plates', 'Kitchen', 13.48, 15),
        ('Milk', 'Grocery', 1.99, 40),
        ('Leather Couch', 'Home Decor', 1250, 2),
        ('Eye Liner', 'Personal Care', 5.97, 20);