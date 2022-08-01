const Router = require('express')
const feedbackController = require('../controllers/feedbackController')


const router = new Router()

// для создания
router.post('/create',  feedbackController.create)

// для получения
router.get('/', feedbackController.getAll)

router.delete('/delete/:id', feedbackController.deleteFeedback)

module.exports = router
