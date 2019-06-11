const router = require('koa-router')()
// const controllers = require('../controllers')

router.get('/home', require('../controllers/home'))
router.get('/home/xdxq', require('../controllers/xdxq'))
router.post('/order', require('../controllers/order'))
router.post('/login', require('../controllers/login'))
router.post('/adduser', require('../controllers/adduser'))
module.exports = router
