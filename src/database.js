const mysql = require("mysql"); // module to connect to mysql

const { promisify }= require('util'); 

//helps to connect to an internet address
const db = mysql.createPool({host: "localhost", 
                            user: "root", 
                            password: "dino", 
                            database: "mysql_express_node"}); 


/* {host: "bjejr7uuy1tzzwwiucvn-mysql.services.clever-cloud.com",
                          user: "u9xxcgsytdiymemv", 
                          password: "i9nwyc96UpKXDSZO7Vrv", 
                          database: "bjejr7uuy1tzzwwiucvn"} */

db.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.');
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has to many connections');
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused');
      }
    }
  
    if (connection) connection.release();
    console.log('DB is Connected');
  
    return;
  });
  
db.query = promisify(db.query);

module.exports = db;