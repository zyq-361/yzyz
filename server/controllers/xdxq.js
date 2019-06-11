const Mysql = require('../tools/mysql')
module.exports = async (ctx) => {
    const of_guide = ctx.query.of_guide;
    const querysql = `SELECT * FROM service WHERE of_guide=${of_guide}`;

    let data = await Mysql.query(querysql)
    // console.log(data)
    ctx.body = {
        "code": 1,
        "data": data,
        "mesg": 'ok'
    }
    // data=JSON.parse(JSON.stringify(data));
   


}




