const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login : {type: DataTypes.STRING, unique: true},
    password : {type: DataTypes.STRING},
    role : {type: DataTypes.STRING, defaultValue: 'USER'},
    avatar : {type: DataTypes.STRING, allowNull: true}
})

const UserInfo = sequelize.define('user_info', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    sex : {type: DataTypes.STRING, allowNull: true},
    job : {type: DataTypes.STRING, allowNull: true},
    addr : {type: DataTypes.STRING, allowNull: true},
    vk : {type: DataTypes.STRING, allowNull: true},
    ds : {type: DataTypes.STRING, allowNull: true},
    tg : {type: DataTypes.STRING, allowNull: true},
})

const Category = sequelize.define('category', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title : {type: DataTypes.STRING, unique: true},
    description : {type: DataTypes.STRING},
    img : {type: DataTypes.STRING, allowNull: true}
})

const Post = sequelize.define('post', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title : {type: DataTypes.STRING},
    question : {type: DataTypes.STRING},
    date : {type: DataTypes.STRING},
})

const Comment = sequelize.define('comment', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text : {type: DataTypes.STRING},
    date : {type: DataTypes.STRING},
})

const Feedback = sequelize.define('feedback', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text : {type: DataTypes.STRING},
    date : {type: DataTypes.STRING},
})

const Tag = sequelize.define('tag', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name : {type: DataTypes.STRING, unique: true},
})

const TagPost = sequelize.define('tag_post', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Favorit = sequelize.define('favorit', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasMany(UserInfo, {as: 'info'})
UserInfo.belongsTo(User)

User.hasMany(Post)
Post.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

User.hasMany(Feedback)
Feedback.belongsTo(User)

Category.hasMany(Post)
Post.belongsTo(Category)

Post.hasMany(Comment)
Comment.belongsTo(Post)

Post.hasMany(TagPost)
TagPost.belongsTo(Post)

Tag.hasMany(TagPost)
TagPost.belongsTo(Tag)

Post.hasMany(Favorit)
Favorit.belongsTo(Post)

User.hasMany(Favorit)
Favorit.belongsTo(User)

// экспорт моделей
module.exports = {
    User,
    Category,
    Post,
    Comment,
    Tag,
    TagPost,
    UserInfo,
    Feedback,
    Favorit,
}
