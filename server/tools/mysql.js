const mysql = require('mysql');
const pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'yzyz',
  password : '123456',
  database : 'trip'
});

class Mysql {
    constructor () {

    }
    query (sqllang) {
      return new Promise((resolve, reject) => {
        pool.query(sqllang, function (error, results, fields) {
            if (error) {
                throw error
            };
            resolve(results)
            console.log("query ok!");
            // console.log('The solution is: ', results);
        });
      })
       
    }
}

module.exports = new Mysql()