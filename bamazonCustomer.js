var mysql = require('mysql');


var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bamazon'
});

connection.connect(function(err) {
  if(err) {
    console.log(err);
  }
  console.log('connected as id ' + connection.threadId);
});

 connection.query('SELECT * FROM products',function(err, results){
   if(err){
     console.log(err);
   }
   //console.log(results);
   for(var i=0; i<results.length; i++) {
     console.log('\nitem id: ' + results[i].item_id + '\n' +
                 'name: ' + results[i].product_name + '\n' +
                 'department: ' + results[i].department_name + '\n'+
                 'price: $' + results[i].price + '\n' +
                 'amount available: ' + results[i].stock_quantity + '\n'+
                 '_________________________________________________');
   }
   connection.end();
 });
