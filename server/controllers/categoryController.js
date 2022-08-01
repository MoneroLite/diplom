const { Category, Post, User, Comment, TagPost, Tag } = require("../models/models")
const uuid = require("uuid")
const path = require("path")
const ApiError = require("../error/ApiError")

const { Op } = require('sequelize')

class CategoryController {

    async create(req, res, next) {
        try {
            const {title, description} = req.body
            
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static/category', fileName))
            
            const category = await Category.create({title, description, img: fileName})
            return res.json(category)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res, next) {
        try {
            const {search} = req.query
            if (!search){
                const categoryes = await Category.findAll({
                    include: [{
                        model: Post,
                        attributes: ['id']
                    }]
                })
                return res.json(categoryes)
            } else {
                const categoryes = await Category.findAll({
                    where: { title: {[Op.like]: `%${search}%`} },
                    include: [{
                        model: Post,
                        attributes: ['id']
                    }]
                })
                return res.json(categoryes)
            }
        } catch (err) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const {search} = req.query
        if (!search) {
            const category = await Category.findOne(
                { 
                    where: {id},
                    include: [
                        {
                            model: Post, required: false,
                            include: [
                                {
                                    model: User, required: false,
                                },
                                {   
                                    model: Comment, required: false,
                                    include: [
                                        {
                                        model: User, required: false,
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
                        },  
                    ]
                },    
            )
            return res.json(category)
        } else {
            const category = await Category.findOne(
                { 
                    where: {id},
                    include: [
                        {
                            model: Post, required: false,
                            where: { title: {[Op.like]: `%${search}%`} },
                            include: [
                                {
                                    model: User, required: false,
                                },
                                {   
                                    model: Comment, required: false,
                                    include: [
                                        {
                                        model: User, required: false,
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
                        },  
                    ]
                },    
            )
            return res.json(category)
        }
    

        
    }

    async updateCategory(req, res, next){
        // const {} = req.params
        const {id, title, description} = req.body
        const category = await Category.update(
       {
            title: title,
            description: description
       },
       {
        where: {id: id}
    },
       )
       return res.json(category)
   }

   async updateCategoryImg(req, res, next){
    // const {} = req.params
    const {id, title, description} = req.body

    const {img} = req.files
    let fileName = uuid.v4() + '.jpg'
    img.mv(path.resolve(__dirname, '..', 'static/category', fileName))

    const user = await Category.update(
   {
        title: title,
        description: description,
        img: fileName,
   },
   {
    where: {id: id}
},
   )
   return res.json(user)
}

    async deleteCategory(req, res, next){
        const {id} = req.params
        const category = await Category.destroy({
           where: {id}
       })
       return res.json(category)
   }

}

module.exports = new CategoryController()