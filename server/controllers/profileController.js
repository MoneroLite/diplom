const ApiError = require("../error/ApiError")
const { Post, User, UserInfo, Comment } = require("../models/models")

class ProfileController {

    async edit(req, res, next) {
        try{
            const {title, question, date, userId, categoryId} = req.body
        // const post = await User.create({title, question, date, userId, categoryId})
        return res.json(profile)
        } catch(err){
            next(ApiError.badRequest(err.message))
        }
        
    }

    async getOne(req, res, next) {
        try{
            const {id} = req.params
            const profile = await User.findOne({
                where: {id},
                include: [
                    {
                        model: Post
                    },
                    {
                        model: Comment
                    },
                    {
                        model: UserInfo, as: 'info'
                    }
                ]
                
            })
            return res.json(profile)
        } catch(err){
            next(ApiError.badRequest(err.message))
            }
    }

}

module.exports = new ProfileController()