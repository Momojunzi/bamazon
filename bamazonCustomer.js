
//import libraries
var mysql = require('mysql');
var inquirer = require('inquirer');

//make a function to start the app.
function start(){
  //create a connection to mysql.
  console.log("Welcome to Bamazon!Connecting to the store...");
  setTimeout(function(){
    var connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'bamazon'
    });
    //connect the connection.
    connection.connect(function(err) {
      if(err) {
        console.log(err);
      }
      console.log('connected as id ' + connection.threadId);
    });
    //query the connection for the products table.
     connection.query('SELECT * FROM products',function(err, results){
       if(err){
         console.log(err);
       }
       //loop through the results and print out the formatted results.
       for(var i=0; i<results.length; i++) {
         console.log('\nitem id: ' + results[i].item_id + '\n' +
                     'name: ' + results[i].product_name + '\n' +
                     'department: ' + results[i].department_name + '\n'+
                     'price: $' + results[i].price + '\n' +
                     'amount available: ' + results[i].stock_quantity + '\n'+
                     '_________________________________________________\n');
       }
       //call the funtion to make a purchase.
       getPurchase(connection);
     });
  },1500);
}

  // var connection = mysql.createConnection({
  //   host: 'localhost',
  //   port: 3306,
  //   user: 'root',
  //   password: '',
  //   database: 'bamazon'
  // });
  // //connect the connection.
  // connection.connect(function(err) {
  //   if(err) {
  //     console.log(err);
  //   }
  //   console.log('connected as id ' + connection.threadId);
  // });
  // //query the connection for the products table.
  //  connection.query('SELECT * FROM products',function(err, results){
  //    if(err){
  //      console.log(err);
  //    }
  //    //loop through the results and print out the formatted results.
  //    for(var i=0; i<results.length; i++) {
  //      console.log('\nitem id: ' + results[i].item_id + '\n' +
  //                  'name: ' + results[i].product_name + '\n' +
  //                  'department: ' + results[i].department_name + '\n'+
  //                  'price: $' + results[i].price + '\n' +
  //                  'amount available: ' + results[i].stock_quantity + '\n'+
  //                  '_________________________________________________\n');
  //    }
  //    //call the funtion to make a purchase.
  //    getPurchase(connection);
  //  });


//function to make a purchase.
function getPurchase(connectionName){
  //prompt the user to choose a product to purchase.
  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: '\nEnter the id of the product you would like to buy.\n'
    }
  ]).then (function(answers) {
    //get the result.
    var productId = parseInt(answers.id);
    //query the connection to the database
    connectionName.query('SELECT product_name, price, stock_quantity FROM products WHERE ?',
    {item_id: productId}, function(err, results){
      if(err){
        console.log(err);
      }
      //create some variables to hold the results;
      var productName = results[0].product_name;
      var price = results[0].price;
      var quantityAvailable = results[0].stock_quantity;
      //call function to checkout.
      getPurchaseQuantity(productId, productName, quantityAvailable, price, connectionName );
    });
  });
}

//function to checkout.
function getPurchaseQuantity(id, name, quantity, price, connectionName){
  //ask user how much they want to puechase.
  inquirer.prompt([
    {
      type:'input',
      name: 'purchaseAmount',
      message: "\n\nHow many "+name +"s would you like to purchase?\n"
    }
  ]).then(function(answers){
    //get the result.
    var buyAmount = parseInt(answers.purchaseAmount);
    var newStock;
    switch(true){
      //if the reult is <= the amount in stock.
      case buyAmount <= quantity:
        //update the inventory and charge the customer.
        newStock = quantity - buyAmount;
        connectionName.query('UPDATE products SET stock_quantity='+newStock+' WHERE item_id='+id,
        function(err, results){
          if(err){ console.log(err);}
        });
        var totalCost = buyAmount*price;
        setTimeout(function(){
          console.log('\n_______________________________________________\n'+
          '\n\nYou bought '+buyAmount+ ' '+name + 's.\n'+
          '\nYour total cost for this purchase is $'+totalCost+'\n' +
          "\n_______________________________________________\n");
        },1500);
        //call function to continue shopping or exit
        setTimeout(function(){
          continueOrExit(connectionName);
        },1500);
        break;
      //if the result > the amount in stock.
      case buyAmount > quantity:
        //warn the user
        console.log("Bamazon is sorry but we don't have enough "+name+"s in stock \n"+
                    "Please try a different purchase.\n");
        //restart the app.
        setTimeout(start, 1500);
        break;
    }
  });
}

//function to continue shopping or exit
function continueOrExit(connectionName){
  //prompt the user to continue or to exit
  inquirer.prompt([
    {
      type: 'list',
      name: 'continue',
      message: 'Would you like to continue shopping? -or- Exit?\n',
      choices:['CONTINUE', 'EXIT']
    }
  ]).then(function(answers){
    switch(true){
      //continue shopping.
      case answers.continue === "CONTINUE":
        console.log("Thank you for your purchase.\n Returning to the store...\n"+
        "_____________________________________\n\n");
        //restart the store.
        setTimeout(start, 1500);
        break;
      //exit the app.
      case answers.continue === "EXIT":
      console.log("\nThank you for your purchase.\nCome back soon!\n");
      //end the connection to mysql.
      connectionName.destroy();
    }
  });
}
//start the app.
start();
