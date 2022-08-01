const Router = require('express')
const postController = require('../controllers/postController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

const router = new Router()

// для создания
router.post('/', postController.create)
router.post('/comm', postController.createComm)
// для получения
router.get('/', postController.getAll)
router.get('/:id', postController.getOne)

router.delete('/delete/:id', postController.deletePost)
router.delete('/deletecomm/:id', postController.deleteComm)

// router.get('/postuser/:id', postController.getAllPostUser)

module.exports = router
