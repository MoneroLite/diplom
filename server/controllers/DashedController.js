const { Category, Post, User, Comment, TagPost, Tag } = require("../models/models")
const Sequelize = require("../db")
const ApiError = require("../error/ApiError")

class DashedController {

    async getCategoryPostCount(req, res, next) {
            const category = await Category.findAll(
                {
                    attributes: {include: [[Sequelize.fn("COUNT", Sequelize.col("posts.id")), "total"]]},
                    include: [
                        {
                            // as: 'posts',
                            attributes: [],
                            model: Post,
                            required: true,
                        },
                    ],
                    group: ['category.id']
                },    
            )
            return res.json(category)
    }
}

module.exports = new DashedController()
