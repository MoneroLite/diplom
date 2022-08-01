const Router = require('express')
const settingsController = require('../controllers/settingsController')


const router = new Router()

router.post('/', settingsController.getInfo)
router.put('/updateinfo', settingsController.updateInfo)
router.put('/updateuser', settingsController.updateUser)
router.put('/updateimg', settingsController.settingsUpdateImg)

module.exports = router