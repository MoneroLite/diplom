const Router = require('express')

const router = new Router()

const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const postRouter = require('./postRouter')
const profileRouter = require('./profileRouter')
const feedbackRouter = require('./feedbackRouter')
const settingRouter = require('./settingRouter')
const tagRouter = require('./tagRouter')
const dashedRouter = require('./dashedRouter')
const favoritRouter = require('./favoritRouter')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/post', postRouter)
router.use('/profile', profileRouter)
router.use('/feedback', feedbackRouter)
router.use('/settings', settingRouter)
router.use('/tag', tagRouter)
router.use('/statistics', dashedRouter)
router.use('/favorit', favoritRouter)

module.exports = router
