// const Mysql = require('../tools/mysql')
const mysql = require('mysql');
const pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'yzyz',
  password : '123456',
  database : 'trip'
});
module.exports = async (ctx,next) => {
    next();
    console.log(ctx.request.body)
    var order = ctx.request.body.order

    const name = order.xingming;
    const tel = order.phonenumber;
    const bg_img = order.bg_img;
    const site = order.placename;
    const price = order.price;
    const date = order.date;
    const others = order.qita;



    const userAddSql = "INSERT INTO  orders(username, tel, bg_img, site, price, date, others) VALUES(?,?,?,?,?,?,?)";
    const userAddSql_Params = [name, tel, bg_img, site, price, date, others];
    await pool.query(userAddSql,userAddSql_Params,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }       
       console.log('-------INSERT----------');
       //console.log('INSERT ID:',result.insertId);       
       console.log('INSERT ID:',result);       
       console.log('#######################'); });
    ctx.body = {
        "code": 1,
        "mesg": 'ok'
    }
}
