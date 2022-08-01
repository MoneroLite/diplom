const Router = require('express')
const profileController = require('../controllers/profileController')

const router = new Router()

router.get('/:id', profileController.getOne)

module.exports = router
