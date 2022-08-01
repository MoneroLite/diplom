const Router = require('express')
const categoryController = require('../controllers/categoryController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', checkRoleMiddleware('ADMIN'), categoryController.create)

router.get('/', categoryController.getAll)
router.get('/:id', categoryController.getOne)

router.put('/update', categoryController.updateCategory)
router.put('/updateimg', categoryController.updateCategoryImg)

router.delete('/delete/:id', categoryController.deleteCategory)

module.exports = router
