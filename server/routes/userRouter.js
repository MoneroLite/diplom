const Router = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

// для создания 
router.post('/registration', userController.registration)
router.post('/login', userController.login)
// для проверки
router.get('/auth', authMiddleware, userController.check)

router.get('/all', authMiddleware, userController.fetchUsers)

router.put('/update', userController.updateUser)
router.put('/updateimg', userController.updateUserImg)

router.delete('/delete/:id', userController.deleteUser)

module.exports = router
