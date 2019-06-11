const Mysql = require('../tools/mysql')

module.exports = async (ctx) => {
    let data = await Mysql.query("SELECT * FROM guide")
    // console.log(data)
    ctx.body = {
        "code": 1,
        "data": data,
        "mesg": 'ok'
    }
}




