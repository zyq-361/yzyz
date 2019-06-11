const axios = require('axios')
const config = require('../config')

module.exports = async (ctx,next) => {
        next();
        const code = ctx.request.body.code;
        var userinfo = ctx.request.body.userinfo;

        const queryString = `appid=${config.appid}&secret=${config.appsecret}&js_code=${code}&grant_type=authorization_code`;
        const wxAPI = `https://api.weixin.qq.com/sns/jscode2session?${queryString}`;

        let data = await axios.get(wxAPI)
                .then(res => {
                        return res.data
                })
                .catch(err => {
                        console.log("axios first use: ",err)
                })    
        let adduser = await axios.post('http://127.0.0.1:6006/adduser',{
                session_key: data.session_key,
                openid: data.openid,
                userinfo: userinfo
        })
        .then(res => {
                return res
        })
        .catch(err => {
                console.log("axios second use: ",err)
        })
        if(adduser){
                // console.log(adduser.data.mesg)
                console.log('query or add openid ok')
        }  
        ctx.body = {
                "code": 1,
                "skey": data.session_key,
                "msg": 'ok'
        }

}        









