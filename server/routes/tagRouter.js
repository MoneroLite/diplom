const Router = require('express')
const TagController = require('../controllers/TagController')


const router = new Router()

router.get('/', TagController.getAll)
router.get('/charttag', TagController.getChartTag)
router.post('/create', TagController.create)
// router.put('/update', )
router.delete('/delete/:id', TagController.deleteTag )


module.exports = router