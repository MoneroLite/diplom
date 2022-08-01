const Router = require('express')
const DashedController = require('../controllers/DashedController')


const router = new Router()

router.get('/catpostcount', DashedController.getCategoryPostCount)


module.exports = router