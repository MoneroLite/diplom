const ApiError = require("../error/ApiError")
const { Post, User, Comment, TagPost, Tag } = require("../models/models")

const { Op } = require('sequelize')

class PostController {

    async create(req, res, next) {
        try{
            const {title, question, date, userId, categoryId, tags} = req.body
            const post = await Post.create({title, question, date, userId, categoryId})

            if(tags){
                var arr1 = tags.split(',')
                arr1.forEach(tag => TagPost.create({
                    postId: post.id,
                    tagId: tag
                }))
            }
            
            return res.json(post)
        } catch(err){
            next(ApiError.badRequest(err.message))
        }
        
    }
    async createComm(req, res, next) {
        try{
            const {text, date, userId, postId} = req.body
        const comm = await Comment.create({text, date, userId, postId})
        return res.json(comm)
        } catch(err){
            next(ApiError.badRequest(err.message))
        }
    }

    async deleteComm(req, res, next) {
        try{
            const {id} = req.params
            const comm = await Comment.destroy(
            {where: {id}}
            )
            return res.json(comm)
        } catch(err){
            next(ApiError.badRequest(err.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const {search} = req.query
            if (!search) {
                const post = await Post.findAll()
                return res.json(post)
            } else {
                const post = await Post.findAll({
                    where: { title: {[Op.like]: `%${search}%`} }
                })
                return res.json(post)
            }
        } catch(err){
            next(ApiError.badRequest(err.message))
        }
        
}

    
    async getOne(req, res, next) {
        const {id} = req.params
        const post = await Post.findOne({
            where: {id},
            include: [
                {
                    model: User
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User
                        }
                    ]
                },
                { 
                    model: TagPost, required: false,
                    include: [
                        {
                            model: Tag, required: false,
                        }
                    ]
                }
        ]
        })
        return res.json(post)
    }

    async deletePost(req, res, next){
        const {id} = req.params
        const post = await Post.destroy({
           where: {id}
       })
       return res.json(post)
   }

}

module.exports = new PostController()