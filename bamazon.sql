DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('rock', 'outdoor products', 1.55, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('chair', 'furniture', 50.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('stick', 'outdoor products', 2.55, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('car', 'automotive', 35000.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('golf club', 'sporting goods', 50.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('pen', 'office supply', 1.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('pencil', 'office supply', 0.50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('frying pan', 'kitchen goods', 25.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('stock pot', 'kitchen goods', 40.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('desk', 'furniture', 1.55, 10);

SELECT * FROM products
