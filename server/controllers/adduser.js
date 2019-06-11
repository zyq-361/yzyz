const mysql = require('mysql');
const pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'yzyz',
  password : '123456',
  database : 'trip'
});
module.exports = async (ctx, next) => {
    next();
    let reqdata = ctx.request.body;

    const skey = reqdata.session_key;
    const openid = reqdata.openid;
    const nickname = reqdata.userinfo.nickName; 
    const avatarURL = reqdata.userinfo.avatarUrl;

    const querysql = `SELECT * FROM users WHERE openid=?`;
    const userAddSql = "INSERT INTO  users(openid, session_key, nickname, avatarURL) VALUES(?,?,?,?)";
    const userAddSql_Params = [openid, skey, nickname, avatarURL];
    if(openid){
        await pool.query(querysql, [openid], (err, result) => {
            if(err){
                console.log('[QUERY ERROR] - ',err.message);
                return;
            }
            if(result[0]){
                console.log("query openid result: ",result[0].openid);
            }else{
                console.log("new user, is now adding")
                pool.query(userAddSql,userAddSql_Params,function (err, result) {
                    if(err){
                        console.log('[INSERT ERROR] - ',err.message);
                        return;
                    }       
                    console.log('-------INSERT----------');   
                    console.log('INSERT ID:',result);       
                    console.log('#######################'); 
                });
            }
        })
    }
    ctx.body = {
        "code": 1,
        "mesg": 'ok'
    }
}