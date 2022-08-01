const Router = require('express')
const favoritController = require('../controllers/favoritController')
// const DashedController = require('../controllers/DashedController')

const router = new Router()

router.get('/:id', favoritController.getFavorit)
router.post('/change', favoritController.changeFavorit)
router.post('/check', favoritController.checkFavorit)


module.exports = router