const {Post, User, Favorit } = require("../models/models")
const Sequelize = require("../db")
const { Op } = require("sequelize")
const ApiError = require("../error/ApiError")

class favoritController {

    async getFavorit(req, res, next) {
        const {id} = req.params
        // const id = 1
            const favorit = await Favorit.findAll(
                {
                    where: {userId: id},
                    include: [
                        {
                            model: Post,
                        },
                ]
                },    
            )
            return res.json(favorit)
    }

    async checkFavorit(req, res, next) {
        const {postId, userId} = req.body
        const check = await Favorit.findAll({
            where: {
                [Op.and]: [
                { postId: postId },
                { userId: userId }
                ]
            }
        })
        if (check[0]) {
            return res.json(true)
        } else{
            return res.json(false)
        }

    }

    async changeFavorit(req, res, next) {
        const {postId, userId} = req.body
        try{
            const check = await Favorit.findAll({
                where: {
                    [Op.and]: [
                    { postId: postId },
                    { userId: userId }
                    ]
                }
            })
            if (check[0]) {
                const favorit = await Favorit.destroy({ 
                    where: {id: check[0].id},
                    })
                return res.json(favorit)
            } else {
                const favorit = await Favorit.create({userId, postId})
                return res.json(favorit)
            }
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

module.exports = new favoritController()
