const mysql = require('mysql2/promise');



var mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Sonu@2475',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10,
  debug: true
});

// mysqlConnection.on('error', function(err) {
//     console.error('MySQL Pool Error:', err);
//   });


mysqlConnection.getConnection((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
    // console.log(err)
        console.log('DB connection failed \n Error :'); // + JSON.stringify(err, undefined, 2));
});

module.exports = mysqlConnection;   