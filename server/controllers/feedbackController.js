const ApiError = require("../error/ApiError")
const { Feedback } = require("../models/models")

class FeedbackController {

    async create(req, res, next) {
        try{
            const {text, date} = req.body
            const feedback = await Feedback.create({text, date})
            return res.json(feedback)
        } catch(err){
            next(ApiError.badRequest(err.message))
        }
    }
    
    async getAll(req, res, next) {
        const post = await Feedback.findAll()
        return res.json(post)
    }

    async deleteFeedback(req, res, next){
        const {id} = req.params
        const feedback = await Feedback.destroy({
           where: {id}
       })
       return res.json(feedback)
   }

}

module.exports = new FeedbackController()