const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const {User, UserInfo} = require('../models/models')
const jwt = require('jsonwebtoken')
const uuid = require("uuid")
const path = require("path")
const { Op } = require('sequelize')

const genereteJwt = (id, login, role, avatar) => {
    return jwt.sign(
        {id, login, role, avatar}, 
        process.env.SECRET_KEY,
        {expiresIn:'24h'}
    )
}

class UserController {

    async registration(req, res, next) {
        const {login, password, role} = req.body
        // ошибка
        if (!login || !password){
            return next(ApiError.badRequest('Неккоректный логин или пароль'))
        }
        // провверка есть ли такой пользователь
        const candidate = await User.findOne({where: {login}})
        if (candidate) {
            return next(ApiError.badRequest('Логин занят'))
        }
        const hashPassword = await bcrypt.hash(password, 5)

        let fileName = 'null.jpg'
        

        const user = await User.create({login, role, password: hashPassword, avatar: fileName})
        UserInfo.create({sex: 'не указано', job: 'не указано', addr: 'не указано', vk: 'не указано', ds: 'не указано', ds: 'не указано', tg: 'не указано', userId: user.id})
        const token = genereteJwt(user.id, user.login, user.role, user.avatar)
        return res.json({token})

    }
    async login(req, res, next) {
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if(!user){
            return next(ApiError.internal('пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = genereteJwt(user.id, user.login, user.role, user.avatar)
        return res.json({token})
    }
    async check(req, res, next) {
        const token = genereteJwt(req.user.id, req.user.login, req.user.role, req.user.avatar)
        return res.json({token})
    }

    async fetchUsers (req, res, next) {
        try {
            const {search} = req.query
            if (!search) {
                const user = await User.findAll({
                })
                return res.json(user)
            } else {
                const user = await User.findAll({
                    where: { login: {[Op.like]: `%${search}%`} }
                })
                return res.json(user)
            }
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
       
    }

    async updateUser(req, res, next){
        // const {} = req.params
        const {id, role, password} = req.body
        const findUser = await User.findOne({where: {id}})
        let comparePassword = bcrypt.compareSync(password, findUser.password)
        if(!comparePassword) {
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.update(
                {
                        role: role,
                        password: hashPassword
                },
                {
                        where: {id: id}
                },
           )
           return res.json(user)
        } else {
            const user = await User.update(
                {
                        role: role,
                        password: password
                },
                {
                        where: {id: id}
                },
           )
           return res.json(user)
        }
        
       
   }

   async updateUserImg(req, res, next){
    const {id, role, password} = req.body

    const {avatar} = req.files
    let fileName = uuid.v4() + '.jpg'
    avatar.mv(path.resolve(__dirname, '..', 'static/users', fileName))

    const findUser = await User.findOne({where: {id}})
    let comparePassword = bcrypt.compareSync(password, findUser.password)
    if(!comparePassword) {
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.update(
            {
                role: role,
                avatar: fileName,
                password: hashPassword
            },
            {
                where: {id: id}
            },
       )
       return res.json(user)
    } else {
        const user = await User.update(
            {
                role: role,
                avatar: fileName,
                password: password
            },
            {
                where: {id: id}
            },
       )
       return res.json(user)
    }
  }

    async deleteUser(req, res, next){
         const {id} = req.params
         const user = await User.destroy({
            where: {id}
        })
        return res.json(user)
    }

}

module.exports = new UserController()