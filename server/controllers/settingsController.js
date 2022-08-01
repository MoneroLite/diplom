const ApiError = require("../error/ApiError")
const { UserInfo, User } = require("../models/models")
const bcrypt = require('bcrypt')
const uuid = require("uuid")
const path = require("path")


class SettingsController {

    async getInfo(req, res, next) {
        try{
            const {id} = req.body
            const info = await UserInfo.findOne(
                {
                    where: {userId: id}
                }
            )
        return res.json(info)
        } catch(err){
            next(ApiError.badRequest(err.message))
        }
    }

    async updateInfo(req, res, next){
        // const {} = req.params
        const {id, sex, job, addr, vk, ds, tg} = req.body
        const info = await UserInfo.update(
       {
            sex: sex,
            job: job,
            addr: addr,
            vk: vk,
            ds: ds,
            tg: tg,
       },
       {
        where: {id: id}
        },
       )
       return res.json(info)
    }

   async updateUser(req, res, next){
    // const {} = req.params
    const {id, oldPassword, newPassword} = req.body
    const candidate = await User.findOne({where: {id: id}} )
    let comparePassword = bcrypt.compareSync(oldPassword, candidate.password)
    if(!comparePassword) {
        return next(ApiError.internal('Неверный пароль'))
    }
    const hashPassword = await bcrypt.hash(newPassword, 5)
    const user = await User.update(
        {
            password: hashPassword,
        },
        {
            where: {id: id}
        } 
    )
   
    return res.json(user)
    }

    async settingsUpdateImg(req, res, next){
        const {id} = req.body
    
        const {avatar} = req.files
        let fileName = uuid.v4() + '.jpg'
        avatar.mv(path.resolve(__dirname, '..', 'static/users', fileName))
    
        const user = await User.update(
            {
                avatar: fileName,
            },
            {
                where: {id: id}
            },
        )
        return res.json(user)
    }
    
}

module.exports = new SettingsController()