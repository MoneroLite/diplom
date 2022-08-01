const ApiError = require("../error/ApiError")
const { Tag, TagPost } = require("../models/models")

const { Op } = require('sequelize')

class TagController {

    async create(req, res, next) {
        try{
            const name = req.body
            const tag = await Tag.create(name)
            return res.json(tag)
        } catch(err){
            next(ApiError.badRequest(err.message))
        }
    }
    
    async getAll(req, res, next) {
        try {
            const {search} = req.query
            if (!search) {
                const tag = await Tag.findAll()
                return res.json(tag)
            } else {
                const tag = await Tag.findAll({
                    where: { name: {[Op.like]: `%${search}%`} }
                })
                return res.json(tag)
            }
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async getChartTag(req, res, next) {
        const tag = await TagPost.findAll()
                return res.json(tag)
    }

    async deleteTag(req, res, next){
        const {id} = req.params
        const tag = await Tag.destroy({
           where: {id}
       })
       return res.json(tag)
   }

}

module.exports = new TagController()