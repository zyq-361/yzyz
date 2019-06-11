const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const config = require('./config')
const router = require('./routes')


const app = new Koa();

// 开启静态资源
app.use(serve(__dirname+'/static/'));


app.use(bodyParser())
// 引入路由分发

app.use(router.routes())


// 启动程序，监听端口
app.listen(config.port);